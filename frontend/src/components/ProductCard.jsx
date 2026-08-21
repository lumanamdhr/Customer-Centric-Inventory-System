/*images is not displayed yet*/
function ProductCard({ product, onAddToCart }) {
  return (
    <article className="group overflow-hidden rounded-2xl border border-gray-100 bg-white transition duration-300 hover:-translate-y-1 hover:shadow-xl">

      {/* Product Image Placeholder */}
      <div className="flex h-64 items-center justify-center bg-gradient-to-br from-gray-50 to-rose-50">
        <div className="text-center">
          <div className="mb-3 text-5xl">
            {product.icon}
          </div>

          <span className="text-xs uppercase tracking-widest text-gray-400">
            Beauty Product
          </span>
        </div>
      </div>

      {/* Product Information */}
      <div className="p-6">

        <p className="text-xs font-medium uppercase tracking-widest text-rose-500">
          {product.category}
        </p>

        <h3 className="mt-2 text-lg font-semibold text-gray-900">
          {product.name}
        </h3>

        <div className="mt-4 flex items-center justify-between">
          <p className="text-base font-medium text-gray-900">
            Rs. {product.price}
          </p>

          <button
            onClick={onAddToCart}
            className="rounded-full bg-gray-900 px-4 py-2 text-xs font-medium text-white transition hover:bg-rose-500"
          >
            Add to Cart
          </button>
        </div>

      </div>
    </article>
  );
}

export default ProductCard;