#!/usr/bin/env python
"""
Main entry point for the Sugar Sense application.
Runs the Flask diabetes prediction API server.
"""

import os
import sys
from backend.app import create_app


def main():
    """Run the Flask application."""
    print("🍬 Sugar Sense - Diabetes Prediction API")
    print("=" * 50)
    
    # Create Flask app
    app = create_app()
    
    # Get configuration
    debug_mode = os.getenv('FLASK_DEBUG', 'True').lower() == 'true'
    host = os.getenv('FLASK_HOST', '0.0.0.0')
    port = int(os.getenv('FLASK_PORT', 5000))
    
    print(f"🚀 Starting server...")
    print(f"   Environment: {os.getenv('FLASK_ENV', 'development')}")
    print(f"   Debug mode: {debug_mode}")
    print(f"   API endpoint: http://localhost:{port}")
    print(f"   Health check: http://localhost:{port}/api/health")
    print("=" * 50)
    
    try:
        app.run(debug=debug_mode, host=host, port=port)
    except KeyboardInterrupt:
        print("\n❌ Server stopped by user")
        sys.exit(0)


if __name__ == '__main__':
    main()
