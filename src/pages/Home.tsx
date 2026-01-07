import { Link } from 'react-router-dom';
import { Activity, ClipboardList } from 'lucide-react';
import { motion } from 'framer-motion';
import ServerWakeDialog from '../components/ServerWakeDialog';

export default function Home() {
  return (
    <>
      {/* Backend Wake Dialog */}
      <ServerWakeDialog />

      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-gray-100">
        <div className="container mx-auto px-4 py-12">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h1 className="text-5xl font-bold text-gray-800 mb-4">
              Welcome to ApneaView
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Your personal assistant for Sleep Apnea analysis. Choose one of the
              modes below to get started.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {/* ECG Card */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <Link to="/ecg" className="block group">
                <div className="bg-white rounded-xl shadow-lg p-8 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border-2 border-transparent hover:border-blue-500">
                  <div className="flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-6 group-hover:bg-blue-500 transition-colors">
                    <Activity className="w-8 h-8 text-blue-600 group-hover:text-white transition-colors" />
                  </div>
                  <h2 className="text-2xl font-bold text-gray-800 mb-3">
                    ECG Analysis Mode
                  </h2>
                  <p className="text-gray-600 leading-relaxed">
                    Upload your ECG data in CSV format and visualize it as a
                    medical-style waveform. Our deep learning model will analyze
                    the data and detect potential sleep apnea patterns.
                  </p>
                  <div className="mt-6 text-blue-600 font-semibold group-hover:translate-x-2 transition-transform inline-block">
                    Get Started →
                  </div>
                </div>
              </Link>
            </motion.div>

            {/* Risk Card */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <Link to="/risk" className="block group">
                <div className="bg-white rounded-xl shadow-lg p-8 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border-2 border-transparent hover:border-green-500">
                  <div className="flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-6 group-hover:bg-green-500 transition-colors">
                    <ClipboardList className="w-8 h-8 text-green-600 group-hover:text-white transition-colors" />
                  </div>
                  <h2 className="text-2xl font-bold text-gray-800 mb-3">
                    Clinical Risk Estimation
                  </h2>
                  <p className="text-gray-600 leading-relaxed">
                    Answer a few questions about your health profile including
                    age, weight, symptoms, and lifestyle factors to calculate
                    your sleep apnea risk score.
                  </p>
                  <div className="mt-6 text-green-600 font-semibold group-hover:translate-x-2 transition-transform inline-block">
                    Get Started →
                  </div>
                </div>
              </Link>
            </motion.div>
          </div>

          {/* About Section */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="mt-12 text-center"
          >
            <div className="bg-white rounded-lg shadow-md p-6 max-w-3xl mx-auto">
              <h3 className="text-lg font-semibold text-gray-800 mb-2">
                About Sleep Apnea
              </h3>
              <p className="text-gray-600 text-sm">
                Sleep apnea is a serious sleep disorder where breathing
                repeatedly stops and starts. Early detection is crucial for
                preventing complications such as heart disease, stroke, and
                diabetes.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </>
  );
}
