# Contributing to ReadMyMRI

Thank you for your interest in contributing to ReadMyMRI!

## Getting Started

1. Fork the repository
2. Clone your fork: `git clone https://github.com/YOUR_USERNAME/readmymri.git`
3. Create a branch: `git checkout -b feature/your-feature-name`
4. Make your changes
5. Run tests: `pytest`
6. Commit: `git commit -m "feat: your feature description"`
7. Push: `git push origin feature/your-feature-name`
8. Create a Pull Request

## Development Setup

```bash
# Create virtual environment
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt
pip install -r requirements-dev.txt

# Install pre-commit hooks
pre-commit install
```

## Code Style

- Follow PEP 8
- Use type hints
- Write docstrings (Google style)
- Format with Black: `black src/ tests/`
- Sort imports with isort: `isort src/ tests/`
- Lint with flake8: `flake8 src/ tests/`

## Testing

```bash
# Run all tests
pytest

# Run with coverage
pytest --cov=readmymri --cov-report=html

# Run specific tests
pytest tests/unit/test_phi_stripper.py
```

## Pull Request Guidelines

- Update documentation if needed
- Add tests for new features
- Ensure all tests pass
- Update CHANGELOG.md
- Run security audit: `python audit_script.py .`
- No PHI or secrets in commits

## PR Checklist

- [ ] Code follows style guidelines
- [ ] Tests added/updated
- [ ] Documentation updated
- [ ] Bruno collections updated (if API changed)
- [ ] No PHI or secrets committed
- [ ] Audit script passes
- [ ] All tests pass

## Commit Message Format

```
<type>: <subject>

<body>

<footer>
```

Types:
- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation
- `style`: Formatting
- `refactor`: Code restructuring
- `test`: Tests
- `chore`: Maintenance

Example:
```
feat: add WebP compression support

Implements WebP compression as alternative to JPEG 2000
for faster processing with acceptable quality.

Closes #123
```

## Questions?

- GitHub Issues: https://github.com/BTMMatty/readmymri/issues
- Email: contributors@readmymri.org
