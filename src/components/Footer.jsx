import Image from 'next/image';
import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="border-t border-[#1c1f26] bg-[#080a0e] px-4 py-8 md:px-8">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <Link href="/" className="inline-flex items-center gap-2">
          <Image
            src="/assets/logo.png"
            alt="FITLOG"
            width={92}
            height={92}
            className="h-5 w-5 object-contain"
          />

          <span className="font-oswald text-xl font-bold tracking-wide text-white">
            FITLOG
          </span>
        </Link>

        <p className="text-sm text-gray-500">
          © 2026 FitLog — Workout Library. Train hard, log honest.
        </p>
      </div>
    </footer>
  );
}
