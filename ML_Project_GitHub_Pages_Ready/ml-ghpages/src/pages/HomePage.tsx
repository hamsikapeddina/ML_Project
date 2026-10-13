import React from 'react';
import { Link } from 'react-router-dom';
import {
  Stethoscope,
  BarChart2,
  Award,
  ArrowRight,
  Database,
  Cpu,
  Activity,
  CheckCircle2,
  ShieldCheck,
  Zap,
  HelpCircle
} from 'lucide-react';
import { useApp } from '../context/AppContext';

export const HomePage: React.FC = () => {
  const { bestModel, selectedModelForPrediction } = useApp();

  return (
    <div className="py-8 sm:py-12 px-4 sm:px-8 max-w-6xl mx-auto space-y-10">
      
      {/* Hero Headline */}
      <div className="space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-teal-50 text-teal-800 border border-teal-200">
          <Activity className="w-3.5 h-3.5" />
          Academic Machine Learning Project • UCI Cleveland Dataset
        </div>

        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight leading-[1.15]">
          Heart Disease Prediction
        </h1>

        <p className="text-lg sm:text-xl font-medium text-teal-800">
          Prediction Using Logistic Regression, Ridge and Lasso
        </p>

        <p className="text-sm sm:text-base text-slate-600 max-w-3xl leading-relaxed">
          An interactive machine learning application that analyzes 13 patient health attributes and demonstrates heart disease classification using standard, Ridge (L2 regularized), and Lasso (L1 regularized) Logistic Regression models.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center gap-3 pt-2">
          <Link
            to="/predict"
            className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-slate-900 text-white text-xs sm:text-sm font-semibold hover:bg-slate-800 transition-all shadow-sm hover:shadow-md"
          >
            <Stethoscope className="w-4 h-4 text-teal-400" />
            <span>Start Prediction</span>
            <ArrowRight className="w-4 h-4" />
          </Link>

          <Link
            to="/eda"
            className="inline-flex items-center gap-2 px-5 py-3.5 rounded-xl bg-white border border-slate-200 text-slate-800 text-xs sm:text-sm font-semibold hover:bg-slate-50 transition-all shadow-2xs"
          >
            <BarChart2 className="w-4 h-4 text-teal-600" />
            <span>Explore Dataset</span>
          </Link>

          <Link
            to="/models"
            className="inline-flex items-center gap-2 px-5 py-3.5 rounded-xl bg-white border border-slate-200 text-slate-800 text-xs sm:text-sm font-semibold hover:bg-slate-50 transition-all shadow-2xs"
          >
            <Award className="w-4 h-4 text-indigo-600" />
            <span>Compare Models</span>
          </Link>
        </div>
      </div>

      {/* Prominent Model Selection Banner */}
      <div className="p-6 rounded-2xl border bg-gradient-to-r from-teal-50/70 to-slate-50 border-teal-200 shadow-2xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <span className="text-[11px] font-bold uppercase tracking-wider text-teal-800 font-mono">
              Final Model Selection Status
            </span>
            <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
              <Award className="w-5 h-5 text-teal-700" />
              {bestModel ? (
                <span>
                  Provisional model (placeholder scores): <strong className="text-teal-900">{bestModel.modelName}</strong>
                </span>
              ) : (
                <span className="text-slate-600">Model selection pending evaluation results</span>
              )}
            </h3>
            <p className="text-xs text-slate-600 max-w-2xl leading-relaxed">
              {bestModel ? (
                <>
                  The current placeholder values show ROC-AUC {bestModel.rocAuc?.toFixed(4)} and accuracy {((bestModel.accuracy || 0) * 100).toFixed(2)}%. These are not verified notebook results and must not be reported as final metrics.
                </>
              ) : (
                'Final model selection will be determined dynamically once notebook evaluation metrics are connected.'
              )}
            </p>
          </div>

          {bestModel && (
            <Link
              to="/models"
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-teal-800 text-white text-xs font-semibold hover:bg-teal-900 transition-colors shrink-0 shadow-2xs"
            >
              <span>View Selection Details</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          )}
        </div>
      </div>

      {/* Compact Project Workflow */}
      <div className="space-y-4">
        <h2 className="text-base font-bold text-slate-900 uppercase tracking-wider text-xs">
          Compact Project Workflow
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-2xs space-y-1.5">
            <div className="w-8 h-8 rounded-lg bg-teal-100 text-teal-800 flex items-center justify-center font-bold text-xs">
              1
            </div>
            <h4 className="font-bold text-xs text-slate-900">UCI Dataset &amp; EDA</h4>
            <p className="text-[11px] text-slate-500 leading-relaxed">
              Explored 303 patient records, class balance, and feature correlations.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-2xs space-y-1.5">
            <div className="w-8 h-8 rounded-lg bg-slate-900 text-white flex items-center justify-center font-bold text-xs">
              2
            </div>
            <h4 className="font-bold text-xs text-slate-900">Standardization</h4>
            <p className="text-[11px] text-slate-500 leading-relaxed">
              StandardScaler normalizes features to prevent high-scale dominance.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-2xs space-y-1.5">
            <div className="w-8 h-8 rounded-lg bg-indigo-100 text-indigo-800 flex items-center justify-center font-bold text-xs">
              3
            </div>
            <h4 className="font-bold text-xs text-slate-900">Regularization Training</h4>
            <p className="text-[11px] text-slate-500 leading-relaxed">
              Trained Logistic Regression, Ridge (L2 shrinkage), and Lasso (L1 sparsity).
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-2xs space-y-1.5">
            <div className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold text-xs">
              4
            </div>
            <h4 className="font-bold text-xs text-slate-900">Evaluation &amp; Inference</h4>
            <p className="text-[11px] text-slate-500 leading-relaxed">
              Model comparison preview. Verify the winning model using your executed notebook before final inference.
            </p>
          </div>
        </div>
      </div>

      {/* Feature Highlights Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        <Link
          to="/predict"
          className="p-5 rounded-2xl bg-white border border-slate-200 hover:border-teal-300 hover:shadow-xs transition-all space-y-2 group"
        >
          <div className="w-9 h-9 rounded-xl bg-teal-50 text-teal-700 flex items-center justify-center">
            <Stethoscope className="w-5 h-5" />
          </div>
          <h3 className="font-bold text-sm text-slate-900 group-hover:text-teal-800 transition-colors">
            Patient Prediction
          </h3>
          <p className="text-xs text-slate-500 leading-relaxed">
            Test pre-configured sample patient profiles or enter custom clinical data across 13 health attributes.
          </p>
        </Link>

        <Link
          to="/eda"
          className="p-5 rounded-2xl bg-white border border-slate-200 hover:border-teal-300 hover:shadow-xs transition-all space-y-2 group"
        >
          <div className="w-9 h-9 rounded-xl bg-slate-100 text-slate-700 flex items-center justify-center">
            <BarChart2 className="w-5 h-5" />
          </div>
          <h3 className="font-bold text-sm text-slate-900 group-hover:text-teal-800 transition-colors">
            Exploratory Data Analysis
          </h3>
          <p className="text-xs text-slate-500 leading-relaxed">
            Inspect real dataset distributions including target balance, age profiles, chest pain categories, and correlation heatmap.
          </p>
        </Link>

        <Link
          to="/models"
          className="p-5 rounded-2xl bg-white border border-slate-200 hover:border-teal-300 hover:shadow-xs transition-all space-y-2 group"
        >
          <div className="w-9 h-9 rounded-xl bg-indigo-50 text-indigo-700 flex items-center justify-center">
            <Award className="w-5 h-5" />
          </div>
          <h3 className="font-bold text-sm text-slate-900 group-hover:text-teal-800 transition-colors">
            Model Comparison &amp; Selection
          </h3>
          <p className="text-xs text-slate-500 leading-relaxed">
            Compare Logistic, Ridge and Lasso metrics, confusion matrix, ROC curves, and view the winning model.
          </p>
        </Link>
      </div>

    </div>
  );
};
