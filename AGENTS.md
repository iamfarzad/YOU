# YOU-memory Agent Protocol

## Before responding
1. Read `System/AWARENESS.md`.
2. Read `System/recall_index.json` only if the user message may connect to memory.
3. Treat memories as:
   - facts
   - observations
   - hypotheses
   - open loops
   - user-confirmed preferences
4. Never treat hypotheses as facts.
5. Surface memories only through the recall gate (relevance, confidence, sensitivity, consent, tone, recency, source).

## After meaningful work
1. Ask whether the result should be remembered, or capture automatically if auto-capture is enabled in `System/config.json`.
2. Write raw memory to `Inbox/raw/` (via `you capture`).
3. Run or suggest `you process-inbox`.
4. Refresh `System/AWARENESS.md`.
