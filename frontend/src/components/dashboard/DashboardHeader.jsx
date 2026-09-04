import {
  Search,
  Bell,
} from "lucide-react";

import ProfileDropdown from "../ProfileDropdown";

function DashboardHeader({
  role,
  onLogout,
  searchTerm,
  onSearchChange,
}) {
  return (
    <header className="border-b border-slate-200 bg-white">

      <div className="flex min-h-[82px] items-center justify-between gap-6 px-6 lg:px-8">

        {/* Left side */}
        <div className="min-w-0">

          <p className="text-xs font-medium uppercase tracking-[0.18em] text-slate-400">
            Dashboard
          </p>

          <h1 className="mt-1 text-xl font-semibold text-slate-900">
            {role} Workspace
          </h1>

        </div>


        {/* Right side */}
        <div className="flex items-center gap-3">

          {/* Search */}
          <div className="relative hidden w-72 xl:block">

            <Search
              size={17}
              className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"
            />

            <input
              type="text"
              value={searchTerm}
              onChange={(event) =>
                onSearchChange(event.target.value)
              }
              placeholder="Search products..."
              className="w-full rounded-xl border border-slate-200 bg-slate-50 py-2.5 pl-10 pr-4 text-sm text-slate-700 outline-none transition focus:border-teal-500 focus:bg-white"
            />

          </div>


          {/* Notification */}
          <button
            type="button"
            className="relative flex h-10 w-10 cursor-pointer items-center justify-center rounded-xl text-slate-500 transition hover:bg-slate-100 hover:text-slate-900"
            aria-label="Notifications"
          >

            <Bell size={19} strokeWidth={1.8} />

            <span className="absolute right-2 top-2 h-1.5 w-1.5 rounded-full bg-teal-600" />

          </button>


          {/* Divider */}
          <div className="mx-1 hidden h-8 w-px bg-slate-200 sm:block" />


          {/* Profile */}
          <ProfileDropdown onLogout={onLogout} />

        </div>

      </div>

    </header>
  );
}

export default DashboardHeader;