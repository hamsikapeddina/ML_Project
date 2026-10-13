import React, { useState } from 'react';
import {
  HEART_DISEASE_DISTRIBUTION,
  AGE_DISTRIBUTION,
  SEX_DISTRIBUTION,
  CHEST_PAIN_DISTRIBUTION,
  CHOLESTEROL_STATS,
  MAX_HEART_RATE_STATS,
  CORRELATION_VARIABLES,
  CORRELATION_MATRIX
} from '../data/edaDataset';
import {
  BarChart2,
  Info,
  Layers,
  Database,
  ArrowRight
} from 'lucide-react';
import { Link } from 'react-router-dom';

export const EdaPage: React.FC = () => {
  const [dataConnected, setDataConnected] = useState(true);

  return (
    <div className="py-6 sm:py-10 px-4 sm:px-8 max-w-7xl mx-auto space-y-8">
      
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-teal-50 text-teal-800 border border-teal-200 mb-1.5">
            <BarChart2 className="w-3.5 h-3.5" />
            Dataset Analysis
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Exploratory Data Analysis (EDA)
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
            EDA chart preview for the UCI Cleveland Heart Disease dataset. These displayed summaries are static placeholders and have not been checked against your executed notebook output.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setDataConnected(!dataConnected)}
            className="px-3 py-1.5 rounded-xl border border-slate-200 bg-white text-xs text-slate-600 hover:bg-slate-50 transition-colors cursor-pointer"
          >
            Chart Preview: {dataConnected ? 'Static placeholder data' : 'Hidden'}
          </button>
        </div>
      </div>

      {!dataConnected ? (
        <div className="p-12 rounded-2xl bg-white border border-dashed border-slate-300 text-center space-y-3">
          <Database className="w-10 h-10 text-slate-400 mx-auto" />
          <h3 className="text-base font-bold text-slate-800">
            Awaiting Dataset Connection
          </h3>
          <p className="text-xs text-slate-500 max-w-md mx-auto leading-relaxed">
            Exploratory data analysis graphs will populate once your Google Colab dataset output is connected. Connect or verify the dataset output in your executed notebook before treating these charts as final results.
          </p>
        </div>
      ) : (
        <div className="space-y-8">
          
          {/* Row 1: Graph 1 (Heart Disease Distribution) & Graph 3 (Sex vs Heart Disease) */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
            
            {/* Graph 1: Heart Disease Distribution */}
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-2xs space-y-4">
              <div>
                <span className="text-[11px] font-bold text-teal-800 uppercase tracking-wider block">Graph 1</span>
                <h3 className="text-base font-bold text-slate-900">Heart Disease Class Distribution</h3>
                <p className="text-xs text-slate-500">Number of records in each target class across the 303 patients</p>
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
                <p className="text-xs text-slate-500">Comparison of target classes across recorded biological sex</p>
              </div>

              <div className="space-y-3 pt-2">
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

          {/* Row 2: Graph 2 (Age Distribution) & Graph 4 (Chest Pain vs Heart Disease) */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
            
            {/* Graph 2: Age Distribution */}
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-2xs space-y-4">
              <div>
                <span className="text-[11px] font-bold text-teal-800 uppercase tracking-wider block">Graph 2</span>
                <h3 className="text-base font-bold text-slate-900">Age Distribution</h3>
                <p className="text-xs text-slate-500">Histogram of age brackets distinguishing both target classes</p>
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
                <div className="flex items-center justify-end gap-4 text-[11px] pt-1 font-medium">
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
                <p className="text-xs text-slate-500">Distribution across the 4 chest pain categories</p>
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
                <strong>Explanation:</strong> Patients recorded with asymptomatic chest pain account for the majority of confirmed heart disease cases in this dataset.
              </div>
            </div>

          </div>

          {/* Row 3: Graph 5 (Cholesterol Box Plot) & Graph 6 (Max Heart Rate Box Plot) */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
            
            {/* Graph 5: Cholesterol Box Plot */}
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-2xs space-y-4">
              <div>
                <span className="text-[11px] font-bold text-teal-800 uppercase tracking-wider block">Graph 5</span>
                <h3 className="text-base font-bold text-slate-900">Cholesterol Distribution (Box Plot)</h3>
                <p className="text-xs text-slate-500">Median, quartiles (Q1–Q3), and range by target class (mg/dL)</p>
              </div>

              <div className="space-y-3 pt-2">
                {CHOLESTEROL_STATS.map((stat) => (
                  <div key={stat.classLabel} className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
                    <div className="flex justify-between text-xs font-semibold text-slate-800">
                      <span>{stat.classLabel}</span>
                      <span className="font-mono text-teal-800">Median: {stat.median} mg/dL (Mean: {stat.mean})</span>
                    </div>
                    
                    <div className="relative h-6 bg-slate-200/80 rounded-md flex items-center px-1">
                      <div className="absolute left-[10%] right-[15%] h-0.5 bg-slate-400" />
                      <div
                        className="absolute h-4 rounded bg-teal-600/80 border border-teal-800"
                        style={{
                          left: stat.classLabel === 'No Disease' ? '25%' : '30%',
                          width: stat.classLabel === 'No Disease' ? '35%' : '40%',
                        }}
                      />
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
                <h3 className="text-base font-bold text-slate-900">Maximum Heart Rate Distribution (Box Plot)</h3>
                <p className="text-xs text-slate-500">Peak achieved exercise heart rate by target class (bpm)</p>
              </div>

              <div className="space-y-3 pt-2">
                {MAX_HEART_RATE_STATS.map((stat) => (
                  <div key={stat.classLabel} className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
                    <div className="flex justify-between text-xs font-semibold text-slate-800">
                      <span>{stat.classLabel}</span>
                      <span className="font-mono text-teal-800">Median: {stat.median} bpm (Mean: {stat.mean})</span>
                    </div>
                    
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
                <strong>Explanation:</strong> Patients with heart disease achieved noticeably lower peak heart rates during stress testing (median 139 bpm vs 158 bpm), reflecting chronotropic limitations under workload.
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
              <strong>Important Note:</strong> Correlation reflects linear associations between attributes and does not prove causation. Maximum heart rate shows a negative correlation with heart disease (-0.42), while major vessels (+0.46) and ST depression (+0.42) show the strongest positive associations.
            </div>
          </div>

        </div>
      )}

      {/* Navigation link to Models */}
      <div className="flex justify-end pt-4">
        <Link
          to="/models"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-slate-900 text-white text-xs font-semibold hover:bg-slate-800 transition-colors"
        >
          <span>Continue to Model Comparison &amp; Final Selection</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>

    </div>
  );
};
