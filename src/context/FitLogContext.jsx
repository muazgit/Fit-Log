'use client';

import { createContext, useContext, useEffect, useState } from 'react';

const FitLogContext = createContext();

function getStoredData(key) {
  if (typeof window === 'undefined') return [];

  try {
    return JSON.parse(localStorage.getItem(key) || '[]');
  } catch {
    return [];
  }
}

export function FitLogProvider({ children }) {
  const [plan, setPlan] = useState(() => getStoredData('fitlog-plan'));
  const [saved, setSaved] = useState(() => getStoredData('fitlog-saved'));
  const [completed, setCompleted] = useState(() =>
    getStoredData('fitlog-completed'),
  );
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const frame = requestAnimationFrame(() => setLoaded(true));
    return () => cancelAnimationFrame(frame);
  }, []);

  // Save plan
  useEffect(() => {
    localStorage.setItem('fitlog-plan', JSON.stringify(plan));
  }, [plan]);

  // Save saved workouts
  useEffect(() => {
    localStorage.setItem('fitlog-saved', JSON.stringify(saved));
  }, [saved]);

  useEffect(() => {
    localStorage.setItem('fitlog-completed', JSON.stringify(completed));
  }, [completed]);

  return (
    <FitLogContext.Provider
      value={{
        plan,
        setPlan,
        saved,
        setSaved,
        completed,
        setCompleted,
        loaded,
      }}
    >
      {children}
    </FitLogContext.Provider>
  );
}

export function useFitLog() {
  return useContext(FitLogContext);
}
