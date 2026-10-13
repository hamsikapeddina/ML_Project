import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { SelectedModel } from '../types/heartDisease';
import { useApp } from '../context/AppContext';
import {
  FEATURE_COEFFICIENTS,
} from '../data/edaDataset';
import {
  Award,
  ArrowRight,
} from 'lucide-react';

export const ModelsPage: React.FC = () => {
  const navigate = useNavigate();
  const {
    metrics,
    bestModel,
    selectedModelForPrediction,
    setSelectedModelForPrediction,
  } = useApp();

  // Model currently focused for inspecting Confusion Matrix & Feature Coefficients
  const [inspectedModel, setInspectedModel] = useState<SelectedModel>(
    bestModel?.modelName || 'Ridge Logistic Regression'
  );

  // Placeholder values are retained for layout preview only; verify using the executed notebook.
  const resultsSupplied = true;

  const inspectedData = metrics.find((m) => m.modelName === inspectedModel) || metrics[0];
  const cm = inspectedData?.confusionMatrix;

  // Handle "Use This Model for Prediction"
  const handleUseModelForPrediction = (modelToUse: SelectedModel) => {
    setSelectedModelForPrediction(modelToUse);
    navigate(`/predict?model=${encodeURIComponent(modelToUse)}`);
  };

  return (
    <div className="py-6 sm:py-10 px-4 sm:px-8 max-w-7xl mx-auto space-y-10">
      
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-indigo-50 text-indigo-800 border border-indigo-200 mb-1.5">
            <Award className="w-3.5 h-3.5" />
            Model Evaluation Preview
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Model Comparison &amp; Final Selection
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
            Compare the three model types. The scores and coefficient visualizations currently shown are placeholders, not verified notebook output.
          </p>
        </div>

        {/* Action Controls */}
        <div className="max-w-sm rounded-xl border border-amber-200 bg-amber-50 px-3.5 py-2.5 text-xs leading-relaxed text-amber-900">
          <strong>Verification needed:</strong> displayed scores are placeholders. Replace them with results from your executed Colab notebook before presenting.
        </div>
      </div>

      {/* ========================================================================= */}
      {/* PROMINENT SECTION: FINAL MODEL SELECTION */}
      {/* ========================================================================= */}
      <section className="bg-gradient-to-br from-slate-900 via-slate-850 to-teal-950 text-white p-6 sm:p-8 rounded-3xl shadow-lg border border-slate-800 space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-5">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] uppercase font-mono font-bold tracking-wider px-2 py-0.5 rounded bg-teal-950 text-teal-300 border border-teal-800">
                Evaluation Objective
              </span>
              <span className="text-xs text-slate-400">Provisional criterion: Highest displayed ROC-AUC</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white mt-1">
              Final Model Selection
            </h2>
          </div>

          {resultsSupplied && bestModel && (
            <button
              onClick={() => handleUseModelForPrediction(bestModel.modelName)}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-teal-500 text-slate-950 font-bold text-xs sm:text-sm hover:bg-teal-400 transition-all shadow-md cursor-pointer self-start md:self-auto"
            >
              <span>Use This Model for Prediction</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          )}
        </div>

        {resultsSupplied && bestModel ? (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
            
            {/* Left 7 cols: Selected Model Details & Metrics */}
            <div className="lg:col-span-7 space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-teal-500/20 text-teal-400 flex items-center justify-center border border-teal-500/30">
                  <Award className="w-6 h-6" />
                </div>
                <div>
                  <span className="text-xs font-mono text-teal-300">Provisional Selection (Placeholder Scores)</span>
                  <div className="text-2xl font-extrabold text-white">
                    {bestModel.modelName}
                  </div>
                </div>
              </div>

              {/* Metrics Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-5 gap-2.5 pt-1">
                <div className="bg-slate-800/80 p-3 rounded-xl border border-slate-700/80 text-center">
                  <span className="text-[10px] text-slate-400 block uppercase font-mono">ROC-AUC</span>
                  <strong className="text-base font-bold text-teal-300 font-mono">
                    {bestModel.rocAuc?.toFixed(4)}
                  </strong>
                </div>

                <div className="bg-slate-800/80 p-3 rounded-xl border border-slate-700/80 text-center">
                  <span className="text-[10px] text-slate-400 block uppercase font-mono">Accuracy</span>
                  <strong className="text-base font-bold text-white font-mono">
                    {((bestModel.accuracy || 0) * 100).toFixed(2)}%
                  </strong>
                </div>

                <div className="bg-slate-800/80 p-3 rounded-xl border border-slate-700/80 text-center">
                  <span className="text-[10px] text-slate-400 block uppercase font-mono">Precision</span>
                  <strong className="text-base font-bold text-white font-mono">
                    {((bestModel.precision || 0) * 100).toFixed(2)}%
                  </strong>
                </div>

                <div className="bg-slate-800/80 p-3 rounded-xl border border-slate-700/80 text-center">
                  <span className="text-[10px] text-slate-400 block uppercase font-mono">Recall</span>
                  <strong className="text-base font-bold text-white font-mono">
                    {((bestModel.recall || 0) * 100).toFixed(2)}%
                  </strong>
                </div>

                <div className="bg-slate-800/80 p-3 rounded-xl border border-slate-700/80 text-center">
                  <span className="text-[10px] text-slate-400 block uppercase font-mono">F1 Score</span>
                  <strong className="text-base font-bold text-white font-mono">
                    {((bestModel.f1Score || 0) * 100).toFixed(2)}%
                  </strong>
                </div>
              </div>

              {/* Selection Explanation */}
              <div className="p-4 rounded-xl bg-slate-800/60 border border-slate-700/60 text-xs text-slate-300 leading-relaxed space-y-1">
                <strong className="text-teal-300 block font-semibold">
                  Why {bestModel.modelName} was chosen:
                </strong>
                <p>
                  Using the currently displayed placeholder scores, <strong>{bestModel.modelName}</strong> has the highest ROC-AUC ({bestModel.rocAuc?.toFixed(4)}). This is not a verified final selection. Run the notebook and update the scores before reporting a winner.
                </p>
              </div>
            </div>

            {/* Right 5 cols: Regularization Penalty & Hyperparameters */}
            <div className="lg:col-span-5 bg-slate-800/90 rounded-2xl p-5 border border-slate-700 space-y-3 font-mono text-xs text-slate-300">
              <div className="text-[11px] font-bold text-teal-400 uppercase tracking-wider">
                Model Configuration
              </div>
              <div className="space-y-2 text-[11px]">
                <div className="flex justify-between border-b border-slate-700/80 pb-1.5">
                  <span className="text-slate-400">Regularization Penalty:</span>
                  <span className="text-white font-semibold">{bestModel.regularizationPenalty}</span>
                </div>
                <div className="flex justify-between border-b border-slate-700/80 pb-1.5">
                  <span className="text-slate-400">Hyperparameters:</span>
                  <span className="text-white font-semibold">{bestModel.hyperparameter}</span>
                </div>
                <div className="flex justify-between border-b border-slate-700/80 pb-1.5">
                  <span className="text-slate-400">Scaling Applied:</span>
                  <span className="text-white">StandardScaler (μ=0, σ=1)</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Optimization Solver:</span>
                  <span className="text-white">lbfgs / liblinear</span>
                </div>
              </div>

              <div className="pt-2 text-[10px] text-slate-400 flex items-center gap-1.5 font-sans">
                <Zap className="w-3.5 h-3.5 text-teal-400 shrink-0" />
                <span>The model selected here dynamically drives predictions across the entire application.</span>
              </div>
            </div>

          </div>
        ) : (
          <div className="p-8 text-center space-y-2 bg-slate-800/50 rounded-2xl border border-slate-700">
            <HelpCircle className="w-8 h-8 text-slate-400 mx-auto" />
            <h3 className="text-base font-bold text-white">
              Awaiting Notebook Results
            </h3>
            <p className="text-xs text-slate-400 max-w-md mx-auto">
              Evaluation metrics have not yet been connected from your Scikit-learn test evaluation. Once connected, the model with the highest ROC-AUC will be programmatically declared champion.
            </p>
          </div>
        )}
      </section>

      {/* ========================================================================= */}
      {/* MODEL COMPARISON TABLE */}
      {/* ========================================================================= */}
      <section className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <h2 className="text-lg font-bold text-slate-900">
              Evaluation Metrics Comparison Table
            </h2>
            <p className="text-xs text-slate-500">
              Compare all three models evaluated on the held-out test partition
            </p>
          </div>
          <span className="text-xs text-slate-500 font-mono">
            Click any row to inspect its charts below
          </span>
        </div>

        <div className="overflow-x-auto rounded-2xl border border-slate-200 shadow-2xs bg-white">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-xs font-bold text-slate-700 uppercase tracking-wider">
                <th className="py-3.5 px-4 sm:px-6">Model</th>
                <th className="py-3.5 px-4">Accuracy</th>
                <th className="py-3.5 px-4">Precision</th>
                <th className="py-3.5 px-4">Recall</th>
                <th className="py-3.5 px-4">F1 Score</th>
                <th className="py-3.5 px-4">ROC-AUC</th>
                <th className="py-3.5 px-4">Regularization Type</th>
                <th className="py-3.5 px-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-sm">
              {metrics.map((row) => {
                const isSelectedChampion = bestModel?.modelName === row.modelName;
                const isInspected = inspectedModel === row.modelName;

                return (
                  <tr
                    key={row.modelName}
                    onClick={() => setInspectedModel(row.modelName)}
                    className={`cursor-pointer transition-colors ${
                      isInspected ? 'bg-teal-50/60 font-medium' : 'hover:bg-slate-50'
                    }`}
                  >
                    <td className="py-3.5 px-4 sm:px-6 font-semibold text-slate-900 flex items-center gap-2">
                      {isSelectedChampion && (
                        <span className="w-5 h-5 rounded-full bg-teal-100 text-teal-800 flex items-center justify-center text-[10px] font-bold" title="Highest ROC-AUC Champion">
                          ★
                        </span>
                      )}
                      <span>{row.modelName}</span>
                    </td>
                    <td className="py-3.5 px-4 font-mono text-slate-800">
                      {resultsSupplied && row.accuracy ? `${(row.accuracy * 100).toFixed(2)}%` : 'Awaiting'}
                    </td>
                    <td className="py-3.5 px-4 font-mono text-slate-800">
                      {resultsSupplied && row.precision ? `${(row.precision * 100).toFixed(2)}%` : 'Awaiting'}
                    </td>
                    <td className="py-3.5 px-4 font-mono text-slate-800">
                      {resultsSupplied && row.recall ? `${(row.recall * 100).toFixed(2)}%` : 'Awaiting'}
                    </td>
                    <td className="py-3.5 px-4 font-mono text-slate-800">
                      {resultsSupplied && row.f1Score ? `${(row.f1Score * 100).toFixed(2)}%` : 'Awaiting'}
                    </td>
                    <td className="py-3.5 px-4 font-mono text-teal-800 font-bold">
                      {resultsSupplied && row.rocAuc ? row.rocAuc.toFixed(4) : 'Awaiting'}
                    </td>
                    <td className="py-3.5 px-4 text-xs text-slate-500 font-mono">
                      {row.regularizationPenalty}
                    </td>
                    <td className="py-3.5 px-4 text-right">
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleUseModelForPrediction(row.modelName);
                        }}
                        className="px-3 py-1.5 rounded-lg bg-slate-900 text-white text-xs font-semibold hover:bg-slate-800 transition-colors shadow-2xs cursor-pointer"
                      >
                        Use for Prediction
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* GRAPH 8: MODEL PERFORMANCE COMPARISON BAR CHART */}
      {/* ========================================================================= */}
      <section className="bg-white p-6 sm:p-7 rounded-2xl border border-slate-200 shadow-2xs space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <span className="text-[11px] font-bold text-teal-800 uppercase tracking-wider block">Graph 8</span>
            <h3 className="text-base font-bold text-slate-900">Model Performance Comparison (0.0 to 1.0 Scale)</h3>
            <p className="text-xs text-slate-500">Side-by-side grouped metric comparison on the test set</p>
          </div>

          <div className="flex items-center gap-3 text-xs font-mono">
            <div className="flex items-center gap-1.5"><span className="w-3 h-3 bg-slate-600 rounded-xs inline-block" /> Logistic</div>
            <div className="flex items-center gap-1.5"><span className="w-3 h-3 bg-teal-600 rounded-xs inline-block" /> Ridge (L2)</div>
            <div className="flex items-center gap-1.5"><span className="w-3 h-3 bg-indigo-600 rounded-xs inline-block" /> Lasso (L1)</div>
          </div>
        </div>

        {/* Grouped Bar Visualizer */}
        <div className="space-y-4 pt-1">
          {[
            { label: 'Accuracy', key: 'accuracy' as const },
            { label: 'Precision', key: 'precision' as const },
            { label: 'Recall (Sensitivity)', key: 'recall' as const },
            { label: 'F1 Score', key: 'f1Score' as const },
            { label: 'ROC-AUC', key: 'rocAuc' as const },
          ].map((metric) => (
            <div key={metric.key} className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
              <div className="flex justify-between text-xs font-semibold text-slate-800">
                <span>{metric.label}</span>
                <span className="text-[11px] text-slate-500 font-mono">Scale 0.0–1.0</span>
              </div>

              <div className="grid grid-cols-3 gap-2.5">
                {metrics.map((m, idx) => {
                  const val = m[metric.key] || 0;
                  const color = idx === 0 ? 'bg-slate-600' : idx === 1 ? 'bg-teal-600' : 'bg-indigo-600';
                  return (
                    <div key={m.modelName} className="space-y-1">
                      <div className="h-4 bg-slate-200 rounded-full overflow-hidden">
                        <div
                          className={`h-full ${color} rounded-full transition-all duration-500`}
                          style={{ width: `${val * 100}%` }}
                        />
                      </div>
                      <div className="flex justify-between text-[10px] text-slate-600 font-mono">
                        <span className="truncate">{m.modelName.replace(' Logistic Regression', '')}</span>
                        <span className="font-bold">{(val * 100).toFixed(1)}%</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-600">
          <strong>Explanation:</strong> Because all five evaluation metrics share a common 0.0 to 1.0 (0% to 100%) scale, this comparison reveals whether regularized shrinkage (Ridge) or feature sparsity (Lasso) provides an optimal trade-off between precision and recall over standard unconstrained MLE.
        </div>
      </section>

      {/* ========================================================================= */}
      {/* ROW: GRAPH 9 (CONFUSION MATRIX) & GRAPH 10 (ROC CURVE COMPARISON) */}
      {/* ========================================================================= */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
        
        {/* Graph 9: Confusion Matrix */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-2xs space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <span className="text-[11px] font-bold text-teal-800 uppercase tracking-wider block">Graph 9</span>
              <h3 className="text-base font-bold text-slate-900">Confusion Matrix</h3>
              <p className="text-xs text-slate-500">Actual test-set counts for: <strong>{inspectedModel}</strong></p>
            </div>
            
            <select
              value={inspectedModel}
              onChange={(e) => setInspectedModel(e.target.value as SelectedModel)}
              className="text-xs font-semibold bg-slate-50 border border-slate-300 rounded-lg px-2.5 py-1.5 text-slate-800 cursor-pointer"
            >
              {metrics.map((m) => (
                <option key={m.modelName} value={m.modelName}>
                  {m.modelName}
                </option>
              ))}
            </select>
          </div>

          {/* 2x2 Matrix */}
          <div className="space-y-2 pt-1">
            <div className="text-right text-[11px] font-semibold text-slate-400 font-mono">
              PREDICTED CLASS
            </div>

            <div className="grid grid-cols-2 gap-3 text-xs">
              <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-center space-y-1">
                <span className="text-[10px] uppercase font-mono font-bold text-emerald-800 block">
                  True Negative (TN)
                </span>
                <div className="text-2xl font-extrabold text-emerald-950 font-mono">
                  {cm?.tn}
                </div>
                <p className="text-[11px] text-emerald-900">
                  No disease predicted and actual label was no disease.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-amber-50 border border-amber-200 text-center space-y-1">
                <span className="text-[10px] uppercase font-mono font-bold text-amber-800 block">
                  False Positive (FP)
                </span>
                <div className="text-2xl font-extrabold text-amber-950 font-mono">
                  {cm?.fp}
                </div>
                <p className="text-[11px] text-amber-900">
                  Disease predicted but actual label was no disease.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-rose-50 border border-rose-200 text-center space-y-1">
                <span className="text-[10px] uppercase font-mono font-bold text-rose-800 block">
                  False Negative (FN)
                </span>
                <div className="text-2xl font-extrabold text-rose-950 font-mono">
                  {cm?.fn}
                </div>
                <p className="text-[11px] text-rose-900">
                  No disease predicted but actual label was disease.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-teal-50 border border-teal-200 text-center space-y-1">
                <span className="text-[10px] uppercase font-mono font-bold text-teal-800 block">
                  True Positive (TP)
                </span>
                <div className="text-2xl font-extrabold text-teal-950 font-mono">
                  {cm?.tp}
                </div>
                <p className="text-[11px] text-teal-900">
                  Disease predicted and actual label was disease.
                </p>
              </div>
            </div>
          </div>

          <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-600">
            <strong>Explanation:</strong> In healthcare screening, minimizing False Negatives (FN) is essential so patients with active coronary heart disease are not missed.
          </div>
        </div>

        {/* Graph 10: ROC Curve Comparison */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-2xs space-y-4">
          <div>
            <span className="text-[11px] font-bold text-teal-800 uppercase tracking-wider block">Graph 10</span>
            <h3 className="text-base font-bold text-slate-900">ROC Curve Comparison</h3>
            <p className="text-xs text-slate-500">True Positive Rate vs False Positive Rate for all three models</p>
          </div>

          {/* Vector SVG ROC Curve */}
          <div className="bg-slate-900 rounded-xl p-4 sm:p-5 text-white">
            <div className="h-52 w-full relative flex items-center justify-center">
              <svg className="w-full h-full" viewBox="0 0 300 230">
                <line x1="40" y1="20" x2="280" y2="20" stroke="#334155" strokeDasharray="3 3" />
                <line x1="40" y1="75" x2="280" y2="75" stroke="#334155" strokeDasharray="3 3" />
                <line x1="40" y1="130" x2="280" y2="130" stroke="#334155" strokeDasharray="3 3" />
                <line x1="40" y1="185" x2="280" y2="185" stroke="#475569" strokeWidth="1.5" />
                <line x1="40" y1="20" x2="40" y2="185" stroke="#475569" strokeWidth="1.5" />

                {/* Random baseline line */}
                <line x1="40" y1="185" x2="280" y2="20" stroke="#64748b" strokeWidth="1.5" strokeDasharray="4 4" />
                
                {/* Standard Logistic Regression */}
                <path
                  d="M 40 185 Q 80 80, 160 38 T 280 20"
                  fill="none"
                  stroke="#94a3b8"
                  strokeWidth="2"
                />

                {/* Lasso Regression */}
                <path
                  d="M 40 185 Q 75 68, 150 32 T 280 20"
                  fill="none"
                  stroke="#818cf8"
                  strokeWidth="2"
                />

                {/* Ridge Logistic Regression */}
                <path
                  d="M 40 185 Q 65 48, 140 26 T 280 20"
                  fill="none"
                  stroke="#2dd4bf"
                  strokeWidth="2.5"
                />

                <text x="32" y="24" fill="#94a3b8" fontSize="9" textAnchor="end">1.0</text>
                <text x="32" y="105" fill="#94a3b8" fontSize="9" textAnchor="end">0.5</text>
                <text x="32" y="188" fill="#94a3b8" fontSize="9" textAnchor="end">0.0</text>

                <text x="40" y="202" fill="#94a3b8" fontSize="9" textAnchor="middle">0.0</text>
                <text x="160" y="202" fill="#94a3b8" fontSize="9" textAnchor="middle">0.5</text>
                <text x="280" y="202" fill="#94a3b8" fontSize="9" textAnchor="middle">1.0</text>

                <text x="160" y="218" fill="#cbd5e1" fontSize="10" textAnchor="middle">
                  False Positive Rate (FPR)
                </text>
              </svg>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-3 text-[11px] font-mono pt-2 border-t border-slate-800">
              <span className="flex items-center gap-1.5"><span className="w-2.5 h-0.5 bg-teal-400 inline-block" /> Ridge L2 (0.9183)</span>
              <span className="flex items-center gap-1.5"><span className="w-2.5 h-0.5 bg-indigo-400 inline-block" /> Lasso L1 (0.9086)</span>
              <span className="flex items-center gap-1.5"><span className="w-2.5 h-0.5 bg-slate-400 inline-block" /> Logistic (0.9011)</span>
              <span className="flex items-center gap-1.5"><span className="w-2.5 h-0.5 border-t border-dashed border-slate-500 inline-block" /> Chance (0.50)</span>
            </div>
          </div>

          <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-600">
            <strong>Explanation:</strong> ROC-AUC measures discriminatory separation across all thresholds. A higher curve toward the top-left indicates superior classification capability.
          </div>
        </div>

      </div>

      {/* ========================================================================= */}
      {/* GRAPH 11: FEATURE COEFFICIENT CHART FOR THE SELECTED MODEL */}
      {/* ========================================================================= */}
      <section className="bg-white p-6 sm:p-7 rounded-2xl border border-slate-200 shadow-2xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <span className="text-[11px] font-bold text-teal-800 uppercase tracking-wider block">Graph 11</span>
            <h3 className="text-base font-bold text-slate-900">Feature Coefficients for {inspectedModel}</h3>
            <p className="text-xs text-slate-500">Horizontal diverging bar chart of learned weights sorted by magnitude</p>
          </div>
          <div className="flex items-center gap-3 text-xs">
            <span className="flex items-center gap-1.5"><span className="w-3 h-3 bg-teal-600 rounded-xs inline-block" /> Positive Weight (Increases Risk)</span>
            <span className="flex items-center gap-1.5"><span className="w-3 h-3 bg-indigo-600 rounded-xs inline-block" /> Negative Weight (Lowers Risk)</span>
          </div>
        </div>

        <div className="space-y-2 pt-2">
          {FEATURE_COEFFICIENTS.map((feat) => {
            const coeff =
              inspectedModel === 'Logistic Regression'
                ? feat.logisticCoeff
                : inspectedModel === 'Ridge Logistic Regression'
                ? feat.ridgeCoeff
                : feat.lassoCoeff;

            const isPositive = coeff > 0;
            const isZero = Math.abs(coeff) === 0;
            const barWidth = Math.min(100, (Math.abs(coeff) / 0.85) * 50);

            return (
              <div key={feat.feature} className="grid grid-cols-12 items-center text-xs py-1">
                <div className="col-span-4 sm:col-span-3 text-slate-700 font-medium truncate pr-2" title={feat.label}>
                  {feat.label}
                </div>

                <div className="col-span-6 sm:col-span-7 relative h-5 bg-slate-100 rounded-md overflow-hidden flex items-center">
                  <div className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-slate-300 z-10" />

                  {!isPositive && !isZero && (
                    <div
                      className="absolute top-1 bottom-1 bg-indigo-600 rounded-l transition-all"
                      style={{
                        right: '50%',
                        width: `${barWidth}%`,
                      }}
                    />
                  )}

                  {isPositive && !isZero && (
                    <div
                      className="absolute top-1 bottom-1 bg-teal-600 rounded-r transition-all"
                      style={{
                        left: '50%',
                        width: `${barWidth}%`,
                      }}
                    />
                  )}

                  {isZero && (
                    <span className="absolute left-1/2 -translate-x-1/2 text-[10px] text-slate-400 font-mono">
                      0.00 (Zeroed by L1)
                    </span>
                  )}
                </div>

                <div className="col-span-2 text-right font-mono text-xs font-semibold text-slate-800">
                  {coeff >= 0 ? `+${coeff.toFixed(2)}` : coeff.toFixed(2)}
                </div>
              </div>
            );
          })}
        </div>

        <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-600 leading-relaxed">
          <strong>Illustrative feature-coefficient explanation (values are placeholders until verified):</strong> Positive weights (e.g. Major Vessels, Thalassemia, ST Depression) increase the model&apos;s predicted risk of heart disease, whereas negative weights (e.g. Maximum Heart Rate achieved) decrease the risk score. Lasso (L1) creates sparsity by reducing redundant features like Fasting Blood Sugar and Cholesterol to exactly 0.00.
        </div>
      </section>


    </div>
  );
};
