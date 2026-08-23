import { useState } from "react";

function Checkout({ onHomeClick, onOrderComplete }) {
  const [paymentMethod, setPaymentMethod] = useState("cash"); //what payment method customer selected
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [orderSuccess, setOrderSuccess] = useState(false);

  const handleCheckout = async () => {
    setLoading(true);
    setMessage("");

    const token = localStorage.getItem("access_token"); //retreivibg JWT that was created during login

    if (!token) {
      setMessage("Please login before checking out.");
      setLoading(false);
      return;
    }

    try {
      const response = await fetch(
        "http://127.0.0.1:8000/checkout",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`, //tells teh checout request belongs to customer represened by JWT
          },
          body: JSON.stringify({
            payment_method: paymentMethod,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        setMessage(data.detail || "Checkout failed.");
        setLoading(false);
        return;
      }

      setOrderSuccess(true);
      setMessage(
        `Order placed successfully! Sale #${data.sale_id}`
      );

      if (onOrderComplete) {
        onOrderComplete();
      }

    } catch (error) {
      console.error("Checkout error:", error);
      setMessage("Unable to connect to server.");
    }

    setLoading(false);
  };

  if (orderSuccess) {
    return (
      <div className="min-h-screen bg-white px-6 py-20">
        <div className="mx-auto max-w-2xl text-center">

          <p className="mb-4 text-sm tracking-[0.3em] text-gray-500">
            ORDER CONFIRMED
          </p>

          <h1 className="mb-6 text-4xl font-medium text-gray-900">
            Thank You
          </h1>

          <p className="mb-10 text-gray-500">
            Your order has been successfully placed.
          </p>

          <button
            onClick={onHomeClick}
            className="cursor-pointer rounded-full bg-gray-900 px-8 py-3 text-sm font-medium text-white transition hover:bg-gray-700"
          >
            Continue Shopping
          </button>

        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white px-6 py-16">
      <div className="mx-auto max-w-3xl">

        <p className="mb-2 text-sm tracking-[0.3em] text-gray-500">
          CHECKOUT
        </p>

        <h1 className="mb-12 text-4xl font-medium text-gray-900">
          Complete Your Order
        </h1>

        <div className="border-t border-gray-200 pt-8">

          <h2 className="mb-6 text-lg font-medium text-gray-900">
            Payment Method
          </h2>

          <div className="space-y-4">

            <label className="flex cursor-pointer items-center gap-4 rounded-lg border border-gray-200 p-5 transition hover:border-gray-900">
              <input
                type="radio"
                name="payment"
                value="cash"
                checked={paymentMethod === "cash"}
                onChange={(event) =>
                  setPaymentMethod(event.target.value)
                }
              />

              <div>
                <p className="font-medium text-gray-900">
                  Cash
                </p>

                <p className="text-sm text-gray-500">
                  Pay with cash.
                </p>
              </div>
            </label>

          </div>

          {message && (
            <p className="mt-6 text-sm text-gray-600">
              {message}
            </p>
          )}

          <button
            onClick={handleCheckout}
            disabled={loading}
            className="mt-10 w-full cursor-pointer rounded-full bg-gray-900 py-4 text-sm font-medium text-white transition hover:bg-gray-700 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {loading ? "Processing..." : "Place Order"}
          </button>

          <button
            onClick={onHomeClick}
            className="mt-4 w-full cursor-pointer py-3 text-sm font-medium text-gray-500 transition hover:text-gray-900"
          >
            Continue Shopping
          </button>

        </div>
      </div>
    </div>
  );
}

export default Checkout;