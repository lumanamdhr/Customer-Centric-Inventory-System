import {
  Search,
  User,
  ShoppingCart,
} from "lucide-react";
import ProfileDropdown from "./ProfileDropdown";

function Navbar({ //props that works when clicked
  onAuthClick,
  onCartClick,
  onHomeClick,
  onNavigate,
  onSearch,
  cartCount,
  isLoggedIn,
  onLogout,
  searchTerm,
  onSearchChange,
}) {
  return (
    <header className="sticky top-0 z-50 bg-white/95 shadow-sm backdrop-blur-md">

      {/* =====================================================
          TOP NAVIGATION
          ===================================================== */}
      <div className="border-b border-stone-200 bg-stone-100">
        <div className="mx-auto flex max-w-7xl items-center gap-6 px-6 py-4 lg:px-10">

          {/* Logo */}
         <button
            onClick={onHomeClick}
            className="shrink-0 cursor-pointer text-2xl font-semibold tracking-[0.28em] text-gray-900 transition duration-300 hover:text-rose-600 sm:text-3xl"
          >
            LAKMÉ
          </button>

          {/* Search Bar */}
          <div className="relative mx-auto hidden w-full max-w-xl md:block">

            <Search
              size={18}
              strokeWidth={1.8}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
            />

            <input
              type="text"
              value={searchTerm}
              onChange={(event) => onSearchChange(event.target.value)} //react controls what apperas inside input
              onKeyDown={(event) => {
                if (event.key === "Enter") {
                  onSearch();
                }
              }}
              placeholder="Search products..."
              className="w-full rounded-full border border-stone-200 bg-stone-50 py-3 pl-11 pr-5 text-sm text-gray-700 outline-none transition focus:border-rose-300 focus:bg-white"
            />

          </div>

          {/* Right-side icons */}
          <div className="ml-auto flex items-center gap-3">

            {/* Mobile Search */}
            <button
              className="cursor-pointer rounded-full p-2 text-gray-700 transition hover:bg-stone-100 md:hidden"
              aria-label="Search"
            >
              <Search size={21} strokeWidth={1.8} />
            </button>

            {/* Person / Profile */}
            {isLoggedIn ? (
              <ProfileDropdown onLogout={onLogout} />
            ) : (
              <button
                onClick={onAuthClick}
                className="cursor-pointer rounded-full p-2 text-gray-700 transition hover:bg-rose-50 hover:text-rose-600"
                aria-label="Account"
                title="Login / Sign Up"
              >
                <User size={21} strokeWidth={1.8} />
              </button>
            )}

            {/* Cart */}
            <button
              onClick={onCartClick}
              className="relative cursor-pointer rounded-full p-2 text-gray-700 transition hover:bg-rose-50 hover:text-rose-600"
              aria-label="Shopping cart"
              title="Shopping cart"
            >
              <ShoppingCart size={21} strokeWidth={1.8} />

              {cartCount > 0 && (
                <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-rose-500 text-[10px] font-semibold text-white">
                  {cartCount}
                </span>
              )}
            </button>

          </div>
        </div>
      </div>


      {/* =====================================================
          SECOND NAVIGATION
          ===================================================== */}
      <div className="border-b border-stone-100 bg-white">
        <nav className="mx-auto flex max-w-7xl items-center justify-center gap-8 px-6 py-4 lg:gap-12">

          <button
            onClick={onHomeClick}
            className="group relative cursor-pointer text-[13px] font-medium uppercase tracking-[0.16em] text-gray-700 transition-colors duration-300 hover:text-rose-700"
          >
            Home

            <span className="absolute -bottom-1 left-0 h-[2px] w-0 bg-rose-700 transition-all duration-300 group-hover:w-full" />
          </button>

          <button
            onClick={() => onNavigate("shop")}
            className="group relative cursor-pointer text-[13px] font-medium uppercase tracking-[0.16em] text-gray-700 transition-colors duration-300 hover:text-rose-700"
          >
            Shop
            <span className="absolute -bottom-1 left-0 h-[2px] w-0 bg-rose-700 transition-all duration-300 group-hover:w-full" />
          </button>

          <button
            onClick={() => onNavigate("categories")}
            className="group relative cursor-pointer text-[13px] font-medium uppercase tracking-[0.16em] text-gray-700 transition-colors duration-300 hover:text-rose-700"
          >
            Categories
            <span className="absolute -bottom-1 left-0 h-[2px] w-0 bg-rose-700 transition-all duration-300 group-hover:w-full" />
          </button>

          <button
            onClick={() => onNavigate("features")}
            className="group relative cursor-pointer text-[13px] font-medium uppercase tracking-[0.16em] text-gray-700 transition-colors duration-300 hover:text-rose-700"
          >
            Features
            <span className="absolute -bottom-1 left-0 h-[2px] w-0 bg-rose-700 transition-all duration-300 group-hover:w-full" />
          </button>

          <button
            onClick={() => onNavigate("about")}
            className="group relative cursor-pointer text-[13px] font-medium uppercase tracking-[0.16em] text-gray-700 transition-colors duration-300 hover:text-rose-700"
          >
            About
            <span className="absolute -bottom-1 left-0 h-[2px] w-0 bg-rose-700 transition-all duration-300 group-hover:w-full" />
          </button>

        </nav>
      </div>

    </header>
  );
}

export default Navbar;