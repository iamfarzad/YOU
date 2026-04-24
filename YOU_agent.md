# YOU Agent Configuration

Agent-agnostic configuration for Life Intelligence Wiki operations.  
**Read this first** when working with the YOU system — defines architecture, operations, and tool conventions.

---

## Architecture

The YOU system is a temporal knowledge base with three layers:

```
┌─────────────────────────────────────────┐
│ YOU.md → index.md → SCHEMA.md          │ ← Entry points
├─────────────────────────────────────────┤
│ Main Life Categories/                  │
│   └── [Category]/                      │
│       ├── [Category].md (L1: Overview) │
│       ├── [Topic].md (L2: Specific)    │
│       └── [Subcategory]/ (L3: Nested)  │
│           └── [Subtopic].md            │
└─────────────────────────────────────────┘

Layer 1: Raw observations (immutable user input)
Layer 2: Compiled wiki (agent-maintained, cross-referenced)  
Layer 3: This config (agent reads to understand operations)
```

---

## Temporal Template

**Every** `.md` file contains four temporal sections:

```markdown
## Perspective
- Your vantage point on this domain
- Beliefs and assumptions

## Past
- Historical context
- Learned patterns
- Past inflection points

## Current
- Present state (satisfaction: [_]/10)
- Activity log table
- Cross-category effects

## Future
- **If unaddressed**: Default trajectory, compounding effects
- **With attention**: Intervention options
- **Desired state**: Target in 6-12 months
```

---

## Core Operations

When working with YOU, follow these operations:

### 1. INGEST (Log an Observation)

**Trigger phrases**: "log this", "record that", "I noticed", "today I", "this happened"

**Steps**:
1. Identify the **category** from user's description (match to `Main Life Categories/`)
2. Locate or create appropriate file: `[Category]/[Topic].md`
3. Extract: **Date**, **Event**, **Energy** (+/-/=), **Cross-category impacts**
4. Append to **Activity Log** table in Current section
5. Update **Future → If unaddressed** section if this changes trajectory
6. Cross-link using `[[Category]]` syntax

**Example log entry**:
```markdown
| 2026-04-23 | Work conflict with manager | -- | [[Stress Management]], [[Sleep Patterns]] |
```

---

### 2. QUERY (Synthesize Across Time)

**Trigger phrases**: "what's the pattern", "how did we get here", "connect the dots", "what links these"

**Steps**:
1. Identify **relevant categories** from user's question
2. Read **index.md** for quick navigation
3. For each category, traverse:
   - Past → patterns and cycles
   - Current → recent log entries
   - Future → trajectories and projections
4. Surface **cross-category connections**: what affects what
5. Synthesize with citations: "In [[Work]] (Current), you noted..."
6. **File findings back**: create new wiki page if valuable (queries compound too)

---

### 3. PREDICT (Project Future)

**Trigger phrases**: "what happens if", "where does this lead", "what if nothing changes", "predict"

**Steps**:
1. Start from **Current** state in relevant categories
2. Look at **Future → If unaddressed** sections
3. Extend the trajectory: Current state + time = ?
4. Check **cross-category effects**: Work stress → Sleep → Mood → Relationships
5. Project **cascade chains**: A → B → C where user only sees A
6. Present: "Current → 3 months → 6 months → 12 months" with connections

**Key insight**: The prediction emerges from connecting distant categories, not deep analysis of one.

---

### 4. LINT (Health Check)

**Trigger phrases**: "check wiki", "health check", "what's missing", "contradictions"

**Steps**:
1. Scan directories for:
   - **Orphan pages** (no `up::` links)
   - **Broken links** (typos in `[[Category]]`)
   - **Stale entries** (no updates in > 6 months)
2. Check for contradictions:
   - Goals in one category vs. actions in another (e.g., "rest" goal + 60hr weeks)
3. Identify gaps:
   - Mentioned in logs but no dedicated page
   - Predicted outcomes but no prevention plan
4. Report findings with recommended actions

---

## Tool Conventions

When using tools to interact with YOU:

### File Discovery
- Read `index.md` first to understand category structure
- Use file search in `Main Life Categories/` to find relevant files
- Navigate via categories, not individual filenames

### Reading Files
- **Read temporal sections in order**: Perspective → Past → Current → Future
- Note energy scores in Activity Log
- Track cross-category effects to the right of log tables

### Writing Files
- Preserve existing structure
- Only modify Future sections if predicting/proposing changes
- Maintain Activity Log format: `| Date | Event | Energy | Cross-impact |`
- Always include `up:: [[Parent]]` link

### Cross-Linking
- Use `[[Category Name]]` syntax for wiki links
- Link across categories liberally — that's where intelligence emerges
- Example: In Work, link to [[Stress Management]], [[Relationships]], [[Sleep Patterns]]

---

## Directory Structure

```
YOU/
├── YOU.md              # Hub: central navigation
├── index.md            # Catalog: all categories table
├── YOU_agent.md        # This file: operational conventions
├── SCHEMA.md           # Wiki conventions reference
├── Calendar.md         # Time-based tracking
├── Life Interaction/   # Daily moment logs
├── Main Life Categories/ # 51 life domains
│   ├── Mental Health/
│   ├── Physical Health/
│   ├── Work/
│   └── ... (51 total)
└── templates/
    ├── TEMPLATE.md       # L1 category template
    └── TEMPLATE_SUBTOPIC.md # L2 topic template
```

---

## Integration Note

This configuration works with ANY LLM or AI agent. The patterns are:
- **Declarative**: what exists (files, structure)
- **Procedural**: what to do (ingest, query, predict, lint)
- **Semantic**: how to interpret (temporal sections, cross-links)

No code execution needed — read files, update files, surface patterns.

---

## Agent Boot Sequence

1. Read `System/AWARENESS.md`
2. Read `System/RECALL_INDEX.md` and `System/recall_index.json`
3. Read `System/FOCUS.md` and `System/open_loops.json`
4. Treat `System/EXTRACTION_SCHEMA.json` as the contract for structured extraction outputs
5. Read `Profile.md`, `Current Notes.md`, `Recent Reflections.md`, `Open Questions.md`
6. Read `log.md`
7. Read `index.md` only if needed for hidden ontology navigation
8. Read `Visible/` pages before `Main Life Categories/`
9. Read only relevant category files in `Main Life Categories/` when evidence requires it
10. Never infer from memory alone when source files disagree
11. Cite source files when giving insight

---

## Getting Started

1. **Navigate**: Start at `System/AWARENESS.md` + user-facing pages
2. **Ingest**: Capture with `you capture`, then compile with `you process-inbox`
3. **Query**: Read Past + Current across 2-3 categories for patterns
4. **Predict**: Extend Future sections into time horizons
5. **Lint**: Before long sessions, run health check

---

**Last updated**: 2026-04-23
