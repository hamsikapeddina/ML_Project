import React, { createContext, useContext, useState, useEffect, useMemo } from 'react';
import { ModelMetricData, SelectedModel } from '../types/heartDisease';
import { INITIAL_MODEL_METRICS } from '../data/modelMetrics';
import { checkBackendStatus } from '../services/predictionService';

interface AppContextType {
  metrics: ModelMetricData[];
  setMetrics: (metrics: ModelMetricData[]) => void;
  bestModel: ModelMetricData | null;
  selectedModelForPrediction: SelectedModel;
  setSelectedModelForPrediction: (model: SelectedModel) => void;
  backendOnline: boolean | null;
  checkBackend: () => Promise<void>;
  isGuideModalOpen: boolean;
  setIsGuideModalOpen: (open: boolean) => void;
  demoMode: boolean;
  setDemoMode: (enabled: boolean) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [metrics, setMetrics] = useState<ModelMetricData[]>(INITIAL_MODEL_METRICS);
  const [backendOnline, setBackendOnline] = useState<boolean | null>(null);
  const [isGuideModalOpen, setIsGuideModalOpen] = useState(false);
  const [demoMode, setDemoMode] = useState(false);

  // Provisional ranking from placeholder UI metrics. Replace metrics with verified notebook output before presentation.
  const bestModel = useMemo(() => {
    const valid = metrics.filter((m) => m.rocAuc !== null && m.rocAuc !== undefined);
    if (valid.length === 0) return null;
    return [...valid].sort((a, b) => (b.rocAuc || 0) - (a.rocAuc || 0))[0];
  }, [metrics]);

  // Selected model for prediction defaults to programmatically determined best model
  const [selectedModelForPrediction, setSelectedModelForPrediction] = useState<SelectedModel>(
    bestModel?.modelName || 'Ridge Logistic Regression'
  );

  // Keep the prediction model aligned with the current top-ranked model.
  // Model scores shown in the UI are placeholders until verified against the executed notebook.
  useEffect(() => {
    if (bestModel) setSelectedModelForPrediction(bestModel.modelName);
  }, [bestModel]);

  const checkBackend = async () => {
    try {
      const res = await checkBackendStatus();
      setBackendOnline(res.online);
    } catch {
      setBackendOnline(false);
    }
  };

  useEffect(() => {
    checkBackend();
  }, []);

  return (
    <AppContext.Provider
      value={{
        metrics,
        setMetrics,
        bestModel,
        selectedModelForPrediction,
        setSelectedModelForPrediction,
        backendOnline,
        checkBackend,
        isGuideModalOpen,
        setIsGuideModalOpen,
        demoMode,
        setDemoMode,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
