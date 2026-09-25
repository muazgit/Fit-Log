'use client';

import { createContext, useContext, useEffect, useState } from 'react';

const FitLogContext = createContext();

export function FitLogProvider({ children }) {
  const [plan, setPlan] = useState([]);
  const [saved, setSaved] = useState([]);
  const [loaded, setLoaded] = useState(false);

  // Load data from localStorage
  useEffect(() => {
    const storedPlan = localStorage.getItem('fitlog-plan');
    const storedSaved = localStorage.getItem('fitlog-saved');

    if (storedPlan) {
      setPlan(JSON.parse(storedPlan));
    }

    if (storedSaved) {
      setSaved(JSON.parse(storedSaved));
    }

    setLoaded(true);
  }, []);

  // Save plan
  useEffect(() => {
    if (!loaded) return;

    localStorage.setItem('fitlog-plan', JSON.stringify(plan));
  }, [plan, loaded]);

  // Save saved workouts
  useEffect(() => {
    if (!loaded) return;

    localStorage.setItem('fitlog-saved', JSON.stringify(saved));
  }, [saved, loaded]);

  return (
    <FitLogContext.Provider
      value={{
        plan,
        setPlan,
        saved,
        setSaved,
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
