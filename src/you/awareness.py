from pathlib import Path
import json
from datetime import datetime


def refresh_awareness(root: Path) -> Path:
    state_file = root / "System" / "CATEGORY_STATE.json"
    state = {"categories": {}}
    if state_file.exists():
        state = json.loads(state_file.read_text())
    visible = [k for k, v in state.get("categories", {}).items() if v.get("visible")]
    out = root / "System" / "AWARENESS.md"
    out.write_text(
        "# YOU Awareness Snapshot\n"
        f"updated: {datetime.now().strftime('%Y-%m-%d %H:%M')}\n\n"
        "## Current state\n"
        f"- Visible categories: {', '.join(visible) if visible else 'None'}\n"
    )
    return out
