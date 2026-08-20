import ProductCard from "./ProductCard";

function ProductSection() {

  const products = [
    {
      id: 1,
      name: "Lakme Eyeconic Kajal",
      category: "Eye Makeup",
      price: 300,
      icon: "👁️",
    },
    {
      id: 2,
      name: "Lakme Absolute Matte Lip Color",
      category: "Lip Makeup",
      price: 699,
      icon: "💄",
    },
    {
      id: 3,
      name: "Lakme Face Powder",
      category: "Face Makeup",
      price: 499,
      icon: "✨",
    },
  ];

  return (
    <section
      id="products"
      className="bg-white px-6 py-20 lg:px-10"
    >
      <div className="mx-auto max-w-7xl">

        {/* Section Heading */}
        <div className="mb-12 text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-rose-500">
            Discover
          </p>

          <h2 className="mt-3 text-3xl font-semibold text-gray-900 md:text-4xl">
            Featured Products
          </h2>

          <p className="mx-auto mt-4 max-w-xl text-gray-500">
            Explore some of the products available through our
            customer-centric shopping platform.
          </p>
        </div>

        {/* Products */}
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {products.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
            />
          ))}
        </div>

      </div>
    </section>
  );
}

export default ProductSection;