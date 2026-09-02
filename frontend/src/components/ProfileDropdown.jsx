import { useState } from "react";
import { User, LogOut } from "lucide-react";

function ProfileDropdown({ onLogout }) {

  const [isOpen, setIsOpen] = useState(false);

  const name = localStorage.getItem("customer_name");
  const email = localStorage.getItem("customer_email");
  const role = localStorage.getItem("customer_role");

  const handleLogout = () => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("customer_id");
    localStorage.removeItem("customer_name");
    localStorage.removeItem("customer_email");
    localStorage.removeItem("customer_role");

    setIsOpen(false);

    if (onLogout) {
      onLogout();
    }
  };

  return (
    <div className="relative">

      {/* Small avatar button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-full border border-gray-300 text-gray-700 transition hover:border-gray-900 hover:text-gray-900"
        aria-label="Open profile menu"
      >
        <User size={18} strokeWidth={1.8} />
      </button>

      {/* Profile dropdown */}
      {isOpen && (
        <div className="absolute right-0 top-12 z-50 w-64 rounded-2xl border border-gray-200 bg-white p-5 shadow-xl">

          {/* User information */}
          <div className="border-b border-gray-100 pb-4">

            <p className="font-medium text-gray-900">
              {name || "User"}
            </p>

            <p className="mt-1 truncate text-sm text-gray-500">
              {email || "Email unavailable"}
            </p>

            <p className="mt-2 text-xs font-medium uppercase tracking-[0.15em] text-gray-400">
              {role || "customer"}
            </p>

          </div>

          {/* Logout */}
          <button
            onClick={handleLogout}
            className="mt-4 flex w-full cursor-pointer items-center gap-3 rounded-xl px-3 py-2 text-sm text-gray-600 transition hover:bg-gray-100 hover:text-gray-900"
          >
            <LogOut size={17} strokeWidth={1.8} />
            Logout
          </button>

        </div>
      )}

    </div>
  );
}

export default ProfileDropdown;