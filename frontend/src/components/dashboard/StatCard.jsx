function StatCard({
  title,
  value,
  description,
  icon: Icon,
  trend,
}) {
  return (
    <div className="group rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-teal-200 hover:shadow-lg">

      <div className="flex items-start justify-between">

        <div>

          <p className="text-sm font-medium text-slate-500">
            {title}
          </p>

          <h2 className="mt-3 text-3xl font-semibold tracking-tight text-slate-900">
            {value}
          </h2>

        </div>

        {Icon && (
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-teal-50 text-teal-700 transition group-hover:bg-teal-100">
            <Icon
              size={20}
              strokeWidth={1.8}
            />
          </div>
        )}

      </div>

      {description && (
        <p className="mt-4 text-sm text-slate-500">
          {description}
        </p>
      )}

      {trend && (
        <p className="mt-2 text-xs font-medium text-teal-700">
          {trend}
        </p>
      )}

    </div>
  );
}

export default StatCard;