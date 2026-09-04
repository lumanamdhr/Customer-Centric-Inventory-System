/*remove click garda cart ma number 0 dekhako xaina*/
import { useState, useEffect } from "react"; /**useEffect lets us run the API request when the homepage loads */

import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import ProductSection from "./components/ProductSection";
import ProductDetails from "./components/ProductDetails";
import Features from "./components/Features";
import About from "./components/About";
import Footer from "./components/Footer";
import Cart from "./components/Cart";
import Checkout from "./components/Checkout";
import DashboardLayout from "./components/dashboard/DashboardLayout";
import CartDrawer from "./components/CartDrawer";
import CategorySection from "./components/CategorySection";
import OfferSection from "./components/OfferSection";
import BenefitsSection from "./components/BenefitSection";
import CommunitySection from "./components/CommunitySection";
import Shop from "./components/Shop";
import Auth from "./components/Auth";

function App() {
  
  // Keeps track of which page the user is viewing
  const [currentPage, setCurrentPage] = useState("home"); //useState() is a React Hook that must be called inside component function

  const [userRole, setUserRole] = useState(
  localStorage.getItem("customer_role")
  );

  // Keeps track of the number shown on the cart icon
  const [cartCount, setCartCount] = useState(0);


  const [isLoggedIn, setIsLoggedIn] = useState(
  !!localStorage.getItem("access_token") //!!token=ture if !!null=false
);
  // Stores whatever the customer types into the search bar
  const [searchTerm, setSearchTerm] = useState("");

  const [selectedProduct, setSelectedProduct] = useState(null);

  const [selectedCategory, setSelectedCategory] = useState("All");

  // Controls whether the cart drawer is visible
  const [isCartOpen, setIsCartOpen] = useState(false);
 
  // Handles Add to Cart
  const handleAddToCart = async (product, quantity=1) => { //tells which product the customer clicked

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
          quantity: quantity,
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

/*const openDashboard = () => {
  setCurrentPage("dashboard");
};*/

//provides the respective page 
const handleLoginSuccess = (role) => {
  setUserRole(role);
  setIsLoggedIn(true);
  if (role === "admin" || role === "employee") {
    setCurrentPage("dashboard");
  } else {
    setCurrentPage("home");
  }
};

//logout
const handleLogout = () => {
  // Remove saved authentication information
  localStorage.removeItem("access_token");
  localStorage.removeItem("customer_id");
  localStorage.removeItem("customer_name");
  localStorage.removeItem("customer_email");
  localStorage.removeItem("customer_role");

  // Update React state
  setIsLoggedIn(false);
  setUserRole(null);
  setCartCount(0);
  setCurrentPage("home");
};

//central navigation funxtion
const handleNavigate = (page) => {
  setCurrentPage(page);
};

const handleViewDetails = (product) => {
  setSelectedProduct(product);
  setCurrentPage("product-details");
};

const handleSearch = () => {
  setSelectedCategory("All");
  setCurrentPage("shop");
};

const handleClearSearch = () => {
  setSearchTerm("");
};

return (
    <div className="min-h-screen bg-white text-gray-900">

      {/* Navigation */}
      {currentPage !== "dashboard" && (
      <Navbar
        onAuthClick={() => setCurrentPage("auth")}
        onCartClick={() => setIsCartOpen(true)}
        onHomeClick={() => setCurrentPage("home")}
        onNavigate={handleNavigate}
        onSearch={handleSearch}
        cartCount={cartCount}
        isLoggedIn={isLoggedIn}
        onLogout={handleLogout}
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
      />
      )}

      {/* Show homepage */}
      {currentPage === "home" && (
        <>
          <Hero />

          <CategorySection
            onCategoryClick={(category) => {
              setSelectedCategory(category);
              setCurrentPage("shop");
            }}
          />

             <OfferSection
            onCreateAccount={() => setCurrentPage("auth")}
          />

          <ProductSection
             onAddToCart={handleAddToCart}
              onViewDetails={handleViewDetails}
              onViewMore={() => handleNavigate("shop")}
          />

          {/* Why Shop With Us */}
          <BenefitsSection />
          
          <CommunitySection />

          {/*<Features />

          <About />*/}

          <Footer 
            onNavigate={handleNavigate}
          />

          
         {/*<button
            onClick={openDashboard}
            className="fixed bottom-6 right-6 cursor-pointer rounded-full bg-gray-900 px-5 py-3 text-sm font-medium text-white shadow-lg transition hover:bg-gray-700"
          >
            Dashboard
          </button>*/}
        </>
      )}

      {currentPage === "product-details" && selectedProduct && (
        <ProductDetails
          product={selectedProduct}
          onBack={() => setCurrentPage("shop")}
          onAddToCart={handleAddToCart}
        />
      )}

      {/*shows shop page */}
      {currentPage === "shop" && (
        <Shop
          onAddToCart={handleAddToCart}
          onViewDetails={handleViewDetails}
          initialCategory={selectedCategory}
          searchTerm={searchTerm}
          onClearSearch={handleClearSearch}
        />
      )}

      {/*the login sign up page */}
      {currentPage === "auth" && (
        <Auth
          onBack={() => setCurrentPage("home")}
          onLoginSuccess={handleLoginSuccess}
        />
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

       {currentPage === "dashboard" && (
        <DashboardLayout role={userRole} />
      )}

      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        onCheckout={() => {
          setIsCartOpen(false);
          setCurrentPage("checkout");
        }}
        onCartUpdate={fetchCartCount}
      />

      {/* Login sliding panel 
      <Login
        isOpen={isLoginOpen}
        onClose={() => setIsLoginOpen(false)}
        onLoginSuccess={handleLoginSuccess} //login component can communicate the role to App
      /> */}

    </div>
  );
}

export default App;