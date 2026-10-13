import React, { useState } from 'react';
import {
  X,
  Server,
  Terminal,
  Check,
  Copy,
  FolderTree,
  FileCode,
  Laptop,
  CheckCircle2,
  ExternalLink
} from 'lucide-react';
import { getApiUrl, setApiUrl } from '../services/predictionService';

interface BackendGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
  onRefreshBackend: () => void;
  backendOnline: boolean | null;
}

export const BackendGuideModal: React.FC<BackendGuideModalProps> = ({
  isOpen,
  onClose,
  onRefreshBackend,
  backendOnline,
}) => {
  const [activeTab, setActiveTab] = useState<'fastapi' | 'flask' | 'windows' | 'files'>('fastapi');
  const [copiedText, setCopiedText] = useState<string | null>(null);
  const [tempUrl, setTempUrl] = useState<string>(getApiUrl());

  if (!isOpen) return null;

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedText(id);
    setTimeout(() => setCopiedText(null), 2000);
  };

  const handleSaveUrl = () => {
    setApiUrl(tempUrl);
    onRefreshBackend();
  };

  const fastApiCode = `from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from pathlib import Path
import joblib
import pandas as pd

app = FastAPI(title="Heart Disease ML API")
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "http://127.0.0.1:3000"],
    allow_credentials=False,
    allow_methods=["GET", "POST"],
    allow_headers=["Content-Type", "Accept"],
)

MODEL_PATH = Path(__file__).parent / "heart_disease_models.joblib"
models = joblib.load(MODEL_PATH) if MODEL_PATH.exists() else {}

class PatientFeatures(BaseModel):
    Age: float
    Sex: int
    Chest_Pain_Type: int
    Resting_Blood_Pressure: float
    Cholesterol: float
    Fasting_Blood_Sugar: int
    Resting_ECG: int
    Maximum_Heart_Rate: float
    Exercise_Induced_Angina: int
    ST_Depression: float
    ST_Segment_Slope: int
    Major_Vessels: int
    Thalassemia: int
    model_name: str = "Ridge Logistic Regression"

@app.get("/health")
def health():
    return {"status": "ok", "models_loaded": list(models.keys())}

@app.post("/predict")
def predict(features: PatientFeatures):
    if not models:
        raise HTTPException(status_code=503, detail="No trained model file found. Export heart_disease_models.joblib from the notebook first.")
    if features.model_name not in models:
        raise HTTPException(status_code=400, detail=f"Requested model is not available: {features.model_name}. Available: {list(models.keys())}")

    # The exported objects are complete sklearn Pipelines (imputer + scaler + classifier).
    # Pass raw feature values; do not scale them a second time.
    columns = ["age", "sex", "cp", "trestbps", "chol", "fbs", "restecg", "thalch", "exang", "oldpeak", "slope", "ca", "thal"]
    values = [[features.Age, features.Sex, features.Chest_Pain_Type,
        features.Resting_Blood_Pressure, features.Cholesterol,
        features.Fasting_Blood_Sugar, features.Resting_ECG,
        features.Maximum_Heart_Rate, features.Exercise_Induced_Angina,
        features.ST_Depression, features.ST_Segment_Slope,
        features.Major_Vessels, features.Thalassemia]]
    X = pd.DataFrame(values, columns=columns)
    model = models[features.model_name]
    pred = int(model.predict(X)[0])
    prob = float(model.predict_proba(X)[0, 1])
    return {"prediction": pred, "probability": round(prob, 4), "model_name": features.model_name}

# Run: uvicorn app:app --host 127.0.0.1 --port 8000 --reload
`

  const flaskCode = `from flask import Flask, request, jsonify
from flask_cors import CORS
from pathlib import Path
import joblib
import pandas as pd

app = Flask(__name__)
CORS(app, origins=["http://localhost:3000", "http://127.0.0.1:3000"])
MODEL_PATH = Path(__file__).parent / "heart_disease_models.joblib"
models = joblib.load(MODEL_PATH) if MODEL_PATH.exists() else {}
COLUMNS = ["age", "sex", "cp", "trestbps", "chol", "fbs", "restecg", "thalch", "exang", "oldpeak", "slope", "ca", "thal"]

@app.get('/health')
def health():
    return jsonify({"status": "ok", "models_loaded": list(models.keys())})

@app.post('/predict')
def predict():
    if not models:
        return jsonify({"detail": "No trained model file found."}), 503
    data = request.get_json(force=True)
    name = data.get("model_name", "Ridge Logistic Regression")
    if name not in models:
        return jsonify({"detail": f"Requested model is not available: {name}"}), 400
    keys = ["Age", "Sex", "Chest_Pain_Type", "Resting_Blood_Pressure", "Cholesterol", "Fasting_Blood_Sugar", "Resting_ECG", "Maximum_Heart_Rate", "Exercise_Induced_Angina", "ST_Depression", "ST_Segment_Slope", "Major_Vessels", "Thalassemia"]
    X = pd.DataFrame([[data[k] for k in keys]], columns=COLUMNS)
    model = models[name]  # Complete sklearn Pipeline; do not scale twice.
    pred = int(model.predict(X)[0])
    prob = float(model.predict_proba(X)[0, 1])
    return jsonify({"prediction": pred, "probability": round(prob, 4), "model_name": name})

if __name__ == '__main__':
    app.run(host='127.0.0.1', port=8000, debug=False)
`;

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl max-w-3xl w-full border border-slate-200 shadow-2xl flex flex-col max-h-[90vh] overflow-hidden animate-fadeIn">
        
        {/* Modal Top Bar */}
        <div className="p-5 sm:p-6 border-b border-slate-200 flex items-center justify-between bg-slate-50">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-slate-900 text-teal-400 flex items-center justify-center">
              <Server className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-lg text-slate-900">
                Colab &amp; Python Backend Integration Guide
              </h3>
              <p className="text-xs text-slate-500">
                Connect your saved Scikit-learn pipelines (.joblib) to this React frontend
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-200/60 cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Current Endpoint Configuration Bar */}
        <div className="p-4 bg-teal-50/70 border-b border-teal-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2">
            <span
              className={`w-2.5 h-2.5 rounded-full ${
                backendOnline ? 'bg-emerald-500' : 'bg-amber-500'
              }`}
            />
            <span className="text-slate-700">
              API Endpoint: <strong>{getApiUrl()}</strong>
            </span>
            <span className="text-slate-500">
              ({backendOnline ? 'Online' : 'Offline / Waiting'})
            </span>
          </div>

          <div className="flex items-center gap-2">
            <input
              type="text"
              value={tempUrl}
              onChange={(e) => setTempUrl(e.target.value)}
              placeholder="http://localhost:8000"
              className="px-2.5 py-1 text-xs rounded-lg border border-teal-300 bg-white font-mono text-slate-800"
            />
            <button
              onClick={handleSaveUrl}
              className="px-3 py-1 rounded-lg bg-teal-800 text-white font-semibold hover:bg-teal-900 cursor-pointer text-xs"
            >
              Update URL
            </button>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-slate-200 px-6 pt-3 gap-4 text-xs font-semibold overflow-x-auto">
          <button
            onClick={() => setActiveTab('fastapi')}
            className={`pb-3 border-b-2 cursor-pointer transition-colors ${
              activeTab === 'fastapi'
                ? 'border-teal-700 text-teal-900'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            FastAPI Backend (Colab / Local)
          </button>
          <button
            onClick={() => setActiveTab('flask')}
            className={`pb-3 border-b-2 cursor-pointer transition-colors ${
              activeTab === 'flask'
                ? 'border-teal-700 text-teal-900'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            Flask Backend
          </button>
          <button
            onClick={() => setActiveTab('windows')}
            className={`pb-3 border-b-2 cursor-pointer transition-colors ${
              activeTab === 'windows'
                ? 'border-teal-700 text-teal-900'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            Windows &amp; VS Code Run Guide
          </button>
          <button
            onClick={() => setActiveTab('files')}
            className={`pb-3 border-b-2 cursor-pointer transition-colors ${
              activeTab === 'files'
                ? 'border-teal-700 text-teal-900'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            Editable Project Files Map
          </button>
        </div>

        {/* Tab Body */}
        <div className="p-6 overflow-y-auto space-y-4 text-xs">
          {activeTab === 'fastapi' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <p className="text-slate-600">
                  Save this script as <code className="font-mono bg-slate-100 px-1 py-0.5 rounded text-slate-800">app.py</code> and run with: <code className="font-mono bg-slate-100 px-1 py-0.5 rounded text-slate-800">uvicorn app:app --port 8000 --reload</code>
                </p>
                <button
                  onClick={() => copyToClipboard(fastApiCode, 'fastapi')}
                  className="px-2.5 py-1.5 rounded-lg border border-slate-200 bg-slate-50 text-slate-700 hover:bg-slate-100 flex items-center gap-1 cursor-pointer"
                >
                  {copiedText === 'fastapi' ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedText === 'fastapi' ? 'Copied' : 'Copy Code'}</span>
                </button>
              </div>

              <pre className="p-4 rounded-xl bg-slate-900 text-slate-100 font-mono text-[11px] overflow-x-auto leading-relaxed">
                {fastApiCode}
              </pre>
            </div>
          )}

          {activeTab === 'flask' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <p className="text-slate-600">
                  Alternative lightweight Flask server (<code className="font-mono bg-slate-100 px-1 py-0.5 rounded text-slate-800">python app.py</code>):
                </p>
                <button
                  onClick={() => copyToClipboard(flaskCode, 'flask')}
                  className="px-2.5 py-1.5 rounded-lg border border-slate-200 bg-slate-50 text-slate-700 hover:bg-slate-100 flex items-center gap-1 cursor-pointer"
                >
                  {copiedText === 'flask' ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedText === 'flask' ? 'Copied' : 'Copy Code'}</span>
                </button>
              </div>

              <pre className="p-4 rounded-xl bg-slate-900 text-slate-100 font-mono text-[11px] overflow-x-auto leading-relaxed">
                {flaskCode}
              </pre>
            </div>
          )}

          {activeTab === 'windows' && (
            <div className="space-y-4 text-slate-700">
              <h4 className="font-bold text-sm text-slate-900 flex items-center gap-2">
                <Laptop className="w-4 h-4 text-teal-700" />
                Windows &amp; VS Code Step-by-Step Instructions
              </h4>
              
              <ol className="space-y-3 list-decimal list-inside pl-1 text-xs leading-relaxed">
                <li>
                  <strong>Open in VS Code:</strong> Launch VS Code on your Windows PC, select <em>File &rarr; Open Folder...</em> and choose this project root.
                </li>
                <li>
                  <strong>Open Terminal:</strong> Press <kbd className="px-1.5 py-0.5 rounded bg-slate-100 border border-slate-300 font-mono text-[10px]">Ctrl + `</kbd> in VS Code to open PowerShell / CMD.
                </li>
                <li>
                  <strong>Install Dependencies:</strong> Run the command:
                  <pre className="mt-1 p-2 rounded bg-slate-900 text-teal-300 font-mono text-xs">npm install</pre>
                </li>
                <li>
                  <strong>Start Local Dev Server:</strong>
                  <pre className="mt-1 p-2 rounded bg-slate-900 text-teal-300 font-mono text-xs">npm run dev</pre>
                  Open your browser at <a href="http://localhost:3000" target="_blank" rel="noreferrer" className="text-teal-700 underline font-semibold">http://localhost:3000</a>.
                </li>
                <li>
                  <strong>Run Colab / Python Backend (Optional):</strong>
                  If connecting to your trained model, run FastAPI on port 8000:
                  <pre className="mt-1 p-2 rounded bg-slate-900 text-teal-300 font-mono text-xs">uvicorn app:app --port 8000</pre>
                </li>
              </ol>
            </div>
          )}

          {activeTab === 'files' && (
            <div className="space-y-4 text-slate-700">
              <h4 className="font-bold text-sm text-slate-900 flex items-center gap-2">
                <FolderTree className="w-4 h-4 text-indigo-700" />
                Key Project Files &amp; Configuration Map
              </h4>

              <div className="space-y-2.5">
                <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
                  <span className="font-mono font-bold text-slate-900 block text-xs">src/data/samplePatients.ts</span>
                  <span className="text-slate-600 text-[11px] block mt-0.5">
                    Contains the sample patient demonstration data (Sample 1, 2, 3) and blank template. You can add or edit sample patient attributes here.
                  </span>
                </div>

                <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
                  <span className="font-mono font-bold text-slate-900 block text-xs">src/data/modelMetrics.ts</span>
                  <span className="text-slate-600 text-[11px] block mt-0.5">
                    Stores the model performance numbers (Accuracy, Precision, Recall, F1, ROC-AUC) and confusion matrix counts for Logistic Regression, Ridge, and Lasso.
                  </span>
                </div>

                <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
                  <span className="font-mono font-bold text-slate-900 block text-xs">src/services/predictionService.ts</span>
                  <span className="text-slate-600 text-[11px] block mt-0.5">
                    The API communication layer. Dispatches HTTP POST requests to <code className="font-mono text-slate-800">/predict</code>, checks backend health, and provides synthetic presentation mode.
                  </span>
                </div>

                <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
                  <span className="font-mono font-bold text-slate-900 block text-xs">.env.example</span>
                  <span className="text-slate-600 text-[11px] block mt-0.5">
                    Contains <code className="font-mono text-slate-800">VITE_API_URL</code> environment variable definition for customizing your production endpoint.
                  </span>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="p-4 border-t border-slate-200 bg-slate-50 flex items-center justify-between text-xs">
          <span className="text-slate-500">
            Frontend is 100% functional with offline synthetic demo mode enabled.
          </span>
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-slate-900 text-white font-semibold hover:bg-slate-800 transition-colors cursor-pointer"
          >
            Close Guide
          </button>
        </div>

      </div>
    </div>
  );
};
