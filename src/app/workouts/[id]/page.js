import Image from 'next/image';
import WorkoutActions from '../../../components/WorkoutActions';
import { notFound } from 'next/navigation';

export default async function WorkoutDetails({ params }) {
  const { id } = await params;

  const res = await fetch(`https://api.abcz.workers.dev/api/fitlog/${id}`, {
    cache: 'no-store',
  });

  if (!res.ok) {
    notFound();
  }

  const workout = await res.json();

  return (
    <main className="px-4 py-6 md:px-8">
      <div className="grid gap-10 lg:grid-cols-2">
        {/* Image */}
        <div className="overflow-hidden rounded-2xl">
          <Image
            src={workout.image}
            alt={workout.name}
            width={740}
            height={900}
            className="h-auto w-full rounded-b-2xl object-cover object-top"
          />
        </div>

        {/* Details */}
        <div>
          {/* Title */}
          <h1 className="font-oswald text-4xl font-bold uppercase text-white md:text-5xl">
            {workout.name}
          </h1>

          {/* Description */}
          <p className="mt-3 max-w-2xl text-base leading-6 text-gray-400">
            {workout.description}
          </p>

          {/* Muscle Groups */}
          <div className="mt-5 flex flex-wrap gap-2">
            {workout.muscleGroups.map(group => (
              <span
                key={group}
                className="rounded-full bg-lime-400 px-4 py-1.5 text-xs font-bold uppercase text-black"
              >
                {group}
              </span>
            ))}
          </div>

          {/* Stats */}
          <div className="mt-7 overflow-hidden rounded-2xl border border-[#1c1f26] bg-[#14161c]">
            <div className="flex items-center justify-between border-b border-[#1c1f26] px-6 py-4">
              <span className="text-xs font-bold uppercase tracking-wide text-gray-400">
                Equipment
              </span>
              <span className="text-sm text-gray-200">{workout.equipment}</span>
            </div>

            <div className="flex items-center justify-between border-b border-[#1c1f26] px-6 py-4">
              <span className="text-xs font-bold uppercase tracking-wide text-gray-400">
                Difficulty
              </span>
              <span className="text-sm text-gray-200">
                {workout.difficulty}
              </span>
            </div>

            <div className="flex items-center justify-between border-b border-[#1c1f26] px-6 py-4">
              <span className="text-xs font-bold uppercase tracking-wide text-gray-400">
                Sets
              </span>
              <span className="text-sm text-gray-200">{workout.sets}</span>
            </div>

            <div className="flex items-center justify-between border-b border-[#1c1f26] px-6 py-4">
              <span className="text-xs font-bold uppercase tracking-wide text-gray-400">
                Reps
              </span>
              <span className="text-sm text-gray-200">{workout.reps}</span>
            </div>

            <div className="flex items-center justify-between border-b border-[#1c1f26] px-6 py-4">
              <span className="text-xs font-bold uppercase tracking-wide text-gray-400">
                Duration
              </span>
              <span className="text-sm text-gray-200">
                {workout.duration} min
              </span>
            </div>

            <div className="flex items-center justify-between border-b border-[#1c1f26] px-6 py-4">
              <span className="text-xs font-bold uppercase tracking-wide text-gray-400">
                Calories
              </span>
              <span className="text-sm text-gray-200">
                {workout.caloriesBurned} kcal
              </span>
            </div>

            <div className="flex items-center justify-between px-6 py-4">
              <span className="text-xs font-bold uppercase tracking-wide text-gray-400">
                Rating
              </span>
              <span className="text-sm text-gray-200">{workout.rating}</span>
            </div>
          </div>

          {/* Instructions */}
          <div className="mt-8">
            <h2 className="text-lg font-bold uppercase text-white">
              Instructions
            </h2>

            <ol className="mt-5 space-y-4">
              {workout.instructions.map((instruction, index) => (
                <li
                  key={index}
                  className="flex gap-4 text-sm leading-6 text-gray-300"
                >
                  <span className="text-gray-500">{index + 1}.</span>
                  <span>{instruction}</span>
                </li>
              ))}
            </ol>
          </div>

          {/* Actions */}
          <WorkoutActions workout={workout} />
        </div>
      </div>
    </main>
  );
}
