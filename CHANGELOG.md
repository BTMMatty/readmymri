# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.0.0] - 2025-10-20

### Added
- Initial release
- HIPAA-compliant PHI stripping for DICOM files
- High-quality image compression (JPEG 2000, WebP)
- Anonymous ID generation
- Daft DataFrame integration
- Bruno API testing framework
- Comprehensive documentation
- Docker support
- CI/CD pipelines

### Security
- Implements DICOM PS3.15 Annex E deidentification
- Strips 30+ PHI-containing DICOM tags
- Deterministic anonymous ID generation
- TLS 1.3 encryption for API communications

## [Unreleased]

### Planned for 1.1.0
- Multi-modality support (CT, X-ray, ultrasound)
- Advanced compression algorithms
- Real-time processing API
- Cloud storage integration (S3, Azure Blob)

### Planned for 2.0.0
- Distributed processing with Dask
- GPU acceleration for compression
- Advanced ML models (segmentation, classification)
- Web-based UI for non-technical users
- FHIR integration
