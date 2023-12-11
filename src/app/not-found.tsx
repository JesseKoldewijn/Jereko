const NotFound = () => {
  return (
    <div className="mt-20 flex h-full flex-1 flex-col items-center justify-center px-4 py-2">
      <div className="my-auto flex max-w-lg flex-col gap-6 text-center">
        <h1 className="text-2xl font-semibold">404 | Not Found</h1>
        <p>
          The page you are looking for does not exist. You may have mistyped the
          address or the page may have moved.
        </p>
      </div>
    </div>
  );
};

export default NotFound;
