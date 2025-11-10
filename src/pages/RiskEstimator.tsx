import { useState, FormEvent } from 'react';
import { ClipboardList, ArrowLeft, AlertCircle, CheckCircle, AlertTriangle } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { RiskFormData, RiskResult } from '../types';

export default function RiskEstimator() {
  const [formData, setFormData] = useState<RiskFormData>({
    age: 30,
    gender: 'Male',
    height: 170,
    weight: 70,
    snoring: false,
    tired: false,
    observed: false,
    bp: false,
  });

  const [result, setResult] = useState<RiskResult | null>(null);

  const calculateBMI = (weight: number, height: number): number => {
    return weight / Math.pow(height / 100, 2);
  };

  const calculateRisk = (data: RiskFormData): RiskResult => {
    let score = 0;
    const bmi = calculateBMI(data.weight, data.height);

    if (data.age > 50) score += 2;
    else if (data.age > 40) score += 1;

    if (data.gender === 'Male') score += 1;

    if (bmi > 30) score += 3;
    else if (bmi > 25) score += 2;
    else if (bmi > 23) score += 1;

    if (data.snoring) score += 2;
    if (data.tired) score += 2;
    if (data.observed) score += 3;
    if (data.bp) score += 2;

    let level: 'Low' | 'Moderate' | 'High';
    let message: string;

    if (score >= 8) {
      level = 'High';
      message = 'High risk of sleep apnea detected. We strongly recommend consulting a sleep specialist for a comprehensive evaluation.';
    } else if (score >= 4) {
      level = 'Moderate';
      message = 'Moderate risk of sleep apnea. Consider discussing your symptoms with a healthcare provider for further assessment.';
    } else {
      level = 'Low';
      message = 'Low risk of sleep apnea based on the provided information. Maintain healthy sleep habits and monitor any changes in symptoms.';
    }

    return { score, level, message, bmi };
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const riskResult = calculateRisk(formData);
    setResult(riskResult);
  };

  const getRiskColor = (level: string) => {
    switch (level) {
      case 'High':
        return 'bg-red-100 border-red-500 text-red-700';
      case 'Moderate':
        return 'bg-orange-100 border-orange-500 text-orange-700';
      case 'Low':
        return 'bg-green-100 border-green-500 text-green-700';
      default:
        return 'bg-gray-100 border-gray-500 text-gray-700';
    }
  };

  const getRiskIcon = (level: string) => {
    switch (level) {
      case 'High':
        return <AlertCircle className="w-12 h-12" />;
      case 'Moderate':
        return <AlertTriangle className="w-12 h-12" />;
      case 'Low':
        return <CheckCircle className="w-12 h-12" />;
      default:
        return <AlertCircle className="w-12 h-12" />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4 max-w-4xl">
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

          <div className="flex items-center gap-3 mb-8">
            <ClipboardList className="w-10 h-10 text-green-600" />
            <div>
              <h1 className="text-3xl font-bold text-gray-800">Clinical Risk Estimation</h1>
              <p className="text-gray-600">Calculate your sleep apnea risk based on health profile</p>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="bg-white rounded-xl shadow-lg p-8 mb-8"
        >
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Age
                </label>
                <input
                  type="number"
                  min="10"
                  max="100"
                  value={formData.age}
                  onChange={(e) => setFormData({ ...formData, age: parseInt(e.target.value) })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Gender
                </label>
                <select
                  value={formData.gender}
                  onChange={(e) => setFormData({ ...formData, gender: e.target.value as 'Male' | 'Female' | 'Other' })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                >
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Height (cm)
                </label>
                <input
                  type="number"
                  min="100"
                  max="250"
                  value={formData.height}
                  onChange={(e) => setFormData({ ...formData, height: parseInt(e.target.value) })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Weight (kg)
                </label>
                <input
                  type="number"
                  min="30"
                  max="200"
                  value={formData.weight}
                  onChange={(e) => setFormData({ ...formData, weight: parseInt(e.target.value) })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  required
                />
              </div>
            </div>

            <div className="pt-4 border-t border-gray-200">
              <p className="text-sm font-medium text-gray-700 mb-4">Health Questions</p>

              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <label className="text-gray-700">Do you snore?</label>
                  <div className="flex gap-4">
                    <label className="flex items-center cursor-pointer">
                      <input
                        type="radio"
                        name="snoring"
                        checked={formData.snoring === true}
                        onChange={() => setFormData({ ...formData, snoring: true })}
                        className="mr-2"
                      />
                      <span>Yes</span>
                    </label>
                    <label className="flex items-center cursor-pointer">
                      <input
                        type="radio"
                        name="snoring"
                        checked={formData.snoring === false}
                        onChange={() => setFormData({ ...formData, snoring: false })}
                        className="mr-2"
                      />
                      <span>No</span>
                    </label>
                  </div>
                </div>

                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <label className="text-gray-700">Do you often feel tired during the day?</label>
                  <div className="flex gap-4">
                    <label className="flex items-center cursor-pointer">
                      <input
                        type="radio"
                        name="tired"
                        checked={formData.tired === true}
                        onChange={() => setFormData({ ...formData, tired: true })}
                        className="mr-2"
                      />
                      <span>Yes</span>
                    </label>
                    <label className="flex items-center cursor-pointer">
                      <input
                        type="radio"
                        name="tired"
                        checked={formData.tired === false}
                        onChange={() => setFormData({ ...formData, tired: false })}
                        className="mr-2"
                      />
                      <span>No</span>
                    </label>
                  </div>
                </div>

                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <label className="text-gray-700">Has anyone observed you stop breathing during sleep?</label>
                  <div className="flex gap-4">
                    <label className="flex items-center cursor-pointer">
                      <input
                        type="radio"
                        name="observed"
                        checked={formData.observed === true}
                        onChange={() => setFormData({ ...formData, observed: true })}
                        className="mr-2"
                      />
                      <span>Yes</span>
                    </label>
                    <label className="flex items-center cursor-pointer">
                      <input
                        type="radio"
                        name="observed"
                        checked={formData.observed === false}
                        onChange={() => setFormData({ ...formData, observed: false })}
                        className="mr-2"
                      />
                      <span>No</span>
                    </label>
                  </div>
                </div>

                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <label className="text-gray-700">Do you have high blood pressure?</label>
                  <div className="flex gap-4">
                    <label className="flex items-center cursor-pointer">
                      <input
                        type="radio"
                        name="bp"
                        checked={formData.bp === true}
                        onChange={() => setFormData({ ...formData, bp: true })}
                        className="mr-2"
                      />
                      <span>Yes</span>
                    </label>
                    <label className="flex items-center cursor-pointer">
                      <input
                        type="radio"
                        name="bp"
                        checked={formData.bp === false}
                        onChange={() => setFormData({ ...formData, bp: false })}
                        className="mr-2"
                      />
                      <span>No</span>
                    </label>
                  </div>
                </div>
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors"
            >
              Analyze Risk
            </button>
          </form>
        </motion.div>

        {result && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className={`rounded-xl shadow-lg p-8 border-2 ${getRiskColor(result.level)}`}
          >
            <div className="flex items-start gap-4 mb-6">
              {getRiskIcon(result.level)}
              <div>
                <h2 className="text-2xl font-bold mb-2">Risk Assessment Results</h2>
                <p className="text-lg font-semibold">Risk Level: {result.level}</p>
              </div>
            </div>

            <div className="grid md:grid-cols-3 gap-6 mb-6">
              <div className="bg-white bg-opacity-50 rounded-lg p-4">
                <p className="text-sm font-medium mb-1">Risk Score</p>
                <p className="text-3xl font-bold">{result.score}</p>
              </div>
              <div className="bg-white bg-opacity-50 rounded-lg p-4">
                <p className="text-sm font-medium mb-1">BMI</p>
                <p className="text-3xl font-bold">{result.bmi.toFixed(1)}</p>
              </div>
              <div className="bg-white bg-opacity-50 rounded-lg p-4">
                <p className="text-sm font-medium mb-1">Risk Level</p>
                <p className="text-3xl font-bold">{result.level}</p>
              </div>
            </div>

            <div className="pt-6 border-t border-current border-opacity-30">
              <p className="font-medium leading-relaxed">{result.message}</p>
            </div>

            <div className="mt-6 bg-white bg-opacity-50 rounded-lg p-4">
              <p className="text-sm font-semibold mb-2">Next Steps:</p>
              <ul className="text-sm space-y-1 list-disc list-inside">
                {result.level === 'High' && (
                  <>
                    <li>Schedule an appointment with a sleep specialist</li>
                    <li>Consider a sleep study (polysomnography)</li>
                    <li>Monitor your symptoms and keep a sleep diary</li>
                  </>
                )}
                {result.level === 'Moderate' && (
                  <>
                    <li>Discuss your symptoms with your primary care physician</li>
                    <li>Practice good sleep hygiene</li>
                    <li>Consider lifestyle modifications (weight management, exercise)</li>
                  </>
                )}
                {result.level === 'Low' && (
                  <>
                    <li>Maintain healthy sleep habits</li>
                    <li>Stay physically active</li>
                    <li>Monitor any changes in your sleep patterns</li>
                  </>
                )}
              </ul>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}
