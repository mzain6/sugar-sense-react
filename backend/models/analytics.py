"""Data processing and analytics module."""

import statistics
from datetime import datetime, timedelta
from backend.models.database import get_db


class DataAnalytics:
    """Analytics for prediction data."""
    
    def __init__(self):
        """Initialize analytics."""
        self.db = get_db()
    
    def get_trend_analysis(self, days=30):
        """Analyze prediction trends over time."""
        predictions = self.db.get_all_predictions()
        
        # Filter by date range
        cutoff_date = datetime.now() - timedelta(days=days)
        recent_predictions = [
            p for p in predictions 
            if datetime.strptime(p['timestamp'], '%Y-%m-%d %H:%M:%S') > cutoff_date
        ]
        
        if not recent_predictions:
            return None
        
        probabilities = [p['probability'] for p in recent_predictions]
        
        return {
            'count': len(recent_predictions),
            'average': round(statistics.mean(probabilities), 3),
            'median': round(statistics.median(probabilities), 3),
            'stdev': round(statistics.stdev(probabilities), 3) if len(probabilities) > 1 else 0,
            'min': min(probabilities),
            'max': max(probabilities)
        }
    
    def get_risk_distribution(self):
        """Get distribution of risk levels."""
        predictions = self.db.get_all_predictions()
        
        distribution = {
            'Low': 0,
            'Medium': 0,
            'High': 0
        }
        
        for p in predictions:
            risk_level = p['risk_level']
            if risk_level in distribution:
                distribution[risk_level] += 1
        
        return distribution
    
    def get_feature_correlations(self, feature_name):
        """Get correlation between a feature and diabetes probability."""
        predictions = self.db.get_all_predictions()
        
        if not predictions:
            return None
        
        feature_key = {
            'Pregnancies': 'pregnancies',
            'Glucose': 'glucose',
            'BloodPressure': 'blood_pressure',
            'SkinThickness': 'skin_thickness',
            'Insulin': 'insulin',
            'BMI': 'bmi',
            'DiabetesPedigreeFunction': 'diabetes_pedigree_function',
            'Age': 'age'
        }
        
        if feature_name not in feature_key:
            return None
        
        db_name = feature_key[feature_name]
        
        # Create pairs of feature values and probabilities
        pairs = []
        for p in predictions:
            feature_value = p.get(db_name)
            probability = p.get('probability')
            if feature_value is not None and probability is not None:
                pairs.append((feature_value, probability))
        
        if len(pairs) < 2:
            return None
        
        # Calculate simple correlation
        feature_values = [p[0] for p in pairs]
        probabilities = [p[1] for p in pairs]
        
        # Pearson correlation
        mean_feature = statistics.mean(feature_values)
        mean_prob = statistics.mean(probabilities)
        
        numerator = sum((f - mean_feature) * (prob - mean_prob) for f, prob in pairs)
        denom_feature = (sum((f - mean_feature) ** 2 for f in feature_values)) ** 0.5
        denom_prob = (sum((prob - mean_prob) ** 2 for prob in probabilities)) ** 0.5
        
        if denom_feature == 0 or denom_prob == 0:
            return 0
        
        return round(numerator / (denom_feature * denom_prob), 3)
    
    def get_summary_report(self):
        """Generate a summary report of all data."""
        stats = self.db.get_prediction_stats()
        distribution = self.get_risk_distribution()
        
        return {
            'total_predictions': stats['total'],
            'average_probability': round(stats['avg_probability'], 3),
            'high_risk_count': stats['high_risk_count'],
            'risk_distribution': distribution
        }


# Global analytics instance
_analytics = None


def get_analytics():
    """Get or create the global analytics instance."""
    global _analytics
    if _analytics is None:
        _analytics = DataAnalytics()
    return _analytics
