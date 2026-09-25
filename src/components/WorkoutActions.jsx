'use client';

import { useFitLog } from '../context/FitLogContext';
import { toast } from 'react-toastify';

export default function WorkoutActions({ workout }) {
  const { plan, setPlan, saved, setSaved, loaded } = useFitLog();

  const isInPlan = loaded && plan.some(item => item.id === workout.id);

  const isSaved = loaded && saved.some(item => item.id === workout.id);

  const isPlanFull = loaded && plan.length >= 5;

  const handleAddToPlan = () => {
    if (isInPlan) return;

    setPlan([...plan, workout]);
    toast.success(`${workout.name} added to today's plan`);
  };

  const handleSave = () => {
    if (isSaved) return;

    setSaved([...saved, workout]);
    toast.success(`${workout.name} saved for later`);
  };

  return (
    <div className="mt-8 flex flex-wrap gap-4">
      {loaded ? (
        <button
          onClick={handleAddToPlan}
          disabled={isInPlan || isPlanFull}
          className="rounded-xl bg-lime-400 px-6 py-3 text-sm font-bold text-black transition hover:bg-lime-300 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {isInPlan
            ? 'Added to plan'
            : isPlanFull
              ? 'Plan is full'
              : "Add to today's plan"}
        </button>
      ) : (
        <button
          disabled
          className="rounded-xl bg-lime-400 px-6 py-3 text-sm font-bold text-black opacity-50"
        >
          Add to today&apos;s plan
        </button>
      )}

      <button
        onClick={handleSave}
        disabled={isSaved}
        className="rounded-xl border border-gray-700 px-6 py-3 text-sm font-medium text-gray-200 transition hover:border-gray-500 disabled:cursor-not-allowed disabled:opacity-50"
      >
        {isSaved ? 'Saved' : 'Save for later'}
      </button>
    </div>
  );
}
