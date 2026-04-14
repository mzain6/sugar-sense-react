"""Test suite for the diabetes prediction API."""

import pytest
from backend.app import create_app


@pytest.fixture
def app():
    """Create app for testing."""
    app = create_app()
    app.config['TESTING'] = True
    return app


@pytest.fixture
def client(app):
    """Create test client."""
    return app.test_client()


def test_health_endpoint(client):
    """Test the health check endpoint."""
    response = client.get('/api/health')
    assert response.status_code == 200
    data = response.get_json()
    assert data['status'] == 'healthy'
    assert 'service' in data


def test_features_endpoint(client):
    """Test the features endpoint."""
    response = client.get('/api/features')
    assert response.status_code == 200
    data = response.get_json()
    assert 'features' in data
    assert len(data['features']) == 8


def test_predict_valid_input(client):
    """Test prediction with valid input."""
    valid_input = {
        "Pregnancies": 6,
        "Glucose": 148,
        "BloodPressure": 72,
        "SkinThickness": 35,
        "Insulin": 0,
        "BMI": 33.6,
        "DiabetesPedigreeFunction": 0.627,
        "Age": 50
    }
    
    response = client.post(
        '/api/predict',
        json=valid_input,
        content_type='application/json'
    )
    
    assert response.status_code == 200
    data = response.get_json()
    assert 'prediction' in data
    assert 'diabetes_probability' in data
    assert 'risk_level' in data
    assert 'recommendation' in data


def test_predict_missing_field(client):
    """Test prediction with missing field."""
    invalid_input = {
        "Pregnancies": 6,
        "Glucose": 148,
        # Missing other fields
    }
    
    response = client.post(
        '/api/predict',
        json=invalid_input,
        content_type='application/json'
    )
    
    assert response.status_code == 422
    data = response.get_json()
    assert 'error' in data


def test_predict_no_json(client):
    """Test prediction with no JSON data."""
    response = client.post('/api/predict')
    assert response.status_code == 400
    data = response.get_json()
    assert 'error' in data


def test_not_found(client):
    """Test 404 endpoint."""
    response = client.get('/api/nonexistent')
    assert response.status_code == 404
