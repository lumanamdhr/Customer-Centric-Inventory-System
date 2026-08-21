import { useEffect, useState } from "react";
import ProductCard from "./ProductCard";

function ProductSection({ onAddToCart }) {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true); /*shows laoding products inncase of delay*/
    const [error, setError] = useState(""); /*displays unable to laod products when it fails*/
    
    /*useEffect tells reacts to run this code after the component is loaded*/
    useEffect(() => {
  fetch("http://127.0.0.1:8000/products")
    .then((response) => {
      if (!response.ok) {
        throw new Error("Failed to fetch products");
      }

      return response.json(); /*convert the response body into usable javascript data*/
    })
    .then((data) => {
      setProducts(data);
    })
    .catch((error) => {
      setError(error.message);
    })
    .finally(() => {
      setLoading(false);
    });
}, []);
    
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
              onAddToCart={onAddToCart}
            />
          ))}
        </div>

      </div>
    </section>
  );
}

export default ProductSection;