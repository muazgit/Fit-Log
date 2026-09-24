'use client';

import { useEffect, useState } from 'react';
import Hero from '../components/Hero';
import WorkoutCard from '../components/WorkoutCard';

export default function Home() {
  const [workouts, setWorkouts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getWorkouts = async () => {
      try {
        const res = await fetch('https://api.abcz.workers.dev/api/fitlog');

        const data = await res.json();

        setWorkouts(data);
        setLoading(false);
      } catch (error) {
        console.error('Failed to load workouts:', error);
        setLoading(false);
      }
    };

    getWorkouts();
  }, []);

  return (
    <main>
      <Hero />

      <section id="library" className="px-4 py-16 md:px-8 lg:px-10">
        <div className="mb-8">
          <h2 className="font-oswald text-4xl font-bold uppercase text-white md:text-5xl">
            THE LIBRARY
          </h2>

          <p className="mt-2 text-sm text-gray-400 md:text-base">
            Twelve lifts covering every major muscle group.
          </p>
        </div>

        {/* Cards */}

        {loading ? (
          <p className="text-gray-400">Loading workouts…</p>
        ) : (
          <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
            {workouts.map(workout => (
              <WorkoutCard key={workout.id} workout={workout} />
            ))}
          </div>
        )}
      </section>
    </main>
  );
}
