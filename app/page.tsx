export default function Home() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center px-4">
      <div className="text-center">
        <h1 className="font-heading text-5xl font-bold tracking-tight text-foreground sm:text-7xl">
          We Design & Build
          <br />
          <span className="text-primary">Websites That</span>
          <br />
          Actually Convert.
        </h1>
        <p className="mx-auto mt-6 max-w-xl text-lg text-muted-foreground">
          A premium web development agency crafting digital experiences that
          turn visitors into paying customers.
        </p>
        <div className="mt-8 flex items-center justify-center gap-4">
          <a
            href="/work"
            className="rounded-full border border-border px-6 py-3 text-sm font-medium text-foreground transition-colors hover:bg-muted"
          >
            View Our Work
          </a>
          <a
            href="/contact"
            className="flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition-all hover:brightness-110"
          >
            Start a Project →
          </a>
        </div>
      </div>
    </div>
  );
}
