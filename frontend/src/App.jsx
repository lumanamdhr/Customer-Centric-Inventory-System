import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import ProductSection from "./components/ProductSection";
import Features from "./components/Features";
import About from "./components/About";
import Footer from "./components/Footer";

function App() {
  return (
    <div className="min-h-screen bg-white text-gray-900">
      <Navbar />
      <Hero />
      <ProductSection />
      <Features />
      <About />
      <Footer />
    </div>
  );
}

export default App;