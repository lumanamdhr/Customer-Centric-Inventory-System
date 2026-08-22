import { useEffect, useState } from "react";

function Cart({onCartUpdate}) {
  // Stores the cart received from our FastAPI backend
  const [cart, setCart] = useState(null);

  // Used while the API is loading
  const [loading, setLoading] = useState(true);

  // Stores error/information messages
  const [message, setMessage] = useState("");

  // Get the logged-in customer's ID from browser storage
  const customerId = localStorage.getItem("customer_id");

  // Function to get the customer's cart from FastAPI
  const fetchCart = async () => {
    try {
      const response = await fetch( /* goes to FastAPI and gets the latest cart */
        `http://127.0.0.1:8000/cart/${customerId}`
      );

      const data = await response.json(); /*converts response in javascript data */

      // If FastAPI returns an error
      if (!response.ok) {
        setMessage(data.detail || "Unable to load cart.");
        return;
      }

      // Save the cart data in React state
      setCart(data);
    } catch (error) {
      console.error("Cart error:", error);
      setMessage("Unable to connect to server.");
    } finally {
      setLoading(false);
    }
  };


  // Increase quantity
  const increaseQuantity = async (item) => {

    try {

      const response = await fetch(
        `http://127.0.0.1:8000/cart/items/${item.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            quantity: item.quantity + 1,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        setMessage(data.detail || "Unable to increase quantity.");
        return;
      }

      await fetchCart();
      onCartUpdate();

    } catch (error) {
      console.error("Increase quantity error:", error);
      setMessage("Unable to update quantity.");
    }
  };


  // Decrease quantity
  const decreaseQuantity = async (item) => {

    if (item.quantity <= 1) {
      return;
    }

    try {

      const response = await fetch(
        `http://127.0.0.1:8000/cart/items/${item.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            quantity: item.quantity - 1,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        setMessage(data.detail || "Unable to decrease quantity.");
        return;
      }

      await fetchCart();
      onCartUpdate();

    } catch (error) {
      console.error("Decrease quantity error:", error);
      setMessage("Unable to update quantity.");
    }
  };


  // Remove item
  const removeItem = async (item) => {

    try {

      const response = await fetch(
        `http://127.0.0.1:8000/cart/items/${item.id}`,
        {
          method: "DELETE", /**deletes the cartitem */
        }
      );

      const data = await response.json();

      if (!response.ok) {
        setMessage(data.detail || "Unable to remove item.");
        return;
      }

      await fetchCart(); /**reloads the cart */
      onCartUpdate();

    } catch (error) {
      console.error("Remove item error:", error);
      setMessage("Unable to remove item.");
    }
  };

  // Run fetchCart when the Cart page opens
  useEffect(() => {
    // Customer is not logged in
    if (!customerId) {
      setMessage("Please login to view your cart.");
      setLoading(false);
      return;
    }

    // Customer is logged in, so get their cart
    fetchCart();
  }, [customerId]);

return (
  <div className="min-h-screen bg-white px-6 py-16">

    <div className="mx-auto max-w-5xl">

      {/* Page heading */}
      <p className="mb-2 text-sm tracking-[0.3em] text-gray-500">
        YOUR SHOPPING BAG
      </p>

      <h1 className="mb-12 text-4xl font-medium text-gray-900">
        Your Cart
      </h1>

      {/* Cart content */}
      <div className="border-t border-gray-200 pt-8">

        {/* Loading message */}
        {loading && (
          <p className="py-10 text-center text-gray-500">
            Loading your cart...
          </p>
        )}

        {/* Error or information message */}
        {message && !loading && (
          <p className="py-10 text-center text-gray-500">
            {message}
          </p>
        )}

         {/* Cart items */}

          {!loading &&
            !message &&
            cart &&
            cart.items &&
            cart.items.length > 0 && (

              <div className="space-y-8">

                {cart.items.map((item) => (

                  <div
                    key={item.id}
                    className="flex items-center justify-between border-b border-gray-100 pb-8"
                  >

                    {/* Product */}

                    <div className="w-1/3">

                      <h2 className="text-lg font-medium text-gray-900">
                        {item.name}
                      </h2>

                      <p className="mt-1 text-sm text-gray-500">
                        {item.category}
                      </p>

                      <p className="mt-2 text-sm text-gray-600">
                        Rs. {item.price}
                      </p>

                    </div>


                    {/* Quantity */}

                    <div className="flex items-center gap-3">

                      <button
                        onClick={() => decreaseQuantity(item)}
                        disabled={item.quantity <= 1}
                        className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-full border border-gray-300 text-gray-700 transition hover:bg-gray-900 hover:text-white disabled:cursor-not-allowed disabled:opacity-30"
                      >
                        −
                      </button>

                      <span className="min-w-6 text-center text-sm font-medium">
                        {item.quantity}
                      </span>

                      <button
                        onClick={() => increaseQuantity(item)}
                        className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-full border border-gray-300 text-gray-700 transition hover:bg-gray-900 hover:text-white"
                      >
                        +
                      </button>

                    </div>


                    {/* Subtotal */}

                    <div className="w-24 text-right">

                      <p className="text-sm text-gray-500">
                        Subtotal
                      </p>

                      <p className="mt-1 font-medium text-gray-900">
                        Rs. {item.subtotal}
                      </p>

                    </div>


                    {/* Remove */}

                    <button
                      onClick={() => removeItem(item)}
                      className="cursor-pointer text-sm text-gray-400 transition hover:text-red-600"
                    >
                      Remove
                    </button>

                  </div>

                ))}


                {/* Total */}

                <div className="flex justify-end pt-6">

                  <div className="text-right">

                    <p className="text-sm text-gray-500">
                      Total
                    </p>

                    <p className="mt-1 text-2xl font-medium text-gray-900">
                      Rs. {cart.total}
                    </p>

                  </div>

                </div>

              </div>

            )}


          {/* Empty cart */}

          {!loading &&
            !message &&
            cart &&
            (!cart.items || cart.items.length === 0) && (

              <div className="py-16 text-center">

                <p className="text-gray-500">
                  Your cart is empty.
                </p>

              </div>

            )}

        </div>

      </div>

    </div>
  );
}

export default Cart;