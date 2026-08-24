function InventoryList({ title, products, type }) {

  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-6">

      <div className="mb-6">
        <h3 className="text-lg font-semibold text-gray-900">
          {title}
        </h3>

        <p className="mt-1 text-sm text-gray-500">
          {type === "low"
            ? "Products that need restocking soon."
            : "Products that currently have no stock."}
        </p>
      </div>

      {products.length === 0 ? (

        <p className="text-sm text-gray-500">
          No products in this category.
        </p>

      ) : (

        <div className="space-y-4">

          {products.map((product) => (

            <div
              key={product.id}
              className="flex items-center justify-between border-b border-gray-100 pb-4 last:border-0 last:pb-0"
            >

              <div>
                <p className="font-medium text-gray-900">
                  {product.name}
                </p>

                {type === "low" && (
                  <p className="mt-1 text-xs text-gray-500">
                    Reorder level: {product.reorder_level}
                  </p>
                )}
              </div>

              <div className="text-right">

                <p className="text-sm font-medium text-gray-900">
                  {product.stock_quantity ?? 0} units
                </p>

                {type === "low" && (
                  <p className="text-xs text-gray-500">
                    Current stock
                  </p>
                )}

              </div>

            </div>

          ))}

        </div>

      )}

    </div>
  );
}

export default InventoryList;