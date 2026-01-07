import { useState } from "react";
import { Link } from "react-router-dom";
import { Moon, Menu, X, Beaker } from "lucide-react";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="backdrop-blur-md bg-white/50 border-b border-blue-200/40 sticky top-0 z-50 shadow-sm">
      <div className="container mx-auto px-4 py-2 flex items-center justify-between">
        {/* Left Section: Logo */}
        <Link
          to="/"
          className="flex items-center gap-2 hover:opacity-90 transition-opacity"
        >
          <div className="bg-gradient-to-r from-blue-500 to-cyan-400 p-2 rounded-xl shadow-sm">
            <Moon className="w-5 h-5 text-white" />
          </div>
          <h1 className="text-base sm:text-lg font-semibold text-gray-800 tracking-tight">
            Sleep Apnea Detection
          </h1>
        </Link>

        {/* Mobile Menu Button */}
        <button
          className="sm:hidden p-2 rounded-lg hover:bg-blue-100 transition"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>

        {/* Desktop Navigation */}
        <nav className="hidden sm:flex items-center gap-4">
          <Link
            to="/overview"
            className="text-gray-700 hover:text-blue-600 text-sm font-medium transition-colors"
          >
            Overview
          </Link>
          <Link
            to="/ecg"
            className="text-gray-700 hover:text-blue-600 text-sm font-medium transition-colors"
          >
            ECG Analysis
          </Link>
          <Link
            to="/risk"
            className="text-gray-700 hover:text-blue-600 text-sm font-medium transition-colors"
          >
            Risk Estimator
          </Link>

          <a
            href="/sample_ecg.zip"
            download="sample_ecg.zip"
            className="flex items-center gap-2 bg-gradient-to-r from-sky-400 to-blue-500 text-white text-sm font-medium px-4 py-2 rounded-lg shadow hover:opacity-90 transition"
          >
            <Beaker className="w-4 h-4" />
            Sample ECG CSV
          </a>
        </nav>
      </div>

      {/* Mobile Dropdown Menu */}
      {menuOpen && (
        <div className="sm:hidden bg-white/70 backdrop-blur-md border-t border-blue-100/40 px-4 py-3 space-y-3">
          <Link
            to="/overview"
            className="text-gray-700 hover:text-blue-600 text-sm font-medium transition-colors"
          >
            Overview
          </Link>
          <Link
            to="/ecg"
            onClick={() => setMenuOpen(false)}
            className="block text-gray-700 hover:text-blue-600 text-sm font-medium"
          >
            ECG Analysis
          </Link>
          <Link
            to="/risk"
            onClick={() => setMenuOpen(false)}
            className="block text-gray-700 hover:text-blue-600 text-sm font-medium"
          >
            Risk Estimator
          </Link>

          <a
            href="/sample_ecg.zip"
            download="sample_ecg.zip"
            onClick={() => setMenuOpen(false)}
            className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-sky-400 to-blue-500 text-white text-sm font-medium px-4 py-2 rounded-lg shadow hover:opacity-90 transition"
          >
            <Beaker className="w-4 h-4" />
            Download Sample ECG CSV
          </a>
        </div>
      )}
    </header>
  );
}
