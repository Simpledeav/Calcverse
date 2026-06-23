"""pytest conftest — adds api/ directory to Python path for all test files."""
import sys
from pathlib import Path

# Add the api directory to sys.path so tests can import main and routers directly
api_dir = Path(__file__).resolve().parent.parent
if str(api_dir) not in sys.path:
    sys.path.insert(0, str(api_dir))
