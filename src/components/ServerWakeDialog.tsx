import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { useServer } from '../context/ServerContext';


export default function ServerWakeDialog() {
  const { startServer } = useServer();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!sessionStorage.getItem('server_awake')) {
      setOpen(true);
    }
  }, []);

  if (!open) return null;

  const handleClick = () => {
    startServer();   // background work starts
    setOpen(false);  // dialog closes immediately
  };

  return (
  <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.25 }}
      className="bg-white rounded-2xl px-5 py-4 w-[90%] max-w-xs shadow-2xl"
    >
      <h2 className="text-base font-semibold text-gray-800 mb-1 text-center">
        Service Alert
      </h2>

      <p className="text-xs text-gray-500 text-center mb-4 leading-relaxed">
        This app uses a free-tier backend which may be inactive.
        Start it once and continue browsing normally.
      </p>

      <button
        onClick={handleClick}
        className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-xl text-sm font-medium transition active:scale-95"
      >
        Start Server
      </button>
    </motion.div>
  </div>
);

}
