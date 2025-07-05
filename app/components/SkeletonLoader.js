"use client";

export default function SkeletonLoader({ type = "card", count = 1 }) {
  const renderSkeleton = () => {
    switch (type) {
      case "card":
        return (
          <div className="bg-white rounded-lg shadow p-4 hover-lift">
            <div className="skeleton h-4 w-3/4 mb-2 rounded"></div>
            <div className="skeleton h-6 w-1/2 mb-2 rounded"></div>
            <div className="skeleton h-3 w-full rounded"></div>
          </div>
        );
      case "table":
        return (
          <div className="bg-white rounded-lg shadow p-4">
            <div className="skeleton h-6 w-1/3 mb-4 rounded"></div>
            {[...Array(5)].map((_, i) => (
              <div key={i} className="flex space-x-4 mb-3">
                <div className="skeleton h-4 w-16 rounded"></div>
                <div className="skeleton h-4 w-24 rounded"></div>
                <div className="skeleton h-4 w-20 rounded"></div>
                <div className="skeleton h-4 w-16 rounded"></div>
              </div>
            ))}
          </div>
        );
      case "stats":
        return (
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="bg-white p-4 rounded shadow">
                <div className="skeleton h-4 w-1/2 mb-2 rounded"></div>
                <div className="skeleton h-6 w-1/3 rounded"></div>
              </div>
            ))}
          </div>
        );
      default:
        return <div className="skeleton h-4 w-full rounded"></div>;
    }
  };

  return (
    <div>
      {[...Array(count)].map((_, i) => (
        <div key={i} className={count > 1 ? "mb-4" : ""}>
          {renderSkeleton()}
        </div>
      ))}
    </div>
  );
} 