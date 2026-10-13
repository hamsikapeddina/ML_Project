import React, { useState } from 'react';
import {
  BookOpen,
  ArrowRight,
  Database,
  Cpu,
  Activity,
  Layers,
  ChevronDown,
  ChevronUp,
  Code2,
  Terminal,
  Sparkles
} from 'lucide-react';

export const AboutProject: React.FC = () => {
  const [showMath, setShowMath] = useState(false);

  const workflowSteps = [
    { num: 1, title: 'Load the dataset', desc: 'Import the UCI Cleveland heart disease dataset (303 records) into pandas.' },
    { num: 2, title: 'Inspect data and missing values', desc: 'Inspect attribute types, verify column distributions, and handle encoded values.' },
    { num: 3, title: 'Perform EDA', desc: 'Visualize target balance, age profiles, and feature correlations using Seaborn.' },
    { num: 4, title: 'Prepare input features and target', desc: 'Separate the 13 clinical attributes (X) from the binary target label (y ∈ {0, 1}).' },
    { num: 5, title: 'Split data into train and test sets', desc: 'Perform stratified 80/20 train/test split to preserve positive case proportions.' },
    { num: 6, title: 'Handle missing values and standardize features', desc: 'Apply StandardScaler on training partition to normalize feature scales.' },
    { num: 7, title: 'Train Logistic, Ridge and Lasso models', desc: 'Fit basic Logistic Regression, Ridge (L2 penalty), and Lasso (L1 penalty) using Scikit-learn.' },
    { num: 8, title: 'Evaluate and compare the models', desc: 'Calculate Accuracy, Precision, Recall, F1 Score, and ROC-AUC on the held-out test set.' },
    { num: 9, title: 'Analyze model coefficients', desc: 'Inspect weight shrinkage (Ridge) and feature sparsity zeroing (Lasso).' },
    { num: 10, title: 'Predict using the selected trained model', desc: 'Serve the trained model for interactive patient risk evaluation.' },
  ];

  const mlTools = [
    { name: 'Python', role: 'Primary programming language for data analysis and ML' },
    { name: 'Pandas', role: 'Data loading, cleaning, and table manipulation' },
    { name: 'NumPy', role: 'Numerical operations and vector processing' },
    { name: 'Scikit-learn', role: 'LogisticRegression, penalties, scaling, and evaluation metrics' },
    { name: 'Matplotlib', role: 'Plotting ROC curves, loss histories, and charts' },
    { name: 'Seaborn', role: 'Statistical EDA distributions and correlation heatmaps' },
    { name: 'Google Colab', role: 'Cloud notebook development and model training' },
  ];

  const frontendTools = [
    { name: 'React', role: 'Component-based user interface and state management' },
    { name: 'Vite', role: 'Fast frontend bundler and local development server' },
    { name: 'JavaScript & CSS', role: 'Interactive client logic and clean styling' },
    { name: 'Tailwind CSS', role: 'Utility-first layout, responsive design, and typography' },
  ];

  return (
    <section id="about" className="py-12 md:py-20 bg-slate-50 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Section Header */}
        <div className="space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-teal-50 text-teal-800 border border-teal-200">
            <BookOpen className="w-3.5 h-3.5" />
            Project Overview
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 tracking-tight">
            About the Project
          </h2>
          <p className="text-slate-600 text-sm sm:text-base max-w-3xl leading-relaxed">
            <strong>Project Title:</strong> Heart Disease Prediction Using Ridge- and Lasso-Regularized Logistic Regression
          </p>
        </div>

        {/* Project Objective Card */}
        <div className="bg-white p-6 sm:p-7 rounded-2xl border border-slate-200 shadow-2xs space-y-3">
          <h3 className="text-xs font-bold text-teal-800 uppercase tracking-wider">
            Project Objective
          </h3>
          <p className="text-slate-700 text-sm sm:text-base leading-relaxed">
            The objective of this project is to train, evaluate, and compare basic Logistic Regression, Ridge Logistic Regression (L2 regularization), and Lasso Logistic Regression (L1 regularization) using 13 clinical patient attributes from the UCI Cleveland heart disease dataset. The project demonstrates how regularization controls model overfitting, handles multicollinearity between correlated medical tests, and impacts generalization on held-out test data.
          </p>
        </div>

        {/* Visual Pipeline Flow */}
        <div className="space-y-3">
          <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider">
            Simple Machine Learning Pipeline
          </h3>
          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs">
            <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 items-center">
              
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-center space-y-1">
                <div className="w-8 h-8 rounded-lg bg-teal-100 text-teal-800 mx-auto flex items-center justify-center font-bold text-xs">
                  1
                </div>
                <div className="font-bold text-xs text-slate-900">Patient Data</div>
                <div className="text-[11px] text-slate-500">13 Clinical Attributes</div>
              </div>

              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-center space-y-1">
                <div className="w-8 h-8 rounded-lg bg-indigo-100 text-indigo-800 mx-auto flex items-center justify-center font-bold text-xs">
                  2
                </div>
                <div className="font-bold text-xs text-slate-900">Preprocessing</div>
                <div className="text-[11px] text-slate-500">StandardScaler Normalization</div>
              </div>

              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-center space-y-1">
                <div className="w-8 h-8 rounded-lg bg-teal-100 text-teal-800 mx-auto flex items-center justify-center font-bold text-xs">
                  3
                </div>
                <div className="font-bold text-xs text-slate-900">ML Model</div>
                <div className="text-[11px] text-slate-500">Logistic, Ridge (L2), or Lasso (L1)</div>
              </div>

              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-center space-y-1">
                <div className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-800 mx-auto flex items-center justify-center font-bold text-xs">
                  4
                </div>
                <div className="font-bold text-xs text-slate-900">Prediction</div>
                <div className="text-[11px] text-slate-500">Heart Disease (1) or No Disease (0)</div>
              </div>

            </div>
          </div>
        </div>

        {/* The 3 Algorithms in Simple Language */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-bold text-slate-900">
              The Three Algorithms Explained Simply
            </h3>
            <button
              onClick={() => setShowMath(!showMath)}
              className="text-xs text-teal-800 hover:text-teal-950 font-semibold flex items-center gap-1 cursor-pointer"
            >
              <span>{showMath ? 'Hide Math Formulas' : 'View Math Formulas'}</span>
              {showMath ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {/* Standard */}
            <div className="bg-white p-5 rounded-2xl border border-slate-200 space-y-2">
              <span className="text-[10px] uppercase font-mono font-bold text-slate-500">Baseline</span>
              <h4 className="font-bold text-slate-900 text-sm">Logistic Regression</h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                Predicts one of two classes (Heart Disease vs No Heart Disease) using a sigmoid curve. Minimizes standard cross-entropy loss without parameter shrinkage.
              </p>
              {showMath && (
                <div className="mt-2 p-2 bg-slate-50 rounded-lg font-mono text-[11px] text-slate-700 border border-slate-200">
                  Loss = -Σ [y·log(h) + (1-y)·log(1-h)]
                </div>
              )}
            </div>

            {/* Ridge */}
            <div className="bg-white p-5 rounded-2xl border border-teal-300 ring-1 ring-teal-200 space-y-2">
              <span className="text-[10px] uppercase font-mono font-bold text-teal-800">L2 Regularization</span>
              <h4 className="font-bold text-teal-950 text-sm">Ridge Logistic Regression</h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                Adds a penalty based on squared coefficients ($\lambda \sum w_j^2$). It shrinks weights evenly toward zero, which stabilizes predictions when attributes are correlated.
              </p>
              {showMath && (
                <div className="mt-2 p-2 bg-teal-50 rounded-lg font-mono text-[11px] text-teal-900 border border-teal-200">
                  Cost = Loss + λ Σ wⱼ²
                </div>
              )}
            </div>

            {/* Lasso */}
            <div className="bg-white p-5 rounded-2xl border border-indigo-200 space-y-2">
              <span className="text-[10px] uppercase font-mono font-bold text-indigo-800">L1 Regularization</span>
              <h4 className="font-bold text-slate-900 text-sm">Lasso Logistic Regression</h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                Adds a penalty based on absolute coefficient values ($\lambda \sum |w_j|$). It can reduce less informative coefficients completely to zero, performing automatic feature selection.
              </p>
              {showMath && (
                <div className="mt-2 p-2 bg-indigo-50 rounded-lg font-mono text-[11px] text-indigo-900 border border-indigo-200">
                  Cost = Loss + λ Σ |wⱼ|
                </div>
              )}
            </div>
          </div>
        </div>

        {/* 10-Step Workflow */}
        <div className="space-y-4">
          <h3 className="text-base font-bold text-slate-900">
            10-Step Machine Learning Workflow
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
            {workflowSteps.map((s) => (
              <div
                key={s.num}
                className="p-4 rounded-xl bg-white border border-slate-200 space-y-1.5 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <span className="w-6 h-6 rounded-md bg-slate-900 text-white font-mono text-xs font-bold flex items-center justify-center">
                      {s.num}
                    </span>
                    <span className="text-[10px] font-mono text-slate-400">Step {s.num}</span>
                  </div>
                  <h4 className="text-xs font-bold text-slate-900">{s.title}</h4>
                  <p className="text-[11px] text-slate-500 mt-1 leading-relaxed">
                    {s.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Technologies Used (Two Distinct Groups) */}
        <div className="space-y-4">
          <h3 className="text-base font-bold text-slate-900">
            Technologies Used
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* Machine Learning Group */}
            <div className="bg-white p-5 sm:p-6 rounded-2xl border border-slate-200 space-y-3">
              <div className="flex items-center gap-2 pb-2 border-b border-slate-100">
                <Terminal className="w-4 h-4 text-teal-700" />
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900">
                  Machine Learning Stack
                </h4>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {mlTools.map((t) => (
                  <div key={t.name} className="p-2.5 rounded-xl bg-slate-50 border border-slate-200/80">
                    <span className="font-bold text-xs text-slate-900 block">{t.name}</span>
                    <span className="text-[11px] text-slate-500 block leading-tight mt-0.5">{t.role}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Frontend Group */}
            <div className="bg-white p-5 sm:p-6 rounded-2xl border border-slate-200 space-y-3">
              <div className="flex items-center gap-2 pb-2 border-b border-slate-100">
                <Code2 className="w-4 h-4 text-indigo-700" />
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900">
                  Frontend Web Stack
                </h4>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {frontendTools.map((t) => (
                  <div key={t.name} className="p-2.5 rounded-xl bg-slate-50 border border-slate-200/80">
                    <span className="font-bold text-xs text-slate-900 block">{t.name}</span>
                    <span className="text-[11px] text-slate-500 block leading-tight mt-0.5">{t.role}</span>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
};
