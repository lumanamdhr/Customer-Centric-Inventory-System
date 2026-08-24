function StatCard({ title, value, description }) { //porps as infos being passed into component
  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
      
      <p className="text-sm font-medium text-gray-500">
        {title}
      </p>

      <h2 className="mt-3 text-3xl font-semibold text-gray-900">
        {value}
      </h2>

      {description && (
        <p className="mt-2 text-sm text-gray-500">
          {description}
        </p>
      )}

    </div>
  );
}

export default StatCard;