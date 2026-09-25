'use client';

import { useFitLog } from '../context/FitLogContext';

export default function WorkoutActions({ workout }) {
  const { plan, setPlan, saved, setSaved } = useFitLog();

  const isInPlan = plan.some(item => item.id === workout.id);
  const isSaved = saved.some(item => item.id === workout.id);

  const handleAddToPlan = () => {
    if (isInPlan) return;

    setPlan([...plan, workout]);
  };

  const handleSave = () => {
    if (isSaved) return;

    setSaved([...saved, workout]);
  };

  return (
    <div className="mt-8 flex flex-wrap gap-4">
      <button
        onClick={handleAddToPlan}
        disabled={isInPlan}
        className="rounded-xl bg-lime-400 px-6 py-3 text-sm font-bold text-black transition hover:bg-lime-300 disabled:cursor-not-allowed disabled:opacity-50"
      >
        {isInPlan ? 'Added to plan' : "Add to today's plan"}
      </button>

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
