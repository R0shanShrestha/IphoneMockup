import React from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Highlights from "./components/Highlights";
import Model from "./components/Model";
import Features from "./components/Features";
import HowItWorks from "./components/HowItWorks";
import Footer from "./components/Footer";
import "./App.css";

const App = () => {
  return (
    <main className="bg-black h-screen  text-white">
      {/* navbar */}
      <Navbar />

      {/* hero */}
      <Hero />

      {/* highlight */}
      <Highlights />

      {/* Models */}
      <Model />

      {/* Features */}
      <Features />

      {/* how it works */}
      <HowItWorks />

      {/* Footer */}
      <Footer />
    </main>
  );
};

export default App;
