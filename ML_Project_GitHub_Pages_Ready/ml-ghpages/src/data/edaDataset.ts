/**
 * Actual exploratory data analysis (EDA) results from the UCI Cleveland Heart Disease dataset (303 records).
 * Extracted directly from Scikit-learn / Pandas / Seaborn notebook analysis.
 */

export interface ClassCount {
  name: string;
  count: number;
  percentage: number;
  color: string;
}

export interface AgeBin {
  ageGroup: string;
  noDisease: number;
  disease: number;
  total: number;
}

export interface CategoricalComparison {
  category: string;
  noDisease: number;
  disease: number;
}

export interface BoxPlotStats {
  classLabel: string;
  min: number;
  q1: number;
  median: number;
  q3: number;
  max: number;
  mean: number;
  unit: string;
}

export interface CorrelationCell {
  var1: string;
  var2: string;
  val: number;
}

export interface FeatureCoefficient {
  feature: string;
  label: string;
  logisticCoeff: number;
  ridgeCoeff: number;
  lassoCoeff: number;
  direction: 'positive' | 'negative' | 'zero';
}

export const HEART_DISEASE_DISTRIBUTION: ClassCount[] = [
  { name: 'No Disease (0)', count: 164, percentage: 54.1, color: '#0d9488' },
  { name: 'Heart Disease (1)', count: 139, percentage: 45.9, color: '#e11d48' },
];

export const AGE_DISTRIBUTION: AgeBin[] = [
  { ageGroup: '29–39 yrs', noDisease: 7, disease: 4, total: 11 },
  { ageGroup: '40–49 yrs', noDisease: 51, disease: 22, total: 73 },
  { ageGroup: '50–59 yrs', noDisease: 65, disease: 60, total: 125 },
  { ageGroup: '60–69 yrs', noDisease: 32, disease: 49, total: 81 },
  { ageGroup: '70–79 yrs', noDisease: 9, disease: 4, total: 13 },
];

export const SEX_DISTRIBUTION: CategoricalComparison[] = [
  { category: 'Female', noDisease: 72, disease: 25 },
  { category: 'Male', noDisease: 92, disease: 114 },
];

export const CHEST_PAIN_DISTRIBUTION: CategoricalComparison[] = [
  { category: 'Typical angina', noDisease: 16, disease: 7 },
  { category: 'Atypical angina', noDisease: 41, disease: 9 },
  { category: 'Non-anginal pain', noDisease: 68, disease: 18 },
  { category: 'Asymptomatic', noDisease: 39, disease: 105 },
];

export const CHOLESTEROL_STATS: BoxPlotStats[] = [
  {
    classLabel: 'No Disease',
    min: 126,
    q1: 208,
    median: 240,
    q3: 267,
    max: 564,
    mean: 242.6,
    unit: 'mg/dL',
  },
  {
    classLabel: 'Heart Disease',
    min: 131,
    q1: 218,
    median: 255,
    q3: 284,
    max: 409,
    mean: 251.5,
    unit: 'mg/dL',
  },
];

export const MAX_HEART_RATE_STATS: BoxPlotStats[] = [
  {
    classLabel: 'No Disease',
    min: 96,
    q1: 148,
    median: 158,
    q3: 172,
    max: 202,
    mean: 158.4,
    unit: 'bpm',
  },
  {
    classLabel: 'Heart Disease',
    min: 71,
    q1: 125,
    median: 139,
    q3: 156,
    max: 195,
    mean: 139.3,
    unit: 'bpm',
  },
];

export const CORRELATION_VARIABLES = [
  'Age',
  'Resting BP',
  'Cholesterol',
  'Max HR',
  'ST Depr',
  'Major Vessels',
  'Heart Disease',
];

export const CORRELATION_MATRIX: number[][] = [
  // Age, Resting BP, Cholesterol, Max HR, ST Depr, Major Vessels, Heart Disease
  [1.00,  0.28,  0.21, -0.40,  0.21,  0.36,  0.23], // Age
  [0.28,  1.00,  0.12, -0.05,  0.19,  0.10,  0.15], // Resting BP
  [0.21,  0.12,  1.00,  0.00,  0.05,  0.12,  0.08], // Cholesterol
  [-0.40, -0.05,  0.00,  1.00, -0.34, -0.26, -0.42], // Max HR
  [0.21,  0.19,  0.05, -0.34,  1.00,  0.29,  0.42], // ST Depr
  [0.36,  0.10,  0.12, -0.26,  0.29,  1.00,  0.46], // Major Vessels
  [0.23,  0.15,  0.08, -0.42,  0.42,  0.46,  1.00], // Target Heart Disease
];

export const FEATURE_COEFFICIENTS: FeatureCoefficient[] = [
  {
    feature: 'Major_Vessels',
    label: 'Major Vessels (ca)',
    logisticCoeff: 0.84,
    ridgeCoeff: 0.78,
    lassoCoeff: 0.81,
    direction: 'positive',
  },
  {
    feature: 'Thalassemia',
    label: 'Thalassemia (thal)',
    logisticCoeff: 0.68,
    ridgeCoeff: 0.65,
    lassoCoeff: 0.62,
    direction: 'positive',
  },
  {
    feature: 'Maximum_Heart_Rate',
    label: 'Max Heart Rate (thalach)',
    logisticCoeff: -0.56,
    ridgeCoeff: -0.54,
    lassoCoeff: -0.52,
    direction: 'negative',
  },
  {
    feature: 'ST_Depression',
    label: 'ST Depression (oldpeak)',
    logisticCoeff: 0.54,
    ridgeCoeff: 0.52,
    lassoCoeff: 0.49,
    direction: 'positive',
  },
  {
    feature: 'Chest_Pain_Type',
    label: 'Chest Pain Type (cp)',
    logisticCoeff: 0.51,
    ridgeCoeff: 0.48,
    lassoCoeff: 0.44,
    direction: 'positive',
  },
  {
    feature: 'Sex',
    label: 'Sex recorded (male)',
    logisticCoeff: 0.47,
    ridgeCoeff: 0.45,
    lassoCoeff: 0.41,
    direction: 'positive',
  },
  {
    feature: 'ST_Segment_Slope',
    label: 'ST Segment Slope (slope)',
    logisticCoeff: -0.29,
    ridgeCoeff: -0.26,
    lassoCoeff: -0.22,
    direction: 'negative',
  },
  {
    feature: 'Resting_Blood_Pressure',
    label: 'Resting BP (trestbps)',
    logisticCoeff: 0.24,
    ridgeCoeff: 0.21,
    lassoCoeff: 0.16,
    direction: 'positive',
  },
  {
    feature: 'Age',
    label: 'Age',
    logisticCoeff: 0.21,
    ridgeCoeff: 0.18,
    lassoCoeff: 0.09,
    direction: 'positive',
  },
  {
    feature: 'Resting_ECG',
    label: 'Resting ECG (restecg)',
    logisticCoeff: 0.10,
    ridgeCoeff: 0.09,
    lassoCoeff: 0.04,
    direction: 'positive',
  },
  {
    feature: 'Cholesterol',
    label: 'Cholesterol (chol)',
    logisticCoeff: 0.11,
    ridgeCoeff: 0.08,
    lassoCoeff: 0.00,
    direction: 'zero',
  },
  {
    feature: 'Fasting_Blood_Sugar',
    label: 'Fasting Blood Sugar (fbs)',
    logisticCoeff: 0.08,
    ridgeCoeff: 0.06,
    lassoCoeff: 0.00,
    direction: 'zero',
  },
];
