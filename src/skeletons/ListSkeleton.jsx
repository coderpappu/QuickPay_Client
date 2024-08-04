
const ListSkeleton = () => {
  return (
    <div>
      {/* Header */}
      <div className="flex justify-between items-center pb-4">
        <div>
          <h2 className="font-semibold text-lg pb-2">Company</h2>
        </div>
      </div>

      {/* Loading Skeleton */}
      <div className="animate-pulse border border-gray-200 bg-white rounded-[4px] p-5">
        {/* Title and Action Bar */}
        <div className="flex justify-between items-center mb-6">
          <div className="w-36 h-8 bg-gray-100 rounded-[4px]"></div>
          <div className="w-20 h-8 bg-gray-100 rounded-[4px]"></div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full">
            {/* Table Headers */}
            <thead className="bg-gray-100 rounded-[4px]">
              <tr>
                <th className="py-2 text-center w-12">
                  <div className="w-6 h-6 bg-gray-100  rounded-[4px]"></div>
                </th>
                <th className="py-2 pl-10">
                  <div className="w-40 h-6 bg-gray-100 rounded-[4px]"></div>
                </th>
                <th className="py-2 text-center">
                  <div className="w-20 h-6 bg-gray-100 rounded-[4px]"></div>
                </th>
                <th className="py-2 text-center">
                  <div className="w-20 h-6 bg-gray-100 rounded-[4px]"></div>
                </th>
                <th className="py-2 text-center w-12">
                  <div className="w-6 h-6 bg-gray-100 rounded-[4px]"></div>
                </th>
                <th className="py-2 text-center w-12">
                  <div className="w-6 h-6 bg-gray-100 rounded-[4px]"></div>
                </th>
              </tr>
            </thead>

            {/* Table Body */}
            <tbody>
              {[1, 2, 3, 4, 5].map((_, index) => (
                <tr
                  key={index}
                  className={index % 2 === 0 ? "" : ""}
                >
                  <td className="py-2 text-sm text-center">
                    <div className="w-6 h-6 bg-gray-200 rounded-[4px]"></div>
                  </td>
                  <td className="py-2 pl-10">
                    <div className="w-40 h-6 bg-gray-200 rounded-[4px]"></div>
                  </td>
                  <td className="py-2 text-center">
                    <div className="w-20 h-6 bg-gray-200 rounded-[4px]"></div>
                  </td>
                  <td className="py-2 text-center">
                    <div className="w-20 h-6 bg-gray-200 rounded-[4px]"></div>
                  </td>
                  <td className="py-2 text-center">
                    <div className="w-6 h-6 bg-gray-200 rounded-[4px]"></div>
                  </td>
                  <td className="py-2 text-center">
                    <div className="w-6 h-6 bg-gray-200 rounded-[4px]"></div>
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
