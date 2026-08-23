/*remove click garda cart ma number 0 dekhako xaina*/
import { useState, useEffect } from "react"; /**useEffect lets us run the API request when the homepage loads */

import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import ProductSection from "./components/ProductSection";
import Features from "./components/Features";
import About from "./components/About";
import Footer from "./components/Footer";
import Login from "./components/Login";
import Cart from "./components/Cart";
import Checkout from "./components/Checkout";

function App() {
  
  // Keeps track of which page the user is viewing
  const [currentPage, setCurrentPage] = useState("home");

  // Keeps track of the number shown on the cart icon
  const [cartCount, setCartCount] = useState(0);

  // Controls whether the login panel is open
  const [isLoginOpen, setIsLoginOpen] = useState(false);

 // Handles Add to Cart
  const handleAddToCart = async (product) => { //tells which product the customer clicked

  const token = localStorage.getItem("access_token");

  //if not logged in, open login panel
  if (!token) {
    setIsLoginOpen(true);
    return;
  }

  //gets the logged in customer's ID
  const customerId = localStorage.getItem("customer_id");

  if (!customerId) {
    setIsLoginOpen(true);
    return;
  }

  try {
    //send the selected product to FastAPI
    const response = await fetch(
      `http://127.0.0.1:8000/cart/${customerId}/items`,
      {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
        },
        
        /**sends the product to FastAPI  */
        body: JSON.stringify({
          product_id: product.id,
          quantity: 1,
        }),
      }
    );

    const data = await response.json();

    if (!response.ok) {
      console.error("Add to cart failed:", data);
      return;
    }

    console.log("Added to cart:", data);

    await fetchCartCount();

  } catch (error) {

    console.error("Add to cart error:", error);

  }
};

//cart count
const fetchCartCount = async () => {

  const customerId = localStorage.getItem("customer_id");

  if (!customerId) {
    setCartCount(0);
    return;
  }

  try {

    const response = await fetch(
      `http://127.0.0.1:8000/cart/${customerId}/count`
    );

    const data = await response.json();

    if (!response.ok) {
      console.error("Unable to get cart count:", data);
      return;
    }

    setCartCount(data.cart_count);

  } catch (error) {

    console.error("Cart count error:", error);

  }
};

useEffect(() => {
  fetchCartCount();
}, []);

return (
    <div className="min-h-screen bg-white text-gray-900">

      {/* Navigation */}
      <Navbar
        onLoginClick={() => setIsLoginOpen(true)}
        onCartClick={() => setCurrentPage("cart")}
        onHomeClick={() => setCurrentPage("home")}
        cartCount={cartCount}
      />

      {/* Show homepage */}
      {currentPage === "home" && (
        <>
          <Hero />

          <ProductSection
            onAddToCart={handleAddToCart}
          />

          <Features />

          <About />

          <Footer />
        </>
      )}

      {/* Show cart page */}
      {currentPage === "cart" && (
        <Cart 
          onHomeClick={() => setCurrentPage("home")}
          onCartUpdate={fetchCartCount}
          onCheckoutClick={() => setCurrentPage("checkout")}
          />
      )}

      {currentPage === "checkout" && (
      <Checkout
        onHomeClick={() => setCurrentPage("home")}
        onOrderComplete={() => setCartCount(0)} //shows cart count 0 after succeful checkout
      />
    )}

      {/* Login sliding panel */}
      <Login
        isOpen={isLoginOpen}
        onClose={() => setIsLoginOpen(false)}
      />

    </div>
  );
}

export default App;