export default function DashboardSkeleton() {
  return (
    <div className="mx-auto max-w-7xl animate-pulse space-y-6">
      {/* Header */}
      <div>
        <div className="h-8 w-64 rounded-lg bg-gray-200" />
        <div className="mt-2 h-4 w-80 rounded bg-gray-200" />
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {Array.from({ length: 4 }).map((_, index) => (
          <div
            key={index}
            className="rounded-2xl border border-gray-200 bg-white p-5"
          >
            <div className="flex items-start justify-between">
              <div className="space-y-3">
                <div className="h-4 w-24 rounded bg-gray-200" />
                <div className="h-8 w-32 rounded bg-gray-200" />
              </div>

              <div className="h-11 w-11 rounded-xl bg-gray-200" />
            </div>

            <div className="mt-4 h-4 w-32 rounded bg-gray-200" />
          </div>
        ))}
      </div>

      {/* Main content */}
      <div className="grid grid-cols-1 gap-6 xl:grid-cols-3">
        <div className="h-[390px] rounded-2xl border border-gray-200 bg-white p-6 xl:col-span-2">
          <div className="h-6 w-40 rounded bg-gray-200" />
          <div className="mt-2 h-4 w-64 rounded bg-gray-200" />
          <div className="mt-8 h-72 rounded-xl bg-gray-100" />
        </div>

        <div className="h-[390px] rounded-2xl border border-gray-200 bg-white p-6">
          <div className="h-6 w-40 rounded bg-gray-200" />
          <div className="mt-2 h-4 w-48 rounded bg-gray-200" />

          <div className="mt-8 space-y-6">
            {Array.from({ length: 4 }).map((_, index) => (
              <div
                key={index}
                className="flex items-center gap-3"
              >
                <div className="h-9 w-9 rounded-full bg-gray-200" />

                <div className="flex-1 space-y-2">
                  <div className="h-4 w-32 rounded bg-gray-200" />
                  <div className="h-3 w-20 rounded bg-gray-200" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}