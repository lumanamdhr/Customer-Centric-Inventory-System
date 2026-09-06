import {
  ShoppingBag,
  Grid3X3,
  Info,
  ShoppingCart,
  CreditCard,
  Heart,
} from "lucide-react";

function Features() {

  const features = [
    {
      icon: ShoppingBag,
      title: "Easy Shopping",
      description:
        "Browse beauty products easily and discover your next favorite.",
      color: "bg-pink-100 text-pink-600",
    },
    {
      icon: Grid3X3,
      title: "Category-Based Shopping",
      description:
        "Find products quickly by exploring categories such as Face, Lips, Eyes, and Skincare.",
      color: "bg-rose-100 text-rose-600",
    },
    {
      icon: Info,
      title: "Product Details",
      description:
        "View product information, descriptions, prices, and availability before purchasing.",
      color: "bg-fuchsia-100 text-fuchsia-600",
    },
    {
      icon: ShoppingCart,
      title: "Smart Cart",
      description:
        "Add products to your cart, adjust quantities, and manage your selections easily.",
      color: "bg-pink-100 text-pink-600",
    },
    {
      icon: CreditCard,
      title: "Secure Checkout",
      description:
        "Complete your purchase through a simple and smooth checkout experience.",
      color: "bg-rose-100 text-rose-600",
    },
    {
      icon: Heart,
      title: "Personalized Experience",
      description:
        "Customer buying patterns help create a more relevant and enjoyable shopping experience.",
      color: "bg-fuchsia-100 text-fuchsia-600",
    },
  ];

  return (
    <main className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-rose-50 px-6 py-16">

      <div className="mx-auto max-w-6xl">

        {/* Header */}
        <div className="mx-auto max-w-3xl text-center">

          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-pink-600">
            Our Features
          </p>

          <h1 className="mt-5 text-4xl font-semibold tracking-tight text-slate-900 sm:text-5xl">
            A simpler way to explore beauty.
          </h1>

          <p className="mt-5 text-sm leading-7 text-slate-600 sm:text-base">
            Everything is designed to make discovering, choosing,
            and purchasing your favorite beauty products easier.
          </p>

        </div>


        {/* Feature cards */}
        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">

          {features.map((feature) => {

            const Icon = feature.icon;

            return (
              <div
                key={feature.title}
                className="rounded-3xl border border-pink-100 bg-white p-7 shadow-sm transition duration-200 hover:-translate-y-1 hover:shadow-lg"
              >

                <div
                  className={`flex h-12 w-12 items-center justify-center rounded-2xl ${feature.color}`}
                >
                  <Icon size={22} />
                </div>

                <h2 className="mt-6 text-lg font-semibold text-slate-900">
                  {feature.title}
                </h2>

                <p className="mt-3 text-sm leading-6 text-slate-500">
                  {feature.description}
                </p>

              </div>
            );

          })}

        </div>

      </div>

    </main>
  );
}

export default Features;