# Python backend setup

The React frontend calls this API at `http://localhost:8000`. This backend intentionally does **not** generate fake predictions: if the fitted models are missing, `/predict` returns HTTP 503.

## 1. Export the trained pipelines from Colab

Run the training notebook completely first. At the end, add/run this cell after the cell that creates and fits the `models` dictionary:

```python
import joblib
joblib.dump(models, "heart_disease_models.joblib")
```

Download `heart_disease_models.joblib` from Colab and place it in this `backend` folder beside `app.py`. The dictionary keys must be exactly:

- `Logistic Regression`
- `Ridge Logistic Regression`
- `Lasso Logistic Regression`

The notebook's models are complete scikit-learn Pipelines, including imputation and scaling. The API passes raw feature values into each pipeline; it must not scale them separately.

## 2. Install and run (Windows PowerShell or CMD)

From the `backend` folder:

```bash
py -m venv .venv
.venv\\Scripts\\activate
python -m pip install -r requirements.txt
uvicorn app:app --host 127.0.0.1 --port 8000 --reload
```

Health check: `http://127.0.0.1:8000/health`

Then run the React frontend from the project root in a second terminal:

```bash
npm install
npm run dev
```

## Important

- Do not rename the model dictionary keys unless the frontend labels are changed to match.
- If `/health` says no model file was found, check that the downloaded `.joblib` file is next to `app.py`.
- The displayed model metrics/EDA values in the current UI are placeholders. Verify them against the completed notebook before using them in a report or presentation.
- This is an educational project, not a medical diagnosis tool. Do not use its output to make clinical decisions.
