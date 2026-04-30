from datetime import datetime
from pathlib import Path
import json


def capture_raw(root: Path, source: str, text: str) -> Path:
    stamp = datetime.now().strftime("%Y-%m-%dT%H-%M-%S-%f")
    payload = {
        "id": f"raw_{datetime.now().strftime('%Y%m%d_%H%M%S')}",
        "created_at": datetime.now().isoformat(timespec="seconds"),
        "source": source,
        "text": text,
    }
    out = root / "Inbox" / "raw" / f"{stamp}_{source}.json"
    out.write_text(json.dumps(payload, indent=2) + "\n")
    return out
