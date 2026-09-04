import { useEffect, useState } from "react";
import ProductCard from "./ProductCard";

function ProductSection({
  onAddToCart,
  onViewDetails,
  onViewMore,
}) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(
          "http://127.0.0.1:8000/products"
        );

        const data = await response.json();

        if (!response.ok) {
          setMessage("Unable to load products.");
          return;
        }

        setProducts(data);
      } catch (error) {
        console.error("Product loading error:", error);
        setMessage("Unable to connect to server.");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // Only show selected products on Home
  const featuredProducts = products.slice(0, 8);

  return (
    <section
      id="products"
      className="bg-gradient-to-b from-white via-rose-50/30 to-white px-6 py-16 lg:px-10"
    >
      <div className="mx-auto max-w-7xl">

        {/* Heading */}
        <div className="mb-14 flex flex-col items-center text-center">

          <span className="rounded-full bg-rose-50 px-4 py-2 text-[10px] font-semibold uppercase tracking-[0.3em] text-rose-600">
            Lakmé Collection
          </span>

          <h2 className="mt-5 text-3xl font-semibold tracking-tight text-gray-900 sm:text-4xl">
            Beauty Essentials
          </h2>

          <p className="mt-4 max-w-2xl text-sm leading-7 text-gray-500 sm:text-base">
            Discover makeup and skincare essentials selected for
            your everyday beauty routine.
          </p>

        </div>

        {/* Loading */}
        {loading && (
          <div className="py-16 text-center text-sm text-gray-500">
            Loading products...
          </div>
        )}

        {/* Error */}
        {!loading && message && (
          <div className="py-16 text-center text-sm text-red-500">
            {message}
          </div>
        )}

        {/* Products */}
        {!loading && !message && (
          <>
            <div className="grid gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">

              {featuredProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onAddToCart={onAddToCart}
                  onViewDetails={onViewDetails}
                />
              ))}

            </div>

            {/* View More */}
            {products.length > 8 && (
              <div className="mt-14 text-center">

                <button
                  onClick={onViewMore}
                  className="group inline-flex cursor-pointer items-center gap-3 rounded-full border border-gray-900 px-8 py-3.5 text-sm font-semibold text-gray-900 transition-all duration-300 hover:bg-gray-900 hover:text-white"
                >
                  View More Products

                  <span className="transition duration-300 group-hover:translate-x-1">
                    →
                  </span>
                </button>

              </div>
            )}

          </>
        )}

      </div>
    </section>
  );
}

export default ProductSection;