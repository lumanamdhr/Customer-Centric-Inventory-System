function Hero() {
  return (
    <section
      id="home"
      className="relative overflow-hidden bg-gradient-to-br from-rose-50 via-white to-amber-50"
    >
      <div className="mx-auto grid max-w-7xl items-center gap-12 px-6 py-20 lg:grid-cols-2 lg:px-10 lg:py-28">

        {/* Hero Content */}
        <div>
          <p className="mb-4 text-sm font-semibold uppercase tracking-[0.3em] text-rose-500">
            Customer Centric Beauty
          </p>

          <h1 className="max-w-2xl text-5xl font-semibold leading-tight tracking-tight text-gray-900 md:text-6xl">
            Beauty meets
            <span className="block text-rose-500">
              intelligence.
            </span>
          </h1>

          <p className="mt-6 max-w-xl text-lg leading-8 text-gray-600">
            A smarter way to understand products, inventory,
            sales and customer demand through one connected platform.
          </p>

          <div className="mt-8 flex flex-wrap gap-4">
            <a
              href="#products"
              className="rounded-full bg-gray-900 px-7 py-3 text-sm font-medium text-white transition hover:bg-gray-700"
            >
              Explore Products
            </a>

            <a
              href="#login"
              className="rounded-full border border-gray-300 bg-white px-7 py-3 text-sm font-medium text-gray-900 transition hover:border-gray-900"
            >
              Login
            </a>
          </div>
        </div>

        {/* Hero Visual */}
        <div className="flex justify-center">
          <div className="relative flex h-[400px] w-full max-w-md items-center justify-center rounded-[2rem] bg-gradient-to-br from-rose-200 via-pink-100 to-amber-100 shadow-xl">

            <div className="absolute h-64 w-64 rounded-full bg-white/50 blur-2xl" />

            <div className="relative text-center">
              <div className="mb-4 text-7xl">
                ✨
              </div>

              <p className="text-2xl font-semibold tracking-wide text-gray-800">
                BEAUTY
              </p>

              <p className="mt-2 text-sm uppercase tracking-[0.3em] text-gray-500">
                Meets Intelligence
              </p>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}

export default Hero;