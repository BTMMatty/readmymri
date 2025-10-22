# ReadMyMRI Bruno Integration Guide

## Overview

This guide explains how to use Bruno for API testing with ReadMyMRI's actual endpoints. Bruno is a Git-friendly, offline-first API client that's perfect for HIPAA-compliant medical imaging applications.

---

## 🎯 Why Bruno for ReadMyMRI?

### HIPAA Compliance Benefits

- **Offline-First**: No cloud sync = zero PHI exposure risk
- **Git-Native**: `.bru` files stored as plain text in your repository
- **No External Services**: All data stays local
- **Version Control**: Full history of API test changes
- **Code Review**: Pull request workflow for API changes

### Developer Benefits

- **Fast**: Lightweight, no Electron overhead
- **CLI Support**: Automate tests in CI/CD pipelines
- **Simple Format**: `.bru` files are human-readable
- **No Account Required**: Works completely offline

---

## 📦 Installation

### Bruno CLI (for automated testing)

```bash
npm install -g @usebruno/cli
```

### Bruno Desktop (optional GUI)

Download from: https://www.usebruno.com/downloads

---

## 🗂️ Collection Structure

```
bruno_collections/ReadMyMRI_API/
├── bruno.json                      # Collection config
├── .gitignore                      # Protect secrets
├── environments/
│   └── development.bru             # Environment variables
├── Health_Checks/
│   └── 01_health_check.bru         # Quick health check
├── DICOM_Processing/
│   └── 01_upload_zip.bru           # Main upload test
└── System_Status/
    └── 01_demo_status.bru          # Comprehensive status
```

---

## 🚀 Quick Start

### 1. Set Up Environment

Create `bruno_collections/ReadMyMRI_API/environments/development.bru`:

```plaintext
vars {
  base_url: http://localhost:8000
  timeout: 30000
}

vars:secret [
  
]
```

### 2. Start Your Backend

```bash
cd backend
python main.py
# Server runs on http://localhost:8000
```

### 3. Run Tests

```bash
cd bruno_collections/ReadMyMRI_API

# Run single test
bru run Health_Checks/01_health_check.bru --env development

# Run all tests in a folder
bru run Health_Checks/ --env development

# Run entire collection
bru run --env development
```

---

## 📋 Actual API Endpoints

### POST /api/upload-zip

Upload DICOM ZIP file with streaming technology.

**Request:**
```plaintext
POST {{base_url}}/api/upload-zip
Content-Type: multipart/form-data

Form Fields:
- file: ZIP file containing DICOM files (required)
- clinical_question: Clinical question (optional)
- symptoms: Patient symptoms (optional)
- priority: "routine" or "urgent" (optional)
```

**Response (Full AI Analysis):**
```json
{
  "status": "success",
  "message": "Medical imaging analysis complete",
  "study_id": "STUDY-1234567890",
  "preprocessing": {
    "files_processed": 150,
    "files_with_images": 150,
    "metadata_reliability": "High",
    "metadata_quality": "Good"
  },
  "analysis": {
    "confidence_score": 0.85,
    "consensus_findings": [...],
    "agent_agreements": {...},
    "report": "RADIOLOGY REPORT...",
    "recommendations": [...]
  },
  "upload_stats": {
    "streaming": true,
    "technology": "streaming-form-data",
    "ai_analysis": true,
    "upload_speed_mbps": 45.4
  }
}
```

**Response (Preprocessing Only - Fallback):**
```json
{
  "status": "success",
  "message": "Processed 150 files successfully",
  "data": {...},
  "upload_stats": {
    "streaming": true,
    "ai_analysis": false,
    "note": "Preprocessing only - AI agents not available"
  }
}
```

### GET /api/health

Quick health check.

**Response:**
```json
{
  "status": "✅ HEALTHY",
  "service": "ReadMyMRI Streaming Upload Service",
  "streaming_enabled": true,
  "max_upload_size": "1GB",
  "integration_ready": true,
  "ai_agents_available": true,
  "protocol_mismatch_handling": true
}
```

### GET /api/demo-status

Comprehensive component status.

**Response:**
```json
{
  "status": "🎯 SYSTEM STATUS",
  "streaming_enabled": "✅ 10x faster uploads active",
  "components": {
    "integration_layer": "✅ Ready",
    "ai_agents": "✅ Ready",
    "protocol_mismatch_handler": "✅ Ready",
    "preprocessor": "✅ Ready"
  },
  "system_info": {
    "version": "3.0.0",
    "protocol_mismatch_resistant": true
  },
  "demo_confidence": "💯 FULL AI ANALYSIS READY"
}
```

### GET /api/report/{study_id}

Get full medical report.

**Response:**
```json
{
  "study_id": "STUDY-1234567890",
  "report": "RADIOLOGY REPORT\n...",
  "findings": [...],
  "confidence_score": 0.85,
  "recommendations": [...],
  "generated_at": "2025-10-20T03:00:00Z"
}
```

### GET /api/analysis/{study_id}

Get analysis summary.

**Response:**
```json
{
  "success": true,
  "study_id": "STUDY-1234567890",
  "processing_time": 20.8,
  "images_processed": 150,
  "findings_count": 3,
  "confidence_score": 0.85,
  "report_preview": "First 200 chars..."
}
```

---

## 🧪 Test Examples

### Health Check Test

```plaintext
meta {
  name: Health Check
  type: http
  seq: 1
}

get {
  url: {{base_url}}/api/health
  body: none
  auth: none
}

tests {
  test("Health check returns 200", function() {
    expect(res.status).to.equal(200);
  });
  
  test("Status is healthy", function() {
    expect(res.body.status).to.include('HEALTHY');
  });
  
  test("Streaming enabled", function() {
    expect(res.body.streaming_enabled).to.equal(true);
  });
}
```

### Upload DICOM ZIP Test

```plaintext
meta {
  name: Upload DICOM ZIP
  type: http
  seq: 1
}

post {
  url: {{base_url}}/api/upload-zip
  body: multipartForm
  auth: none
}

body:multipart-form {
  file: @file(../../../test_data/sample_brain_mri.zip)
  clinical_question: Evaluate for brain lesions
  symptoms: Headaches for 3 months
  priority: routine
}

script:post-response {
  if (res.body && res.body.study_id) {
    bru.setVar('study_id', res.body.study_id);
    console.log('Study ID:', res.body.study_id);
  }
}

tests {
  test("Upload successful", function() {
    expect(res.status).to.equal(200);
    expect(res.body.status).to.equal('success');
  });
  
  test("Study ID generated", function() {
    expect(res.body.study_id).to.match(/^STUDY-/);
  });
  
  test("Streaming used", function() {
    expect(res.body.upload_stats.streaming).to.equal(true);
  });
}
```

---

## 🔄 CI/CD Integration

### GitHub Actions

```yaml
name: API Tests

on: [push, pull_request]

jobs:
  api-tests:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      
      - name: Set up Python
        uses: actions/setup-python@v4
        with:
          python-version: '3.9'
      
      - name: Install backend dependencies
        run: |
          cd backend
          pip install -r requirements.txt
      
      - name: Start FastAPI server
        run: |
          cd backend
          python main.py &
          sleep 10
      
      - name: Install Bruno CLI
        run: npm install -g @usebruno/cli
      
      - name: Run Bruno tests
        run: |
          cd bruno_collections/ReadMyMRI_API
          bru run --env development --reporter-json results.json
      
      - name: Upload test results
        uses: actions/upload-artifact@v3
        with:
          name: test-results
          path: bruno_collections/ReadMyMRI_API/results.json
```

### GitLab CI

```yaml
test-api:
  stage: test
  image: python:3.9
  services:
    - name: redis:latest
  before_script:
    - apt-get update && apt-get install -y nodejs npm
    - npm install -g @usebruno/cli
    - cd backend && pip install -r requirements.txt
  script:
    - python backend/main.py &
    - sleep 10
    - cd bruno_collections/ReadMyMRI_API
    - bru run --env development --reporter-junit results.xml
  artifacts:
    reports:
      junit: bruno_collections/ReadMyMRI_API/results.xml
```

---

## 🎯 Best Practices

### 1. Never Commit Secrets

Add to `.gitignore`:
```
environments/production.bru
environments/*.secret.bru
*.env
```

### 2. Use Environment Variables

```plaintext
# development.bru
vars {
  base_url: http://localhost:8000
  timeout: 30000
}

# production.bru (git-ignored)
vars {
  base_url: https://api.readmymri.com
  timeout: 30000
}

vars:secret [
  api_key
]
```

### 3. Organize Tests by Feature

```
Health_Checks/     # System health
DICOM_Processing/  # Core functionality
System_Status/     # Component status
Integration/       # End-to-end tests
Performance/       # Load tests
```

### 4. Use Post-Response Scripts

```plaintext
script:post-response {
  // Store study ID for subsequent tests
  if (res.body && res.body.study_id) {
    bru.setVar('study_id', res.body.study_id);
  }
  
  // Log useful info
  console.log('Processing time:', res.body.total_processing_time, 's');
  console.log('AI analysis:', res.body.upload_stats.ai_analysis);
}
```

### 5. Meaningful Test Names

```plaintext
test("Multi-agent consensus findings present", function() {
  if (res.body.analysis) {
    expect(res.body.analysis.consensus_findings).to.be.an('array');
  }
});
```

---

## 🐛 Troubleshooting

### Server Not Running

```bash
# Check if server is running
curl http://localhost:8000/api/health

# Start server
cd backend
python main.py
```

### Connection Refused

Check `base_url` in environment matches your server:
```plaintext
vars {
  base_url: http://localhost:8000  # Make sure port matches
}
```

### File Upload Fails

Ensure test file exists:
```bash
ls -la test_data/sample_brain_mri.zip
```

### Tests Fail

Run with verbose output:
```bash
bru run --env development --verbose
```

---

## 📚 Additional Resources

- **Bruno Documentation**: https://docs.usebruno.com
- **CLI Reference**: https://docs.usebruno.com/cli/overview
- **FastAPI Docs**: http://localhost:8000/docs (when server running)

---

## 🎉 Next Steps

1. ✅ Set up environment configuration
2. ✅ Start your backend server
3. ✅ Run health check test
4. ✅ Test DICOM upload
5. ✅ Integrate with CI/CD
6. ✅ Add custom tests for your use cases

Happy testing! 🚀