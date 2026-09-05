import { useEffect, useState } from "react";

import {
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

import {
  Users,
  BriefcaseBusiness,
  ShieldCheck,
  ShoppingBag,
  Wallet,
  TrendingUp,
} from "lucide-react";


function Customers() {

  // =========================================================
  // STATE
  // =========================================================

  const [customerData, setCustomerData] = useState(null);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");


  // =========================================================
  // FETCH CUSTOMER DATA
  // =========================================================

  const fetchCustomerData = async () => {

    try {

      const token = localStorage.getItem("access_token");

      if (!token) {
        setMessage(
          "Please login to view customer analytics."
        );
        setLoading(false);
        return;
      }


      // -----------------------------------------------------
      // CUSTOMER / EMPLOYEE / ADMIN ACCOUNTS
      // -----------------------------------------------------

      const usersResponse = await fetch(
        "http://127.0.0.1:8000/customers/dashboard",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const usersData = await usersResponse.json();

      if (!usersResponse.ok) {
        setMessage(
          usersData.detail ||
          "Unable to load customer accounts."
        );
        return;
      }

      setUsers(usersData);


      // -----------------------------------------------------
      // CUSTOMER ANALYTICS
      // -----------------------------------------------------

      const analyticsResponse = await fetch(
        "http://127.0.0.1:8000/dashboard/customers",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const analyticsData =
        await analyticsResponse.json();

      if (!analyticsResponse.ok) {
        setMessage(
          analyticsData.detail ||
          "Unable to load customer analytics."
        );
        return;
      }

      setCustomerData(analyticsData);

    } catch (error) {

      console.error(
        "Customer analytics error:",
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
  // LOAD DATA
  // =========================================================

  useEffect(() => {
    fetchCustomerData();
  }, []);


  // =========================================================
  // SEPARATE USERS BY ROLE
  // =========================================================

  const customers = users.filter(
    (user) => user.role === "customer"
  );

  const employees = users.filter(
    (user) => user.role === "employee"
  );

  const admins = users.filter(
    (user) => user.role === "admin"
  );


  // =========================================================
  // GENDER COLORS
  // =========================================================

  const genderColors = [
    "#EC4899",
    "#3B82F6",
    "#8B5CF6",
    "#F59E0B",
  ];


  // =========================================================
  // LOADING
  // =========================================================

  if (loading) {

    return (
      <div className="py-10">

        <p className="text-sm text-slate-500">
          Loading customer analytics...
        </p>

      </div>
    );

  }


  // =========================================================
  // ERROR
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

  if (!customerData) {
    return null;
  }


  // =========================================================
  // MAIN PAGE
  // =========================================================

  return (

    <div className="space-y-10">


      {/* =====================================================
          PAGE HEADER
          ===================================================== */}

      <div>

        <p className="text-xs font-semibold uppercase tracking-[0.25em] text-indigo-600">
          Customers
        </p>

        <h1 className="mt-2 text-3xl font-semibold tracking-tight text-slate-900">
          Customer Intelligence
        </h1>

        <p className="mt-2 max-w-3xl text-sm leading-6 text-slate-500">
          Understand customer profiles, purchasing patterns,
          demographics, and buying behavior.
        </p>

      </div>


      {/* =====================================================
          SUMMARY CARDS
          ===================================================== */}

      <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">


        {/* CUSTOMERS */}

        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition duration-200 hover:-translate-y-0.5 hover:shadow-md">

          <div className="flex items-start justify-between">

            <div>

              <p className="text-sm font-medium text-slate-500">
                Customers
              </p>

              <p className="mt-3 text-2xl font-semibold text-slate-900">
                {customerData.summary.total_customers}
              </p>

              <p className="mt-2 text-xs text-slate-400">
                Registered customer accounts
              </p>

            </div>


            <div className="rounded-xl bg-indigo-50 p-3 text-indigo-600">

              <Users size={20} />

            </div>

          </div>

        </div>


        {/* ORDERS */}

        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition duration-200 hover:-translate-y-0.5 hover:shadow-md">

          <div className="flex items-start justify-between">

            <div>

              <p className="text-sm font-medium text-slate-500">
                Customer Orders
              </p>

              <p className="mt-3 text-2xl font-semibold text-slate-900">
                {customerData.summary.total_orders}
              </p>

              <p className="mt-2 text-xs text-slate-400">
                Completed customer orders
              </p>

            </div>


            <div className="rounded-xl bg-blue-50 p-3 text-blue-600">

              <ShoppingBag size={20} />

            </div>

          </div>

        </div>


        {/* TOTAL SPENDING */}

        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition duration-200 hover:-translate-y-0.5 hover:shadow-md">

          <div className="flex items-start justify-between">

            <div>

              <p className="text-sm font-medium text-slate-500">
                Total Spending
              </p>

              <p className="mt-3 text-2xl font-semibold text-slate-900">
                Rs.{" "}
                {Number(
                  customerData.summary.total_spending
                ).toLocaleString()}
              </p>

              <p className="mt-2 text-xs text-slate-400">
                Spending from completed orders
              </p>

            </div>


            <div className="rounded-xl bg-emerald-50 p-3 text-emerald-600">

              <Wallet size={20} />

            </div>

          </div>

        </div>


        {/* AVERAGE SPENDING */}

        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition duration-200 hover:-translate-y-0.5 hover:shadow-md">

          <div className="flex items-start justify-between">

            <div>

              <p className="text-sm font-medium text-slate-500">
                Average Spending
              </p>

              <p className="mt-3 text-2xl font-semibold text-slate-900">
                Rs.{" "}
                {Number(
                  customerData.summary.average_customer_spending
                ).toFixed(2)}
              </p>

              <p className="mt-2 text-xs text-slate-400">
                Average spending per customer
              </p>

            </div>


            <div className="rounded-xl bg-violet-50 p-3 text-violet-600">

              <TrendingUp size={20} />

            </div>

          </div>

        </div>

      </div>


      {/* =====================================================
          DEMOGRAPHICS
          ===================================================== */}

      <section>

        <div className="mb-5">

          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-indigo-600">
            Demographics
          </p>

          <h2 className="mt-2 text-2xl font-semibold text-slate-900">
            Who Are Your Customers?
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            Understand the composition of your customer base.
          </p>

        </div>


        <div className="grid gap-6 lg:grid-cols-2">


          {/* AGE */}

          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">

            <div className="mb-6">

              <h3 className="text-lg font-semibold text-slate-900">
                Customers by Age Group
              </h3>

              <p className="mt-1 text-sm text-slate-500">
                Number of customers in each age group.
              </p>

            </div>


            <div className="h-72">

              <ResponsiveContainer
                width="100%"
                height="100%"
              >

                <BarChart
                  data={
                    customerData.demographics.age_groups
                  }
                >

                  <CartesianGrid
                    strokeDasharray="3 3"
                  />

                  <XAxis
                    dataKey="age_group"
                  />

                  <YAxis
                    allowDecimals={false}
                  />

                  <Tooltip />

                  <Bar
                    dataKey="customers"
                    fill="#4F46E5"
                    radius={[6, 6, 0, 0]}
                  />

                </BarChart>

              </ResponsiveContainer>

            </div>

          </div>


          {/* GENDER */}

          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">

            <div className="mb-6">

              <h3 className="text-lg font-semibold text-slate-900">
                Gender Distribution
              </h3>

              <p className="mt-1 text-sm text-slate-500">
                Distribution of customers by gender.
              </p>

            </div>


            <div className="h-72">

              <ResponsiveContainer
                width="100%"
                height="100%"
              >

                <PieChart>

                  <Pie
                    data={
                      customerData.demographics.gender
                    }
                    dataKey="customers"
                    nameKey="gender"
                    cx="50%"
                    cy="50%"
                    outerRadius={90}
                    label
                  >

                    {customerData.demographics.gender.map(
                      (entry, index) => (

                        <Cell
                          key={`gender-${index}`}
                          fill={
                            genderColors[
                              index %
                              genderColors.length
                            ]
                          }
                        />

                      )
                    )}

                  </Pie>

                  <Tooltip />

                  <Legend />

                </PieChart>

              </ResponsiveContainer>

            </div>

          </div>


          {/* LOCATION */}

          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm lg:col-span-2">

            <div className="mb-6">

              <h3 className="text-lg font-semibold text-slate-900">
                Customers by Location
              </h3>

              <p className="mt-1 text-sm text-slate-500">
                Number of customers from each location.
              </p>

            </div>


            <div className="h-72">

              <ResponsiveContainer
                width="100%"
                height="100%"
              >

                <BarChart
                  data={
                    customerData.demographics.location
                  }
                  layout="vertical"
                  margin={{
                    left: 20,
                    right: 20,
                  }}
                >

                  <CartesianGrid
                    strokeDasharray="3 3"
                  />

                  <XAxis
                    type="number"
                    allowDecimals={false}
                  />

                  <YAxis
                    type="category"
                    dataKey="location"
                    width={90}
                  />

                  <Tooltip />

                  <Bar
                    dataKey="customers"
                    fill="#F97316"
                    radius={[0, 6, 6, 0]}
                  />

                </BarChart>

              </ResponsiveContainer>

            </div>

          </div>

        </div>

      </section>


      {/* =====================================================
          BUYING BEHAVIOR
          ===================================================== */}

      <section>

        <div className="mb-5">

          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-emerald-600">
            Buying Behavior
          </p>

          <h2 className="mt-2 text-2xl font-semibold text-slate-900">
            What Are Customers Buying?
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            Analyze purchasing patterns across products and categories.
          </p>

        </div>


        <div className="grid gap-6 lg:grid-cols-2">


          {/* POPULAR PRODUCTS */}

          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">

            <div className="mb-6">

              <h3 className="text-lg font-semibold text-slate-900">
                Popular Products
              </h3>

              <p className="mt-1 text-sm text-slate-500">
                Products purchased most frequently.
              </p>

            </div>


            <div className="space-y-4">

              {customerData.buying_behavior
                .popular_products
                .slice(0, 5)
                .map((product, index) => (

                  <div
                    key={product.product_name}
                    className="flex items-center justify-between rounded-xl px-3 py-3 transition hover:bg-slate-50"
                  >

                    <div className="flex items-center gap-3">

                      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-50 text-xs font-semibold text-blue-700">
                        {index + 1}
                      </div>

                      <p className="text-sm font-medium text-slate-800">
                        {product.product_name}
                      </p>

                    </div>

                    <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700">
                      {product.units_sold} units
                    </span>

                  </div>

                ))}

            </div>

          </div>


          {/* POPULAR CATEGORIES */}

          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">

            <div className="mb-6">

              <h3 className="text-lg font-semibold text-slate-900">
                Popular Categories
              </h3>

              <p className="mt-1 text-sm text-slate-500">
                Categories ranked by customer purchases.
              </p>

            </div>


            <div className="h-72">

              <ResponsiveContainer
                width="100%"
                height="100%"
              >

                <BarChart
                  data={
                    customerData.buying_behavior
                      .category_behavior
                  }
                >

                  <CartesianGrid
                    strokeDasharray="3 3"
                  />

                  <XAxis
                    dataKey="category"
                  />

                  <YAxis
                    allowDecimals={false}
                  />

                  <Tooltip />

                  <Bar
                    dataKey="units_sold"
                    fill="#22C55E"
                    radius={[6, 6, 0, 0]}
                  />

                </BarChart>

              </ResponsiveContainer>

            </div>

          </div>

        </div>

      </section>


      {/* =====================================================
          TOP CUSTOMERS
          ===================================================== */}

      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">

        <div className="mb-6">

          <h2 className="text-lg font-semibold text-slate-900">
            Top Customers by Spending
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            Customers ranked by spending from completed orders.
          </p>

        </div>


        <div className="space-y-4">

          {customerData.buying_behavior
            .top_customers
            .map((customer, index) => (

              <div
                key={customer.id}
                className="flex items-center justify-between rounded-xl bg-slate-50 px-4 py-4"
              >

                <div className="flex items-center gap-4">

                  <div className="flex h-9 w-9 items-center justify-center rounded-full bg-violet-50 text-sm font-semibold text-violet-700">
                    {index + 1}
                  </div>

                  <div>

                    <p className="font-medium text-slate-900">
                      {customer.name}
                    </p>

                    <p className="mt-1 text-xs text-slate-500">
                      {customer.orders} completed orders
                    </p>

                  </div>

                </div>


                <div className="text-right">

                  <p className="font-semibold text-slate-900">
                    Rs.{" "}
                    {Number(
                      customer.spending
                    ).toLocaleString()}
                  </p>

                  <p className="text-xs text-slate-500">
                    total spending
                  </p>

                </div>

              </div>

            ))}

        </div>

      </div>


      {/* =====================================================
          CUSTOMER ACCOUNTS
          ===================================================== */}

      <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">

        <div className="border-b border-slate-200 px-6 py-5">

          <h2 className="text-lg font-semibold text-slate-900">
            Customer Accounts
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            Customer profiles and purchasing activity.
          </p>

        </div>


        <div className="overflow-x-auto">

          <table className="min-w-full text-sm">

            <thead className="bg-slate-50 text-left text-xs uppercase tracking-wide text-slate-500">

              <tr>

                <th className="px-6 py-4 font-semibold">
                  Customer
                </th>

                <th className="px-6 py-4 font-semibold">
                  Email
                </th>

                <th className="px-6 py-4 font-semibold">
                  Age
                </th>

                <th className="px-6 py-4 font-semibold">
                  Gender
                </th>

                <th className="px-6 py-4 font-semibold">
                  Location
                </th>

                <th className="px-6 py-4 font-semibold">
                  Orders
                </th>

                <th className="px-6 py-4 text-right font-semibold">
                  Spending
                </th>

              </tr>

            </thead>


            <tbody className="divide-y divide-slate-100">

              {customers.map((customer) => (

                <tr
                  key={customer.id}
                  className="transition hover:bg-slate-50"
                >

                  <td className="px-6 py-4 font-medium text-slate-900">
                    {customer.name}
                  </td>

                  <td className="px-6 py-4 text-slate-600">
                    {customer.email}
                  </td>

                  <td className="px-6 py-4 text-slate-600">
                    {customer.age}
                  </td>

                  <td className="px-6 py-4 text-slate-600">
                    {customer.gender}
                  </td>

                  <td className="px-6 py-4 text-slate-600">
                    {customer.location}
                  </td>

                  <td className="px-6 py-4 text-slate-600">
                    {customer.total_orders}
                  </td>

                  <td className="px-6 py-4 text-right font-semibold text-slate-900">
                    Rs.{" "}
                    {Number(
                      customer.total_spending
                    ).toLocaleString()}
                  </td>

                </tr>

              ))}

            </tbody>

          </table>

        </div>

      </div>


      {/* =====================================================
          EMPLOYEE ACCOUNTS
          ===================================================== */}

      <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">

        <div className="border-b border-slate-200 px-6 py-5">

          <div className="flex items-center gap-3">

            <div className="rounded-xl bg-violet-50 p-3 text-violet-600">

              <BriefcaseBusiness size={20} />

            </div>

            <div>

              <h2 className="text-lg font-semibold text-slate-900">
                Employee Accounts
              </h2>

              <p className="mt-1 text-sm text-slate-500">
                Staff accounts with employee access.
              </p>

            </div>

          </div>

        </div>


        <div className="overflow-x-auto">

          <table className="min-w-full text-sm">

            <thead className="bg-slate-50 text-left text-xs uppercase tracking-wide text-slate-500">

              <tr>

                <th className="px-6 py-4 font-semibold">
                  Employee
                </th>

                <th className="px-6 py-4 font-semibold">
                  Email
                </th>

                <th className="px-6 py-4 font-semibold">
                  Role
                </th>

              </tr>

            </thead>


            <tbody className="divide-y divide-slate-100">

              {employees.map((employee) => (

                <tr
                  key={employee.id}
                  className="transition hover:bg-slate-50"
                >

                  <td className="px-6 py-4 font-medium text-slate-900">
                    {employee.name}
                  </td>

                  <td className="px-6 py-4 text-slate-600">
                    {employee.email}
                  </td>

                  <td className="px-6 py-4">

                    <span className="inline-flex rounded-full bg-violet-50 px-3 py-1 text-xs font-medium text-violet-700">
                      Employee
                    </span>

                  </td>

                </tr>

              ))}

            </tbody>

          </table>

        </div>

      </div>


      {/* =====================================================
          ADMIN ACCOUNTS
          ===================================================== */}

      <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">

        <div className="border-b border-slate-200 px-6 py-5">

          <div className="flex items-center gap-3">

            <div className="rounded-xl bg-amber-50 p-3 text-amber-600">

              <ShieldCheck size={20} />

            </div>

            <div>

              <h2 className="text-lg font-semibold text-slate-900">
                Admin Accounts
              </h2>

              <p className="mt-1 text-sm text-slate-500">
                Administrative accounts with elevated access.
              </p>

            </div>

          </div>

        </div>


        <div className="overflow-x-auto">

          <table className="min-w-full text-sm">

            <thead className="bg-slate-50 text-left text-xs uppercase tracking-wide text-slate-500">

              <tr>

                <th className="px-6 py-4 font-semibold">
                  Admin
                </th>

                <th className="px-6 py-4 font-semibold">
                  Email
                </th>

                <th className="px-6 py-4 font-semibold">
                  Role
                </th>

              </tr>

            </thead>


            <tbody className="divide-y divide-slate-100">

              {admins.map((admin) => (

                <tr
                  key={admin.id}
                  className="transition hover:bg-slate-50"
                >

                  <td className="px-6 py-4 font-medium text-slate-900">
                    {admin.name}
                  </td>

                  <td className="px-6 py-4 text-slate-600">
                    {admin.email}
                  </td>

                  <td className="px-6 py-4">

                    <span className="inline-flex rounded-full bg-amber-50 px-3 py-1 text-xs font-medium text-amber-700">
                      Admin
                    </span>

                  </td>

                </tr>

              ))}

            </tbody>

          </table>

        </div>

      </div>

    </div>
  );
}

export default Customers;