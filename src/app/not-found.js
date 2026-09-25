import Link from "next/link";

export default function NotFound() {
  return (
    <main className="flex min-h-[70vh] items-center justify-center px-4">
      <div className="text-center">
        <p className="text-sm font-semibold tracking-widest text-lime-400">
          404 ERROR
        </p>

        <h1 className="mt-3 font-oswald text-5xl font-bold uppercase text-white md:text-6xl">
          PAGE NOT FOUND
        </h1>

        <p className="mx-auto mt-4 max-w-md text-sm text-gray-400 md:text-base">
          The page you are looking for does not exist or may have been moved.
        </p>

        <Link
          href="/"
          className="mt-7 inline-block rounded-full bg-lime-400 px-6 py-3 text-sm font-bold text-black transition hover:bg-lime-300"
        >
          GO TO WORKOUTS
        </Link>
      </div>
    </main>
  );
}
