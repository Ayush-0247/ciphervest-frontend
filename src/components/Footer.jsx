import "./Footer.css";
import { FaGoogle, FaGithub, FaLinkedin, FaXTwitter } from "react-icons/fa6";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import visaImg from "../assets/visalogo.avif";
import mastercardImg from "../assets/Mastercard-logo.svg";
import amexImg from "../assets/American_Express_logo.svg";
import paypalImg from "../assets/PayPal.svg";

function Footer() {
  const navigate = useNavigate();
  const Gotoproductpage = () => {
    navigate("/products");
  }
  const gotocontactus = () => {
    navigate("/contact");
  }
  const Gotoservicepage = () => {
    navigate("/ourservices");
  }
  const gotomoto = () => {
    navigate("/outmoto");
  }

  const gotomarket = () => {
    navigate("/dashboard");
  }
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const API_URL = import.meta.env.VITE_API_URL;

  const handleSubscribe = async () => {
    if (!email.trim()) {
      setMessage("Please enter an email");
      return;
    }

    try {
      setLoading(true);
      setMessage("");

      const res = await fetch(`${API_URL}/api/newsletter/subscribe`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();

      if (res.ok) {
        setMessage("Subscribed successfully to our newsletter");
        setEmail("");
      } else {
        setMessage(data.message || "Something went wrong");
      }
    } catch {
      setMessage("Server error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <footer className="nx-footer">
      {/* Newsletter Card */}
      <div className="newsletter-wrapper">
        <div className="newsletter-card">
          <h3>Stay Ahead of the Markets</h3>
          <p>
            Receive curated insights on crypto, structured finance, and emerging
            investment strategies.
          </p>

          <div className="newsletter-input">
            <input
              type="email"
              placeholder="Enter your professional email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <button
              className="subscribebtn"
              onClick={handleSubscribe}
              disabled={loading}
            >
              {loading ? "Subscribing..." : "Subscribe"}
            </button>
          </div>

          {message && <p className="newsletter-message">{message}</p>}
        </div>
      </div>

      <div className="footer-container">
        <div className="left">
          <div className="footer-brand">
            <h3>Built for the Future of Digital Finance</h3>
            <p>
              CipherVest helps investors navigate the crypto economy with
              powerful trading insights, portfolio analytics, and tax-ready
              financial tools.
            </p>

            <div className="social-icons">
              <FaGoogle />
              <FaGithub />
              <FaLinkedin />
              <FaXTwitter />
            </div>
          </div>
        </div>

        <div className="right">
          <div className="footer-links">
            <h4>Products</h4>
            <ul>
              <li onClick={Gotoproductpage}>Crypto Trading</li>
              <li onClick={Gotoproductpage}>Portfolio Management</li>
              <li onClick={Gotoproductpage}>Market Analytics</li>
              <li onClick={Gotoproductpage}>Automated Strategies</li>
              <li onClick={Gotoproductpage}>Digital Asset Research</li>
            </ul>
          </div>

          <div className="footer-links">
            <h4>Services</h4>
            <ul>
              <li onClick={Gotoservicepage}>Crypto Tax Consultancy</li>
              <li onClick={Gotoservicepage}>Investment Advisory</li>
              <li onClick={Gotoservicepage}>Risk Management</li>
              <li onClick={Gotoservicepage}>Blockchain Consulting</li>
              <li onClick={Gotoservicepage}>Financal Advisory</li>
            </ul>
          </div>

          <div className="footer-links">
            <h4>Company</h4>
            <ul>
              <li onClick={gotomoto} >About Us</li>
              <li onClick={gotomoto}>Careers</li>
              <li onClick={gotomarket}>Insights & Research</li>
              <li onClick={Gotoservicepage} >Security & Compliance</li>
            </ul>
          </div>

          <div className="footer-contact">
            <h4>Contact</h4>
            <p onClick={gotocontactus}>Partnerships & Business Queries</p>

            <p>Delhi NCR • Bengaluru • Global Remote</p>
          </div>
        </div>
      </div>

      <div className="footer-payments">
        <img src={visaImg} alt="Visa" />
        <img src={mastercardImg} alt="Mastercard" />
        <img src={amexImg} alt="American Express" />
        <img src={paypalImg} alt="PayPal" />
      </div>

      

      <div className="footer-bottom">
        Cryptocurrency investments carry risk. Past performance does not
        guarantee future returns.
      </div>
    </footer>
  );
}

export default Footer;
