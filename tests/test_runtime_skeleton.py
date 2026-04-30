import json
import os
import tempfile
from pathlib import Path

from you.vault import ensure_vault_dirs
from you.capture import capture_raw
from you.compile import process_inbox
from you.awareness import refresh_awareness
from you.recall import recall_query


def test_runtime_capture_process_recall():
    with tempfile.TemporaryDirectory() as td:
        root = Path(td) / "YOU"
        ensure_vault_dirs(root)
        capture_raw(root, "test", "I lost project context between sessions.")
        capture_raw(root, "test", "Project context and agent workflow should persist.")

        count = process_inbox(root)
        assert count == 2

        state = json.loads((root / "System" / "CATEGORY_STATE.json").read_text())
        assert state["schema_version"] == "0.1.0"
        assert state["categories"]

        refresh_awareness(root)
        assert (root / "System" / "AWARENESS.md").exists()

        recall = recall_query(root, "project context")
        assert recall["memories"]
