from pathlib import Path
import os


def resolve_vault_dir() -> Path:
    env = os.environ.get("YOU_DIR")
    if env:
        return Path(env).expanduser()
    cwd = Path.cwd()
    if (cwd / "System").exists() and (cwd / "Inbox").exists():
        return cwd
    return Path.home() / "YOU"


def ensure_vault_dirs(root: Path) -> None:
    for rel in [
        "Inbox/raw",
        "Inbox/normalized",
        "Inbox/processed",
        "System",
        "Visible",
        "Emerging",
    ]:
        (root / rel).mkdir(parents=True, exist_ok=True)
