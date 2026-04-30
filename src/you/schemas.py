from dataclasses import dataclass, field
from typing import List

SCHEMA_VERSION = "0.1.0"

@dataclass
class RawCapture:
    id: str
    created_at: str
    source: str
    text: str

@dataclass
class NormalizedEvent:
    id: str
    raw_id: str
    date: str
    summary: str
    categories: List[str] = field(default_factory=list)
    confidence: str = "medium"

@dataclass
class MemoryCard:
    id: str
    type: str
    title: str
    summary: str
    confidence: str
    sensitivity: str
    surface_level: int
    source_ids: List[str] = field(default_factory=list)
