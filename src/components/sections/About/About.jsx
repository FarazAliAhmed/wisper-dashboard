import React from "react";

import aboutImg from "../../../assets/images/home-img/about.png";
import point4Img from "../../../assets/images/home-img/shapes/points4.png";

const About = () => {
  return (
    <section className="about section" id="about">
      <div className="container">
        <div className="section-header">
          <h3 className="title" data-title="About">
            Reseller Platform
          </h3>
        </div>

        <div className="section-body grid-2">
          <div className="column-1">
            <h3 className="title-sm">Wisper Reseller Platform</h3>
            <div className="text">
              <p className="text">
                Wisper Reseller Platform provides data resellers with affordable
                data plans and an automated and manual system of allocating
                data. We are:
              </p>
              <ul className="text">
                <li>We're Fast</li>
                <li>Automated</li>
                <li>100% Secured</li>
                <li>Always Online</li>
                <li>We're Fast</li>
                <li>Reliable</li>
              </ul>
            </div>
          </div>

          <div className="column-2 image">
            <img src={point4Img} className="points" alt="points" />
            <img src={aboutImg} className="z-index" alt="" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
