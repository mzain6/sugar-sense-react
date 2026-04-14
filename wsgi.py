"""
WSGI entry point for production deployment.
Use this with gunicorn or other WSGI servers.

Example:
  gunicorn -w 4 -b 0.0.0.0:5000 wsgi:app
"""

from backend.app import create_app

app = create_app()

if __name__ == '__main__':
    app.run()
