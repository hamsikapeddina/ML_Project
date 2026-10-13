"""FastAPI service for the Heart Disease Regularized Logistic Regression project.

Place heart_disease_models.joblib next to this file. It must contain a dict of
complete fitted scikit-learn Pipelines, keyed by the exact frontend model names.
"""
from pathlib import Path
from typing import Any

import joblib
import pandas as pd
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, Field

app = FastAPI(title="Heart Disease ML API", version="1.0.0")
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "http://127.0.0.1:3000"],
    allow_credentials=False,
    allow_methods=["GET", "POST"],
    allow_headers=["Content-Type", "Accept"],
)

MODEL_PATH = Path(__file__).resolve().parent / "heart_disease_models.joblib"
FEATURE_COLUMNS = [
    "age", "sex", "cp", "trestbps", "chol", "fbs", "restecg",
    "thalch", "exang", "oldpeak", "slope", "ca", "thal",
]
FRONTEND_TO_DATASET = [
    "Age", "Sex", "Chest_Pain_Type", "Resting_Blood_Pressure", "Cholesterol",
    "Fasting_Blood_Sugar", "Resting_ECG", "Maximum_Heart_Rate",
    "Exercise_Induced_Angina", "ST_Depression", "ST_Segment_Slope",
    "Major_Vessels", "Thalassemia",
]
MODEL_NAMES = [
    "Logistic Regression", "Ridge Logistic Regression", "Lasso Logistic Regression"
]


def load_models() -> dict[str, Any]:
    if not MODEL_PATH.exists():
        return {}
    loaded = joblib.load(MODEL_PATH)
    if not isinstance(loaded, dict):
        raise RuntimeError(
            "heart_disease_models.joblib must contain a dictionary of fitted pipelines. "
            "See backend/README.md."
        )
    return loaded


try:
    models = load_models()
except Exception as exc:  # fail visibly; never fabricate a prediction
    models = {}
    MODEL_LOAD_ERROR = str(exc)
else:
    MODEL_LOAD_ERROR = None


class PatientFeatures(BaseModel):
    Age: float = Field(ge=18, le=120)
    Sex: int = Field(ge=0, le=1)
    Chest_Pain_Type: int = Field(ge=1, le=4)
    Resting_Blood_Pressure: float = Field(ge=60, le=260)
    Cholesterol: float = Field(ge=80, le=650)
    Fasting_Blood_Sugar: int = Field(ge=0, le=1)
    Resting_ECG: int = Field(ge=0, le=2)
    Maximum_Heart_Rate: float = Field(ge=50, le=250)
    Exercise_Induced_Angina: int = Field(ge=0, le=1)
    ST_Depression: float = Field(ge=0, le=10)
    ST_Segment_Slope: int = Field(ge=1, le=3)
    Major_Vessels: int = Field(ge=0, le=3)
    Thalassemia: int = Field(ge=3, le=7)
    model_name: str = "Ridge Logistic Regression"


@app.get("/health")
def health():
    return {
        "status": "ok",
        "models_loaded": list(models.keys()),
        "model_file_found": MODEL_PATH.exists(),
        "model_load_error": MODEL_LOAD_ERROR,
    }


@app.post("/predict")
def predict(features: PatientFeatures):
    if MODEL_LOAD_ERROR:
        raise HTTPException(status_code=503, detail=f"Could not load trained model file: {MODEL_LOAD_ERROR}")
    if not models:
        raise HTTPException(
            status_code=503,
            detail="No trained model file found. Export heart_disease_models.joblib from the executed notebook and place it in backend/.",
        )
    if features.model_name not in models:
        raise HTTPException(
            status_code=400,
            detail=f"Requested model is unavailable: {features.model_name}. Available models: {list(models.keys())}",
        )

    raw_values = [[getattr(features, key) for key in FRONTEND_TO_DATASET]]
    X = pd.DataFrame(raw_values, columns=FEATURE_COLUMNS)
    # Each saved object is a full pipeline (imputer + scaler + classifier).
    # Pass raw values and never apply a separate scaler here.
    model = models[features.model_name]
    prediction = int(model.predict(X)[0])
    probability = float(model.predict_proba(X)[0, 1])
    return {
        "prediction": prediction,
        "probability": round(probability, 4),
        "model_name": features.model_name,
    }
