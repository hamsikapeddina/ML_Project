import React, { useState } from 'react';
import { SelectedModel } from '../types/heartDisease';
import { INITIAL_MODEL_METRICS } from '../data/modelMetrics';
import {
  HEART_DISEASE_DISTRIBUTION,
  AGE_DISTRIBUTION,
  SEX_DISTRIBUTION,
  CHEST_PAIN_DISTRIBUTION,
  CHOLESTEROL_STATS,
  MAX_HEART_RATE_STATS,
  CORRELATION_VARIABLES,
  CORRELATION_MATRIX,
  FEATURE_COEFFICIENTS,
  BoxPlotStats
} from '../data/edaDataset';
import {
  BarChart3,
  TrendingUp,
  Layers,
  Activity,
  Award,
  SlidersHorizontal,
  CheckCircle2,
  Info,
  Check,
  Zap,
  ArrowRight
} from 'lucide-react';

export const ExploreResults: React.FC = () => {
  // Sub-section tab: 'eda' or 'evaluation'
  const [activeTab, setActiveTab] = useState<'eda' | 'evaluation'>('eda');
  const [selectedModel, setSelectedModel] = useState<SelectedModel>('Ridge Logistic Regression');

  // Toggle for awaiting notebook data simulation
  const [dataSupplied, setDataSupplied] = useState<boolean>(true);

  const selectedMetrics = INITIAL_MODEL_METRICS.find((m) => m.modelName === selectedModel) || INITIAL_MODEL_METRICS[1];
  const cm = selectedMetrics.confusionMatrix;

  return (
    <section id="results" className="py-12 md:py-20 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-teal-50 text-teal-800 border border-teal-200">
              <BarChart3 className="w-3.5 h-3.5" />
              Machine Learning Findings
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 tracking-tight">
              Explore Results
            </h2>
            <p className="text-slate-600 text-sm sm:text-base max-w-2xl">
              Inspect exploratory data analysis from the heart disease dataset and evaluate the regularized models using test-set metrics and visualizations.
            </p>
          </div>

          {/* Sub-tab Navigation */}
          <div className="flex items-center gap-2 p-1 bg-slate-100 rounded-xl border border-slate-200 self-start md:self-auto">
            <button
              onClick={() => setActiveTab('eda')}
              className={`px-4 py-2 rounded-lg text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                activeTab === 'eda'
                  ? 'bg-white text-slate-900 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              1. Dataset Analysis (EDA)
            </button>
            <button
              onClick={() => setActiveTab('evaluation')}
              className={`px-4 py-2 rounded-lg text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                activeTab === 'evaluation'
                  ? 'bg-white text-slate-900 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              2. Model Evaluation
            </button>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* SUBSECTION A: DATASET ANALYSIS (EDA) */}
        {/* ========================================================================= */}
        {activeTab === 'eda' && (
          <div className="space-y-10 animate-fadeIn">
            
            <div className="bg-slate-50 p-4 sm:p-5 rounded-2xl border border-slate-200 text-xs sm:text-sm text-slate-700 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="flex items-center gap-2.5">
                <Info className="w-4 h-4 text-teal-700 shrink-0" />
                <span>
                  Exploratory Data Analysis generated from the 303 clinical records in the UCI Cleveland dataset.
                </span>
              </div>
              <button
                onClick={() => setDataSupplied(!dataSupplied)}
                className="text-xs text-slate-500 hover:text-slate-800 underline cursor-pointer shrink-0"
              >
                Toggle Status: {dataSupplied ? 'Connected Data' : 'Awaiting Data'}
              </button>
            </div>

            {!dataSupplied ? (
              <div className="p-12 rounded-2xl bg-slate-50 border border-dashed border-slate-300 text-center space-y-2">
                <h4 className="text-base font-bold text-slate-800">Awaiting Dataset Results</h4>
                <p className="text-xs text-slate-500 max-w-md mx-auto">
                  Dataset graphs have not yet been synchronized from your Python notebook. Click &ldquo;Toggle Status&rdquo; above to preview the dataset analysis.
                </p>
              </div>
            ) : (
              <div className="space-y-10">
                
                {/* Row 1: Graph 1 (Target Distribution) & Graph 3 (Sex vs Target) */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
                  
                  {/* Graph 1: Heart Disease Distribution */}
                  <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-2xs space-y-4">
                    <div>
                      <span className="text-[11px] font-bold text-teal-800 uppercase tracking-wider block">Graph 1</span>
                      <h3 className="text-base font-bold text-slate-900">Heart Disease Distribution</h3>
                      <p className="text-xs text-slate-500">Record count for each target class in the dataset</p>
                    </div>

                    <div className="space-y-3 pt-2">
                      {HEART_DISEASE_DISTRIBUTION.map((item) => (
                        <div key={item.name} className="space-y-1">
                          <div className="flex justify-between text-xs font-semibold text-slate-700">
                            <span>{item.name}</span>
                            <span className="font-mono">{item.count} records ({item.percentage}%)</span>
                          </div>
                          <div className="w-full bg-slate-100 h-4 rounded-full overflow-hidden">
                            <div
                              className="h-full rounded-full transition-all duration-500"
                              style={{
                                width: `${item.percentage}%`,
                                backgroundColor: item.color,
                              }}
                            />
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-600">
                      <strong>Explanation:</strong> The dataset is relatively balanced with 164 records (54.1%) without heart disease and 139 records (45.9%) diagnosed with heart disease.
                    </div>
                  </div>

                  {/* Graph 3: Sex vs Heart Disease */}
                  <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-2xs space-y-4">
                    <div>
                      <span className="text-[11px] font-bold text-teal-800 uppercase tracking-wider block">Graph 3</span>
                      <h3 className="text-base font-bold text-slate-900">Sex vs Heart Disease</h3>
                      <p className="text-xs text-slate-500">Comparison of target classes across recorded sex categories</p>
                    </div>

                    <div className="space-y-4 pt-2">
                      {SEX_DISTRIBUTION.map((s) => {
                        const total = s.noDisease + s.disease;
                        const pctDisease = ((s.disease / total) * 100).toFixed(1);
                        return (
                          <div key={s.category} className="space-y-1.5 bg-slate-50 p-3 rounded-xl border border-slate-200/80">
                            <div className="flex justify-between text-xs font-semibold text-slate-800">
                              <span>{s.category} (Total: {total})</span>
                              <span className="font-mono text-slate-600">{pctDisease}% with disease</span>
                            </div>
                            <div className="grid grid-cols-2 gap-2 text-[11px]">
                              <div className="bg-emerald-50 text-emerald-900 p-2 rounded-lg border border-emerald-200 flex justify-between">
                                <span>No Disease:</span>
                                <strong className="font-mono">{s.noDisease}</strong>
                              </div>
                              <div className="bg-rose-50 text-rose-900 p-2 rounded-lg border border-rose-200 flex justify-between">
                                <span>Heart Disease:</span>
                                <strong className="font-mono">{s.disease}</strong>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>

                    <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-600">
                      <strong>Explanation:</strong> In this sample cohort, male patients show a higher proportion of heart disease diagnoses (114 of 206) than female patients (25 of 97).
                    </div>
                  </div>

                </div>

                {/* Row 2: Graph 2 (Age Distribution Histogram) & Graph 4 (Chest Pain vs Heart Disease) */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
                  
                  {/* Graph 2: Age Distribution */}
                  <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-2xs space-y-4">
                    <div>
                      <span className="text-[11px] font-bold text-teal-800 uppercase tracking-wider block">Graph 2</span>
                      <h3 className="text-base font-bold text-slate-900">Age Distribution</h3>
                      <p className="text-xs text-slate-500">Number of patients per age group distinguishing target classes</p>
                    </div>

                    <div className="space-y-2.5 pt-1">
                      {AGE_DISTRIBUTION.map((bin) => (
                        <div key={bin.ageGroup} className="space-y-1 text-xs">
                          <div className="flex justify-between text-slate-700">
                            <span className="font-semibold">{bin.ageGroup}</span>
                            <span className="font-mono text-slate-500">{bin.total} patients</span>
                          </div>
                          <div className="flex h-3 rounded-full overflow-hidden bg-slate-100">
                            <div
                              style={{ width: `${(bin.noDisease / 125) * 100}%` }}
                              className="bg-teal-600 transition-all"
                              title={`No Disease: ${bin.noDisease}`}
                            />
                            <div
                              style={{ width: `${(bin.disease / 125) * 100}%` }}
                              className="bg-rose-500 transition-all"
                              title={`Heart Disease: ${bin.disease}`}
                            />
                          </div>
                        </div>
                      ))}
                      <div className="flex items-center justify-end gap-4 text-[11px] pt-1">
                        <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded bg-teal-600 inline-block" /> No Disease</span>
                        <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded bg-rose-500 inline-block" /> Heart Disease</span>
                      </div>
                    </div>

                    <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-600">
                      <strong>Explanation:</strong> Patients between 50 and 69 years of age comprise the largest share of heart disease diagnoses in this clinical cohort.
                    </div>
                  </div>

                  {/* Graph 4: Chest Pain Type vs Heart Disease */}
                  <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-2xs space-y-4">
                    <div>
                      <span className="text-[11px] font-bold text-teal-800 uppercase tracking-wider block">Graph 4</span>
                      <h3 className="text-base font-bold text-slate-900">Chest Pain Type vs Heart Disease</h3>
                      <p className="text-xs text-slate-500">Distribution of target classes across the 4 chest pain categories</p>
                    </div>

                    <div className="space-y-2.5 pt-1">
                      {CHEST_PAIN_DISTRIBUTION.map((cp) => {
                        const total = cp.noDisease + cp.disease;
                        return (
                          <div key={cp.category} className="p-2.5 rounded-xl bg-slate-50 border border-slate-200/80 space-y-1 text-xs">
                            <div className="flex justify-between font-semibold text-slate-800">
                              <span>{cp.category}</span>
                              <span className="font-mono text-slate-500">{total} total</span>
                            </div>
                            <div className="flex gap-2 text-[11px]">
                              <div className="w-1/2 bg-white px-2 py-1 rounded border border-slate-200 flex justify-between">
                                <span className="text-slate-500">No Disease:</span>
                                <span className="font-semibold text-teal-700">{cp.noDisease}</span>
                              </div>
                              <div className="w-1/2 bg-white px-2 py-1 rounded border border-slate-200 flex justify-between">
                                <span className="text-slate-500">Disease:</span>
                                <span className="font-semibold text-rose-700">{cp.disease}</span>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>

                    <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-600">
                      <strong>Explanation:</strong> Patients recorded with asymptomatic chest pain (absence of classic exertion discomfort) account for the majority of confirmed heart disease cases in this dataset.
                    </div>
                  </div>

                </div>

                {/* Row 3: Graph 5 (Cholesterol Box Plot) & Graph 6 (Max Heart Rate Box Plot) */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
                  
                  {/* Graph 5: Cholesterol Box Plot */}
                  <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-2xs space-y-4">
                    <div>
                      <span className="text-[11px] font-bold text-teal-800 uppercase tracking-wider block">Graph 5</span>
                      <h3 className="text-base font-bold text-slate-900">Cholesterol Distribution (Box Plot Comparison)</h3>
                      <p className="text-xs text-slate-500">Median, quartiles (Q1–Q3), and range by target class (mg/dL)</p>
                    </div>

                    <div className="space-y-3 pt-2">
                      {CHOLESTEROL_STATS.map((stat) => (
                        <div key={stat.classLabel} className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
                          <div className="flex justify-between text-xs font-semibold text-slate-800">
                            <span>{stat.classLabel}</span>
                            <span className="font-mono text-teal-800">Median: {stat.median} mg/dL (Mean: {stat.mean})</span>
                          </div>
                          
                          {/* Visual representation of box plot */}
                          <div className="relative h-6 bg-slate-200/80 rounded-md flex items-center px-1">
                            {/* Whiskers */}
                            <div className="absolute left-[10%] right-[15%] h-0.5 bg-slate-400" />
                            {/* Interquartile Range Box */}
                            <div
                              className="absolute h-4 rounded bg-teal-600/80 border border-teal-800"
                              style={{
                                left: stat.classLabel === 'No Disease' ? '25%' : '30%',
                                width: stat.classLabel === 'No Disease' ? '35%' : '40%',
                              }}
                            />
                            {/* Median Line */}
                            <div
                              className="absolute h-5 w-1 bg-white shadow-xs"
                              style={{
                                left: stat.classLabel === 'No Disease' ? '42%' : '48%',
                              }}
                            />
                          </div>

                          <div className="flex justify-between text-[10px] text-slate-500 font-mono">
                            <span>Min: {stat.min}</span>
                            <span>Q1: {stat.q1}</span>
                            <span>Median: {stat.median}</span>
                            <span>Q3: {stat.q3}</span>
                            <span>Max: {stat.max}</span>
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-600">
                      <strong>Explanation:</strong> Both groups exhibit overlapping cholesterol ranges, indicating that serum cholesterol alone is not a standalone predictor without combining other clinical markers.
                    </div>
                  </div>

                  {/* Graph 6: Maximum Heart Rate Box Plot */}
                  <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-2xs space-y-4">
                    <div>
                      <span className="text-[11px] font-bold text-teal-800 uppercase tracking-wider block">Graph 6</span>
                      <h3 className="text-base font-bold text-slate-900">Maximum Heart Rate Distribution (Box Plot Comparison)</h3>
                      <p className="text-xs text-slate-500">Peak achieved exercise heart rate by target class (bpm)</p>
                    </div>

                    <div className="space-y-3 pt-2">
                      {MAX_HEART_RATE_STATS.map((stat) => (
                        <div key={stat.classLabel} className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
                          <div className="flex justify-between text-xs font-semibold text-slate-800">
                            <span>{stat.classLabel}</span>
                            <span className="font-mono text-teal-800">Median: {stat.median} bpm (Mean: {stat.mean})</span>
                          </div>
                          
                          {/* Visual representation of box plot */}
                          <div className="relative h-6 bg-slate-200/80 rounded-md flex items-center px-1">
                            <div className="absolute left-[8%] right-[10%] h-0.5 bg-slate-400" />
                            <div
                              className="absolute h-4 rounded bg-indigo-600/80 border border-indigo-800"
                              style={{
                                left: stat.classLabel === 'No Disease' ? '45%' : '28%',
                                width: stat.classLabel === 'No Disease' ? '30%' : '32%',
                              }}
                            />
                            <div
                              className="absolute h-5 w-1 bg-white shadow-xs"
                              style={{
                                left: stat.classLabel === 'No Disease' ? '60%' : '44%',
                              }}
                            />
                          </div>

                          <div className="flex justify-between text-[10px] text-slate-500 font-mono">
                            <span>Min: {stat.min}</span>
                            <span>Q1: {stat.q1}</span>
                            <span>Median: {stat.median}</span>
                            <span>Q3: {stat.q3}</span>
                            <span>Max: {stat.max}</span>
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-600">
                      <strong>Explanation:</strong> Patients with heart disease achieved noticeably lower peak heart rates during stress testing (median 139 bpm vs 158 bpm), reflecting chronotropic response limitations.
                    </div>
                  </div>

                </div>

                {/* Row 4: Graph 7 (Correlation Heatmap) */}
                <div className="bg-white p-6 sm:p-7 rounded-2xl border border-slate-200 shadow-2xs space-y-4">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <div>
                      <span className="text-[11px] font-bold text-teal-800 uppercase tracking-wider block">Graph 7</span>
                      <h3 className="text-base font-bold text-slate-900">Correlation Heatmap (Numeric Attributes)</h3>
                      <p className="text-xs text-slate-500">Pairwise Pearson correlation matrix for numerical features and the target label</p>
                    </div>
                    <div className="text-xs text-slate-500 flex items-center gap-2">
                      <span className="inline-block w-3 h-3 bg-teal-600 rounded-xs" /> Negative (-0.4)
                      <span className="inline-block w-3 h-3 bg-slate-200 rounded-xs" /> Zero (0.0)
                      <span className="inline-block w-3 h-3 bg-rose-600 rounded-xs" /> Positive (+0.5)
                    </div>
                  </div>

                  {/* Heatmap Grid Table */}
                  <div className="overflow-x-auto pt-2">
                    <table className="w-full text-xs text-center border-collapse">
                      <thead>
                        <tr>
                          <th className="p-2 text-left font-semibold text-slate-500" />
                          {CORRELATION_VARIABLES.map((v) => (
                            <th key={v} className="p-2 font-semibold text-slate-700 text-[11px]">
                              {v}
                            </th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {CORRELATION_VARIABLES.map((rowVar, i) => (
                          <tr key={rowVar}>
                            <td className="p-2 text-left font-semibold text-slate-800 text-[11px]">
                              {rowVar}
                            </td>
                            {CORRELATION_MATRIX[i].map((val, j) => {
                              // Color interpolation: negative = teal, near-zero = slate, positive = rose
                              let bg = 'bg-slate-100 text-slate-700';
                              if (val >= 0.35) bg = 'bg-rose-500 text-white font-bold';
                              else if (val >= 0.20) bg = 'bg-rose-200 text-rose-950 font-semibold';
                              else if (val <= -0.35) bg = 'bg-teal-700 text-white font-bold';
                              else if (val <= -0.15) bg = 'bg-teal-200 text-teal-950 font-semibold';

                              return (
                                <td key={j} className="p-1">
                                  <div className={`p-2 rounded-lg font-mono text-[11px] ${bg}`}>
                                    {val.toFixed(2)}
                                  </div>
                                </td>
                              );
                            })}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                  <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-600 leading-relaxed">
                    <strong>Important Note:</strong> Correlation reflects linear associations between pairs of attributes and does not establish cause and effect. Maximum heart rate shows a notable negative correlation with heart disease (-0.42), while major vessels (+0.46) and ST depression (+0.42) show strong positive associations.
                  </div>
                </div>

              </div>
            )}

          </div>
        )}

        {/* ========================================================================= */}
        {/* SUBSECTION B: MODEL EVALUATION & COMPARISON */}
        {/* ========================================================================= */}
        {activeTab === 'evaluation' && (
          <div className="space-y-10 animate-fadeIn">
            
            {/* Model Selector Bar */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-2xl bg-slate-50 border border-slate-200">
              <div>
                <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block">
                  Select Model to Inspect:
                </span>
                <div className="flex flex-wrap gap-2 mt-1">
                  {(['Logistic Regression', 'Ridge Logistic Regression', 'Lasso Logistic Regression'] as SelectedModel[]).map((m) => (
                    <button
                      key={m}
                      onClick={() => setSelectedModel(m)}
                      className={`px-3.5 py-1.5 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                        selectedModel === m
                          ? 'bg-slate-900 text-white shadow-xs'
                          : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-100'
                      }`}
                    >
                      {m}
                    </button>
                  ))}
                </div>
              </div>

              <div className="text-xs text-slate-500 sm:text-right">
                <span>Evaluated on: </span>
                <strong className="text-slate-800">Held-out test set (80/20 stratified split)</strong>
              </div>
            </div>

            {/* 5 Compact Metric Cards */}
            <div>
              <div className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-3">
                Key Test Set Metrics for {selectedModel}
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4">
                
                {/* Accuracy */}
                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 hover:border-slate-300 transition-all">
                  <span className="text-xs text-slate-500 font-medium block">Accuracy</span>
                  <div className="text-xl sm:text-2xl font-extrabold text-slate-900 mt-1 font-mono">
                    {selectedMetrics.accuracy !== null ? `${(selectedMetrics.accuracy * 100).toFixed(2)}%` : 'Awaiting'}
                  </div>
                  <p className="text-[11px] text-slate-500 mt-1.5 leading-snug">
                    Percentage of total correct test predictions.
                  </p>
                </div>

                {/* Precision */}
                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 hover:border-slate-300 transition-all">
                  <span className="text-xs text-slate-500 font-medium block">Precision</span>
                  <div className="text-xl sm:text-2xl font-extrabold text-slate-900 mt-1 font-mono">
                    {selectedMetrics.precision !== null ? `${(selectedMetrics.precision * 100).toFixed(2)}%` : 'Awaiting'}
                  </div>
                  <p className="text-[11px] text-slate-500 mt-1.5 leading-snug">
                    Ratio of correctly predicted cases to all positive calls.
                  </p>
                </div>

                {/* Recall */}
                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 hover:border-slate-300 transition-all">
                  <span className="text-xs text-slate-500 font-medium block">Recall (Sensitivity)</span>
                  <div className="text-xl sm:text-2xl font-extrabold text-slate-900 mt-1 font-mono">
                    {selectedMetrics.recall !== null ? `${(selectedMetrics.recall * 100).toFixed(2)}%` : 'Awaiting'}
                  </div>
                  <p className="text-[11px] text-slate-500 mt-1.5 leading-snug">
                    Proportion of actual disease cases correctly detected.
                  </p>
                </div>

                {/* F1 Score */}
                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 hover:border-slate-300 transition-all">
                  <span className="text-xs text-slate-500 font-medium block">F1 Score</span>
                  <div className="text-xl sm:text-2xl font-extrabold text-slate-900 mt-1 font-mono">
                    {selectedMetrics.f1Score !== null ? `${(selectedMetrics.f1Score * 100).toFixed(2)}%` : 'Awaiting'}
                  </div>
                  <p className="text-[11px] text-slate-500 mt-1.5 leading-snug">
                    Harmonic mean balancing precision and recall.
                  </p>
                </div>

                {/* ROC-AUC */}
                <div className="col-span-2 sm:col-span-1 p-4 rounded-2xl bg-teal-50/70 border border-teal-200">
                  <span className="text-xs text-teal-900 font-medium block">ROC-AUC</span>
                  <div className="text-xl sm:text-2xl font-extrabold text-teal-950 mt-1 font-mono">
                    {selectedMetrics.rocAuc !== null ? selectedMetrics.rocAuc.toFixed(4) : 'Awaiting'}
                  </div>
                  <p className="text-[11px] text-teal-800 mt-1.5 leading-snug">
                    Ability to distinguish disease vs healthy across thresholds.
                  </p>
                </div>

              </div>
            </div>

            {/* Model Comparison Table */}
            <div className="space-y-3">
              <h3 className="text-base font-bold text-slate-900">
                Model Comparison Table
              </h3>

              <div className="overflow-x-auto rounded-2xl border border-slate-200 shadow-2xs">
                <table className="w-full text-left border-collapse bg-white">
                  <thead>
                    <tr className="bg-slate-50 border-b border-slate-200 text-xs font-bold text-slate-700 uppercase tracking-wider">
                      <th className="py-3 px-4 sm:px-6">Model</th>
                      <th className="py-3 px-4">Accuracy</th>
                      <th className="py-3 px-4">Precision</th>
                      <th className="py-3 px-4">Recall</th>
                      <th className="py-3 px-4">F1 Score</th>
                      <th className="py-3 px-4">ROC-AUC</th>
                      <th className="py-3 px-4 sm:px-6">Penalty Applied</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 text-sm">
                    {INITIAL_MODEL_METRICS.map((row) => {
                      const isCurrent = row.modelName === selectedModel;
                      return (
                        <tr
                          key={row.modelName}
                          onClick={() => setSelectedModel(row.modelName)}
                          className={`cursor-pointer transition-colors ${
                            isCurrent ? 'bg-teal-50/50 font-medium' : 'hover:bg-slate-50'
                          }`}
                        >
                          <td className="py-3 px-4 sm:px-6 font-semibold text-slate-900 flex items-center gap-2">
                            {isCurrent && <Check className="w-4 h-4 text-teal-700" />}
                            <span>{row.modelName}</span>
                          </td>
                          <td className="py-3 px-4 font-mono text-slate-800">
                            {row.accuracy ? `${(row.accuracy * 100).toFixed(2)}%` : 'Awaiting'}
                          </td>
                          <td className="py-3 px-4 font-mono text-slate-800">
                            {row.precision ? `${(row.precision * 100).toFixed(2)}%` : 'Awaiting'}
                          </td>
                          <td className="py-3 px-4 font-mono text-slate-800">
                            {row.recall ? `${(row.recall * 100).toFixed(2)}%` : 'Awaiting'}
                          </td>
                          <td className="py-3 px-4 font-mono text-slate-800">
                            {row.f1Score ? `${(row.f1Score * 100).toFixed(2)}%` : 'Awaiting'}
                          </td>
                          <td className="py-3 px-4 font-mono text-teal-800 font-bold">
                            {row.rocAuc ? row.rocAuc.toFixed(4) : 'Awaiting'}
                          </td>
                          <td className="py-3 px-4 sm:px-6 text-xs text-slate-500 font-mono">
                            {row.regularizationPenalty}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Graph 8: Model Performance Comparison Bar Chart */}
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-2xs space-y-5">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div>
                  <span className="text-[11px] font-bold text-teal-800 uppercase tracking-wider block">Graph 8</span>
                  <h3 className="text-base font-bold text-slate-900">Model Performance Comparison</h3>
                  <p className="text-xs text-slate-500">Side-by-side metric comparison on the test set across all three models (0.0 to 1.0 scale)</p>
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
                  <div key={metric.key} className="p-3 rounded-xl bg-slate-50 border border-slate-200 space-y-1.5">
                    <div className="flex justify-between text-xs font-semibold text-slate-800">
                      <span>{metric.label}</span>
                      <span className="text-[11px] text-slate-500 font-mono">Consistent 0.0–1.0 Scale</span>
                    </div>

                    <div className="grid grid-cols-3 gap-2">
                      {INITIAL_MODEL_METRICS.map((m, idx) => {
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

              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-600">
                <strong>Explanation:</strong> Because all five evaluation metrics share a bounded range between 0 and 1 (0% to 100%), they can be viewed side by side to assess balanced performance across positive and negative patient predictions.
              </div>
            </div>

            {/* Row: Graph 9 (Confusion Matrix) & Graph 10 (ROC Curve Comparison) */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
              
              {/* Graph 9: Confusion Matrix */}
              <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-2xs space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-[11px] font-bold text-teal-800 uppercase tracking-wider block">Graph 9</span>
                    <h3 className="text-base font-bold text-slate-900">Confusion Matrix</h3>
                    <p className="text-xs text-slate-500">Test-set evaluation for {selectedModel}</p>
                  </div>
                </div>

                {/* 2x2 Matrix */}
                <div className="space-y-2 pt-1">
                  <div className="text-right text-[11px] font-semibold text-slate-400 font-mono">
                    PREDICTED CLASS
                  </div>

                  <div className="grid grid-cols-2 gap-3 text-xs">
                    {/* True Negative */}
                    <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-center space-y-1">
                      <span className="text-[10px] uppercase font-mono font-bold text-emerald-800 block">
                        True Negative (TN)
                      </span>
                      <div className="text-2xl font-extrabold text-emerald-950 font-mono">
                        {cm?.tn}
                      </div>
                      <p className="text-[11px] text-emerald-900">
                        No disease was predicted and the actual label was no disease.
                      </p>
                    </div>

                    {/* False Positive */}
                    <div className="p-4 rounded-xl bg-amber-50 border border-amber-200 text-center space-y-1">
                      <span className="text-[10px] uppercase font-mono font-bold text-amber-800 block">
                        False Positive (FP)
                      </span>
                      <div className="text-2xl font-extrabold text-amber-950 font-mono">
                        {cm?.fp}
                      </div>
                      <p className="text-[11px] text-amber-900">
                        Disease was predicted but the actual label was no disease.
                      </p>
                    </div>

                    {/* False Negative */}
                    <div className="p-4 rounded-xl bg-rose-50 border border-rose-200 text-center space-y-1">
                      <span className="text-[10px] uppercase font-mono font-bold text-rose-800 block">
                        False Negative (FN)
                      </span>
                      <div className="text-2xl font-extrabold text-rose-950 font-mono">
                        {cm?.fn}
                      </div>
                      <p className="text-[11px] text-rose-900">
                        No disease was predicted but the actual label was disease.
                      </p>
                    </div>

                    {/* True Positive */}
                    <div className="p-4 rounded-xl bg-teal-50 border border-teal-200 text-center space-y-1">
                      <span className="text-[10px] uppercase font-mono font-bold text-teal-800 block">
                        True Positive (TP)
                      </span>
                      <div className="text-2xl font-extrabold text-teal-950 font-mono">
                        {cm?.tp}
                      </div>
                      <p className="text-[11px] text-teal-900">
                        Disease was predicted and the actual label was disease.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-600">
                  <strong>Explanation:</strong> In clinical risk screening, minimizing <strong>False Negatives (Type II errors)</strong> is critical to avoid missing patients with heart disease.
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
                      {/* Grid lines */}
                      <line x1="40" y1="20" x2="280" y2="20" stroke="#334155" strokeDasharray="3 3" />
                      <line x1="40" y1="75" x2="280" y2="75" stroke="#334155" strokeDasharray="3 3" />
                      <line x1="40" y1="130" x2="280" y2="130" stroke="#334155" strokeDasharray="3 3" />
                      <line x1="40" y1="185" x2="280" y2="185" stroke="#475569" strokeWidth="1.5" />
                      <line x1="40" y1="20" x2="40" y2="185" stroke="#475569" strokeWidth="1.5" />

                      {/* Random chance line (AUC = 0.50) */}
                      <line x1="40" y1="185" x2="280" y2="20" stroke="#64748b" strokeWidth="1.5" strokeDasharray="4 4" />
                      
                      {/* Standard Logistic Regression Curve */}
                      <path
                        d="M 40 185 Q 80 80, 160 38 T 280 20"
                        fill="none"
                        stroke="#94a3b8"
                        strokeWidth="2"
                      />

                      {/* Lasso Regression Curve */}
                      <path
                        d="M 40 185 Q 75 68, 150 32 T 280 20"
                        fill="none"
                        stroke="#818cf8"
                        strokeWidth="2"
                      />

                      {/* Ridge Logistic Regression Curve */}
                      <path
                        d="M 40 185 Q 65 48, 140 26 T 280 20"
                        fill="none"
                        stroke="#2dd4bf"
                        strokeWidth="2.5"
                      />

                      {/* Y-axis values */}
                      <text x="32" y="24" fill="#94a3b8" fontSize="9" textAnchor="end">1.0</text>
                      <text x="32" y="105" fill="#94a3b8" fontSize="9" textAnchor="end">0.5</text>
                      <text x="32" y="188" fill="#94a3b8" fontSize="9" textAnchor="end">0.0</text>

                      {/* X-axis values */}
                      <text x="40" y="202" fill="#94a3b8" fontSize="9" textAnchor="middle">0.0</text>
                      <text x="160" y="202" fill="#94a3b8" fontSize="9" textAnchor="middle">0.5</text>
                      <text x="280" y="202" fill="#94a3b8" fontSize="9" textAnchor="middle">1.0</text>

                      <text x="160" y="218" fill="#cbd5e1" fontSize="10" textAnchor="middle">
                        False Positive Rate (FPR)
                      </text>
                    </svg>
                  </div>

                  {/* Curve Legend */}
                  <div className="flex flex-wrap items-center justify-center gap-3 text-[11px] font-mono pt-2 border-t border-slate-800">
                    <span className="flex items-center gap-1.5"><span className="w-2.5 h-0.5 bg-teal-400 inline-block" /> Ridge L2 (0.9183)</span>
                    <span className="flex items-center gap-1.5"><span className="w-2.5 h-0.5 bg-indigo-400 inline-block" /> Lasso L1 (0.9086)</span>
                    <span className="flex items-center gap-1.5"><span className="w-2.5 h-0.5 bg-slate-400 inline-block" /> Logistic (0.9011)</span>
                    <span className="flex items-center gap-1.5"><span className="w-2.5 h-0.5 border-t border-dashed border-slate-500 inline-block" /> Chance (0.50)</span>
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-600">
                  <strong>Explanation:</strong> ROC-AUC measures how effectively each model separates positive and negative heart disease cases across all probability decision thresholds.
                </div>
              </div>

            </div>

            {/* Graph 11: Feature Coefficients Analysis */}
            <div className="bg-white p-6 sm:p-7 rounded-2xl border border-slate-200 shadow-2xs space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div>
                  <span className="text-[11px] font-bold text-teal-800 uppercase tracking-wider block">Graph 11</span>
                  <h3 className="text-base font-bold text-slate-900">Feature Coefficient Analysis</h3>
                  <p className="text-xs text-slate-500">Learned weights for {selectedModel} sorted by absolute magnitude</p>
                </div>
                <div className="flex items-center gap-3 text-xs">
                  <span className="flex items-center gap-1.5"><span className="w-3 h-3 bg-teal-600 rounded-xs inline-block" /> Positive Weight (Increases Risk Score)</span>
                  <span className="flex items-center gap-1.5"><span className="w-3 h-3 bg-indigo-600 rounded-xs inline-block" /> Negative Weight (Lowers Risk Score)</span>
                </div>
              </div>

              {/* Horizontal Divergence Bar Chart */}
              <div className="space-y-2 pt-2">
                {FEATURE_COEFFICIENTS.map((feat) => {
                  const coeff =
                    selectedModel === 'Logistic Regression'
                      ? feat.logisticCoeff
                      : selectedModel === 'Ridge Logistic Regression'
                      ? feat.ridgeCoeff
                      : feat.lassoCoeff;

                  const isPositive = coeff > 0;
                  const isZero = Math.abs(coeff) === 0;
                  const barWidth = Math.min(100, (Math.abs(coeff) / 0.85) * 50);

                  return (
                    <div key={feat.feature} className="grid grid-cols-12 items-center text-xs py-1">
                      {/* Feature Name */}
                      <div className="col-span-4 sm:col-span-3 text-slate-700 font-medium truncate pr-2" title={feat.label}>
                        {feat.label}
                      </div>

                      {/* Centered Divergence Bar Container */}
                      <div className="col-span-6 sm:col-span-7 relative h-5 bg-slate-100 rounded-md overflow-hidden flex items-center">
                        {/* Center Zero Line */}
                        <div className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-slate-300 z-10" />

                        {/* Negative Bar (left of center) */}
                        {!isPositive && !isZero && (
                          <div
                            className="absolute top-1 bottom-1 bg-indigo-600 rounded-l transition-all"
                            style={{
                              right: '50%',
                              width: `${barWidth}%`,
                            }}
                          />
                        )}

                        {/* Positive Bar (right of center) */}
                        {isPositive && !isZero && (
                          <div
                            className="absolute top-1 bottom-1 bg-teal-600 rounded-r transition-all"
                            style={{
                              left: '50%',
                              width: `${barWidth}%`,
                            }}
                          />
                        )}

                        {/* Zero representation */}
                        {isZero && (
                          <span className="absolute left-1/2 -translate-x-1/2 text-[10px] text-slate-400 font-mono">
                            0.00 (Zeroed by L1)
                          </span>
                        )}
                      </div>

                      {/* Numeric Coefficient Value */}
                      <div className="col-span-2 text-right font-mono text-xs font-semibold text-slate-800">
                        {coeff >= 0 ? `+${coeff.toFixed(2)}` : coeff.toFixed(2)}
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-600 leading-relaxed">
                <strong>Explanation of Coefficients:</strong> Model coefficients represent the learned direction and strength of each standardized feature&apos;s relationship with predicted heart disease. Positive coefficients (e.g. Major Vessels, Thalassemia, ST Depression) increase the model&apos;s risk score, whereas negative coefficients (e.g. Maximum Heart Rate achieved) decrease the risk score. Notice how Lasso ($L_1$) shrinks less informative predictors like Fasting Blood Sugar and Cholesterol to exactly 0.00.
              </div>
            </div>

          </div>
        )}

      </div>
    </section>
  );
};
