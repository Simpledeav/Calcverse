"""
Formatting utilities for CalcVerse API responses.
"""


def format_currency(amount, currency="$"):
    """Format a number as currency string."""
    if amount is None:
        return f"{currency}0.00"
    return f"{currency}{amount:,.2f}"


def format_percentage(value, decimals=2):
    """Format a decimal as percentage string."""
    return f"{value:.{decimals}f}%"


def format_number(value, decimals=2):
    """Format a number with commas and decimals."""
    if value is None:
        return "0"
    if abs(value) >= 1_000_000:
        return f"{value:,.2f}"
    if abs(value) >= 1_000:
        return f"{value:,.2f}"
    return f"{value:.{decimals}f}"


def format_large_number(value):
    """Format very large numbers with suffix (K, M, B, T)."""
    if value is None:
        return "0"
    abs_val = abs(value)
    if abs_val >= 1_000_000_000_000:
        return f"{value / 1_000_000_000_000:.2f}T"
    if abs_val >= 1_000_000_000:
        return f"{value / 1_000_000_000:.2f}B"
    if abs_val >= 1_000_000:
        return f"{value / 1_000_000:.2f}M"
    if abs_val >= 1_000:
        return f"{value / 1_000:.2f}K"
    return f"{value:.2f}"


def to_json_safe(obj):
    """Convert numpy types to JSON-safe Python types."""
    import numpy as np
    if isinstance(obj, np.integer):
        return int(obj)
    if isinstance(obj, np.floating):
        return float(obj)
    if isinstance(obj, np.ndarray):
        return obj.tolist()
    if isinstance(obj, dict):
        return {k: to_json_safe(v) for k, v in obj.items()}
    if isinstance(obj, (list, tuple)):
        return [to_json_safe(v) for v in obj]
    if isinstance(obj, complex):
        return {"real": obj.real, "imag": obj.imag}
    return obj


def truncate_list(data, max_items=100):
    """Truncate a list to max_items and return with truncated indicator."""
    if len(data) <= max_items:
        return {"data": data, "truncated": False, "total": len(data)}
    return {"data": data[:max_items], "truncated": True, "total": len(data)}
