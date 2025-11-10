import { motion } from "framer-motion";
import { HeartPulse, Brain, ClipboardList, AlertCircle } from "lucide-react";
import { Link } from "react-router-dom";

export default function About() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-cyan-50 py-10">
      <div className="container mx-auto px-4 max-w-5xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex items-center justify-between mb-8"
        >
          <Link
            to="/"
            className="text-blue-600 hover:text-blue-700 font-medium flex items-center gap-2"
          >
            ← Back to Home
          </Link>
        </motion.div>

        {/* Overview */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="bg-white/60 backdrop-blur-lg rounded-2xl shadow-md border border-blue-100 p-8 mb-10"
        >
          <div className="flex items-center gap-3 mb-4">
            <Brain className="w-8 h-8 text-blue-600" />
            <h2 className="text-2xl font-semibold text-gray-800">
              Sleep Apnea Detection Using ECG Signals
            </h2>
          </div>
          <p className="text-gray-700 leading-relaxed">
            This AI-powered web platform helps identify potential cases of{" "}
            <strong>sleep apnea</strong> using both{" "}
            <strong>ECG signal analysis</strong> and{" "}
            <strong>clinical risk estimation</strong>. It combines machine
            learning, medical data, and user-friendly design to provide an early
            risk insight into sleep apnea.
          </p>
          <p className="text-gray-700 leading-relaxed mt-3">
            Built as a part of an AI-driven research project, it offers two key
            modules: <strong>ECG Analysis</strong> for AI-based signal
            interpretation and <strong>Risk Estimator</strong> for
            questionnaire-based clinical risk scoring.
          </p>
        </motion.div>

        {/* ECG Analysis Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="bg-white/60 backdrop-blur-lg rounded-2xl shadow-md border border-blue-100 p-8 mb-10"
        >
          <div className="flex items-center gap-3 mb-4">
            <HeartPulse className="w-8 h-8 text-red-500" />
            <h2 className="text-2xl font-semibold text-gray-800">
              1️⃣ ECG Analysis (AI Model-Based Detection)
            </h2>
          </div>

          <p className="text-gray-700 leading-relaxed mb-4">
            The ECG Analysis module uses a{" "}
            <strong>Convolutional Neural Network (CNN)</strong> trained on
            medical ECG data from the{" "}
            <a
            href="https://physionet.org/content/apnea-ecg/1.0.0/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:text-blue-700"
          >
            <em>PhysioNet Apnea-ECG Database (v1.0.0)</em>.
          </a> The model detects
            apnea-related cardiac patterns like RR interval changes and waveform
            irregularities to estimate the likelihood of apnea episodes.
          </p>

          <div className="bg-gray-50 border border-gray-200 rounded-xl p-5 text-gray-700 leading-relaxed">
            <p className="mb-2 font-semibold">How it works:</p>
            <ul className="list-disc list-inside space-y-1 text-sm">
              <li>Upload your ECG data as a <code>.csv</code> file.</li>
              <li>The CNN model processes and normalizes the signal.</li>
              <li>
                Outputs a probability score and classification:
                <ul className="list-inside list-disc ml-5 mt-1">
                  <li>✅ Normal ECG Pattern</li>
                  <li>⚠️ Likely Apnea Condition</li>
                  <li>🚨 Sleep Apnea Detected</li>
                </ul>
              </li>
            </ul>
          </div>

          <p className="mt-4 text-gray-700 leading-relaxed">
            You can also test it using the built-in{" "}
            <strong>“Generate Sample ECGs”</strong> option, which provides
            realistic medical ECG test samples for quick analysis.
          </p>
        </motion.div>

        {/* Risk Estimator Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="bg-white/60 backdrop-blur-lg rounded-2xl shadow-md border border-blue-100 p-8 mb-10"
        >
          <div className="flex items-center gap-3 mb-4">
            <ClipboardList className="w-8 h-8 text-green-600" />
            <h2 className="text-2xl font-semibold text-gray-800">
              2️⃣ Risk Estimator (Clinical Questionnaire-Based Assessment)
            </h2>
          </div>

          <p className="text-gray-700 leading-relaxed mb-4">
            The Risk Estimator module helps users evaluate their sleep apnea
            risk through an interactive questionnaire, even if they don’t have
            ECG data. It calculates a{" "}
            <strong>Sleep Apnea Risk Score (SARS)</strong> using medically
            inspired weighting of user health parameters.
          </p>

          <div className="bg-gray-50 border border-gray-200 rounded-xl p-5 text-gray-700 leading-relaxed">
            <p className="mb-2 font-semibold">How it calculates the score:</p>
            <ul className="list-disc list-inside space-y-1 text-sm">
              <li>
                <strong>BMI</strong> = weight (kg) / (height (m))²
              </li>
              <li>
                Points are assigned based on:
                <ul className="list-disc list-inside ml-5 mt-1">
                  <li>Age: +1 to +2 (if above 40)</li>
                  <li>Gender: +1 if Male</li>
                  <li>BMI: +1 to +3 based on value</li>
                  <li>Snoring: +2 if yes</li>
                  <li>Tiredness: +2 if yes</li>
                  <li>Observed Apnea: +3 if yes</li>
                  <li>High BP: +2 if yes</li>
                </ul>
              </li>
              <li>
                Final Score = Sum of all weighted factors → classified into:
                <ul className="list-disc list-inside ml-5 mt-1">
                  <li>✅ Low Risk (0–3)</li>
                  <li>⚠️ Moderate Risk (4–7)</li>
                  <li>🚨 High Risk (≥8)</li>
                </ul>
              </li>
            </ul>
          </div>

          <p className="mt-4 text-gray-700 leading-relaxed">
            Based on your total score, the app provides a personalized
            interpretation and health recommendations.
          </p>
        </motion.div>

        {/* Disclaimer */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="bg-white/70 backdrop-blur-lg rounded-2xl shadow border border-red-100 p-6 flex items-start gap-4"
        >
          <AlertCircle className="w-6 h-6 text-red-500 mt-1" />
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-1">
              Medical Disclaimer
            </h3>
            <p className="text-gray-700 text-sm leading-relaxed">
              This platform is designed for educational and research purposes
              only. It should <strong>not</strong> be used as a replacement for
              professional medical advice, diagnosis, or treatment. If you
              suspect that you may have sleep apnea or any other sleep disorder,
              please consult a qualified healthcare provider or sleep
              specialist.
            </p>
          </div>
        </motion.div>

        {/* Footer */}
        <div className="text-center mt-10 text-gray-500 text-sm">
          Developed by <strong>Samrat Ghosh</strong> • B.Tech CSE (AI & ML) •{" "}
          <a
            href="https://github.com/Samrat740/Sleep-Apnea-Detection-Using-ECG-Signals"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:text-blue-700"
          >
            GitHub Repository
          </a>
        </div>
      </div>
    </div>
  );
}
