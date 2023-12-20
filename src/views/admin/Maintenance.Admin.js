import React, { useEffect, useState } from "react";
import { Col, Row } from "reactstrap";
import TopCards from "../../components/dashboard/TopCards";
import AdminLayout from "../../layouts/AdminLayout";
import { totalDataSold, displayBalance } from "../../utils";
import TransactionsTable from "../../components/TransactionsTable";
import { useAppState } from "../../context/appContext";
import { useAdmin } from "../../context/adminContext";
import { useUser } from "../../context/userContext";
// import "../../assets/scss/custom.scss";
import AdminControls from "../../components/AdminControls";
import glo from "../../assets/dashboard/glo.svg";
import mtn1 from "../../assets/dashboard/mtn 1.svg";
import mob9 from "../../assets/dashboard/mob9.svg";
import airtel from "../../assets/dashboard/airtel.svg";
import tranIcon from "../../assets/dashboard/transa.svg";
import wallIcon from "../../assets/dashboard/walle.svg";
import AdminMegaControls from "../../components/AdminMegaControls";
import AdminAirtimeControls from "../../components/AdminAirtimeControls";
//
// import SupportCard from "../../components/dashboard/SupportCard";
// import PaymentButton from "../../components/PaymentButton";
// import PaymentButtonFw from "../../components/PaymentButtonFw";
// import sterling_logo from "../../assets/images/logos/Sterling_Bank_Logo_Straight.png";

const Maintenance = () => {
  const { user } = useUser();
  const { transaction, business, payment, mainBalance, allTrx, allSold } =
    useAdmin();
  const {
    currentBalance: { volume, unit, cash, mega_wallet },
  } = useAppState();
  const [balanceDisplay, setBalanceDisplay] = useState("");

  useEffect(() => {
    setBalanceDisplay(displayBalance(volume, unit, cash, mega_wallet, user));
  }, [volume, unit, cash]);

  return (
    <AdminLayout>
      <div>
        {/***Top Cards***/}

        <Row>
          <AdminControls />
        </Row>
        <Row>
          <AdminMegaControls />
        </Row>
        <Row>
          <AdminAirtimeControls />
        </Row>
      </div>
    </AdminLayout>
  );
};

export default Maintenance;
