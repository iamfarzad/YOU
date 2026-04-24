# Recall Index

Use this as the first memory lookup layer during conversation.
Only surface memory if it is relevant, source-linked, confidence-labeled, and useful now.

## Memory Gate
- Relevance
- Confidence
- Sensitivity
- User consent
- Tone (optional, non-identity framing)
- Recency
- Source traceability

## Surface Levels
- 0: Do not surface
- 1: Silent context
- 2: Light mention
- 3: Ask before opening
- 4: Active flag (goals, deadlines, safety, major contradictions)

## Visual Tag Conventions
- `#node/focus`
- `#node/hypothesis`
- `#node/contradiction`
- `#node/open_loop`
- `#group/work`, `#group/wellbeing`, `#group/relationships`
- `#state/active`, `#state/stale`
- `#review/needed`

## Canonical Memory Card
```json
{
  "id": "mem_2026_04_24_001",
  "type": "observation | pattern | preference | decision | open_loop | contradiction | hypothesis",
  "title": "",
  "summary": "",
  "status": "active | stale | rejected | confirmed | needs_review",
  "confidence": "low | medium | high",
  "sensitivity": "low | medium | high",
  "surface_level": 0,
  "time_layer": "past | present | future",
  "categories": [],
  "source_ids": [],
  "created": "",
  "last_seen": "",
  "reviewed": false
}
```
