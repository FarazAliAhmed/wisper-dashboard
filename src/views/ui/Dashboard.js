import React, { useEffect, useState } from "react";
import { Col, Row } from "reactstrap";

import "../../assets/scss/custom.scss";
import TopCards from "../../components/dashboard/TopCards";
import SupportCard from "../../components/dashboard/SupportCard";
import FullLayout from "../../layouts/FullLayout";
import sterling_logo from "../../assets/images/logos/Sterling_Bank_Logo_Straight.png";

import { totalDataSold, displayBalance } from "../../utils";
import TransactionsTable from "../../components/TransactionsTable";
import PaymentButtonFw from "../../components/PaymentButtonFw";

import { useAppState } from "../../context/appContext";
import { useUser } from "../../context/userContext";
import AdminNotifier from "../../components/AdminNotifier";
import glo from '../../assets/dashboard/glo.svg'
import mtn1 from '../../assets/dashboard/mtn 1.svg'
import mob9 from '../../assets/dashboard/mob9.svg'
import airtel from '../../assets/dashboard/airtel.svg'
import tranIcon from '../../assets/dashboard/transa.svg'
import wallIcon from '../../assets/dashboard/walle.svg'

// import PaymentButton from "../../components/PaymentButton";

const Dashboard = () => {
  const { user } = useUser();
  const {
    currentBalance: { volume, unit, cash, mega_wallet },
    transactions,
    maintenance,
    singleTrx, 
    singleSold
  } = useAppState();
  const [balanceDisplay, setBalanceDisplay] = useState("");

  useEffect(() => {
    setBalanceDisplay(displayBalance(volume, unit, cash, mega_wallet, user));
  }, [volume, unit, cash]);

  return (
    <FullLayout>
      <div>
        {/***Top Cards***/}
        {maintenance.notice && 
          <Row>
            <AdminNotifier maintenance={maintenance}/>
          </Row>
        }
        <Row>
        {user.type != "mega" && (
          <Col sm="6" lg="4">
            <TopCards
              bg="bg-light-info text-info"
              title="Profit"
              subtitle="Balance"
              earning={balanceDisplay}
              icon={wallIcon}
            />
          </Col>
        )
         }
          <Col sm="6" lg="4">
            <TopCards
              bg="bg-light-danger text-danger"
              title="Refunds"
              subtitle="Total transactions "
              earning={`${singleTrx}`}
              icon={tranIcon}
            />
          </Col>
          <Col sm="6" lg="4">
            <TopCards
              bg="bg-light-warning text-warning"
              title="New Project"
              subtitle="Total data sold"
              earning={`${singleSold/1000} GB`}
              icon={wallIcon}
            />
          </Col>

          {/***Mega Wallets***/}
          {user.type === "mega" && (
            <>
              {/* MTN and Airtel Wallets */}
              {/* <Col sm="6" lg="4">
                <TopCards
                  bg="bg-light-info text-info"
                  title="Profit"
                  subtitle="MTN SME"
                  earning={`${mega_wallet.mtn_sme} ${mega_wallet.unit}`}
                  icon="bi bi-wallet-fill"
                />
              </Col> */}
              <Col sm="6" lg="4">
                <TopCards
                  bg="bg-light-warning text-warning"
                  title="Refunds"
                  subtitle="MTN"
                  earning={`${mega_wallet.mtn_gifting/1000} GB`}
                  icon={mtn1}
                />
              </Col>
              <Col sm="6" lg="4">
                <TopCards
                  bg="bg-light-success text-success"
                  title="New Project"
                  subtitle="Airtel"
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

               {/* 9Mobile wallet */}
               <Col sm="6" lg="4">
                  <TopCards
                    bg="bg-light-info text-info"
                    title="Profit"
                    subtitle="9 Mobile"
                    earning={`${mega_wallet["9mobile"]/1000} GB`}
                    icon={mob9}
                  />
                </Col>
            </>
          )}
        </Row>
       
        {user ? (
          user?.type === "mega" ? (
            // <Row className="bank-details">
            //   {/* <Col>
            //     <div>
            //       <img className="sterling__logo" src={sterling_logo} alt="" />
            //     </div>
            //     <div>
            //       <b>Bank:</b> &nbsp; Sterling Bank
            //     </div>
            //     <div>
            //       <b>Account Number:</b>&nbsp; 0014602073
            //     </div>
            //     <div>
            //       <b>Account Name:</b> &nbsp; Alma Management Limited
            //     </div>
            //   </Col>
            //   <p className="text-warning">
            //     Send payment receipt to admin for validation, after which
            //     balance would be credited.
            //   </p> */}
            // </Row>
            <div>
              </div>
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
            transactions={transactions.slice(0, 5)}
            showHeader={false}
          />
        </Row>
        <Row>
          <Col lg="12">
            <SupportCard />
          </Col>
        </Row>
      </div>
    </FullLayout>
  );
};

export default Dashboard;
