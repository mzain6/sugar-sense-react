# Sugar Sense - Diabetes Prediction Application

This is a **Python-first full-stack diabetes prediction application** built with **Flask** backend and **Jinja2 templates** for rendering HTML. The application uses machine learning to predict diabetes risk.

## 🎯 Project Statistics

**Language Distribution:**
- **Python: ~70%** - Core backend, ML model, business logic, database
- **HTML/Jinja2: ~20%** - Flask templates for web pages
- **TypeScript/JavaScript: ~5%** - Minimal frontend interactivity
- **Configuration: ~5%** - YAML, JSON, config files

## 📋 Project Structure

```
sugar-sense-react/
├── 🐍 BACKEND (Python - 70%)
│   ├── run.py                       # Main entry point
│   ├── wsgi.py                      # Production WSGI entry
│   ├── backend/
│   │   ├── app.py                  # Flask application
│   │   ├── config.py               # Configuration
│   │   ├── routes.py               # URL routes & views
│   │   ├── requirements.txt        # Dependencies
│   │   ├── train_model.py          # ML model training
│   │   ├── test_api.py             # Unit tests
│   │   │
│   │   ├── models/                 # Data models
│   │   │   ├── database.py         # SQLite database layer
│   │   │   ├── analytics.py        # Data analytics
│   │   │   └── health_metrics.py   # Health calculations
│   │   │
│   │   ├── utils/                  # Utilities
│   │   │   ├── diabetes_predictor.py  # ML prediction
│   │   │   └── validators.py       # Input validation
│   │   │
│   │   ├── templates/              # Jinja2 HTML templates
│   │   │   ├── base.html           # Base template
│   │   │   ├── index.html          # Home page
│   │   │   ├── predict.html        # Prediction form
│   │   │   ├── history.html        # Prediction history
│   │   │   ├── about.html          # About page
│   │   │   ├── 404.html            # 404 error
│   │   │   └── 500.html            # 500 error
│   │   │
│   │   └── static/                 # Static files
│   │       ├── css/                # Stylesheets
│   │       └── js/                 # JavaScript
│   │
│   └── data/                       # Database files
│       └── predictions.db          # SQLite database
│
├── 📄 CONFIGURATION FILES
│   ├── setup.py                    # Python package setup
│   ├── analyze_project.py          # Language analysis tool
│   ├── vite.config.ts              # Vite config (minimal)
│   ├── tsconfig.json               # TypeScript config
│   ├── tailwind.config.ts          # Tailwind config
│   └── .gitignore                  # Git ignore patterns
│
├── 📚 DOCUMENTATION
│   ├── README.md                   # This file
│   ├── QUICKSTART.md               # Quick start guide
│   ├── IMPLEMENTATION_SUMMARY.md   # Implementation details
│   └── FILE_STRUCTURE.md           # Directory structure
│
└── 🐳 DEPLOYMENT
    ├── Dockerfile                  # Flask backend container
    ├── docker-compose.yml          # Multi-container setup
    └── .dockerignore

```

## 🚀 Features

### Backend (Python)
- **Flask Web Application** - Full web server with templates
- **Diabetes Risk ML Model** - Random Forest classifier
- **HTML Template Rendering** - Jinja2 templates for dynamic pages
- **SQLite Database** - Prediction history storage
- **Data Analytics** - Statistical analysis of predictions
- **Health Metrics** - BMI, glucose, BP interpretation
- **Input Validation** - Comprehensive parameter validation
- **Error Handling** - Custom error pages

### Pages & Routes
- `GET /` - Home page with features overview
- `GET /predict` - Prediction form page  
- `POST /predict` - Process prediction form
- `GET /history` - View prediction history
- `GET /about` - About and disclaimer page
- Error pages (404, 500)

## 🎯 Getting Started

### Prerequisites
- Python 3.8+
- pip (Python package manager)

### Backend Setup

```bash
# Create virtual environment
python -m venv venv

# Activate (Windows)
venv\Scripts\activate
# Or macOS/Linux
# source venv/bin/activate

# Install dependencies
pip install -r backend/requirements.txt

# Train the ML model
python backend/train_model.py

# Run the Flask application
python run.py
```

The application will be available at **http://localhost:5000**

### Using npm scripts

```bash
# Setup Python environment
npm run backend:setup

# Train the model
npm run backend:train

# Run the backend
npm run backend

# Analyze language distribution
npm run analyze
```

## 📊 Database Schema

### Predictions Table
```sql
CREATE TABLE predictions (
    id INTEGER PRIMARY KEY,
    timestamp TEXT,
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
```

## 🤖 ML Model Details

**Algorithm:** Random Forest Classifier
- **Trees:** 100
- **Max Depth:** 15
- **Input Features:** 8 medical parameters
- **Output:** Binary classification + probability

### Input Features
1. Pregnancies (0-17)
2. Glucose (0-200 mg/dL)
3. Blood Pressure (0-200 mmHg)
4. Skin Thickness (0-100 mm)
5. Insulin (0-900 mU/mL)
6. BMI (10-70 kg/m²)
7. Diabetes Pedigree Function (0-2.5)
8. Age (18-120 years)

## 🧪 Testing

```bash
pip install -r backend/requirements-dev.txt
pytest backend/test_api.py -v
```

## 📦 Dependencies

### Python Packages
- **Flask** - Web framework
- **scikit-learn** - Machine learning
- **pandas** - Data manipulation
- **numpy** - Numerical computing
- **joblib** - Model serialization
- **python-dotenv** - Environment management

### Development
- **pytest** - Testing framework
- **gunicorn** - Production server
- **black** - Code formatter
- **flake8** - Linter

## 🔐 Configuration

Environment file (`backend/.env`):
```env
FLASK_ENV=development
FLASK_DEBUG=True
FLASK_HOST=0.0.0.0
FLASK_PORT=5000
SECRET_KEY=your-secret-key
```

## 🚀 Production Deployment

```bash
# Install production dependencies
pip install gunicorn

# Run with gunicorn
gunicorn -w 4 -b 0.0.0.0:5000 wsgi:app
```

### Using Docker

```bash
# Build and run
docker-compose up --build

# Or individually
docker build -t sugar-sense .
docker run -p 5000:5000 sugar-sense
```

## 📈 API Endpoints (JSON)

For programmatic access:

```bash
# Health check
GET /api/health

# Make prediction (JSON)
POST /api/predict
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

# Get feature info
GET /api/features
```

## 🔍 Language Distribution

Run the analysis tool:

```bash
python analyze_project.py
# or
npm run analyze
```

Output:
```
Language          Files      Lines  Percentage
Python            25+        2000+      70%
HTML/Jinja2       6          1200+      20%
TypeScript        2-3        300+       5%
Configuration     8          200+       5%
```

## 📝 File Descriptions

| File | Purpose | Language |
|------|---------|----------|
| `backend/app.py` | Flask application factory | Python |
| `backend/routes.py` | URL routes and views | Python |
| `backend/models/database.py` | SQLite database layer | Python |
| `backend/models/analytics.py` | Statistical analysis | Python |
| `backend/utils/diabetes_predictor.py` | ML prediction model | Python |
| `backend/templates/*.html` | Web page templates | Jinja2/HTML |
| `run.py` | Main entry point | Python |

## 📞 Support & Documentation

- **Quick Start:** See [QUICKSTART.md](QUICKSTART.md)
- **Implementation Details:** See [IMPLEMENTATION_SUMMARY.md](IMPLEMENTATION_SUMMARY.md)
- **Project Structure:** See [FILE_STRUCTURE.md](FILE_STRUCTURE.md)

## ⚠️ Disclaimer

This tool is for educational purposes only and should not be used as a substitute for professional medical advice. Always consult with a healthcare provider for medical decisions.

---

**Built with Python 🐍 | Full-Stack Web Application | Machine Learning Diabetes Prediction**
