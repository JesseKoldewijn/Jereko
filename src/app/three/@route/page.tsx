import IntroCanvas from "./IntroCanvas";

const ThreejsHomePage = () => {
  return (
    <div className="flex min-h-screen w-full flex-col items-center justify-center gap-10 px-6">
      <section className="flex flex-col items-center justify-center gap-2 text-center sm:flex-row sm:gap-4">
        <h1 className="text-2xl font-semibold sm:text-4xl">Threejs</h1>
        <p className="text-balance text-muted-foreground sm:rotate-3">
          The WebGL/WebGPU Library
        </p>
      </section>
      <section className="relative h-[500px] w-full max-w-[90vw] md:max-w-screen-md">
        <div className="absolute inset-0 rounded-3xl bg-foreground opacity-10 blur-sm" />
        <IntroCanvas />
      </section>
    </div>
  );
};

export default ThreejsHomePage;
