import { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight, ArrowRight } from "lucide-react";

function Hero() {
  const slides = [
    {
      id: 1,
      eyebrow: "EVERYDAY BEAUTY",
      title: "Beauty that speaks for you.",
      description:
        "Discover makeup essentials designed to complement your everyday look.",
      button: "Shop Makeup",
      image:
        "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=1800&q=85",
    },

    {
      id: 2,
      eyebrow: "LIP ESSENTIALS",
      title: "Make every look count.",
      description:
        "Find your perfect lip shades, finishes and everyday beauty favorites.",
      button: "Explore Lips",
      image:
        "https://images.unsplash.com/photo-1586495777744-4413f21062fa?auto=format&fit=crop&w=1800&q=85",
    },

    {
      id: 3,
      eyebrow: "EYE MAKEUP",
      title: "Define your expression.",
      description:
        "Explore eyeliners, kajal, mascara and more for your signature look.",
      button: "Explore Eyes",
      image:
        "https://images.unsplash.com/photo-1512496015851-a90fb38ba796?auto=format&fit=crop&w=1800&q=85",
    },

    {
      id: 4,
      eyebrow: "SKINCARE",
      title: "Care that completes your routine.",
      description:
        "Discover skincare essentials for a fresh and comfortable everyday routine.",
      button: "Shop Skincare",
      image:
        "https://images.unsplash.com/photo-1556228578-8c89e6adf883?auto=format&fit=crop&w=1800&q=85",
    },
  ];

  const [currentSlide, setCurrentSlide] = useState(0);

  // Move to the next slide
  const nextSlide = () => {
    setCurrentSlide((previousSlide) =>
      previousSlide === slides.length - 1 ? 0 : previousSlide + 1
    );
  };

  // Move to the previous slide
  const previousSlide = () => {
    setCurrentSlide((previousSlide) =>
      previousSlide === 0 ? slides.length - 1 : previousSlide - 1
    );
  };

  // Automatically change slides every 5 seconds
  useEffect(() => {
    const slideTimer = setInterval(() => {
      nextSlide();
    }, 5000);

    // Clean up timer when component disappears
    return () => clearInterval(slideTimer);
  }, []);

  // Scroll to the product section for now
  const handleShopClick = () => {
    const productSection = document.getElementById("products");

    if (productSection) {
      productSection.scrollIntoView({
        behavior: "smooth",
      });
    }
  };

  return (
    <section className="relative h-[500px] overflow-hidden bg-stone-900 sm:h-[540px]">

      {/* =====================================================
          SLIDES
          ===================================================== */}
      {slides.map((slide, index) => (
        <div
          key={slide.id}
          className={`absolute inset-0 transition-opacity duration-700 ${
            index === currentSlide
              ? "opacity-100"
              : "pointer-events-none opacity-0"
          }`}
        >

          {/* Background image */}
          <img
            src={slide.image}
            alt={slide.title}
            className="absolute inset-0 h-full w-full object-cover"
          />

          {/* Dark image overlay */}
          <div className="absolute inset-0 bg-black/35" />

          {/* Soft gradient overlay for text readability */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/65 via-black/30 to-transparent" />

          {/* Content */}
          <div className="relative z-10 mx-auto flex h-full max-w-7xl items-center px-16 sm:px-20 lg:px-16 xl:px-20">

            <div className="max-w-xl text-white">

              {/* Small heading */}
              <p className="mb-5 text-xs font-semibold uppercase tracking-[0.35em] text-rose-200 sm:text-sm">
                {slide.eyebrow}
              </p>

              {/* Main heading */}
              <h1 className="max-w-lg text-4xl font-semibold leading-tight tracking-tight sm:text-5xl md:text-6xl">
                {slide.title}
              </h1>

              {/* Description */}
              <p className="mt-6 max-w-lg text-base leading-7 text-white/85 sm:text-lg">
                {slide.description}
              </p>

              {/* Button */}
              <button
                onClick={handleShopClick}
                className="mt-8 inline-flex cursor-pointer items-center gap-3 rounded-full bg-white px-7 py-3.5 text-sm font-semibold text-gray-900 transition duration-300 hover:bg-rose-500 hover:text-white"
              >
                {slide.button}

                <ArrowRight size={17} />
              </button>

            </div>
          </div>
        </div>
      ))}

      {/* =====================================================
          PREVIOUS BUTTON
          ===================================================== */}
      <button
        onClick={previousSlide}
        aria-label="Previous slide"
        className="absolute left-4 top-1/2 z-20 flex -translate-y-1/2 items-center justify-center rounded-full border border-white/40 bg-black/20 p-2.5 text-white backdrop-blur-sm transition hover:bg-white hover:text-gray-900 sm:left-7 sm:p-3"
        >
        <ChevronLeft size={24} strokeWidth={1.8} />
      </button>

      {/* =====================================================
          NEXT BUTTON
          ===================================================== */}
      <button
        onClick={nextSlide}
        aria-label="Next slide"
        className="absolute right-4 top-1/2 z-20 flex -translate-y-1/2 items-center justify-center rounded-full border border-white/40 bg-black/20 p-2.5 text-white backdrop-blur-sm transition hover:bg-white hover:text-gray-900 sm:right-7 sm:p-3"
        >
        <ChevronRight size={24} strokeWidth={1.8} />
      </button>

      {/* =====================================================
          SLIDE INDICATORS
          ===================================================== */}
      <div className="absolute bottom-8 left-1/2 z-20 flex -translate-x-1/2 items-center gap-2">

        {slides.map((slide, index) => (
          <button
            key={slide.id}
            onClick={() => setCurrentSlide(index)}
            aria-label={`Go to slide ${index + 1}`}
            className={`h-2 cursor-pointer rounded-full transition-all duration-300 ${
              index === currentSlide
                ? "w-8 bg-white"
                : "w-2 bg-white/50 hover:bg-white/80"
            }`}
          />
        ))}

      </div>

    </section>
  );
}

export default Hero;