import { createContext, useContext, useEffect, useState } from 'react';
import toast from 'react-hot-toast';

const BACKEND_URL =
  'https://sleep-apnea-detection-using-ecg-signals.onrender.com';

type ServerState = 'idle' | 'waking' | 'online';

interface ServerContextType {
  serverState: ServerState;
  startServer: () => void;
}

const ServerContext = createContext<ServerContextType | null>(null);

export function ServerProvider({ children }: { children: React.ReactNode }) {
  const [serverState, setServerState] = useState<ServerState>('idle');

  const startServer = () => {
    if (serverState !== 'idle') return;

    setServerState('waking');

    const pollServer = async () => {
      try {
        const res = await fetch(BACKEND_URL);
        if (res.ok) {
          setServerState('online');
          toast.success('Connected to backend server 🚀');
          sessionStorage.setItem('server_awake', 'true');
          return;
        }
      } catch {}

      setTimeout(pollServer, 3000);
    };

    pollServer();
  };

  // Optional: restore state if refreshed
  useEffect(() => {
    if (sessionStorage.getItem('server_awake')) {
      setServerState('online');
    }
  }, []);

  return (
    <ServerContext.Provider value={{ serverState, startServer }}>
      {children}
    </ServerContext.Provider>
  );
}

export function useServer() {
  const ctx = useContext(ServerContext);
  if (!ctx) throw new Error('useServer must be inside ServerProvider');
  return ctx;
}
