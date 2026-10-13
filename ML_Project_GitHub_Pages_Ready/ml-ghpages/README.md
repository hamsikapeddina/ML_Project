# Heart Disease Prediction — Regularized Logistic Regression

React + Vite frontend for an educational ML project comparing Logistic Regression, Ridge (L2), and Lasso (L1).

## Frontend setup

1. Install Node.js (LTS).
2. Open a terminal in this project folder.
3. Run `npm install`.
4. Run `npm run dev`.
5. Open the local URL printed by Vite (configured for port 3000).

## Connect the real trained model

The Python API is in `backend/`. Follow `backend/README.md`. The backend requires `heart_disease_models.joblib`, exported from the fully executed Colab notebook. It must contain the fitted full sklearn pipelines for all three models. The API deliberately returns an error when model files are missing; it never fabricates a prediction.

## Important verification note

The UI's model metrics, ROC points, feature coefficients, and EDA summaries are currently static placeholders for layout demonstration. The notebooks provided with this project were unexecuted, so the app cannot truthfully identify the final winning model or claim those charts are actual notebook outputs yet. Run the notebook, export the trained model dictionary, and replace the placeholder UI data with the actual results before presentation/submission.

## Educational use only

This project is not a clinically validated medical device. Outputs must not be used for diagnosis or treatment decisions.
