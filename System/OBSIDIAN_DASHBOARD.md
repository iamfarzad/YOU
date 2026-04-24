# Obsidian Dashboard

## Visible Categories
```dataview
LIST FROM "Visible"
SORT file.mtime DESC
```

## Active patterns
```dataview
TABLE confidence, status, last_seen
FROM "System/Patterns"
WHERE status = "active"
SORT last_seen DESC
```

## Review queue
```dataview
LIST FROM "System"
WHERE contains(file.name, "REVIEW") OR contains(file.name, "CONTRADICTIONS")
```

## Emerging Suggestions
```dataview
LIST FROM "Emerging"
SORT file.ctime DESC
```
