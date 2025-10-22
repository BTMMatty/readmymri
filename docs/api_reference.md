# API Reference

## Core Classes

### DICOMPreprocessor

Main class for DICOM processing pipeline.

```python
class DICOMPreprocessor(output_dir, compression_format='jpeg2000', compression_quality=95)
```

**Parameters:**
- `output_dir` (Path): Output directory for processed files
- `compression_format` (str): 'jpeg2000' or 'webp'
- `compression_quality` (int): Quality level 1-100

**Methods:**

#### process_dicom_file()
```python
process_dicom_file(dicom_path, clinical_context) -> AnonymizedDICOMRecord
```

#### process_directory()
```python
process_directory(dicom_dir, clinical_context) -> List[AnonymizedDICOMRecord]
```

#### create_daft_dataframe()
```python
create_daft_dataframe() -> daft.DataFrame
```

#### save_to_parquet()
```python
save_to_parquet(output_path) -> None
```

### ClinicalContext

Clinical context without PHI.

```python
@dataclass
class ClinicalContext:
    clinical_indication: str
    body_region: str
    scan_type: str
    age_range: str
    gender: Optional[str] = None
    clinical_history: Optional[str] = None
```

### DICOMPHIStripper

PHI stripping implementation.

```python
class DICOMPHIStripper(salt=None)
```

**Methods:**

#### strip_phi()
```python
strip_phi(dicom_dataset) -> Tuple[Dataset, Dict]
```

#### generate_anonymous_id()
```python
generate_anonymous_id(patient_id, study_uid) -> str
```

## Example Usage

```python
from pathlib import Path
from readmymri import DICOMPreprocessor, ClinicalContext

# Initialize
preprocessor = DICOMPreprocessor(
    output_dir=Path('./output'),
    compression_format='jpeg2000',
    compression_quality=95
)

# Create context
context = ClinicalContext(
    clinical_indication="Suspected lesion",
    body_region="Brain",
    scan_type="T1-weighted MRI",
    age_range="40-50"
)

# Process
records = preprocessor.process_directory(
    Path('./raw_dicom'),
    context
)

# Create DataFrame
df = preprocessor.create_daft_dataframe()

# Save
preprocessor.save_to_parquet(Path('./output/data.parquet'))
```
