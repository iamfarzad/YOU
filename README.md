# YOU Life Intelligence System

A personal knowledge management framework for holistic life tracking — connecting past experiences, current realities, and future trajectories across all life domains.

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
│   ├── TAXONOMY.md           # Hidden ontology
│   ├── CATEGORY_RULES.md     # Surfacing thresholds
│   ├── CATEGORY_STATE.json   # Machine-readable state
│   ├── PATTERNS.md
│   ├── OPEN_LOOPS.md
│   ├── CONTRADICTIONS.md
│   └── REVIEW_QUEUE.md
└── Main Life Categories/     # Hidden scaffolding ontology
```

## Getting Started

1. Start from `YOU.md` and the four visible pages (`Profile`, `Current Notes`, `Recent Reflections`, `Open Questions`)
2. Capture raw signals with `you capture --source <source> --text "..."`
3. Normalize + compile with `you process-inbox`
4. Surface categories only when thresholds are met (`System/CATEGORY_RULES.md`)
5. Review `System/AWARENESS.md` before deep category traversal

## Philosophy

Built from the recognition that life is a system — the goal is to see connections between seemingly isolated domains, recognize patterns early, and intervene before compounding effects cascade.

Each entry asks: *What happens here if nothing changes? And what if something does?*

---

*Created 2023, refactored 2026*
