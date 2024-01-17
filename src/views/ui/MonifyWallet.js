import React, { useEffect, useState } from "react";
import { Col, Row } from "reactstrap";

import "../../assets/scss/custom.scss";
import TopCards from "../../components/dashboard/TopCards";
import FundCards from "../../components/dashboard/FundCards";
import SupportCard from "../../components/dashboard/SupportCard";
import FullLayout from "../../layouts/FullLayout";
import sterling_logo from "../../assets/images/logos/Sterling_Bank_Logo_Straight.png";

import { totalDataSold, displayBalance } from "../../utils";
import TransactionsTable from "../../components/TransactionsTable";
import PaymentButtonFw from "../../components/PaymentButtonFw";

import { useAppState } from "../../context/appContext";
import { useUser } from "../../context/userContext";
import AdminNotifier from "../../components/AdminNotifier";
import glo from "../../assets/dashboard/glo.svg";
import mtn1 from "../../assets/dashboard/mtn 1.svg";
import mob9 from "../../assets/dashboard/mob9.svg";
import airtel from "../../assets/dashboard/airtel.svg";
import tranIcon from "../../assets/dashboard/transa.svg";
import wallIcon from "../../assets/dashboard/walle.svg";
import axios from "axios";
import MonifyHistory from "../../components/MonifyHistory";

// import PaymentButton from "../../components/PaymentButton";

const Dashboard = () => {
  const { user } = useUser();
  const {
    currentBalance: { volume, unit, cash, mega_wallet },
    transactions,
    maintenance,
    singleTrx,
    singleSold,
  } = useAppState();
  const [balanceDisplay, setBalanceDisplay] = useState("");

  useEffect(() => {
    // console.log("sjsjsj");
    // const getRevenue = async () => {
    //   await axios
    //     .get("http://localhost:5000/api/admin/analysis/revenue")
    //     .then((response) => {
    //       console.log("REVENUE", response.data); // Process the received data
    //     })
    //     .catch((error) => {
    //       console.error(error);
    //       // Handle the error
    //     });
    // };

    // getRevenue();

    setBalanceDisplay(displayBalance(volume, unit, cash, mega_wallet, user));
  }, [volume, unit, cash]);

  return (
    <FullLayout>
      <div>
        <h4>Wallet</h4>
        <Row>
          <Col sm="6" lg="4">
            <FundCards
              bg="bg-light-info text-info"
              title="Profit"
              subtitle="Wallet Balance"
              earning={`₦${cash}`}
              icon={wallIcon}
            />
          </Col>
        </Row>

        <Row className="mt-0">
          <MonifyHistory />
        </Row>
      </div>
    </FullLayout>
  );
};

export default Dashboard;
