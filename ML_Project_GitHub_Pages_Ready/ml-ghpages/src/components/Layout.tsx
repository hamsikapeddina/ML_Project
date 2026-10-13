import React, { useState } from 'react';
import { NavLink, Outlet, useLocation } from 'react-router-dom';
import {
  Activity,
  Stethoscope,
  BarChart2,
  Award,
  BookOpen,
  Server,
  Menu,
  X,
  ChevronRight,
  ShieldAlert
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { BackendGuideModal } from './BackendGuideModal';

export const Layout: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const {
    backendOnline,
    checkBackend,
    isGuideModalOpen,
    setIsGuideModalOpen,
    bestModel,
    selectedModelForPrediction,
  } = useApp();

  const navItems = [
    { path: '/', label: 'Home', icon: Activity },
    { path: '/predict', label: 'Patient Prediction', icon: Stethoscope },
    { path: '/eda', label: 'Exploratory Data Analysis', icon: BarChart2 },
    { path: '/models', label: 'Model Comparison', icon: Award },
    { path: '/about', label: 'About the Project', icon: BookOpen },
  ];

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col md:flex-row selection:bg-teal-500 selection:text-white font-sans antialiased">
      
      {/* ========================================================================= */}
      {/* DESKTOP PERSISTENT SIDEBAR */}
      {/* ========================================================================= */}
      <aside className="hidden md:flex flex-col w-72 bg-white border-r border-slate-200 h-screen sticky top-0 shrink-0 z-40">
        
        {/* Brand & Title */}
        <div className="p-6 border-b border-slate-100">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-slate-900 flex items-center justify-center text-teal-400 shadow-sm shrink-0">
              <Activity className="w-5 h-5 animate-pulse" />
            </div>
            <div>
              <h1 className="font-bold text-base text-slate-900 tracking-tight leading-tight">
                Heart Disease Prediction
              </h1>
              <p className="text-[11px] text-slate-500 leading-tight mt-0.5">
                Prediction using Logistic Regression, Ridge and Lasso
              </p>
            </div>
          </div>
        </div>

        {/* Navigation Links */}
        <nav className="flex-1 px-3 py-6 space-y-1 overflow-y-auto">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `flex items-center justify-between px-3.5 py-3 rounded-xl text-xs font-semibold transition-all ${
                  isActive
                    ? 'bg-slate-900 text-white shadow-xs'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                }`
              }
            >
              <div className="flex items-center gap-3">
                <item.icon className="w-4 h-4 shrink-0" />
                <span>{item.label}</span>
              </div>
              <ChevronRight className="w-3.5 h-3.5 opacity-40" />
            </NavLink>
          ))}
        </nav>

        {/* Sidebar Footer: Model Status & Backend Probing */}
        <div className="p-4 border-t border-slate-100 space-y-3 bg-slate-50/50">
          
          {/* Active Model Indicator */}
          <div className="p-3 rounded-xl bg-white border border-slate-200 text-xs space-y-1">
            <div className="text-[10px] uppercase font-mono font-bold text-slate-400">
              Active Model for Prediction
            </div>
            <div className="font-semibold text-slate-800 text-xs truncate" title={selectedModelForPrediction}>
              {selectedModelForPrediction}
            </div>
            {bestModel && (
              <div className="text-[10px] text-teal-700 font-medium">
                Best ROC-AUC: {bestModel.rocAuc?.toFixed(4)}
              </div>
            )}
          </div>

          {/* Backend Connection status */}
          <button
            onClick={() => setIsGuideModalOpen(true)}
            className="w-full flex items-center justify-between px-3 py-2 rounded-xl border border-slate-200 bg-white text-slate-700 hover:bg-slate-50 transition-colors text-xs cursor-pointer shadow-2xs"
            title="Configure Python backend"
          >
            <div className="flex items-center gap-2 truncate">
              <span
                className={`w-2 h-2 rounded-full shrink-0 ${
                  backendOnline === true
                    ? 'bg-emerald-500 ring-2 ring-emerald-200'
                    : backendOnline === false
                    ? 'bg-amber-500 ring-2 ring-amber-200'
                    : 'bg-slate-400'
                }`}
              />
              <span className="truncate">
                {backendOnline === true ? 'Python Connected' : 'Python Model Setup'}
              </span>
            </div>
            <Server className="w-3.5 h-3.5 text-slate-400 shrink-0" />
          </button>
        </div>

      </aside>

      {/* ========================================================================= */}
      {/* MOBILE TOP NAVIGATION BAR */}
      {/* ========================================================================= */}
      <header className="md:hidden sticky top-0 z-50 bg-white border-b border-slate-200 px-4 py-3 flex items-center justify-between shadow-2xs">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-slate-900 flex items-center justify-center text-teal-400 shadow-sm shrink-0">
            <Activity className="w-4 h-4 animate-pulse" />
          </div>
          <div>
            <span className="font-bold text-sm text-slate-900 tracking-tight block">
              Heart Disease Prediction
            </span>
            <span className="text-[10px] text-slate-500 block">
              Prediction using Logistic, Ridge &amp; Lasso
            </span>
          </div>
        </div>

        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="p-2 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-100"
          aria-label="Toggle Navigation"
        >
          {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </header>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden fixed inset-x-0 top-[57px] bottom-0 z-50 bg-white p-5 border-b border-slate-200 overflow-y-auto space-y-4">
          <nav className="space-y-1.5">
            {navItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                onClick={() => setMobileMenuOpen(false)}
                className={({ isActive }) =>
                  `flex items-center justify-between px-4 py-3 rounded-xl text-sm font-semibold transition-all ${
                    isActive
                      ? 'bg-slate-900 text-white'
                      : 'text-slate-700 hover:bg-slate-100'
                  }`
                }
              >
                <div className="flex items-center gap-3">
                  <item.icon className="w-4 h-4" />
                  <span>{item.label}</span>
                </div>
                <ChevronRight className="w-4 h-4 opacity-40" />
              </NavLink>
            ))}
          </nav>

          <div className="pt-3 border-t border-slate-100 space-y-2">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                setIsGuideModalOpen(true);
              }}
              className="w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-slate-700 text-xs font-semibold"
            >
              <div className="flex items-center gap-2">
                <span
                  className={`w-2 h-2 rounded-full ${
                    backendOnline ? 'bg-emerald-500' : 'bg-amber-500'
                  }`}
                />
                <span>Python Model Setup</span>
              </div>
              <Server className="w-4 h-4 text-slate-500" />
            </button>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* MAIN CONTENT AREA */}
      {/* ========================================================================= */}
      <div className="flex-1 flex flex-col min-w-0">
        <main className="flex-1">
          <Outlet />
        </main>

        {/* Global Footer */}
        <footer className="border-t border-slate-200 bg-white py-8 px-4 sm:px-8 text-xs text-slate-500">
          <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              Heart Disease Prediction Using Ridge- and Lasso-Regularized Logistic Regression
            </div>
            <div className="text-[11px] text-slate-400">
              Academic Machine Learning Project • UCI Cleveland Dataset
            </div>
          </div>
        </footer>
      </div>

      {/* Backend & Windows Instructions Modal */}
      <BackendGuideModal
        isOpen={isGuideModalOpen}
        onClose={() => setIsGuideModalOpen(false)}
        onRefreshBackend={checkBackend}
        backendOnline={backendOnline}
      />

    </div>
  );
};
