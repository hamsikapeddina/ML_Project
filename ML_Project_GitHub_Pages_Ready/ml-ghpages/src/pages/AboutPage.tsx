import React, { useState } from 'react';
import {
  BookOpen,
  ArrowRight,
  Database,
  Cpu,
  Layers,
  ChevronDown,
  ChevronUp,
  Code2,
  Terminal,
  Activity,
  CheckCircle2
} from 'lucide-react';
import { Link } from 'react-router-dom';

export const AboutPage: React.FC = () => {
  const [showMath, setShowMath] = useState(false);

  const workflowSteps = [
    { num: 1, title: 'Load the heart disease dataset', desc: 'Import the UCI Cleveland dataset (303 records) into pandas DataFrame.' },
    { num: 2, title: 'Inspect data and missing values', desc: 'Verify column types, distributions, and check for missing clinical attributes.' },
    { num: 3, title: 'Perform EDA', desc: 'Examine target class balance, patient age distributions, and correlation heatmap.' },
    { num: 4, title: 'Prepare input features and target', desc: 'Separate the 13 clinical attributes (X) from the binary target label (y ∈ {0, 1}).' },
    { num: 5, title: 'Split data into train and test sets', desc: 'Perform stratified 80/20 train/test split to preserve target ratio.' },
    { num: 6, title: 'Handle missing values and standardize features', desc: 'Apply StandardScaler to normalize continuous features to zero mean and unit variance.' },
    { num: 7, title: 'Train Logistic, Ridge and Lasso models', desc: 'Fit baseline Logistic Regression, Ridge (L2 penalty), and Lasso (L1 penalty) using Scikit-learn.' },
    { num: 8, title: 'Evaluate and compare the models', desc: 'Calculate Accuracy, Precision, Recall, F1 Score, and ROC-AUC on the held-out test partition.' },
    { num: 9, title: 'Analyze model coefficients', desc: 'Inspect feature shrinkage (Ridge) and feature sparsity zeroing (Lasso).' },
    { num: 10, title: 'Predict using the selected trained model', desc: 'Deploy the champion model pipeline for real-time patient risk inference.' },
  ];

  const mlTools = [
    { name: 'Python', role: 'Primary programming language for data analysis and ML' },
    { name: 'Pandas', role: 'Tabular data ingestion, cleaning, and transformation' },
    { name: 'NumPy', role: 'Array calculations, matrix algebra, and vectorization' },
    { name: 'Scikit-learn', role: 'LogisticRegression, L1/L2 penalties, StandardScaler, metrics' },
    { name: 'Matplotlib', role: 'Plotting ROC curves, loss trajectories, and distributions' },
    { name: 'Seaborn', role: 'Correlation heatmaps and statistical data visualizations' },
    { name: 'Google Colab', role: 'Cloud GPU/CPU Jupyter notebook environment' },
  ];

  const frontendTools = [
    { name: 'React & React Router', role: 'Multi-page client component architecture and routing' },
    { name: 'Vite', role: 'Next-generation build tool and local development runtime' },
    { name: 'TypeScript', role: 'Type safety for 13 medical features and API payloads' },
    { name: 'Tailwind CSS', role: 'Modern utility layout, typography, and responsive styling' },
  ];

  return (
    <div className="py-6 sm:py-10 px-4 sm:px-8 max-w-6xl mx-auto space-y-10">
      
      {/* Page Header */}
      <div className="space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-teal-50 text-teal-800 border border-teal-200">
          <BookOpen className="w-3.5 h-3.5" />
          Academic Overview
        </div>
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 tracking-tight">
          About the Project
        </h1>
        <p className="text-sm sm:text-base text-slate-600">
          <strong>Title:</strong> Heart Disease Prediction Using Ridge- and Lasso-Regularized Logistic Regression
        </p>
      </div>

      {/* Project Objective & Dataset Description */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Objective */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-2xs space-y-2.5">
          <h2 className="text-xs font-bold text-teal-800 uppercase tracking-wider">
            Project Objective
          </h2>
          <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
            To train, quantitatively evaluate, and compare baseline Logistic Regression, Ridge Logistic Regression (L2 regularization), and Lasso Logistic Regression (L1 regularization) using 13 clinical patient attributes. The goal is to study how regularization penalty terms control model variance, address multicollinearity among hemodynamic biomarkers, and improve generalization.
          </p>
        </div>

        {/* Dataset Description */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-2xs space-y-2.5">
          <h2 className="text-xs font-bold text-teal-800 uppercase tracking-wider">
            Dataset Description &amp; Target
          </h2>
          <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
            The project uses the <strong>UCI Cleveland Heart Disease dataset</strong>, containing 303 patient records across 13 health attributes (age, blood pressure, cholesterol, resting ECG, stress thallium scintigraphy, etc.).
          </p>
          <div className="pt-2 flex items-center gap-2 text-xs font-mono">
            <span className="font-bold text-slate-800">Binary Target:</span>
            <span className="bg-emerald-50 text-emerald-800 px-2 py-0.5 rounded border border-emerald-200">
              0 = No Disease
            </span>
            <span className="bg-rose-50 text-rose-800 px-2 py-0.5 rounded border border-rose-200">
              1 = Disease
            </span>
          </div>
        </div>

      </div>

      {/* Algorithm Explanations (Simple Language) */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-base font-bold text-slate-900">
            The Three Algorithms Explained
          </h2>
          <button
            onClick={() => setShowMath(!showMath)}
            className="text-xs text-teal-800 hover:text-teal-950 font-semibold flex items-center gap-1 cursor-pointer"
          >
            <span>{showMath ? 'Hide Math Formulas' : 'View Math Formulas'}</span>
            {showMath ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          
          {/* Logistic Regression */}
          <div className="bg-white p-5 rounded-2xl border border-slate-200 space-y-2">
            <span className="text-[10px] uppercase font-mono font-bold text-slate-500">Unconstrained</span>
            <h3 className="font-bold text-slate-900 text-sm">Logistic Regression</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Predicts one of two classes (Heart Disease vs No Disease) by fitting a sigmoid curve to a linear combination of features. It minimizes binary cross-entropy loss without parameter shrinkage.
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
            <h3 className="font-bold text-teal-950 text-sm">Ridge Logistic Regression</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Adds a penalty based on squared coefficients (λ Σ wⱼ²). It shrinks weights smoothly toward zero, which stabilizes predictions and handles correlated clinical measurements (multicollinearity).
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
            <h3 className="font-bold text-slate-900 text-sm">Lasso Logistic Regression</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Adds a penalty based on absolute coefficient values (λ Σ |wⱼ|). It drives less informative feature weights completely to zero, performing automated feature selection and producing a sparse model.
            </p>
            {showMath && (
              <div className="mt-2 p-2 bg-indigo-50 rounded-lg font-mono text-[11px] text-indigo-900 border border-indigo-200">
                Cost = Loss + λ Σ |wⱼ|
              </div>
            )}
          </div>

        </div>
      </div>

      {/* Ten-Step Project Workflow */}
      <div className="space-y-4">
        <h2 className="text-base font-bold text-slate-900">
          Ten-Step Project Workflow
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
          {workflowSteps.map((step) => (
            <div
              key={step.num}
              className="p-4 rounded-xl bg-white border border-slate-200 space-y-1.5 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-1">
                  <span className="w-6 h-6 rounded-md bg-slate-900 text-white font-mono text-xs font-bold flex items-center justify-center">
                    {step.num}
                  </span>
                  <span className="text-[10px] font-mono text-slate-400">Step {step.num}</span>
                </div>
                <h3 className="text-xs font-bold text-slate-900">{step.title}</h3>
                <p className="text-[11px] text-slate-500 mt-1 leading-relaxed">
                  {step.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Technology Stack in Two Groups */}
      <div className="space-y-4">
        <h2 className="text-base font-bold text-slate-900">
          Technologies Used
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          {/* Machine Learning */}
          <div className="bg-white p-5 sm:p-6 rounded-2xl border border-slate-200 space-y-3">
            <div className="flex items-center gap-2 pb-2 border-b border-slate-100">
              <Terminal className="w-4 h-4 text-teal-700" />
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-900">
                Machine Learning &amp; Data Science
              </h3>
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

          {/* Frontend */}
          <div className="bg-white p-5 sm:p-6 rounded-2xl border border-slate-200 space-y-3">
            <div className="flex items-center gap-2 pb-2 border-b border-slate-100">
              <Code2 className="w-4 h-4 text-indigo-700" />
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-900">
                Frontend Web Presentation
              </h3>
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

      {/* Navigation action */}
      <div className="flex justify-between items-center pt-4 border-t border-slate-200">
        <Link
          to="/"
          className="text-xs font-semibold text-slate-600 hover:text-slate-900"
        >
          &larr; Back to Home
        </Link>
        <Link
          to="/predict"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-slate-900 text-white text-xs font-semibold hover:bg-slate-800 transition-colors"
        >
          <span>Go to Patient Prediction</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>

    </div>
  );
};
