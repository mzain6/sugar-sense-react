"""Routes module for Flask application."""

from flask import render_template, request, redirect, url_for, jsonify
from backend.utils.diabetes_predictor import get_predictor
from backend.utils.validators import validate_prediction_input
from backend.models.database import get_db


def register_routes(app):
    """Register all Flask routes."""
    
    # Initialize database and predictor
    db = get_db()
    predictor = get_predictor()
    
    @app.route('/')
    def index():
        """Home page."""
        return render_template('index.html')
    
    @app.route('/about')
    def about():
        """About page."""
        return render_template('about.html')
    
    @app.route('/predict', methods=['GET', 'POST'])
    def predict():
        """Predict diabetes risk."""
        prediction = None
        form_data = {}
        error = None
        
        if request.method == 'POST':
            # Get form data
            form_data = {
                'Pregnancies': request.form.get('Pregnancies', ''),
                'Glucose': request.form.get('Glucose', ''),
                'BloodPressure': request.form.get('BloodPressure', ''),
                'SkinThickness': request.form.get('SkinThickness', ''),
                'Insulin': request.form.get('Insulin', ''),
                'BMI': request.form.get('BMI', ''),
                'DiabetesPedigreeFunction': request.form.get('DiabetesPedigreeFunction', ''),
                'Age': request.form.get('Age', '')
            }
            
            # Validate input
            is_valid, error_msg = validate_prediction_input(form_data)
            if not is_valid:
                error = error_msg
            else:
                # Make prediction
                prediction = predictor.predict(form_data)
                
                if 'error' in prediction:
                    error = prediction['error']
                else:
                    # Save to database
                    db.save_prediction(form_data, prediction)
        
        return render_template('predict.html', prediction=prediction, form=form_data, error=error)
    
    @app.route('/history')
    def history():
        """View prediction history."""
        predictions = db.get_all_predictions(limit=100)
        stats = db.get_prediction_stats()
        
        # Calculate averages
        avg_risk = 0
        high_risk_count = 0
        
        if predictions:
            avg_risk = round(stats['avg_probability'] * 100, 1) if stats['avg_probability'] else 0
            high_risk_count = stats['high_risk_count']
        
        return render_template('history.html', 
                             predictions=predictions,
                             average_risk=avg_risk,
                             high_risk_count=high_risk_count)
    
    @app.errorhandler(404)
    def not_found(error):
        """Handle 404 errors."""
        return render_template('404.html'), 404
    
    @app.errorhandler(500)
    def server_error(error):
        """Handle 500 errors."""
        return render_template('500.html'), 500
