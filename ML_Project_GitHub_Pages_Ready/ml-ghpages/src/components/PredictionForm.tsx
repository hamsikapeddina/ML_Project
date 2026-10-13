import React, { useState } from 'react';
import { PatientData, PredictionRequest, PredictionResponse, SelectedModel } from '../types/heartDisease';
import { SAMPLE_PATIENTS, EMPTY_PATIENT_DATA } from '../data/samplePatients';
import { predictHeartDisease } from '../services/predictionService';
import { ResultsPanel, PanelState } from './ResultsPanel';
import {
  Activity,
  RotateCcw,
  ChevronDown,
  Info,
  UserCheck
} from 'lucide-react';

interface PredictionFormProps {
  onOpenBackendGuide: () => void;
  backendOnline: boolean | null;
}

export const PredictionForm: React.FC<PredictionFormProps> = ({
  onOpenBackendGuide,
  backendOnline,
}) => {
  // Sample selection & model choice
  const [selectedSampleId, setSelectedSampleId] = useState<string>('sample-1');
  const [selectedModel, setSelectedModel] = useState<SelectedModel>('Ridge Logistic Regression');

  // Form input data
  const [formData, setFormData] = useState<PatientData>(SAMPLE_PATIENTS[0].data);
  const [errors, setErrors] = useState<Record<string, string>>({});

  // Right-hand results panel states: 'idle' | 'loading' | 'success' | 'error'
  const [panelState, setPanelState] = useState<PanelState>('idle');
  const [predictionResult, setPredictionResult] = useState<PredictionResponse | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Demo presentation mode toggle
  const [demoMode, setDemoMode] = useState<boolean>(true);

  // Handle sample patient dropdown selection
  const handleSampleChange = (sampleId: string) => {
    setSelectedSampleId(sampleId);
    if (sampleId === 'custom') {
      setFormData({ ...EMPTY_PATIENT_DATA });
    } else {
      const found = SAMPLE_PATIENTS.find((p) => p.id === sampleId);
      if (found) {
        setFormData({ ...found.data });
      }
    }
    setErrors({});
    setErrorMessage(null);
    setPanelState('idle');
    setPredictionResult(null);
  };

  // Generic field update
  const handleFieldChange = (field: keyof PatientData, value: any) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));

    if (errors[field]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[field];
        return next;
      });
    }

    if (selectedSampleId !== 'custom') {
      setSelectedSampleId('custom');
    }
  };

  // Validate all 13 attributes
  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    // 1. Age
    if (formData.Age === '' || isNaN(Number(formData.Age))) {
      newErrors.Age = 'Enter patient age in years.';
    } else if (Number(formData.Age) < 18 || Number(formData.Age) > 120) {
      newErrors.Age = 'Age must be between 18 and 120.';
    }

    // 2. Sex
    if (formData.Sex !== 0 && formData.Sex !== 1) {
      newErrors.Sex = 'Select biological sex.';
    }

    // 3. Chest Pain Type
    if (![1, 2, 3, 4].includes(Number(formData.Chest_Pain_Type))) {
      newErrors.Chest_Pain_Type = 'Select chest pain type.';
    }

    // 4. Resting Blood Pressure
    if (formData.Resting_Blood_Pressure === '' || isNaN(Number(formData.Resting_Blood_Pressure))) {
      newErrors.Resting_Blood_Pressure = 'Enter resting blood pressure.';
    } else if (Number(formData.Resting_Blood_Pressure) < 60 || Number(formData.Resting_Blood_Pressure) > 260) {
      newErrors.Resting_Blood_Pressure = 'Must be 60 to 260 mm Hg.';
    }

    // 5. Cholesterol
    if (formData.Cholesterol === '' || isNaN(Number(formData.Cholesterol))) {
      newErrors.Cholesterol = 'Enter cholesterol level.';
    } else if (Number(formData.Cholesterol) < 80 || Number(formData.Cholesterol) > 650) {
      newErrors.Cholesterol = 'Must be 80 to 650 mg/dL.';
    }

    // 6. Fasting Blood Sugar
    if (formData.Fasting_Blood_Sugar !== 0 && formData.Fasting_Blood_Sugar !== 1) {
      newErrors.Fasting_Blood_Sugar = 'Choose Yes or No.';
    }

    // 7. Resting ECG
    if (![0, 1, 2].includes(Number(formData.Resting_ECG))) {
      newErrors.Resting_ECG = 'Select resting ECG category.';
    }

    // 8. Maximum Heart Rate
    if (formData.Maximum_Heart_Rate === '' || isNaN(Number(formData.Maximum_Heart_Rate))) {
      newErrors.Maximum_Heart_Rate = 'Enter max heart rate.';
    } else if (Number(formData.Maximum_Heart_Rate) < 50 || Number(formData.Maximum_Heart_Rate) > 250) {
      newErrors.Maximum_Heart_Rate = 'Must be 50 to 250 bpm.';
    }

    // 9. Exercise-Induced Angina
    if (formData.Exercise_Induced_Angina !== 0 && formData.Exercise_Induced_Angina !== 1) {
      newErrors.Exercise_Induced_Angina = 'Choose Yes or No.';
    }

    // 10. ST Depression (oldpeak)
    if (formData.ST_Depression === '' || isNaN(Number(formData.ST_Depression))) {
      newErrors.ST_Depression = 'Enter ST depression measurement.';
    } else if (Number(formData.ST_Depression) < 0 || Number(formData.ST_Depression) > 10.0) {
      newErrors.ST_Depression = 'Must be 0.0 to 10.0 mm.';
    }

    // 11. ST Segment Slope
    if (![1, 2, 3].includes(Number(formData.ST_Segment_Slope))) {
      newErrors.ST_Segment_Slope = 'Select ST slope category.';
    }

    // 12. Major Vessels
    if (![0, 1, 2, 3].includes(Number(formData.Major_Vessels))) {
      newErrors.Major_Vessels = 'Select major vessels count.';
    }

    // 13. Thalassemia
    if (![3, 6, 7].includes(Number(formData.Thalassemia))) {
      newErrors.Thalassemia = 'Select Thalassemia category.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle Predict submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    // 1. Validate all 13 fields
    if (!validateForm()) {
      return;
    }

    // 2. Set panel state to loading in the right-side panel
    setPanelState('loading');

    try {
      // 3. Dispatch prediction request
      const response = await predictHeartDisease(
        formData as PredictionRequest,
        selectedModel,
        demoMode
      );
      // 4. Update panel state to success without resetting patient values or scrolling
      setPredictionResult(response);
      setPanelState('success');
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Prediction request failed.';
      setErrorMessage(msg);
      setPanelState('error');
    }
  };

  // Clear Form handler
  const handleClearForm = () => {
    setFormData({ ...EMPTY_PATIENT_DATA });
    setSelectedSampleId('custom');
    setErrors({});
    setErrorMessage(null);
    setPredictionResult(null);
    setPanelState('idle');
  };

  // Reset results panel when user clicks Try Another Patient
  const handleTryAnother = () => {
    setPanelState('idle');
    setPredictionResult(null);
    setErrorMessage(null);
  };

  const activeSampleProfile = SAMPLE_PATIENTS.find((p) => p.id === selectedSampleId);

  return (
    <section id="predict" className="py-12 md:py-16 bg-slate-50/60 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        
        {/* Section Heading */}
        <div className="max-w-3xl space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-teal-50 text-teal-800 border border-teal-200">
            <UserCheck className="w-3.5 h-3.5" />
            Patient Details &amp; Prediction
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
            Patient Risk Prediction
          </h2>
          <p className="text-slate-600 text-sm sm:text-base">
            Select a sample profile or enter patient details to evaluate risk using regularized logistic regression.
          </p>
        </div>

        {/* TWO-COLUMN LAYOUT (Desktop: Left 60% Form, Right 40% Sticky Results Panel) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* ========================================================================= */}
          {/* LEFT SIDE: PATIENT DETAILS FORM (~60% width: 7 of 12 cols) */}
          {/* ========================================================================= */}
          <div className="lg:col-span-7 bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
            
            {/* Top Controls: Sample Selection, Model, and Demo Toggle */}
            <div className="p-5 sm:p-6 bg-slate-50/90 border-b border-slate-200 space-y-4">
              
              {/* Row: Sample Dropdown & Model Selector */}
              <div className="space-y-4">
                
                {/* Sample Patient Dropdown */}
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between">
                    <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                      Choose a Sample Patient
                    </label>
                    {demoMode && (
                      <span className="text-[11px] font-semibold text-amber-700 bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
                        Demo Mode Enabled
                      </span>
                    )}
                  </div>
                  <div className="relative">
                    <select
                      value={selectedSampleId}
                      onChange={(e) => handleSampleChange(e.target.value)}
                      className="w-full appearance-none bg-white border border-slate-300 rounded-xl px-3.5 py-2.5 text-sm text-slate-800 font-medium focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-all cursor-pointer pr-10"
                    >
                      {SAMPLE_PATIENTS.map((p) => (
                        <option key={p.id} value={p.id}>
                          {p.title}
                        </option>
                      ))}
                      <option value="custom">Custom Patient (Enter Manually)</option>
                    </select>
                    <ChevronDown className="w-4 h-4 text-slate-400 absolute right-3.5 top-3.5 pointer-events-none" />
                  </div>
                  <p className="text-[11px] text-slate-500">
                    {selectedSampleId === 'custom'
                      ? 'Manual mode: Enter all 13 patient values below.'
                      : activeSampleProfile?.description}
                  </p>
                </div>

                {/* Model Selector Tabs & Demo Switch */}
                <div className="grid grid-cols-1 sm:grid-cols-12 gap-3 items-center pt-1 border-t border-slate-200/60">
                  <div className="sm:col-span-8 space-y-1">
                    <label className="text-[11px] font-bold text-slate-600 uppercase tracking-wider block">
                      Target Model
                    </label>
                    <div className="grid grid-cols-3 gap-1 bg-slate-200/70 p-1 rounded-xl">
                      {(['Logistic Regression', 'Ridge Logistic Regression', 'Lasso Logistic Regression'] as SelectedModel[]).map((m) => {
                        const isSelected = selectedModel === m;
                        const label = m === 'Logistic Regression' ? 'Logistic' : m === 'Ridge Logistic Regression' ? 'Ridge (L2)' : 'Lasso (L1)';
                        return (
                          <button
                            key={m}
                            type="button"
                            onClick={() => setSelectedModel(m)}
                            className={`py-1.5 px-2 rounded-lg text-xs font-semibold transition-all cursor-pointer text-center truncate ${
                              isSelected
                                ? 'bg-white text-slate-900 shadow-xs'
                                : 'text-slate-600 hover:text-slate-900'
                            }`}
                            title={m}
                          >
                            {label}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  <div className="sm:col-span-4 flex sm:justify-end items-center gap-2 pt-1 sm:pt-4">
                    <span className="text-xs text-slate-600 font-medium">Demo Mode:</span>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={demoMode}
                        onChange={(e) => setDemoMode(e.target.checked)}
                        className="sr-only peer"
                      />
                      <div className="w-9 h-5 bg-slate-300 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-teal-600" />
                    </label>
                  </div>
                </div>

              </div>

              {/* Informative Note */}
              <div className="flex items-center justify-between text-xs text-slate-500 pt-1 border-t border-slate-200/60">
                <span className="flex items-center gap-1.5">
                  <Info className="w-3.5 h-3.5 text-teal-600 shrink-0" />
                  All 13 fields can be modified freely.
                </span>
                <button
                  type="button"
                  onClick={handleClearForm}
                  className="text-slate-600 hover:text-slate-900 underline font-medium cursor-pointer"
                >
                  Clear Form
                </button>
              </div>

            </div>

            {/* 13 Input Fields Form */}
            <form onSubmit={handleSubmit} className="p-5 sm:p-6 space-y-6">
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4.5">
                
                {/* 1. Age */}
                <div>
                  <label className="block text-xs font-bold text-slate-800 mb-0.5">
                    Age
                  </label>
                  <p className="text-[11px] text-slate-500 mb-1.5">
                    Patient age in years.
                  </p>
                  <div className="relative">
                    <input
                      type="number"
                      min="18"
                      max="120"
                      step="1"
                      value={formData.Age}
                      onChange={(e) => handleFieldChange('Age', e.target.value === '' ? '' : Number(e.target.value))}
                      placeholder="e.g. 55"
                      className={`w-full px-3 py-2 rounded-xl border text-sm pr-16 transition-all ${
                        errors.Age ? 'border-rose-400 bg-rose-50/30' : 'border-slate-300 bg-white focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20'
                      }`}
                    />
                    <span className="absolute right-3 top-2.5 text-xs text-slate-400 font-medium pointer-events-none">
                      years
                    </span>
                  </div>
                  {errors.Age && <p className="text-xs text-rose-600 mt-1">{errors.Age}</p>}
                </div>

                {/* 2. Sex */}
                <div>
                  <label className="block text-xs font-bold text-slate-800 mb-0.5">
                    Sex recorded in the dataset
                  </label>
                  <p className="text-[11px] text-slate-500 mb-1.5">
                    Biological sex recorded in the record.
                  </p>
                  <select
                    value={formData.Sex}
                    onChange={(e) => handleFieldChange('Sex', Number(e.target.value))}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 bg-white text-sm focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20"
                  >
                    <option value={0}>Female</option>
                    <option value={1}>Male</option>
                  </select>
                  {errors.Sex && <p className="text-xs text-rose-600 mt-1">{errors.Sex}</p>}
                </div>

                {/* 3. Chest Pain Type */}
                <div>
                  <label className="block text-xs font-bold text-slate-800 mb-0.5">
                    Chest Pain Type
                  </label>
                  <p className="text-[11px] text-slate-500 mb-1.5">
                    Select recorded chest pain category.
                  </p>
                  <select
                    value={formData.Chest_Pain_Type}
                    onChange={(e) => handleFieldChange('Chest_Pain_Type', Number(e.target.value))}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 bg-white text-sm focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20"
                  >
                    <option value={1}>Typical angina</option>
                    <option value={2}>Atypical angina</option>
                    <option value={3}>Non-anginal pain</option>
                    <option value={4}>Asymptomatic</option>
                  </select>
                  {errors.Chest_Pain_Type && <p className="text-xs text-rose-600 mt-1">{errors.Chest_Pain_Type}</p>}
                </div>

                {/* 4. Resting Blood Pressure */}
                <div>
                  <label className="block text-xs font-bold text-slate-800 mb-0.5">
                    Resting Blood Pressure
                  </label>
                  <p className="text-[11px] text-slate-500 mb-1.5">
                    Blood pressure measured at rest.
                  </p>
                  <div className="relative">
                    <input
                      type="number"
                      min="60"
                      max="260"
                      step="1"
                      value={formData.Resting_Blood_Pressure}
                      onChange={(e) => handleFieldChange('Resting_Blood_Pressure', e.target.value === '' ? '' : Number(e.target.value))}
                      placeholder="e.g. 130"
                      className={`w-full px-3 py-2 rounded-xl border text-sm pr-18 transition-all ${
                        errors.Resting_Blood_Pressure ? 'border-rose-400 bg-rose-50/30' : 'border-slate-300 bg-white focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20'
                      }`}
                    />
                    <span className="absolute right-3 top-2.5 text-xs text-slate-400 font-medium pointer-events-none">
                      mm Hg
                    </span>
                  </div>
                  {errors.Resting_Blood_Pressure && <p className="text-xs text-rose-600 mt-1">{errors.Resting_Blood_Pressure}</p>}
                </div>

                {/* 5. Cholesterol */}
                <div>
                  <label className="block text-xs font-bold text-slate-800 mb-0.5">
                    Cholesterol
                  </label>
                  <p className="text-[11px] text-slate-500 mb-1.5">
                    Serum cholesterol measurement.
                  </p>
                  <div className="relative">
                    <input
                      type="number"
                      min="80"
                      max="650"
                      step="1"
                      value={formData.Cholesterol}
                      onChange={(e) => handleFieldChange('Cholesterol', e.target.value === '' ? '' : Number(e.target.value))}
                      placeholder="e.g. 230"
                      className={`w-full px-3 py-2 rounded-xl border text-sm pr-16 transition-all ${
                        errors.Cholesterol ? 'border-rose-400 bg-rose-50/30' : 'border-slate-300 bg-white focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20'
                      }`}
                    />
                    <span className="absolute right-3 top-2.5 text-xs text-slate-400 font-medium pointer-events-none">
                      mg/dL
                    </span>
                  </div>
                  {errors.Cholesterol && <p className="text-xs text-rose-600 mt-1">{errors.Cholesterol}</p>}
                </div>

                {/* 6. Fasting Blood Sugar */}
                <div>
                  <label className="block text-xs font-bold text-slate-800 mb-0.5">
                    Fasting Blood Sugar Above Threshold?
                  </label>
                  <p className="text-[11px] text-slate-500 mb-1.5">
                    Blood sugar &gt; 120 mg/dL after fasting.
                  </p>
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      type="button"
                      onClick={() => handleFieldChange('Fasting_Blood_Sugar', 0)}
                      className={`py-2 px-3 rounded-xl border text-xs font-semibold transition-all cursor-pointer ${
                        formData.Fasting_Blood_Sugar === 0
                          ? 'border-teal-600 bg-teal-50 text-teal-900 ring-1 ring-teal-600'
                          : 'border-slate-200 bg-white text-slate-700 hover:bg-slate-50'
                      }`}
                    >
                      No (≤ 120)
                    </button>
                    <button
                      type="button"
                      onClick={() => handleFieldChange('Fasting_Blood_Sugar', 1)}
                      className={`py-2 px-3 rounded-xl border text-xs font-semibold transition-all cursor-pointer ${
                        formData.Fasting_Blood_Sugar === 1
                          ? 'border-teal-600 bg-teal-50 text-teal-900 ring-1 ring-teal-600'
                          : 'border-slate-200 bg-white text-slate-700 hover:bg-slate-50'
                      }`}
                    >
                      Yes (&gt; 120)
                    </button>
                  </div>
                  {errors.Fasting_Blood_Sugar && <p className="text-xs text-rose-600 mt-1">{errors.Fasting_Blood_Sugar}</p>}
                </div>

                {/* 7. Resting ECG */}
                <div>
                  <label className="block text-xs font-bold text-slate-800 mb-0.5">
                    Resting ECG Result
                  </label>
                  <p className="text-[11px] text-slate-500 mb-1.5">
                    Recorded resting ECG category.
                  </p>
                  <select
                    value={formData.Resting_ECG}
                    onChange={(e) => handleFieldChange('Resting_ECG', Number(e.target.value))}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 bg-white text-sm focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20"
                  >
                    <option value={0}>Normal</option>
                    <option value={1}>ST-T wave abnormality</option>
                    <option value={2}>Left ventricular hypertrophy</option>
                  </select>
                  {errors.Resting_ECG && <p className="text-xs text-rose-600 mt-1">{errors.Resting_ECG}</p>}
                </div>

                {/* 8. Maximum Heart Rate */}
                <div>
                  <label className="block text-xs font-bold text-slate-800 mb-0.5">
                    Maximum Heart Rate Achieved
                  </label>
                  <p className="text-[11px] text-slate-500 mb-1.5">
                    Maximum heart rate recorded.
                  </p>
                  <div className="relative">
                    <input
                      type="number"
                      min="50"
                      max="250"
                      step="1"
                      value={formData.Maximum_Heart_Rate}
                      onChange={(e) => handleFieldChange('Maximum_Heart_Rate', e.target.value === '' ? '' : Number(e.target.value))}
                      placeholder="e.g. 150"
                      className={`w-full px-3 py-2 rounded-xl border text-sm pr-16 transition-all ${
                        errors.Maximum_Heart_Rate ? 'border-rose-400 bg-rose-50/30' : 'border-slate-300 bg-white focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20'
                      }`}
                    />
                    <span className="absolute right-3 top-2.5 text-xs text-slate-400 font-medium pointer-events-none">
                      bpm
                    </span>
                  </div>
                  {errors.Maximum_Heart_Rate && <p className="text-xs text-rose-600 mt-1">{errors.Maximum_Heart_Rate}</p>}
                </div>

                {/* 9. Exercise-Induced Angina */}
                <div>
                  <label className="block text-xs font-bold text-slate-800 mb-0.5">
                    Angina During Exercise?
                  </label>
                  <p className="text-[11px] text-slate-500 mb-1.5">
                    Chest pain during exercise testing.
                  </p>
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      type="button"
                      onClick={() => handleFieldChange('Exercise_Induced_Angina', 0)}
                      className={`py-2 px-3 rounded-xl border text-xs font-semibold transition-all cursor-pointer ${
                        formData.Exercise_Induced_Angina === 0
                          ? 'border-teal-600 bg-teal-50 text-teal-900 ring-1 ring-teal-600'
                          : 'border-slate-200 bg-white text-slate-700 hover:bg-slate-50'
                      }`}
                    >
                      No
                    </button>
                    <button
                      type="button"
                      onClick={() => handleFieldChange('Exercise_Induced_Angina', 1)}
                      className={`py-2 px-3 rounded-xl border text-xs font-semibold transition-all cursor-pointer ${
                        formData.Exercise_Induced_Angina === 1
                          ? 'border-teal-600 bg-teal-50 text-teal-900 ring-1 ring-teal-600'
                          : 'border-slate-200 bg-white text-slate-700 hover:bg-slate-50'
                      }`}
                    >
                      Yes
                    </button>
                  </div>
                  {errors.Exercise_Induced_Angina && <p className="text-xs text-rose-600 mt-1">{errors.Exercise_Induced_Angina}</p>}
                </div>

                {/* 10. ST Depression */}
                <div>
                  <label className="block text-xs font-bold text-slate-800 mb-0.5">
                    ST Depression
                  </label>
                  <p className="text-[11px] text-slate-500 mb-1.5">
                    Exercise ST depression (oldpeak).
                  </p>
                  <div className="relative">
                    <input
                      type="number"
                      min="0"
                      max="10.0"
                      step="0.1"
                      value={formData.ST_Depression}
                      onChange={(e) => handleFieldChange('ST_Depression', e.target.value === '' ? '' : Number(e.target.value))}
                      placeholder="e.g. 1.2"
                      className={`w-full px-3 py-2 rounded-xl border text-sm pr-16 transition-all ${
                        errors.ST_Depression ? 'border-rose-400 bg-rose-50/30' : 'border-slate-300 bg-white focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20'
                      }`}
                    />
                    <span className="absolute right-3 top-2.5 text-xs text-slate-400 font-medium pointer-events-none">
                      mm
                    </span>
                  </div>
                  {errors.ST_Depression && <p className="text-xs text-rose-600 mt-1">{errors.ST_Depression}</p>}
                </div>

                {/* 11. ST Segment Slope */}
                <div>
                  <label className="block text-xs font-bold text-slate-800 mb-0.5">
                    ST Segment Slope
                  </label>
                  <p className="text-[11px] text-slate-500 mb-1.5">
                    Slope of peak exercise ST segment.
                  </p>
                  <select
                    value={formData.ST_Segment_Slope}
                    onChange={(e) => handleFieldChange('ST_Segment_Slope', Number(e.target.value))}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 bg-white text-sm focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20"
                  >
                    <option value={1}>Upsloping</option>
                    <option value={2}>Flat</option>
                    <option value={3}>Downsloping</option>
                  </select>
                  {errors.ST_Segment_Slope && <p className="text-xs text-rose-600 mt-1">{errors.ST_Segment_Slope}</p>}
                </div>

                {/* 12. Major Vessels */}
                <div>
                  <label className="block text-xs font-bold text-slate-800 mb-0.5">
                    Number of Major Vessels Recorded
                  </label>
                  <p className="text-[11px] text-slate-500 mb-1.5">
                    Major vessels (0–3) by fluoroscopy.
                  </p>
                  <select
                    value={formData.Major_Vessels}
                    onChange={(e) => handleFieldChange('Major_Vessels', Number(e.target.value))}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 bg-white text-sm focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20"
                  >
                    <option value={0}>0 vessels</option>
                    <option value={1}>1 vessel</option>
                    <option value={2}>2 vessels</option>
                    <option value={3}>3 vessels</option>
                  </select>
                  {errors.Major_Vessels && <p className="text-xs text-rose-600 mt-1">{errors.Major_Vessels}</p>}
                </div>

                {/* 13. Thalassemia (Span 2 cols on tablet/desktop if desired) */}
                <div className="sm:col-span-2">
                  <label className="block text-xs font-bold text-slate-800 mb-0.5">
                    Thalassemia Test Category
                  </label>
                  <p className="text-[11px] text-slate-500 mb-1.5">
                    Coded nuclear scan category from the dataset.
                  </p>
                  <select
                    value={formData.Thalassemia}
                    onChange={(e) => handleFieldChange('Thalassemia', Number(e.target.value))}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 bg-white text-sm focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20"
                  >
                    <option value={3}>Normal blood flow (Code 3)</option>
                    <option value={6}>Fixed defect (Code 6)</option>
                    <option value={7}>Reversible defect (Code 7)</option>
                  </select>
                  {errors.Thalassemia && <p className="text-xs text-rose-600 mt-1">{errors.Thalassemia}</p>}
                </div>

              </div>

              {/* Form Bottom Action Buttons */}
              <div className="pt-4 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-3">
                <button
                  type="button"
                  onClick={handleClearForm}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl border border-slate-200 text-slate-700 text-xs font-semibold hover:bg-slate-50 transition-colors cursor-pointer"
                >
                  <RotateCcw className="w-3.5 h-3.5 text-slate-400" />
                  <span>Clear Form</span>
                </button>

                <button
                  type="submit"
                  disabled={panelState === 'loading'}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3 rounded-xl bg-slate-900 text-white text-xs font-semibold hover:bg-slate-800 disabled:opacity-60 transition-all shadow-sm hover:shadow-md cursor-pointer"
                >
                  {panelState === 'loading' ? (
                    <>
                      <div className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      <span>Analyzing...</span>
                    </>
                  ) : (
                    <>
                      <Activity className="w-3.5 h-3.5 text-teal-400" />
                      <span>Predict Heart Disease Risk</span>
                    </>
                  )}
                </button>
              </div>

            </form>

          </div>

          {/* ========================================================================= */}
          {/* RIGHT SIDE: RESULTS PANEL (~40% width: 5 of 12 cols, Sticky on Desktop) */}
          {/* ========================================================================= */}
          <div className="lg:col-span-5 lg:sticky lg:top-24 max-h-[calc(100vh-7rem)] overflow-y-auto">
            <ResultsPanel
              state={panelState}
              result={predictionResult}
              errorMessage={errorMessage}
              selectedModel={selectedModel}
              demoMode={demoMode}
              onTryAnother={handleTryAnother}
              onRetry={(e?: any) => {
                const syntheticEvent = { preventDefault: () => {} } as React.FormEvent;
                handleSubmit(syntheticEvent);
              }}
              onEnableDemo={() => {
                setDemoMode(true);
                setPanelState('idle');
                setErrorMessage(null);
              }}
              onOpenBackendGuide={onOpenBackendGuide}
            />
          </div>

        </div>

      </div>
    </section>
  );
};
