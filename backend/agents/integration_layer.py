"""
ReadMyMRI Integration Layer - Updated for Your Structure
========================================================

Place this file at: backend/agents/venv/integration_layer.py
"""

import asyncio
import logging
from typing import Dict, List, Any, Optional
from datetime import datetime
import json
import sys
import os

# Add parent directories to Python path for imports
current_dir = os.path.dirname(os.path.abspath(__file__))
backend_dir = os.path.dirname(os.path.dirname(current_dir))
root_dir = os.path.dirname(backend_dir)

sys.path.append(backend_dir)  # For preprocessor imports
sys.path.append(current_dir)   # For agent imports
sys.path.append(root_dir)      # For any root-level imports

# Import your preprocessor - UPDATE THIS if your file name is different
try:
    from preprocessor.readmymri_preprocessorv4 import ReadMyMRIPreprocessor
except ImportError:
    # Try alternative import
    from preprocessor.readmymri_preprocessor import ReadMyMRIPreprocessor

# Import agent orchestrator from same directory
from agent_orchestrator import MRIAgentOrchestrator, MRIAnalysisRequest

logger = logging.getLogger(__name__)

class ReadMyMRIIntegration:
    """Integration layer between preprocessor and agent orchestrator"""
    
    def __init__(self):
        logger.info("🔥 Initializing ReadMyMRI Integration Layer...")
        try:
            self.preprocessor = ReadMyMRIPreprocessor()
            self.orchestrator = MRIAgentOrchestrator()
            logger.info("✅ Integration Layer initialized successfully")
        except Exception as e:
            logger.error(f"❌ Failed to initialize integration layer: {e}")
            raise
    
    async def process_and_analyze(self, 
                                 zip_file_path: str, 
                                 user_context: Dict[str, Any]) -> Dict[str, Any]:
        """
        Complete pipeline: ZIP → Preprocessing → Agent Analysis
        Handles protocol mismatches gracefully
        """
        
        try:
            logger.info(f"🚀 Starting integrated processing for: {zip_file_path}")
            
            # Step 1: Preprocess DICOM files
            preprocessing_result = await self.preprocessor.process_dicom_zip(
                zip_file_path, 
                user_context
            )
            
            if not preprocessing_result['success']:
                return {
                    'success': False,
                    'message': preprocessing_result['message'],
                    'error': preprocessing_result.get('error'),
                    'stage': 'preprocessing'
                }
            
            # Step 2: Extract processed data
            processed_data = preprocessing_result['data']
            
            # Log what we have
            logger.info(f"✅ Preprocessing complete:")
            logger.info(f"   - Files processed: {processed_data['dicom_processing']['files_processed']}")
            logger.info(f"   - Files with images: {processed_data['dicom_processing'].get('files_with_images', 'N/A')}")
            logger.info(f"   - Metadata reliability: {processed_data['dicom_processing'].get('metadata_reliability', 'N/A')}")
            
            # Step 3: Prepare data for agents
            agent_ready_data = await self._prepare_for_agents(processed_data)
            
            if not agent_ready_data['image_data']:
                return {
                    'success': False,
                    'message': 'No analyzable images found after preprocessing',
                    'preprocessing_data': processed_data,
                    'stage': 'preparation'
                }
            
            # Step 4: Create analysis request for orchestrator
            analysis_request = MRIAnalysisRequest(
                study_id=processed_data['study_id'],
                image_data=agent_ready_data['image_data'],
                metadata=agent_ready_data['metadata'],
                user_context=user_context,
                priority=user_context.get('priority', 'routine')
            )
            
            # Step 5: Run agent analysis
            logger.info(f"🧠 Starting AI agent analysis with {len(agent_ready_data['image_data'])} images")
            
            consensus_result = await self.orchestrator.analyze_mri(analysis_request)
            
            # Step 6: Combine results
            final_result = {
                'success': True,
                'preprocessing': {
                    'files_processed': processed_data['dicom_processing']['files_processed'],
                    'metadata_quality': processed_data.get('protocol_info', {}).get('metadata_quality', 'Unknown'),
                    'processing_time': processed_data['processing_summary']['processing_time_seconds']
                },
                'analysis': {
                    'study_id': consensus_result.study_id,
                    'findings': consensus_result.consensus_findings,
                    'confidence_score': consensus_result.confidence_score,
                    'report': consensus_result.report,
                    'recommendations': consensus_result.recommendations,
                    'processing_time': consensus_result.processing_time
                },
                'metadata': agent_ready_data['metadata'],
                'total_processing_time': (
                    processed_data['processing_summary']['processing_time_seconds'] + 
                    consensus_result.processing_time
                )
            }
            
            logger.info(f"✅ Complete pipeline finished in {final_result['total_processing_time']:.2f}s")
            return final_result
            
        except Exception as e:
            logger.error(f"❌ Integration pipeline failed: {str(e)}")
            import traceback
            traceback.print_exc()
            
            return {
                'success': False,
                'message': f'Pipeline failed: {str(e)}',
                'error': str(e),
                'stage': 'unknown'
            }
    
    async def _prepare_for_agents(self, processed_data: Dict[str, Any]) -> Dict[str, Any]:
        """
        Prepare processed data for agent analysis
        Handles cases where metadata is unreliable
        """
        
        # Extract image data - handle both old and new formats
        image_data_list = processed_data.get('image_data', [])
        
        # If image_data is not present, try to extract from raw_results
        if not image_data_list and 'raw_results' in processed_data:
            for result in processed_data.get('raw_results', []):
                if result.get('image_data'):
                    image_data_list.append({
                        'image_data': result['image_data'],
                        'anonymized_id': result.get('anonymized_id', 'Unknown'),
                        'metadata': result.get('metadata', {})
                    })
        
        # Get the best available metadata
        primary_metadata = processed_data.get('metadata', {})
        all_metadata = processed_data.get('all_metadata', [])
        
        # Build consolidated metadata for agents
        consolidated_metadata = {
            'modality': primary_metadata.get('modality', 'MR'),
            'sequences': 'Unknown',
            'metadata_reliability': primary_metadata.get('metadata_reliability', 'Low')
        }
        
        # Try to determine sequences from all available sources
        detected_sequences = set()
        
        # Check primary metadata
        sequence_hints = primary_metadata.get('detected_sequence_hints', '')
        if sequence_hints and sequence_hints != 'Unknown':
            hints = sequence_hints.split(', ')
            detected_sequences.update(hints)
        
        # Check series description
        series_desc = primary_metadata.get('series_description', '').lower()
        if 't1' in series_desc:
            detected_sequences.add('T1')
        if 't2' in series_desc:
            detected_sequences.add('T2')
        if 'flair' in series_desc:
            detected_sequences.add('FLAIR')
        
        # Check all metadata
        for metadata in all_metadata:
            hints = metadata.get('detected_sequence_hints', '')
            if hints and hints != 'Unknown':
                detected_sequences.update(hints.split(', '))
        
        # Update sequences
        if detected_sequences:
            consolidated_metadata['sequences'] = ', '.join(detected_sequences)
        else:
            consolidated_metadata['sequences'] = 'Will be determined by image analysis'
            logger.warning("⚠️  No sequences detected from metadata - agents will analyze images directly")
        
        # Add technical parameters if available
        for param in ['repetition_time', 'echo_time', 'slice_thickness', 'magnetic_field_strength']:
            if primary_metadata.get(param) != 'Unknown':
                consolidated_metadata[param] = primary_metadata[param]
        
        # Prepare image data for agents
        agent_image_data = []
        
        # Handle different data formats
        if isinstance(image_data_list, list):
            for item in image_data_list:
                if isinstance(item, dict) and item.get('image_data'):
                    agent_image_data.append(item['image_data'])
                    logger.info(f"✅ Added image from {item.get('anonymized_id', 'Unknown')}")
                elif isinstance(item, str):
                    # Direct base64 string
                    agent_image_data.append(item)
                    logger.info("✅ Added image (direct base64)")
        
        # If metadata is unreliable but we have images, that's OK
        if consolidated_metadata['metadata_reliability'] == 'Low' and agent_image_data:
            logger.info("📊 Metadata unreliable but images available - agents will analyze visually")
        
        return {
            'image_data': agent_image_data,
            'metadata': consolidated_metadata,
            'metadata_quality': processed_data.get('protocol_info', {}).get('metadata_quality', 'Unknown')
        }
    
    async def handle_protocol_mismatch_case(self, 
                                          zip_file_path: str,
                                          expected_protocol: str,
                                          user_context: Dict[str, Any]) -> Dict[str, Any]:
        """
        Special handler for known protocol mismatch cases
        Example: DICOM says T1 but images are actually T2
        """
        
        logger.warning(f"⚠️  Handling protocol mismatch case - expected: {expected_protocol}")
        
        # Add protocol mismatch flag to context
        enhanced_context = user_context.copy()
        enhanced_context['protocol_mismatch_suspected'] = True
        enhanced_context['expected_protocol'] = expected_protocol
        
        # Process with enhanced context
        result = await self.process_and_analyze(zip_file_path, enhanced_context)
        
        # Add protocol mismatch warning to report if successful
        if result['success'] and 'analysis' in result:
            original_report = result['analysis']['report']
            
            mismatch_warning = """
PROTOCOL MISMATCH WARNING:
DICOM metadata may not accurately reflect the actual imaging protocol.
AI agents have analyzed the images directly to determine the sequence type.
Expected protocol: {expected}
Detected sequences: {detected}

""".format(
                expected=expected_protocol,
                detected=result.get('metadata', {}).get('sequences', 'Unknown')
            )
            
            result['analysis']['report'] = mismatch_warning + original_report
            result['protocol_mismatch_handled'] = True
        
        return result

# Test function to verify imports
def test_imports():
    """Test that all imports are working correctly"""
    try:
        logger.info("Testing imports...")
        logger.info(f"✅ Preprocessor module: {ReadMyMRIPreprocessor.__module__}")
        logger.info(f"✅ Orchestrator module: {MRIAgentOrchestrator.__module__}")
        logger.info("All imports successful!")
        return True
    except Exception as e:
        logger.error(f"Import test failed: {e}")
        return False

if __name__ == "__main__":
    # Test imports first
    if test_imports():
        # Run integration demo
        logger.info("🔥 ReadMyMRI Integration Demo")
        logger.info("=" * 60)
        
        async def quick_test():
            integration = ReadMyMRIIntegration()
            logger.info("✅ Integration layer created successfully")
            logger.info("Ready to process DICOM files with protocol mismatch resistance!")
        
        asyncio.run(quick_test())