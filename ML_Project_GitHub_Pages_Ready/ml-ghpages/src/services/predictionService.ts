import { PredictionRequest, PredictionResponse, SelectedModel } from '../types/heartDisease';

const DEFAULT_API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';

// Allow runtime override for presentation flexibility (e.g. ngrok tunnel or localhost:5000/8000)
let currentApiUrl = DEFAULT_API_URL;

export const getApiUrl = (): string => currentApiUrl;

export const setApiUrl = (url: string): void => {
  currentApiUrl = url.trim().replace(/\/$/, '');
};

export interface BackendStatus {
  online: boolean;
  url: string;
  message?: string;
  lastChecked?: Date;
}

/**
 * Checks if the external Python (FastAPI/Flask) backend is running and reachable.
 */
export async function checkBackendStatus(apiUrl: string = currentApiUrl): Promise<BackendStatus> {
  const targetUrl = apiUrl.replace(/\/$/, '');
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 3000);

    const response = await fetch(`${targetUrl}/health`, {
      method: 'GET',
      signal: controller.signal,
      headers: { Accept: 'application/json' },
    });

    clearTimeout(timeoutId);

    if (response.ok) {
      const body = await response.json().catch(() => ({}));
      if (body?.status === 'ok') {
        return {
          online: true,
          url: targetUrl,
          message: 'Connected to Python backend',
          lastChecked: new Date(),
        };
      }
    }
    return {
      online: false,
      url: targetUrl,
      message: `Health check failed (HTTP ${response.status})`,
      lastChecked: new Date(),
    };
  } catch (err: unknown) {
    const errMsg = err instanceof Error ? err.message : 'Connection failed';
    return {
      online: false,
      url: targetUrl,
      message: errMsg.includes('abort') ? 'Connection timed out (backend not responding)' : 'Backend unreachable (service offline)',
      lastChecked: new Date(),
    };
  }
}

/**
 * Sends the 13 clinical attributes to the trained ML model backend.
 * 
 * Real predictions require the trained Python backend. Synthetic fallbacks are disabled.
 */
export async function predictHeartDisease(
  data: PredictionRequest,
  selectedModel: SelectedModel,
  allowDemoMode: boolean = false
): Promise<PredictionResponse> {
  const endpoint = `${currentApiUrl.replace(/\/$/, '')}/predict`;

  const requestPayload: PredictionRequest = {
    Age: Number(data.Age),
    Sex: Number(data.Sex),
    Chest_Pain_Type: Number(data.Chest_Pain_Type),
    Resting_Blood_Pressure: Number(data.Resting_Blood_Pressure),
    Cholesterol: Number(data.Cholesterol),
    Fasting_Blood_Sugar: Number(data.Fasting_Blood_Sugar),
    Resting_ECG: Number(data.Resting_ECG),
    Maximum_Heart_Rate: Number(data.Maximum_Heart_Rate),
    Exercise_Induced_Angina: Number(data.Exercise_Induced_Angina),
    ST_Depression: Number(data.ST_Depression),
    ST_Segment_Slope: Number(data.ST_Segment_Slope),
    Major_Vessels: Number(data.Major_Vessels),
    Thalassemia: Number(data.Thalassemia),
    model_name: selectedModel,
  };

  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 6000);

    const res = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify(requestPayload),
      signal: controller.signal,
    });

    clearTimeout(timeoutId);

    if (!res.ok) {
      const errorText = await res.text();
      throw new Error(`Model API error (${res.status}): ${errorText || res.statusText}`);
    }

    const json = await res.json();
    return {
      prediction: json.prediction === 1 ? 1 : 0,
      probability: typeof json.probability === 'number' ? json.probability : undefined,
      model_name: json.model_name || selectedModel,
      isDemo: false,
      timestamp: new Date().toLocaleTimeString(),
    };
  } catch (error: unknown) {
    const detail = error instanceof Error ? error.message : 'Connection failed';
    if (allowDemoMode) {
      throw new Error(
        `Demo simulation has been disabled to avoid presenting synthetic values as ML predictions. Connect the trained Python model first. (${detail})`
      );
    }
    throw new Error(
      'Real prediction unavailable. Start the Python backend and load the trained model pipeline. No simulated prediction was generated.'
    );
  }
}
