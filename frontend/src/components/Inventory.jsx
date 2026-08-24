import { useEffect, useState } from "react";
import InventoryList from "./dashboard/InventoryList";

function Inventory() {

  const [inventory, setInventory] = useState(null);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");

  const fetchInventory = async () => {
    try {

      const response = await fetch(
        "http://127.0.0.1:8000/dashboard/inventory/details"
      );

      const data = await response.json();

      if (!response.ok) {
        setMessage(data.detail || "Unable to load inventory.");
        return;
      }

      setInventory(data);

    } catch (error) {

      console.error("Inventory error:", error);
      setMessage("Unable to connect to server.");

    } finally {

      setLoading(false);

    }
  };

  useEffect(() => {
    fetchInventory();
  }, []);

  if (loading) {
    return (
      <div className="p-10 text-gray-500">
        Loading inventory...
      </div>
    );
  }

  if (message) {
    return (
      <div className="p-10 text-red-500">
        {message}
      </div>
    );
  }

  return (
  <div className="min-h-screen bg-gray-50 px-8 py-10">

    <div className="mx-auto max-w-7xl">

      <p className="text-sm tracking-[0.25em] text-gray-500">
        INVENTORY
      </p>

      <h1 className="mt-2 text-3xl font-semibold text-gray-900">
        Inventory Overview
      </h1>

      <p className="mt-2 text-gray-500">
        Monitor stock levels and inventory value.
      </p>

    {/*inventory value */}
      <div className="mt-8">

        <div className="rounded-2xl border border-gray-200 bg-white p-6">

          <p className="text-sm text-gray-500">
            Inventory Value
          </p>

          <h2 className="mt-3 text-3xl font-semibold text-gray-900">
            Rs.{" "}
            {inventory.inventory_value.toLocaleString()}
          </h2>

          <p className="mt-2 text-sm text-gray-500">
            Estimated value of current stock
          </p>

        </div>

        <div className="mt-8 grid gap-6 lg:grid-cols-2">


        {/* Product Lists */}

        <div className="mt-8 grid gap-6 lg:grid-cols-2">

          <InventoryList
            title="Low Stock Products"
            products={inventory.low_stock_products}
            type="low"
          />

          <InventoryList
            title="Out of Stock Products"
            products={inventory.out_of_stock_products}
            type="out"
          />

        </div>

      </div>

    </div>

    </div>

    </div>
  );
}

export default Inventory;