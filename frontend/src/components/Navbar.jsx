function Navbar() {
  return (
    <nav className="sticky top-0 z-50 border-b border-gray-100 bg-white/95 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5 lg:px-10">

        {/* Logo */}
        <a
          href="#home"
          className="text-2xl font-semibold tracking-[0.25em] text-gray-900"
        >
          LAKMÉ
        </a>

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

        {/* Login */}
        <a
          href="#login"
          className="rounded-full border border-gray-900 px-5 py-2 text-sm font-medium transition hover:bg-gray-900 hover:text-white"
        >
          Login
        </a>
      </div>
    </nav>
  );
}

export default Navbar;