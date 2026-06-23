"""
Tests for the Matrix router.
"""
from fastapi.testclient import TestClient
from main import app

client = TestClient(app)


class TestMatrixAdd:
    """POST /api/matrix/add"""

    def test_add_2x2(self):
        res = client.post("/api/matrix/add", json={
            "matrix_a": [[1, 2], [3, 4]],
            "matrix_b": [[5, 6], [7, 8]],
        })
        assert res.status_code == 200
        data = res.json()
        assert data["result"] == [[6, 8], [10, 12]]
        assert data["shape"] == [2, 2]

    def test_add_3x3(self):
        res = client.post("/api/matrix/add", json={
            "matrix_a": [[1, 2, 3], [4, 5, 6], [7, 8, 9]],
            "matrix_b": [[9, 8, 7], [6, 5, 4], [3, 2, 1]],
        })
        assert res.status_code == 200
        data = res.json()
        assert data["result"] == [[10, 10, 10], [10, 10, 10], [10, 10, 10]]


class TestMatrixSubtract:
    """POST /api/matrix/subtract"""

    def test_subtract_2x2(self):
        res = client.post("/api/matrix/subtract", json={
            "matrix_a": [[5, 6], [7, 8]],
            "matrix_b": [[1, 2], [3, 4]],
        })
        assert res.status_code == 200
        data = res.json()
        assert data["result"] == [[4, 4], [4, 4]]


class TestMatrixMultiply:
    """POST /api/matrix/multiply"""

    def test_multiply_2x2(self):
        res = client.post("/api/matrix/multiply", json={
            "matrix_a": [[1, 2], [3, 4]],
            "matrix_b": [[2, 0], [1, 2]],
        })
        assert res.status_code == 200
        data = res.json()
        assert data["result"] == [[4, 4], [10, 8]]
        assert data["shape"] == [2, 2]

    def test_multiply_2x3_by_3x2(self):
        res = client.post("/api/matrix/multiply", json={
            "matrix_a": [[1, 2, 3], [4, 5, 6]],
            "matrix_b": [[7, 8], [9, 10], [11, 12]],
        })
        assert res.status_code == 200
        data = res.json()
        assert data["shape"] == [2, 2]
        assert data["result"] == [[58, 64], [139, 154]]


class TestMatrixDeterminant:
    """POST /api/matrix/determinant"""

    def test_determinant_2x2(self):
        res = client.post("/api/matrix/determinant", json={
            "matrix_a": [[1, 2], [3, 4]],
        })
        assert res.status_code == 200
        data = res.json()
        assert abs(data["determinant"] - (-2.0)) < 0.001

    def test_determinant_3x3(self):
        res = client.post("/api/matrix/determinant", json={
            "matrix_a": [[6, 1, 1], [4, -2, 5], [2, 8, 7]],
        })
        assert res.status_code == 200
        data = res.json()
        assert abs(data["determinant"] - (-306.0)) < 0.001

    def test_non_square_fails(self):
        res = client.post("/api/matrix/determinant", json={
            "matrix_a": [[1, 2, 3], [4, 5, 6]],
        })
        assert res.status_code == 400


class TestMatrixInverse:
    """POST /api/matrix/inverse"""

    def test_inverse_2x2(self):
        res = client.post("/api/matrix/inverse", json={
            "matrix_a": [[4, 7], [2, 6]],
        })
        assert res.status_code == 200
        data = res.json()
        # A * A^-1 ≈ I
        result = data["result"]
        assert abs(result[0][0] - 0.6) < 0.01
        assert abs(result[0][1] - (-0.7)) < 0.01

    def test_singular_matrix_fails(self):
        res = client.post("/api/matrix/inverse", json={
            "matrix_a": [[1, 2], [2, 4]],
        })
        assert res.status_code == 400


class TestMatrixEigenvalues:
    """POST /api/matrix/eigenvalues"""

    def test_eigenvalues_2x2(self):
        res = client.post("/api/matrix/eigenvalues", json={
            "matrix_a": [[1, 2], [2, 4]],
        })
        assert res.status_code == 200
        data = res.json()
        assert len(data["eigenvalues"]) == 2
        assert "real" in data["eigenvalues"][0]
        assert "imag" in data["eigenvalues"][0]
        assert data["shape"] == [2, 2]

    def test_non_square_fails(self):
        res = client.post("/api/matrix/eigenvalues", json={
            "matrix_a": [[1, 2, 3]],
        })
        assert res.status_code == 400


class TestMatrixTranspose:
    """POST /api/matrix/transpose"""

    def test_transpose_2x3(self):
        res = client.post("/api/matrix/transpose", json={
            "matrix_a": [[1, 2, 3], [4, 5, 6]],
        })
        assert res.status_code == 200
        data = res.json()
        assert data["result"] == [[1, 4], [2, 5], [3, 6]]
        assert data["shape"] == [3, 2]

    def test_transpose_square(self):
        res = client.post("/api/matrix/transpose", json={
            "matrix_a": [[1, 2], [3, 4]],
        })
        assert res.status_code == 200
        data = res.json()
        assert data["result"] == [[1, 3], [2, 4]]
