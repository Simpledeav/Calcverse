"""
Amortization Router — Mortgage amortization schedule generation.
"""
from fastapi import APIRouter, HTTPException
from pydantic import BaseModel, Field
from typing import List
import numpy as np

router = APIRouter()


class MortgageInput(BaseModel):
    principal: float = Field(..., gt=0, description="Loan principal amount")
    annual_rate: float = Field(..., gt=0, le=100, description="Annual interest rate in percent")
    term_years: int = Field(..., gt=0, le=50, description="Loan term in years")
    extra_payment: float = Field(0, ge=0, description="Extra monthly payment")


class AmortizationRow(BaseModel):
    month: int
    payment: float
    principal: float
    interest: float
    balance: float


@router.post("/table", response_model=List[AmortizationRow])
def amortization_table(data: MortgageInput):
    """Generate full amortization schedule."""
    try:
        r = data.annual_rate / 100 / 12
        n = data.term_years * 12
        pmt = data.principal * r * (1 + r) ** n / ((1 + r) ** n - 1)

        rows = []
        balance = data.principal
        total_payment = pmt + data.extra_payment

        for month in range(1, n + 1):
            interest = balance * r
            principal_pmt = min(total_payment - interest, balance)
            if data.extra_payment > 0:
                principal_pmt = min(pmt - interest + data.extra_payment, balance)
            balance = max(0, balance - principal_pmt)
            rows.append(AmortizationRow(
                month=month,
                payment=round(pmt, 2),
                principal=round(principal_pmt, 2),
                interest=round(interest, 2),
                balance=round(balance, 2)
            ))
            if balance == 0:
                break

        return rows
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))


@router.post("/summary")
def amortization_summary(data: MortgageInput):
    """Return summary statistics for a mortgage."""
    try:
        r = data.annual_rate / 100 / 12
        n = data.term_years * 12
        pmt = data.principal * r * (1 + r) ** n / ((1 + r) ** n - 1)

        total_paid = pmt * n
        total_interest = total_paid - data.principal

        return {
            "monthly_payment": round(pmt, 2),
            "total_payment": round(total_paid, 2),
            "total_principal": round(data.principal, 2),
            "total_interest": round(total_interest, 2),
            "num_payments": n,
            "payoff_months": n,
        }
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))
