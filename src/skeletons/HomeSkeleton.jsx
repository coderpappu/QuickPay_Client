import LoadingSpinner from "./LoadingSpinner";

const HomeSkeleton = () => {
  return (

    <div className="flex items-center justify-center h-full absolute inset-0 bg-gray-100 bg-opacity-50">
      <LoadingSpinner />
    </div>


  );
};

export default HomeSkeleton;
