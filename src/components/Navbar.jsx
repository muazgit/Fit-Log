'use client';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useFitLog } from '../context/FitLogContext';

export default function Navbar() {
  const { plan, saved, loaded } = useFitLog();
  const pathname = usePathname();

  const isWorkoutsActive =
    pathname === '/' || pathname.startsWith('/workouts/');
  const isMyPlanActive = pathname === '/my-plan';

  return (
    <nav className="flex items-center justify-between gap-3 border-b border-[#1c1f26] px-3 py-4 sm:px-4 md:px-8">
      {/* Logo */}
      <Link href="/" className="flex shrink-0 items-center gap-2">
        <Image
          src="/assets/logo.png"
          alt="FITLOG"
          width={24}
          height={24}
          className="h-5 w-5 object-contain"
        />
        <h2 className="font-oswald text-xl font-semibold tracking-wide sm:text-2xl">
          FITLOG
        </h2>
      </Link>

      {/* Navigation */}
      <div className="flex shrink-0 items-center gap-2 sm:gap-4 md:gap-8">
        <Link
          href="/"
          className={
            isWorkoutsActive
              ? 'rounded-full bg-lime-400 px-3 py-2 text-xs font-semibold text-black sm:px-5 sm:text-sm'
              : 'px-1 text-xs font-medium text-gray-400 transition hover:text-white sm:text-sm'
          }
          aria-current={isWorkoutsActive ? 'page' : undefined}
        >
          Workouts
        </Link>

        <Link
          href="/my-plan"
          className={
            isMyPlanActive
              ? 'rounded-full bg-lime-400 px-3 py-2 text-xs font-semibold text-black sm:px-5 sm:text-sm'
              : 'px-1 text-xs font-medium text-gray-400 transition hover:text-white sm:text-sm'
          }
          aria-current={isMyPlanActive ? 'page' : undefined}
        >
          My Plan
        </Link>
      </div>

      {/* Counters */}
      <div className="flex shrink-0 items-center gap-2 sm:gap-4 md:gap-6">
        <Link
          href="/my-plan"
          className="text-xs font-medium text-gray-300 sm:text-sm"
        >
          Plan{' '}
          <span className="ml-0.5 rounded-full bg-lime-400 px-1.5 py-1 text-[10px] font-bold text-black sm:ml-1 sm:px-2 sm:text-xs">
            {loaded ? plan.length : 0}
          </span>
        </Link>

        <Link
          href="/my-plan?saved=true"
          className="text-xs font-medium text-gray-400 sm:text-sm"
        >
          Saved{' '}
          <span
            suppressHydrationWarning
            className="ml-0.5 rounded-full border border-gray-600 px-1.5 py-1 text-[10px] text-gray-300 sm:ml-1 sm:px-2 sm:text-xs"
          >
            {loaded ? saved.length : 0}
          </span>
        </Link>
      </div>
    </nav>
  );
}
