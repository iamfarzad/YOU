# YOU System Schema

## Architecture

This is a **Life Intelligence Wiki** following the Karpathy LLM Wiki pattern.

### Four Layers

1. **Raw sources** — User input, journal entries, observations (immutable)
2. **Observation state** — Normalized events and category activation state
3. **Visible wiki** — Surfaced pages with enough evidence
4. **This schema** — Conventions for structure, linking, and workflows

---

## Page Conventions

### File Structure

```
Main Life Categories/[Category]/
├── [Category].md              # Overview file
├── [Topic].md                 # L2: Specific topic
└── [Subcategory]/             # L3: Nested category (optional)
    └── [Subtopic].md
```

### Frontmatter

```yaml
---
up: "[[Parent]]"
tags: ["#Category", "#LifeCategory"]
created: YYYY-MM-DD
updated: YYYY-MM-DD
---
```

For surfaced nodes, include visual metadata fields such as:
`type`, `status`, `node_type`, `importance`, `confidence`, `energy`, `last_seen`, `evidence_count`, `surface_level`, `color_group`, `review_status`, `pinned`, and graph tags.

---

## Temporal Template

Every file tracks across time:

### Perspective
- Your vantage point on this domain
- What stories/beliefs shape your view?

### Past
- Historical context and patterns
- Learned behaviors
- Prior inflection points

### Current
- Present state
- Activity log table
- Cross-category effects

### Future
- Hypotheses, risks, opportunities, and possible trajectories
- **With attention**: Intervention options to test
- Desired state in 6-12 months (as a planning hypothesis)

---

## Link Conventions

- **Up**: `up: "[[Parent]]"` — always link to parent category
- **Cross**: `[[Category]]` — link to related categories
- **Down**: List subcategories in "Subcategories" section

---

## Operations

### Pipeline
1. **Capture** → immutable raw signals in `Inbox/raw/`
2. **Normalize** → conservative event extraction in `Inbox/normalized/`
3. **Compile** → update category state + visible pages + review queue
4. **Surface** → render in Obsidian via dashboards/backlinks/graph

### Visibility Rules
- Full ontology is hidden scaffolding (`Main Life Categories/` + `System/TAXONOMY.md`)
- User starts from `Profile.md`, `Current Notes.md`, `Recent Reflections.md`, `Open Questions.md`
- Categories surface into `Visible/` when activation score threshold is met
- Low-confidence or emergent categories go into `Emerging/` and `System/REVIEW_QUEUE.md`

### Ingest
1. User provides entry (date, category, content)
2. Agent locates or creates appropriate file
3. Append to Activity Log in "Current" section
4. Update "Future" projections if needed
5. Cross-link to related categories

### Awareness Refresh
1. Read recent logs and category activity
2. Summarize active patterns with confidence labels
3. Track open loops and watchlist risks
4. Write compressed snapshot to `System/AWARENESS.md`
5. Refresh `System/FOCUS.md` for current attention nodes

### Recall (Conversation Memory)
1. Read `System/recall_index.json` for candidate memories
2. Apply memory gate: relevance, confidence, sensitivity, consent, recency, source
3. Assign surface level (0-4) and return only top relevant cards
4. Phrase surfaced memory as optional and correctable

### Extraction Contract
- Use `System/EXTRACTION_SCHEMA.json` as the output schema for optional LLM extraction.
- Treat downstream outputs as observations/hypotheses unless user-confirmed.

### Query
1. Read index.md for navigation
2. Search relevant category files
3. Synthesize across temporal sections
4. Cite specific entries

### Lint
- Orphan pages (no inbound links)
- Broken wiki links
- Stale "Future" projections
- Missing cross-references
- Memory safety checks (source IDs, sensitivity levels, hypothesis/fact separation)

---

## Categories (51)

See index.md for full list. Core categories:

- Mental Health, Physical Health, Sleep Patterns
- Work, Career Progression, Finance
- Relationships, Family, Social Life
- Personal Growth, Learning, Goals
- Creative Projects, Recreation, Travel

---

## Rules

1. **Agent maintains** — humans provide content, agent handles structure
2. **Temporal logging** — every entry date-stamped
3. **Cross-referencing** — surface connections between domains
4. **Pattern tracking** — what predicts changes? what follows?
5. **No redundant folders** — files live at appropriate level
