import React from "react";
import logo from "../../../assets/images/home-img/logo.png";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div>
          <div className="logo_footer">
            <img src={logo} alt="" />
          </div>
        </div>

        <div className="grid-4">
          <div className="grid-4-col footer-about">
            <h3 className="title-sm">Wisper Reseller</h3>
            <p className="text">
              Enjoy easy integration, cheaper pricing, and fast data allocation
              with wisper reseller API. Join our community of resellers and
              enjoy the best rate on data resale.
            </p>
          </div>

          <div className="grid-4-col footer-links">
            <h3 className="title-sm">Useful Links</h3>
            <ul>
              <li>
                <a href="http://wwww.wisper.ng/">Home</a>
              </li>
              <li>
                <a href="https://wa.me/message/V5ZBZYUNYXSXC1">About us</a>
              </li>
              <li>
                <a href="https://wa.me/message/V5ZBZYUNYXSXC1">
                  Chat Support on WhatsApp
                </a>
              </li>
              {/*  <li>
                <a href="https://chat.whatsapp.com/GKt0Eb5tvtK1mATZQKovIR">
                  Join Reseller WhatsApp Group
                </a>
              </li> */}
              <li>
                <a href="https://documenter.getpostman.com/view/17453703/UVksMZmU">
                  API Documentation
                </a>
              </li>
            </ul>
          </div>

          <div className="grid-4-col footer-links">
            <h3 className="title-sm">Other Products</h3>
            <ul>
              <li>
                <a href="https://wisper.ng/">Wisper ISP</a>
              </li>
              <li>
                <a href="https://mobile.wisper.ng/">Wisper Mobile</a>
              </li>
            </ul>
          </div>

          <div className="grid-4-col footer-newstletter">
            <h3 className="title-sm">Address</h3>
            <p className="text">
              Warri Address: 301, Warri Sapele road, Delta State, Nigeria.
            </p>
            {/*             <p className="text">
              Lagos Address: Plot 1193, Kasumu Ekemode, Victoria Island, 101241,
              Lagos.
            </p> */}
            <p className="text">
              Email Address:{" "}
              <a href="mailto: contact@wisper.ng">contact@wisper.ng</a> and{" "}
              <a href="mailto: support@wisper.ng">support@wisper.ng</a>
            </p>
            <p className="text">
              Tel: <a href="tel:+2348039255522">+2348039255522</a> ,{" "}
              <a href="tel:+2349057790907">+2349057790907</a> .
            </p>
          </div>
        </div>

        <div className="bottom-footer">
          <div className="copyright">
            <p className="text">
              <span>Wisper</span> &copy; 2022 All rights reserved
            </p>
          </div>

          <div className="followme-wrap">
            <div className="followme">
              {/*  <h3>Social Links</h3> */}
              <span className="footer-line"></span>
              <div className="social-media">
                <a href="https://web.facebook.com/wispercom">
                  <i className="fab fa-facebook-f"></i>
                </a>
                <a href="https://twitter.com/wisper_ng">
                  <i className="fab fa-twitter"></i>
                </a>
                <a href="https://www.instagram.com/wisperng/">
                  <i className="fab fa-instagram"></i>
                </a>
                <a href="https://www.linkedin.com/company/wisperng/">
                  <i className="fab fa-linkedin-in"></i>
                </a>
              </div>
            </div>

            {/*  <div className="back-btn-wrap">
              <a href="#" className="back-btn">
                <i className="fas fa-chevron-up"></i>
              </a>
            </div> */}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
