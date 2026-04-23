# YOU System Schema

## Architecture

This is a **Life Intelligence Wiki** following the Karpathy LLM Wiki pattern.

### Three Layers

1. **Raw sources** — User input, journal entries, observations (immutable)
2. **The wiki** — Compiled markdown pages with temporal tracking (agent-maintained)
3. **This schema** — Conventions for structure, linking, and workflows

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
- **If unaddressed**: Default trajectory
- **With attention**: Possible interventions
- Desired state in 6-12 months

---

## Link Conventions

- **Up**: `up: "[[Parent]]"` — always link to parent category
- **Cross**: `[[Category]]` — link to related categories
- **Down**: List subcategories in "Subcategories" section

---

## Operations

### Ingest
1. User provides entry (date, category, content)
2. Agent locates or creates appropriate file
3. Append to Activity Log in "Current" section
4. Update "Future" projections if needed
5. Cross-link to related categories

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
