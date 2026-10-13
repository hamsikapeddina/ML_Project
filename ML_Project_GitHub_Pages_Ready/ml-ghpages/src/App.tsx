/**
 * Heart Disease Prediction Web Application
 * Project Title: Heart Disease Prediction Using Ridge- and Lasso-Regularized Logistic Regression
 * 
 * Academic Machine Learning College Project
 */

import React from 'react';
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AppProvider } from './context/AppContext';
import { Layout } from './components/Layout';
import { HomePage } from './pages/HomePage';
import { PredictPage } from './pages/PredictPage';
import { EdaPage } from './pages/EdaPage';
import { ModelsPage } from './pages/ModelsPage';
import { AboutPage } from './pages/AboutPage';

export default function App() {
  return (
    <AppProvider>
      <HashRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<HomePage />} />
            <Route path="predict" element={<PredictPage />} />
            <Route path="eda" element={<EdaPage />} />
            <Route path="models" element={<ModelsPage />} />
            <Route path="about" element={<AboutPage />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Route>
        </Routes>
      </HashRouter>
    </AppProvider>
  );
}
