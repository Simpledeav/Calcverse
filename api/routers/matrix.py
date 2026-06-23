"""
Matrix Router — Matrix operations (add, multiply, inverse, determinant, eigenvalues).
"""
from fastapi import APIRouter, HTTPException
from pydantic import BaseModel, Field
from typing import List, Optional
import numpy as np

router = APIRouter()


class MatrixInput(BaseModel):
    matrix_a: List[List[float]] = Field(..., min_length=1)
    matrix_b: Optional[List[List[float]]] = None


class MatrixOutput(BaseModel):
    result: List[List[float]]
    shape: List[int]


@router.post("/add", response_model=MatrixOutput)
def matrix_add(data: MatrixInput):
    """Add two matrices."""
    try:
        a = np.array(data.matrix_a)
        b = np.array(data.matrix_b) if data.matrix_b else None
        if b is None:
            raise ValueError("Second matrix is required")
        result = a + b
        return MatrixOutput(
            result=result.tolist(),
            shape=list(result.shape)
        )
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))


@router.post("/subtract", response_model=MatrixOutput)
def matrix_subtract(data: MatrixInput):
    """Subtract two matrices."""
    try:
        a = np.array(data.matrix_a)
        b = np.array(data.matrix_b) if data.matrix_b else None
        if b is None:
            raise ValueError("Second matrix is required")
        result = a - b
        return MatrixOutput(
            result=result.tolist(),
            shape=list(result.shape)
        )
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))


@router.post("/multiply", response_model=MatrixOutput)
def matrix_multiply(data: MatrixInput):
    """Multiply two matrices."""
    try:
        a = np.array(data.matrix_a)
        b = np.array(data.matrix_b) if data.matrix_b else None
        if b is None:
            raise ValueError("Second matrix is required")
        result = np.matmul(a, b)
        return MatrixOutput(
            result=result.tolist(),
            shape=list(result.shape)
        )
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))


@router.post("/determinant")
def matrix_determinant(data: MatrixInput):
    """Compute determinant of a matrix."""
    try:
        a = np.array(data.matrix_a)
        if a.shape[0] != a.shape[1]:
            raise ValueError("Matrix must be square")
        det = np.linalg.det(a)
        return {
            "determinant": round(float(det), 6),
            "shape": list(a.shape),
        }
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))


@router.post("/inverse", response_model=MatrixOutput)
def matrix_inverse(data: MatrixInput):
    """Compute matrix inverse."""
    try:
        a = np.array(data.matrix_a)
        if a.shape[0] != a.shape[1]:
            raise ValueError("Matrix must be square")
        result = np.linalg.inv(a)
        return MatrixOutput(
            result=[[round(float(v), 6) for v in row] for row in result.tolist()],
            shape=list(result.shape)
        )
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))


@router.post("/eigenvalues")
def matrix_eigenvalues(data: MatrixInput):
    """Compute eigenvalues and eigenvectors."""
    try:
        a = np.array(data.matrix_a)
        if a.shape[0] != a.shape[1]:
            raise ValueError("Matrix must be square")
        eigenvalues, eigenvectors = np.linalg.eig(a)
        return {
            "eigenvalues": [
                {"real": round(float(v.real), 4), "imag": round(float(v.imag), 4)}
                for v in eigenvalues
            ],
            "eigenvectors": [
                [
                    {"real": round(float(v.real), 4), "imag": round(float(v.imag), 4)}
                    for v in row
                ]
                for row in eigenvectors.tolist()
            ],
            "shape": list(a.shape),
        }
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))


@router.post("/transpose", response_model=MatrixOutput)
def matrix_transpose(data: MatrixInput):
    """Transpose a matrix."""
    try:
        a = np.array(data.matrix_a)
        result = a.T
        return MatrixOutput(
            result=result.tolist(),
            shape=list(result.shape)
        )
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))
