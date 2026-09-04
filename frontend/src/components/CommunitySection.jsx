import { Mail } from "lucide-react";

function CommunitySection() {
  return (
    <section className="bg-white px-6 py-16 lg:px-10">
      <div className="mx-auto max-w-6xl">

        {/* Newsletter */}
        <div className="rounded-[2rem] bg-gradient-to-r from-rose-200 via-pink-60 to-amber-50 px-8 py-12 text-center shadow-sm sm:px-12">

          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-rose-600">
            Stay Connected
          </p>

          <h2 className="mt-3 text-3xl font-semibold tracking-tight text-gray-900 sm:text-4xl">
            Join Our Beauty Community
          </h2>

          <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-gray-600 sm:text-base">
            Subscribe to get exclusive deals, beauty tips, and early
            access to new products.
          </p>

          <div className="mx-auto mt-7 flex max-w-lg flex-col gap-3 sm:flex-row">
            <div className="relative flex-1">
              <Mail
                size={18}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
              />

              <input
                type="email"
                placeholder="Enter your email address"
                className="w-full rounded-full border border-white bg-white py-3.5 pl-11 pr-5 text-sm text-gray-800 outline-none transition focus:border-rose-300"
              />
            </div>

            <button
              onClick={() =>
                alert("Thank you for joining our beauty community!")
              }
              className="cursor-pointer rounded-full bg-gray-900 px-7 py-3.5 text-sm font-semibold text-white transition hover:bg-rose-600"
            >
              Subscribe
            </button>
          </div>

        </div>

        {/* Stats 
        <div className="mt-10 grid grid-cols-3 overflow-hidden rounded-3xl border border-stone-200 bg-stone-50">

          <div className="px-4 py-7 text-center">
            <p className="text-2xl font-semibold text-gray-900 sm:text-3xl">
              1K+
            </p>
            <p className="mt-2 text-xs uppercase tracking-[0.15em] text-gray-500 sm:text-sm">
              Happy Customers
            </p>
          </div>

          <div className="border-l border-stone-200 px-4 py-7 text-center">
            <p className="text-2xl font-semibold text-gray-900 sm:text-3xl">
              1.2K+
            </p>
            <p className="mt-2 text-xs uppercase tracking-[0.15em] text-gray-500 sm:text-sm">
              Products
            </p>
          </div>

          <div className="border-l border-stone-200 px-4 py-7 text-center">
            <p className="text-2xl font-semibold text-gray-900 sm:text-3xl">
              50+
            </p>
            <p className="mt-2 text-xs uppercase tracking-[0.15em] text-gray-500 sm:text-sm">
              Brands
            </p>
          </div>

        </div>*/}

      </div>
    </section>
  );
}

export default CommunitySection;