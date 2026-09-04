import { useEffect, useRef, useState } from "react";
import { User, LogOut } from "lucide-react";

function ProfileDropdown({ onLogout }) {
  const [isOpen, setIsOpen] = useState(false);

  const dropdownRef = useRef(null);

  const name =
    localStorage.getItem("customer_name") || "Customer";

  const email =
    localStorage.getItem("customer_email") || "";

  const role =
    localStorage.getItem("customer_role") || "customer";

  // Automatically close dropdown after 7 seconds
  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const timer = setTimeout(() => {
      setIsOpen(false);
    }, 7000);

    return () => clearTimeout(timer);
  }, [isOpen]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);

    return () => {
      document.removeEventListener(
        "mousedown",
        handleOutsideClick
      );
    };
  }, []);

  const handleLogout = () => {
    setIsOpen(false);
    onLogout();
  };

  return (
    <div
      ref={dropdownRef}
      className="relative"
    >

      {/* Avatar button */}
      <button
        onClick={() => setIsOpen((previous) => !previous)}
        aria-label="Open profile menu"
        className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-full border border-rose-200 bg-rose-50 text-rose-600 transition-all duration-300 hover:border-rose-400 hover:bg-rose-100 hover:text-rose-700 hover:shadow-md"
      >
        <User
          size={19}
          strokeWidth={1.8}
        />
      </button>

      {/* Dropdown */}
      {isOpen && (
        <div className="absolute right-0 top-14 z-[80] w-64 overflow-hidden rounded-2xl border border-stone-200 bg-white shadow-xl">

          {/* Profile information */}
          <div className="bg-gradient-to-br from-rose-50 to-amber-50 px-5 py-5">

            <div className="flex items-center gap-3">

              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-white text-rose-600 shadow-sm">
                <User size={20} />
              </div>

              <div className="min-w-0">

                <p className="truncate text-sm font-semibold text-gray-900">
                  {name}
                </p>

                <p className="truncate text-xs text-gray-500">
                  {email}
                </p>

              </div>

            </div>

            <div className="mt-4">

              <span className="inline-flex rounded-full bg-white px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.15em] text-rose-600 shadow-sm">
                {role}
              </span>

            </div>

          </div>

          {/* Logout */}
          <div className="p-2">

            <button
              onClick={handleLogout}
              className="flex w-full cursor-pointer items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium text-gray-600 transition-all duration-200 hover:bg-rose-50 hover:text-rose-600"
            >

              <LogOut size={17} />

              <span>
                Logout
              </span>

            </button>

          </div>

        </div>
      )}

    </div>
  );
}

export default ProfileDropdown;