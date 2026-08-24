import { useEffect, useState } from "react";

function Sales() {

  const [sales, setSales] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");

  const fetchSales = async () => {

    try {

      const token = localStorage.getItem("access_token");

      if (!token) {
        setMessage("Please login to view sales.");
        setLoading(false);
        return;
      }

      const response = await fetch(
        "http://127.0.0.1:8000/sales",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await response.json();

      if (!response.ok) {
        setMessage(data.detail || "Unable to load sales.");
        return;
      }

      setSales(data);

    } catch (error) {

      console.error("Sales error:", error);
      setMessage("Unable to connect to server.");

    } finally {

      setLoading(false);

    }
  };

  useEffect(() => {
    fetchSales();
  }, []);

  const totalRevenue = sales.reduce(
    (total, sale) => total + sale.total_amount,
    0
  );

  const totalOrders = sales.length;

  const averageOrderValue =
    totalOrders > 0
      ? totalRevenue / totalOrders
      : 0;

  if (loading) {
    return (
      <div className="p-8">
        <p className="text-gray-500">
          Loading sales data...
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
        SALES
        </p>

        <h1 className="mt-2 text-3xl font-semibold text-gray-900">
            Sales Overview
        </h1>

        <p className="mt-2 text-gray-500">
            Monitor sales performance and revenue.
        </p>

      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">

        {/* Total Revenue */}

        <div className="rounded-2xl border border-gray-200 bg-white p-6">

          <p className="text-sm text-gray-500">
            Total Revenue
          </p>

          <p className="mt-2 text-3xl font-semibold text-gray-900">
            Rs. {totalRevenue.toLocaleString()}
          </p>

        </div>


        {/* Total Orders */}

        <div className="rounded-2xl border border-gray-200 bg-white p-6">

          <p className="text-sm text-gray-500">
            Total Orders
          </p>

          <p className="mt-2 text-3xl font-semibold text-gray-900">
            {totalOrders}
          </p>

        </div>


        {/* Average Order */}

        <div className="rounded-2xl border border-gray-200 bg-white p-6">

          <p className="text-sm text-gray-500">
            Average Order Value
          </p>

          <p className="mt-2 text-3xl font-semibold text-gray-900">
            Rs. {averageOrderValue.toFixed(2)}
          </p>

        </div>

      </div>


      {/* Sales List */}

      <div className="mt-8 rounded-2xl border border-gray-200 bg-white p-6">

        <h3 className="mb-6 text-lg font-semibold text-gray-900">
          Recent Sales
        </h3>

        {sales.length === 0 ? (

          <p className="text-sm text-gray-500">
            No sales found.
          </p>

        ) : (

          <div className="space-y-4">

            {sales.map((sale) => (

              <div
                key={sale.id}
                className="flex items-center justify-between border-b border-gray-100 pb-4 last:border-0"
              >

                <div>

                  <p className="font-medium text-gray-900">
                    Sale #{sale.id}
                  </p>

                  <p className="mt-1 text-sm text-gray-500">
                    Customer #{sale.customer_id}
                  </p>

                </div>

                <div className="text-right">

                  <p className="font-medium text-gray-900">
                    Rs. {sale.total_amount}
                  </p>

                  <p className="text-xs text-gray-500">
                    {sale.payment_method} · {sale.status}
                  </p>

                </div>

              </div>

            ))}

          </div>

        )}

      </div>

    </div>
  );
}

export default Sales;

{/*function Sales() {
  return (
    <div className="min-h-screen bg-gray-50 px-8 py-10">

      <div className="mx-auto max-w-7xl">

        <p className="text-sm tracking-[0.25em] text-gray-500">
          SALES
        </p>

        <h1 className="mt-2 text-3xl font-semibold text-gray-900">
          Sales Overview
        </h1>

        <p className="mt-2 text-gray-500">
          Monitor sales performance and customer orders.
        </p>

        <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-4">

          <div className="rounded-2xl border border-gray-200 bg-white p-6">
            <p className="text-sm text-gray-500">
              Total Sales
            </p>

            <h2 className="mt-3 text-3xl font-semibold">
              Rs. 0
            </h2>
          </div>

          <div className="rounded-2xl border border-gray-200 bg-white p-6">
            <p className="text-sm text-gray-500">
              Orders
            </p>

            <h2 className="mt-3 text-3xl font-semibold">
              0
            </h2>
          </div>

          <div className="rounded-2xl border border-gray-200 bg-white p-6">
            <p className="text-sm text-gray-500">
              Average Order
            </p>

            <h2 className="mt-3 text-3xl font-semibold">
              Rs. 0
            </h2>
          </div>

          <div className="rounded-2xl border border-gray-200 bg-white p-6">
            <p className="text-sm text-gray-500">
              Products Sold
            </p>

            <h2 className="mt-3 text-3xl font-semibold">
              0
            </h2>
          </div>

        </div>

      </div>

    </div>
  );
}

export default Sales; */}