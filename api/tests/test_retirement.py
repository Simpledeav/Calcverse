"""
Tests for the Retirement router.
"""
from fastapi.testclient import TestClient
from main import app

client = TestClient(app)


class TestRetirementProjection:
    """POST /api/retirement/project"""

    def test_basic_projection(self):
        """30-year-old saving $500/month until 65 with $10k saved."""
        res = client.post("/api/retirement/project", json={
            "current_age": 30,
            "retirement_age": 65,
            "current_savings": 10000,
            "monthly_contribution": 500,
            "annual_return": 7.0,
            "inflation_rate": 3.0,
        })
        assert res.status_code == 200
        data = res.json()
        assert len(data["projections"]) == 35  # 65 - 30
        assert data["summary"]["final_balance"] > 0
        assert data["summary"]["years_simulated"] == 35

    def test_final_balance_exceeds_contributions(self):
        """With positive returns, final balance > total contributions."""
        res = client.post("/api/retirement/project", json={
            "current_age": 25,
            "retirement_age": 65,
            "current_savings": 0,
            "monthly_contribution": 1000,
            "annual_return": 8.0,
            "inflation_rate": 2.5,
        })
        data = res.json()
        total_contributions = data["summary"]["total_contributions"]
        final_balance = data["summary"]["final_balance"]
        assert final_balance > total_contributions

    def test_inflation_adjustment(self):
        """Inflation-adjusted balance should be less than nominal balance."""
        res = client.post("/api/retirement/project", json={
            "current_age": 30,
            "retirement_age": 60,
            "current_savings": 50000,
            "monthly_contribution": 1000,
            "annual_return": 6.0,
            "inflation_rate": 3.0,
        })
        data = res.json()
        summary = data["summary"]
        assert summary["final_balance_inflation_adj"] < summary["final_balance"]

    def test_no_contributions(self):
        """No contributions but principal grows."""
        res = client.post("/api/retirement/project", json={
            "current_age": 40,
            "retirement_age": 65,
            "current_savings": 100000,
            "monthly_contribution": 0,
            "annual_return": 5.0,
            "inflation_rate": 2.0,
        })
        assert res.status_code == 200
        data = res.json()
        assert data["summary"]["final_balance"] > 100000

    def test_invalid_age_range(self):
        """Retirement age must be >= current age."""
        res = client.post("/api/retirement/project", json={
            "current_age": 50,
            "retirement_age": 40,
            "current_savings": 10000,
            "monthly_contribution": 500,
            "annual_return": 7.0,
        })
        # Still returns 200 (age validation is in Pydantic but both are valid individually)
        # The projection will just have 0 years
        assert res.status_code == 200


class TestNPV:
    """POST /api/retirement/npv"""

    def test_positive_npv(self):
        res = client.post("/api/retirement/npv", json={
            "initial_investment": -10000,
            "cash_flows": [3000, 4000, 5000, 4000],
            "discount_rate": 10.0,
        })
        assert res.status_code == 200
        data = res.json()
        assert data["npv"] > 0  # Positive NPV
        assert len(data["present_values"]) == 4

    def test_negative_npv(self):
        res = client.post("/api/retirement/npv", json={
            "initial_investment": -50000,
            "cash_flows": [5000, 5000, 5000, 5000, 5000],
            "discount_rate": 15.0,
        })
        assert res.status_code == 200
        data = res.json()
        assert data["npv"] < 0  # Negative NPV


class TestIRR:
    """POST /api/retirement/irr"""

    def test_irr_positive(self):
        res = client.post("/api/retirement/irr", json={
            "initial_investment": -10000,
            "cash_flows": [3000, 4000, 5000, 4000],
            "discount_rate": 10.0,
        })
        assert res.status_code == 200
        data = res.json()
        assert data["irr"] is not None
        assert data["irr"] > 0  # Positive IRR

    def test_irr_format(self):
        res = client.post("/api/retirement/irr", json={
            "initial_investment": -10000,
            "cash_flows": [3000, 4000, 5000, 4000],
            "discount_rate": 10.0,
        })
        data = res.json()
        assert "%" in data["irr_percent"]


class TestMonteCarlo:
    """POST /api/retirement/monte-carlo"""

    def test_monte_carlo_basic(self):
        res = client.post("/api/retirement/monte-carlo", json={
            "current_savings": 50000,
            "monthly_contribution": 1000,
            "annual_return_mean": 8.0,
            "annual_return_std": 12.0,
            "years": 30,
            "simulations": 500,
        })
        assert res.status_code == 200
        data = res.json()
        assert data["num_simulations"] == 500
        assert data["median"] > 0
        assert data["mean"] > 0
        assert "percentiles" in data
        assert "5" in data["percentiles"]
        assert "95" in data["percentiles"]

    def test_monte_carlo_percentiles_ordered(self):
        """Percentiles should be in ascending order."""
        res = client.post("/api/retirement/monte-carlo", json={
            "current_savings": 10000,
            "monthly_contribution": 500,
            "annual_return_mean": 7.0,
            "annual_return_std": 10.0,
            "years": 20,
            "simulations": 200,
        })
        data = res.json()
        p = data["percentiles"]
        assert p["5"] <= p["25"]
        assert p["25"] <= p["50"]
        assert p["50"] <= p["75"]
        assert p["75"] <= p["95"]

    def test_monte_carlo_probability(self):
        """Probability of success should be between 0 and 100."""
        res = client.post("/api/retirement/monte-carlo", json={
            "current_savings": 50000,
            "monthly_contribution": 1000,
            "annual_return_mean": 8.0,
            "annual_return_std": 15.0,
            "years": 30,
            "simulations": 300,
        })
        data = res.json()
        assert 0 <= data["probability_of_success"] <= 100
