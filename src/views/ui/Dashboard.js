import React, { useEffect, useState } from "react";
import { Col, Row } from "reactstrap";
import TopCards from "../../components/dashboard/TopCards";
import SupportCard from "../../components/dashboard/SupportCard";
import FullLayout from "../../layouts/FullLayout";
import { useAppState } from "../../context/appContext";
import { totalDataSold, displayBalance } from "../../utils";
import TransactionsTable from "../../components/TransactionsTable";
// import PaymentButton from "../../components/PaymentButton";
import PaymentButtonFw from "../../components/PaymentButtonFw";
import { useUser } from "../../context/userContext";

import "../../assets/scss/custom.scss";
import sterling_logo from "../../assets/images/logos/Sterling_Bank_Logo_Straight.png";

const Dashboard = () => {
  const { user } = useUser();
  const {
    currentBalance: { volume, unit, cash },
    transactions,
  } = useAppState();
  const [balanceDisplay, setBalanceDisplay] = useState("");

  useEffect(() => {
    setBalanceDisplay(displayBalance(volume, unit, cash, user));
  }, [volume, unit, cash]);

  return (
    <FullLayout>
      <div>
        {/***Top Cards***/}
        <Row>
          <Col sm="6" lg="4">
            <TopCards
              bg="bg-light-info text-info"
              title="Profit"
              subtitle="Balance"
              earning={balanceDisplay}
              icon="bi bi-wallet"
            />
          </Col>
          <Col sm="6" lg="4">
            <TopCards
              bg="bg-light-danger text-danger"
              title="Refunds"
              subtitle="Total transactions "
              earning={`${transactions.length}`}
              icon="bi bi-coin"
            />
          </Col>
          <Col sm="6" lg="4">
            <TopCards
              bg="bg-light-warning text-warning"
              title="New Project"
              subtitle="Total data sold"
              earning={totalDataSold(transactions)}
              icon="bi bi-basket3"
            />
          </Col>
        </Row>
        <Row>
          <Col lg="12">
            <SupportCard />
          </Col>
        </Row>
        {user ? (
          user?.type === "mega" ? (
            <Row className="bank-details">
              <Col>
                <div>
                  <img className="sterling__logo" src={sterling_logo} />
                </div>
                <div>
                  <b>Bank:</b> &nbsp; Sterling Bank
                </div>
                <div>
                  <b>Account Number:</b>&nbsp; 0014602073
                </div>
                <div>
                  <b>Account Name:</b> &nbsp; Alma Management Limited
                </div>
              </Col>
              <p className="text-warning">
                Send payment receipt to admin for validation, after which
                balance would be credited.
              </p>
            </Row>
          ) : (
            <Row>
              <Col>
                <PaymentButtonFw />
              </Col>
            </Row>
          )
        ) : (
          ""
        )}

        <Row className="mt-4">
          <TransactionsTable
            transactions={transactions.slice(-5)}
            showHeader={false}
          />
        </Row>
      </div>
    </FullLayout>
  );
};

export default Dashboard;
