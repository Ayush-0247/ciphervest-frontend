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
import SocialGrid from "./components/SocialGrid";
import Hero from "./components/Hero";
import ContactPage from "./pages/Contactpage";

function Home() {
  return (
    <>
      <Hero />
      <Section1 />
      <ContactPage />
      <Test />
      <SocialGrid />
      <FinPulseSection />
    </>
  );
}

function App() {
  return (
    <Router>
      <Header />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<Products />} />
        <Route path="/outmoto" element={<Outmoto />} />
        <Route path="/ourservices" element={<Ourservices />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
