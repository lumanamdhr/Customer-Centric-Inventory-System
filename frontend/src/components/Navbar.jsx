import { ShoppingCart } from "lucide-react";

function Navbar({onLoginClick, onCartClick, onHomeClick, cartCount}) {
  return (
    <nav className="sticky top-0 z-50 border-b border-gray-100 bg-white/95 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5 lg:px-10">

        {/* Logo */}
        <button
          onClick={onHomeClick}
          className="cursor-pointer text-2xl font-semibold tracking-[0.25em] text-gray-900"
        >
          LAKMÉ
        </button>

        {/* Navigation */}
        <div className="hidden items-center gap-8 md:flex">
          <a
            href="#products"
            className="text-sm font-medium text-gray-600 transition hover:text-gray-900"
          >
            Products
          </a>

          <a
            href="#features"
            className="text-sm font-medium text-gray-600 transition hover:text-gray-900"
          >
            Features
          </a>

          <a
            href="#about"
            className="text-sm font-medium text-gray-600 transition hover:text-gray-900"
          >
            About
          </a>
        </div>

        <div className="flex items-center gap-6">
    
        {/* Cart */}
        <button
            onClick={onCartClick}
            className="relative  cursor-pointer p-2 text-gray-700 hover:text-black transition"
            aria-label="Shopping cart"
        >
            <ShoppingCart size={22} strokeWidth={1.8} />

            <span className="absolute -top-1 -right-1 bg-black text-white text-[10px] font-medium rounded-full w-4 h-4 flex items-center justify-center">
                {cartCount}
            </span>
        </button>

        {/* Login */}
        <button
        onClick={onLoginClick}
        className="cursor-pointer rounded-full border border-gray-900 px-5 py-2 text-sm font-medium transition hover:bg-gray-900 hover:text-white"
        >
          Login
        {/*<a
          href="#login"
          className="rounded-full border border-gray-900 px-5 py-2 text-sm font-medium transition hover:bg-gray-900 hover:text-white"
        >
          Login
        </a>*/}
        </button>
      </div> 
      </div>
    </nav>
  );
}

export default Navbar;