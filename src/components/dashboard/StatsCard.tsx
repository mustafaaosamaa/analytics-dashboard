interface StatsCardProps {
  title: string;
  value: string;
  change: string;
  changeLabel: string;
  icon: string;
  positive?: boolean;
}

export default function StatsCard({
  title,
  value,
  change,
  changeLabel,
  icon,
  positive = true,
}: StatsCardProps) {
  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm transition hover:shadow-md">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm font-medium text-gray-500">
            {title}
          </p>

          <p className="mt-2 text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
            {value}
          </p>
        </div>

        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-50 text-xl">
          {icon}
        </div>
      </div>

      <div className="mt-4 flex items-center gap-2 text-sm">
        <span
          className={
            positive
              ? "font-semibold text-green-600"
              : "font-semibold text-red-600"
          }
        >
          {change}
        </span>

        <span className="text-gray-500">
          {changeLabel}
        </span>
      </div>
    </div>
  );
}