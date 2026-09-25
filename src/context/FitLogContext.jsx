'use client';

import { createContext, useContext, useState } from 'react';

const FitLogContext = createContext();

export function FitLogProvider({ children }) {
  const [plan, setPlan] = useState([]);
  const [saved, setSaved] = useState([]);

  return (
    <FitLogContext.Provider
      value={{
        plan,
        setPlan,
        saved,
        setSaved,
      }}
    >
      {children}
    </FitLogContext.Provider>
  );
}

export function useFitLog() {
  return useContext(FitLogContext);
}
