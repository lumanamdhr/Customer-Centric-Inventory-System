import {
  LayoutDashboard,
  Package,
  ShoppingCart,
  Users,
  Brain,
  UserCog,
} from "lucide-react";

function DashboardSidebar({
  role,
  activeSection,
  onSectionChange,
}) {

  // ADMIN MENU

  const adminMenuItems = [
    {
      name: "Overview",
      icon: LayoutDashboard,
      iconColor: "text-blue-400",
      activeColor: "bg-blue-600",
    },
    {
      name: "Inventory",
      icon: Package,
      iconColor: "text-emerald-400",
      activeColor: "bg-emerald-600",
    },
    {
      name: "Sales",
      icon: ShoppingCart,
      iconColor: "text-orange-400",
      activeColor: "bg-orange-600",
    },
    {
      name: "Customers",
      icon: Users,
      iconColor: "text-violet-400",
      activeColor: "bg-violet-600",
    },
    {
      name: "Intelligence",
      icon: Brain,
      iconColor: "text-rose-400",
      activeColor: "bg-rose-600",
    },
    {
      name: "User Management",
      icon: UserCog,
      iconColor: "text-amber-400",
      activeColor: "bg-amber-600",
    },
  ];

  // EMPLOYEE MENU

  const employeeMenuItems = [
    {
      name: "Overview",
      icon: LayoutDashboard,
      iconColor: "text-blue-400",
      activeColor: "bg-blue-600",
    },
    {
      name: "Inventory",
      icon: Package,
      iconColor: "text-emerald-400",
      activeColor: "bg-emerald-600",
    },
    {
      name: "Sales",
      icon: ShoppingCart,
      iconColor: "text-orange-400",
      activeColor: "bg-orange-600",
    },
    {
      name: "Customers",
      icon: Users,
      iconColor: "text-violet-400",
      activeColor: "bg-violet-600",
    },
  ];


  // SELECT MENU BASED ON ROLE

  const menuItems =
    role === "admin"
      ? adminMenuItems
      : employeeMenuItems;

  // SIDEBAR

  return (

    <aside
      className={`hidden min-h-screen w-64 shrink-0 text-white lg:block ${
        role === "admin"
          ? "bg-slate-800"
          : "bg-slate-700"
      }`}
    >


      {/* BRAND */}

      <div className="border-b border-white/10 px-6 py-7">

        <button
          onClick={() =>
            onSectionChange("Overview")
          }
          className="cursor-pointer text-left"
        >

          <h1 className="text-xl font-semibold tracking-[0.22em]">
            LAKMÉ
          </h1>

          <p className="mt-2 text-[10px] font-medium uppercase tracking-[0.2em] text-slate-300">
            {role === "admin"
              ? "Admin Workspace"
              : "Employee Workspace"}
          </p>

        </button>

      </div>


      {/* NAVIGATION */}

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
                  ? `${item.activeColor} text-white shadow-lg`
                  : "text-slate-300 hover:bg-white/10 hover:text-white"
              }`}
            >

              <Icon
                size={18}
                strokeWidth={1.8}
                className={
                  isActive
                    ? "text-white"
                    : `${item.iconColor} transition group-hover:text-white`
                }
              />

              <span>
                {item.name}
              </span>

            </button>

          );

        })}

      </nav>


      {/* ROLE INFORMATION */}

      <div
        className={`absolute bottom-0 w-64 border-t border-white/10 px-6 py-5 ${
          role === "admin"
            ? "bg-slate-900/60"
            : "bg-slate-800/60"
        }`}
      >

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