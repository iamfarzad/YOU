import argparse
import json
from .vault import resolve_vault_dir, ensure_vault_dirs
from .capture import capture_raw
from .compile import process_inbox
from .awareness import refresh_awareness
from .recall import recall_query


def main() -> int:
    parser = argparse.ArgumentParser(description="YOU-memory runtime CLI")
    sub = parser.add_subparsers(dest="cmd")

    cap = sub.add_parser("capture")
    cap.add_argument("--source", default="chat")
    cap.add_argument("--text", required=True)

    sub.add_parser("process-inbox")
    sub.add_parser("awareness")

    rec = sub.add_parser("recall")
    rec.add_argument("--query", required=True)

    args = parser.parse_args()
    root = resolve_vault_dir()
    ensure_vault_dirs(root)

    if args.cmd == "capture":
        p = capture_raw(root, args.source, args.text)
        print(p)
        return 0
    if args.cmd == "process-inbox":
        print(process_inbox(root))
        return 0
    if args.cmd == "awareness":
        print(refresh_awareness(root))
        return 0
    if args.cmd == "recall":
        print(json.dumps(recall_query(root, args.query), indent=2))
        return 0

    parser.print_help()
    return 1


if __name__ == "__main__":
    raise SystemExit(main())
