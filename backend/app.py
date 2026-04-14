"""
Sugar Sense - Diabetes Prediction Web Application
A Flask-based full-stack application for diabetes risk prediction
"""

from flask import Flask, jsonify
from flask_cors import CORS
from backend.config import current_config
from backend.routes import register_routes


def create_app():
    """Create and configure the Flask application."""
    app = Flask(__name__, 
                template_folder='backend/templates',
                static_folder='backend/static')
    app.config.from_object(current_config)
    
    # Enable CORS for API routes
    CORS(app, resources={
        r"/api/*": {
            "origins": ["http://localhost:5173", "http://localhost:3000", "http://localhost:5000"],
            "methods": ["GET", "POST", "OPTIONS"],
            "allow_headers": ["Content-Type"]
        }
    })
    
    # Register all routes
    register_routes(app)
    
    return app


if __name__ == '__main__':
    app = create_app()
    app.run(debug=True, host='0.0.0.0', port=5000)
