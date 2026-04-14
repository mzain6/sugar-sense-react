"""
Sugar Sense - Diabetes Prediction API
A Flask-based REST API for diabetes risk prediction
"""

from flask import Flask, request, jsonify
from flask_cors import CORS
from backend.config import current_config
from backend.utils.diabetes_predictor import get_predictor
from backend.utils.validators import validate_prediction_input


def create_app():
    """Create and configure the Flask application."""
    app = Flask(__name__)
    app.config.from_object(current_config)
    
    # Enable CORS for all routes (allow React frontend to call API)
    CORS(app, resources={
        r"/api/*": {
            "origins": ["http://localhost:5173", "http://localhost:3000"],
            "methods": ["GET", "POST", "OPTIONS"],
            "allow_headers": ["Content-Type"]
        }
    })
    
    # Get predictor instance
    predictor = get_predictor()
    
    # Health check endpoint
    @app.route('/api/health', methods=['GET'])
    def health():
        """Health check endpoint."""
        return jsonify({
            'status': 'healthy',
            'service': 'Sugar Sense API',
            'version': '1.0.0'
        }), 200
    
    # Prediction endpoint
    @app.route('/api/predict', methods=['POST'])
    def predict():
        """
        Make a diabetes prediction.
        
        Expected JSON input:
        {
            "Pregnancies": number,
            "Glucose": number,
            "BloodPressure": number,
            "SkinThickness": number,
            "Insulin": number,
            "BMI": number,
            "DiabetesPedigreeFunction": number,
            "Age": number
        }
        """
        try:
            data = request.get_json()
            
            if not data:
                return jsonify({
                    'error': 'No JSON data provided'
                }), 400
            
            # Validate input
            is_valid, error_message = validate_prediction_input(data)
            if not is_valid:
                return jsonify({
                    'error': error_message
                }), 422
            
            # Make prediction
            result = predictor.predict(data)
            
            if 'error' in result:
                return jsonify(result), 422
            
            return jsonify(result), 200
            
        except Exception as e:
            return jsonify({
                'error': f'Internal server error: {str(e)}'
            }), 500
    
    # Feature info endpoint
    @app.route('/api/features', methods=['GET'])
    def get_features():
        """Get information about prediction features."""
        return jsonify({
            'features': predictor.feature_names,
            'feature_descriptions': {
                'Pregnancies': 'Number of times pregnant (0-17)',
                'Glucose': 'Plasma glucose concentration (0-200 mg/dL)',
                'BloodPressure': 'Diastolic blood pressure (0-200 mmHg)',
                'SkinThickness': 'Triceps skin fold thickness (0-100 mm)',
                'Insulin': '2-Hour serum insulin (0-900 mU/mL)',
                'BMI': 'Body mass index (10-70 kg/m²)',
                'DiabetesPedigreeFunction': 'Diabetes pedigree function (0-2.5)',
                'Age': 'Age in years (18-120)'
            }
        }), 200
    
    # Error handlers
    @app.errorhandler(404)
    def not_found(error):
        return jsonify({'error': 'Endpoint not found'}), 404
    
    @app.errorhandler(500)
    def server_error(error):
        return jsonify({'error': 'Internal server error'}), 500
    
    return app


if __name__ == '__main__':
    app = create_app()
    app.run(debug=True, host='0.0.0.0', port=5000)
