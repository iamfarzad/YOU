import json
from pathlib import Path


def test_extraction_schema_exists():
    p = Path('System/EXTRACTION_SCHEMA.json')
    assert p.exists()
    data = json.loads(p.read_text())
    assert 'observations' in data
    assert 'future_hypotheses' in data


def test_recall_schema_version_exists():
    p = Path('System/recall_index.json')
    data = json.loads(p.read_text())
    assert data.get('schema_version')
