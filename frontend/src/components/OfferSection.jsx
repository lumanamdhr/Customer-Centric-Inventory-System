import { ArrowRight, Tag } from "lucide-react";

function OfferSection({ onCreateAccount }) {
  return (
    <section className="bg-rose-50 px-6 py-14 lg:px-10">

      <div className="mx-auto max-w-6xl overflow-hidden rounded-[2rem] bg-gradient-to-r from-rose-200 via-rose-100 to-amber-50 shadow-sm">

        <div className="grid items-center gap-10 px-8 py-12 sm:px-12 lg:grid-cols-2 lg:px-16 lg:py-16">

          {/* Text */}
          <div>

            <div className="inline-flex items-center gap-2 rounded-full bg-white/70 px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-rose-600">
              <Tag size={15} />
              Limited Time Offer
            </div>

            <h2 className="mt-6 text-4xl font-semibold leading-tight text-gray-900 sm:text-5xl">
              Get 20% off your
              <span className="block text-rose-600">
                first order
              </span>
            </h2>

            <p className="mt-5 max-w-lg text-sm leading-7 text-gray-600 sm:text-base">
              Sign up and unlock exclusive member pricing on selected
              beauty essentials.
            </p>

            <div className="mt-6">

              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gray-500">
                Use code at checkout
              </p>

              <div className="mt-2 inline-block rounded-xl border border-dashed border-rose-400 bg-white/70 px-5 py-3">
                <span className="text-lg font-bold tracking-[0.15em] text-gray-900">
                  LAKME20
                </span>
              </div>

            </div>

            <button
              onClick={onCreateAccount}
              className="mt-7 inline-flex cursor-pointer items-center gap-3 rounded-full bg-gray-900 px-7 py-3.5 text-sm font-semibold text-white transition hover:bg-rose-600"
            >
              Create Free Account
              <ArrowRight size={17} />
            </button>

          </div>

          {/* Decorative visual */}
          <div className="hidden lg:flex lg:justify-end">

            <div className="relative h-64 w-64">

              <div className="absolute inset-0 rounded-full bg-white/60" />

              <div className="absolute left-10 top-10 flex h-44 w-44 items-center justify-center rounded-full bg-rose-300/60 shadow-inner">

                <div className="text-center">

                  <p className="text-sm font-semibold uppercase tracking-[0.2em] text-gray-700">
                    Save
                  </p>

                  <p className="mt-1 text-6xl font-semibold text-gray-900">
                    20%
                  </p>

                </div>

              </div>

            </div>

          </div>

        </div>

      </div>

    </section>
  );
}

export default OfferSection;

//it uses only a current promotional UI element, not a woring discount calculation
//later when we implement promotional logic we can make the code calculate discount