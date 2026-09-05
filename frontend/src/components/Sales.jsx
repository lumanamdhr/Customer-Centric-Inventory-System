import { useEffect, useState } from "react";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

import {
  CircleDollarSign,
  ShoppingBag,
  Package,
  TrendingUp,
  CreditCard,
} from "lucide-react";


function Sales() {

  // =========================================================
  // STATE
  // =========================================================

  // Stores the complete response from /dashboard/sales
  const [salesData, setSalesData] = useState(null);

  // Used while the API request is running
  const [loading, setLoading] = useState(true);

  // Stores an error message
  const [message, setMessage] = useState("");


  // =========================================================
  // FETCH SALES DASHBOARD DATA
  // =========================================================

  const fetchSales = async () => {

    try {

      // Get the login token from browser storage
      const token = localStorage.getItem("access_token");

      // Stop if the user is not logged in
      if (!token) {

        setMessage("Please login to view sales.");

        setLoading(false);

        return;
      }


      // -----------------------------------------------------
      // REQUEST SALES ANALYTICS FROM FASTAPI
      // -----------------------------------------------------

      const response = await fetch(
        "http://127.0.0.1:8000/dashboard/sales",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );


      // Convert API response into JavaScript object
      const data = await response.json();


      // Check whether request succeeded
      if (!response.ok) {

        setMessage(
          data.detail ||
          "Unable to load sales data."
        );

        return;
      }


      // Store complete dashboard response
      setSalesData(data);

    } catch (error) {

      console.error(
        "Sales dashboard error:",
        error
      );

      setMessage(
        "Unable to connect to server."
      );

    } finally {

      setLoading(false);

    }
  };


  // =========================================================
  // LOAD SALES DATA WHEN COMPONENT OPENS
  // =========================================================

  useEffect(() => {

    fetchSales();

  }, []);


  // =========================================================
  // LOADING STATE
  // =========================================================

  if (loading) {

    return (
      <div className="py-10">

        <p className="text-sm text-slate-500">
          Loading sales data...
        </p>

      </div>
    );

  }


  // =========================================================
  // ERROR STATE
  // =========================================================

  if (message) {

    return (
      <div className="rounded-2xl border border-red-200 bg-red-50 p-6">

        <p className="text-sm text-red-600">
          {message}
        </p>

      </div>
    );

  }


  // =========================================================
  // SAFETY CHECK
  // =========================================================

  if (!salesData) {
    return null;
  }


  // =========================================================
  // PAYMENT ICON COLORS
  // =========================================================

  const paymentColors = [
    "bg-blue-50 text-blue-600",
    "bg-violet-50 text-violet-600",
    "bg-orange-50 text-orange-600",
    "bg-pink-50 text-pink-600",
  ];


  // =========================================================
  // MAIN SALES PAGE
  // =========================================================

  return (

    <div className="space-y-8">


      {/* =====================================================
          PAGE HEADER
          ===================================================== */}

      <div>

        <p className="text-xs font-semibold uppercase tracking-[0.25em] text-indigo-600">
          Sales
        </p>

        <h1 className="mt-2 text-3xl font-semibold tracking-tight text-slate-900">
          Sales Overview
        </h1>

        <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-500">
          Monitor revenue, orders, payment activity, and overall
          sales performance.
        </p>

      </div>


      {/* =====================================================
          SUMMARY CARDS
          ===================================================== */}

      <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">


        {/* =================================================
            TOTAL REVENUE
            ================================================= */}

        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition duration-200 hover:-translate-y-0.5 hover:shadow-md">

          <div className="flex items-start justify-between">

            <div>

              <p className="text-sm font-medium text-slate-500">
                Total Revenue
              </p>

              <p className="mt-3 text-2xl font-semibold text-slate-900">

                Rs.{" "}

                {Number(
                  salesData.total_revenue
                ).toLocaleString()}

              </p>

              <p className="mt-2 text-xs text-slate-400">
                Revenue from recorded sales
              </p>

            </div>


            {/* Emerald = money */}

            <div className="rounded-xl bg-emerald-50 p-3 text-emerald-600">

              <CircleDollarSign size={20} />

            </div>

          </div>

        </div>


        {/* =================================================
            TOTAL ORDERS
            ================================================= */}

        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition duration-200 hover:-translate-y-0.5 hover:shadow-md">

          <div className="flex items-start justify-between">

            <div>

              <p className="text-sm font-medium text-slate-500">
                Total Orders
              </p>

              <p className="mt-3 text-2xl font-semibold text-slate-900">
                {salesData.total_orders}
              </p>

              <p className="mt-2 text-xs text-slate-400">
                Recorded customer orders
              </p>

            </div>


            {/* Blue = orders */}

            <div className="rounded-xl bg-blue-50 p-3 text-blue-600">

              <ShoppingBag size={20} />

            </div>

          </div>

        </div>


        {/* =================================================
            AVERAGE ORDER VALUE
            ================================================= */}

        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition duration-200 hover:-translate-y-0.5 hover:shadow-md">

          <div className="flex items-start justify-between">

            <div>

              <p className="text-sm font-medium text-slate-500">
                Average Order Value
              </p>

              <p className="mt-3 text-2xl font-semibold text-slate-900">

                Rs.{" "}

                {Number(
                  salesData.average_order_value
                ).toFixed(2)}

              </p>

              <p className="mt-2 text-xs text-slate-400">
                Average revenue per order
              </p>

            </div>


            {/* Violet = performance metric */}

            <div className="rounded-xl bg-violet-50 p-3 text-violet-600">

              <TrendingUp size={20} />

            </div>

          </div>

        </div>


        {/* =================================================
            UNITS SOLD
            ================================================= */}

        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition duration-200 hover:-translate-y-0.5 hover:shadow-md">

          <div className="flex items-start justify-between">

            <div>

              <p className="text-sm font-medium text-slate-500">
                Units Sold
              </p>

              <p className="mt-3 text-2xl font-semibold text-slate-900">
                {salesData.total_units_sold}
              </p>

              <p className="mt-2 text-xs text-slate-400">
                Total products sold
              </p>

            </div>


            {/* Amber = quantity / volume */}

            <div className="rounded-xl bg-amber-50 p-3 text-amber-600">

              <Package size={20} />

            </div>

          </div>

        </div>

      </div>


      {/* =====================================================
          REVENUE TREND
          ===================================================== */}

      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">

        <div className="mb-6">

          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-indigo-500">
            Performance
          </p>

          <h2 className="mt-2 text-lg font-semibold text-slate-900">
            Revenue Trend
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            Monthly revenue generated from customer sales.
          </p>

        </div>


        <div className="h-80 w-full">

          {salesData.monthly_revenue.length === 0 ? (

            <div className="flex h-full items-center justify-center">

              <p className="text-sm text-slate-500">
                No revenue data available.
              </p>

            </div>

          ) : (

            <ResponsiveContainer
              width="100%"
              height="100%"
            >

              <BarChart
                data={salesData.monthly_revenue}
                margin={{
                  top: 10,
                  right: 20,
                  left: 10,
                  bottom: 10,
                }}
              >

                <CartesianGrid
                  strokeDasharray="3 3"
                />

                <XAxis
                  dataKey="month"
                />

                <YAxis />

                <Tooltip
                  formatter={(value) => [
                    `Rs. ${Number(
                      value
                    ).toLocaleString()}`,
                    "Revenue",
                  ]}
                />

                {/* Indigo = revenue trend */}

                <Bar
                  dataKey="revenue"
                  fill="#4F46E5"
                  radius={[
                    6,
                    6,
                    0,
                    0,
                  ]}
                />

              </BarChart>

            </ResponsiveContainer>

          )}

        </div>

      </div>


      {/* =====================================================
          TOP SELLING PRODUCTS
          ===================================================== */}

      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">

        <div className="mb-6">

          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-blue-600">
            Product Performance
          </p>

          <h2 className="mt-2 text-lg font-semibold text-slate-900">
            Top Selling Products
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            Products ranked by units sold.
          </p>

        </div>


        <div className="space-y-4">

          {salesData.top_products.length === 0 ? (

            <p className="text-sm text-slate-500">
              No product sales available.
            </p>

          ) : (

            salesData.top_products
              .slice(0, 5)
              .map((product, index) => (

                <div
                  key={product.product_name}
                  className="flex items-center justify-between rounded-xl px-3 py-3 transition hover:bg-slate-50"
                >

                  <div className="flex items-center gap-4">


                    {/* Ranking */}

                    <div className="flex h-9 w-9 items-center justify-center rounded-full bg-blue-50 text-sm font-semibold text-blue-700">

                      {index + 1}

                    </div>


                    {/* Product */}

                    <div>

                      <p className="font-medium text-slate-900">
                        {product.product_name}
                      </p>

                      <p className="mt-1 text-xs text-slate-500">

                        Revenue: Rs.{" "}

                        {Number(
                          product.revenue
                        ).toLocaleString()}

                      </p>

                    </div>

                  </div>


                  {/* Units */}

                  <div className="text-right">

                    <p className="font-semibold text-slate-900">
                      {product.units_sold}
                    </p>

                    <p className="text-xs text-slate-500">
                      units sold
                    </p>

                  </div>

                </div>

              ))

          )}

        </div>

      </div>


      {/* =====================================================
          PAYMENT METHODS
          ===================================================== */}

      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">

        <div className="mb-6">

          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-orange-600">
            Transactions
          </p>

          <h2 className="mt-2 text-lg font-semibold text-slate-900">
            Payment Methods
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            Number of orders by payment method.
          </p>

        </div>


        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">

          {salesData.payment_breakdown.length === 0 ? (

            <p className="text-sm text-slate-500">
              No payment data available.
            </p>

          ) : (

            salesData.payment_breakdown.map(
              (payment, index) => (

                <div
                  key={payment.payment_method}
                  className="rounded-xl border border-slate-100 bg-slate-50 p-4"
                >

                  <div className="flex items-center gap-3">


                    <div
                      className={`rounded-lg p-2 ${
                        paymentColors[
                          index %
                          paymentColors.length
                        ]
                      }`}
                    >

                      <CreditCard size={18} />

                    </div>


                    <div>

                      <p className="text-sm font-medium capitalize text-slate-900">
                        {payment.payment_method}
                      </p>

                      <p className="mt-1 text-xs text-slate-500">
                        {payment.orders} orders
                      </p>

                    </div>

                  </div>

                </div>

              )
            )

          )}

        </div>

      </div>


      {/* =====================================================
          RECENT SALES
          ===================================================== */}

      <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">

        <div className="border-b border-slate-200 px-6 py-5">

          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
            Transactions
          </p>

          <h2 className="mt-2 text-lg font-semibold text-slate-900">
            Recent Sales
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            Latest recorded customer transactions.
          </p>

        </div>


        {salesData.recent_sales.length === 0 ? (

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

                  <th className="px-6 py-4 font-semibold">
                    Date
                  </th>

                  <th className="px-6 py-4 text-right font-semibold">
                    Amount
                  </th>

                </tr>

              </thead>


              <tbody className="divide-y divide-slate-100">

                {salesData.recent_sales.map(
                  (sale) => (

                    <tr
                      key={sale.id}
                      className="transition hover:bg-slate-50"
                    >

                      <td className="px-6 py-4 font-medium text-slate-900">
                        #{sale.id}
                      </td>


                      <td className="px-6 py-4 text-slate-600">
                        {sale.customer_name}
                      </td>


                      <td className="px-6 py-4 capitalize text-slate-600">
                        {sale.payment_method}
                      </td>


                      <td className="px-6 py-4">

                        <span
                          className={`inline-flex rounded-full px-3 py-1 text-xs font-medium ${
                            sale.status?.toLowerCase() ===
                            "completed"
                              ? "bg-emerald-50 text-emerald-700"
                              : "bg-amber-50 text-amber-700"
                          }`}
                        >
                          {sale.status}
                        </span>

                      </td>


                      <td className="px-6 py-4 text-slate-500">
                        {new Date(
                          sale.created_at
                        ).toLocaleDateString()}
                      </td>


                      <td className="px-6 py-4 text-right font-semibold text-slate-900">

                        Rs.{" "}

                        {Number(
                          sale.total_amount
                        ).toLocaleString()}

                      </td>

                    </tr>

                  )
                )}

              </tbody>

            </table>

          </div>

        )}

      </div>

    </div>
  );
}

export default Sales;