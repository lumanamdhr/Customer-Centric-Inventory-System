import { useEffect, useMemo, useState } from "react";
import {
  CircleDollarSign,
  ShoppingBag,
  TrendingUp,
  CreditCard,
} from "lucide-react";

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

  // -----------------------------
  // SALES CALCULATIONS
  // -----------------------------

  const totalRevenue = useMemo(() => {
    return sales.reduce(
      (total, sale) => total + Number(sale.total_amount || 0),
      0
    );
  }, [sales]);

  const totalOrders = sales.length;

  const averageOrderValue =
    totalOrders > 0
      ? totalRevenue / totalOrders
      : 0;

  const completedSales = sales.filter(
    (sale) => sale.status?.toLowerCase() === "completed"
  ).length;

  // -----------------------------
  // LOADING STATE
  // -----------------------------

  if (loading) {
    return (
      <div className="py-10">
        <p className="text-sm text-slate-500">
          Loading sales data...
        </p>
      </div>
    );
  }

  // -----------------------------
  // ERROR STATE
  // -----------------------------

  if (message) {
    return (
      <div className="rounded-2xl border border-red-100 bg-red-50 p-6">
        <p className="text-sm text-red-600">
          {message}
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-8">

      {/* PAGE HEADER */}
      <div>
        <p className="text-xs font-semibold uppercase tracking-[0.25em] text-teal-600">
          Sales
        </p>

        <h1 className="mt-2 text-3xl font-semibold tracking-tight text-slate-900">
          Sales Overview
        </h1>

        <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-500">
          Monitor revenue, orders, payment activity, and overall sales
          performance.
        </p>
      </div>

      {/* SUMMARY CARDS */}
      <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">

        {/* REVENUE */}
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
          <div className="flex items-start justify-between">

            <div>
              <p className="text-sm font-medium text-slate-500">
                Total Revenue
              </p>

              <p className="mt-3 text-2xl font-semibold text-slate-900">
                Rs. {totalRevenue.toLocaleString()}
              </p>

              <p className="mt-2 text-xs text-slate-400">
                Revenue from recorded sales
              </p>
            </div>

            <div className="rounded-xl bg-teal-50 p-3 text-teal-600">
              <CircleDollarSign size={20} />
            </div>

          </div>
        </div>

        {/* ORDERS */}
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
          <div className="flex items-start justify-between">

            <div>
              <p className="text-sm font-medium text-slate-500">
                Total Orders
              </p>

              <p className="mt-3 text-2xl font-semibold text-slate-900">
                {totalOrders}
              </p>

              <p className="mt-2 text-xs text-slate-400">
                Recorded customer orders
              </p>
            </div>

            <div className="rounded-xl bg-teal-50 p-3 text-teal-600">
              <ShoppingBag size={20} />
            </div>

          </div>
        </div>

        {/* AVERAGE ORDER */}
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
          <div className="flex items-start justify-between">

            <div>
              <p className="text-sm font-medium text-slate-500">
                Average Order Value
              </p>

              <p className="mt-3 text-2xl font-semibold text-slate-900">
                Rs. {averageOrderValue.toFixed(2)}
              </p>

              <p className="mt-2 text-xs text-slate-400">
                Average revenue per order
              </p>
            </div>

            <div className="rounded-xl bg-teal-50 p-3 text-teal-600">
              <TrendingUp size={20} />
            </div>

          </div>
        </div>

        {/* COMPLETED */}
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
          <div className="flex items-start justify-between">

            <div>
              <p className="text-sm font-medium text-slate-500">
                Completed Sales
              </p>

              <p className="mt-3 text-2xl font-semibold text-slate-900">
                {completedSales}
              </p>

              <p className="mt-2 text-xs text-slate-400">
                Successfully completed orders
              </p>
            </div>

            <div className="rounded-xl bg-teal-50 p-3 text-teal-600">
              <CreditCard size={20} />
            </div>

          </div>
        </div>

      </div>

      {/* RECENT SALES */}
      <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">

        <div className="border-b border-slate-200 px-6 py-5">
          <h2 className="text-lg font-semibold text-slate-900">
            Recent Sales
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            Latest recorded customer transactions.
          </p>
        </div>

        {sales.length === 0 ? (
          <div className="px-6 py-12 text-center">
            <p className="text-sm text-slate-500">
              No sales found.
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">

            <table className="min-w-full text-sm">

              <thead className="bg-slate-50 text-left text-xs uppercase tracking-wide text-slate-500">
                <tr>
                  <th className="px-6 py-4 font-semibold">
                    Sale ID
                  </th>

                  <th className="px-6 py-4 font-semibold">
                    Customer
                  </th>

                  <th className="px-6 py-4 font-semibold">
                    Payment
                  </th>

                  <th className="px-6 py-4 font-semibold">
                    Status
                  </th>

                  <th className="px-6 py-4 text-right font-semibold">
                    Amount
                  </th>
                </tr>
              </thead>

              <tbody className="divide-y divide-slate-100">

                {sales.map((sale) => (
                  <tr
                    key={sale.id}
                    className="transition hover:bg-slate-50"
                  >

                    <td className="px-6 py-4 font-medium text-slate-900">
                      #{sale.id}
                    </td>

                    <td className="px-6 py-4 text-slate-600">
                      Customer #{sale.customer_id}
                    </td>

                    <td className="px-6 py-4 capitalize text-slate-600">
                      {sale.payment_method}
                    </td>

                    <td className="px-6 py-4">

                      <span
                        className={`inline-flex rounded-full px-3 py-1 text-xs font-medium ${
                          sale.status?.toLowerCase() === "completed"
                            ? "bg-emerald-50 text-emerald-700"
                            : "bg-amber-50 text-amber-700"
                        }`}
                      >
                        {sale.status}
                      </span>

                    </td>

                    <td className="px-6 py-4 text-right font-semibold text-slate-900">
                      Rs. {Number(sale.total_amount).toLocaleString()}
                    </td>

                  </tr>
                ))}

              </tbody>

            </table>

          </div>
        )}

      </div>

    </div>
  );
}

export default Sales;