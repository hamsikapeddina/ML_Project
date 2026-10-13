# Deploying on GitHub Pages

This version is configured for the repository `hamsikapeddina/ML_Project`. The Vite base path is `/ML_Project/`, and routing uses URL fragments so routes work with GitHub Pages static hosting.

## Upload
1. Extract this ZIP. Upload the *contents* of this folder to the root of the `main` branch (not the ZIP file itself). Include hidden items such as `.gitignore` and `.env.example` if desired. Do not upload `node_modules` or a `.env` file with secrets.
2. In GitHub, open **Settings → Pages** and select **GitHub Actions** as the build and deployment source.
3. Open **Actions** and wait for **Deploy Vite app to GitHub Pages** to finish successfully.
4. The site URL should be `https://hamsikapeddina.github.io/ML_Project/`.

## Important limitations
This deployment hosts the React frontend only. GitHub Pages does not run the Python API or load a local model file. The prediction form requires a separately deployed API and compatible trained model to return genuine model predictions. The metric/EDA visualizations should be checked against the executed notebook before presenting them as measured results.
