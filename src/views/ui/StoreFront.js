import React, { useEffect, useState } from "react";
import { Button, Col, Row, UncontrolledAlert } from "reactstrap";

import "../../assets/scss/custom.scss";
import { Link } from "react-router-dom";

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
import visit from "../../assets/dashboard/visit.png";
import revenue from "../../assets/dashboard/revenue.png";
import sold from "../../assets/dashboard/sold.png";
import customers from "../../assets/dashboard/ancestors.png";
import products from "../../assets/dashboard/planning.png";
import dataTransactions from "../../assets/dashboard/money-transfer.png";
import mtn1 from "../../assets/dashboard/mtn 1.svg";
import mob9 from "../../assets/dashboard/mob9.svg";
import airtel from "../../assets/dashboard/airtel.svg";
import tranIcon from "../../assets/dashboard/transa.svg";
import wallIcon from "../../assets/dashboard/walle.svg";
import axios from "axios";
import { IoIosOptions } from "react-icons/io";
import WithdrawCards from "../../components/dashboard/WithdrawCards";
import "../../assets/scss/custom.scss";
import SFTable from "../../components/SFTransactionsTable";
import SFTransactionsTable from "../../components/SFTransactionsTable";
import SFCustomersTable from "../../components/SFCustomersTable";
import {
  checkUsername,
  getSFAnalysis,
  getSFTransactionsTable,
  updateStoreFront,
} from "../../services/dataService";
import toast from "react-hot-toast";
import CopyToClipboard from "react-copy-to-clipboard";
import Slider from "./Slider/Slider";
import Media from "react-media";
// import PaymentButton from "../../components/PaymentButton";

const StoreFront = () => {
  const { user } = useUser();
  const { storeFront } = useAppState();
  const [maintenance, setMaintenance] = useState(storeFront?.storeMaintenance);
  const [customerTable, setCustomerTabele] = useState([]);
  const [transactionTable, setTransactionTable] = useState([]);
  const [sfAnalysis, setSfAnalysis] = useState({});
  useEffect(() => {
    setMaintenance(storeFront?.storeMaintenance);
  }, [storeFront]);

  useEffect(() => {
    const getSFTransactions = async () => {
      await getSFTransactionsTable(storeFront?.business_id).then((res) => {
        console.log(res, "lllo");
        setTransactionTable(res?.data);
      });
    };

    const getSfAnalysis = async () => {
      await getSFAnalysis(storeFront?.business_id).then((res) => {
        console.log(res, "anaa");
        setSfAnalysis(res?.data);
      });
    };

    getSFTransactions();
    getSfAnalysis();
  }, [storeFront.business_id]);
  const handleUpdate = async () => {
    if (storeFront?.storeMaintenance) {
      try {
        setMaintenance(false);
        await updateStoreFront(
          {
            id: user?._id,
            storeMaintenance: false,
          },
          user?.access_token
        );
        toast.success("Exited Maintenance");
      } catch (error) {
        setMaintenance(true);
        toast.error("Error Exiting Maintenance");
      }
    } else {
      try {
        setMaintenance(true);
        await updateStoreFront(
          {
            id: user?._id,
            storeMaintenance: true,
          },
          user?.access_token
        );
        toast.success("Entered Maintenance");
      } catch (error) {
        setMaintenance(false);
        toast.error("Error Entering Maintenance");
      }
    }
  };

  console.log(storeFront, "sf");

  const metricsArray = [
    {
      title: "Profit",
      subtitle: "SF Balance",
      value: `₦${storeFront?.wallet}`,
      icon: wallIcon,
      wallet: true,
    },
    {
      title: "Customers",
      subtitle: "Total No.Customers",
      value: `100`,
      icon: customers,
      wallet: false,
    },
    {
      title: "Products",
      subtitle: "Total No.Products",
      value: `500`,
      icon: products,
      wallet: false,
    },
  ];

  const analyticsArray = [
    {
      title: "Refunds",
      subtitle: "Store Visit",
      value: `100`,
      icon: visit,
      wallet: false,
    },
    {
      title: "Amount",
      subtitle: "Amount Sold",
      value: `₦500`,
      icon: sold,
      wallet: false,
    },
    {
      title: "Revenue",
      subtitle: "Revenue",
      value: `₦500`,
      icon: revenue,
      wallet: false,
    },
    {
      title: "Transactions",
      subtitle: "Transactions",
      value: `30`,
      icon: dataTransactions,
      wallet: false,
    },
  ];
  return (
    <FullLayout>
      <div>
        <Col lg="12">
          <div className="sf__head">
            <h4>Store Front Metrics</h4>
          </div>

          <Media queries={{ small: "(max-width: 768px)" }}>
            {(matches) =>
              matches.small ? (
                <Slider array={metricsArray} />
              ) : (
                <Row>
                  <Col sm="6" lg="4">
                    <WithdrawCards
                      bg="bg-light-info text-info"
                      title="Profit"
                      subtitle="SF Balance"
                      earning={`₦${storeFront?.wallet}`}
                      icon={wallIcon}
                    />
                  </Col>

                  <Col sm="6" lg="4">
                    <TopCards
                      bg="bg-light-warning text-warning"
                      title="Customers"
                      subtitle="Total No.Customers"
                      earning={`100`}
                      icon={customers}
                    />
                  </Col>
                  <Col sm="6" lg="4">
                    <TopCards
                      bg="bg-light-success text-success"
                      title="Products"
                      subtitle="Total No.Products"
                      earning={`₦500`}
                      icon={products}
                    />
                  </Col>
                </Row>
              )
            }
          </Media>
        </Col>

        <Col lg="12">
          <div className="sf__head">
            <h4>Store Front Analytics</h4>
            <div className="sf__filtering">
              <IoIosOptions size={20} />
              <select>
                <option value="allTime">All Time</option>
                <option value="today">Today</option>
                <option value="yesterday">Yesterday</option>
                <option value="thisWeek">This Week</option>
                <option value="thisMonth">This Month</option>
                <option value="last30">Last 30 Days</option>
                <option value="lastMonth">Last Month</option>
                <option value="thisYear">This Year</option>
              </select>
            </div>
          </div>

          <Media queries={{ small: "(max-width: 768px)" }}>
            {(matches) =>
              matches.small ? (
                <Slider array={analyticsArray} />
              ) : (
                <Row>
                  <Col sm="6" lg="4">
                    <TopCards
                      bg="bg-light-warning text-warning"
                      title="Refunds"
                      subtitle="Store Visit"
                      earning={`100`}
                      icon={visit}
                    />
                  </Col>
                  <Col sm="6" lg="4">
                    <TopCards
                      bg="bg-light-success text-success"
                      title="New Project"
                      subtitle="Amount Sold"
                      earning={`₦500`}
                      icon={sold}
                    />
                  </Col>

                  {/* Glo wallet - Hidden for now */}
                  <Col sm="6" lg="4">
                    <TopCards
                      bg="bg-light-info text-info"
                      title="Profit"
                      subtitle="Revenue"
                      earning={`₦500`}
                      icon={revenue}
                    />
                  </Col>

                  {/* 9Mobile wallet */}
                  <Col sm="6" lg="4">
                    <TopCards
                      bg="bg-light-info text-info"
                      title="Profit"
                      subtitle="Transactions"
                      earning={`30`}
                      icon={dataTransactions}
                    />
                  </Col>
                </Row>
              )
            }
          </Media>
        </Col>

        <div className="sf__action__cards">
          {maintenance ? (
            <Button onClick={handleUpdate} color="warning">
              Exit Maintenance
            </Button>
          ) : (
            <Button onClick={handleUpdate} color="success">
              Enter Maintenance
            </Button>
          )}
          <a target="_blank" href={storeFront.storeURL}>
            <Button color="primary">View Store Front</Button>
          </a>
          <CopyToClipboard
            text={storeFront.storeURL}
            onCopy={() => {
              toast.success("Copied!");
            }}
          >
            <Button color="primary">Share Link</Button>
          </CopyToClipboard>{" "}
          <Link to="/editStoreFront">
            <Button color="primary">Edit Store Front</Button>
          </Link>
        </div>

        <Row className="mt-4">
          <SFTransactionsTable
            // transactions={transactionTable}
            transactions={transactionTable}
            showHeader={true}
            showSubHeader={false}
          />
        </Row>
        <Row className="mt-1">
          <SFCustomersTable
            transactions={[]}
            showHeader={true}
            showSubHeader={false}
          />
        </Row>
      </div>
    </FullLayout>
  );
};

export default StoreFront;
