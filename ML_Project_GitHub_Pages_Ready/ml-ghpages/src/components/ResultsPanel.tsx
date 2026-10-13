import React, { useState } from 'react';
import { PredictionResponse } from '../types/heartDisease';
import {
  Activity,
  AlertCircle,
  CheckCircle2,
  AlertTriangle,
  RefreshCw,
  Info,
  ChevronDown,
  ChevronUp,
  Server,
  Sparkles
} from 'lucide-react';

export type PanelState = 'idle' | 'loading' | 'success' | 'error';

interface ResultsPanelProps {
  state: PanelState;
  result: PredictionResponse | null;
  errorMessage: string | null;
  selectedModel: string;
  demoMode: boolean;
  onTryAnother: () => void;
  onRetry: () => void;
  onOpenBackendGuide: () => void;
}

export const ResultsPanel: React.FC<ResultsPanelProps> = ({
  state,
  result,
  errorMessage,
  selectedModel,
  demoMode,
  onTryAnother,
  onRetry,
  onOpenBackendGuide,
}) => {
  const [showHowItWorks, setShowHowItWorks] = useState(false);

  const isHeartDisease = result?.prediction === 1;
  const probabilityPercent =
    result?.probability !== undefined
      ? (result.probability * 100).toFixed(1)
      : null;

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 space-y-5 transition-all">
      
      {/* Panel Top Header */}
      <div className="flex items-center justify-between pb-4 border-b border-slate-200">
        <div>
          <h3 className="text-base font-bold text-slate-900 tracking-tight">
            Prediction Result
          </h3>
          <p className="text-xs text-slate-500 mt-0.5">
            Model: <span className="font-semibold text-slate-700">{selectedModel}</span>
          </p>
        </div>
        {demoMode && (
          <span className="px-2 py-0.5 rounded text-[11px] font-semibold bg-amber-50 text-amber-800 border border-amber-200">
            Demo Mode
          </span>
        )}
      </div>

      {/* STATE 1: IDLE (Before prediction) */}
      {state === 'idle' && (
        <div className="py-8 text-center space-y-4">
          <div className="w-14 h-14 rounded-2xl bg-slate-50 border border-slate-200 flex items-center justify-center text-slate-400 mx-auto">
            <Activity className="w-7 h-7" />
          </div>
          <div className="space-y-1.5 max-w-xs mx-auto">
            <h4 className="text-base font-bold text-slate-800">
              Your prediction will appear here.
            </h4>
            <p className="text-xs text-slate-500 leading-relaxed">
              Enter patient details on the left and select Predict to view the result.
            </p>
          </div>
          <div className="pt-2 text-[11px] text-slate-400 font-mono">
            Awaiting 13 clinical attributes
          </div>
        </div>
      )}

      {/* STATE 2: LOADING (While predicting) */}
      {state === 'loading' && (
        <div className="py-12 text-center space-y-4">
          <div className="w-12 h-12 rounded-full border-3 border-teal-200 border-t-teal-700 animate-spin mx-auto" />
          <div className="space-y-1">
            <h4 className="text-base font-bold text-slate-900">
              Analyzing patient data…
            </h4>
            <p className="text-xs text-slate-500">
              Evaluating attributes through {selectedModel}…
            </p>
          </div>
        </div>
      )}

      {/* STATE 3: ERROR (If prediction fails) */}
      {state === 'error' && (
        <div className="py-4 space-y-4">
          <div className="p-4 rounded-xl bg-amber-50 border border-amber-200 text-amber-900 space-y-2.5">
            <div className="flex items-start gap-2.5">
              <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
              <div>
                <h4 className="font-semibold text-xs text-amber-950">
                  Prediction Unavailable
                </h4>
                <p className="text-xs text-amber-800 mt-1 leading-relaxed">
                  {errorMessage || 'Prediction service is not connected yet. Please connect the trained ML model to enable real predictions.'}
                </p>
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <button
              onClick={onRetry}
              className="w-full py-2.5 px-3 rounded-xl bg-slate-900 text-white text-xs font-semibold hover:bg-slate-800 transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Retry Prediction</span>
            </button>



            <button
              onClick={onOpenBackendGuide}
              className="w-full py-2 px-3 rounded-xl bg-slate-50 text-slate-700 text-xs font-medium hover:bg-slate-100 transition-colors cursor-pointer border border-slate-200 flex items-center justify-center gap-1.5"
            >
              <Server className="w-3.5 h-3.5 text-slate-500" />
              <span>View Python Backend Setup</span>
            </button>
          </div>
        </div>
      )}

      {/* STATE 4: SUCCESS (After a successful prediction) */}
      {state === 'success' && result && (
        <div className="space-y-5 animate-fadeIn">
          
          {/* Prominent Result Card */}
          <div
            className={`p-5 rounded-2xl border transition-all ${
              isHeartDisease
                ? 'bg-rose-50/70 border-rose-200'
                : 'bg-emerald-50/70 border-emerald-200'
            }`}
          >
            <div className="flex items-start gap-3.5">
              <div
                className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${
                  isHeartDisease
                    ? 'bg-rose-100 text-rose-700 border border-rose-300'
                    : 'bg-emerald-100 text-emerald-700 border border-emerald-300'
                }`}
              >
                {isHeartDisease ? (
                  <AlertCircle className="w-5 h-5" />
                ) : (
                  <CheckCircle2 className="w-5 h-5" />
                )}
              </div>

              <div className="space-y-1 flex-1 min-w-0">
                <span className="text-[10px] uppercase font-mono font-bold text-slate-500 tracking-wider block">
                  Predicted Class
                </span>
                <div
                  className={`text-xl sm:text-2xl font-extrabold tracking-tight ${
                    isHeartDisease ? 'text-rose-950' : 'text-emerald-950'
                  }`}
                >
                  {isHeartDisease ? 'Heart Disease' : 'No Heart Disease'}
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">
                  {isHeartDisease
                    ? 'Attributes evaluated above the model decision threshold.'
                    : 'Attributes evaluated below the model decision threshold.'}
                </p>
              </div>
            </div>

            {/* Probability Gauge (when available) */}
            {probabilityPercent !== null && (
              <div className="mt-4 pt-3 border-t border-slate-200/60 space-y-1.5">
                <div className="flex justify-between items-center text-xs">
                  <span className="font-semibold text-slate-600">Predicted Probability</span>
                  <span className="font-mono font-bold text-slate-900">{probabilityPercent}%</span>
                </div>
                <div className="w-full bg-white h-2.5 rounded-full overflow-hidden border border-slate-200">
                  <div
                    className={`h-full rounded-full transition-all duration-500 ${
                      isHeartDisease ? 'bg-rose-500' : 'bg-emerald-500'
                    }`}
                    style={{ width: `${Math.min(100, Number(probabilityPercent))}%` }}
                  />
                </div>
                <span className="text-[10px] text-slate-400 block text-right font-mono">
                  P(y=1) score
                </span>
              </div>
            )}
          </div>

          {/* Model info footer */}
          <div className="text-[11px] text-slate-500 space-y-0.5">
            <div className="flex justify-between">
              <span>Model used:</span>
              <span className="font-semibold text-slate-700">{result.model_name}</span>
            </div>
            {result.timestamp && (
              <div className="flex justify-between">
                <span>Evaluated at:</span>
                <span className="font-mono text-slate-600">{result.timestamp}</span>
              </div>
            )}
          </div>

          {/* Expandable "How does the prediction work?" */}
          <div className="border border-slate-200 rounded-xl overflow-hidden bg-slate-50/70">
            <button
              type="button"
              onClick={() => setShowHowItWorks(!showHowItWorks)}
              className="w-full px-3.5 py-2.5 text-left text-xs font-semibold text-slate-700 flex items-center justify-between hover:bg-slate-100 transition-colors cursor-pointer"
            >
              <span className="flex items-center gap-1.5">
                <Info className="w-3.5 h-3.5 text-teal-700" />
                How does the prediction work?
              </span>
              {showHowItWorks ? <ChevronUp className="w-3.5 h-3.5 text-slate-500" /> : <ChevronDown className="w-3.5 h-3.5 text-slate-500" />}
            </button>

            {showHowItWorks && (
              <div className="p-3.5 border-t border-slate-200 bg-white text-xs text-slate-600 space-y-2 leading-relaxed">
                <p>
                  The system standardizes the 13 clinical attributes and computes a weighted linear score using the trained model&apos;s learned weights:
                </p>
                <div className="bg-slate-50 p-2 rounded-lg border border-slate-200 font-mono text-[10px] text-slate-800 text-center">
                  z = w₁·Age + w₂·Sex + ... + w₁₃·Thal + b
                </div>
                <p>
                  The score is passed through the sigmoid function σ(z) = 1 / (1 + e<sup>-z</sup>). If the probability is 50% or greater, the model predicts <strong>Heart Disease</strong>.
                </p>
              </div>
            )}
          </div>

          {/* Try Another Patient Button */}
          <button
            type="button"
            onClick={onTryAnother}
            className="w-full py-2.5 px-4 rounded-xl bg-slate-900 text-white text-xs font-semibold hover:bg-slate-800 transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-2xs"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>Try Another Patient</span>
          </button>

        </div>
      )}

      {/* Short Academic Disclaimer */}
      <div className="pt-3 border-t border-slate-100 text-[11px] text-slate-400 leading-relaxed flex items-start gap-2">
        <span className="font-semibold text-slate-600 shrink-0">Note:</span>
        <span>
          Academic demonstration only. Predictions are not a medical diagnosis and should not replace professional medical advice.
        </span>
      </div>

    </div>
  );
};
