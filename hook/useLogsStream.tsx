// hooks/useLogsStream.ts
import { logType } from '@/types/global';
import { useEffect, useState, useCallback, useRef } from 'react';

export function useLogsStream(apiUrl: string) {
  const [logs, setLogs] = useState<logType[]>([]);
  const [isConnected, setIsConnected] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const eventSourceRef = useRef<EventSource | null>(null);

  const togglePause = useCallback(() => {
    setIsPaused(prev => !prev);
  }, []);

  const closeConnection = useCallback(() => {
    if (eventSourceRef.current) {
      eventSourceRef.current.close();
      setIsConnected(false);
    }
  }, []);

  useEffect(() => {
    if (isPaused) {
      closeConnection();
      return;
    }

    let reconnectTimer: NodeJS.Timeout;

    const connect = () => {
      eventSourceRef.current = new EventSource(apiUrl);

      eventSourceRef.current.onopen = () => {
        setIsConnected(true);
        setError(null);
      };

      eventSourceRef.current.onmessage = (event) => {
        try {
          const newBatch: logType[] = JSON.parse(event.data);
          setLogs(() => [...newBatch]);
        } catch (err) {
          setError(new Error('Erreur de parsing des données'));
        }
      };

      eventSourceRef.current.onerror = () => {
        setIsConnected(false);
        closeConnection();
        
        if (!isPaused) {
          reconnectTimer = setTimeout(connect, 5000);
        }
      };
    };

    connect();

    return () => {
      closeConnection();
      if (reconnectTimer) clearTimeout(reconnectTimer);
    };
  }, [apiUrl, isPaused, closeConnection]);

  return { 
    logs, 
    isConnected, 
    isPaused,
    error,
    togglePause,
    clearLogs: () => setLogs([])
  };
}