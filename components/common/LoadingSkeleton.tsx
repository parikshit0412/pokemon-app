export default function LoadingSkeleton() {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {[...Array(8)].map((_, i) => (
          <div key={i} className="bg-white rounded-lg shadow-md overflow-hidden animate-pulse">
            <div className="p-4">
              <div className="bg-gray-200 h-32 w-32 mx-auto rounded-full mb-4"></div>
              <div className="h-6 bg-gray-200 rounded w-3/4 mx-auto"></div>
            </div>
            <div className="bg-gray-100 px-4 py-3">
              <div className="h-4 bg-gray-200 rounded w-1/4 ml-auto"></div>
            </div>
          </div>
        ))}
      </div>
    );
  }