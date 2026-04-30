from pathlib import Path
import json
import shutil


def process_inbox(root: Path) -> int:
    from .normalize import normalize_raw_file

    raw_dir = root / "Inbox" / "raw"
    norm_dir = root / "Inbox" / "normalized"
    done_dir = root / "Inbox" / "processed"
    state_file = root / "System" / "CATEGORY_STATE.json"
    recall_file = root / "System" / "recall_index.json"

    state = {"schema_version": "0.1.0", "categories": {}}
    if state_file.exists():
        state = json.loads(state_file.read_text())
        state.setdefault("schema_version", "0.1.0")
        state.setdefault("categories", {})

    recall = {"schema_version": "0.1.0", "memories": []}
    if recall_file.exists():
        recall = json.loads(recall_file.read_text())
        recall.setdefault("schema_version", "0.1.0")
        recall.setdefault("memories", [])

    count = 0
    for raw_file in sorted(raw_dir.glob("*.json")):
        norm = normalize_raw_file(raw_file, norm_dir)
        event = json.loads(norm.read_text())
        for c in event.get("categories", []):
            node = state["categories"].setdefault(c, {"evidence_count": 0, "visible": False})
            node["evidence_count"] += 1
            node["visible"] = node["evidence_count"] >= 2
        recall["memories"].append({
            "id": f"mem_{event['id']}",
            "title": f"{event['categories'][0]} signal",
            "summary": event["summary"],
            "confidence": event["confidence"],
            "sensitivity": "low",
            "surface_level": 2,
            "source_ids": [event["raw_id"]],
        })
        shutil.move(str(raw_file), done_dir / raw_file.name)
        count += 1

    state_file.write_text(json.dumps(state, indent=2) + "\n")
    recall_file.write_text(json.dumps(recall, indent=2) + "\n")
    return count
