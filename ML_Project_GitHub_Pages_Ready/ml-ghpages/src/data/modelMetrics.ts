import { ModelMetricData } from '../types/heartDisease';

/**
 * PLACEHOLDER UI metrics for layout demonstration only.
 * These values are not verified against the currently provided unexecuted notebook.
 * Replace all metrics, confusion matrices, and ROC curve points with actual notebook outputs
 * before presenting or using them to select the final model.
 */
export const INITIAL_MODEL_METRICS: ModelMetricData[] = [
  {
    modelName: 'Logistic Regression',
    accuracy: 0.8525,
    precision: 0.8387,
    recall: 0.8667,
    f1Score: 0.8525,
    rocAuc: 0.9011,
    regularizationPenalty: 'None / Standard MLE',
    hyperparameter: 'C = 1.0 (baseline)',
    confusionMatrix: {
      tp: 26,
      fp: 5,
      fn: 4,
      tn: 26,
    },
    rocCurve: [
      { fpr: 0.0, tpr: 0.0 },
      { fpr: 0.05, tpr: 0.45 },
      { fpr: 0.1, tpr: 0.72 },
      { fpr: 0.16, tpr: 0.867 },
      { fpr: 0.25, tpr: 0.92 },
      { fpr: 0.4, tpr: 0.96 },
      { fpr: 1.0, tpr: 1.0 },
    ],
  },
  {
    modelName: 'Ridge Logistic Regression',
    accuracy: 0.8689,
    precision: 0.8485,
    recall: 0.9032,
    f1Score: 0.8750,
    rocAuc: 0.9183,
    regularizationPenalty: 'L2 Norm (Euclidean)',
    hyperparameter: 'C = 0.5 (shrinkage λ = 2.0)',
    confusionMatrix: {
      tp: 28,
      fp: 5,
      fn: 3,
      tn: 25,
    },
    rocCurve: [
      { fpr: 0.0, tpr: 0.0 },
      { fpr: 0.04, tpr: 0.52 },
      { fpr: 0.09, tpr: 0.78 },
      { fpr: 0.14, tpr: 0.903 },
      { fpr: 0.22, tpr: 0.94 },
      { fpr: 0.35, tpr: 0.98 },
      { fpr: 1.0, tpr: 1.0 },
    ],
  },
  {
    modelName: 'Lasso Logistic Regression',
    accuracy: 0.8525,
    precision: 0.8438,
    recall: 0.8710,
    f1Score: 0.8571,
    rocAuc: 0.9086,
    regularizationPenalty: 'L1 Norm (Manhattan / Sparsity)',
    hyperparameter: 'C = 0.2 (solver: liblinear/saga)',
    confusionMatrix: {
      tp: 27,
      fp: 5,
      fn: 4,
      tn: 25,
    },
    rocCurve: [
      { fpr: 0.0, tpr: 0.0 },
      { fpr: 0.05, tpr: 0.48 },
      { fpr: 0.1, tpr: 0.74 },
      { fpr: 0.16, tpr: 0.871 },
      { fpr: 0.24, tpr: 0.93 },
      { fpr: 0.38, tpr: 0.96 },
      { fpr: 1.0, tpr: 1.0 },
    ],
  },
];

export const REGULARIZATION_THEORY = {
  logistic: {
    title: 'Standard Logistic Regression',
    penaltyFormula: 'Loss = -\\frac{1}{m}\\sum [y^{(i)}\\log(h_\\theta(x^{(i)})) + (1-y^{(i)})\\log(1-h_\\theta(x^{(i)}))]',
    concept: 'Unregularized Maximum Likelihood Estimation (MLE). Minimizes binary cross-entropy loss without parameter shrinkage.',
    drawback: 'Prone to overfitting on collinear predictors (e.g. correlated hemodynamic variables like age, max heart rate, blood pressure).',
  },
  ridge: {
    title: 'Ridge Logistic Regression (L2)',
    penaltyFormula: 'Loss + \\lambda \\sum_{j=1}^n \\theta_j^2',
    concept: 'L2 Weight Decay shrinks coefficients uniformly toward zero but does not set any coefficient exactly to zero.',
    benefit: 'Handles multicollinearity exceptionally well by stabilizing coefficient variance across correlated clinical tests.',
  },
  lasso: {
    title: 'Lasso Logistic Regression (L1)',
    penaltyFormula: 'Loss + \\lambda \\sum_{j=1}^n |\\theta_j|',
    concept: 'L1 Regularization creates diamond-shaped constraint boundaries, forcing non-informative feature weights to exactly 0.',
    benefit: 'Performs automated feature selection, identifying the most parsimonious subset of cardiac biomarkers.',
  },
};
