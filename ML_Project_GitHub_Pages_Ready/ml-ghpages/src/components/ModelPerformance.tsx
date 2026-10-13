import React, { useState } from 'react';
import { ModelMetricData, SelectedModel } from '../types/heartDisease';
import { INITIAL_MODEL_METRICS } from '../data/modelMetrics';
import {
  BarChart3,
  TrendingUp,
  Award,
  CheckCircle2,
  Edit3,
  RefreshCw,
  HelpCircle,
  FileCode,
  ShieldCheck,
  Zap,
  Sliders
} from 'lucide-react';

interface ModelPerformanceProps {
  // Can be extended with props if needed
}

export const ModelPerformance: React.FC<ModelPerformanceProps> = () => {
  // Store metrics in state so the user can inspect, toggle, or customize with their own Colab results
  const [metrics, setMetrics] = useState<ModelMetricData[]>(INITIAL_MODEL_METRICS);
  const [hasResultsSupplied, setHasResultsSupplied] = useState<boolean>(true);
  const [activeModelTab, setActiveModelTab] = useState<SelectedModel>('Ridge Logistic Regression');
  const [showEditModal, setShowEditModal] = useState<boolean>(false);

  // Editable temporary values
  const [editValues, setEditValues] = useState<ModelMetricData[]>(INITIAL_MODEL_METRICS);

  const selectedModelData = metrics.find((m) => m.modelName === activeModelTab) || metrics[0];

  const formatMetric = (val: number | null | undefined): string => {
    if (!hasResultsSupplied || val === null || val === undefined) {
      return 'Awaiting notebook results';
    }
    return `${(val * 100).toFixed(2)}%`;
  };

  const formatRawMetric = (val: number | null | undefined): string => {
    if (!hasResultsSupplied || val === null || val === undefined) {
      return 'N/A';
    }
    return val.toFixed(4);
  };

  const handleSaveMetrics = () => {
    setMetrics([...editValues]);
    setHasResultsSupplied(true);
    setShowEditModal(false);
  };

  return (
    <section id="performance" className="py-12 md:py-20 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-teal-50 text-teal-800 border border-teal-200">
              <Award className="w-3.5 h-3.5" />
              Empirical Validation & Test Evaluation
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 tracking-tight">
              Model Performance Dashboard
            </h2>
            <p className="text-slate-600 text-sm sm:text-base max-w-3xl">
              Quantitative comparison of Logistic Regression, Ridge (L2), and Lasso (L1) regularization evaluated on the held-out test dataset (UCI Cleveland Heart Disease, 80/20 split).
            </p>
          </div>

          {/* Controls: Notebook status toggle & Edit button */}
          <div className="flex flex-wrap items-center gap-2.5">
            <button
              onClick={() => setHasResultsSupplied(!hasResultsSupplied)}
              className="px-3.5 py-2 rounded-xl border border-slate-200 bg-slate-50 text-slate-700 text-xs font-medium hover:bg-slate-100 transition-colors cursor-pointer flex items-center gap-1.5"
              title="Toggle between supplied results and awaiting results view"
            >
              <Sliders className="w-3.5 h-3.5 text-slate-500" />
              <span>Status: {hasResultsSupplied ? 'Results Supplied' : 'Awaiting Notebook'}</span>
            </button>

            <button
              onClick={() => {
                setEditValues([...metrics]);
                setShowEditModal(true);
              }}
              className="px-3.5 py-2 rounded-xl bg-slate-900 text-white text-xs font-medium hover:bg-slate-800 transition-colors cursor-pointer flex items-center gap-1.5 shadow-2xs"
            >
              <Edit3 className="w-3.5 h-3.5 text-teal-400" />
              <span>Update Notebook Results</span>
            </button>
          </div>
        </div>

        {/* Selected Model Focus Tabs */}
        <div className="flex items-center justify-between border-b border-slate-200 pb-3">
          <div className="flex items-center gap-2 overflow-x-auto">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider mr-2 hidden sm:inline">
              Selected Model Focus:
            </span>
            {metrics.map((m) => (
              <button
                key={m.modelName}
                onClick={() => setActiveModelTab(m.modelName)}
                className={`px-3.5 py-1.5 rounded-lg text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                  activeModelTab === m.modelName
                    ? 'bg-teal-700 text-white shadow-xs'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {m.modelName}
              </button>
            ))}
          </div>
          <span className="text-xs text-slate-500 hidden lg:inline">
            Penalty: <strong className="text-slate-800">{selectedModelData.regularizationPenalty}</strong>
          </span>
        </div>

        {/* Five Key Metric Cards */}
        <div>
          <div className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-3">
            Key Metrics for {activeModelTab}
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4">
            
            {/* 1. Accuracy */}
            <div className="bg-slate-50 rounded-2xl p-4 sm:p-5 border border-slate-200/90 hover:border-slate-300 transition-all">
              <span className="text-xs font-medium text-slate-500 block">Accuracy</span>
              <div className="text-xl sm:text-2xl font-extrabold text-slate-900 mt-1 font-mono">
                {formatMetric(selectedModelData.accuracy)}
              </div>
              <span className="text-[11px] text-slate-400 mt-2 block">
                (TP + TN) / Total
              </span>
            </div>

            {/* 2. Precision */}
            <div className="bg-slate-50 rounded-2xl p-4 sm:p-5 border border-slate-200/90 hover:border-slate-300 transition-all">
              <span className="text-xs font-medium text-slate-500 block">Precision</span>
              <div className="text-xl sm:text-2xl font-extrabold text-slate-900 mt-1 font-mono">
                {formatMetric(selectedModelData.precision)}
              </div>
              <span className="text-[11px] text-slate-400 mt-2 block">
                TP / (TP + FP)
              </span>
            </div>

            {/* 3. Recall */}
            <div className="bg-slate-50 rounded-2xl p-4 sm:p-5 border border-slate-200/90 hover:border-slate-300 transition-all">
              <span className="text-xs font-medium text-slate-500 block">Recall (Sensitivity)</span>
              <div className="text-xl sm:text-2xl font-extrabold text-slate-900 mt-1 font-mono">
                {formatMetric(selectedModelData.recall)}
              </div>
              <span className="text-[11px] text-slate-400 mt-2 block">
                TP / (TP + FN)
              </span>
            </div>

            {/* 4. F1 Score */}
            <div className="bg-slate-50 rounded-2xl p-4 sm:p-5 border border-slate-200/90 hover:border-slate-300 transition-all">
              <span className="text-xs font-medium text-slate-500 block">F1 Score</span>
              <div className="text-xl sm:text-2xl font-extrabold text-slate-900 mt-1 font-mono">
                {formatMetric(selectedModelData.f1Score)}
              </div>
              <span className="text-[11px] text-slate-400 mt-2 block">
                2 × (Prec × Rec) / (Prec + Rec)
              </span>
            </div>

            {/* 5. ROC-AUC */}
            <div className="col-span-2 sm:col-span-1 bg-slate-50 rounded-2xl p-4 sm:p-5 border border-slate-200/90 hover:border-slate-300 transition-all">
              <span className="text-xs font-medium text-slate-500 block">ROC-AUC</span>
              <div className="text-xl sm:text-2xl font-extrabold text-teal-800 mt-1 font-mono">
                {hasResultsSupplied && selectedModelData.rocAuc !== null
                  ? selectedModelData.rocAuc.toFixed(4)
                  : 'Awaiting notebook results'}
              </div>
              <span className="text-[11px] text-slate-400 mt-2 block">
                Area under ROC curve
              </span>
            </div>

          </div>
        </div>

        {/* Model Comparison Table */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-bold text-slate-900">
              Comparative Evaluation Across Regularization Strategies
            </h3>
            <span className="text-xs text-slate-500">
              Configurable via <code className="text-slate-800 font-mono bg-slate-100 px-1.5 py-0.5 rounded">modelMetrics.ts</code>
            </span>
          </div>

          <div className="overflow-x-auto rounded-2xl border border-slate-200 shadow-2xs">
            <table className="w-full text-left border-collapse bg-white">
              <thead>
                <tr className="bg-slate-50/90 border-b border-slate-200 text-xs font-bold text-slate-700 uppercase tracking-wider">
                  <th className="py-3.5 px-4 sm:px-6">Model</th>
                  <th className="py-3.5 px-4">Accuracy</th>
                  <th className="py-3.5 px-4">Precision</th>
                  <th className="py-3.5 px-4">Recall</th>
                  <th className="py-3.5 px-4">F1 Score</th>
                  <th className="py-3.5 px-4">ROC-AUC</th>
                  <th className="py-3.5 px-4 sm:px-6">Penalty Formulation</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-sm">
                {metrics.map((row) => {
                  const isCurrent = row.modelName === activeModelTab;
                  return (
                    <tr
                      key={row.modelName}
                      className={`transition-colors ${
                        isCurrent ? 'bg-teal-50/40 font-medium' : 'hover:bg-slate-50/60'
                      }`}
                    >
                      <td className="py-3.5 px-4 sm:px-6 font-semibold text-slate-900 flex items-center gap-2">
                        {isCurrent && <CheckCircle2 className="w-4 h-4 text-teal-700" />}
                        <span>{row.modelName}</span>
                      </td>
                      <td className="py-3.5 px-4 font-mono text-slate-800">
                        {formatMetric(row.accuracy)}
                      </td>
                      <td className="py-3.5 px-4 font-mono text-slate-800">
                        {formatMetric(row.precision)}
                      </td>
                      <td className="py-3.5 px-4 font-mono text-slate-800">
                        {formatMetric(row.recall)}
                      </td>
                      <td className="py-3.5 px-4 font-mono text-slate-800">
                        {formatMetric(row.f1Score)}
                      </td>
                      <td className="py-3.5 px-4 font-mono text-teal-800 font-semibold">
                        {formatRawMetric(row.rocAuc)}
                      </td>
                      <td className="py-3.5 px-4 sm:px-6 text-xs text-slate-500">
                        <span className="font-mono bg-slate-100 px-2 py-0.5 rounded text-slate-700">
                          {row.regularizationPenalty}
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* Visual Charts: Comparison Bar Chart */}
        {hasResultsSupplied ? (
          <div className="bg-slate-50/70 rounded-2xl border border-slate-200 p-6 sm:p-8 space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div>
                <h4 className="text-base font-bold text-slate-900">
                  Performance Metrics Visual Comparison
                </h4>
                <p className="text-xs text-slate-500">
                  Side-by-side metric comparison on the test set for all 3 models.
                </p>
              </div>
              <div className="flex items-center gap-3 text-xs font-mono">
                <div className="flex items-center gap-1.5">
                  <span className="w-3 h-3 rounded bg-slate-600 inline-block" />
                  <span className="text-slate-600">Standard</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="w-3 h-3 rounded bg-teal-600 inline-block" />
                  <span className="text-slate-700 font-bold">Ridge (L2)</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="w-3 h-3 rounded bg-indigo-600 inline-block" />
                  <span className="text-slate-600">Lasso (L1)</span>
                </div>
              </div>
            </div>

            {/* Custom Responsive SVG-Styled Bar Chart */}
            <div className="space-y-4 pt-2">
              {[
                { label: 'Accuracy', key: 'accuracy' as const },
                { label: 'Precision', key: 'precision' as const },
                { label: 'Recall (Sensitivity)', key: 'recall' as const },
                { label: 'F1 Score', key: 'f1Score' as const },
                { label: 'ROC-AUC', key: 'rocAuc' as const },
              ].map((metricItem) => (
                <div key={metricItem.key} className="space-y-1.5 bg-white p-3.5 rounded-xl border border-slate-200/80">
                  <div className="flex justify-between items-center text-xs font-semibold text-slate-700">
                    <span>{metricItem.label}</span>
                    <span className="font-mono text-slate-500">
                      Ridge: {(Number(metrics[1][metricItem.key]) * 100).toFixed(1)}% vs Lasso: {(Number(metrics[2][metricItem.key]) * 100).toFixed(1)}%
                    </span>
                  </div>

                  <div className="grid grid-cols-3 gap-2 pt-1">
                    {metrics.map((m, idx) => {
                      const val = Number(m[metricItem.key]) || 0;
                      const barColor =
                        idx === 0
                          ? 'bg-slate-500'
                          : idx === 1
                          ? 'bg-teal-600'
                          : 'bg-indigo-600';

                      return (
                        <div key={m.modelName} className="space-y-1">
                          <div className="w-full bg-slate-100 h-3 rounded-full overflow-hidden">
                            <div
                              className={`h-full ${barColor} rounded-full transition-all duration-500`}
                              style={{ width: `${Math.min(100, Math.max(0, val * 100))}%` }}
                            />
                          </div>
                          <div className="flex justify-between text-[10px] text-slate-500 font-mono">
                            <span className="truncate">{m.modelName.replace(' Logistic Regression', '')}</span>
                            <span className="font-semibold text-slate-700">{(val * 100).toFixed(1)}%</span>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>

            {/* Academic Analysis Callout */}
            <div className="p-4 rounded-xl bg-teal-50/70 border border-teal-200 text-xs text-teal-900 space-y-1">
              <div className="font-bold flex items-center gap-1.5 text-teal-950">
                <Zap className="w-4 h-4 text-teal-700" />
                Regularization Insight for Defense Presentation:
              </div>
              <p className="leading-relaxed text-teal-800">
                Ridge regression (L2) prevents extreme weights caused by correlated clinical measurements (such as blood pressure, age, and ST depression), producing superior test stability and ROC-AUC. Lasso regression (L1) provides sparsity by pruning redundant features with near-zero clinical signal.
              </p>
            </div>
          </div>
        ) : (
          <div className="p-8 rounded-2xl bg-slate-50 border border-dashed border-slate-300 text-center space-y-2">
            <HelpCircle className="w-8 h-8 text-slate-400 mx-auto" />
            <h4 className="text-sm font-semibold text-slate-800">Awaiting Notebook Evaluation Results</h4>
            <p className="text-xs text-slate-500 max-w-md mx-auto">
              Evaluation metrics have not yet been synchronized from your Google Colab test set evaluation. Click &ldquo;Update Notebook Results&rdquo; above to paste your exact test scores.
            </p>
          </div>
        )}

      </div>

      {/* Edit Metrics Modal */}
      {showEditModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-2xl w-full p-6 space-y-6 max-h-[90vh] overflow-y-auto border border-slate-200 shadow-xl">
            <div className="flex items-center justify-between border-b border-slate-200 pb-3">
              <div>
                <h3 className="text-lg font-bold text-slate-900">
                  Update Notebook Test Set Metrics
                </h3>
                <p className="text-xs text-slate-500">
                  Input the exact numerical values obtained from Scikit-learn test evaluation.
                </p>
              </div>
              <button
                onClick={() => setShowEditModal(false)}
                className="text-slate-400 hover:text-slate-600 text-sm font-bold p-1 cursor-pointer"
              >
                ✕
              </button>
            </div>

            <div className="space-y-6">
              {editValues.map((model, idx) => (
                <div key={model.modelName} className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-3">
                  <h4 className="text-sm font-bold text-slate-900">{model.modelName}</h4>
                  
                  <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 text-xs">
                    <div>
                      <label className="text-slate-600 font-medium block mb-1">Accuracy</label>
                      <input
                        type="number"
                        step="0.0001"
                        min="0"
                        max="1"
                        value={model.accuracy ?? ''}
                        onChange={(e) => {
                          const val = e.target.value === '' ? null : Number(e.target.value);
                          const copy = [...editValues];
                          copy[idx].accuracy = val;
                          setEditValues(copy);
                        }}
                        className="w-full px-2 py-1.5 rounded-lg border border-slate-300 font-mono text-xs"
                      />
                    </div>

                    <div>
                      <label className="text-slate-600 font-medium block mb-1">Precision</label>
                      <input
                        type="number"
                        step="0.0001"
                        min="0"
                        max="1"
                        value={model.precision ?? ''}
                        onChange={(e) => {
                          const val = e.target.value === '' ? null : Number(e.target.value);
                          const copy = [...editValues];
                          copy[idx].precision = val;
                          setEditValues(copy);
                        }}
                        className="w-full px-2 py-1.5 rounded-lg border border-slate-300 font-mono text-xs"
                      />
                    </div>

                    <div>
                      <label className="text-slate-600 font-medium block mb-1">Recall</label>
                      <input
                        type="number"
                        step="0.0001"
                        min="0"
                        max="1"
                        value={model.recall ?? ''}
                        onChange={(e) => {
                          const val = e.target.value === '' ? null : Number(e.target.value);
                          const copy = [...editValues];
                          copy[idx].recall = val;
                          setEditValues(copy);
                        }}
                        className="w-full px-2 py-1.5 rounded-lg border border-slate-300 font-mono text-xs"
                      />
                    </div>

                    <div>
                      <label className="text-slate-600 font-medium block mb-1">F1 Score</label>
                      <input
                        type="number"
                        step="0.0001"
                        min="0"
                        max="1"
                        value={model.f1Score ?? ''}
                        onChange={(e) => {
                          const val = e.target.value === '' ? null : Number(e.target.value);
                          const copy = [...editValues];
                          copy[idx].f1Score = val;
                          setEditValues(copy);
                        }}
                        className="w-full px-2 py-1.5 rounded-lg border border-slate-300 font-mono text-xs"
                      />
                    </div>

                    <div>
                      <label className="text-slate-600 font-medium block mb-1">ROC-AUC</label>
                      <input
                        type="number"
                        step="0.0001"
                        min="0"
                        max="1"
                        value={model.rocAuc ?? ''}
                        onChange={(e) => {
                          const val = e.target.value === '' ? null : Number(e.target.value);
                          const copy = [...editValues];
                          copy[idx].rocAuc = val;
                          setEditValues(copy);
                        }}
                        className="w-full px-2 py-1.5 rounded-lg border border-slate-300 font-mono text-xs"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex justify-end gap-3 pt-3 border-t border-slate-200">
              <button
                onClick={() => setShowEditModal(false)}
                className="px-4 py-2 rounded-xl border border-slate-200 text-slate-700 text-xs font-semibold hover:bg-slate-50 cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveMetrics}
                className="px-5 py-2 rounded-xl bg-slate-900 text-white text-xs font-semibold hover:bg-slate-800 transition-colors cursor-pointer"
              >
                Save & Apply to Dashboard
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
