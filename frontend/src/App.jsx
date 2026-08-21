import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import ProductSection from "./components/ProductSection";
import Features from "./components/Features";
import About from "./components/About";
import Footer from "./components/Footer";
import { useState } from "react";
import Login from "./components/Login";

function App() {
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  return (
    <div className="min-h-screen bg-white text-gray-900">
      <Navbar 
      onLoginClick={() => setIsLoginOpen(true)}/>
      <Hero />
      <ProductSection />
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