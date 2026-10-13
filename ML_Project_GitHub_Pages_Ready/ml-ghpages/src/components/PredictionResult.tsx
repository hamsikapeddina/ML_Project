import React, { useState } from 'react';
import { PredictionResponse, PatientData } from '../types/heartDisease';
import { AlertCircle, CheckCircle2, RefreshCw, Cpu, ShieldAlert, ChevronDown, ChevronUp, Info } from 'lucide-react';

interface PredictionResultProps {
  result: PredictionResponse;
  patientData: PatientData;
  onTryAnother: () => void;
}

export const PredictionResult: React.FC<PredictionResultProps> = ({
  result,
  patientData,
  onTryAnother,
}) => {
  const [showHowItWorks, setShowHowItWorks] = useState(false);

  const isHeartDisease = result.prediction === 1;
  const probabilityPercent =
    result.probability !== undefined
      ? (result.probability * 100).toFixed(1)
      : null;

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 sm:p-8 space-y-6">
      {/* Top Bar with Model Name & Demo label */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-200">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs uppercase tracking-wider font-semibold text-slate-500 font-mono">
              Prediction Output
            </span>
            {result.isDemo && (
              <span className="px-2 py-0.5 rounded text-[11px] font-semibold bg-amber-100 text-amber-900 border border-amber-300">
                Demo Mode Result
              </span>
            )}
          </div>
          <h3 className="text-xl font-bold text-slate-900 flex items-center gap-2 mt-0.5">
            <Cpu className="w-5 h-5 text-teal-700" />
            {result.model_name}
          </h3>
        </div>

        {result.timestamp && (
          <span className="text-xs text-slate-400 font-mono self-start sm:self-center">
            Evaluated at: {result.timestamp}
          </span>
        )}
      </div>

      {/* Demo notification banner if in simulation mode */}
      {result.isDemo && (
        <div className="p-3.5 rounded-xl bg-amber-50 border border-amber-200 text-xs text-amber-900 flex items-start gap-2.5">
          <AlertCircle className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
          <div className="space-y-0.5">
            <p className="font-semibold text-amber-950">Demonstration Result</p>
            <p className="text-amber-800 leading-relaxed">
              This result was generated in demo mode for UI evaluation. Connect your trained Python model to obtain actual predictions.
            </p>
          </div>
        </div>
      )}

      {/* Primary Classification Result Card */}
      <div
        className={`p-6 rounded-2xl border transition-all ${
          isHeartDisease
            ? 'bg-rose-50/70 border-rose-200'
            : 'bg-emerald-50/70 border-emerald-200'
        }`}
      >
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="flex items-start gap-4">
            <div
              className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 ${
                isHeartDisease
                  ? 'bg-rose-100 text-rose-700 border border-rose-300'
                  : 'bg-emerald-100 text-emerald-700 border border-emerald-300'
              }`}
            >
              {isHeartDisease ? (
                <AlertCircle className="w-6 h-6" />
              ) : (
                <CheckCircle2 className="w-6 h-6" />
              )}
            </div>

            <div className="space-y-1">
              <div className="text-xs font-semibold uppercase tracking-wider text-slate-500 font-mono">
                Predicted Class
              </div>
              <div
                className={`text-2xl sm:text-3xl font-extrabold tracking-tight ${
                  isHeartDisease ? 'text-rose-950' : 'text-emerald-950'
                }`}
              >
                {isHeartDisease ? 'Heart Disease' : 'No Heart Disease'}
              </div>
              <p className="text-xs sm:text-sm text-slate-600 max-w-xl">
                {isHeartDisease
                  ? 'The model evaluated the 13 clinical attributes and predicted the presence of heart disease based on its decision threshold.'
                  : 'The model evaluated the 13 clinical attributes and predicted no heart disease based on its decision threshold.'}
              </p>
            </div>
          </div>

          {/* Probability Gauge (when available from model) */}
          {probabilityPercent !== null && (
            <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-2xs min-w-[190px] text-center shrink-0">
              <div className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">
                Predicted Probability
              </div>
              <div className="text-3xl font-extrabold text-slate-900 mt-1 font-mono">
                {probabilityPercent}%
              </div>
              <div className="w-full bg-slate-100 h-2 rounded-full mt-2.5 overflow-hidden">
                <div
                  className={`h-full rounded-full transition-all duration-500 ${
                    isHeartDisease ? 'bg-rose-500' : 'bg-emerald-500'
                  }`}
                  style={{ width: `${Math.min(100, Number(probabilityPercent))}%` }}
                />
              </div>
              <span className="text-[10px] text-slate-400 mt-1 block">
                Model confidence score P(y=1)
              </span>
            </div>
          )}
        </div>
      </div>

      {/* Expandable Section: "How does the prediction work?" */}
      <div className="border border-slate-200 rounded-xl overflow-hidden bg-slate-50/70">
        <button
          type="button"
          onClick={() => setShowHowItWorks(!showHowItWorks)}
          className="w-full px-4 py-3 text-left font-semibold text-xs sm:text-sm text-slate-800 flex items-center justify-between hover:bg-slate-100/70 transition-colors cursor-pointer"
        >
          <span className="flex items-center gap-2">
            <Info className="w-4 h-4 text-teal-700" />
            How does the prediction work?
          </span>
          {showHowItWorks ? <ChevronUp className="w-4 h-4 text-slate-500" /> : <ChevronDown className="w-4 h-4 text-slate-500" />}
        </button>

        {showHowItWorks && (
          <div className="p-4 border-t border-slate-200 bg-white text-xs text-slate-600 space-y-2 leading-relaxed">
            <p>
              The system processes the patient&apos;s 13 input attributes using a trained <strong>Logistic Regression model</strong>.
            </p>
            <p>
              During inference, each feature value is standardized using the training data mean and scale. The model calculates a weighted linear score by multiplying each feature by its learned coefficient:
            </p>
            <div className="bg-slate-50 p-2.5 rounded-lg border border-slate-200 font-mono text-[11px] text-slate-800 text-center">
              z = w₁·Age + w₂·Sex + ... + w₁₃·Thal + b
            </div>
            <p>
              This score is then passed through the <strong>sigmoid function</strong> σ(z) = 1 / (1 + e<sup>-z</sup>) to map the result into a probability between 0% and 100%. If the probability is 50% or greater, the model predicts <strong>Heart Disease (1)</strong>; otherwise it predicts <strong>No Heart Disease (0)</strong>.
            </p>
            <p className="text-slate-500 italic">
              Note: Model probability reflects statistical likelihood in the trained dataset and is not a clinically validated medical diagnosis.
            </p>
          </div>
        )}
      </div>

      {/* Action Buttons */}
      <div className="flex flex-wrap items-center justify-between gap-3 pt-1">
        <button
          onClick={onTryAnother}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-slate-900 text-white text-sm font-medium hover:bg-slate-800 transition-colors shadow-2xs cursor-pointer"
        >
          <RefreshCw className="w-4 h-4" />
          <span>Try Another Patient</span>
        </button>

        <a
          href="#results"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-teal-800 hover:text-teal-950 transition-colors"
        >
          <span>Explore model performance and dataset charts</span>
          <span>&rarr;</span>
        </a>
      </div>

      {/* Academic Disclaimer */}
      <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-600 flex items-start gap-2.5">
        <ShieldAlert className="w-4 h-4 text-slate-500 shrink-0 mt-0.5" />
        <p className="leading-relaxed">
          <strong className="text-slate-800">Academic Disclaimer:</strong> This application is an academic machine-learning demonstration. Its predictions are not a medical diagnosis and should not be used as a substitute for professional medical advice.
        </p>
      </div>
    </div>
  );
};
