import Link from 'next/link';
import Image from 'next/image';

export default function WorkoutCard({ workout, aboveTheFold = false }) {
  return (
    <Link
      href={`/workouts/${workout.id}`}
      className="block overflow-hidden rounded-2xl border border-[#1c1f26] bg-[#14161c] transition hover:border-[#343842]"
    >
      {/* Image */}
      <Image
        src={workout.image}
        alt={workout.name}
        width={740}
        height={500}
        loading={aboveTheFold ? 'eager' : 'lazy'}
        className="h-64 w-full object-cover object-top"
      />

      {/* Card Content */}
      <div className="p-5">
        {/* Muscle Groups */}
        <div className="flex flex-wrap gap-2">
          {workout.muscleGroups.map(group => (
            <span
              key={group}
              className="rounded-full bg-lime-400 px-3 py-1 text-xs font-bold uppercase text-black"
            >
              {group}
            </span>
          ))}
        </div>

        {/* Workout Name */}
        <h3 className="mt-4 font-oswald text-xl font-bold uppercase text-white">
          {workout.name}
        </h3>

        {/* Equipment */}
        <p className="mt-1 text-sm text-gray-400">{workout.equipment}</p>

        {/* Divider */}
        <div className="my-4 border-t border-[#1c1f26]"></div>

        {/* Stats */}
        <div className="flex items-center gap-4 text-xs text-gray-400">
          <span className="flex items-center gap-1.5">
            <Image
              src="/assets/icons/clock.png"
              alt=""
              width={16}
              height={16}
            />
            {workout.duration} min
          </span>

          <span className="flex items-center gap-1.5">
            <Image
              src="/assets/icons/flame.png"
              alt=""
              width={16}
              height={16}
            />
            {workout.caloriesBurned} kcal
          </span>

          <span className="flex items-center gap-1.5">
            <Image src="/assets/icons/star.png" alt="" width={16} height={16} />
            {workout.rating}
          </span>
        </div>
      </div>
    </Link>
  );
}
