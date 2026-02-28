import React, { useState } from "react";
import styles from "./ContactPage.module.css";

const queryTypes = [
  "Account & Onboarding",
  "Payments & Transfers",
  "Loans & Credit",
  "Investment Services",
  "Security & Fraud",
  "Technical Support",
  "Partnership & Business",
  "Other",
];

function FloatField({ id, label, required, type, value, onChange, onFocus, onBlur, focused }) {
  return (
    <div className={`${styles.field} ${focused ? styles.fieldFocused : ""} ${value ? styles.fieldFilled : ""}`}>
      <input
        type={type} name={id} id={id}
        required={required} value={value}
        onChange={onChange} onFocus={onFocus} onBlur={onBlur}
        className={styles.input}
      />
      <label htmlFor={id} className={styles.label}>
        {label}{required ? " *" : ""}
      </label>
      <span className={styles.bar} />
    </div>
  );
}

export default function ContactPage() {
  const [form, setForm] = useState({
    name: "", email: "", phone: "", company: "",
    queryType: "", subject: "", message: "",
  });
  const [focused, setFocused] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });
  const handleFocus = (name) => setFocused((f) => ({ ...f, [name]: true }));
  const handleBlur = (name) => setFocused((f) => ({ ...f, [name]: false }));

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => { setLoading(false); setSubmitted(true); }, 1800);
  };

  if (submitted) {
    return (
      <div className={styles.page}>
        <div className={styles.bgOrbs} aria-hidden="true">
          <span className={styles.orb1} /><span className={styles.orb2} />
        </div>
        <div className={styles.successWrap}>
          <div className={styles.successRing}>
            <svg viewBox="0 0 80 80" fill="none">
              <circle cx="40" cy="40" r="38" stroke="#B8892A" strokeWidth="1" strokeDasharray="5 4" />
              <circle cx="40" cy="40" r="28" stroke="#B8892A" strokeWidth="0.8" opacity="0.35" />
              <path d="M26 40.5L35 50L54 30" stroke="#B8892A" strokeWidth="2.2"
                strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
          <p className={styles.successEyebrow}>Confirmation</p>
          <h2 className={styles.successTitle}>Query Received</h2>
          <p className={styles.successMsg}>
            Thank you, <strong>{form.name.split(" ")[0]}</strong>. A dedicated specialist
            will respond to <span className={styles.successEmail}>{form.email}</span> within
            one business day.
          </p>
          <div className={styles.successActions}>
            <button className={styles.resetBtn} onClick={() => {
              setSubmitted(false);
              setForm({ name:"",email:"",phone:"",company:"",queryType:"",subject:"",message:"" });
            }}>
              ← Submit another query
            </button>
            <a href="/" className={styles.homeBtn}>
              <svg width="15" height="15" viewBox="0 0 15 15" fill="none" aria-hidden="true">
                <path d="M1.5 7.5L7.5 2L13.5 7.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M3 6.5V13H6.5V9.5H8.5V13H12V6.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              Return to Main Page
            </a>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.page}>
      <div className={styles.bgOrbs} aria-hidden="true">
        <span className={styles.orb1} />
        <span className={styles.orb2} />
        <span className={styles.orb3} />
      </div>

      <div className={styles.container}>

        {/* ——— Left Aside ——— */}
        <aside className={styles.aside}>
          <div className={styles.logoMark}>
<svg width="32" height="32" viewBox="0 0 36 36" fill="none">
  <rect 
    x="1" 
    y="1" 
    width="34" 
    height="34" 
    rx="9" 
    stroke="#B8892A" 
    strokeWidth="1.2"
  />

  <path
    d="
      M24 11
      C20 8.5, 14 9, 12 18
      C14 27, 20 27.5, 24 25
    "
    stroke="#B8892A"
    strokeWidth="1.8"
    strokeLinecap="round"
    strokeLinejoin="round"
    fill="none"
  />
</svg>
            <span className={styles.logoText}>CipherVest Capital</span>
          </div>

          <div className={styles.asideSep} />

          <h1 className={styles.headline}>
            Speak with a<br />
            <em className={styles.accentItalic}>financial expert</em>
          </h1>
          <p className={styles.subtext}>
            Every query is handled by a dedicated specialist — not a bot.
            We're committed to thoughtful, personalised financial service.
          </p>

          <div className={styles.statRow}>
            <div className={styles.stat}>
              <span className={styles.statNum}>24h</span>
              <span className={styles.statLabel}>Response SLA</span>
            </div>
            <div className={styles.statDivide} />
            <div className={styles.stat}>
              <span className={styles.statNum}>40+</span>
              <span className={styles.statLabel}>Countries</span>
            </div>
            <div className={styles.statDivide} />
            <div className={styles.stat}>
              <span className={styles.statNum}>256</span>
              <span className={styles.statLabel}>-bit TLS</span>
            </div>
          </div>

          <div className={styles.contactMethods}>
            <a href="tel:+18001234567" className={styles.contactMethod}>
              <span className={styles.cmIcon}>📞</span>
              +91 xxx xxx xxxx
            </a>
            <a href="mailto:support@ciphervest.com" className={styles.contactMethod}>
              <span className={styles.cmIcon}>✉️</span>
              support@ciphervestcpital.com
            </a>
          </div>

          <p className={styles.asideFooter}>FCA Regulated · ISO 27001 Certified</p>
        </aside>

        {/* ——— Form Panel ——— */}
        <main className={styles.formPanel}>
          <div className={styles.formHeader}>
            <span className={styles.formEyebrow}>Client Support Portal</span>
            <h2 className={styles.formTitle}>Submit your query</h2>
            <p className={styles.formSubtitle}>
              Fill in the details below and our team will be in touch promptly.
            </p>
          </div>

          <form className={styles.form} onSubmit={handleSubmit} autoComplete="off">
            <div className={styles.row}>
              <FloatField id="name" label="Full Name" required type="text"
                value={form.name} onChange={handleChange}
                onFocus={() => handleFocus("name")} onBlur={() => handleBlur("name")}
                focused={focused.name} />
              <FloatField id="email" label="Email Address" required type="email"
                value={form.email} onChange={handleChange}
                onFocus={() => handleFocus("email")} onBlur={() => handleBlur("email")}
                focused={focused.email} />
            </div>

            <div className={styles.row}>
              <FloatField id="phone" label="Phone Number" type="tel"
                value={form.phone} onChange={handleChange}
                onFocus={() => handleFocus("phone")} onBlur={() => handleBlur("phone")}
                focused={focused.phone} />
              <FloatField id="company" label="Company / Organisation" type="text"
                value={form.company} onChange={handleChange}
                onFocus={() => handleFocus("company")} onBlur={() => handleBlur("company")}
                focused={focused.company} />
            </div>

            <div className={styles.row}>
              <div className={`${styles.field} ${form.queryType ? styles.fieldFilled : ""}`}>
                <select name="queryType" id="queryType" required
                  value={form.queryType} onChange={handleChange}
                  className={`${styles.input} ${styles.select}`}>
                  <option value="" disabled hidden />
                  {queryTypes.map((qt) => <option key={qt} value={qt}>{qt}</option>)}
                </select>
                <label htmlFor="queryType" className={styles.label}>Query Type *</label>
                <span className={styles.bar} />
              </div>

              <FloatField id="subject" label="Subject" required type="text"
                value={form.subject} onChange={handleChange}
                onFocus={() => handleFocus("subject")} onBlur={() => handleBlur("subject")}
                focused={focused.subject} />
            </div>

            <div className={`${styles.field} ${styles.fieldFull}
              ${focused.message ? styles.fieldFocused : ""}
              ${form.message ? styles.fieldFilled : ""}`}>
              <textarea name="message" id="message" rows="5" required
                value={form.message} onChange={handleChange}
                onFocus={() => handleFocus("message")} onBlur={() => handleBlur("message")}
                className={`${styles.input} ${styles.textarea}`} />
              <label htmlFor="message" className={styles.label}>Your Message *</label>
              <span className={styles.bar} />
            </div>

            <div className={styles.formFooter}>
              <p className={styles.privacy}>
                Handled under our{" "}
                <a href="#" className={styles.link}>Privacy Policy</a>.
                We never share your data with third parties.
              </p>
              <button type="submit" className={styles.submitBtn} disabled={loading}>
                {loading ? <span className={styles.spinner} /> : (
                  <>Send Query <span className={styles.btnArrow}>→</span></>
                )}
              </button>
            </div>
          </form>
        </main>

      </div>
    </div>
  );
}