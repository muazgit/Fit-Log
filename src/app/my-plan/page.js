'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { Suspense, useState } from 'react';
import { useFitLog } from '../../context/FitLogContext';
import { toast } from 'react-toastify';

function MyPlanContent() {
  const {
    plan: storedPlan,
    setPlan,
    saved: storedSaved,
    setSaved,
    completed,
    setCompleted,
    loaded,
  } = useFitLog();

  const plan = loaded ? storedPlan : [];
  const saved = loaded ? storedSaved : [];
  const searchParams = useSearchParams();
  const activeTab = searchParams.get('saved') === 'true' ? 'saved' : 'plan';

  const [sortBy, setSortBy] = useState('duration');
  const [search, setSearch] = useState('');

  const workouts = activeTab === 'plan' ? plan : saved;

  const filteredWorkouts = workouts.filter(workout => {
    const query = search.toLowerCase().trim();

    if (!query) return true;

    return (
      workout.name.toLowerCase().includes(query) ||
      workout.muscleGroups?.some(group => group.toLowerCase().includes(query))
    );
  });

  const sortedWorkouts = [...filteredWorkouts].sort((a, b) => {
    if (sortBy === 'duration') {
      return a.duration - b.duration;
    }

    if (sortBy === 'calories') {
      return b.caloriesBurned - a.caloriesBurned;
    }

    if (sortBy === 'rating') {
      return b.rating - a.rating;
    }

    return 0;
  });

  const totalMinutes = plan.reduce(
    (total, workout) => total + workout.duration,
    0,
  );

  const totalCalories = plan.reduce(
    (total, workout) => total + workout.caloriesBurned,
    0,
  );

  const handleRemove = id => {
    const workout = workouts.find(item => item.id === id);

    if (!workout) return;

    if (activeTab === 'plan') {
      setPlan(plan.filter(workout => workout.id !== id));
      toast.success(`${workout.name} removed from plan`);
    } else {
      setSaved(saved.filter(workout => workout.id !== id));
      toast.success(`${workout.name} removed from saved`);
    }
  };

  const handleMarkAsDone = id => {
    const workout = plan.find(item => item.id === id);

    if (!workout) return;

    setCompleted([
      ...completed,
      {
        ...workout,
        completionId: `${workout.id}-${completed.length + 1}`,
      },
    ]);

    setPlan(plan.filter(workout => workout.id !== id));

    toast.success(`${workout.name} marked as done`);
  };

  return (
    <main className="px-4 py-10 md:px-8">
      {/* Header */}
      <section className="mb-8">
        <h1 className="font-oswald text-4xl font-bold uppercase text-white md:text-5xl">
          MY PLAN
        </h1>

        <p className="mt-2 text-sm text-gray-400 md:text-base">
          Cap of five lifts for today. Finish them, then load more.
        </p>
      </section>

      {/* Stats */}
      <section className="overflow-hidden rounded-2xl border border-[#1c1f26] bg-[#14161c]">
        <div className="grid md:grid-cols-3">
          {/* Exercises */}
          <div className="border-b border-[#1c1f26] px-6 py-7 md:border-b-0 md:border-r">
            <p className="text-xs text-gray-400">Exercises</p>

            <p className="mt-1 font-oswald text-4xl font-bold text-lime-400">
              {plan.length}
            </p>
          </div>

          {/* Minutes */}
          <div className="border-b border-[#1c1f26] px-6 py-7 md:border-b-0 md:border-r">
            <p className="text-xs text-gray-400">Minutes</p>

            <p className="mt-1 font-oswald text-4xl font-bold text-white">
              {totalMinutes}
            </p>
          </div>

          {/* Calories */}
          <div className="px-6 py-7">
            <p className="text-xs text-gray-400">Calories</p>

            <p className="mt-1 font-oswald text-4xl font-bold text-white">
              {totalCalories}
            </p>
          </div>
        </div>
      </section>

      {/* Controls */}
      <section className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        {/* Tabs */}
        <div className="flex w-fit rounded-xl border border-[#1c1f26] bg-[#14161c] p-1">
          <Link
            href="/my-plan"
            aria-current={activeTab === 'plan' ? 'page' : undefined}
            className={`rounded-lg px-5 py-2 text-sm transition ${
              activeTab === 'plan'
                ? 'bg-[#252a34] font-semibold text-white'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            Today&apos;s Plan
          </Link>

          <Link
            href="/my-plan?saved=true"
            aria-current={activeTab === 'saved' ? 'page' : undefined}
            className={`rounded-lg px-5 py-2 text-sm transition ${
              activeTab === 'saved'
                ? 'bg-[#252a34] font-semibold text-white'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            Saved
          </Link>
        </div>

        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
          {/* Search */}
          <input
            type="text"
            value={search}
            onChange={event => setSearch(event.target.value)}
            placeholder="Search workouts..."
            className="w-full rounded-xl border border-[#1c1f26] bg-[#14161c] px-4 py-2 text-sm text-gray-300 outline-none placeholder:text-gray-600 focus:border-gray-500 sm:w-56"
          />

          {/* Sort */}
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-500">Sort By</span>

            <select
              value={sortBy}
              onChange={event => setSortBy(event.target.value)}
              className="rounded-xl border border-[#1c1f26] bg-[#14161c] px-4 py-2 text-sm text-gray-300 outline-none"
            >
              <option value="duration">Duration</option>
              <option value="calories">Calories</option>
              <option value="rating">Rating</option>
            </select>
          </div>
        </div>
      </section>

      {/* Workout List / Empty State */}
      <section className="mt-6">
        {!loaded ? (
          <div className="flex min-h-[300px] items-center justify-center gap-3 text-sm text-gray-400">
            <span className="h-5 w-5 animate-spin rounded-full border-2 border-gray-700 border-t-lime-400" />
            Loading workouts…
          </div>
        ) : sortedWorkouts.length === 0 ? (
          <div className="flex min-h-[300px] items-center justify-center rounded-2xl border border-dashed border-[#2a2d35]">
            <div className="text-center">
              <h2 className="font-oswald text-xl font-bold uppercase text-white">
                NOTHING HERE YET
              </h2>

              <p className="mt-2 text-sm text-gray-500">
                Browse the library and add a lift to get today moving.
              </p>

              <Link
                href="/"
                className="mt-6 inline-block rounded-full bg-lime-400 px-6 py-3 text-sm font-bold text-black transition hover:bg-lime-300"
              >
                Go to workouts
              </Link>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            {sortedWorkouts.map(workout => (
              <article
                key={workout.id}
                className="flex flex-col gap-4 rounded-2xl border border-[#1c1f26] bg-[#14161c] p-4 md:flex-row md:items-center"
              >
                {/* Thumbnail */}
                <Image
                  src={workout.image}
                  alt={workout.name}
                  width={144}
                  height={80}
                  className="h-20 w-36 shrink-0 rounded-xl object-cover object-top"
                />

                {/* Workout Info */}
                <div className="min-w-0 flex-1">
                  <h2 className="font-oswald text-lg font-bold uppercase text-white">
                    {workout.name}
                  </h2>

                  <p className="mt-1 text-sm text-gray-400">
                    {workout.equipment}
                  </p>

                  {/* Stats */}
                  <div className="mt-2 flex flex-wrap items-center gap-4 text-xs text-gray-400">
                    <span className="flex items-center gap-1.5">
                      <span className="text-lime-400">◷</span>
                      {workout.duration} min
                    </span>

                    <span className="flex items-center gap-1.5">
                      <span className="text-lime-400">●</span>
                      {workout.caloriesBurned} kcal
                    </span>

                    <span className="flex items-center gap-1.5">
                      <span className="text-lime-400">☆</span>
                      {workout.rating}
                    </span>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex shrink-0 items-center gap-3">
                  {/* View Details */}
                  <Link
                    href={`/workouts/${workout.id}`}
                    className="rounded-full border border-gray-700 px-5 py-2 text-sm text-gray-200 transition hover:border-gray-500"
                  >
                    View Details
                  </Link>

                  {/* Mark as Done */}
                  {activeTab === 'plan' && (
                    <button
                      onClick={() => handleMarkAsDone(workout.id)}
                      className="rounded-full bg-lime-400 px-5 py-2 text-sm font-bold text-black transition hover:bg-lime-300"
                    >
                      ✓ Mark as Done
                    </button>
                  )}

                  {/* Remove */}
                  <button
                    onClick={() => handleRemove(workout.id)}
                    aria-label={`Remove ${workout.name}`}
                    className="px-1 text-2xl leading-none text-gray-500 transition hover:text-white"
                  >
                    ×
                  </button>
                </div>
              </article>
            ))}
          </div>
        )}
      </section>

      {loaded && activeTab === 'plan' && completed.length > 0 && (
        <section className="mt-10">
          <h2 className="mb-4 font-oswald text-2xl font-bold uppercase text-white">
            Completed Today
          </h2>

          <div className="space-y-4">
            {completed.map(workout => (
              <article
                key={workout.completionId}
                className="flex flex-col gap-4 rounded-2xl border border-[#1c1f26] bg-[#14161c] p-4 sm:flex-row sm:items-center"
              >
                <Image
                  src={workout.image}
                  alt={workout.name}
                  width={144}
                  height={80}
                  className="h-20 w-36 shrink-0 rounded-xl object-cover object-top"
                />

                <div className="min-w-0 flex-1">
                  <h3 className="font-oswald text-lg font-bold uppercase text-white">
                    {workout.name}
                  </h3>

                  <p className="mt-1 text-sm text-gray-400">
                    {workout.equipment}
                  </p>
                </div>

                <span className="self-start rounded-full border border-lime-400/40 px-3 py-1 text-xs font-semibold text-lime-400 sm:self-center">
                  ✓ Done
                </span>
              </article>
            ))}
          </div>
        </section>
      )}
    </main>
  );
}

export default function MyPlan() {
  return (
    <Suspense
      fallback={
        <main className="px-4 py-10 md:px-8">
          <div className="flex min-h-[300px] items-center justify-center gap-3 text-sm text-gray-400">
            <span className="h-5 w-5 animate-spin rounded-full border-2 border-gray-700 border-t-lime-400" />
            Loading workouts...
          </div>
        </main>
      }
    >
      <MyPlanContent />
    </Suspense>
  );
}
