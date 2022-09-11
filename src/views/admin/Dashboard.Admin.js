import React, { useEffect, useState } from "react";
import { Col, Row } from "reactstrap";
import TopCards from "../../components/dashboard/TopCards";
import AdminLayout from "../../layouts/AdminLayout";
import { totalDataSold, displayBalance } from "../../utils";
import TransactionsTable from "../../components/TransactionsTable";
import { useAppState } from "../../context/appContext";
import { useAdmin } from "../../context/adminContext";
import { useUser } from "../../context/userContext";
import "../../assets/scss/custom.scss";
import AdminControls from "../../components/AdminControls";

// import SupportCard from "../../components/dashboard/SupportCard";
// import PaymentButton from "../../components/PaymentButton";
// import PaymentButtonFw from "../../components/PaymentButtonFw";
// import sterling_logo from "../../assets/images/logos/Sterling_Bank_Logo_Straight.png";

const Dashboard = () => {
  const { user } = useUser();
  const { transaction, business, payment, mainBalance } = useAdmin();
  const {
    currentBalance: {
      volume,
      unit,
      cash,
      mega_wallet,
    },
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
          <Col sm="6" lg="4">
            <TopCards
              bg="bg-light-info text-info"
              title="Profit"
              subtitle="SIMSERVER WALLET"
              earning={`₦ ${mainBalance.simserver}`}
              icon="bi bi-wallet2"
            />
          </Col>
          <Col sm="6" lg="4">
            <TopCards
              bg="bg-light-info text-info"
              title="Profit"
              subtitle="MTN (FASTLINK)"
              earning={`${mainBalance.mtn_balance} MB`}
              icon="bi bi-wallet-fill"
            />
          </Col>
          <Col sm="6" lg="4">
            <TopCards
              bg="bg-light-success text-success"
              title="New Project"
              subtitle="Airtel (FASTLINK)"
              earning={`${mainBalance.airtel_balance} MB`}
              icon="bi bi-wallet2"
            />
          </Col>
          <Col sm="6" lg="4">
            <TopCards
              bg="bg-light-danger text-danger"
              title="Refunds"
              subtitle="Total transactions "
              earning={`${transaction.length}`}
              icon="bi bi-coin"
            />
          </Col>
          <Col sm="6" lg="4">
            <TopCards
              bg="bg-light-warning text-warning"
              title="New Project"
              subtitle="Total data sold"
              earning={`${totalDataSold(transaction)} MB`}
              icon="bi bi-basket3"
            />
          </Col>
          <Col sm="6" lg="4">
            <TopCards
              bg="bg-light-info text-info"
              title="Profit"
              subtitle="Balance (You)"
              earning={balanceDisplay}
              icon="bi bi-wallet"
            />
          </Col>
          {/***Mega Wallets***/}
          {user.type === "mega" && (
            <>
              {/* MTN and Airtel Wallets */}
              <Col sm="6" lg="4">
                <TopCards
                  bg="bg-light-info text-info"
                  title="Profit"
                  subtitle="MTN SME (You)"
                  earning={`${mega_wallet.mtn_sme} ${mega_wallet.unit}`}
                  icon="bi bi-wallet-fill"
                />
              </Col>
              <Col sm="6" lg="4">
                <TopCards
                  bg="bg-light-warning text-warning"
                  title="Refunds"
                  subtitle="MTN Gifting (You)"
                  earning={`${mega_wallet.mtn_gifting} ${mega_wallet.unit}`}
                  icon="bi bi-wallet"
                />
              </Col>
              <Col sm="6" lg="4">
                <TopCards
                  bg="bg-light-success text-success"
                  title="New Project"
                  subtitle="Airtel (You)"
                  earning={`${mega_wallet.airtel} ${mega_wallet.unit}`}
                  icon="bi bi-wallet2"
                />
              </Col>

              {/* Glo wallet - Hidden for now */}
              {/* <Col sm="6" lg="4">
                  <TopCards
                    bg="bg-light-info text-info"
                    title="Profit"
                    subtitle="GLO"
                    earning={balanceDisplay}
                    icon="bi bi-wallet"
                  />
                </Col> */}
            </>
          )}
        </Row>
        <Row>
          <AdminControls />
        </Row>
        <Row className="mt-4">
          <TransactionsTable
            transactions={transaction.slice(0, 5)}
            showHeader={false}
          />
        </Row>
      </div>
    </AdminLayout>
  );
};

export default Dashboard;
