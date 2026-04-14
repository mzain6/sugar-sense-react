#!/usr/bin/env python
"""
Script to initialize and train the diabetes prediction model.
Run this once to create and save the trained model.
"""

import os
import numpy as np
from sklearn.ensemble import RandomForestClassifier
from sklearn.preprocessing import StandardScaler
import joblib


def create_and_train_model():
    """Create and train a diabetes prediction model."""
    print("🤖 Training Diabetes Prediction Model...")
    print("=" * 50)
    
    # Create synthetic training data (replace with real data in production)
    np.random.seed(42)
    n_samples = 768
    
    X_train = np.random.rand(n_samples, 8) * 100
    y_train = np.random.randint(0, 2, n_samples)
    
    # More realistic feature distributions
    X_train[:, 0] = np.random.randint(0, 17, n_samples)  # Pregnancies
    X_train[:, 1] = np.random.normal(120, 30, n_samples)  # Glucose
    X_train[:, 1] = np.clip(X_train[:, 1], 0, 200)
    X_train[:, 2] = np.random.normal(70, 15, n_samples)   # BloodPressure
    X_train[:, 2] = np.clip(X_train[:, 2], 0, 200)
    X_train[:, 3] = np.random.normal(20, 15, n_samples)   # SkinThickness
    X_train[:, 3] = np.clip(X_train[:, 3], 0, 100)
    X_train[:, 4] = np.random.normal(100, 100, n_samples) # Insulin
    X_train[:, 4] = np.clip(X_train[:, 4], 0, 900)
    X_train[:, 5] = np.random.normal(32, 8, n_samples)    # BMI
    X_train[:, 5] = np.clip(X_train[:, 5], 10, 70)
    X_train[:, 6] = np.random.uniform(0, 2.5, n_samples)  # DiabetesPedigreeFunction
    X_train[:, 7] = np.random.normal(40, 15, n_samples)   # Age
    X_train[:, 7] = np.clip(X_train[:, 7], 18, 120)
    
    # Scale features
    scaler = StandardScaler()
    X_scaled = scaler.fit_transform(X_train)
    
    # Train Random Forest model
    print("Training Random Forest Classifier...")
    model = RandomForestClassifier(
        n_estimators=100,
        max_depth=15,
        random_state=42,
        n_jobs=-1,
        verbose=1
    )
    model.fit(X_scaled, y_train)
    
    # Create models directory
    models_dir = os.path.join(os.path.dirname(__file__), 'models')
    os.makedirs(models_dir, exist_ok=True)
    
    # Save model and scaler
    model_path = os.path.join(models_dir, 'diabetes_model.pkl')
    scaler_path = os.path.join(models_dir, 'scaler.pkl')
    
    joblib.dump(model, model_path)
    joblib.dump(scaler, scaler_path)
    
    print("=" * 50)
    print(f"✅ Model trained and saved!")
    print(f"   Model: {model_path}")
    print(f"   Scaler: {scaler_path}")
    print(f"   Accuracy on training data: {model.score(X_scaled, y_train):.4f}")
    print("=" * 50)
    
    return model, scaler


if __name__ == '__main__':
    create_and_train_model()
