"use client";

const GlobalError = ({
  error: _error,
}: {
  error: Error & { digest?: string };
}) => {
  return (
    <div className="mt-20 flex h-full min-h-[65svh] flex-1 flex-col items-center justify-center px-4 py-2">
      <div className="my-auto flex max-w-lg flex-col gap-6 text-center">
        <h1 className="text-2xl font-semibold">Oops!</h1>
        <p>Something went wrong. Please try again later.</p>
      </div>
    </div>
  );
};
export default GlobalError;
