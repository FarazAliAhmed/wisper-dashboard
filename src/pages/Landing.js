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
          <button className="nav-cta" onClick={() => setShowSignupModal(true)}>Contact Us</button>
        </div>
      </nav>
      {/* Hero Section */}
      <section className="hero" id="home">
        <div className="container">
          <div className="hero-content">
            <img src="/xtes-logo.jpg" alt="XTES Logo" className="hero-logo" />
            <h1>Welcome To XTES</h1>
            <p className="hero-subtitle">
              We provide professional Web Development, Web Design, Mobile App Development, 
              Software Development and comprehensive IT Services for businesses of all sizes.
            </p>
            <button className="cta-button" onClick={() => setShowSignupModal(true)}>Contact Us</button>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="services" id="services">
        <div className="container">
          <h2>Our Services</h2>
          <p className="section-subtitle">What We Offer</p>
          
          <div className="features-grid">
            <div className="feature-card">
              <h3>Web Development</h3>
              <p>
                Custom web applications built with modern technologies. 
                We create responsive, scalable, and secure web solutions tailored to your business needs.
              </p>
            </div>

            <div className="feature-card">
              <h3>Mobile App Development</h3>
              <p>
                Native and cross-platform mobile applications for iOS and Android. 
                We deliver high-performance apps with seamless user experiences.
              </p>
            </div>

            <div className="feature-card">
              <h3>Software Development</h3>
              <p>
                Enterprise software solutions and custom applications. 
                We build robust systems that streamline your business operations and drive growth.
              </p>
            </div>

            <div className="feature-card">
              <h3>Web Design</h3>
              <p>
                Beautiful, user-friendly designs that convert visitors into customers. 
                We create engaging interfaces that reflect your brand identity.
              </p>
            </div>

            <div className="feature-card">
              <h3>IT Consulting</h3>
              <p>
                Strategic technology guidance for your business. 
                We help you make informed decisions about your IT infrastructure and digital transformation.
              </p>
            </div>

            <div className="feature-card">
              <h3>Technical Support</h3>
              <p>
                Reliable ongoing support and maintenance for your digital products. 
                Our team ensures your systems run smoothly 24/7.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Become Agent Section */}
      <section className="become-agent">
        <div className="container">
          <h2>Partner With Us</h2>
          <p>
            Join our network of technology partners and resellers. 
            We offer white-label solutions and partnership opportunities for agencies and businesses 
            looking to expand their service offerings.
          </p>
          <button className="cta-button" onClick={() => setShowSignupModal(true)}>Contact Us</button>
        </div>
      </section>

      {/* Pricing Section - Now showing service packages */}
      <section className="pricing" id="pricing">
        <div className="container">
          <h2>Service Packages</h2>
          <p className="section-subtitle">Flexible Solutions For Every Business</p>
          
          <div className="pricing-grid" style={{gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))'}}>
            <div className="price-card">
              <div className="data-amount">Starter</div>
              <div className="price">From ₦150,000</div>
              <div className="duration">Basic Website</div>
              <p style={{fontSize: '14px', marginTop: '10px', color: '#666'}}>
                Perfect for small businesses and startups
              </p>
            </div>
            <div className="price-card">
              <div className="data-amount">Professional</div>
              <div className="price">From ₦500,000</div>
              <div className="duration">Web Application</div>
              <p style={{fontSize: '14px', marginTop: '10px', color: '#666'}}>
                Custom web apps with advanced features
              </p>
            </div>
            <div className="price-card">
              <div className="data-amount">Enterprise</div>
              <div className="price">From ₦1,500,000</div>
              <div className="duration">Full Solution</div>
              <p style={{fontSize: '14px', marginTop: '10px', color: '#666'}}>
                Complete software systems and integrations
              </p>
            </div>
            <div className="price-card">
              <div className="data-amount">Mobile App</div>
              <div className="price">From ₦800,000</div>
              <div className="duration">iOS & Android</div>
              <p style={{fontSize: '14px', marginTop: '10px', color: '#666'}}>
                Native or cross-platform mobile apps
              </p>
            </div>
          </div>
          <p style={{textAlign: 'center', marginTop: '30px', color: '#666'}}>
            All packages include consultation, development, testing, and deployment. 
            Contact us for a custom quote based on your specific requirements.
          </p>
        </div>
      </section>

      {/* CTA Section */}
      <section className="final-cta">
        <div className="container">
          <h2>Ready to Transform Your Business?</h2>
          <p>
            Let's build something amazing together. Contact us today for a free consultation 
            and discover how our technology solutions can help your business grow.
          </p>
          <button className="cta-button" onClick={() => setShowSignupModal(true)}>Contact Us</button>
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
                <h2>Contact Us</h2>
                <p className="modal-subtitle">Tell us about your project and we'll get back to you within 24 hours</p>
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
                    placeholder="Company/Project Name"
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
                <p>We've received your inquiry. Our team will contact you within 24 hours to discuss your project.</p>
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
