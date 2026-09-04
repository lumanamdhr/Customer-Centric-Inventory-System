import { useEffect, useMemo, useState } from "react";
import {
  Package,
  AlertTriangle,
  CircleOff,
  Boxes,
  Search,
  Pencil,
  X,
  Save,
} from "lucide-react";

function Inventory() {
  const [products, setProducts] = useState([]);

  const [inventoryDetails, setInventoryDetails] =
    useState(null);

  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");

  // Search
  const [searchTerm, setSearchTerm] = useState("");

  // Category
  const [selectedCategory, setSelectedCategory] =
    useState("All");

  // Product being edited
  const [editingProduct, setEditingProduct] =
    useState(null);

  const [saving, setSaving] = useState(false);
  const [saveMessage, setSaveMessage] = useState("");

  // ==========================================================
  // LOAD PRODUCTS + INVENTORY DETAILS
  // ==========================================================

  const fetchInventory = async () => {
    try {
      setLoading(true);
      setMessage("");

      const productsResponse = await fetch(
        "http://127.0.0.1:8000/products"
      );

      const productsData = await productsResponse.json();

      if (!productsResponse.ok) {
        setMessage("Unable to load products.");
        return;
      }

      setProducts(productsData);

      const detailsResponse = await fetch(
        "http://127.0.0.1:8000/dashboard/inventory/details"
      );

      const detailsData = await detailsResponse.json();

      if (detailsResponse.ok) {
        setInventoryDetails(detailsData);
      }

    } catch (error) {
      console.error("Inventory loading error:", error);
      setMessage("Unable to connect to the server.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchInventory();
  }, []);

  // ==========================================================
  // CATEGORIES
  // ==========================================================

  const categories = useMemo(() => {
    const uniqueCategories = [
      ...new Set(
        products.map((product) => product.category)
      ),
    ];

    return ["All", ...uniqueCategories];
  }, [products]);

  // ==========================================================
  // FILTER PRODUCTS
  // ==========================================================

  const filteredProducts = useMemo(() => {
    const search = searchTerm.toLowerCase().trim();

    return products.filter((product) => {
      const matchesSearch =
        product.name.toLowerCase().includes(search) ||
        product.category.toLowerCase().includes(search);

      const matchesCategory =
        selectedCategory === "All" ||
        product.category === selectedCategory;

      return matchesSearch && matchesCategory;
    });
  }, [
    products,
    searchTerm,
    selectedCategory,
  ]);

  // ==========================================================
  // STOCK STATUS
  // ==========================================================

  const getStockStatus = (product) => {
    if (product.stock_quantity === 0) {
      return {
        label: "Out of Stock",
        className: "bg-red-50 text-red-600",
      };
    }

    if (
      product.stock_quantity <= product.reorder_level
    ) {
      return {
        label: "Low Stock",
        className: "bg-amber-50 text-amber-700",
      };
    }

    return {
      label: "In Stock",
      className: "bg-emerald-50 text-emerald-700",
    };
  };

  // ==========================================================
  // OPEN EDIT MODAL
  // ==========================================================

  const openEditModal = (product) => {
    setEditingProduct({
      ...product,
    });

    setSaveMessage("");
  };

  // ==========================================================
  // CLOSE EDIT MODAL
  // ==========================================================

  const closeEditModal = () => {
    if (saving) {
      return;
    }

    setEditingProduct(null);
    setSaveMessage("");
  };

  // ==========================================================
  // SAVE PRODUCT
  // ==========================================================

  const handleSaveProduct = async () => {
    if (!editingProduct) {
      return;
    }

    setSaving(true);
    setSaveMessage("");

    try {
      const response = await fetch(
        `http://127.0.0.1:8000/products/${editingProduct.id}`,
        {
          method: "PUT",

          headers: {
            "Content-Type": "application/json",
          },

          body: JSON.stringify({
            name: editingProduct.name,
            category: editingProduct.category,
            description: editingProduct.description,
            price: Number(editingProduct.price),
            stock_quantity: Number(
              editingProduct.stock_quantity
            ),
            reorder_level: Number(
              editingProduct.reorder_level
            ),
           // image: editingProduct.image,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        console.error("Product update failed:", data);
        setSaveMessage(
          typeof data.detail === "string"
            ? data.detail
            : "Unable to update product."
        );
        return;
      }

      setSaveMessage("Product updated successfully.");

      // Refresh the table
      await fetchInventory();

      // Close after successful update
      setTimeout(() => {
        setEditingProduct(null);
        setSaveMessage("");
      }, 700);

    } catch (error) {
      console.error("Product update error:", error);
      setSaveMessage(
        "Unable to connect to the server."
      );
    } finally {
      setSaving(false);
    }
  };

  return (
    <section className="relative">

      {/* ======================================================
          PAGE HEADER
          ====================================================== */}

      <div className="mb-8">

        <p className="text-xs font-semibold uppercase tracking-[0.22em] text-teal-700">
          Inventory Control
        </p>

        <div className="mt-2 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">

          <div>

            <h1 className="text-3xl font-semibold tracking-tight text-slate-900">
              Inventory
            </h1>

            <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-500">
              Monitor product availability, identify stock
              issues, and maintain your product information.
            </p>

          </div>

          <div className="rounded-full bg-teal-50 px-4 py-2 text-xs font-semibold text-teal-700">
            {products.length} Products
          </div>

        </div>

      </div>


      {/* ======================================================
          SUMMARY CARDS
          ====================================================== */}

      {!loading && !message && (
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">

          {/* Inventory Value */}
          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">

            <div className="flex items-center justify-between">

              <div>
                <p className="text-sm font-medium text-slate-500">
                  Inventory Value
                </p>

                <p className="mt-2 text-2xl font-semibold text-slate-900">
                  Rs.{" "}
                  {inventoryDetails?.inventory_value ?? 0}
                </p>
              </div>

              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-teal-50 text-teal-700">
                <Boxes size={19} />
              </div>

            </div>

          </div>


          {/* Total Products */}
          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">

            <div className="flex items-center justify-between">

              <div>
                <p className="text-sm font-medium text-slate-500">
                  Total Products
                </p>

                <p className="mt-2 text-2xl font-semibold text-slate-900">
                  {products.length}
                </p>
              </div>

              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-100 text-slate-700">
                <Package size={19} />
              </div>

            </div>

          </div>


          {/* Low Stock */}
          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">

            <div className="flex items-center justify-between">

              <div>
                <p className="text-sm font-medium text-slate-500">
                  Low Stock
                </p>

                <p className="mt-2 text-2xl font-semibold text-slate-900">
                  {inventoryDetails
                    ?.low_stock_products?.length ?? 0}
                </p>
              </div>

              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-50 text-amber-700">
                <AlertTriangle size={19} />
              </div>

            </div>

          </div>


          {/* Out of Stock */}
          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">

            <div className="flex items-center justify-between">

              <div>
                <p className="text-sm font-medium text-slate-500">
                  Out of Stock
                </p>

                <p className="mt-2 text-2xl font-semibold text-slate-900">
                  {inventoryDetails
                    ?.out_of_stock_products?.length ?? 0}
                </p>
              </div>

              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-red-50 text-red-600">
                <CircleOff size={19} />
              </div>

            </div>

          </div>

        </div>
      )}


      {/* ======================================================
          FILTERS
          ====================================================== */}

      <div className="mt-8 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">

        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">

          {/* Search */}
          <div className="relative w-full lg:max-w-md">

            <Search
              size={17}
              className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"
            />

            <input
              type="text"
              value={searchTerm}
              onChange={(event) =>
                setSearchTerm(event.target.value)
              }
              placeholder="Search products..."
              className="w-full rounded-xl border border-slate-200 bg-slate-50 py-3 pl-10 pr-4 text-sm text-slate-700 outline-none transition focus:border-teal-500 focus:bg-white"
            />

          </div>

          {/* Category filters */}
          <div className="flex flex-wrap gap-2">

            {categories.map((category) => (
              <button
                key={category}
                onClick={() =>
                  setSelectedCategory(category)
                }
                className={`cursor-pointer rounded-full px-4 py-2 text-xs font-semibold transition ${
                  selectedCategory === category
                    ? "bg-teal-600 text-white"
                    : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                }`}
              >
                {category}
              </button>
            ))}

          </div>

        </div>

      </div>


      {/* ======================================================
          PRODUCT TABLE
          ====================================================== */}

      <div className="mt-6 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">

        {loading && (
          <div className="py-20 text-center text-sm text-slate-500">
            Loading inventory...
          </div>
        )}

        {!loading && message && (
          <div className="py-20 text-center text-sm text-red-500">
            {message}
          </div>
        )}

        {!loading &&
          !message &&
          filteredProducts.length === 0 && (
            <div className="py-20 text-center">

              <p className="text-base font-semibold text-slate-900">
                No products found
              </p>

              <p className="mt-2 text-sm text-slate-500">
                Try a different search or category.
              </p>

            </div>
          )}

        {!loading &&
          !message &&
          filteredProducts.length > 0 && (
            <div className="overflow-x-auto">

              <table className="w-full min-w-[900px] border-collapse">

                <thead>
                  <tr className="border-b border-slate-200 bg-slate-50">

                    <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-[0.12em] text-slate-500">
                      Product
                    </th>

                    <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-[0.12em] text-slate-500">
                      Category
                    </th>

                    <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-[0.12em] text-slate-500">
                      Price
                    </th>

                    <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-[0.12em] text-slate-500">
                      Stock
                    </th>

                    <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-[0.12em] text-slate-500">
                      Reorder
                    </th>

                    <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-[0.12em] text-slate-500">
                      Status
                    </th>

                    <th className="px-6 py-4 text-right text-xs font-semibold uppercase tracking-[0.12em] text-slate-500">
                      Action
                    </th>

                  </tr>
                </thead>

                <tbody>

                  {filteredProducts.map((product) => {
                    const status =
                      getStockStatus(product);

                    return (
                      <tr
                        key={product.id}
                        className="border-b border-slate-100 transition hover:bg-slate-50/70"
                      >

                        {/* Product */}
                        <td className="px-6 py-5">

                          <div className="flex items-center gap-3">

                            <div className="flex h-12 w-12 items-center justify-center overflow-hidden rounded-xl bg-slate-100">

                              {product.image ? (
                                <img
                                  src={`http://127.0.0.1:8000${product.image}`}
                                  alt={product.name}
                                  className="h-full w-full object-contain p-2"
                                />
                              ) : (
                                <Package
                                  size={19}
                                  className="text-slate-400"
                                />
                              )}

                            </div>

                            <div>

                              <p className="text-sm font-semibold text-slate-900">
                                {product.name}
                              </p>

                              <p className="mt-1 text-xs text-slate-400">
                                ID #{product.id}
                              </p>

                            </div>

                          </div>

                        </td>


                        {/* Category */}
                        <td className="px-6 py-5 text-sm text-slate-600">
                          {product.category}
                        </td>


                        {/* Price */}
                        <td className="px-6 py-5 text-sm font-medium text-slate-900">
                          Rs. {product.price}
                        </td>


                        {/* Stock */}
                        <td className="px-6 py-5">

                          <span className="text-sm font-semibold text-slate-900">
                            {product.stock_quantity}
                          </span>

                        </td>


                        {/* Reorder */}
                        <td className="px-6 py-5 text-sm text-slate-600">
                          {product.reorder_level}
                        </td>


                        {/* Status */}
                        <td className="px-6 py-5">

                          <span
                            className={`inline-flex rounded-full px-3 py-1.5 text-xs font-semibold ${status.className}`}
                          >
                            {status.label}
                          </span>

                        </td>


                        {/* Edit */}
                        <td className="px-6 py-5 text-right">

                          <button
                            onClick={() =>
                              openEditModal(product)
                            }
                            className="inline-flex cursor-pointer items-center gap-2 rounded-lg px-3 py-2 text-xs font-semibold text-slate-600 transition hover:bg-teal-50 hover:text-teal-700"
                          >
                            <Pencil size={14} />
                            Edit
                          </button>

                        </td>

                      </tr>
                    );
                  })}

                </tbody>

              </table>

            </div>
          )}

      </div>


      {/* ======================================================
          EDIT PRODUCT MODAL
          ====================================================== */}

      {editingProduct && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-950/40 px-4 py-6 backdrop-blur-sm">

          <div className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-3xl bg-white shadow-2xl">

            {/* Modal header */}
            <div className="flex items-center justify-between border-b border-slate-200 px-6 py-5">

              <div>

                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-teal-700">
                  Product Management
                </p>

                <h2 className="mt-1 text-xl font-semibold text-slate-900">
                  Edit Product
                </h2>

              </div>

              <button
                onClick={closeEditModal}
                disabled={saving}
                className="cursor-pointer rounded-full p-2 text-slate-400 transition hover:bg-slate-100 hover:text-slate-900 disabled:cursor-not-allowed"
              >
                <X size={20} />
              </button>

            </div>


            {/* Form */}
            <div className="space-y-5 px-6 py-6">

              {/* Name */}
              <div>

                <label className="mb-2 block text-sm font-medium text-slate-700">
                  Product Name
                </label>

                <input
                  type="text"
                  value={editingProduct.name}
                  onChange={(event) =>
                    setEditingProduct({
                      ...editingProduct,
                      name: event.target.value,
                    })
                  }
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none focus:border-teal-500 focus:bg-white"
                />

              </div>


              {/* Category */}
              <div>

                <label className="mb-2 block text-sm font-medium text-slate-700">
                  Category
                </label>

                <select
                  value={editingProduct.category}
                  onChange={(event) =>
                    setEditingProduct({
                      ...editingProduct,
                      category: event.target.value,
                    })
                  }
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none focus:border-teal-500 focus:bg-white"
                >
                  <option value="Face">Face</option>
                  <option value="Lips">Lips</option>
                  <option value="Eyes">Eyes</option>
                  <option value="Skincare">
                    Skincare
                  </option>
                </select>

              </div>


              {/* Description */}
              <div>

                <label className="mb-2 block text-sm font-medium text-slate-700">
                  Description
                </label>

                <textarea
                  rows="4"
                  value={editingProduct.description || ""}
                  onChange={(event) =>
                    setEditingProduct({
                      ...editingProduct,
                      description: event.target.value,
                    })
                  }
                  className="w-full resize-none rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm leading-6 outline-none focus:border-teal-500 focus:bg-white"
                />

              </div>


              {/* Price + Stock */}
              <div className="grid gap-5 sm:grid-cols-3">

                <div>

                  <label className="mb-2 block text-sm font-medium text-slate-700">
                    Price
                  </label>

                  <input
                    type="number"
                    min="0"
                    value={editingProduct.price}
                    onChange={(event) =>
                      setEditingProduct({
                        ...editingProduct,
                        price: event.target.value,
                      })
                    }
                    className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none focus:border-teal-500 focus:bg-white"
                  />

                </div>


                <div>

                  <label className="mb-2 block text-sm font-medium text-slate-700">
                    Stock
                  </label>

                  <input
                    type="number"
                    min="0"
                    value={editingProduct.stock_quantity}
                    onChange={(event) =>
                      setEditingProduct({
                        ...editingProduct,
                        stock_quantity:
                          event.target.value,
                      })
                    }
                    className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none focus:border-teal-500 focus:bg-white"
                  />

                </div>


                <div>

                  <label className="mb-2 block text-sm font-medium text-slate-700">
                    Reorder Level
                  </label>

                  <input
                    type="number"
                    min="0"
                    value={editingProduct.reorder_level}
                    onChange={(event) =>
                      setEditingProduct({
                        ...editingProduct,
                        reorder_level:
                          event.target.value,
                      })
                    }
                    className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none focus:border-teal-500 focus:bg-white"
                  />

                </div>

              </div>


              {/* Save message */}
              {saveMessage && (
                <div className="rounded-xl bg-teal-50 px-4 py-3 text-sm font-medium text-teal-700">
                  {saveMessage}
                </div>
              )}

            </div>


            {/* Footer */}
            <div className="flex flex-col-reverse gap-3 border-t border-slate-200 px-6 py-5 sm:flex-row sm:justify-end">

              <button
                onClick={closeEditModal}
                disabled={saving}
                className="cursor-pointer rounded-xl border border-slate-200 px-5 py-3 text-sm font-semibold text-slate-600 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-50"
              >
                Cancel
              </button>

              <button
                onClick={handleSaveProduct}
                disabled={saving}
                className="inline-flex cursor-pointer items-center justify-center gap-2 rounded-xl bg-teal-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-teal-700 disabled:cursor-not-allowed disabled:opacity-50"
              >
                <Save size={16} />

                {saving
                  ? "Saving..."
                  : "Save Changes"}
              </button>

            </div>

          </div>

        </div>
      )}

    </section>
  );
}

export default Inventory;