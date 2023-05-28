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
import glo from '../../assets/dashboard/glo.svg'
import mtn1 from '../../assets/dashboard/mtn 1.svg'
import mob9 from '../../assets/dashboard/mob9.svg'
import airtel from '../../assets/dashboard/airtel.svg'
import tranIcon from '../../assets/dashboard/transa.svg'
import wallIcon from '../../assets/dashboard/walle.svg'
// 
// import SupportCard from "../../components/dashboard/SupportCard";
// import PaymentButton from "../../components/PaymentButton";
// import PaymentButtonFw from "../../components/PaymentButtonFw";
// import sterling_logo from "../../assets/images/logos/Sterling_Bank_Logo_Straight.png";

const Dashboard = () => {
  const { user } = useUser();
  const { transaction, business, payment, mainBalance, allTrx, allSold  } = useAdmin();
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
              subtitle="ABISUBPORTAL WALLET"
              earning={`₦ ${mainBalance.mtn|| 0}`}
              icon={mtn1}
            />
          </Col>
          <Col sm="6" lg="4">
            <TopCards
              bg="bg-light-info text-info"
              title="Profit"
              subtitle="9MOBILE (OGDAMS)"
              earning={`₦ ${mainBalance.mob9 || 0}`}
              icon={mob9}
            />
          </Col>
          {/* <Col sm="6" lg="4">
            <TopCards
              bg="bg-light-success text-success"
              title="New Project"
              subtitle="Airtel (FASTLINK)"
              earning={`${mainBalance.airtel_balance/1000} GB`}
              icon={airtel}
            />
          </Col> */}
          <Col sm="6" lg="4">
            <TopCards
              bg="bg-light-danger text-danger"
              title="Refunds"
              subtitle="Total transactions "
              earning={`${allTrx}`}
              icon={tranIcon}
            />
          </Col>
          <Col sm="6" lg="4">
            <TopCards
              bg="bg-light-warning text-warning"
              title="New Project"
              subtitle="Total data sold"
              earning={`${allSold/1000} GB`}
              icon={wallIcon}
            />
          </Col>
          <Col sm="6" lg="4">
            <TopCards
              bg="bg-light-info text-info"
              title="Profit"
              subtitle="Balance (You)"
              earning={`${balanceDisplay}`}
              icon={tranIcon}
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
                  earning={`${mega_wallet.mtn_sme/1000} GB`}
                  // earning={`${mega_wallet.mtn_sme} ${mega_wallet.unit}`}
                  icon={mtn1}
                />
              </Col>
              <Col sm="6" lg="4">
                <TopCards
                  bg="bg-light-warning text-warning"
                  title="Refunds"
                  subtitle="MTN Gifting (You)"
                  earning={`${mega_wallet.mtn_gifting/1000} GB`}
                  icon={mtn1}
                />
              </Col>
              <Col sm="6" lg="4">
                <TopCards
                  bg="bg-light-success text-success"
                  title="New Project"
                  subtitle="Airtel (You)"
                  earning={`${mega_wallet.airtel/1000} GB`}
                  icon={airtel}
                />
              </Col>

              {/* Glo wallet - Hidden for now */}
              <Col sm="6" lg="4">
                  <TopCards
                    bg="bg-light-info text-info"
                    title="Profit"
                    subtitle="GLO"
                    earning={`${mega_wallet.glo/1000} GB`}
                    icon={glo}
                  />
                </Col>
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
