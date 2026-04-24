# Category Rules

A category becomes visible when one of these conditions is met:
- 2-3 related observations exist, or
- user directly names it, or
- one high-confidence event exists, or
- it links two already-visible areas.

Activation score:

evidence_count + recency_weight + emotional_intensity + cross_category_links + user_confirmation - contradiction_penalty

- 0-1: keep hidden
- 2-3: track internally
- 4-5: review queue
- 6+: visible category
