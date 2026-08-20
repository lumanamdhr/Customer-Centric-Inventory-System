function Features() {

  const features = [
    {
      icon: "📦",
      title: "Inventory Insights",
      description:
        "Monitor stock levels and understand which products need attention.",
    },
    {
      icon: "📊",
      title: "Sales Analysis",
      description:
        "Understand product performance and use sales data for better decisions.",
    },
    {
      icon: "👥",
      title: "Customer Insights",
      description:
        "Understand customer buying patterns and use them to improve inventory decisions.",
    },
  ];

  return (
    <section
      id="features"
      className="bg-gray-50 px-6 py-20 lg:px-10"
    >
      <div className="mx-auto max-w-7xl">

        <div className="mb-12 text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-rose-500">
            What We Offer
          </p>

          <h2 className="mt-3 text-3xl font-semibold text-gray-900 md:text-4xl">
            Our Features
          </h2>
        </div>

        <div className="grid gap-6 md:grid-cols-3">

          {features.map((feature) => (
            <div
              key={feature.title}
              className="rounded-2xl bg-white p-8 text-center shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
            >

              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-rose-50 text-2xl">
                {feature.icon}
              </div>

              <h3 className="mt-6 text-xl font-semibold text-gray-900">
                {feature.title}
              </h3>

              <p className="mt-3 leading-7 text-gray-500">
                {feature.description}
              </p>

            </div>
          ))}

        </div>
      </div>
    </section>
  );
}

export default Features;