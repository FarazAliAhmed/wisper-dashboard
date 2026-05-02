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
import { getBalance } from "../../services/dataService";

const Dashboard = () => {
  const { user } = useUser();
  const {
    currentBalance: { volume, unit, cash, mega_wallet },
    setCurrentBalance,
  } = useAppState();
  const [balanceDisplay, setBalanceDisplay] = useState("");
  const [liveCash, setLiveCash] = useState(null);

  // Refetch balance fresh from server when wallet page loads
  useEffect(() => {
    const fetchLiveBalance = async () => {
      try {
        const res = await getBalance();
        if (res && res.data) {
          setLiveCash(res.data.wallet_balance);
        }
      } catch (e) {
        // fallback to cached
      }
    };
    fetchLiveBalance();
  }, []);

  useEffect(() => {
    setBalanceDisplay(displayBalance(volume, unit, cash, mega_wallet, user));
  }, [volume, unit, cash, mega_wallet, user]);

  const displayCash = liveCash !== null ? liveCash : cash;

  return (
    <FullLayout>
      <div>
        <h4>Wallet</h4>
        <Row>
          <Col sm="6" lg="4">
            <FundCards
              bg="bg-light-info text-info"
              title="Wallet"
              subtitle="Current Balance"
              earning={`₦${displayCash}`}
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

export default Dashboard;
