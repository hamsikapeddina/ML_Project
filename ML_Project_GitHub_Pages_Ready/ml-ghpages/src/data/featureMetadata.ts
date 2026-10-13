export interface FeatureOption {
  value: number;
  label: string;
  detail?: string;
}

export interface FeatureInfo {
  key: string;
  name: string;
  label: string;
  originalName: string;
  unit?: string;
  type: 'number' | 'select' | 'radio';
  description: string;
  clinicalSignificance: string;
  min?: number;
  max?: number;
  step?: number;
  options?: FeatureOption[];
}

export const FEATURE_METADATA: FeatureInfo[] = [
  {
    key: 'Age',
    name: 'Age',
    label: 'Age',
    originalName: 'age',
    unit: 'years',
    type: 'number',
    min: 18,
    max: 120,
    step: 1,
    description: 'Patient age in years.',
    clinicalSignificance: 'Cardiovascular risk generally increases with biological age.',
  },
  {
    key: 'Sex',
    name: 'Sex recorded in the dataset',
    label: 'Sex recorded in the dataset',
    originalName: 'sex',
    type: 'select',
    description: 'Biological sex recorded in the clinical record.',
    clinicalSignificance: 'Biological sex has distinct risk patterns in the UCI heart disease dataset.',
    options: [
      { value: 0, label: 'Female', detail: 'Recorded as female (0)' },
      { value: 1, label: 'Male', detail: 'Recorded as male (1)' },
    ],
  },
  {
    key: 'Chest_Pain_Type',
    name: 'Chest Pain Type',
    label: 'Chest Pain Type',
    originalName: 'cp',
    type: 'select',
    description: 'Select the category recorded for the patient.',
    clinicalSignificance: 'Categorizes chest discomfort based on clinical presentation.',
    options: [
      { value: 1, label: 'Typical angina', detail: 'Substernal chest pressure triggered by physical exertion (1)' },
      { value: 2, label: 'Atypical angina', detail: 'Chest discomfort with atypical symptoms (2)' },
      { value: 3, label: 'Non-anginal pain', detail: 'Pain unrelated to cardiac ischemia (3)' },
      { value: 4, label: 'Asymptomatic', detail: 'No reported chest pain (silent ischemia presentation) (4)' },
    ],
  },
  {
    key: 'Resting_Blood_Pressure',
    name: 'Resting Blood Pressure',
    label: 'Resting Blood Pressure',
    originalName: 'trestbps',
    unit: 'mm Hg',
    type: 'number',
    min: 60,
    max: 260,
    step: 1,
    description: 'Blood pressure measured at rest.',
    clinicalSignificance: 'Elevated resting blood pressure increases cardiac workload.',
  },
  {
    key: 'Cholesterol',
    name: 'Cholesterol',
    label: 'Cholesterol',
    originalName: 'chol',
    unit: 'mg/dL',
    type: 'number',
    min: 80,
    max: 650,
    step: 1,
    description: 'Serum cholesterol measurement.',
    clinicalSignificance: 'Circulating lipids contribute to plaque accumulation.',
  },
  {
    key: 'Fasting_Blood_Sugar',
    name: 'Fasting Blood Sugar Above Threshold?',
    label: 'Fasting Blood Sugar Above Threshold?',
    originalName: 'fbs',
    type: 'radio',
    description: 'Blood sugar above 120 mg/dL after fasting.',
    clinicalSignificance: 'Elevated fasting glucose is a risk factor for vascular disease.',
    options: [
      { value: 0, label: 'No (≤ 120 mg/dL)', detail: 'Normal fasting blood sugar (0)' },
      { value: 1, label: 'Yes (> 120 mg/dL)', detail: 'Elevated fasting blood sugar (1)' },
    ],
  },
  {
    key: 'Resting_ECG',
    name: 'Resting ECG Result',
    label: 'Resting ECG Result',
    originalName: 'restecg',
    type: 'select',
    description: 'Recorded resting electrocardiogram category.',
    clinicalSignificance: 'Detects baseline electrical conduction or ventricular enlargement.',
    options: [
      { value: 0, label: 'Normal', detail: 'No significant abnormalities (0)' },
      { value: 1, label: 'ST-T wave abnormality', detail: 'T wave inversions or ST displacement > 0.05 mV (1)' },
      { value: 2, label: 'Left ventricular hypertrophy', detail: 'Probable or definite enlargement by ECG criteria (2)' },
    ],
  },
  {
    key: 'Maximum_Heart_Rate',
    name: 'Maximum Heart Rate Achieved',
    label: 'Maximum Heart Rate Achieved',
    originalName: 'thalach',
    unit: 'bpm',
    type: 'number',
    min: 50,
    max: 250,
    step: 1,
    description: 'Maximum heart rate recorded during the test.',
    clinicalSignificance: 'Peak heart rate reached during treadmill exercise stress testing.',
  },
  {
    key: 'Exercise_Induced_Angina',
    name: 'Angina During Exercise?',
    label: 'Angina During Exercise?',
    originalName: 'exang',
    type: 'radio',
    description: 'Whether chest pain was experienced during physical exertion.',
    clinicalSignificance: 'Indicates inducible cardiac ischemia under physical stress.',
    options: [
      { value: 0, label: 'No', detail: 'No angina during exercise (0)' },
      { value: 1, label: 'Yes', detail: 'Angina occurred during exercise (1)' },
    ],
  },
  {
    key: 'ST_Depression',
    name: 'ST Depression',
    label: 'ST Depression',
    originalName: 'oldpeak',
    unit: 'mm',
    type: 'number',
    min: 0,
    max: 10.0,
    step: 0.1,
    description: 'Exercise-related ST depression measurement, called oldpeak in the original dataset.',
    clinicalSignificance: 'Measures depression of ST segment induced by exercise relative to rest.',
  },
  {
    key: 'ST_Segment_Slope',
    name: 'ST Segment Slope',
    label: 'ST Segment Slope',
    originalName: 'slope',
    type: 'select',
    description: 'Slope of the peak exercise ST segment.',
    clinicalSignificance: 'Downsloping or flat ST slopes are often associated with ischemia.',
    options: [
      { value: 1, label: 'Upsloping', detail: 'Rapidly upsloping ST segment (1)' },
      { value: 2, label: 'Flat', detail: 'Horizontal ST segment (2)' },
      { value: 3, label: 'Downsloping', detail: 'Downsloping ST segment (3)' },
    ],
  },
  {
    key: 'Major_Vessels',
    name: 'Number of Major Vessels Recorded',
    label: 'Number of Major Vessels Recorded',
    originalName: 'ca',
    type: 'select',
    description: 'Number of major blood vessels (0 to 3) observed via fluoroscopy.',
    clinicalSignificance: 'Count of major coronary vessels showing visible narrowing.',
    options: [
      { value: 0, label: '0 vessels', detail: 'No major vessels narrowed (0)' },
      { value: 1, label: '1 vessel', detail: 'One major vessel narrowed (1)' },
      { value: 2, label: '2 vessels', detail: 'Two major vessels narrowed (2)' },
      { value: 3, label: '3 vessels', detail: 'Three major vessels narrowed (3)' },
    ],
  },
  {
    key: 'Thalassemia',
    name: 'Thalassemia Test Category',
    label: 'Thalassemia Test Category',
    originalName: 'thal',
    type: 'select',
    description: 'Coded category from the dataset.',
    clinicalSignificance: 'Nuclear myocardial perfusion test evaluating blood flow to the heart.',
    options: [
      { value: 3, label: 'Normal blood flow (Code 3)', detail: 'Normal myocardial thallium uptake (3)' },
      { value: 6, label: 'Fixed defect (Code 6)', detail: 'Non-reversible defect indicative of prior tissue damage (6)' },
      { value: 7, label: 'Reversible defect (Code 7)', detail: 'Transient defect indicating inducible ischemia (7)' },
    ],
  },
];
