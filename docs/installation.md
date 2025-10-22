# Installation Guide

## Prerequisites

- Python 3.9 or higher
- pip or poetry
- Git
- (Optional) Docker
- (Optional) Bruno CLI for API testing

## Standard Installation

### 1. Clone the Repository

```bash
git clone https://github.com/BTMMatty/readmymri.git
cd readmymri
```

### 2. Create Virtual Environment

```bash
# Using venv
python -m venv venv

# Activate on macOS/Linux
source venv/bin/activate

# Activate on Windows
venv\Scripts\activate
```

### 3. Install Dependencies

```bash
pip install -r requirements.txt
```

### 4. Verify Installation

```bash
python -c "from readmymri import DICOMPreprocessor; print('✓ Installation successful')"
```

## Development Installation

For contributors:

```bash
# Install with development dependencies
pip install -r requirements.txt
pip install -r requirements-dev.txt

# Install pre-commit hooks
pre-commit install
```

## Bruno CLI Installation (Optional)

For API testing:

```bash
npm install -g @usebruno/cli
```

## Docker Installation (Optional)

```bash
# Build image
docker build -t readmymri:latest .

# Run container
docker run -d -p 8000:8000 readmymri:latest
```

## Troubleshooting

### Issue: pydicom not found
```bash
pip install --upgrade pydicom
```

### Issue: daft-df installation fails
```bash
pip install --upgrade pip
pip install daft-df
```

### Issue: JPEG 2000 support missing
```bash
pip install pillow-jpls
```

## Next Steps

- Read the [Quick Start Guide](../README.md#quick-start)
- Review [HIPAA Compliance](hipaa_compliance.md)
- Set up [Bruno Testing](bruno_integration.md)