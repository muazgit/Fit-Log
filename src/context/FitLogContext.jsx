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

  // Save plan
  useEffect(() => {
    localStorage.setItem('fitlog-plan', JSON.stringify(plan));
  }, [plan]);

  // Save saved workouts
  useEffect(() => {
    localStorage.setItem('fitlog-saved', JSON.stringify(saved));
  }, [saved]);

  return (
    <FitLogContext.Provider
      value={{
        plan,
        setPlan,
        saved,
        setSaved,
        loaded: true,
      }}
    >
      {children}
    </FitLogContext.Provider>
  );
}

export function useFitLog() {
  return useContext(FitLogContext);
}
