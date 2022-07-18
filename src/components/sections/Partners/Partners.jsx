import React from "react";
import OwlCarousel from "react-owl-carousel";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";

import airtelLogo from "../../../assets/images/home-img/airtel-logo.png";
import mtnLogo from "../../../assets/images/home-img/mtn-logo.png";
import gloLogo from "../../../assets/images/home-img/glo-logo.png";
import amcgLogo from "../../../assets/images/home-img/amcgLogo.png";

const Partners = () => {
  return (
    <section>
      <div className="container">
        <div className="section-header">
          <h3 className="title" data-title="Our">
            Partners
          </h3>
        </div>
        <OwlCarousel
          className="owl-theme brand-carousel section-padding"
          loop
          nav
          autoplay={true}
          margin={8}
          responsive={{
            0: {
              items: 1,
            },
            600: {
              items: 3,
            },
            1000: {
              items: 5,
            },
          }}
        >
          <div className="single-logo">
            <img src={airtelLogo} alt="airtel Logo" />
          </div>
          <div className="single-logo">
            <img src={gloLogo} alt="glo logo" />
          </div>
          <div className="single-logo">
            <img src={mtnLogo} alt="mtn Logo" />
          </div>
        </OwlCarousel>
        {/* <div className="brand-carousel section-padding owl-carousel">
          
        </div> */}
      </div>
    </section>
  );
};

export default Partners;
