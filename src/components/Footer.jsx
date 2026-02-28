import "./Footer.css";
import { FaGoogle, FaGithub, FaLinkedin, FaXTwitter } from "react-icons/fa6";
import { useState } from "react";


function Footer() {


  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

const API_URL = "https://ciphervest-backend.onrender.com";

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
        setMessage("Subscribed successfully 🎉");
        setEmail("");
      } else {
        setMessage(data.message || "Something went wrong");
      }
    } catch  {
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
          Receive curated insights on crypto, structured finance, and emerging investment strategies.
        </p>

        <div className="newsletter-input">
          <input
            type="email"
            placeholder="Enter your professional email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <button onClick={handleSubscribe} disabled={loading}>
            {loading ? "Subscribing..." : "Subscribe"}
          </button>
        </div>

        {message && <p className="newsletter-message">{message}</p>}
      </div>
    </div>

      <div className="footer-container">

        <div className="left">
          <div className="footer-brand">
            <h3>Trusted by 5,000+ Investors</h3>
            <p>
              NoticeX delivers institutional-grade financial solutions with transparency and precision.
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
            <h4>Investment Products</h4>
            <ul>
              <li>Digital Assets</li>
              <li>Structured Finance</li>
              <li>Private Equity</li>
              <li>Quant Strategies</li>
              <li>Global Markets</li>
            </ul>
          </div>

          <div className="footer-links">
            <h4>Solutions</h4>
            <ul>
              <li>Wealth Advisory</li>
              <li>Risk Management</li>
              <li>Portfolio Structuring</li>
              <li>Blockchain Advisory</li>
            </ul>
          </div>

          <div className="footer-links">
            <h4>Company</h4>
            <ul>
              <li>About Us</li>
              <li>Careers</li>
              <li>Insights</li>
              <li>Compliance</li>
            </ul>
          </div>

          <div className="footer-contact">
            <h4>Contact</h4>
            <p>+91 98765 43210</p>
            <p>partners@noticexcapital.com</p>
            <p>Mumbai • Singapore • London</p>
          </div>

        </div>
      </div>

      <div className="footer-payments">
        <img 
          src="https://assets.weforum.org/organization/image/ngfvgBH8pt-CYvoLVnHFBcawoQG15TH4goz7V7g4ngo.jpg" 
          alt="Visa" 
        />
        <img 
          src="https://upload.wikimedia.org/wikipedia/commons/2/2a/Mastercard-logo.svg" 
          alt="Mastercard" 
        />
        <img 
          src="https://upload.wikimedia.org/wikipedia/commons/3/30/American_Express_logo.svg" 
          alt="American Express" 
        />
        <img 
          src="https://upload.wikimedia.org/wikipedia/commons/b/b5/PayPal.svg" 
          alt="PayPal" 
        />
      </div>

      <div className="footer-bottom">
        © 2025 NoticeX Capital. All rights reserved. | Regulated & Compliant.
      </div>

    </footer>
  );
}

export default Footer;