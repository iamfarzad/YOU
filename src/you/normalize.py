from datetime import datetime
from pathlib import Path
import json


def normalize_raw_file(raw_file: Path, out_dir: Path) -> Path:
    payload = json.loads(raw_file.read_text())
    text = payload.get("text", "")
    categories = []
    lower = text.lower()
    if any(w in lower for w in ["work", "project", "deadline", "meeting", "agent"]):
        categories.append("Work")
    if any(w in lower for w in ["sleep", "tired", "insomnia"]):
        categories.append("Sleep Patterns")
    if not categories:
        categories = ["Mental Health"]

    event = {
        "schema_version": "0.1.0",
        "id": f"evt_{datetime.now().strftime('%Y%m%d_%H%M%S')}",
        "raw_id": payload.get("id"),
        "date": datetime.now().strftime("%Y-%m-%d"),
        "summary": text,
        "categories": categories,
        "confidence": "medium",
    }
    out = out_dir / raw_file.name
    out.write_text(json.dumps(event, indent=2) + "\n")
    return out
