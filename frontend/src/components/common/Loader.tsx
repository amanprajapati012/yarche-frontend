export default function Loader() {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-4">
      {Array.from({ length: 8 }).map((_, i) => (
        <div
          key={i}
          className="border rounded-lg p-3 animate-pulse"
        >
          <div className="h-40 bg-gray-200 rounded"></div>

          <div className="h-4 bg-gray-200 mt-3 rounded w-3/4"></div>
          <div className="h-3 bg-gray-200 mt-2 rounded w-1/2"></div>
        </div>
      ))}
    </div>
  );
}