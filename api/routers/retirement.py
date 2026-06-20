"""
Retirement Router — Retirement projections, NPV, IRR, and Monte Carlo simulations.
"""
from fastapi import APIRouter, HTTPException
from pydantic import BaseModel, Field
from typing import List, Optional
import numpy as np
from scipy.optimize import brentq
from scipy import stats as scipy_stats

router = APIRouter()


class RetirementInput(BaseModel):
    current_age: int = Field(..., ge=18, le=80)
    retirement_age: int = Field(..., ge=30, le=100)
    current_savings: float = Field(..., ge=0)
    monthly_contribution: float = Field(..., ge=0)
    annual_return: float = Field(..., ge=0, le=100)
    inflation_rate: float = Field(3.0, ge=0, le=20)


class ProjectionRow(BaseModel):
    age: int
    year: int
    balance: float
    balance_inflation_adj: float
    contributions: float
    earnings: float


class NpvInput(BaseModel):
    initial_investment: float = Field(..., description="Initial investment (negative for outflow)")
    cash_flows: List[float] = Field(..., min_length=1)
    discount_rate: float = Field(..., gt=0, le=100)


class MonteCarloInput(BaseModel):
    current_savings: float
    monthly_contribution: float
    annual_return_mean: float
    annual_return_std: float
    years: int = Field(..., ge=1, le=60)
    simulations: int = Field(1000, ge=100, le=10000)


@router.post("/project")
def retirement_projection(data: RetirementInput):
    """Generate year-by-year retirement projection."""
    try:
        years = data.retirement_age - data.current_age
        monthly_rate = (1 + data.annual_return / 100) ** (1 / 12) - 1
        inflation_rate_monthly = (1 + data.inflation_rate / 100) ** (1 / 12) - 1

        balance = data.current_savings
        rows = []
        total_contributions = data.current_savings

        for year in range(1, years + 1):
            yearly_contrib = 0
            yearly_earnings = 0
            for _ in range(12):
                interest = balance * monthly_rate
                balance += interest + data.monthly_contribution
                yearly_contrib += data.monthly_contribution
                yearly_earnings += interest
            total_contributions += yearly_contrib

            inflation_factor = (1 - data.inflation_rate / 100) ** year
            rows.append(ProjectionRow(
                age=data.current_age + year,
                year=2025 + year,
                balance=round(balance, 2),
                balance_inflation_adj=round(balance * (1 - data.inflation_rate / 100) ** year, 2),
                contributions=round(yearly_contrib, 2),
                earnings=round(yearly_earnings, 2),
            ))

        return {
            "projections": [row.dict() for row in rows],
            "summary": {
                "final_balance": round(balance, 2),
                "final_balance_inflation_adj": round(balance * (1 - data.inflation_rate / 100) ** years, 2),
                "total_contributions": round(total_contributions, 2),
                "total_earnings": round(balance - total_contributions, 2),
                "years_simulated": years,
            }
        }
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))


@router.post("/npv")
def net_present_value(data: NpvInput):
    """Calculate Net Present Value."""
    try:
        rate = data.discount_rate / 100
        npv = data.initial_investment
        pvs = []
        for t, cf in enumerate(data.cash_flows, 1):
            pv = cf / (1 + rate) ** t
            npv += pv
            pvs.append(round(pv, 2))

        return {
            "npv": round(npv, 2),
            "initial_investment": data.initial_investment,
            "present_values": pvs,
            "total_cash_flows": round(sum(data.cash_flows), 2),
            "discount_rate": data.discount_rate,
        }
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))


@router.post("/irr")
def internal_rate_of_return(data: NpvInput):
    """Calculate Internal Rate of Return using Newton-Raphson."""
    try:
        cash_flows = [data.initial_investment] + data.cash_flows

        def npv_func(rate):
            return sum(cf / (1 + rate) ** t for t, cf in enumerate(cash_flows))

        try:
            irr = brentq(npv_func, -0.99, 10)
        except ValueError:
            irr = None

        return {
            "irr": round(float(irr * 100), 4) if irr else None,
            "irr_percent": f"{round(float(irr * 100), 2)}%" if irr else "Could not compute",
        }
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))


@router.post("/monte-carlo")
def monte_carlo_simulation(data: MonteCarloInput):
    """Run Monte Carlo simulation for retirement outcomes."""
    try:
        np.random.seed(42)
        results = []

        for _ in range(data.simulations):
            balance = data.current_savings
            for year in range(data.years):
                annual_return = np.random.normal(data.annual_return_mean, data.annual_return_std) / 100
                balance = balance * (1 + annual_return) + data.monthly_contribution * 12
            results.append(round(balance, 2))

        results_array = np.array(results)
        percentiles = [5, 10, 25, 50, 75, 90, 95]

        return {
            "median": round(float(np.median(results_array)), 2),
            "mean": round(float(np.mean(results_array)), 2),
            "std_dev": round(float(np.std(results_array)), 2),
            "min": round(float(np.min(results_array)), 2),
            "max": round(float(np.max(results_array)), 2),
            "percentiles": {
                str(p): round(float(np.percentile(results_array, p)), 2)
                for p in percentiles
            },
            "probability_of_success": round(float(np.mean(results_array > 0)) * 100, 2),
            "num_simulations": data.simulations,
        }
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))
