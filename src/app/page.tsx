
export default function Home() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans">
      <main className="flex min-h-screen w-full max-w-3xl flex-col items-center justify-between py-32 px-16 bg-white sm:items-start">
        <h1 className="text-5xl font-extrabold text-zinc-900 sm:text-6xl">
          Our Application Name
        </h1>
        <div className="flex flex-col gap-4 text-base font-medium sm:flex-row">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
            <input
              type="text"
              name="username"
              placeholder="Username"
              className="rounded-md border border-zinc-200 px-3 py-2 text-sm text-zinc-900 placeholder-zinc-400 bg-white"
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              className="rounded-md border border-zinc-200 px-3 py-2 text-sm text-zinc-900 placeholder-zinc-400 bg-white"
            />
          </div>
          <a
            href="/login"
            className="rounded-md bg-zinc-100 px-4 py-2 text-zinc-900 hover:bg-zinc-200"
          >
            Login
          </a>
          <a
            href="/register"
            className="rounded-md bg-zinc-100 px-4 py-2 text-zinc-900 hover:bg-zinc-200"
          >
            Register
          </a>
        </div>
      </main>
    </div>
  );
}
