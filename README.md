# YOU-memory

Local-first long-term memory for AI agents.

A personal knowledge management framework for holistic life tracking — connecting past experiences, current realities, and future trajectories across all life domains.

Originally built as the memory layer for Eve, now extracted as an open-source memory substrate for AI agents.

## Why this exists

AI agents can code, browse, plan, and use tools, but long projects still suffer from context loss.

Users repeat themselves, rebuild project history, burn tokens, and lose continuity across agents and sessions.

YOU-memory gives agents a user-owned memory layer: local markdown, source-linked observations, visible categories only when useful, and an `AWARENESS.md` file agents can read before helping.
It also gives users a visible, editable Obsidian graph of what is active, what is uncertain, and what needs attention.

## Purpose

This system connects life's domains to enable pattern recognition: when A and Z are unobserved but their effects surface elsewhere.

## Core Framework

### Temporal Tracking
Every entry captures:
- **Perspective** — viewpoint/reflection type (insight, concern, aspiration, observation)
- **Past** — historical context, prior experiences, learned patterns
- **Current** — present issues, active situations, ongoing dynamics
- **Future** — implications if unaddressed, desired outcomes, projected arcs

### Connection Logic
Life domains influence each other. Work stress → Sleep quality → Relationship patience → Career decisions. This system surfaces these hidden connections.

## Structure

```
YOU/
├── YOU.md                    # Hub and navigation
├── Profile.md                # User-provided identity/context
├── Current Notes.md          # Stream of recent observations
├── Recent Reflections.md     # AI summaries/hypotheses
├── Open Questions.md         # Unresolved prompts
├── Visible/                  # Surfaced categories only
├── Emerging/                 # Suggested new categories
├── Inbox/
│   ├── raw/                  # Immutable capture layer
│   ├── normalized/           # Mechanical normalization layer
│   └── processed/            # Archived processed raw notes
├── System/
│   ├── AWARENESS.md          # Compressed working-memory snapshot
│   ├── RECALL_INDEX.md       # Conversation-time memory surfacing rules
│   ├── recall_index.json     # Machine-readable memory cards
│   ├── TAXONOMY.md           # Hidden ontology
│   ├── EXTRACTION_SCHEMA.json # LLM extraction contract
│   ├── CATEGORY_RULES.md     # Surfacing thresholds
│   ├── CATEGORY_STATE.json   # Machine-readable state
│   ├── FOCUS.md              # Current attention nodes
│   ├── MEMORY_POLICY.md      # What can be auto-written
│   ├── CONSENT.md
│   ├── PRIVACY.md
│   ├── config.json
│   ├── open_loops.json
│   ├── PATTERNS.md
│   ├── OPEN_LOOPS.md
│   ├── CONTRADICTIONS.md
│   └── REVIEW_QUEUE.md
└── Main Life Categories/     # Hidden scaffolding ontology
```

See `examples/sample-vault/` for a quick fake-data demo vault.
See `adapters/` for minimal Claude Code, Codex, Hermes, OpenClaw, and gstack hooks.

## Getting Started

1. Start from `YOU.md` and the four visible pages (`Profile`, `Current Notes`, `Recent Reflections`, `Open Questions`)
2. Capture raw signals with `you capture --source <source> --text "..."`
3. Normalize + compile with `you process-inbox`
4. Surface categories only when thresholds are met (`System/CATEGORY_RULES.md`)
5. Review `System/AWARENESS.md` before deep category traversal
6. For conversation retrieval, use `you recall --query "..."` (or `you-memory recall "..."`)
7. Agent integrations should follow `AGENTS.md`.
8. For automation use `you watch` / `you daemon`; for a quick run use `you demo`.

## Visual Growth Loop

conversation happens → memory cards update → category state updates → focus nodes refresh → Obsidian graph changes → user confirms/rejects/renames.

## Tests

Run:

```bash
python3 -m pytest -q
```

## Philosophy

Built from the recognition that life is a system — the goal is to see connections between seemingly isolated domains, recognize patterns early, and intervene before compounding effects cascade.

Each entry asks: *What happens here if nothing changes? And what if something does?*

---

*Created 2023, refactored 2026*
