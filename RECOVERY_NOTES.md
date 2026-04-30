# Recovery Notes: PR #2 / PR #4 Artifacts

This repository currently includes the artifacts reported as lost after history rewrite and branch deletions.

## Restored / Present Components

- Tests for core scoring and safety gate behavior:
  - `tests/test_core.py`
  - `tests/test_files.py`
  - `tests/test_runtime_skeleton.py`
- Policy and schema docs:
  - `System/MEMORY_POLICY.md`
  - `System/EXTRACTION_SCHEMA.json`
- Adapters:
  - `adapters/claude-code/`
  - `adapters/codex/`
  - `adapters/gstack/`
  - `adapters/hermes/`
  - `adapters/openclaw/`
- Sample vault:
  - `examples/sample-vault/`
- Daemonization support:
  - `launchd/com.you-memory.agent.plist`
- Runtime/CLI memory features (capture, process-inbox, refresh-awareness, recall, daemon/watch):
  - `bin/you`
  - `bin/you-memory`
  - `src/you/`

## Verification

Run:

```bash
python3 -m pytest -q
```

Expected: all tests pass.
