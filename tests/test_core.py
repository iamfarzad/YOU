import importlib.util
from importlib.machinery import SourceFileLoader
from pathlib import Path


def load_you_module():
    script_path = Path(__file__).resolve().parents[1] / "bin" / "you"
    loader = SourceFileLoader("you_cli", str(script_path))
    spec = importlib.util.spec_from_loader("you_cli", loader)
    mod = importlib.util.module_from_spec(spec)
    spec.loader.exec_module(mod)
    return mod


def test_compute_activation_score():
    m = load_you_module()
    assert m.compute_activation_score(3, intensity=1, cross_links=1) == 6


def test_relevance_score_positive():
    m = load_you_module()
    mem = {"title": "Investor calls and avoidance", "summary": "stress before investor calls", "tags": ["work"]}
    assert m.relevance_score("investor call pressure", mem) >= 1


def test_surface_level_sensitive_gate():
    m = load_you_module()
    mem = {"title": "Relationship stress", "summary": "relationship anxiety", "confidence": "medium", "evidence_count": 2}
    assert m.surface_level(mem, "relationship anxiety", consent=False) == 0
