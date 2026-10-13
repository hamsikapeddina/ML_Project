import React, { useState } from 'react';
import { Activity, Server, Menu, X, BookOpen, BarChart3, Stethoscope, ChevronRight } from 'lucide-react';

interface HeaderProps {
  backendOnline: boolean | null;
  onOpenBackendGuide: () => void;
  activeSection: string;
}

export const Header: React.FC<HeaderProps> = ({
  backendOnline,
  onOpenBackendGuide,
  activeSection,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { label: 'Home', href: '#home', id: 'home', icon: Activity },
    { label: 'Predict', href: '#predict', id: 'predict', icon: Stethoscope },
    { label: 'Explore Results', href: '#results', id: 'results', icon: BarChart3 },
    { label: 'About', href: '#about', id: 'about', icon: BookOpen },
  ];

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-slate-200 transition-all shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Logo & Academic Title */}
          <a href="#home" className="flex items-center gap-3 group focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-600 rounded-lg p-1">
            <div className="w-11 h-11 rounded-xl bg-slate-900 flex items-center justify-center text-teal-400 shadow-sm border border-slate-800 group-hover:scale-105 transition-transform">
              <Activity className="w-6 h-6 animate-pulse" />
            </div>
            <div>
              <span className="font-bold text-lg sm:text-xl text-slate-900 tracking-tight block">
                Heart Disease Prediction
              </span>
              <p className="text-xs text-slate-500 hidden md:block">
                Prediction using Logistic Regression, Ridge and Lasso
              </p>
            </div>
          </a>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-1 lg:gap-2">
            {navItems.map((item) => {
              const isActive = activeSection === item.id;
              return (
                <a
                  key={item.id}
                  href={item.href}
                  className={`px-3.5 py-2 rounded-lg text-sm font-medium transition-colors ${
                    isActive
                      ? 'bg-slate-100 text-slate-900 font-semibold'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                  }`}
                >
                  {item.label}
                </a>
              );
            })}
          </nav>

          {/* Backend Status & Colab Action */}
          <div className="hidden sm:flex items-center gap-3">
            <button
              onClick={onOpenBackendGuide}
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-medium border border-slate-200 bg-slate-50 text-slate-700 hover:bg-slate-100 transition-colors shadow-2xs cursor-pointer"
              title="Click for Python backend & Colab connection guide"
            >
              <span
                className={`w-2 h-2 rounded-full ${
                  backendOnline === true
                    ? 'bg-emerald-500 shadow-xs shadow-emerald-400'
                    : backendOnline === false
                    ? 'bg-amber-500'
                    : 'bg-slate-400'
                }`}
              />
              <Server className="w-3.5 h-3.5 text-slate-500" />
              <span>
                {backendOnline === true ? 'Python API Connected' : 'Python Model Setup'}
              </span>
            </button>

            <a
              href="#predict"
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-medium bg-slate-900 text-white hover:bg-slate-800 transition-all shadow-xs"
            >
              <span>Start Prediction</span>
              <ChevronRight className="w-4 h-4" />
            </a>
          </div>

          {/* Mobile menu button */}
          <div className="flex md:hidden items-center gap-2">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-100 focus:outline-none"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-slate-200 bg-white px-4 pt-3 pb-5 space-y-2">
          <p className="text-xs text-slate-500 px-3 py-1">
            Prediction using Logistic Regression, Ridge and Lasso
          </p>
          {navItems.map((item) => (
            <a
              key={item.id}
              href={item.href}
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-slate-700 hover:bg-slate-100"
            >
              <item.icon className="w-4 h-4 text-teal-600" />
              {item.label}
            </a>
          ))}
          <div className="pt-2 border-t border-slate-100 flex flex-col gap-2">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenBackendGuide();
              }}
              className="flex items-center justify-between px-3 py-2 text-xs rounded-lg border border-slate-200 bg-slate-50 text-slate-700"
            >
              <span className="flex items-center gap-2">
                <Server className="w-4 h-4 text-slate-500" />
                Python Backend Setup
              </span>
              <span
                className={`w-2 h-2 rounded-full ${
                  backendOnline ? 'bg-emerald-500' : 'bg-amber-500'
                }`}
              />
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
