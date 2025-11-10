import { useState, ChangeEvent } from 'react';
import { Upload, Activity, ArrowLeft, Trash2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from 'recharts';
import { ECGData, ECGPrediction } from '../types';

export default function ECGAnalyzer() {
  const [ecgData, setEcgData] = useState<ECGData[]>([]);
  const [prediction, setPrediction] = useState<ECGPrediction | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [fileName, setFileName] = useState('');

  const handleFileUpload = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setFileName(file.name);
    setIsLoading(true);
    setPrediction(null);

    try {
      // Read the file locally for ECG visualization
      const text = await file.text();
      const lines = text.split('\n').filter(line => line.trim());

      // Detect and skip header
      let startIndex = 0;
      if (lines[0].toLowerCase().includes('ecg')) {
        startIndex = 1;
      }

      const data: ECGData[] = lines
        .slice(startIndex)
        .map((line, index) => ({
          index,
          value: parseFloat(line.trim()),
        }))
        .filter(d => !isNaN(d.value));

      setEcgData(data);

      // ✅ Upload CSV file to FastAPI backend
      const formData = new FormData();
      formData.append('file', file);

      const response = await fetch(
        'https://sleep-apnea-detection-using-ecg-signals.onrender.com/predict',
        {
          method: 'POST',
          body: formData,
        }
      );

      if (!response.ok) {
        throw new Error('Failed to get prediction from API');
      }

      const result = await response.json();

      const probability = result.probability || 0;
      const label = result.status || 'Unknown';

      let message: string;
      if (label === 'Sleep Apnea Detected') {
        message =
          'High probability of sleep apnea detected. Please consult a healthcare professional.';
      } else if (label === 'Likely Apnea Condition') {
        message =
          'Possible sleep apnea indicators found. Consider further medical evaluation.';
      } else {
        message = 'No significant sleep apnea patterns detected in the ECG data.';
      }

      setPrediction({
        probability,
        label,
        message,
      });
    } catch (error) {
      console.error('Error processing ECG data:', error);
      setPrediction({
        probability: 0,
        label: 'Error',
        message: 'Failed to analyze ECG data. Please try again or check the file format.',
      });
    } finally {
      setIsLoading(false);
    }
  };

  // 🧹 Clear All Handler
  const handleClearAll = () => {
    setEcgData([]);
    setPrediction(null);
    setFileName('');
    setIsLoading(false);
  };

  const getPredictionColor = (label: string) => {
    switch (label) {
      case 'Sleep Apnea Detected':
        return 'bg-red-100 border-red-500 text-red-700';
      case 'Likely Apnea Condition':
        return 'bg-orange-100 border-orange-500 text-orange-700';
      case 'Normal ECG Pattern':
        return 'bg-green-100 border-green-500 text-green-700';
      case 'Error':
        return 'bg-red-100 border-red-500 text-red-700';
      default:
        return 'bg-gray-100 border-gray-500 text-gray-700';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 mb-6 font-medium"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </Link>

          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-3">
              <Activity className="w-10 h-10 text-blue-600" />
              <div>
                <h1 className="text-3xl font-bold text-gray-800">ECG Analysis Mode</h1>
                <p className="text-gray-600">
                  Upload and analyze ECG data for sleep apnea detection
                </p>
              </div>
            </div>

            {/* Clear Button */}
            {(fileName || ecgData.length > 0 || prediction) && (
              <button
                onClick={handleClearAll}
                className="flex items-center gap-2 text-sm bg-red-100 hover:bg-red-200 text-red-600 font-medium px-4 py-2 rounded-lg shadow transition"
              >
                <Trash2 className="w-4 h-4" />
                Clear All
              </button>
            )}
          </div>
        </motion.div>

        {/* Upload Box */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="bg-white rounded-xl shadow-lg p-8 mb-8"
        >
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-12 text-center hover:border-blue-500 transition-colors">
            <input
              type="file"
              accept=".csv"
              onChange={handleFileUpload}
              className="hidden"
              id="ecg-file-upload"
            />
            <label htmlFor="ecg-file-upload" className="cursor-pointer">
              <Upload className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <p className="text-lg font-semibold text-gray-700 mb-2">
                Upload ECG CSV File
              </p>
              <p className="text-sm text-gray-500">
                Click to browse or drag and drop your ECG data file
              </p>
              {fileName && (
                <p className="text-sm text-blue-600 mt-2 font-medium">
                  Selected: {fileName}
                </p>
              )}
            </label>
          </div>
        </motion.div>

        {/* Loading State */}
        {isLoading && (
          <div className="bg-white rounded-xl shadow-lg p-8 text-center">
            <div className="animate-pulse">
              <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
              <p className="text-gray-600">Analyzing ECG data...</p>
            </div>
          </div>
        )}

        {/* ECG Graph + Results */}
        {ecgData.length > 0 && !isLoading && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            {/* ECG Visualization */}
            <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">ECG Waveform</h2>
              <div className="bg-white border-2 border-gray-200 rounded-lg p-4">
                <ResponsiveContainer width="100%" height={400}>
                  <LineChart data={ecgData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#ffc0cb" strokeWidth={1} />
                    <XAxis dataKey="index" stroke="#666" tick={{ fontSize: 12 }} />
                    <YAxis stroke="#666" tick={{ fontSize: 12 }} />
                    <Line
                      type="monotone"
                      dataKey="value"
                      stroke="#e91e63"
                      strokeWidth={2}
                      dot={false}
                      isAnimationActive={true}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
              <p className="text-sm text-gray-500 mt-4 text-center">
                Medical-style ECG visualization with {ecgData.length} data points
              </p>
            </div>

            {/* Prediction Card */}
            {prediction && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className={`rounded-xl shadow-lg p-8 border-2 ${getPredictionColor(
                  prediction.label
                )}`}
              >
                <h2 className="text-2xl font-bold mb-4">Analysis Results</h2>
                <div className="space-y-4">
                  <div>
                    <p className="text-sm font-medium mb-1">Prediction</p>
                    <p className="text-3xl font-bold">{prediction.label}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium mb-1">Confidence</p>
                    <div className="flex items-center gap-4">
                      <div className="flex-1 bg-white bg-opacity-50 rounded-full h-4 border border-current">
                        <div
                          className="h-4 rounded-full bg-current"
                          style={{ width: `${prediction.probability}%` }}
                        ></div>
                      </div>
                      <span className="text-2xl font-bold">
                        {prediction.probability.toFixed(1)}%
                      </span>
                    </div>
                  </div>
                  <div className="pt-4 border-t border-current border-opacity-30">
                    <p className="font-medium">{prediction.message}</p>
                  </div>
                </div>
              </motion.div>
            )}
          </motion.div>
        )}
      </div>
    </div>
  );
}
