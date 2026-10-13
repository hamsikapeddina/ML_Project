export interface PatientData {
  Age: number | '';
  Sex: number; // 0 = Female, 1 = Male
  Chest_Pain_Type: number; // 1, 2, 3, 4
  Resting_Blood_Pressure: number | ''; // mm Hg
  Cholesterol: number | ''; // mg/dL
  Fasting_Blood_Sugar: number; // 0 = No, 1 = Yes (> 120 mg/dl)
  Resting_ECG: number; // 0, 1, 2
  Maximum_Heart_Rate: number | ''; // bpm
  Exercise_Induced_Angina: number; // 0 = No, 1 = Yes
  ST_Depression: number | ''; // oldpeak (float)
  ST_Segment_Slope: number; // 1 = Upsloping, 2 = Flat, 3 = Downsloping
  Major_Vessels: number; // 0, 1, 2, 3
  Thalassemia: number; // 3 = Normal, 6 = Fixed defect, 7 = Reversible defect
}

export type SelectedModel = 'Logistic Regression' | 'Ridge Logistic Regression' | 'Lasso Logistic Regression';

export interface PredictionRequest extends Record<string, number | string | undefined> {
  Age: number;
  Sex: number;
  Chest_Pain_Type: number;
  Resting_Blood_Pressure: number;
  Cholesterol: number;
  Fasting_Blood_Sugar: number;
  Resting_ECG: number;
  Maximum_Heart_Rate: number;
  Exercise_Induced_Angina: number;
  ST_Depression: number;
  ST_Segment_Slope: number;
  Major_Vessels: number;
  Thalassemia: number;
  model_name?: string;
}

export interface PredictionResponse {
  prediction: 0 | 1; // 0 = No Heart Disease, 1 = Heart Disease
  probability?: number; // 0.0 to 1.0 (or percentage)
  model_name: string;
  isDemo?: boolean;
  notes?: string;
  timestamp?: string;
}

export interface SampleProfile {
  id: string;
  title: string;
  description: string;
  data: PatientData;
}

export interface ModelMetricData {
  modelName: SelectedModel;
  accuracy: number | null;
  precision: number | null;
  recall: number | null;
  f1Score: number | null;
  rocAuc: number | null;
  regularizationPenalty?: string;
  hyperparameter?: string;
  confusionMatrix?: {
    tp: number;
    fp: number;
    fn: number;
    tn: number;
  };
  rocCurve?: Array<{ fpr: number; tpr: number }>;
}
