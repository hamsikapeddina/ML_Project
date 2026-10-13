import React from 'react';
import { Activity, ShieldAlert, ArrowUp } from 'lucide-react';

interface FooterProps {
  onOpenBackendGuide: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenBackendGuide }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-slate-900 text-slate-300 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8">
        
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
          
          {/* Col 1: Project Title & Subtitle */}
          <div className="md:col-span-6 space-y-3">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-teal-500/20 text-teal-400 flex items-center justify-center border border-teal-500/30">
                <Activity className="w-4 h-4" />
              </div>
              <span className="font-bold text-white text-base tracking-tight">
                Heart Disease Prediction
              </span>
              <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-slate-800 text-teal-400 border border-slate-700">
                Machine Learning College Project
              </span>
            </div>

            <p className="text-xs text-slate-400 leading-relaxed max-w-md">
              A regularized machine learning study comparing Logistic Regression, Ridge (L2), and Lasso (L1) on 13 clinical attributes of the UCI Cleveland Heart Disease dataset.
            </p>
          </div>

          {/* Col 2: Navigation Links */}
          <div className="md:col-span-3 space-y-2">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">
              Navigation
            </h4>
            <ul className="space-y-1.5 text-xs text-slate-400">
              <li>
                <a href="#home" className="hover:text-teal-400 transition-colors">
                  Home
                </a>
              </li>
              <li>
                <a href="#predict" className="hover:text-teal-400 transition-colors">
                  Predict
                </a>
              </li>
              <li>
                <a href="#results" className="hover:text-teal-400 transition-colors">
                  Explore Results
                </a>
              </li>
              <li>
                <a href="#about" className="hover:text-teal-400 transition-colors">
                  About
                </a>
              </li>
            </ul>
          </div>

          {/* Col 3: Backend Guide Link */}
          <div className="md:col-span-3 space-y-2">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">
              Python Backend
            </h4>
            <p className="text-xs text-slate-400">
              Connect your Google Colab or local Python model via FastAPI / Flask.
            </p>
            <button
              onClick={onOpenBackendGuide}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 text-teal-300 hover:bg-slate-700 hover:text-teal-200 text-xs font-medium border border-slate-700 transition-colors cursor-pointer"
            >
              <span>Backend Setup &amp; Code</span>
            </button>
          </div>

        </div>

        {/* Academic Disclaimer */}
        <div className="p-4 rounded-xl bg-slate-800/80 border border-slate-700/80 text-xs text-slate-400 flex items-start gap-3">
          <ShieldAlert className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
          <p className="leading-relaxed">
            <strong className="text-white">Disclaimer:</strong> This application is an academic machine-learning demonstration. Its predictions are not a medical diagnosis and should not be used as a substitute for professional medical advice.
          </p>
        </div>

        {/* Bottom Bar */}
        <div className="pt-6 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div>
            Heart Disease Prediction Using Ridge- and Lasso-Regularized Logistic Regression • Machine Learning College Project
          </div>
          <button
            onClick={scrollToTop}
            className="flex items-center gap-1.5 text-slate-400 hover:text-white transition-colors cursor-pointer"
          >
            <span>Back to top</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>

      </div>
    </footer>
  );
};
