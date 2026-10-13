import { PatientData, SampleProfile } from '../types/heartDisease';

/**
 * Synthetic demonstration patient profiles for academic presentation.
 * Note: These values are synthetic combinations derived from the UCI Cleveland Dataset schema
 * and do not represent verified real individuals or pre-diagnosed risk categories.
 */
export const SAMPLE_PATIENTS: SampleProfile[] = [
  {
    id: 'sample-1',
    title: 'Sample Patient 1',
    description: 'Male, 63 yrs, asymptomatic chest pain (Type 4), elevated cholesterol (233 mg/dL), exercise-induced angina recorded.',
    data: {
      Age: 63,
      Sex: 1, // Male
      Chest_Pain_Type: 4, // Asymptomatic
      Resting_Blood_Pressure: 145,
      Cholesterol: 233,
      Fasting_Blood_Sugar: 1, // > 120 mg/dl
      Resting_ECG: 2, // Left ventricular hypertrophy
      Maximum_Heart_Rate: 150,
      Exercise_Induced_Angina: 0,
      ST_Depression: 2.3,
      ST_Segment_Slope: 3, // Downsloping
      Major_Vessels: 0,
      Thalassemia: 6, // Fixed defect
    },
  },
  {
    id: 'sample-2',
    title: 'Sample Patient 2',
    description: 'Female, 41 yrs, atypical angina (Type 2), cholesterol (204 mg/dL), normal ECG and no exercise angina.',
    data: {
      Age: 41,
      Sex: 0, // Female
      Chest_Pain_Type: 2, // Atypical Angina
      Resting_Blood_Pressure: 130,
      Cholesterol: 204,
      Fasting_Blood_Sugar: 0, // <= 120 mg/dl
      Resting_ECG: 0, // Normal
      Maximum_Heart_Rate: 172,
      Exercise_Induced_Angina: 0,
      ST_Depression: 1.4,
      ST_Segment_Slope: 1, // Upsloping
      Major_Vessels: 0,
      Thalassemia: 3, // Normal
    },
  },
  {
    id: 'sample-3',
    title: 'Sample Patient 3',
    description: 'Male, 67 yrs, non-anginal pain (Type 3), cholesterol (286 mg/dL), ST depression 1.5 with 2 fluoroscopy vessels.',
    data: {
      Age: 67,
      Sex: 1, // Male
      Chest_Pain_Type: 4, // Asymptomatic
      Resting_Blood_Pressure: 160,
      Cholesterol: 286,
      Fasting_Blood_Sugar: 0,
      Resting_ECG: 2, // Left ventricular hypertrophy
      Maximum_Heart_Rate: 108,
      Exercise_Induced_Angina: 1, // Yes
      ST_Depression: 1.5,
      ST_Segment_Slope: 2, // Flat
      Major_Vessels: 2,
      Thalassemia: 7, // Reversible defect
    },
  },
];

export const EMPTY_PATIENT_DATA: PatientData = {
  Age: '',
  Sex: 1,
  Chest_Pain_Type: 1,
  Resting_Blood_Pressure: '',
  Cholesterol: '',
  Fasting_Blood_Sugar: 0,
  Resting_ECG: 0,
  Maximum_Heart_Rate: '',
  Exercise_Induced_Angina: 0,
  ST_Depression: '',
  ST_Segment_Slope: 1,
  Major_Vessels: 0,
  Thalassemia: 3,
};
