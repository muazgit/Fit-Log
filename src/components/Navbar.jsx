import Link from 'next/link';

export default function Navbar() {
  return (
    <nav className="flex items-center justify-between border-b border-[#1c1f26] px-4 py-4 md:px-8">
      {/* Logo */}
      <div>
        <h2 className="font-oswald text-2xl font-semibold tracking-wide">
          FITLOG
        </h2>
      </div>

      {/* Navigation */}
      <div className="flex items-center gap-8">
        <Link
          href="/"
          className="rounded-full bg-lime-400 px-5 py-2 text-sm font-semibold text-black"
        >
          Workouts
        </Link>

        <Link
          href="/my-plan"
          className="text-sm font-medium text-gray-400 transition hover:text-white"
        >
          My Plan
        </Link>
      </div>

      {/* Counters */}
      <div className="flex items-center gap-6">
        <Link href="/my-plan" className="text-sm font-medium text-gray-300">
          Plan
          <span className="ml-2 rounded-full bg-lime-400 px-2.5 py-1 text-xs font-bold text-black">
            0
          </span>
        </Link>

        <Link href="/my-plan" className="text-sm font-medium text-gray-400">
          Saved
          <span className="ml-2 rounded-full border border-gray-600 px-2.5 py-1 text-xs text-gray-300">
            0
          </span>
        </Link>
      </div>
    </nav>
  );
}
