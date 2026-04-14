"""Validation utilities for input data."""


def validate_prediction_input(data):
    """
    Validate prediction input data.
    
    Args:
        data: Dictionary with prediction features
        
    Returns:
        Tuple of (is_valid, error_message)
    """
    required_fields = [
        'Pregnancies',
        'Glucose',
        'BloodPressure',
        'SkinThickness',
        'Insulin',
        'BMI',
        'DiabetesPedigreeFunction',
        'Age'
    ]
    
    # Check if all required fields are present
    for field in required_fields:
        if field not in data:
            return False, f"Missing required field: {field}"
    
    # Validate field ranges
    try:
        pregnancies = float(data['Pregnancies'])
        if pregnancies < 0 or pregnancies > 17:
            return False, "Pregnancies should be between 0-17"
        
        glucose = float(data['Glucose'])
        if glucose < 0 or glucose > 200:
            return False, "Glucose should be between 0-200"
        
        blood_pressure = float(data['BloodPressure'])
        if blood_pressure < 0 or blood_pressure > 200:
            return False, "Blood Pressure should be between 0-200"
        
        skin_thickness = float(data['SkinThickness'])
        if skin_thickness < 0 or skin_thickness > 100:
            return False, "Skin Thickness should be between 0-100"
        
        insulin = float(data['Insulin'])
        if insulin < 0 or insulin > 900:
            return False, "Insulin should be between 0-900"
        
        bmi = float(data['BMI'])
        if bmi < 10 or bmi > 70:
            return False, "BMI should be between 10-70"
        
        dpf = float(data['DiabetesPedigreeFunction'])
        if dpf < 0 or dpf > 2.5:
            return False, "Diabetes Pedigree Function should be between 0-2.5"
        
        age = float(data['Age'])
        if age < 18 or age > 120:
            return False, "Age should be between 18-120"
        
    except (ValueError, TypeError) as e:
        return False, f"Invalid data type: {str(e)}"
    
    return True, None
