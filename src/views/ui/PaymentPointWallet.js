import React, { useEffect, useState } from "react";
import { Col, Row } from "reactstrap";
import "../../assets/scss/custom.scss";
import FundCards from "../../components/dashboard/FundCards";
import FullLayout from "../../layouts/FullLayout";
import { displayBalance } from "../../utils";
import { useAppState } from "../../context/appContext";
import { useUser } from "../../context/userContext";
import wallIcon from "../../assets/dashboard/walle.svg";
import PaymentPointHistory from "../../components/PaymentPointHistory";

const PaymentPointWallet = () => {
  const { user } = useUser();
  const {
    currentBalance: { volume, unit, cash, mega_wallet },
  } = useAppState();
  const [balanceDisplay, setBalanceDisplay] = useState("");

  useEffect(() => {
    setBalanceDisplay(displayBalance(volume, unit, cash, mega_wallet, user));
  }, [volume, unit, cash, mega_wallet, user]);

  return (
    <FullLayout>
      <div>
        <h4>PaymentPoint Wallet</h4>
        <Row>
          <Col sm="6" lg="4">
            <FundCards
              bg="bg-light-info text-info"
              title="Wallet"
              subtitle="Current Balance"
              earning={`₦${cash}`}
              icon={wallIcon}
            />
          </Col>
        </Row>

        <Row className="mt-4">
          <Col>
            <PaymentPointHistory />
          </Col>
        </Row>
      </div>
    </FullLayout>
  );
};

export default PaymentPointWallet;
