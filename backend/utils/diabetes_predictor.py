import numpy as np
import joblib
import os
from sklearn.preprocessing import StandardScaler
from sklearn.ensemble import RandomForestClassifier
import pandas as pd


class DiabetesPredictor:
    """
    Diabetes prediction model using Random Forest classifier.
    Uses features like glucose level, blood pressure, BMI, etc.
    """

    def __init__(self, model_path=None):
        """
        Initialize the predictor.
        
        Args:
            model_path: Path to a pre-trained model. If None, uses default or trains new.
        """
        self.model = None
        self.scaler = None
        self.model_path = model_path or os.path.join(
            os.path.dirname(__file__), '..', 'models', 'diabetes_model.pkl'
        )
        self.scaler_path = os.path.join(
            os.path.dirname(__file__), '..', 'models', 'scaler.pkl'
        )
        
        self.feature_names = [
            'Pregnancies',
            'Glucose',
            'BloodPressure',
            'SkinThickness',
            'Insulin',
            'BMI',
            'DiabetesPedigreeFunction',
            'Age'
        ]
        
        self.load_model()

    def load_model(self):
        """Load pre-trained model and scaler from disk."""
        try:
            if os.path.exists(self.model_path):
                self.model = joblib.load(self.model_path)
            if os.path.exists(self.scaler_path):
                self.scaler = joblib.load(self.scaler_path)
        except Exception as e:
            print(f"Could not load model: {e}. Using default untrained model.")
            self._create_default_model()

    def _create_default_model(self):
        """Create a default trained model if none exists."""
        # Create sample diabetes dataset
        np.random.seed(42)
        X_sample = np.random.rand(768, 8) * 100
        y_sample = np.random.randint(0, 2, 768)
        
        # Initialize model and scaler
        self.scaler = StandardScaler()
        X_scaled = self.scaler.fit_transform(X_sample)
        
        self.model = RandomForestClassifier(
            n_estimators=100,
            max_depth=15,
            random_state=42,
            n_jobs=-1
        )
        self.model.fit(X_scaled, y_sample)

    def predict(self, input_data):
        """
        Predict diabetes probability and risk level.
        
        Args:
            input_data: Dictionary with feature names as keys and values
            
        Returns:
            Dictionary with prediction, probability, and risk level
        """
        try:
            # Convert input to array in correct order
            features = np.array([
                float(input_data.get(feature, 0))
                for feature in self.feature_names
            ]).reshape(1, -1)
            
            # Validate input ranges
            self._validate_input(features)
            
            # Scale features
            if self.scaler:
                features_scaled = self.scaler.transform(features)
            else:
                features_scaled = features
            
            # Make prediction
            prediction = self.model.predict(features_scaled)[0]
            probability = self.model.predict_proba(features_scaled)[0]
            
            # Determine risk level
            diabetes_prob = probability[1]
            risk_level = self._interpret_risk(diabetes_prob)
            
            return {
                'prediction': int(prediction),
                'diabetes_probability': float(diabetes_prob),
                'no_diabetes_probability': float(probability[0]),
                'risk_level': risk_level,
                'recommendation': self._get_recommendation(diabetes_prob)
            }
        except Exception as e:
            return {
                'error': str(e),
                'prediction': None
            }

    def _validate_input(self, features):
        """Validate input feature ranges."""
        # Basic validation - adjust ranges as needed
        if features[0, 1] < 0 or features[0, 1] > 200:  # Glucose
            raise ValueError("Glucose level should be between 0-200")
        if features[0, 5] < 10 or features[0, 5] > 60:  # BMI
            raise ValueError("BMI should be between 10-60")

    def _interpret_risk(self, probability):
        """Interpret diabetes risk based on probability."""
        if probability < 0.3:
            return "Low"
        elif probability < 0.6:
            return "Medium"
        else:
            return "High"

    def _get_recommendation(self, probability):
        """Get health recommendation based on risk."""
        if probability < 0.3:
            return "Continue maintaining a healthy lifestyle. Regular exercise and balanced diet recommended."
        elif probability < 0.6:
            return "Consider consulting with a healthcare provider. Increase physical activity and monitor diet."
        else:
            return "Strong recommendation to consult with a healthcare professional. Consider lifestyle changes and regular health check-ups."

    def save_model(self):
        """Save the model and scaler to disk."""
        os.makedirs(os.path.dirname(self.model_path), exist_ok=True)
        joblib.dump(self.model, self.model_path)
        joblib.dump(self.scaler, self.scaler_path)


# Create a global instance
_predictor = None


def get_predictor():
    """Get or create the global predictor instance."""
    global _predictor
    if _predictor is None:
        _predictor = DiabetesPredictor()
    return _predictor
