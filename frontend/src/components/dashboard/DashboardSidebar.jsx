function DashboardSidebar({ role, activeSection, onSectionChange }) {
  const menuItems = [
    "Overview",
    "Inventory",
    "Sales",
    "Customers",
    "Intelligence",
  ];

  return (
    <aside className="w-64 border-r border-gray-200 bg-white min-h-screen p-6">

      <div className="mb-10">
        <h1 className="text-xl font-semibold tracking-[0.2em]">
          LAKMÉ
        </h1>

        <p className="mt-2 text-sm text-gray-500 capitalize">
          {role} Dashboard
        </p>
      </div>

      <nav className="space-y-2">

        {menuItems.map((item) => ( //takes every item from array and create a button for it
          <button
            key={item}
            onClick={() => onSectionChange(item)}
            className={`w-full rounded-xl px-4 py-3 text-left text-sm transition ${
              activeSection === item
                ? "bg-gray-900 text-white"
                : "text-gray-600 hover:bg-gray-100"
            }`}
          >
            {item}
          </button>
        ))}

      </nav>

    </aside>
  );
}

export default DashboardSidebar;