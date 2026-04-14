"""Health metrics calculator module."""

import math


class HealthMetrics:
    """Calculate and interpret health metrics."""
    
    @staticmethod
    def calculate_bmi(weight_kg, height_m):
        """
        Calculate Body Mass Index.
        
        Args:
            weight_kg: Weight in kilograms
            height_m: Height in meters
            
        Returns:
            BMI value
        """
        if height_m <= 0:
            return None
        return round(weight_kg / (height_m ** 2), 2)
    
    @staticmethod
    def interpret_bmi(bmi):
        """
        Interpret BMI value.
        
        Args:
            bmi: BMI value
            
        Returns:
            Category string
        """
        if bmi < 18.5:
            return "Underweight"
        elif bmi < 25:
            return "Normal weight"
        elif bmi < 30:
            return "Overweight"
        else:
            return "Obese"
    
    @staticmethod
    def interpret_glucose(glucose):
        """
        Interpret glucose level.
        
        Args:
            glucose: Glucose level in mg/dL
            
        Returns:
            Status and recommendation
        """
        if glucose < 100:
            return {"status": "Normal", "category": "Fasting glucose is normal"}
        elif glucose < 126:
            return {"status": "Normal", "category": "Slightly elevated but normal"}
        elif glucose < 200:
            return {"status": "Elevated", "category": "Consider consulting a doctor"}
        else:
            return {"status": "High", "category": "Consult a healthcare provider"}
    
    @staticmethod
    def interpret_blood_pressure(systolic, diastolic):
        """
        Interpret blood pressure reading.
        
        Args:
            systolic: Systolic pressure
            diastolic: Diastolic pressure
            
        Returns:
            Blood pressure category
        """
        if diastolic < 80:
            return "Normal"
        elif diastolic < 90:
            return "Elevated"
        elif diastolic < 100:
            return "Stage 1 Hypertension"
        else:
            return "Stage 2 Hypertension"
    
    @staticmethod
    def get_health_recommendations(glucose, bmi, age, blood_pressure):
        """
        Get personalized health recommendations.
        
        Args:
            glucose: Glucose level
            bmi: BMI value
            age: Age in years
            blood_pressure: Systolic blood pressure
            
        Returns:
            List of recommendations
        """
        recommendations = []
        
        if glucose >= 126:
            recommendations.append("Reduce refined sugar and carbohydrate intake")
            recommendations.append("Increase physical activity to 150 minutes/week")
        
        if bmi >= 25:
            recommendations.append("Work on weight management through diet and exercise")
        
        if blood_pressure >= 140:
            recommendations.append("Monitor blood pressure regularly")
            recommendations.append("Reduce salt intake")
        
        if age >= 45:
            recommendations.append("Have regular diabetes screening")
        
        if not recommendations:
            recommendations.append("Maintain your current healthy lifestyle")
            recommendations.append("Continue regular health check-ups")
        
        return recommendations


# Export for use in other modules
def get_health_metrics():
    """Get HealthMetrics class."""
    return HealthMetrics
