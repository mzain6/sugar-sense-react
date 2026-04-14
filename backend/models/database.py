"""Database module for storing predictions."""

import sqlite3
import json
from datetime import datetime
from pathlib import Path
import threading


class Database:
    """SQLite database manager for prediction history."""
    
    def __init__(self, db_path='backend/data/predictions.db'):
        """Initialize database connection."""
        self.db_path = db_path
        Path(db_path).parent.mkdir(parents=True, exist_ok=True)
        self.lock = threading.Lock()
        self._init_db()
    
    def _init_db(self):
        """Initialize database tables."""
        with sqlite3.connect(self.db_path) as conn:
            conn.execute('''
                CREATE TABLE IF NOT EXISTS predictions (
                    id INTEGER PRIMARY KEY AUTOINCREMENT,
                    timestamp TEXT NOT NULL,
                    pregnancies REAL,
                    glucose REAL,
                    blood_pressure REAL,
                    skin_thickness REAL,
                    insulin REAL,
                    bmi REAL,
                    diabetes_pedigree_function REAL,
                    age REAL,
                    prediction INTEGER,
                    probability REAL,
                    risk_level TEXT,
                    recommendation TEXT
                )
            ''')
            conn.commit()
    
    def save_prediction(self, input_data, result):
        """Save a prediction to database."""
        with self.lock:
            with sqlite3.connect(self.db_path) as conn:
                conn.execute('''
                    INSERT INTO predictions (
                        timestamp, pregnancies, glucose, blood_pressure, skin_thickness,
                        insulin, bmi, diabetes_pedigree_function, age,
                        prediction, probability, risk_level, recommendation
                    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
                ''', (
                    datetime.now().strftime('%Y-%m-%d %H:%M:%S'),
                    float(input_data.get('Pregnancies', 0)),
                    float(input_data.get('Glucose', 0)),
                    float(input_data.get('BloodPressure', 0)),
                    float(input_data.get('SkinThickness', 0)),
                    float(input_data.get('Insulin', 0)),
                    float(input_data.get('BMI', 0)),
                    float(input_data.get('DiabetesPedigreeFunction', 0)),
                    float(input_data.get('Age', 0)),
                    result.get('prediction'),
                    result.get('diabetes_probability'),
                    result.get('risk_level'),
                    result.get('recommendation')
                ))
                conn.commit()
    
    def get_all_predictions(self, limit=100):
        """Retrieve all predictions from database."""
        with sqlite3.connect(self.db_path) as conn:
            conn.row_factory = sqlite3.Row
            cursor = conn.execute('''
                SELECT * FROM predictions
                ORDER BY timestamp DESC
                LIMIT ?
            ''', (limit,))
            return [dict(row) for row in cursor.fetchall()]
    
    def get_prediction_stats(self):
        """Get statistics about predictions."""
        with sqlite3.connect(self.db_path) as conn:
            cursor = conn.execute('''
                SELECT 
                    COUNT(*) as total,
                    AVG(probability) as avg_probability,
                    SUM(CASE WHEN risk_level='High' THEN 1 ELSE 0 END) as high_risk_count
                FROM predictions
            ''')
            row = cursor.fetchone()
            return {
                'total': row[0] if row[0] else 0,
                'avg_probability': row[1] if row[1] else 0,
                'high_risk_count': row[2] if row[2] else 0
            }
    
    def clear_old_predictions(self, days=30):
        """Clear predictions older than specified days."""
        with self.lock:
            with sqlite3.connect(self.db_path) as conn:
                conn.execute('''
                    DELETE FROM predictions
                    WHERE datetime(timestamp) < datetime('now', '-' || ? || ' days')
                ''', (days,))
                conn.commit()


# Global database instance
_db = None


def get_db():
    """Get or create the global database instance."""
    global _db
    if _db is None:
        _db = Database()
    return _db
