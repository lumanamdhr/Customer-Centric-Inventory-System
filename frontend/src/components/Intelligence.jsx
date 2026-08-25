//rule based intelligence feature for now
import { useEffect, useState } from "react";

function Intelligence() {

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");

  const fetchIntelligence = async () => {

    try {

      const token = localStorage.getItem("access_token");

      if (!token) {
        setMessage("Please login to view intelligence.");
        setLoading(false);
        return;
      }

      const response = await fetch(
        "http://127.0.0.1:8000/intelligence",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await response.json();

      if (!response.ok) {
        setMessage(data.detail || "Unable to load intelligence.");
        return;
      }

      setProducts(data);

    } catch (error) {

      console.error("Intelligence error:", error);
      setMessage("Unable to connect to server.");

    } finally {

      setLoading(false);

    }
  };

  useEffect(() => {
    fetchIntelligence();
  }, []);

  const productsNeedingAttention = products.length;

  const totalSuggestedReorder = products.reduce(
    (total, product) =>
      total + product.suggested_reorder_quantity,
    0
  );

  if (loading) {
    return (
      <div className="p-8">
        <p className="text-gray-500">
          Loading intelligence data...
        </p>
      </div>
    );
  }

  if (message) {
    return (
      <div className="p-8">
        <p className="text-red-500">
          {message}
        </p>
      </div>
    );
  }

  return (
    <div className="p-8">

      <div className="mb-8">

       <p className="text-sm tracking-[0.25em] text-gray-500">
          INTELLIGENCE
        </p>

        <h1 className="mt-2 text-3xl font-semibold text-gray-900">
          Sales & Inventory Intelligence
        </h1>

        <p className="mt-2 text-gray-500">
          Use historical business data to support better decisions.
        </p>

      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">

        <div className="rounded-2xl border border-gray-200 bg-white p-6">

          <p className="text-sm text-gray-500">
            Products Needing Attention
          </p>

          <p className="mt-2 text-3xl font-semibold">
            {productsNeedingAttention}
          </p>

        </div>

        <div className="rounded-2xl border border-gray-200 bg-white p-6">

          <p className="text-sm text-gray-500">
            Suggested Reorder Units
          </p>

          <p className="mt-2 text-3xl font-semibold">
            {totalSuggestedReorder}
          </p>

        </div>

      </div>

      <div className="mt-8 rounded-2xl border border-gray-200 bg-white p-6">

        <h3 className="mb-6 text-lg font-semibold">
          Reorder Recommendations
        </h3>

        {products.length === 0 ? (

          <p className="text-sm text-gray-500">
            No products currently require restocking.
          </p>

        ) : (

          <div className="space-y-4">

            {products.map((product) => (

              <div
                key={product.id}
                className="flex items-center justify-between border-b border-gray-100 pb-4 last:border-0"
              >

                <div>

                  <p className="font-medium text-gray-900">
                    {product.name}
                  </p>

                  <p className="mt-1 text-sm text-gray-500">
                    Current stock: {product.stock_quantity}
                  </p>

                  <p className="text-sm text-gray-500">
                    Reorder level: {product.reorder_level}
                  </p>

                </div>

                <div className="text-right">

                  <p className="font-medium text-gray-900">
                    Reorder {product.suggested_reorder_quantity}
                  </p>

                  <p className="text-xs text-gray-500">
                    units suggested
                  </p>

                </div>

              </div>

            ))}

          </div>

        )}

      </div>

    </div>
  );
}

export default Intelligence;
