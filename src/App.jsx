import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Header from "./components/Header";
import Test from "./components/Test";
import Section1 from "./components/Section1";
import Footer from "./components/Footer";
import FinPulseSection from "./components/FinPulseSection";
import Outmoto from "./pages/Outmoto";
import Ourservices from "./pages/Ourservices";
import Products from "./pages/Products";
import "./App.css";

import Hero from "./components/Hero";
import ContactPage from "./pages/Contactpage";
import JPMorganSection from "./components/Jpmorgansection";
import Dashboard from "./pages/Dashboard";
import FAQ from "./pages/FAQSection";
import Testing from "./components/testing";
function Home() {
  return (
    <>
      <Hero />
      <Section1 />
      <Test />
      
      <FinPulseSection />

      <JPMorganSection />

    <Testing />
    
    </>
  );
}

function App() {
  return (
    <Router>
      <Header />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/FAQ" element={<FAQ />} />
        <Route path="/products" element={<Products />} />
        <Route path="/outmoto" element={<Outmoto />} />
        <Route path="/contact" element={<ContactPage />} />
         <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/ourservices" element={<Ourservices />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
