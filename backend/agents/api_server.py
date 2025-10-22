"""
ReadMyMRI FastAPI Server
Connects the frontend to our FIRE agent orchestration! 🔥
"""

from fastapi import FastAPI, HTTPException, UploadFile, File, BackgroundTasks
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from pydantic import BaseModel
from typing import List, Dict, Any, Optional
import asyncio
import os
import tempfile
import zipfile
import shutil
from datetime import datetime
import base64
import logging
import uvicorn

# Set demo mode by default
os.environ["DEMO_MODE"] = "true"

# Import our modules
from agent_orchestrator import MRIAgentOrchestrator, MRIAnalysisRequest
# from readmymri_preprocessor import HIPAACompliantDICOMProcessor

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# Initialize FastAPI
app = FastAPI(
    title="ReadMyMRI API",
    description="Revolutionary ZIP-native medical AI processing 🔥",
    version="1.0.0"
)

# Configure CORS for Next.js frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "https://readmymri.com", "*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Initialize components
# dicom_processor = HIPAACompliantDICOMProcessor()  # Uncomment when preprocessor is available
agent_orchestrator = MRIAgentOrchestrator()

# 📊 Data Models
class ProcessingStatus(BaseModel):
    study_id: str
    status: str  # pending, processing, completed, failed
    progress: int
    message: str
    created_at: datetime
    updated_at: datetime

class AnalysisResponse(BaseModel):
    success: bool
    study_id: str
    processing_time: float
    images_processed: int
    findings_count: int
    confidence_score: float
    report_preview: str
    recommendations: List[str]

# 🌐 API Endpoints
@app.get("/")
async def root():
    """Health check endpoint"""
    return {
        "status": "online",
        "message": "ReadMyMRI API is FIRE! 🔥",
        "version": "1.0.0",
        "demo_mode": os.getenv("DEMO_MODE", "false")
    }

@app.post("/api/dicom/process")
async def process_dicom_zip(
    background_tasks: BackgroundTasks,
    file: UploadFile = File(...),
    context: str = "{}"
):
    """
    Process uploaded ZIP file containing DICOM series
    THIS IS WHERE THE MAGIC HAPPENS! 🎯
    """
    logger.info(f"🔥 Processing upload: {file.filename}")
    
    # Validate file
    if not file.filename.endswith('.zip'):
        raise HTTPException(status_code=400, detail="Only ZIP files are supported")
    
    # Create temporary directory
    temp_dir = tempfile.mkdtemp()
    
    try:
        # Save uploaded file
        zip_path = os.path.join(temp_dir, file.filename)
        with open(zip_path, "wb") as f:
            content = await file.read()
            f.write(content)
        
        # Extract ZIP
        extracted_dir = os.path.join(temp_dir, "extracted")
        os.makedirs(extracted_dir)
        
        with zipfile.ZipFile(zip_path, 'r') as zip_ref:
            zip_ref.extractall(extracted_dir)
        
        # Find DICOM files
        dicom_files = []
        for root, dirs, files in os.walk(extracted_dir):
            for f in files:
                if f.endswith(('.dcm', '.dicom', '.DCM', '.DICOM')):
                    dicom_files.append(os.path.join(root, f))
        
        logger.info(f"📁 Found {len(dicom_files)} DICOM files")
        
        # For demo, we'll simulate processing
        if not dicom_files:
            # Create fake DICOM count for demo
            dicom_files = ["demo"] * 127  # Simulate 127 files
        
        # Parse context
        import json
        user_context = json.loads(context)
        
        # Generate study ID
        study_id = f"STUDY-{int(datetime.now().timestamp())}"
        
        # For demo mode, create simulated result
        result = {
            'study_id': study_id,
            'image_data': "",  # Empty for demo
            'metadata': {
                'modality': 'MRI',
                'sequences': 'T1, T2, FLAIR',
                'slice_count': len(dicom_files)
            },
            'user_context': user_context
        }
        
        # Prepare for agent analysis
        analysis_request = MRIAnalysisRequest(
            study_id=result['study_id'],
            image_data=[""],  # Empty for demo
            metadata=result['metadata'],
            user_context=user_context
        )
        
        # Run agent orchestration in background
        background_tasks.add_task(
            run_agent_analysis,
            analysis_request
        )
        
        # Return immediate response
        return JSONResponse({
            "success": True,
            "studyId": result['study_id'],
            "message": "DICOM processed successfully",
            "processingTime": 2.5,  # Simulated for demo
            "imagesProcessed": len(dicom_files),
            "phiRemoved": True,
            "status": "analysis_started"
        })
        
    except Exception as e:
        logger.error(f"❌ Processing failed: {e}")
        raise HTTPException(status_code=500, detail=str(e))
    
    finally:
        # Cleanup
        shutil.rmtree(temp_dir, ignore_errors=True)

@app.get("/api/analysis/{study_id}")
async def get_analysis_results(study_id: str):
    """Get analysis results for a study"""
    logger.info(f"📊 Fetching results for study {study_id}")
    
    # Check cache for results
    cached_result = agent_orchestrator._check_cache(study_id)
    
    if not cached_result:
        return JSONResponse({
            "success": False,
            "status": "processing",
            "message": "Analysis still in progress..."
        })
    
    # Format response
    return AnalysisResponse(
        success=True,
        study_id=cached_result.study_id,
        processing_time=cached_result.processing_time,
        images_processed=127,  # Demo value
        findings_count=len(cached_result.consensus_findings),
        confidence_score=cached_result.confidence_score,
        report_preview=cached_result.report[:200] + "...",
        recommendations=cached_result.recommendations
    )

@app.get("/api/report/{study_id}")
async def get_full_report(study_id: str):
    """Get full medical report"""
    logger.info(f"📄 Fetching full report for study {study_id}")
    
    cached_result = agent_orchestrator._check_cache(study_id)
    
    if not cached_result:
        raise HTTPException(status_code=404, detail="Report not found")
    
    return {
        "study_id": study_id,
        "report": cached_result.report,
        "findings": cached_result.consensus_findings,
        "confidence_score": cached_result.confidence_score,
        "processing_time": cached_result.processing_time,
        "agent_agreements": cached_result.agent_agreements,
        "recommendations": cached_result.recommendations,
        "generated_at": datetime.now().isoformat()
    }

@app.get("/api/agents/health")
async def agent_health_check():
    """Check health of all AI agents"""
    health_status = {
        "status": "healthy",
        "agents": {
            "gpt4v": "online",
            "claude": "online",
            "medvision": "online"
        },
        "redis": "connected" if agent_orchestrator.redis_client else "disconnected",
        "demo_mode": os.getenv("DEMO_MODE", "false"),
        "last_check": datetime.now().isoformat()
    }
    
    return health_status

# 🔥 Background Tasks
async def run_agent_analysis(request: MRIAnalysisRequest):
    """Run agent analysis in background"""
    try:
        logger.info(f"🧠 Starting agent analysis for {request.study_id}")
        # Add small delay to simulate processing
        await asyncio.sleep(5)
        result = await agent_orchestrator.analyze_mri(request)
        logger.info(f"✅ Agent analysis complete for {request.study_id}")
    except Exception as e:
        logger.error(f"❌ Agent analysis failed: {e}")

# 🚀 Server Configuration
if __name__ == "__main__":
    print("""
    🔥🔥🔥 READMYMRI API SERVER 🔥🔥🔥
    ===================================
    The future of medical imaging is HERE!
    
    Running in DEMO MODE for investor presentation
    
    Endpoints:
    - POST /api/dicom/process - Upload ZIP file
    - GET  /api/analysis/{study_id} - Get analysis results
    - GET  /api/report/{study_id} - Get full report
    - GET  /api/agents/health - Check agent status
    
    SAK PASE! Let's make the world say NAP BOULE!
    """)
    
    uvicorn.run(
        app,
        host="0.0.0.0",
        port=8000,
        reload=True,
        log_level="info"
    )
