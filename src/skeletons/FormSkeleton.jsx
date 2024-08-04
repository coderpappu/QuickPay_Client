const FormSkeleton = () => {
    return (
        <div className="animate-pulse border border-gray-200 bg-white rounded-md p-5">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[...Array(15)].map((_, index) => (
                    <div key={index} className="mb-4">
                        <div className="h-8 bg-gray-100 rounded-md"></div>
                    </div>
                ))}
            </div>
            <div className="mt-4">
                <div className="h-10 bg-gray-100 rounded-md"></div>
            </div>
        </div>
    )
}

export default FormSkeleton