import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import ProductSection from "./components/ProductSection";
import Features from "./components/Features";
import About from "./components/About";
import Footer from "./components/Footer";
import { useState } from "react";
import Login from "./components/Login";

function App() {
  const [cartCount, setCartCount] = useState(0);
  const [isLoginOpen, setIsLoginOpen] = useState(false);

  const handleAddToCart = () => {
    const token = localStorage.getItem("access_token"); /* checks if the browser currently have login token */

    if (!token) {
        setIsLoginOpen(true);
        return;
    }

    setCartCount((currentCount) => currentCount + 1);
  };

  return (
    <div className="min-h-screen bg-white text-gray-900">
      <Navbar 
      onLoginClick={() => setIsLoginOpen(true)}
      cartCount={cartCount}/>
      <Hero />
      <ProductSection onAddToCart={handleAddToCart} />
      <Features />
      <About />
      <Footer />
      <Login
        isOpen={isLoginOpen}
        onClose={() => setIsLoginOpen(false)}
      />
    </div>
  );
}

export default App;