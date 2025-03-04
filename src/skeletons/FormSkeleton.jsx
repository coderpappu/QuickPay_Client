const FormSkeleton = () => {
  return (
    <div className="animate-pulse rounded-md border border-gray-200 bg-white p-5 dark:border dark:border-dark-box dark:bg-dark-card">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {[...Array(10)].map((_, index) => (
          <div key={index} className="mb-4">
            <div className="h-8 rounded-md bg-gray-100 dark:bg-dark-box"></div>
          </div>
        ))}
      </div>
      <div className="mt-4">
        <div className="h-10 rounded-md bg-gray-100 dark:bg-dark-box"></div>
      </div>
    </div>
  );
};

export default FormSkeleton;
