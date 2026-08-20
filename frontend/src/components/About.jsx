function About() {
  return (
    <section
      id="about"
      className="bg-white px-6 py-20 lg:px-10"
    >
      <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-2 lg:items-center">

        {/* Visual */}
        <div className="flex h-80 items-center justify-center rounded-3xl bg-gradient-to-br from-gray-900 to-gray-700">
          <div className="text-center text-white">
            <p className="text-5xl font-semibold">01</p>

            <p className="mt-3 text-sm uppercase tracking-[0.3em] text-gray-300">
              Smarter Decisions
            </p>
          </div>
        </div>

        {/* Content */}
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-rose-500">
            About the System
          </p>

          <h2 className="mt-4 text-3xl font-semibold leading-tight text-gray-900 md:text-4xl">
            A customer-centric approach to smarter inventory.
          </h2>

          <p className="mt-6 leading-8 text-gray-600">
            Our system connects products, sales, inventory and
            customer behavior into one platform. Instead of
            making inventory decisions only from existing stock,
            the system uses sales and customer information to
            support smarter business decisions.
          </p>

          <p className="mt-4 leading-8 text-gray-600">
            The goal is simple: help businesses understand what
            customers are buying and maintain the right products
            at the right time.
          </p>
        </div>

      </div>
    </section>
  );
}

export default About;