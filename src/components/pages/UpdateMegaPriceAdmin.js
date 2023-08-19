import React, { useEffect, useState } from "react";
import { Card, CardBody, CardTitle, Table, CardSubtitle } from "reactstrap";
import { parseDataPlans } from "../../utils";
import { useAppState } from "../../context/appContext";
import "./styles/UpdateMegaPriceAdmin.css";

import tableData, { tableDataWhole } from "../../utils/plansTable";
import { getSingleBusiness } from "../../services/Admin.Services/businessService";
import { adminUrl } from "../../config";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";

const UpdateMegaPrice = ({ userId }) => {
  console.log("businessId", userId);

  return (
    <div className="umpa__container">
      <div className="umpa__content">
        <h2>Edit User Mega Price</h2>
        <form className="umpa__form">
          <div className="umpa__inputs">
            <div className="umpa__form__div">
              <label>MTN SME (per 1gb)</label>
              <input type="number" />
            </div>
            <div className="umpa__form__div">
              <label>MTN GIFTING (per 1gb)</label>
              <input type="number" />
            </div>
            <div className="umpa__form__div">
              <label>AIRTEL (per 1gb)</label>
              <input type="number" />
            </div>

            <div className="umpa__form__div">
              <label>GLO (per 1gb)</label>
              <input type="number" />
            </div>
            <div className="umpa__form__div">
              <label>9MOBILE (per 1gb)</label>
              <input type="number" />
            </div>
          </div>
          <button>Save</button>
        </form>
      </div>
    </div>
  );
};

export default UpdateMegaPrice;
