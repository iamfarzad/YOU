# YOU System Structure Guide

## Directory Layout

```
YOU/
├── YOU.md                      # Root hub
├── Calendar.md                 # Temporal tracking
├── Life Interaction/           # Daily moments
│   └── Life Interactions.md
├── Main Life Categories/       # 51 life domains
│   ├── Mental Health/
│   ├── Physical Health/
│   ├── Work/
│   └── ... (51 total)
└── _TEMPLATE.md              # Reference templates
```

## Nesting Rules

### Level 1: Root
- `YOU.md` — central navigation hub
- Cross-category templates and guides

### Level 2: Category
Each category folder contains:
- **Main file**: `[Category].md` or `[Category]_Overview.md`
- **Sub-files**: `[Topic].md` — specific aspects
- **Subfolders** (optional): Named subcategories

**Example:**
```
Mental Health/
├── Mental_Health.md            # Main category file
├── Stress_Management.md        # Level 2 topic
├── Anxiety_Management.md       # Level 2 topic
└── Therapy/                   # Level 3 subcategory (folder)
    └── Therapy.md
```

### Level 3: Subcategory (folders only)
Subcategory folders contain:
- Main topic file
- Related sub-topic files

**Example:**
```
Physical Health/
├── Physical_Health.md          # Main category
├── Exercise.md
└── Nutrition/                   # Subcategory folder
    ├── Nutrition.md            # Subcategory main file
    ├── Meal_Planning.md
    └── Dietary_Goals.md
```

### Naming Conventions

| Item | Format | Example |
|------|--------|---------|
| Category folder | Title Case with spaces | `Mental Health/` |
| Main file | `[Category].md` | `Mental_Health.md` |
| Topic file | `[Topic_Name].md` | `Stress_Management.md` |
| Subcategory folder | Title Case | `Emotional Intelligence/` |

### Links Between Levels

```markdown
# In category file (Level 2)
up:: [[YOU]]

# In topic file (Level 2/3)
up:: [[Mental Health]]

# In subcategory file (Level 3)
up:: [[Mental Health]]  # Links to parent category
```

## Template Structure

Every file follows this temporal template:

- **Perspective** — viewpoint on this topic
- **Past** — historical context and patterns
- **Current** — present state and activity log
- **Future** — trajectories (if unaddressed vs. with attention)

Each section includes:
- Tagged content for searchability
- Log tables for activity tracking
- Cross-category connection fields

## For AI Assistants

When a user references a topic:
1. **Locate** the file in appropriate category folder
2. **Check depth** — is this a main category, topic, or subcategory?
3. **Read** all temporal sections before responding
4. **Surface** cross-category connections in "Current" and "Future"

When creating new entries:
1. Use appropriate level based on topic scope
2. Follow temporal template exactly
3. Add `up:: [[Parent]]` links
4. Update related files' "Connections" sections
