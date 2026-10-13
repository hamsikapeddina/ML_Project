import React, { useState } from 'react';
import { FEATURE_METADATA } from '../data/featureMetadata';
import { BookOpen, HelpCircle, Layers, Check, Search, ShieldCheck } from 'lucide-react';

export const FeatureInformation: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredFeatures = FEATURE_METADATA.filter(
    (f) =>
      f.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      f.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (f.originalName && f.originalName.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <section className="py-12 md:py-20 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div className="space-y-2 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-teal-50 text-teal-800 border border-teal-200">
              <BookOpen className="w-3.5 h-3.5" />
              Dataset Clinical Dictionary
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Understanding the Patient Features
            </h2>
            <p className="text-slate-600 text-sm sm:text-base">
              A comprehensive guide to the 13 input attributes used by the regularized logistic regression model.
            </p>
          </div>

          {/* Search filter input */}
          <div className="relative min-w-[240px]">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
            <input
              type="text"
              placeholder="Search features (e.g. oldpeak, thal)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3.5 py-2 text-xs rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 transition-all"
            />
          </div>
        </div>

        {/* Feature Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
          {filteredFeatures.map((f, idx) => (
            <div
              key={f.key}
              className="p-5 rounded-2xl border border-slate-200/90 bg-slate-50/50 hover:bg-white hover:border-slate-300 hover:shadow-xs transition-all space-y-3 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="w-6 h-6 rounded-lg bg-slate-200/80 text-slate-700 font-mono text-xs font-bold flex items-center justify-center">
                      {idx + 1}
                    </span>
                    <h3 className="font-bold text-slate-900 text-sm">{f.name}</h3>
                  </div>
                  {f.originalName && (
                    <span className="font-mono text-[11px] bg-slate-200/70 text-slate-700 px-2 py-0.5 rounded">
                      {f.originalName}
                    </span>
                  )}
                </div>

                <p className="text-xs text-slate-600 mt-2.5 leading-relaxed">
                  {f.description}
                </p>

                {/* Range or options breakdown */}
                {f.options && (
                  <div className="mt-3 pt-2.5 border-t border-slate-200/60 space-y-1">
                    <span className="text-[10px] font-semibold text-slate-500 uppercase tracking-wider block">
                      Dataset Codes:
                    </span>
                    <div className="space-y-1">
                      {f.options.map((opt) => (
                        <div key={opt.value} className="text-[11px] text-slate-700 flex items-start gap-1.5">
                          <span className="w-1.5 h-1.5 rounded-full bg-teal-600 mt-1 shrink-0" />
                          <span>
                            <strong className="text-slate-900">{opt.label}:</strong> {opt.detail}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {f.min !== undefined && f.max !== undefined && (
                  <div className="mt-2.5 pt-2 border-t border-slate-200/60 text-[11px] text-slate-500 flex justify-between">
                    <span>Clinical Scale:</span>
                    <span className="font-mono text-slate-700 font-medium">
                      {f.min} – {f.max} {f.unit}
                    </span>
                  </div>
                )}
              </div>

              {/* Clinical significance note */}
              <div className="pt-2 text-[11px] text-slate-500 border-t border-slate-100 flex items-start gap-1.5 italic">
                <span>Significance: {f.clinicalSignificance}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Academic Note */}
        <div className="p-4 rounded-xl bg-teal-50/70 border border-teal-200 text-xs text-teal-900 flex items-start gap-3">
          <ShieldCheck className="w-4 h-4 text-teal-700 shrink-0 mt-0.5" />
          <p className="leading-relaxed">
            <strong className="text-teal-950">Multivariate Analysis Principle:</strong> No single attribute determines whether someone has coronary heart disease. Regularized logistic regression learns optimal weights across all 13 dimensions simultaneously, weighting informative markers while dampening noisy or collinear features.
          </p>
        </div>

      </div>
    </section>
  );
};
