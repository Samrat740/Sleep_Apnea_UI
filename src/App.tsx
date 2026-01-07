import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import Overview from './pages/Overview';
import ECGAnalyzer from './pages/ECGAnalyzer';
import RiskEstimator from './pages/RiskEstimator';

function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <Header />

        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/overview" element={<Overview />} />
            <Route path="/ecg" element={<ECGAnalyzer />} />
            <Route path="/risk" element={<RiskEstimator />} />
          </Routes>
        </main>

        <Footer />

        {/* Toast Notifications */}
        <Toaster position="top-right" />
      </div>
    </Router>
  );
}

export default App;
