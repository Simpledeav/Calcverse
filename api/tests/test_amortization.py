"""
Tests for the Amortization router.
"""
from fastapi.testclient import TestClient
from main import app

client = TestClient(app)


class TestAmortizationHealth:
    """Health check endpoint."""

    def test_health_check(self):
        res = client.get("/api/health")
        assert res.status_code == 200
        data = res.json()
        assert data["status"] == "ok"
        assert "version" in data


class TestAmortizationTable:
    """POST /api/amortization/table"""

    def test_standard_30yr_mortgage(self):
        """$300,000 at 6.5% for 30 years."""
        res = client.post("/api/amortization/table", json={
            "principal": 300000,
            "annual_rate": 6.5,
            "term_years": 30,
        })
        assert res.status_code == 200
        rows = res.json()
        assert len(rows) == 360  # 30 years * 12 months
        assert abs(rows[0]["payment"] - 1896.20) < 0.50
        assert rows[-1]["balance"] == 0

    def test_15yr_mortgage(self):
        """$200,000 at 5% for 15 years."""
        res = client.post("/api/amortization/table", json={
            "principal": 200000,
            "annual_rate": 5.0,
            "term_years": 15,
        })
        assert res.status_code == 200
        rows = res.json()
        assert len(rows) == 180  # 15 years * 12 months
        assert rows[-1]["balance"] == 0

    def test_extra_payment(self):
        """Extra payment should reduce total months."""
        res_standard = client.post("/api/amortization/table", json={
            "principal": 100000,
            "annual_rate": 5.0,
            "term_years": 30,
            "extra_payment": 0,
        })
        res_extra = client.post("/api/amortization/table", json={
            "principal": 100000,
            "annual_rate": 5.0,
            "term_years": 30,
            "extra_payment": 200,
        })
        assert res_standard.status_code == 200
        assert res_extra.status_code == 200
        standard_rows = res_standard.json()
        extra_rows = res_extra.json()
        # With extra payment, fewer months should be needed
        assert len(extra_rows) < len(standard_rows)

    def test_monthly_payment_decreases_over_time(self):
        """Principal portion increases, interest portion decreases."""
        res = client.post("/api/amortization/table", json={
            "principal": 100000,
            "annual_rate": 6.0,
            "term_years": 15,
        })
        rows = res.json()
        # First month: interest > principal portion for high balance
        # Last month: principal > interest
        assert rows[0]["interest"] > rows[-1]["interest"]
        assert rows[0]["principal"] < rows[-1]["principal"]

    def test_invalid_negative_principal(self):
        res = client.post("/api/amortization/table", json={
            "principal": -1000,
            "annual_rate": 5.0,
            "term_years": 30,
        })
        assert res.status_code == 422  # Validation error

    def test_invalid_rate_too_high(self):
        res = client.post("/api/amortization/table", json={
            "principal": 100000,
            "annual_rate": 150,
            "term_years": 30,
        })
        assert res.status_code == 422  # Validation error (max 100)

    def test_invalid_term_too_long(self):
        res = client.post("/api/amortization/table", json={
            "principal": 100000,
            "annual_rate": 5.0,
            "term_years": 100,
        })
        assert res.status_code == 422  # Validation error (max 50)


class TestAmortizationSummary:
    """POST /api/amortization/summary"""

    def test_summary_basic(self):
        res = client.post("/api/amortization/summary", json={
            "principal": 200000,
            "annual_rate": 5.0,
            "term_years": 30,
        })
        assert res.status_code == 200
        data = res.json()
        assert data["monthly_payment"] > 0
        assert data["total_interest"] > 0
        assert data["total_payment"] > data["total_principal"]
        assert data["num_payments"] == 360

    def test_summary_total_interest(self):
        """Total interest = total payment - principal."""
        res = client.post("/api/amortization/summary", json={
            "principal": 100000,
            "annual_rate": 6.0,
            "term_years": 30,
        })
        data = res.json()
        expected_interest = data["total_payment"] - data["total_principal"]
        assert abs(data["total_interest"] - expected_interest) < 0.01
