"""Pytest configuration for Mission Control Backend tests."""
import os
import sys


def pytest_configure(config):
    """Configure paths and enable main module import during testing.

    The backend uses relative imports (from .config). To allow test files to
    import directly from 'main', we add project root to path before importing."""

    # Add project root to sys.path for direct imports if not already there
    backend_root = os.environ.get("MISSION_CONTROL_BACKEND_ROOT", "") or "/Users/alfredkamisese/developer/Mission_Control/mission-control-dashboard/backend"
    if "backend/main.py" in __file__ and backend_root not in sys.path:
        print(f"[conftest] Adding {backend_root} to path")  # noqa T201
