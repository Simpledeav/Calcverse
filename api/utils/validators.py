"""
Validation utilities for CalcVerse API endpoints.
"""


def validate_numeric(value, name="value", min_val=None, max_val=None):
    """Validate a numeric value is within optional range."""
    try:
        val = float(value)
    except (TypeError, ValueError):
        raise ValueError(f"{name} must be a numeric value, got {type(value).__name__}")

    if min_val is not None and val < min_val:
        raise ValueError(f"{name} must be >= {min_val}")
    if max_val is not None and val > max_val:
        raise ValueError(f"{name} must be <= {max_val}")
    return val


def validate_positive(value, name="value"):
    """Validate a value is positive (> 0)."""
    val = validate_numeric(value, name)
    if val <= 0:
        raise ValueError(f"{name} must be positive")
    return val


def validate_non_negative(value, name="value"):
    """Validate a value is non-negative (>= 0)."""
    val = validate_numeric(value, name)
    if val < 0:
        raise ValueError(f"{name} must be non-negative")
    return val


def validate_percentage(value, name="rate"):
    """Validate a percentage value (0–100)."""
    val = validate_numeric(value, name)
    if val < 0 or val > 100:
        raise ValueError(f"{name} must be between 0 and 100")
    return val


def validate_list(data, name="data", min_length=1):
    """Validate input is a non-empty list."""
    if not isinstance(data, list):
        raise ValueError(f"{name} must be a list, got {type(data).__name__}")
    if len(data) < min_length:
        raise ValueError(f"{name} must have at least {min_length} element(s)")
    for i, v in enumerate(data):
        try:
            float(v)
        except (TypeError, ValueError):
            raise ValueError(f"{name}[{i}] is not numeric")
    return [float(v) for v in data]
