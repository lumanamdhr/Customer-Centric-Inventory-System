import {
  Truck,
  ShieldCheck,
  Sparkles,
  Headphones,
} from "lucide-react";

function BenefitsSection() {
  const benefits = [
    {
      icon: Truck,
      title: "Fast Delivery",
      description:
        "Get your beauty essentials delivered conveniently to your doorstep.",
    },
    {
      icon: ShieldCheck,
      title: "Quality Products",
      description:
        "Explore carefully selected makeup and skincare essentials.",
    },
    {
      icon: Sparkles,
      title: "Beauty Essentials",
      description:
        "Find everyday products across face, lips, eyes and skincare.",
    },
    {
      icon: Headphones,
      title: "Customer Support",
      description:
        "We're here to make your shopping experience simple and convenient.",
    },
  ];

  return (
    <section className="bg-stone-50 px-6 py-16 lg:px-10">

      <div className="mx-auto max-w-7xl">

        {/* Heading */}
        <div className="mb-12 text-center">

          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-rose-600">
            Why Lakmé
          </p>

          <h2 className="mt-3 text-3xl font-semibold tracking-tight text-gray-900 sm:text-4xl">
            A Better Beauty Experience
          </h2>

          <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-gray-500 sm:text-base">
            Everything you need for a smoother and more enjoyable
            beauty shopping experience.
          </p>

        </div>

        {/* Benefits */}
        <div className="grid overflow-hidden rounded-3xl border border-stone-200 bg-white sm:grid-cols-2 lg:grid-cols-4">

          {benefits.map((benefit, index) => {
            const Icon = benefit.icon;

            return (
              <div
                key={benefit.title}
                className={`group p-8 text-center transition duration-300 hover:bg-rose-50 ${
                  index !== benefits.length - 1
                    ? "border-b border-stone-100 lg:border-b-0 lg:border-r"
                    : ""
                }`}
              >

                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-rose-50 text-rose-500 transition duration-300 group-hover:scale-110 group-hover:bg-white">
                  <Icon size={25} strokeWidth={1.6} />
                </div>

                <h3 className="mt-5 text-base font-semibold text-gray-900">
                  {benefit.title}
                </h3>

                <p className="mt-3 text-sm leading-6 text-gray-500">
                  {benefit.description}
                </p>

              </div>
            );
          })}

        </div>

      </div>

    </section>
  );
}

export default BenefitsSection;