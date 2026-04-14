# Sugar Sense - Diabetes Prediction Application

This is a full-stack diabetes prediction application built with **Python (Flask)** as the main backend and **React** as the frontend.

## 📋 Project Structure

```
sugar-sense-react/
├── backend/                    # Python Flask API (Main backend)
│   ├── app.py                 # Flask application factory
│   ├── config.py              # Configuration management
│   ├── requirements.txt        # Python dependencies
│   ├── .env.example           # Environment variables template
│   ├── utils/
│   │   ├── diabetes_predictor.py    # Core ML prediction model
│   │   └── validators.py      # Input validation utilities
│   └── models/                # Trained model storage
├── src/                        # React TypeScript frontend
│   ├── components/            # React components
│   │   ├── PredictionForm.tsx # Main prediction form
│   │   ├── Header.tsx
│   │   ├── HeroSection.tsx
│   │   ├── EducationSection.tsx
│   │   ├── AboutSection.tsx
│   │   ├── Footer.tsx
│   │   └── ui/               # shadcn UI components
│   ├── pages/                 # Page components
│   ├── hooks/                 # Custom React hooks
│   ├── lib/                   # Utilities
│   └── App.tsx               # Root component
├── run.py                      # Main Python entry point
├── package.json               # Node.js dependencies
├── vite.config.ts            # Vite configuration
├── tsconfig.json             # TypeScript configuration
├── tailwind.config.ts        # Tailwind CSS configuration
└── README.md                 # This file

```

## 🎯 Features

### Backend (Python - Flask)
- **Diabetes Risk Prediction**: Uses Random Forest machine learning model
- **REST API**: RESTful endpoints for predictions and health checks
- **Input Validation**: Comprehensive validation for medical parameters
- **CORS Support**: Integrated CORS for frontend communication
- **Configuration Management**: Environment-based configuration
- **Feature Documentation**: API endpoints for feature descriptions

### Frontend (React - TypeScript)
- **Modern UI**: Built with React and shadcn UI components
- **Tailwind CSS**: Utility-first CSS framework
- **Type-Safe**: Full TypeScript support
- **Responsive Design**: Mobile-friendly interface
- **Form Validation**: Client-side input validation

## 🚀 Getting Started

### Prerequisites
- Python 3.8 or higher
- Node.js 16+ and npm/bun
- pip (Python package manager)

### Backend Setup

1. **Create a Python virtual environment**:
   ```bash
   python -m venv venv
   ```

2. **Activate the virtual environment**:
   - Windows:
     ```bash
     venv\Scripts\activate
     ```
   - macOS/Linux:
     ```bash
     source venv/bin/activate
     ```

3. **Install Python dependencies**:
   ```bash
   pip install -r backend/requirements.txt
   ```

4. **Set up environment variables**:
   ```bash
   cp backend/.env.example backend/.env
   ```
   Edit `backend/.env` to configure Flask settings if needed.

5. **Run the Flask server**:
   ```bash
   python run.py
   ```
   The API will be available at `http://localhost:5000`

### Frontend Setup

1. **Install Node.js dependencies**:
   ```bash
   npm install
   # or with bun:
   bun install
   ```

2. **Start the development server**:
   ```bash
   npm run dev
   # or with bun:
   bun run dev
   ```
   The frontend will be available at `http://localhost:5173`

## 📡 API Endpoints

### Health Check
```
GET /api/health
```
Returns the API status.

### Make Prediction
```
POST /api/predict
Content-Type: application/json

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

Response:
```json
{
  "prediction": 1,
  "diabetes_probability": 0.75,
  "no_diabetes_probability": 0.25,
  "risk_level": "High",
  "recommendation": "Strong recommendation to consult with a healthcare professional..."
}
```

### Get Feature Information
```
GET /api/features
```
Returns descriptions of all prediction features and their valid ranges.

## 🤖 ML Model Details

The diabetes prediction model uses:
- **Algorithm**: Random Forest Classifier
- **Features**: 8 medical parameters
- **Training**: Scikit-learn with preprocessing
- **Input Scaling**: StandardScaler normalization
- **Output**: Binary classification (diabetic/non-diabetic) with probability

### Features Used:
1. **Pregnancies**: Number of times pregnant
2. **Glucose**: Plasma glucose concentration (mg/dL)
3. **BloodPressure**: Diastolic blood pressure (mmHg)
4. **SkinThickness**: Triceps skin fold thickness (mm)
5. **Insulin**: 2-Hour serum insulin (mU/mL)
6. **BMI**: Body mass index (kg/m²)
7. **DiabetesPedigreeFunction**: Genetic predisposition factor
8. **Age**: Age in years

## 🛠️ Development

### Running Both Services

To run both backend and frontend simultaneously:

**Terminal 1 - Backend (Python)**:
```bash
python run.py
```

**Terminal 2 - Frontend (React)**:
```bash
npm run dev
```

### Frontend dev scripts
```bash
npm run dev      # Start dev server with hot reload
npm run build    # Build for production
npm run preview  # Preview production build
npm run lint     # Run ESLint
```

### Backend debugging
The Flask app runs in debug mode by default in development, with:
- Hot reloading on file changes
- Detailed error pages
- Interactive debugger

## 📦 Dependencies

### Python (Backend)
- `Flask` - Web framework
- `Flask-CORS` - Cross-origin support
- `scikit-learn` - Machine learning
- `pandas` - Data manipulation
- `numpy` - Numerical computing
- `joblib` - Model serialization
- `python-dotenv` - Environment management

### JavaScript (Frontend)
- `React` - UI library
- `React Router` - Routing
- `TypeScript` - Type safety
- `Tailwind CSS` - Styling
- `shadcn UI` - Component library
- `Vite` - Build tool

## 🔐 Environment Configuration

Create a `.env` file in the `backend/` directory:

```env
FLASK_ENV=development
FLASK_DEBUG=True
SECRET_KEY=your-secret-key-here
```

## 📝 License

This project is licensed under the MIT License.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📧 Support

For questions or issues, please open an issue on the repository.

---

**Built with ❤️ for health prediction**
