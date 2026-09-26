import Image from 'next/image';

export default function Hero() {
  return (
    <section className="px-4 py-6 md:px-8">
      <div className="flex min-h-[500px] items-center justify-between rounded-2xl border border-[#1c1f26] bg-[#14161c] px-8 py-12 md:px-14 lg:px-16">
        {/* Hero Content */}
        <div className="max-w-2xl">
          <p className="mb-6 text-sm font-semibold tracking-widest text-lime-400">
            WORKOUT LIBRARY
          </p>

          <h1 className="font-oswald text-5xl font-bold uppercase leading-[0.95] tracking-tight text-white md:text-6xl lg:text-7xl">
            TRAIN WITH INTENT. LOG EVERY SET.
          </h1>

          <p className="mt-7 max-w-xl text-base leading-7 text-gray-400 md:text-lg">
            FitLog is a dark, no-nonsense gym companion: pick a lift, lock it
            into today&apos;s plan, and watch the week&apos;s work add up.
          </p>

          <a
            href="#library"
            className="mt-8 inline-flex items-center gap-2 rounded-md bg-lime-400 px-6 py-3 text-sm font-bold text-black transition hover:bg-lime-300"
          >
            BROWSE WORKOUTS
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
                d="M5 12h14m-6-6 6 6-6 6"
              />
            </svg>
          </a>
        </div>

        {/* Hero Image */}
        <div className="hidden lg:block">
          <div className="flex h-80 w-80 items-center justify-center text-gray-600">
            <Image
              src="/assets/banner.png"
              alt="Workout banner"
              className="h-80 w-80 object-cover"
              width={320}
              height={320}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
