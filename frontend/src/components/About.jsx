import {
  Heart,
  Sparkles,
  Target,
  Lightbulb,
} from "lucide-react";

function About() {
  return (
    <main className="min-h-screen bg-white">

      {/* Hero */}
      <section className="bg-gradient-to-br from-pink-50 via-rose-50 to-white px-6 py-20">

        <div className="mx-auto max-w-4xl text-center">

          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-pink-600">
            About Us
          </p>

          <h1 className="mt-5 text-4xl font-semibold tracking-tight text-slate-900 sm:text-5xl">
            Beauty designed for every expression.
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-base leading-7 text-slate-600">
            Our platform brings together beauty, personal care,
            and a simple shopping experience in one place.
          </p>

        </div>

      </section>


      {/* Introduction */}
      <section className="px-6 py-16">

        <div className="mx-auto max-w-5xl">

          <div className="rounded-[2rem] bg-rose-50 px-7 py-10 text-center sm:px-12">

            <Heart className="mx-auto text-rose-500" size={28} />

            <h2 className="mt-5 text-2xl font-semibold text-slate-900">
              Beauty that feels personal.
            </h2>

            <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-slate-600">
              We believe beauty is about confidence, individuality,
              and expressing yourself in your own way. Our experience
              is designed to make discovering and shopping for your
              favorite products simple and enjoyable.
            </p>

          </div>

        </div>

      </section>


      {/* Vision / Mission / Why */}
      <section className="px-6 pb-20">

        <div className="mx-auto grid max-w-6xl gap-6 md:grid-cols-3">

          {/* Vision */}
          <div className="rounded-3xl border border-pink-100 bg-white p-7 shadow-sm">

            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-pink-100 text-pink-600">
              <Sparkles size={21} />
            </div>

            <h2 className="mt-6 text-xl font-semibold text-slate-900">
              Our Vision
            </h2>

            <p className="mt-3 text-sm leading-6 text-slate-500">
              To create a beauty shopping experience that feels
              simple, welcoming, and personal for everyone.
            </p>

          </div>


          {/* Mission */}
          <div className="rounded-3xl border border-rose-100 bg-white p-7 shadow-sm">

            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-rose-100 text-rose-600">
              <Target size={21} />
            </div>

            <h2 className="mt-6 text-xl font-semibold text-slate-900">
              Our Mission
            </h2>

            <p className="mt-3 text-sm leading-6 text-slate-500">
              To make it easier for customers to discover beauty
              products that fit their needs and preferences.
            </p>

          </div>


          {/* Why */}
          <div className="rounded-3xl border border-fuchsia-100 bg-white p-7 shadow-sm">

            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-fuchsia-100 text-fuchsia-600">
              <Lightbulb size={21} />
            </div>

            <h2 className="mt-6 text-xl font-semibold text-slate-900">
              Why We Exist
            </h2>

            <p className="mt-3 text-sm leading-6 text-slate-500">
              Because shopping for beauty should be convenient,
              enjoyable, and centered around the customer.
            </p>

          </div>

        </div>

      </section>

    </main>
  );
}

export default About;