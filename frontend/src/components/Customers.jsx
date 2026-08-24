function Customers() {
  return (
    <div className="min-h-screen bg-gray-50 px-8 py-10">

      <div className="mx-auto max-w-7xl">

        <p className="text-sm tracking-[0.25em] text-gray-500">
          CUSTOMERS
        </p>

        <h1 className="mt-2 text-3xl font-semibold text-gray-900">
          Customer Overview
        </h1>

        <p className="mt-2 text-gray-500">
          Understand customer activity and buying behavior.
        </p>

        <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-4">

          <div className="rounded-2xl border border-gray-200 bg-white p-6">
            <p className="text-sm text-gray-500">
              Total Customers
            </p>

            <h2 className="mt-3 text-3xl font-semibold">
              0
            </h2>
          </div>

          <div className="rounded-2xl border border-gray-200 bg-white p-6">
            <p className="text-sm text-gray-500">
              Active Customers
            </p>

            <h2 className="mt-3 text-3xl font-semibold">
              0
            </h2>
          </div>

          <div className="rounded-2xl border border-gray-200 bg-white p-6">
            <p className="text-sm text-gray-500">
              Average Spending
            </p>

            <h2 className="mt-3 text-3xl font-semibold">
              Rs. 0
            </h2>
          </div>

          <div className="rounded-2xl border border-gray-200 bg-white p-6">
            <p className="text-sm text-gray-500">
              Repeat Customers
            </p>

            <h2 className="mt-3 text-3xl font-semibold">
              0
            </h2>
          </div>

        </div>

        <div className="mt-8 rounded-2xl border border-gray-200 bg-white p-6">

          <h2 className="text-xl font-semibold text-gray-900">
            Customer Buying Behavior
          </h2>

          <p className="mt-2 text-sm text-gray-500">
            Most purchased products, purchase frequency,
            spending patterns and popular categories will
            appear here.
          </p>

        </div>

      </div>

    </div>
  );
}

export default Customers;