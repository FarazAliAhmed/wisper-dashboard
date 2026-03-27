import React from 'react';
import '../assets/css/landing.css';

const Landing = () => {
  return (
    <div className="landing-page">
      {/* Hero Section */}
      <section className="hero">
        <div className="container">
          <img src="/xtes-logo.jpg" alt="XTES Logo" className="hero-logo" />
          <h1>Welcome To XTES</h1>
          <p className="hero-subtitle">
            We are a registered telecommunication company that provides voice and data transmission services, 
            including Mobile Data and Airtime (VTU).
          </p>
          <button className="cta-button">Get Started</button>
        </div>
      </section>

      {/* Services Section */}
      <section className="services">
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
      <section className="pricing">
        <div className="container">
          <h2>Pricing Plans</h2>
          <p className="section-subtitle">Valuable Data Plan And Prices</p>
          
          <div className="network-tabs">
            <button className="tab active">MTN</button>
            <button className="tab">GLO</button>
            <button className="tab">9MOBILE</button>
            <button className="tab">AIRTEL</button>
          </div>

          <div className="pricing-grid">
            <div className="price-card">
              <div className="data-amount">2GB</div>
              <div className="price">₦1400</div>
              <div className="duration">1 Month</div>
            </div>
            <div className="price-card">
              <div className="data-amount">3GB</div>
              <div className="price">₦1900</div>
              <div className="duration">1 Month</div>
            </div>
            <div className="price-card">
              <div className="data-amount">5GB</div>
              <div className="price">₦3000</div>
              <div className="duration">1 Month</div>
            </div>
            <div className="price-card">
              <div className="data-amount">10GB</div>
              <div className="price">₦4500</div>
              <div className="duration">1 Month</div>
            </div>
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
      <footer className="footer">
        <div className="container">
          <div className="footer-grid">
            <div className="footer-col">
              <h4>XTES</h4>
              <ul>
                <li>About us</li>
                <li>Contact us</li>
                <li>FAQs</li>
              </ul>
            </div>
            <div className="footer-col">
              <h4>Legal</h4>
              <ul>
                <li>Terms and Condition</li>
                <li>Privacy Policy</li>
              </ul>
            </div>
            <div className="footer-col">
              <h4>Contact</h4>
              <p>xtes@example.com</p>
            </div>
          </div>
          <div className="footer-bottom">
            <p>© 2026 All rights reserved. Developed by A.D.E Developers</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Landing;
