#!/usr/bin/env python3
"""
ReadMyMRI Full Stack Demo
Tests the entire pipeline from ZIP upload to AI report! 🔥
"""

import asyncio
import aiohttp
import json
import time
import os
from datetime import datetime
from colorama import init, Fore, Style
import zipfile
import tempfile

# Initialize colorama for colored output
init()

class ReadMyMRIDemo:
    def __init__(self, api_url="http://localhost:8000"):
        self.api_url = api_url
        
    def print_fire(self, message):
        """Print with fire emojis"""
        print(f"{Fore.RED}🔥 {Fore.YELLOW}{message} {Fore.RED}🔥{Style.RESET_ALL}")
    
    def print_success(self, message):
        """Print success message"""
        print(f"{Fore.GREEN}✅ {message}{Style.RESET_ALL}")
    
    def print_info(self, message):
        """Print info message"""
        print(f"{Fore.CYAN}ℹ️  {message}{Style.RESET_ALL}")
    
    def print_error(self, message):
        """Print error message"""
        print(f"{Fore.RED}❌ {message}{Style.RESET_ALL}")
    
    async def create_demo_zip(self):
        """Create a demo ZIP file with fake DICOM data"""
        self.print_info("Creating demo ZIP file...")
        
        temp_dir = tempfile.mkdtemp()
        zip_path = os.path.join(temp_dir, "demo_mri_series.zip")
        
        with zipfile.ZipFile(zip_path, 'w') as zipf:
            # Create fake DICOM files
            for i in range(5):
                fake_dicom = f"DICOM_DEMO_{i:03d}.dcm"
                fake_path = os.path.join(temp_dir, fake_dicom)
                
                # Write some fake DICOM header (in reality, would be actual DICOM)
                with open(fake_path, 'wb') as f:
                    f.write(b'DICM' + b'\x00' * 128)  # Fake DICOM header
                    
                zipf.write(fake_path, fake_dicom)
        
        self.print_success(f"Created demo ZIP: {zip_path}")
        return zip_path
    
    async def test_health_check(self):
        """Test API health"""
        self.print_info("Testing API health...")
        
        async with aiohttp.ClientSession() as session:
            async with session.get(f"{self.api_url}/") as response:
                data = await response.json()
                if data['status'] == 'online':
                    self.print_success(f"API is {data['message']}")
                    if data.get('demo_mode') == 'true':
                        self.print_info("Running in DEMO MODE")
                    return True
                else:
                    self.print_error("API is not responding correctly")
                    return False
    
    async def test_upload(self, zip_path):
        """Test ZIP upload"""
        self.print_fire("UPLOADING MRI ZIP FILE")
        
        async with aiohttp.ClientSession() as session:
            # Prepare multipart upload
            data = aiohttp.FormData()
            
            # Add file
            data.add_field('file',
                          open(zip_path, 'rb'),
                          filename='demo_mri_series.zip',
                          content_type='application/zip')
            
            # Add context
            context = {
                "clinical_question": "Demo analysis for investor presentation",
                "urgency": "routine",
                "patient_symptoms": "Testing awesome AI capabilities"
            }
            data.add_field('context', json.dumps(context))
            
            # Upload
            self.print_info("Uploading ZIP file...")
            start_time = time.time()
            
            async with session.post(
                f"{self.api_url}/api/dicom/process",
                data=data
            ) as response:
                
                if response.status == 200:
                    result = await response.json()
                    upload_time = time.time() - start_time
                    
                    self.print_success(f"Upload completed in {upload_time:.2f}s")
                    self.print_info(f"Study ID: {result['studyId']}")
                    self.print_info(f"Images processed: {result['imagesProcessed']}")
                    self.print_info(f"PHI removed: {result['phiRemoved']}")
                    
                    return result['studyId']
                else:
                    self.print_error(f"Upload failed: {response.status}")
                    return None
    
    async def test_analysis(self, study_id):
        """Test getting analysis results"""
        self.print_fire("WAITING FOR AI ANALYSIS")
        
        async with aiohttp.ClientSession() as session:
            # Poll for results
            max_attempts = 30  # 60 seconds max
            attempt = 0
            
            while attempt < max_attempts:
                self.print_info(f"Checking analysis status... (attempt {attempt + 1}/{max_attempts})")
                
                async with session.get(
                    f"{self.api_url}/api/analysis/{study_id}"
                ) as response:
                    
                    if response.status == 200:
                        data = await response.json()
                        
                        if data.get('success') and data.get('status') != 'processing':
                            self.print_success("AI ANALYSIS COMPLETE!")
                            self.print_info(f"Processing time: {data['processing_time']:.2f}s")
                            self.print_info(f"Findings count: {data['findings_count']}")
                            self.print_info(f"Confidence score: {data['confidence_score']:.2%}")
                            self.print_info(f"Report preview: {data['report_preview'][:100]}...")
                            
                            print("\n📋 RECOMMENDATIONS:")
                            for rec in data['recommendations']:
                                print(f"   • {rec}")
                            
                            return True
                
                await asyncio.sleep(2)
                attempt += 1
            
            self.print_error("Analysis timed out")
            return False
    
    async def test_full_report(self, study_id):
        """Get full medical report"""
        self.print_fire("FETCHING FULL MEDICAL REPORT")
        
        async with aiohttp.ClientSession() as session:
            async with session.get(
                f"{self.api_url}/api/report/{study_id}"
            ) as response:
                
                if response.status == 200:
                    data = await response.json()
                    
                    print("\n" + "="*60)
                    print("📄 FULL MEDICAL REPORT")
                    print("="*60)
                    print(data['report'])
                    print("="*60)
                    
                    return True
                else:
                    self.print_error("Failed to get report")
                    return False
    
    async def run_full_demo(self):
        """Run the complete demo"""
        print("\n" + "🔥"*20)
        self.print_fire("READMYMRI FULL STACK DEMO")
        self.print_fire("SAK PASE! LET'S MAKE THE WORLD SAY NAP BOULE!")
        print("🔥"*20 + "\n")
        
        # Step 1: Health check
        if not await self.test_health_check():
            self.print_error("API is not running. Start it with: python api_server.py")
            return
        
        # Step 2: Create demo ZIP
        zip_path = await self.create_demo_zip()
        
        # Step 3: Upload ZIP
        study_id = await self.test_upload(zip_path)
        if not study_id:
            self.print_error("Upload failed!")
            return
        
        # Step 4: Wait for analysis
        print("\n")
        if not await self.test_analysis(study_id):
            self.print_error("Analysis failed!")
            return
        
        # Step 5: Get full report
        print("\n")
        await self.test_full_report(study_id)
        
        # Success!
        print("\n" + "🎉"*20)
        self.print_fire("DEMO COMPLETE! THE FUTURE OF MEDICAL AI IS HERE!")
        self.print_success("Your investors are about to lose their minds!")
        print("🎉"*20 + "\n")

async def main():
    """Run the demo"""
    demo = ReadMyMRIDemo()
    await demo.run_full_demo()

if __name__ == "__main__":
    print("""
    ╔═══════════════════════════════════════════╗
    ║     READMYMRI FULL STACK DEMO SCRIPT      ║
    ║                                           ║
    ║  This will test:                          ║
    ║  1. API Health Check                      ║
    ║  2. ZIP File Upload                       ║
    ║  3. HIPAA-Compliant Processing            ║
    ║  4. Multi-Agent AI Analysis               ║
    ║  5. Medical Report Generation             ║
    ╚═══════════════════════════════════════════╝
    """)
    
    # Run the demo
    asyncio.run(main())
