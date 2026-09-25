// import Image from 'next/image';
// import Link from 'next/link';
// import { notFound } from 'next/navigation';

// async function getWorkoutById(id) {
//   try {
//     const res = await fetch('https://api.abcz.workers.dev/api/fitlog', {
//       cache: 'no-store',
//     });

//     if (!res.ok) {
//       return null;
//     }

//     const workouts = await res.json();
//     return workouts.find(workout => String(workout.id) === String(id)) ?? null;
//   } catch (error) {
//     return null;
//   }
// }

// export default async function WorkoutDetailPage({ params }) {
//   const { id } = await params;
//   const workout = await getWorkoutById(id);

//   if (!workout) {
//     notFound();
//   }

//   const muscleGroups = Array.isArray(workout.muscleGroups)
//     ? workout.muscleGroups
//     : [];
//   const instructions = Array.isArray(workout.instructions)
//     ? workout.instructions
//     : [];
//   const benefits = Array.isArray(workout.benefits) ? workout.benefits : [];

//   const detailStats = [
//     { label: 'Duration', value: `${workout.duration ?? 0} min` },
//     { label: 'Calories', value: `${workout.caloriesBurned ?? 0} kcal` },
//     { label: 'Rating', value: `${workout.rating ?? 'N/A'} / 5` },
//     { label: 'Equipment', value: workout.equipment ?? 'Bodyweight' },
//   ];

//   return (
//     <main className="px-4 py-10 md:px-8 lg:px-10">
//       <div className="mx-auto max-w-6xl">
//         <Link
//           href="/"
//           className="inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.2em] text-lime-400 transition hover:text-lime-300"
//         >
//           ← Back to library
//         </Link>

//         <article className="mt-6 overflow-hidden rounded-2xl border border-[#1c1f26] bg-[#14161c]">
//           <div className="grid gap-0 lg:grid-cols-[1.2fr_0.8fr]">
//             <div className="relative h-full min-h-[320px]">
//               <Image
//                 src={workout.image || '/assets/banner.png'}
//                 alt={workout.name}
//                 width={1200}
//                 height={900}
//                 className="h-full w-full object-cover object-center"
//               />
//             </div>

//             <div className="flex flex-col justify-center p-6 md:p-8">
//               <div className="flex flex-wrap gap-2">
//                 {muscleGroups.map(group => (
//                   <span
//                     key={group}
//                     className="rounded-full bg-lime-400 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.12em] text-black"
//                   >
//                     {group}
//                   </span>
//                 ))}
//               </div>

//               <h1 className="mt-5 font-oswald text-4xl font-bold uppercase text-white md:text-5xl">
//                 {workout.name}
//               </h1>

//               <p className="mt-4 text-base leading-7 text-gray-400">
//                 {workout.description ||
//                   `Build strength and control with ${workout.name}. This focused movement pattern helps improve power, posture, and full-body coordination.`}
//               </p>

//               <div className="mt-6 grid grid-cols-2 gap-4">
//                 {detailStats.map(stat => (
//                   <div
//                     key={stat.label}
//                     className="rounded-xl border border-[#1c1f26] bg-[#0f1116] p-3"
//                   >
//                     <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-gray-500">
//                       {stat.label}
//                     </p>
//                     <p className="mt-2 text-lg font-semibold text-white">
//                       {stat.value}
//                     </p>
//                   </div>
//                 ))}
//               </div>

//               <div className="mt-8 flex flex-wrap gap-3">
//                 <button className="rounded-md bg-lime-400 px-5 py-3 text-sm font-bold text-black transition hover:bg-lime-300">
//                   Add to my plan
//                 </button>
//                 <button className="rounded-md border border-[#343842] px-5 py-3 text-sm font-bold text-white transition hover:border-gray-500">
//                   Save workout
//                 </button>
//               </div>
//             </div>
//           </div>
//         </article>

//         <section className="mt-10 grid gap-6 lg:grid-cols-2">
//           <div className="rounded-2xl border border-[#1c1f26] bg-[#14161c] p-6 md:p-8">
//             <h2 className="font-oswald text-2xl font-bold uppercase text-white">
//               How to perform
//             </h2>

//             {instructions.length > 0 ? (
//               <ol className="mt-5 space-y-4 text-gray-300">
//                 {instructions.map((step, index) => (
//                   <li key={`${step}-${index}`} className="flex gap-3">
//                     <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-lime-400 text-xs font-bold text-black">
//                       {index + 1}
//                     </span>
//                     <span className="leading-7">{step}</span>
//                   </li>
//                 ))}
//               </ol>
//             ) : (
//               <p className="mt-5 text-gray-400">
//                 Follow a steady tempo, brace through the core, and focus on
//                 smooth, controlled reps to get the most from this movement.
//               </p>
//             )}
//           </div>

//           <div className="rounded-2xl border border-[#1c1f26] bg-[#14161c] p-6 md:p-8">
//             <h2 className="font-oswald text-2xl font-bold uppercase text-white">
//               Benefits
//             </h2>

//             {benefits.length > 0 ? (
//               <ul className="mt-5 space-y-3 text-gray-300">
//                 {benefits.map((benefit, index) => (
//                   <li
//                     key={`${benefit}-${index}`}
//                     className="flex items-start gap-3"
//                   >
//                     <span className="mt-1 inline-block h-2.5 w-2.5 rounded-full bg-lime-400" />
//                     <span>{benefit}</span>
//                   </li>
//                 ))}
//               </ul>
//             ) : (
//               <ul className="mt-5 space-y-3 text-gray-300">
//                 <li className="flex items-start gap-3">
//                   <span className="mt-1 inline-block h-2.5 w-2.5 rounded-full bg-lime-400" />
//                   <span>Builds strength and muscular control.</span>
//                 </li>
//                 <li className="flex items-start gap-3">
//                   <span className="mt-1 inline-block h-2.5 w-2.5 rounded-full bg-lime-400" />
//                   <span>Improves movement quality and confidence.</span>
//                 </li>
//                 <li className="flex items-start gap-3">
//                   <span className="mt-1 inline-block h-2.5 w-2.5 rounded-full bg-lime-400" />
//                   <span>Helps support long-term training consistency.</span>
//                 </li>
//               </ul>
//             )}
//           </div>
//         </section>
//       </div>
//     </main>
//   );
// }

import Image from 'next/image';

export default async function WorkoutDetails({ params }) {
  const { id } = await params;

  const res = await fetch(`https://api.abcz.workers.dev/api/fitlog/${id}`, {
    cache: 'no-store',
  });

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
          <div className="mt-8 flex flex-wrap gap-4">
            <button className="rounded-xl bg-lime-400 px-6 py-3 text-sm font-bold text-black transition hover:bg-lime-300">
              Add to today&apos;s plan
            </button>

            <button className="rounded-xl border border-gray-700 px-6 py-3 text-sm font-medium text-gray-200 transition hover:border-gray-500">
              Save for later
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}
