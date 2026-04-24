---
name: you-system
version: 1.0.0
description: |
  Life Intelligence Wiki — temporal knowledge base for holistic life tracking.
  Ingest observations, query across time, predict futures, lint health.
  Supports Perspective→Past→Current→Future temporal traversal and cross-category pattern recognition.
triggers:
  - log entry
  - record this
  - i noticed
  - today i
  - this happened
  - what's the pattern
  - connect the dots
  - how did we get here
  - what links these
  - what happens if
  - where does this lead
  - predict
  - check wiki
  - health check
  - what's missing
allowed-tools:
  - Read
  - Write
  - Search
  - Edit
---

# YOU System — Life Intelligence Wiki

## When to Use

**Always** when working with personal life tracking, goal monitoring, self-care, or pattern discovery across life domains. This is NOT generic note-taking — it's temporal intelligence with predictive capability.

---

## Triggers

| User says... | Invoke... | Purpose |
|--------------|-----------|---------|
| "Log this" / "record that" / "today I..." | **INGEST** | Add observation to appropriate category |
| "What's the pattern?" / "connect the dots" | **QUERY** | Synthesize across temporal sections |
| "What happens if?" / "where does this lead?" | **PREDICT** | Project future from Current state |
| "Check wiki" / "health check" | **LINT** | Validate structure, find gaps, surface contradictions |
| "I want to track..." / "new category" | **INIT** | Create new category from template |

**In doubt? INVOKED.** Better to run a skill workflow than answer ad-hoc.

---

## Workflows

### INGEST: "Log an observation"

**Goal**: Capture life event with temporal context and cross-category links.

**Inputs**:
- Date (default: today)
- Event description
- Category ( infer from content: Work? Mental Health? Relationships? )
- Energy: + / - / = / ++ / --
- Cross-impacts: what other categories affected?

**Steps**:

```
1. READ YOU_agent.md
   → Understand temporal template structure

2. IDENTIFY category
   → Read index.md for category list
   → Match user's description to category

3. LOCATE or CREATE file
   → Main Life Categories/[Category]/[Topic].md
   → If new: use TEMPLATE.md structure

4. READ the file
   → Get Current section Activity Log
   → Note existing cross-category links

5. APPEND to Activity Log
   | Date | Event | Energy | Cross-Impact |
   |------|-------|--------|--------------|
   | YYYY-MM-DD | [description] | [+/-/=] | [[Category1]], [[Category2]] |

6. UPDATE Future → If unaddressed
   → Does this entry change the trajectory?
   → Add or update projection

7. CROSS-LINK
   → In related categories, mention this entry
   → Use [[Category]] syntax

8. CONFIRM
   → "Logged to [[Category]]/[[Topic]]. Cross-linked to [[Category1]], [[Category2]]."
```

---

### QUERY: "What's the pattern?"

**Goal**: Synthesize insights across time and categories.

**Inputs**:
- Question or pattern to explore
- Categories involved (single or multiple)
- Time horizon (Past week? Past month? All time?)

**Steps**:

```
1. READ YOU_agent.md
   → Understand temporal traversal

2. READ index.md
   → Identify relevant categories

3. FOR EACH relevant category:
   READ Main Life Categories/[Category]/[Topic].md
   
   Extract:
   - Past → patterns and cycles
   - Current → Activity Log entries
   - Future → trajectories

4. SURFACE CROSS-CATEGORY CONNECTIONS
   → What affects what?
   → Work stress → Sleep → Mood → Relationships
   → Finance → Stress → Health

5. SYNTHESIZE
   → "In [[Work]] Current, you noted [X]..."
   → "This connects to [[Sleep Patterns]] Past where..."
   → "The pattern: [explanation with citations]"

6. FILE FINDINGS (optional)
   → If valuable: create new page with synthesis
   → This compounds knowledge
```

---

### PREDICT: "What happens if?"

**Goal**: Project future trajectory from Current state.

**Inputs**:
- Current situation or trend
- Time horizon (3mo / 6mo / 12mo)
- Intervention option (optional)

**Steps**:

```
1. READ YOU_agent.md
   → Understand prediction methodology

2. IDENTIFY relevant categories
   → Start from user's stated domain
   → Ask: what connects? (use index.md)

3. READ Current sections
   → Satisfaction: [_]/10
   → Activity Log (recent energy patterns)
   → Cross-category effects currently active

4. EXTEND trajectory
   Current → 3mo → 6mo → 12mo
   
   Project each category:
   - [[Work]]: current stress + 6mo = ?
   - [[Sleep]]: current disruption + 6mo = ?
   - [[Relationships]]: availability + 6mo = ?

5. CASCADE analysis
   → Category A affects B affects C
   → Example: Work stress → Low sleep → Irritability → Relationship friction
   → Surface the chain the user doesn't see

6. PRESENT
   → "If unaddressed: [trajectory with timeline]"
   → "Intervention option: [action] → [alternative trajectory]"
   → "Cross-domain effect: [[Category]] will experience [outcome]"
```

---

### LINT: "Health check"

**Goal**: Validate wiki integrity and identify gaps.

**Steps**:

```
1. SCAN structure
   → Any orphan files? (no up:: link)
   → Any broken [[links]]?

2. CHECK staleness
   → Files with no entry in > 6mo
   → Activity Logs with gaps > 2mo

3. IDENTIFY contradictions
   → [[Goals]] says "prioritize health"
   → [[Work]] shows 70hr weeks
   → Flag the mismatch

4. FIND gaps
   → Mentioned in log but no dedicated page
   → Predicted outcome but no prevention plan
   - Cross-category connection stated once, never revisited

5. REPORT
   → Findings with severity
   → Recommended actions
```

---

## Output Format

**Every response must include**:
- Citation: which file(s) were read/modified
- Cross-references: what connects to what
- Temporal marker: where in time (Past/Current/Future)

**Example**:
```
In [[Work]]/Current (2026-04-23 entry), you noted manager conflict with -- energy.

This connects to:
- [[Stress Management]]/Current: "frequent mid-week spikes"
- [[Sleep Patterns]]/Past: previous work stress → insomnia pattern

Trajectory if unaddressed:
→ 3mo: continued anxiety, sleep degradation
→ 6mo: affecting Relationships patience
→ Cross-impact: [[Mental Health]]/

Recommended: update Future → With attention section with boundary-setting plan.
```

---

## Tool Conventions

**File Discovery**:
- Always read `index.md` before searching
- Navigate categories → topics → subcategories
- Use sidebar structure, not filename patterns

**Reading Files**:
- Read temporal sections in order: Perspective → Past → Current → Future
- Extract Activity Log tables fully
- Note cross-category effects right column

**Writing Files**:
- Preserve existing structure
- Only modify sections relevant to operation
- Maintain Activity Log format exactly
- Update last-modified date

---

## Error Handling

**Category mismatch**: "This sounds like [[Mental Health]], not [[Work]] — shall I file it there?"

**File doesn't exist**: Create from `templates/TEMPLATE.md`

**Conflicting entries**: Surface contradiction: "[[Goals]] says X but [[Current]] shows Y"

**Missing cross-link**: Recommend link: "Should this connect to [[Sleep Patterns]]?"

---

## Success Metrics

**After every operation**:
- Is the entry traceable? (clear Date + Category + Topic)
- Is it connected? (cross-links present)
- Is it temporal? (sits in Past/Current/Future)
- Is it actionable? (Future section has trajectory)

If yes → operation successful.
