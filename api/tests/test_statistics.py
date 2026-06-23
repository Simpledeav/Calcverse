"""
Tests for the Statistics router.
"""
from fastapi.testclient import TestClient
from main import app

client = TestClient(app)


class TestDescribe:
    """POST /api/statistics/describe"""

    def test_basic_dataset(self):
        res = client.post("/api/statistics/describe", json={
            "data": [1, 2, 3, 4, 5]
        })
        assert res.status_code == 200
        data = res.json()
        assert data["count"] == 5
        assert data["sum"] == 15
        assert data["mean"] == 3.0
        assert data["median"] == 3.0
        assert data["min"] == 1.0
        assert data["max"] == 5.0
        assert data["range"] == 4.0

    def test_single_element(self):
        res = client.post("/api/statistics/describe", json={
            "data": [42]
        })
        assert res.status_code == 200
        data = res.json()
        assert data["count"] == 1
        assert data["mean"] == 42.0
        assert data["median"] == 42.0

    def test_all_equal_values(self):
        res = client.post("/api/statistics/describe", json={
            "data": [5, 5, 5, 5, 5]
        })
        assert res.status_code == 200
        data = res.json()
        assert data["mean"] == 5.0
        assert data["variance_pop"] == 0.0
        assert data["std_pop"] == 0.0

    def test_negative_values(self):
        res = client.post("/api/statistics/describe", json={
            "data": [-10, -5, 0, 5, 10]
        })
        assert res.status_code == 200
        data = res.json()
        assert data["min"] == -10.0
        assert data["max"] == 10.0
        assert data["mean"] == 0.0

    def test_large_dataset(self):
        data = list(range(1, 1001))
        res = client.post("/api/statistics/describe", json={"data": data})
        assert res.status_code == 200
        assert res.json()["count"] == 1000
        assert res.json()["mean"] == 500.5

    def test_empty_dataset_fails(self):
        res = client.post("/api/statistics/describe", json={"data": []})
        assert res.status_code == 422  # Validation error


class TestHistogram:
    """POST /api/statistics/histogram"""

    def test_basic_histogram(self):
        res = client.post("/api/statistics/histogram", json={
            "data": [1, 1, 2, 2, 2, 3, 3, 3, 3, 4, 4, 5],
            "bins": 5
        })
        assert res.status_code == 200
        data = res.json()
        assert len(data["bins"]) == 6  # bins + 1 edge
        assert len(data["frequencies"]) == 5
        assert sum(data["frequencies"]) == 12

    def test_custom_bins(self):
        res = client.post("/api/statistics/histogram", json={
            "data": [1, 2, 3, 4, 5],
            "bins": 10
        })
        assert res.status_code == 200
        assert len(data := res.json()["bins"]) == 11


class TestRegression:
    """POST /api/statistics/regression"""

    def test_perfect_positive_correlation(self):
        x = [1, 2, 3, 4, 5]
        y = [2, 4, 6, 8, 10]
        res = client.post("/api/statistics/regression", json={"x": x, "y": y})
        assert res.status_code == 200
        data = res.json()
        assert abs(data["slope"] - 2.0) < 0.001
        assert abs(data["intercept"]) < 0.001
        assert abs(data["r_squared"] - 1.0) < 0.001
        assert abs(data["correlation"] - 1.0) < 0.001

    def test_no_correlation(self):
        x = [1, 2, 3, 4, 5]
        y = [5, 5, 5, 5, 5]
        res = client.post("/api/statistics/regression", json={"x": x, "y": y})
        assert res.status_code == 200
        data = res.json()
        assert abs(data["slope"]) < 0.001

    def test_negative_correlation(self):
        x = [1, 2, 3, 4, 5]
        y = [10, 8, 6, 4, 2]
        res = client.post("/api/statistics/regression", json={"x": x, "y": y})
        assert res.status_code == 200
        data = res.json()
        assert data["slope"] < 0
        assert data["correlation"] < 0

    def test_unequal_lengths_fails(self):
        res = client.post("/api/statistics/regression", json={
            "x": [1, 2, 3],
            "y": [1, 2]
        })
        # Pydantic validates lengths independently, scipy raises ValueError -> 400
        assert res.status_code in (400, 422)
