import React from "react";
import { planData } from "../../../utils/plansData";

import airtelLogo from "../../../assets/images/home-img/airtel-logo.png";
import mtnLogo from "../../../assets/images/home-img/mtn-logo.png";
import gloLogo from "../../../assets/images/home-img/glo-logo.png";

const airtelAll = [...planData.airtel];
const mtnSMEAll = [...planData.mtnSME];
const mtnCGAll = [...planData.mtnCG];

const Pricing = () => {
  return (
    <section id="pricing">
      <div>
        <div className="container">
          <div className="section-header">
            <h3 className="title" data-title="Wisper Reseller Platform">
              Affordable Data Plan And Pricing
            </h3>
          </div>
        </div>

        <div className="table-box"></div>
        <div className="table-row table-head">
          <div className="table-cell first-cell">
            <div className="logo_table">
              {/* <img src="/img/logo 1.png" alt="VNEt" /> */}
              <img src={mtnLogo} alt="MTN" />
            </div>
          </div>
          <div className="table-cell">
            <p>Price</p>
          </div>
          <div className="table-cell last-cell">
            <p>Data Bundle</p>
          </div>
        </div>

        {mtnSMEAll.map((mtnSME, index) => (
          <div className="table-row" key={index}>
            <div className="table-cell first-cell">
              <p>{mtnSME.planType}</p>
            </div>
            <div className="table-cell">
              <p>&#8358;{mtnSME.price}</p>
            </div>
            <div className="table-cell last-cell">
              <a href="https://youtu.be/99vHH_6F0Ko">{mtnSME.dataBundle}</a>
            </div>
          </div>
        ))}
      </div>

      <div className="table-box">
        <div className="table-row table-head">
          <div className="table-cell first-cell">
            <div className="logo_table">
              {/* <img src="./img/logo 3.png" alt="VNEt" /> */}
              <img src={airtelLogo} alt="Airtel" />
            </div>
          </div>
          <div className="table-cell">
            <p>Price</p>
          </div>
          <div className="table-cell last-cell">
            <p>Data Bundle</p>
          </div>
        </div>

        {airtelAll.map((Airtel, index) => (
          <div className="table-row" key={index}>
            <div className="table-cell first-cell">
              <p>{Airtel.planType}</p>
            </div>
            <div className="table-cell">
              <p>&#8358;{Airtel.price}</p>
            </div>
            <div className="table-cell last-cell">
              <a href="https://youtu.be/99vHH_6F0Ko">{Airtel.dataBundle}</a>
            </div>
          </div>
        ))}
      </div>

      <div className="table-row table-head">
        <div className="table-cell first-cell">
          <div className="logo_table">
            {/* <img src="./img/logo 1.png" alt="VNEt" /> */}
            <img src={mtnLogo} alt="MTN" />
          </div>
        </div>
        <div className="table-cell">
          <p>Price</p>
        </div>
        <div className="table-cell last-cell">
          <p>Data Bundle</p>
        </div>
      </div>

      {mtnCGAll.map((mtnCG, index) => (
        <div className="table-row" key={index}>
          <div className="table-cell first-cell">
            <p>{mtnCG.planType}</p>
          </div>
          <div className="table-cell">
            <p>
              &#8358;
              {mtnCG.price}
            </p>
          </div>
          <div className="table-cell last-cell">
            <a href="#">{mtnCG.dataBundle}</a>
          </div>
        </div>
      ))}
    </section>
  );
};

export default Pricing;
