import React from "react";

function StatCard({
  title,
  value,
  description,
  icon: Icon,
  iconBg = "bg-slate-100",
  iconColor = "text-slate-600",
}) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition duration-200 hover:-translate-y-0.5 hover:shadow-md">

      <div className="flex items-start justify-between">

        <div className="min-w-0">

          <p className="text-sm font-medium text-slate-500">
            {title}
          </p>

          <p className="mt-3 text-2xl font-semibold text-slate-900">
            {value}
          </p>

          <p className="mt-2 text-xs leading-5 text-slate-400">
            {description}
          </p>

        </div>

        <div
          className={`shrink-0 rounded-xl p-3 ${iconBg} ${iconColor}`}
        >
          <Icon size={20} />
        </div>

      </div>

    </div>
  );
}

export default StatCard;