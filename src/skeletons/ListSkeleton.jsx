const ListSkeleton = () => {
  return (
    <div>
      {/* Header */}

      {/* Loading Skeleton */}
      <div className="animate-pulse rounded-[4px] border border-gray-200 bg-white p-5 dark:border dark:border-dark-box dark:bg-dark-card">
        {/* Title and Action Bar */}
        <div className="mb-6 flex items-center justify-between">
          <div className="h-8 w-36 rounded-[4px] bg-gray-100 dark:bg-dark-box"></div>
          <div className="h-8 w-20 rounded-[4px] bg-gray-100 dark:bg-dark-box"></div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full">
            {/* Table Headers */}
            <thead className="rounded-[4px] bg-gray-100 dark:bg-dark-box">
              <tr>
                <th className="w-12 py-2 text-center">
                  <div className="h-6 w-6 rounded-[4px] bg-gray-100 dark:bg-dark-box"></div>
                </th>
                <th className="py-2 pl-10">
                  <div className="h-6 w-40 rounded-[4px] bg-gray-100 dark:bg-dark-box"></div>
                </th>
                <th className="py-2 text-center">
                  <div className="h-6 w-20 rounded-[4px] bg-gray-100 dark:bg-dark-box"></div>
                </th>
                <th className="py-2 text-center">
                  <div className="h-6 w-20 rounded-[4px] bg-gray-100 dark:bg-dark-box"></div>
                </th>
                <th className="w-12 py-2 text-center">
                  <div className="h-6 w-6 rounded-[4px] bg-gray-100 dark:bg-dark-box"></div>
                </th>
                <th className="w-12 py-2 text-center">
                  <div className="h-6 w-6 rounded-[4px] bg-gray-100 dark:bg-dark-box"></div>
                </th>
              </tr>
            </thead>

            {/* Table Body */}
            <tbody>
              {[1, 2, 3, 4, 5].map((_, index) => (
                <tr key={index} className={index % 2 === 0 ? "" : ""}>
                  <td className="py-2 text-center text-sm">
                    <div className="h-6 w-6 rounded-[4px] bg-gray-200 dark:bg-dark-box"></div>
                  </td>
                  <td className="py-2 pl-10">
                    <div className="h-6 w-40 rounded-[4px] bg-gray-200 dark:bg-dark-box"></div>
                  </td>
                  <td className="py-2 text-center">
                    <div className="h-6 w-20 rounded-[4px] bg-gray-200 dark:bg-dark-box"></div>
                  </td>
                  <td className="py-2 text-center">
                    <div className="h-6 w-20 rounded-[4px] bg-gray-200 dark:bg-dark-box"></div>
                  </td>
                  <td className="py-2 text-center">
                    <div className="h-6 w-6 rounded-[4px] bg-gray-200 dark:bg-dark-box"></div>
                  </td>
                  <td className="py-2 text-center">
                    <div className="h-6 w-6 rounded-[4px] bg-gray-200 dark:bg-dark-box"></div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ListSkeleton;
