import React, { useState } from 'react';
import '../assets/css/landing.css';

const Landing = () => {
  const [activeNetwork, setActiveNetwork] = useState('MTN');

  const pricingData = {
    MTN: [
      { data: '500MB', price: '₦500', duration: '1 Month' },
      { data: '1GB', price: '₦800', duration: '1 Month' },
      { data: '2GB', price: '₦1500', duration: '1 Month' },
      { data: '3GB', price: '₦2500', duration: '1 Month' },
      { data: '5GB', price: '₦3500', duration: '1 Month' },
      { data: '10GB', price: '₦4500', duration: '1 Month' },
    ],
    GLO: [
      { data: '1GB', price: '₦400', duration: '1 Month' },
      { data: '2GB', price: '₦800', duration: '1 Month' },
      { data: '3GB', price: '₦1200', duration: '1 Month' },
      { data: '5GB', price: '₦2000', duration: '1 Month' },
      { data: '10GB', price: '₦4000', duration: '1 Month' },
    ],
    '9MOBILE': [
      { data: '1GB', price: '₦400', duration: '1 Month' },
      { data: '2GB', price: '₦800', duration: '1 Month' },
      { data: '3GB', price: '₦1200', duration: '1 Month' },
      { data: '5GB', price: '₦2000', duration: '1 Month' },
      { data: '10GB', price: '₦4000', duration: '1 Month' },
    ],
    AIRTEL: [
      { data: '1GB', price: '₦400', duration: '1 Month' },
      { data: '2GB', price: '₦800', duration: '1 Month' },
      { data: '3GB', price: '₦1200', duration: '1 Month' },
      { data: '5GB', price: '₦2000', duration: '1 Month' },
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
          <a href="/login" className="nav-cta">Login</a>
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
            <button className="cta-button">Get Started</button>
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
          <button className="cta-button">Join Now</button>
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
          <button className="cta-button">Start Now</button>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer" id="contact">
        <div className="container">
          <div className="footer-grid">
            <div className="footer-col">
              <h4>Contact</h4>
              <p>5 Kasumu Ekemode Street,</p>
              <p>Victoria Island, Lagos State.</p>
              <p>+2347074728048</p>
              <p>Support@xtes.app</p>
            </div>
          </div>
          <div className="footer-bottom">
            <p>© 2026 All rights reserved. Developed by XTES Limited</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Landing;
