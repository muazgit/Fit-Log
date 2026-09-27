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
          <span className="inline-flex items-center gap-2">
            <svg
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              className="h-4 w-4"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 5v14m-7-7h14"
              />
            </svg>
            {isInPlan
              ? 'Added to plan'
              : isPlanFull
                ? 'Plan is full'
                : "Add to today's plan"}
          </span>
        </button>
      ) : (
        <button
          disabled
          className="rounded-xl bg-lime-400 px-6 py-3 text-sm font-bold text-black opacity-50"
        >
          <span className="inline-flex items-center gap-2">
            <svg
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              className="h-4 w-4"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 5v14m-7-7h14"
              />
            </svg>
            Add to today&apos;s plan
          </span>
        </button>
      )}

      <button
        onClick={handleSave}
        disabled={isSaved}
        className="rounded-xl border border-gray-700 px-6 py-3 text-sm font-medium text-gray-200 transition hover:border-gray-500 disabled:cursor-not-allowed disabled:opacity-50"
      >
        <span className="inline-flex items-center gap-2">
          <svg
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            className="h-4 w-4"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 4.75A1.75 1.75 0 0 1 7.75 3h8.5A1.75 1.75 0 0 1 18 4.75V21l-6-3-6 3V4.75Z"
            />
          </svg>
          {isSaved ? 'Saved' : 'Save for later'}
        </span>
      </button>
    </div>
  );
}
