import { useEffect, useMemo, useState } from "react";
import { Search, SlidersHorizontal, X } from "lucide-react";
import ProductCard from "./ProductCard";

function Shop({
  onAddToCart,
  onViewDetails,
  initialCategory = "All",
  searchTerm = "",
  onClearSearch,
}) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");

  // Search
 // const [searchTerm, setSearchTerm] = useState("");

  // Category filter
  const [selectedCategory, setSelectedCategory] = useState(initialCategory);

  // Price filter
  const [minPrice, setMinPrice] = useState(100);
  const [maxPrice, setMaxPrice] = useState(800);

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
        console.error("Shop product loading error:", error);
        setMessage("Unable to connect to server.");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // Get unique categories from the products
  const categories = useMemo(() => {
    const uniqueCategories = [
      ...new Set(products.map((product) => product.category)),
    ];

    return ["All", ...uniqueCategories];
  }, [products]);

  // Filter products
  const filteredProducts = useMemo(() => { //useMemo lets React reuse the calculated result until one of thr values it depends on chnages
    const searchText = searchTerm.toLowerCase().trim();
    
    return products.filter((product) => {
      
      const matchesSearch =
      product.name.toLowerCase().includes(searchText) ||
      product.category.toLowerCase().includes(searchText);

      const matchesCategory =
        selectedCategory === "All" ||
        product.category === selectedCategory;

      const matchesPrice =
        product.price >= minPrice &&
        product.price <= maxPrice;

      return (
        matchesSearch &&
        matchesCategory &&
        matchesPrice
      );
    });
  }, [
    products,
    searchTerm,
    selectedCategory,
    minPrice,
    maxPrice,
  ]);

  const clearFilters = () => {
  setSelectedCategory("All");
  setMinPrice(100);
  setMaxPrice(800);
  onClearSearch();
};

  return (
    <main className="min-h-screen bg-stone-50">

      {/* =====================================================
          SHOP HEADER
          ===================================================== */}
      <section className="bg-gradient-to-r from-rose-100 via-pink-50 to-amber-50 px-6 py-14 lg:px-10">
        <div className="mx-auto max-w-7xl text-center">

          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-rose-600">
            Explore Lakmé
          </p>

          <h1 className="mt-3 text-4xl font-semibold tracking-tight text-gray-900 sm:text-5xl">
            Shop Beauty Essentials
          </h1>

          <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-gray-600 sm:text-base">
            Discover makeup and skincare products and find the
            right essentials for your beauty routine.
          </p>

        </div>
      </section>


      {/* =====================================================
          SHOP CONTENT
          ===================================================== */}
      <section className="px-6 py-10 lg:px-10">
        <div className="mx-auto max-w-7xl">

          <div className="grid gap-8 lg:grid-cols-[250px_1fr]">

            {/* =================================================
                SIDEBAR
                ================================================= */}
            <aside className="h-fit rounded-3xl border border-stone-200 bg-white p-6 shadow-sm">

              <div className="flex items-center justify-between">

                <div className="flex items-center gap-2">
                  <SlidersHorizontal size={18} />
                  <h2 className="text-base font-semibold text-gray-900">
                    Filters
                  </h2>
                </div>

                <button
                  onClick={clearFilters}
                  className="cursor-pointer text-xs font-medium text-rose-600 hover:text-rose-700"
                >
                  Clear
                </button>

              </div>


              {/* Search 
              <div className="mt-7">

                <label className="text-xs font-semibold uppercase tracking-[0.16em] text-gray-500">
                  Search
                </label>

                <div className="relative mt-3">

                  <Search
                    size={17}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                  />

                  <input
                    type="text"
                    value={searchTerm}
                    onChange={(event) =>
                      setSearchTerm(event.target.value)
                    }
                    placeholder="Search products..."
                    className="w-full rounded-xl border border-stone-200 bg-stone-50 py-3 pl-10 pr-3 text-sm outline-none transition focus:border-rose-300 focus:bg-white"
                  />

                </div>

              </div>*/}


              {/* Category */}
              <div className="mt-8">

                <label className="text-xs font-semibold uppercase tracking-[0.16em] text-gray-500">
                  Category
                </label>

                <div className="mt-4 space-y-2">

                  {categories.map((category) => (
                    <button
                      key={category}
                      onClick={() =>
                        setSelectedCategory(category)
                      }
                      className={`block w-full cursor-pointer rounded-xl px-4 py-2.5 text-left text-sm transition ${
                        selectedCategory === category
                          ? "bg-rose-100 font-semibold text-rose-700"
                          : "text-gray-600 hover:bg-stone-50 hover:text-gray-900"
                      }`}
                    >
                      {category}
                    </button>
                  ))}

                </div>

              </div>


              {/* Price */}
              <div className="mt-8">

                <div className="flex items-center justify-between">
                  <label className="text-xs font-semibold uppercase tracking-[0.16em] text-gray-500">
                    Price Range
                  </label>

                  <span className="text-xs font-semibold text-rose-600">
                    Rs. {minPrice} - Rs. {maxPrice}
                  </span>
                </div>


                {/* Minimum price */}
                <div className="mt-5">

                  <div className="mb-2 flex justify-between text-xs text-gray-500">
                    <span>Minimum</span>
                    <span>Rs. {minPrice}</span>
                  </div>

                  <input
                    type="range"
                    min="100"
                    max="800"
                    step="10"
                    value={minPrice}
                    onChange={(event) => {
                      const value = Number(event.target.value);

                      if (value <= maxPrice) {
                        setMinPrice(value);
                      }
                    }}
                    className="w-full cursor-pointer accent-rose-500"
                  />

                </div>


                {/* Maximum price */}
                <div className="mt-5">

                  <div className="mb-2 flex justify-between text-xs text-gray-500">
                    <span>Maximum</span>
                    <span>Rs. {maxPrice}</span>
                  </div>

                  <input
                    type="range"
                    min="100"
                    max="800"
                    step="10"
                    value={maxPrice}
                    onChange={(event) => {
                      const value = Number(event.target.value);

                      if (value >= minPrice) {
                        setMaxPrice(value);
                      }
                    }}
                    className="w-full cursor-pointer accent-rose-500"
                  />

                </div>

              </div>

            </aside>


            {/* =================================================
                PRODUCTS
                ================================================= */}
            <div>

              {/* Results header */}
              <div className="mb-6 flex flex-wrap items-center justify-between gap-3">

                <div>
                  <p className="text-sm text-gray-500">
                    Showing{" "}
                    <span className="font-semibold text-gray-900">
                      {filteredProducts.length}
                    </span>{" "}
                    products
                  </p>
                </div>

                {/* Selected filter */}
                {(searchTerm ||
                  selectedCategory !== "All" ||
                  minPrice !== 100 ||
                  maxPrice !== 800) && (
                  <button
                    onClick={clearFilters}
                    className="inline-flex cursor-pointer items-center gap-2 rounded-full bg-white px-4 py-2 text-xs font-medium text-gray-600 shadow-sm transition hover:text-rose-600"
                  >
                    Clear filters
                    <X size={14} />
                  </button>
                )}

              </div>


              {/* Loading */}
              {loading && (
                <div className="rounded-3xl bg-white py-20 text-center text-sm text-gray-500">
                  Loading products...
                </div>
              )}


              {/* Error */}
              {!loading && message && (
                <div className="rounded-3xl bg-white py-20 text-center text-sm text-red-500">
                  {message}
                </div>
              )}


              {/* Empty */}
              {!loading &&
                !message &&
                filteredProducts.length === 0 && (
                  <div className="rounded-3xl border border-stone-200 bg-white py-20 text-center">

                    <h2 className="text-lg font-semibold text-gray-900">
                      No products found
                    </h2>

                    <p className="mt-2 text-sm text-gray-500">
                      Try adjusting your search, category or price range.
                    </p>

                    <button
                      onClick={clearFilters}
                      className="mt-6 cursor-pointer rounded-full bg-gray-900 px-6 py-3 text-sm font-semibold text-white transition hover:bg-rose-600"
                    >
                      Clear Filters
                    </button>

                  </div>
                )}


              {/* Product grid */}
              {!loading &&
                !message &&
                filteredProducts.length > 0 && (
                  <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">

                    {filteredProducts.map((product) => (
                      <ProductCard
                        key={product.id}
                        product={product}
                        onAddToCart={onAddToCart}
                        onViewDetails={onViewDetails}
                      />
                    ))}

                  </div>
                )}

            </div>

          </div>

        </div>
      </section>

    </main>
  );
}

export default Shop;