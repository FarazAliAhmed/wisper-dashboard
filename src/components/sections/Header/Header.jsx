import React, { useState } from "react";
import { Link } from "react-router-dom";

import { Button } from "reactstrap";

import circleImg from "../../../assets/images/home-img/shapes/circle.png";
import squareImg from "../../../assets/images/home-img/shapes/square.png";
import halfCircleImg from "../../../assets/images/home-img/shapes/half-circle.png";
import triangleImg from "../../../assets/images/home-img/shapes/triangle.png";
import waveImg from "../../../assets/images/home-img/shapes/wave.png";
import letters from "../../../assets/images/home-img/shapes/letters.png";
import point1Img from "../../../assets/images/home-img/shapes/points1.png";
import point2Img from "../../../assets/images/home-img/shapes/points2.png";
import logo from "../../../assets/images/home-img/logo.png";
import personImg from "../../../assets/images/home-img/person.png";

const Header = () => {
  const [isOpen, setisOpen] = React.useState(false);
  const handleClick = (props) => {
    setisOpen(!isOpen);
  };

  return (
    <header id="header">
      <div className="overlay overlay-lg">
        <img src={squareImg} className="shape square" alt="" />
        <img src={circleImg} className="shape circle" alt="" />
        <img src={halfCircleImg} className="shape half-circle1" alt="" />
        <img src={halfCircleImg} className="shape half-circle2" alt="" />
        <img src="/img/shapes/x.png" className="shape xshape" alt="" />
        <img src={waveImg} className="shape wave wave1" alt="" />
        <img src={waveImg} className="shape wave wave2" alt="" />
        <img src={triangleImg} className="shape triangle" alt="" />
        <img src={letters} className="letters" alt="" />
        <img src={point1Img} className="points points1" alt="" />
      </div>

      <nav className={isOpen ? "open" : ""}>
        <div className="container">
          <div className="logo">
            <img src={logo} alt="logo" />
          </div>

          <div className="links">
            <ul>
              <li>
                <a href="#" onClick={() => handleClick(false)}>
                  Home
                </a>
              </li>
              <li>
                <a href="#about" onClick={() => handleClick(false)}>
                  About
                </a>
              </li>
              <li>
                <a href="#pricing" onClick={() => handleClick(false)}>
                  Pricing
                </a>
              </li>
              <li>
                <a
                  href="https://wa.me/message/V5ZBZYUNYXSXC1"
                  /*   className="active" */
                  onClick={() => handleClick(false)}
                >
                  Get In Touch
                </a>
              </li>
              {/* <li>
                <Link to="/register">
                  <Button color="info" className="get-started">
                    GET STARTED
                  </Button>
                </Link>
              </li> */}
              <li>
                <a href="/register" color="info" className="active">
                  Log In
                </a>
              </li>
            </ul>
          </div>

          <div className="hamburger-menu" onClick={() => handleClick()}>
            <div className="bar"></div>
          </div>
        </div>
      </nav>

      <div className="header-content">
        <div className="container grid-2">
          <div className="column-1">
            <h1 className="header-title">
              Wisper Reseller <br /> Platform
            </h1>

            <p className="text">
              Enjoy easy integration, cheaper pricing, and fast data allocation
              with wisper reseller API. Join our community of resellers and
              enjoy the best rate on data resale.
            </p>
            <a href="/register" color="info" className="btn">
              GET STARTED
            </a>
          </div>

          <div className="column-2 image">
            <img src={point2Img} className="points points2" alt="" />
            <img src={personImg} className="img-element z-index" alt="" />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
