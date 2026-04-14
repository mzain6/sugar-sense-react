# Quick Start Guide

This file contains instructions for quickly getting the Sugar Sense application running.

## 🚀 Quick Start (5 minutes)

### 1. Backend Setup (Python)

```bash
# Create virtual environment
python -m venv venv

# Activate it (Windows)
venv\Scripts\activate
# Or (Mac/Linux)
# source venv/bin/activate

# Install dependencies
pip install -r backend/requirements.txt

# Train the model (first time only)
python backend/train_model.py

# Run the Flask server
python run.py
```

The backend will be available at: **http://localhost:5000**

### 2. Frontend Setup (React) - In a new terminal

```bash
# Install dependencies
npm install
# Or with bun:
# bun install

# Start development server
npm run dev
```

The frontend will be available at: **http://localhost:5173**

## 📡 Test the API

Using curl or Postman, send a POST request to `http://localhost:5000/api/predict`:

```json
{
  "Pregnancies": 6,
  "Glucose": 148,
  "BloodPressure": 72,
  "SkinThickness": 35,
  "Insulin": 0,
  "BMI": 33.6,
  "DiabetesPedigreeFunction": 0.627,
  "Age": 50
}
```

## 🧪 Run Tests

```bash
# Install dev dependencies
pip install -r backend/requirements-dev.txt

# Run tests
pytest backend/test_api.py -v
```

## 📚 API Documentation

- **Health Check**: `GET /api/health`
- **Predict**: `POST /api/predict`
- **Features**: `GET /api/features`

See README.md for complete documentation.

## 🔧 Troubleshooting

### Python port already in use
Change in `backend/.env`:
```
FLASK_PORT=5001
```

### Node modules issues
```bash
rm -rf node_modules package-lock.json
npm install
```

### Virtual environment issues
```bash
deactivate
rm -rf venv
python -m venv venv
venv\Scripts\activate
pip install -r backend/requirements.txt
```

---

For more details, see [README.md](README.md)
