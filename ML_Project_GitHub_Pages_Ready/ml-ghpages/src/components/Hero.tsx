import React from 'react';
import { ArrowRight, BarChart2, ShieldCheck, Database, Cpu, Activity } from 'lucide-react';

interface HeroProps {
  onStartPrediction: () => void;
  onExploreResults: () => void;
}

export const Hero: React.FC<HeroProps> = ({
  onStartPrediction,
  onExploreResults,
}) => {
  return (
    <section id="home" className="relative pt-12 pb-16 md:pt-16 md:pb-20 border-b border-slate-200 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center">
          
          {/* Left Column: Headline and Call-to-actions */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold bg-slate-100 text-slate-800 border border-slate-200">
              <span className="flex h-2 w-2 rounded-full bg-teal-500 animate-pulse" />
              Machine Learning College Project • UCI Cleveland Dataset
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight leading-[1.15]">
              Heart Disease Prediction Using{' '}
              <span className="text-teal-700">Regularized Logistic Regression</span>
            </h1>

            <p className="text-base sm:text-lg text-slate-600 max-w-2xl mx-auto lg:mx-0 leading-relaxed font-normal">
              An interactive machine learning project that analyzes patient health attributes and demonstrates heart disease prediction using Logistic Regression, Ridge and Lasso regularization.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3 sm:gap-4 pt-1">
              <button
                onClick={onStartPrediction}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-xl bg-slate-900 text-white font-medium hover:bg-slate-800 transition-all shadow-sm hover:shadow-md cursor-pointer group"
              >
                <span>Start Prediction</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                onClick={onExploreResults}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-white text-slate-800 font-medium border border-slate-200 hover:bg-slate-50 hover:border-slate-300 transition-all shadow-2xs cursor-pointer"
              >
                <BarChart2 className="w-4 h-4 text-teal-600" />
                <span>Explore Results</span>
              </button>
            </div>

            {/* Core Models Summary */}
            <div className="pt-4 border-t border-slate-100 flex flex-wrap items-center justify-center lg:justify-start gap-2.5 text-xs text-slate-600">
              <span className="font-semibold text-slate-700">Evaluated Models:</span>
              <span className="px-2.5 py-1 rounded-md bg-slate-100 text-slate-700 border border-slate-200">
                1. Logistic Regression
              </span>
              <span className="px-2.5 py-1 rounded-md bg-teal-50 text-teal-800 border border-teal-200">
                2. Ridge (L2 Penalty)
              </span>
              <span className="px-2.5 py-1 rounded-md bg-indigo-50 text-indigo-800 border border-indigo-200">
                3. Lasso (L1 Penalty)
              </span>
            </div>
          </div>

          {/* Right Column: Clean Data Flow Diagram */}
          <div className="lg:col-span-5">
            <div className="bg-slate-900 text-white p-6 sm:p-7 rounded-2xl shadow-lg border border-slate-800 space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-teal-400" />
                  <span className="text-xs font-mono text-slate-300">ML Prediction Flow</span>
                </div>
                <span className="text-[11px] font-mono text-teal-300 bg-slate-800 px-2 py-0.5 rounded border border-slate-700">
                  13 Clinical Features
                </span>
              </div>

              {/* Step 1: Input Attributes */}
              <div className="p-3.5 rounded-xl bg-slate-800/80 border border-slate-700/80 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-teal-500/20 text-teal-400 flex items-center justify-center">
                    <Database className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-xs font-semibold text-slate-200">Patient Data Vector (X)</div>
                    <div className="text-[11px] text-slate-400">Age, Sex, Chest Pain, BP, Chol, ECG...</div>
                  </div>
                </div>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-700 text-slate-300">
                  Step 1
                </span>
              </div>

              {/* Step 2: Regularized Model */}
              <div className="p-3.5 rounded-xl bg-slate-800/80 border border-teal-500/30 space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-indigo-500/20 text-indigo-400 flex items-center justify-center">
                      <Cpu className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-xs font-semibold text-white">Regularized Classifier</div>
                      <div className="text-[11px] text-slate-400">Sigmoid decision function</div>
                    </div>
                  </div>
                  <span className="text-[10px] font-mono text-teal-300 bg-slate-800 px-2 py-0.5 rounded border border-slate-700">
                    Step 2
                  </span>
                </div>

                <div className="bg-slate-950/60 rounded-lg p-2.5 text-[11px] text-slate-300 space-y-1 font-mono border border-slate-800">
                  <div className="flex justify-between">
                    <span className="text-slate-400">Ridge (L2):</span>
                    <span className="text-teal-300">Shrinks weights (controls variance)</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Lasso (L1):</span>
                    <span className="text-indigo-300">Zeros uninformative weights (sparsity)</span>
                  </div>
                </div>
              </div>

              {/* Step 3: Predicted Output */}
              <div className="p-3.5 rounded-xl bg-slate-800/80 border border-slate-700/80 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
                    <Activity className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-xs font-semibold text-slate-200">Prediction Output</div>
                    <div className="text-[11px] text-slate-400">Heart Disease (1) or No Disease (0)</div>
                  </div>
                </div>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-950 text-emerald-300 border border-emerald-800">
                  Output
                </span>
              </div>

              <div className="pt-2 text-[11px] text-slate-400 flex items-center gap-2">
                <ShieldCheck className="w-3.5 h-3.5 text-teal-400 shrink-0" />
                <span>Academic demonstration. Not a clinical medical diagnosis.</span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
