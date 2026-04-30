from pathlib import Path
import json


def recall_query(root: Path, query: str, limit: int = 5) -> dict:
    recall_file = root / "System" / "recall_index.json"
    data = {"memories": []}
    if recall_file.exists():
        data = json.loads(recall_file.read_text())
    q = set(query.lower().split())
    ranked = []
    for m in data.get("memories", []):
        text = f"{m.get('title','')} {m.get('summary','')}".lower()
        score = sum(1 for t in q if t in text)
        if score:
            mm = dict(m)
            mm["score"] = score
            ranked.append(mm)
    ranked.sort(key=lambda x: x["score"], reverse=True)
    return {"query": query, "memories": ranked[:limit]}
