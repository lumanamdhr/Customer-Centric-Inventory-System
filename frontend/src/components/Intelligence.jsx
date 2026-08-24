function Intelligence() {
  return (
    <div className="min-h-screen bg-gray-50 px-8 py-10">

      <div className="mx-auto max-w-7xl">

        <p className="text-sm tracking-[0.25em] text-gray-500">
          INTELLIGENCE
        </p>

        <h1 className="mt-2 text-3xl font-semibold text-gray-900">
          Sales & Inventory Intelligence
        </h1>

        <p className="mt-2 text-gray-500">
          Use historical business data to support better decisions.
        </p>

        <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">

          <div className="rounded-2xl border border-gray-200 bg-white p-6">

            <p className="text-sm text-gray-500">
              Demand Forecast
            </p>

            <h2 className="mt-3 text-xl font-semibold">
              Coming soon
            </h2>

            <p className="mt-2 text-sm text-gray-500">
              Estimate future product demand using historical sales.
            </p>

          </div>

          <div className="rounded-2xl border border-gray-200 bg-white p-6">

            <p className="text-sm text-gray-500">
              Reorder Recommendation
            </p>

            <h2 className="mt-3 text-xl font-semibold">
              Coming soon
            </h2>

            <p className="mt-2 text-sm text-gray-500">
              Recommend products and quantities that may need
              replenishment.
            </p>

          </div>

          <div className="rounded-2xl border border-gray-200 bg-white p-6">

            <p className="text-sm text-gray-500">
              Profit / Loss
            </p>

            <h2 className="mt-3 text-xl font-semibold">
              Coming soon
            </h2>

            <p className="mt-2 text-sm text-gray-500">
              Analyze revenue and estimated profit performance.
            </p>

          </div>

        </div>

      </div>

    </div>
  );
}

export default Intelligence;