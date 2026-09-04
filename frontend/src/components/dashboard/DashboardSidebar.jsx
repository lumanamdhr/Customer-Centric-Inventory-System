import {
  LayoutDashboard,
  Package,
  ShoppingCart,
  Users,
  Brain,
} from "lucide-react";

function DashboardSidebar({
  role,
  activeSection,
  onSectionChange,
}) {
  const menuItems = [
    {
      name: "Overview",
      icon: LayoutDashboard,
    },
    {
      name: "Inventory",
      icon: Package,
    },
    {
      name: "Sales",
      icon: ShoppingCart,
    },
    {
      name: "Customers",
      icon: Users,
    },
    {
      name: "Intelligence",
      icon: Brain,
    },
  ];

  return (
    <aside className="hidden min-h-screen w-64 shrink-0 bg-slate-800 text-white lg:block">

      {/* Brand */}
      <div className="border-b border-white/10 px-6 py-7">

        <button
          onClick={() => onSectionChange("Overview")}
          className="cursor-pointer text-left"
        >
          <h1 className="text-xl font-semibold tracking-[0.22em]">
            LAKMÉ
          </h1>

          <p className="mt-2 text-[10px] font-medium uppercase tracking-[0.2em] text-slate-300">
            Business Intelligence
          </p>
        </button>

      </div>


      {/* Navigation */}
      <nav className="space-y-2 px-4 py-6">

        {menuItems.map((item) => {
          const Icon = item.icon;

          const isActive =
            activeSection === item.name;

          return (
            <button
              key={item.name}
              onClick={() =>
                onSectionChange(item.name)
              }
              className={`group flex w-full cursor-pointer items-center gap-3 rounded-xl px-4 py-3 text-left text-sm font-medium transition-all duration-200 ${
                isActive
                  ? "bg-teal-600 text-white shadow-lg shadow-teal-950/15"
                  : "text-slate-300 hover:bg-white/10 hover:text-white"
              }`}
            >

              <Icon
                size={18}
                strokeWidth={1.8}
                className={
                  isActive
                    ? "text-white"
                    : "text-slate-400 transition group-hover:text-white"
                }
              />

              <span>
                {item.name}
              </span>

            </button>
          );
        })}

      </nav>


      {/* Role information */}
      <div className="absolute bottom-0 w-64 border-t border-white/10 bg-slate-900/60 px-6 py-5">

        <p className="text-[10px] uppercase tracking-[0.18em] text-slate-400">
          Signed in as
        </p>

        <p className="mt-1 text-sm font-medium capitalize text-white">
          {role}
        </p>

      </div>

    </aside>
  );
}

export default DashboardSidebar;