function DashboardHeader({ role }) { //role will come from logged in user
  return (
    <header className="flex items-center justify-between border-b border-gray-200 bg-white px-8 py-5">

      <div>
        <p className="text-sm text-gray-500">
          Welcome back
        </p>

        <h1 className="mt-1 text-2xl font-semibold text-gray-900">
          {role} Dashboard
        </h1>
      </div>

      <div className="rounded-full bg-gray-100 px-4 py-2 text-sm font-medium capitalize text-gray-700">
        {role}
      </div>

    </header>
  );
}

export default DashboardHeader;