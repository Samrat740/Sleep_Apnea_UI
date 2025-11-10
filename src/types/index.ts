export interface RiskFormData {
  age: number;
  gender: 'Male' | 'Female' | 'Other';
  height: number;
  weight: number;
  snoring: boolean;
  tired: boolean;
  observed: boolean;
  bp: boolean;
}

export interface RiskResult {
  score: number;
  level: 'Low' | 'Moderate' | 'High';
  message: string;
  bmi: number;
}

export interface ECGData {
  index: number;
  value: number;
}

export interface ECGPrediction {
  probability: number;
  label: string;
  message: string;
}
