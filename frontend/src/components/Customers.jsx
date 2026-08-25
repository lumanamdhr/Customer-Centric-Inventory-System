import { useEffect, useState } from "react";

function Customer() {

  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");

  const fetchCustomers = async () => {

    try {

      const token = localStorage.getItem("access_token");

      if (!token) {
        setMessage("Please login to view customers.");
        setLoading(false);
        return;
      }

      const response = await fetch(
        "http://127.0.0.1:8000/customers/dashboard",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await response.json();

      if (!response.ok) {
        setMessage(data.detail || "Unable to load customers.");
        return;
      }

      setCustomers(data);

    } catch (error) {

      console.error("Customer error:", error);
      setMessage("Unable to connect to server.");

    } finally {

      setLoading(false);

    }
  };

  useEffect(() => {
    fetchCustomers();
  }, []);

  const totalCustomers = customers.length;

  const totalSpending = customers.reduce(
    (total, customer) =>
      total + customer.total_spending,
    0
  );

  const totalOrders = customers.reduce(
    (total, customer) =>
      total + customer.total_orders,
    0
  );

  if (loading) {
    return (
      <div className="p-8">
        <p className="text-gray-500">
          Loading customer data...
        </p>
      </div>
    );
  }

  if (message) {
    return (
      <div className="p-8">
        <p className="text-red-500">
          {message}
        </p>
      </div>
    );
  }

  return (
    <div className="p-8">

      <div className="mb-8">

        <p className="text-sm tracking-[0.25em] text-gray-500">
          CUSTOMERS
        </p>

        <h1 className="mt-2 text-3xl font-semibold text-gray-900">
          Customer Overview
        </h1>

        <p className="mt-2 text-gray-500">
          Understand customer activity and buying behavior.
        </p>

      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">

        <div className="rounded-2xl border border-gray-200 bg-white p-6">

          <p className="text-sm text-gray-500">
            Total Customers
          </p>

          <p className="mt-2 text-3xl font-semibold">
            {totalCustomers}
          </p>

        </div>

        <div className="rounded-2xl border border-gray-200 bg-white p-6">

          <p className="text-sm text-gray-500">
            Total Orders
          </p>

          <p className="mt-2 text-3xl font-semibold">
            {totalOrders}
          </p>

        </div>

        <div className="rounded-2xl border border-gray-200 bg-white p-6">

          <p className="text-sm text-gray-500">
            Customer Spending
          </p>

          <p className="mt-2 text-3xl font-semibold">
            Rs. {totalSpending.toLocaleString()}
          </p>

        </div>

      </div>

      <div className="mt-8 rounded-2xl border border-gray-200 bg-white p-6">

        <h3 className="mb-6 text-lg font-semibold">
          Customer Activity
        </h3>

        <div className="space-y-4">

          {customers.map((customer) => (

            <div
              key={customer.id}
              className="flex items-center justify-between border-b border-gray-100 pb-4 last:border-0"
            >

              <div>

                <p className="font-medium text-gray-900">
                  {customer.name}
                </p>

                <p className="mt-1 text-sm text-gray-500">
                  {customer.email}
                </p>

              </div>

              <div className="text-right">

                <p className="font-medium">
                  {customer.total_orders} orders
                </p>

                <p className="text-sm text-gray-500">
                  Rs. {customer.total_spending.toLocaleString()}
                </p>

              </div>

            </div>

          ))}

        </div>

      </div>

    </div>
  );
}

export default Customer;


{/*function Customers() {
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

export default Customers;*/}

