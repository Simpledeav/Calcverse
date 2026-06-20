"""
Statistics Router — Descriptive statistics, histograms, and regression analysis.
"""
from fastapi import APIRouter, HTTPException
from pydantic import BaseModel, Field
from typing import List, Optional
import numpy as np
from scipy import stats as scipy_stats

router = APIRouter()


class DatasetInput(BaseModel):
    data: List[float] = Field(..., min_length=1, description="Array of numeric values")


class DescribeOutput(BaseModel):
    count: int
    sum: float
    mean: float
    median: float
    mode: List[float]
    variance_pop: float
    variance_sample: float
    std_pop: float
    std_sample: float
    min: float
    max: float
    range: float
    q1: float
    q2: float
    q3: float
    iqr: float
    skewness: float
    kurtosis: float


class HistogramInput(BaseModel):
    data: List[float]
    bins: int = Field(10, ge=5, le=100)


class HistogramOutput(BaseModel):
    bins: List[float]
    frequencies: List[int]


class RegressionInput(BaseModel):
    x: List[float]
    y: List[float]


class RegressionOutput(BaseModel):
    slope: float
    intercept: float
    r_squared: float
    correlation: float
    p_value: float
    std_err: float


@router.post("/describe", response_model=DescribeOutput)
def describe_statistics(data: DatasetInput):
    """Compute descriptive statistics for a dataset."""
    try:
        arr = np.array(data.data)
        mode_result = scipy_stats.mode(arr, keepdims=True)

        return DescribeOutput(
            count=int(len(arr)),
            sum=float(np.sum(arr)),
            mean=float(np.mean(arr)),
            median=float(np.median(arr)),
            mode=[float(m) for m in mode_result.mode],
            variance_pop=float(np.var(arr)),
            variance_sample=float(np.var(arr, ddof=1)),
            std_pop=float(np.std(arr)),
            std_sample=float(np.std(arr, ddof=1)),
            min=float(np.min(arr)),
            max=float(np.max(arr)),
            range=float(np.ptp(arr)),
            q1=float(np.percentile(arr, 25)),
            q2=float(np.percentile(arr, 50)),
            q3=float(np.percentile(arr, 75)),
            iqr=float(np.percentile(arr, 75) - np.percentile(arr, 25)),
            skewness=float(scipy_stats.skew(arr)),
            kurtosis=float(scipy_stats.kurtosis(arr)),
        )
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))


@router.post("/histogram", response_model=HistogramOutput)
def generate_histogram(data: HistogramInput):
    """Generate histogram bins and frequencies."""
    try:
        counts, bin_edges = np.histogram(data.data, bins=data.bins)
        return HistogramOutput(
            bins=[float(b) for b in bin_edges],
            frequencies=[int(c) for c in counts],
        )
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))


@router.post("/regression", response_model=RegressionOutput)
def linear_regression(data: RegressionInput):
    """Perform linear regression analysis."""
    try:
        x = np.array(data.x)
        y = np.array(data.y)
        slope, intercept, r_value, p_value, std_err = scipy_stats.linregress(x, y)

        return RegressionOutput(
            slope=float(slope),
            intercept=float(intercept),
            r_squared=float(r_value ** 2),
            correlation=float(r_value),
            p_value=float(p_value),
            std_err=float(std_err),
        )
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))
