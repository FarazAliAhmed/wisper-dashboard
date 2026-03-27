import React, { useState } from 'react';
import '../assets/css/landing.css';

const Landing = () => {
  const [activeNetwork, setActiveNetwork] = useState('MTN');
  const [showSignupModal, setShowSignupModal] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    businessName: ''
  });
  const [submitted, setSubmitted] = useState(false);

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you can add API call to save the data
    console.log('Form submitted:', formData);
    setSubmitted(true);
  };

  const pricingData = {
    MTN: [
      { data: '500MB', price: '₦450', duration: '1 Month' },
      { data: '1GB', price: '₦700', duration: '1 Month' },
      { data: '2GB', price: '₦1400', duration: '1 Month' },
      { data: '3GB', price: '₦1900', duration: '1 Month' },
      { data: '5GB', price: '₦3000', duration: '1 Month' },
      { data: '10GB', price: '₦4500', duration: '1 Month' },
    ],
    GLO: [
      { data: '200MB', price: '₦100', duration: '1 Month' },
      { data: '500MB', price: '₦225', duration: '1 Month' },
      { data: '1GB', price: '₦270', duration: '3 Days' },
      { data: '2GB', price: '₦900', duration: '1 Month' },
      { data: '3GB', price: '₦1350', duration: '1 Month' },
      { data: '5GB', price: '₦2250', duration: '1 Month' },
      { data: '10GB', price: '₦4500', duration: '1 Month' },
    ],
    '9MOBILE': [
      { data: '500MB', price: '₦100', duration: '1 Month' },
      { data: '1GB', price: '₦200', duration: '1 Month' },
      { data: '1.5GB', price: '₦950', duration: '1 Month' },
      { data: '2GB', price: '₦400', duration: '1 Month' },
      { data: '3GB', price: '₦600', duration: '1 Month' },
      { data: '5GB', price: '₦1000', duration: '1 Month' },
      { data: '10GB', price: '₦2000', duration: '1 Month' },
    ],
    AIRTEL: [
      { data: '100MB', price: '₦100', duration: '1 Month' },
      { data: '300MB', price: '₦300', duration: '1 Month' },
      { data: '500MB', price: '₦500', duration: '1 Month' },
      { data: '1GB', price: '₦800', duration: '7 Days' },
      { data: '2GB', price: '₦1500', duration: '1 Month' },
      { data: '3GB', price: '₦2000', duration: '1 Month' },
      { data: '4GB', price: '₦2500', duration: '1 Month' },
      { data: '10GB', price: '₦4000', duration: '1 Month' },
    ],
  };

  return (
    <div className="landing-page">
      {/* Navbar */}
      <nav className="navbar">
        <div className="nav-container">
          <div className="nav-logo">
            <img src="/xtes-logo.jpg" alt="XTES" />
            <span>XTES</span>
          </div>
          <ul className="nav-links">
            <li><a href="#home">Home</a></li>
            <li><a href="#services">Services</a></li>
            <li><a href="#pricing">Pricing</a></li>
            <li><a href="#contact">Contact</a></li>
          </ul>
          <button className="nav-cta" onClick={() => setShowSignupModal(true)}>Get Started</button>
        </div>
      </nav>
      {/* Hero Section */}
      <section className="hero" id="home">
        <div className="container">
          <div className="hero-content">
            <img src="/xtes-logo.jpg" alt="XTES Logo" className="hero-logo" />
            <h1>Welcome To XTES</h1>
            <p className="hero-subtitle">
              We are a registered telecommunication company that provides voice and data transmission services, 
              including Mobile Data and Airtime (VTU).
            </p>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="services" id="services">
        <div className="container">
          <h2>Our Services</h2>
          <p className="section-subtitle">Awesome Features</p>
          
          <div className="features-grid">
            <div className="feature-card">
              <h3>We Are Reliable</h3>
              <p>
                XTES is a fully optimized platform for reliability and dependability. 
                You get 100% value for any transaction you carry with us.
              </p>
            </div>

            <div className="feature-card">
              <h3>We Are Automated</h3>
              <p>
                We use cutting-edge technology to run our service. Our data delivery and 
                wallet funding is automated. Airtime topup and data purchase are delivered instantly.
              </p>
            </div>

            <div className="feature-card">
              <h3>Customer Support</h3>
              <p>
                Our customer service is just a click away. Don't hesitate to consult us on anything. 
                All transactions are attended to within 5-15 mins.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Become Agent Section */}
      <section className="become-agent">
        <div className="container">
          <h2>Become An Agent</h2>
          <p>
            Join our network of outstanding entrepreneurs partnering with XTES. 
            Bring the 'easy-payments' experience closer to your network and earn a commission 
            for every transaction you perform for your customers.
          </p>
          <button className="cta-button" onClick={() => setShowSignupModal(true)}>Join Now</button>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="pricing" id="pricing">
        <div className="container">
          <h2>Pricing Plans</h2>
          <p className="section-subtitle">Valuable Data Plan And Prices</p>
          
          <div className="network-tabs">
            {Object.keys(pricingData).map((network) => (
              <button
                key={network}
                className={`tab ${activeNetwork === network ? 'active' : ''}`}
                onClick={() => setActiveNetwork(network)}
              >
                {network}
              </button>
            ))}
          </div>

          <div className="pricing-grid">
            {pricingData[activeNetwork].map((plan, index) => (
              <div key={index} className="price-card">
                <div className="data-amount">{plan.data}</div>
                <div className="price">{plan.price}</div>
                <div className="duration">{plan.duration}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="final-cta">
        <div className="container">
          <h2>Get started with XTES today</h2>
          <p>
            We offer instant recharge of Airtime, Data bundle, CableTV (DStv, GOtv & Startimes), 
            Electricity Bill Payment and more.
          </p>
          <button className="cta-button" onClick={() => setShowSignupModal(true)}>Start Now</button>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer" id="contact">
        <div className="container">
          <div className="footer-grid">
            <div className="footer-col">
              <h4>Contact</h4>
              <p>5 Carricks Court, Bosmak Haven Estate,</p>
              <p>Harris Drive, Lekki, Lagos State.</p>
              <p>+2347074728048</p>
              <p>Support@xtes.app</p>
            </div>
          </div>
          <div className="footer-bottom">
            <p>© 2026 All rights reserved. Developed by XTES Limited</p>
          </div>
        </div>
      </footer>

      {/* Signup Modal */}
      {showSignupModal && (
        <div className="modal-overlay" onClick={() => setShowSignupModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            {!submitted ? (
              <>
                <button className="modal-close" onClick={() => setShowSignupModal(false)}>×</button>
                <h2>Get Started with XTES</h2>
                <p className="modal-subtitle">Fill in your details and our sales team will reach out to you</p>
                <form onSubmit={handleSubmit}>
                  <input
                    type="text"
                    name="name"
                    placeholder="Full Name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                  />
                  <input
                    type="email"
                    name="email"
                    placeholder="Email Address"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                  />
                  <input
                    type="tel"
                    name="phone"
                    placeholder="Phone Number"
                    value={formData.phone}
                    onChange={handleInputChange}
                    required
                  />
                  <input
                    type="text"
                    name="businessName"
                    placeholder="Business Name (Optional)"
                    value={formData.businessName}
                    onChange={handleInputChange}
                  />
                  <button type="submit" className="submit-button">Submit</button>
                </form>
              </>
            ) : (
              <div className="success-message">
                <div className="success-icon">✓</div>
                <h2>Thank You!</h2>
                <p>Someone from our sales support will reach out to you shortly.</p>
                <button className="cta-button" onClick={() => {
                  setShowSignupModal(false);
                  setSubmitted(false);
                  setFormData({ name: '', email: '', phone: '', businessName: '' });
                }}>Close</button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Landing;
