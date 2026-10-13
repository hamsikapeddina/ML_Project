import React, { useState } from 'react';
import { SelectedModel } from '../types/heartDisease';
import { INITIAL_MODEL_METRICS } from '../data/modelMetrics';
import { Layers, Activity, HelpCircle, CheckCircle2, TrendingUp, AlertCircle } from 'lucide-react';

export const ConfusionMatrixAndRoc: React.FC = () => {
  const [selectedModel, setSelectedModel] = useState<SelectedModel>('Ridge Logistic Regression');
  const [dataConnected, setDataConnected] = useState<boolean>(true);

  const modelData = INITIAL_MODEL_METRICS.find((m) => m.modelName === selectedModel) || INITIAL_MODEL_METRICS[1];
  const cm = modelData.confusionMatrix;

  const totalPatients = cm ? cm.tp + cm.fp + cm.fn + cm.tn : 0;
  const sensitivity = cm && (cm.tp + cm.fn > 0) ? ((cm.tp / (cm.tp + cm.fn)) * 100).toFixed(1) : '0';
  const specificity = cm && (cm.tn + cm.fp > 0) ? ((cm.tn / (cm.tn + cm.fp)) * 100).toFixed(1) : '0';

  return (
    <section className="py-12 md:py-16 bg-slate-50 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-indigo-50 text-indigo-800 border border-indigo-200 mb-2">
              <Layers className="w-3.5 h-3.5" />
              Advanced Diagnostic Evaluation
            </div>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Confusion Matrix & ROC-AUC Analysis
            </h3>
            <p className="text-slate-600 text-sm max-w-2xl mt-1">
              In-depth visualization of classification thresholds, false alarms, and diagnostic sensitivity on test patients.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setDataConnected(!dataConnected)}
              className="text-xs font-semibold px-3 py-1.5 rounded-lg border border-slate-300 bg-white text-slate-700 hover:bg-slate-50 cursor-pointer"
            >
              Toggle Connected State: {dataConnected ? 'Connected' : 'Placeholder View'}
            </button>
          </div>
        </div>

        {!dataConnected ? (
          <div className="p-12 rounded-2xl bg-white border border-dashed border-slate-300 text-center space-y-3">
            <AlertCircle className="w-10 h-10 text-amber-500 mx-auto" />
            <h4 className="text-base font-bold text-slate-800">
              Evaluation Data Has Not Yet Been Connected
            </h4>
            <p className="text-xs text-slate-500 max-w-md mx-auto leading-relaxed">
              Detailed confusion matrices and ROC coordinate arrays have not been received from the backend evaluation pipeline. Once you run your Colab test routine, metrics will populate automatically.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            
            {/* Left 6 cols: Confusion Matrix Heatmap */}
            <div className="lg:col-span-6 bg-white p-6 sm:p-7 rounded-2xl border border-slate-200 shadow-2xs space-y-5">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-base font-bold text-slate-900">Confusion Matrix</h4>
                  <p className="text-xs text-slate-500">Test set counts (N = {totalPatients} patients)</p>
                </div>

                <select
                  value={selectedModel}
                  onChange={(e) => setSelectedModel(e.target.value as SelectedModel)}
                  className="text-xs font-semibold bg-slate-50 border border-slate-300 rounded-lg px-2.5 py-1.5 text-slate-800 cursor-pointer"
                >
                  <option value="Logistic Regression">Logistic Regression</option>
                  <option value="Ridge Logistic Regression">Ridge Logistic Regression</option>
                  <option value="Lasso Logistic Regression">Lasso Logistic Regression</option>
                </select>
              </div>

              {/* 2x2 Heatmap Matrix Grid */}
              <div className="space-y-2">
                <div className="flex justify-end text-[11px] font-semibold text-slate-400 font-mono pr-2">
                  <span>PREDICTED CLASS</span>
                </div>

                <div className="grid grid-cols-12 gap-2 text-xs">
                  {/* Y-axis label */}
                  <div className="col-span-2 flex items-center justify-center">
                    <span className="text-[11px] font-semibold text-slate-400 font-mono -rotate-90">
                      ACTUAL
                    </span>
                  </div>

                  <div className="col-span-10 grid grid-cols-2 gap-3">
                    <div className="text-center text-[11px] font-semibold text-slate-500">
                      Predicted No Disease (0)
                    </div>
                    <div className="text-center text-[11px] font-semibold text-slate-500">
                      Predicted Disease (1)
                    </div>

                    {/* Actual No Disease Row */}
                    <div className="p-4 rounded-xl bg-emerald-50/80 border border-emerald-200 text-center space-y-1">
                      <span className="text-[10px] text-emerald-800 uppercase font-mono font-semibold block">
                        True Negative (TN)
                      </span>
                      <div className="text-2xl font-extrabold text-emerald-950 font-mono">
                        {cm?.tn}
                      </div>
                      <span className="text-[10px] text-slate-500 block">Correct Non-Disease</span>
                    </div>

                    <div className="p-4 rounded-xl bg-amber-50/80 border border-amber-200 text-center space-y-1">
                      <span className="text-[10px] text-amber-800 uppercase font-mono font-semibold block">
                        False Positive (FP)
                      </span>
                      <div className="text-2xl font-extrabold text-amber-950 font-mono">
                        {cm?.fp}
                      </div>
                      <span className="text-[10px] text-slate-500 block">Type I Error (False Alarm)</span>
                    </div>

                    {/* Actual Disease Row */}
                    <div className="p-4 rounded-xl bg-rose-50/80 border border-rose-200 text-center space-y-1">
                      <span className="text-[10px] text-rose-800 uppercase font-mono font-semibold block">
                        False Negative (FN)
                      </span>
                      <div className="text-2xl font-extrabold text-rose-950 font-mono">
                        {cm?.fn}
                      </div>
                      <span className="text-[10px] text-slate-500 block">Type II Error (Missed CAD)</span>
                    </div>

                    <div className="p-4 rounded-xl bg-teal-50/80 border border-teal-200 text-center space-y-1">
                      <span className="text-[10px] text-teal-800 uppercase font-mono font-semibold block">
                        True Positive (TP)
                      </span>
                      <div className="text-2xl font-extrabold text-teal-950 font-mono">
                        {cm?.tp}
                      </div>
                      <span className="text-[10px] text-slate-500 block">Correct Disease Detected</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Clinical Derived Rates */}
              <div className="grid grid-cols-2 gap-3 pt-2 text-xs">
                <div className="bg-slate-50 p-3 rounded-xl border border-slate-200">
                  <span className="text-slate-500 text-[11px] block">Sensitivity (Recall):</span>
                  <span className="font-bold text-slate-800 text-sm font-mono">{sensitivity}%</span>
                  <span className="text-[10px] text-slate-400 block mt-0.5">Ratio of actual cases correctly caught</span>
                </div>
                <div className="bg-slate-50 p-3 rounded-xl border border-slate-200">
                  <span className="text-slate-500 text-[11px] block">Specificity:</span>
                  <span className="font-bold text-slate-800 text-sm font-mono">{specificity}%</span>
                  <span className="text-[10px] text-slate-400 block mt-0.5">Ratio of healthy patients correctly flagged</span>
                </div>
              </div>

              <p className="text-xs text-slate-500 leading-relaxed border-t border-slate-100 pt-3">
                <strong>Interpretation:</strong> In cardiology screening, minimizing <em>False Negatives (Type II errors)</em> is critical so patients with active coronary heart disease are not incorrectly classified as healthy.
              </p>
            </div>

            {/* Right 6 cols: ROC Curve Comparison Chart */}
            <div className="lg:col-span-6 bg-white p-6 sm:p-7 rounded-2xl border border-slate-200 shadow-2xs space-y-5">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-base font-bold text-slate-900">ROC Curve Comparison</h4>
                  <p className="text-xs text-slate-500">True Positive Rate vs False Positive Rate</p>
                </div>
                <div className="text-right">
                  <span className="text-xs font-mono font-bold text-teal-800 bg-teal-50 px-2 py-0.5 rounded border border-teal-200">
                    Ridge AUC: {INITIAL_MODEL_METRICS[1].rocAuc?.toFixed(4)}
                  </span>
                </div>
              </div>

              {/* Vector SVG ROC Curve */}
              <div className="bg-slate-900 rounded-xl p-4 sm:p-6 text-white relative">
                <div className="h-56 sm:h-64 w-full relative flex items-center justify-center">
                  <svg className="w-full h-full" viewBox="0 0 300 240">
                    {/* Grid lines */}
                    <line x1="40" y1="20" x2="280" y2="20" stroke="#334155" strokeDasharray="3 3" />
                    <line x1="40" y1="80" x2="280" y2="80" stroke="#334155" strokeDasharray="3 3" />
                    <line x1="40" y1="140" x2="280" y2="140" stroke="#334155" strokeDasharray="3 3" />
                    <line x1="40" y1="200" x2="280" y2="200" stroke="#475569" strokeWidth="1.5" />
                    <line x1="40" y1="20" x2="40" y2="200" stroke="#475569" strokeWidth="1.5" />

                    {/* Random chance line (AUC = 0.50) */}
                    <line x1="40" y1="200" x2="280" y2="20" stroke="#64748b" strokeWidth="1.5" strokeDasharray="4 4" />
                    
                    {/* Standard Logistic Regression Curve */}
                    <path
                      d="M 40 200 Q 80 80, 160 40 T 280 20"
                      fill="none"
                      stroke="#94a3b8"
                      strokeWidth="2"
                    />

                    {/* Lasso Regression Curve */}
                    <path
                      d="M 40 200 Q 75 70, 150 36 T 280 20"
                      fill="none"
                      stroke="#818cf8"
                      strokeWidth="2.5"
                    />

                    {/* Ridge Logistic Regression Curve (Best) */}
                    <path
                      d="M 40 200 Q 65 50, 140 30 T 280 20"
                      fill="none"
                      stroke="#2dd4bf"
                      strokeWidth="3"
                    />

                    {/* Axis Labels */}
                    <text x="30" y="25" fill="#94a3b8" fontSize="9" textAnchor="end">1.0</text>
                    <text x="30" y="85" fill="#94a3b8" fontSize="9" textAnchor="end">0.75</text>
                    <text x="30" y="145" fill="#94a3b8" fontSize="9" textAnchor="end">0.50</text>
                    <text x="30" y="200" fill="#94a3b8" fontSize="9" textAnchor="end">0.0</text>

                    <text x="40" y="215" fill="#94a3b8" fontSize="9" textAnchor="middle">0.0</text>
                    <text x="160" y="215" fill="#94a3b8" fontSize="9" textAnchor="middle">0.50</text>
                    <text x="280" y="215" fill="#94a3b8" fontSize="9" textAnchor="middle">1.0</text>

                    {/* Axis Titles */}
                    <text x="160" y="232" fill="#cbd5e1" fontSize="10" textAnchor="middle" fontWeight="bold">
                      False Positive Rate (1 - Specificity)
                    </text>
                  </svg>
                </div>

                {/* Legend */}
                <div className="flex flex-wrap items-center justify-center gap-4 text-xs font-mono mt-2 pt-2 border-t border-slate-800">
                  <div className="flex items-center gap-1.5">
                    <span className="w-3 h-0.5 bg-teal-400 inline-block" />
                    <span className="text-teal-300">Ridge L2 (0.918)</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="w-3 h-0.5 bg-indigo-400 inline-block" />
                    <span className="text-indigo-300">Lasso L1 (0.909)</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="w-3 h-0.5 bg-slate-400 inline-block" />
                    <span className="text-slate-400">Standard MLE (0.901)</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="w-3 h-0.5 border-t border-dashed border-slate-500 inline-block" />
                    <span className="text-slate-500">Chance (0.50)</span>
                  </div>
                </div>
              </div>

              <p className="text-xs text-slate-500 leading-relaxed border-t border-slate-100 pt-3">
                <strong>What ROC-AUC represents:</strong> The Receiver Operating Characteristic curve illustrates the diagnostic ability of binary classifiers as their discrimination threshold varies from 0.0 to 1.0. A higher AUC (closer to 1.0) confirms superior separation between positive and negative cardiac cases.
              </p>
            </div>

          </div>
        )}

      </div>
    </section>
  );
};
