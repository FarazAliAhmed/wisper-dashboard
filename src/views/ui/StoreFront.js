import React, { useEffect, useState } from "react";
import {
  Button,
  Col,
  Form,
  FormFeedback,
  FormGroup,
  Input,
  InputGroup,
  InputGroupText,
  Label,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  Row,
  UncontrolledAlert,
} from "reactstrap";

import "../../assets/scss/custom.scss";
import { Link } from "react-router-dom";
import logo from "../../assets/images/logos/wisperN.png";
import { FiShare } from "react-icons/fi";

import TopCards from "../../components/dashboard/TopCards";
import FundCards from "../../components/dashboard/FundCards";
import SupportCard from "../../components/dashboard/SupportCard";
import FullLayout from "../../layouts/FullLayout";
import sterling_logo from "../../assets/images/logos/Sterling_Bank_Logo_Straight.png";

import { totalDataSold, displayBalance } from "../../utils";
import TransactionsTable from "../../components/TransactionsTable";
import PaymentButtonFw from "../../components/PaymentButtonFw";
import { BeatLoader } from "react-spinners";

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
import { BsChevronRight } from "react-icons/bs";

import { IoIosOptions } from "react-icons/io";
import WithdrawCards from "../../components/dashboard/WithdrawCards";
import "../../assets/scss/custom.scss";
import SFTable from "../../components/SFTransactionsTable";
import SFTransactionsTable from "../../components/SFTransactionsTable";
import SFCustomersTable from "../../components/SFCustomersTable";
import {
  checkUsername,
  getAllPlansUser,
  getSFAnalysis,
  getSFCustomersTable,
  getSFTransactionsTable,
  getSFWithdrawTable,
  getSetUp,
  updateStoreFront,
} from "../../services/dataService";
import toast from "react-hot-toast";
import CopyToClipboard from "react-copy-to-clipboard";
import Slider from "./Slider/Slider";
import Media from "react-media";
import VerificationInput from "react-verification-input";
import SFWithdrawTable from "../../components/SFWithdrawTable";

// import PaymentButton from "../../components/PaymentButton";

const StoreFront = () => {
  const { user } = useUser();
  const { storeFront } = useAppState();
  const [prices, setPrices] = useState([]);
  const [maintenance, setMaintenance] = useState(storeFront?.storeMaintenance);
  const [customerTable, setCustomerTable] = useState([]);
  const [transactionTable, setTransactionTable] = useState([]);
  const [withdrawTable, setWithdrawTable] = useState([]);
  const [sfAnalysis, setSfAnalysis] = useState({});
  const [filter, setFilter] = useState("All Time");
  const [loading, setLoading] = useState(false);
  const [confirm, setConfirm] = useState(false);
  const [notice, setNotice] = useState(false);
  const [noticeState, setNoticeState] = useState(false);
  const [copyState, setCopyState] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [withdraw, setWithdraw] = useState(false);
  const [pagination, setPagination] = useState(50);
  const [costError, setCostError] = useState(null);

  const [navState, setNavState] = useState(0);

  useEffect(() => {
    setMaintenance(storeFront?.storeMaintenance);
  }, [storeFront]);

  const handleShareClick = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: "Wisper Store",
          text: `Check out this Wisper Store`,
          url: storeFront.storeURL, // Replace with your desired URL
        });
      } catch (error) {
        console.error("Share failed:", error);
      }
    } else {
      // Fallback for browsers that do not support the Web Share API
      alert("Native sharing is not supported on this browser.");
    }
  };
  const style = {
    background: "primary",
    borderRadius: 3,
    border: 0,
    width: "100%",
    boxShadow: "0 3px 5px 2px rgba(255, 105, 135, .3)",
    color: "black",
    padding: "1rem",
    cursor: "pointer",
  };

  useEffect(() => {
    const getSFTransactions = async () => {
      await getSFTransactionsTable(storeFront?.business_id, pagination).then(
        (res) => {
          setTransactionTable(res?.data);
        }
      );
    };

    const getSFCustomers = async () => {
      await getSFCustomersTable(storeFront?.business_id, pagination).then(
        (res) => {
          setCustomerTable(res?.data);
        }
      );
    };

    const getSFWithdraw = async () => {
      await getSFWithdrawTable(storeFront?.business_id, pagination).then(
        (res) => {
          setWithdrawTable(res?.data);
        }
      );
    };

    getSFTransactions();
    getSFCustomers();
    getSFWithdraw();
  }, [storeFront.business_id]);

  const fetchWithPaginate = async () => {
    if (navState == 0) {
      if (!loading) {
        setLoading(true);
        await getSFTransactionsTable(storeFront?.business_id, pagination).then(
          (res) => {
            setTransactionTable(res?.data);
          }
        );
        setLoading(false);
      }
    } else if (navState == 1) {
      setLoading(true);
      await getSFCustomersTable(storeFront?.business_id, pagination).then(
        (res) => {
          setCustomerTable(res?.data);
        }
      );
      setLoading(false);
    } else if (navState == 2) {
      setLoading(true);
      await getSFWithdrawTable(storeFront?.business_id, pagination).then(
        (res) => {
          setWithdrawTable(res?.data);
        }
      );
      setLoading(false);
    }
  };

  const clearPagination = async () => {
    setPagination(0);
    if (navState == 0) {
      if (!loading) {
        setLoading(true);
        await getSFTransactionsTable(storeFront?.business_id, pagination).then(
          (res) => {
            setTransactionTable(res?.data);
          }
        );
        setLoading(false);
      }
    } else if (navState == 1) {
      setLoading(true);
      await getSFCustomersTable(storeFront?.business_id, pagination).then(
        (res) => {
          setCustomerTable(res?.data);
        }
      );
      setLoading(false);
    }
  };
  useEffect(() => {
    const fetchAllPlansUser = async () => {
      await getAllPlansUser(user._id).then((res) => {
        setPrices(res?.data.filter((plan) => plan.selling_price));
      });
    };

    fetchAllPlansUser();
  }, []);

  useEffect(() => {
    const fetchNotice = async () => {
      await getSetUp(user._id).then((res) => {
        setNoticeState(res?.data);
        console.log(res?.data, "notice");

        if (res?.data) {
          setNotice(false);
        } else {
          setNotice(true);
        }
      });
    };

    fetchNotice();
  }, []);

  useEffect(() => {
    const getSfAnalysis = async () => {
      setLoading(true);
      await getSFAnalysis(storeFront?.business_id).then((res) => {
        setSfAnalysis(res?.data[filter]);
        setLoading(false);
      });
    };

    getSfAnalysis();
  }, [filter]);
  const handleUpdate = async () => {
    if (storeFront?.storeMaintenance) {
      try {
        setConfirm(false);

        setMaintenance(false);
        await updateStoreFront(
          {
            id: user?._id,
            storeMaintenance: false,
          },
          user?.access_token
        );
        toast.success("Exited Maintenance");
        window.location.reload();
      } catch (error) {
        setConfirm(false);

        setMaintenance(true);

        toast.error("Error Exiting Maintenance");
      }
    } else {
      try {
        setConfirm(false);

        setMaintenance(true);
        await updateStoreFront(
          {
            id: user?._id,
            storeMaintenance: true,
          },
          user?.access_token
        );

        toast.success("Entered Maintenance");
        window.location.reload();
      } catch (error) {
        setConfirm(false);

        setMaintenance(false);

        toast.error("Error Entering Maintenance");
      }
    }
  };

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
      value: storeFront?.customer,
      icon: customers,
      wallet: false,
    },
    {
      title: "Products",
      subtitle: "Total No.Products",
      value: prices?.length,
      icon: products,
      wallet: false,
    },
  ];

  const analyticsArray = [
    {
      title: "Refunds",
      subtitle: "Store Visit",
      value: loading ? "loading" : sfAnalysis?.TotalStoreVisits ?? 0,
      icon: visit,
      wallet: false,
    },
    {
      title: "Amount",
      subtitle: "Amount Sold",
      value: loading
        ? "loading"
        : `₦${
            sfAnalysis?.TotalAmountSold ? sfAnalysis.TotalAmountSold ?? 0 : 0
          }`,
      icon: sold,
      wallet: false,
    },

    {
      title: "Revenue",
      subtitle: "Revenue",
      value: loading ? "loading" : `₦${sfAnalysis?.TotalRevenue ?? 0}`,
      icon: revenue,
      wallet: false,
    },
    {
      title: "Transactions",
      subtitle: "Transactions",
      value: loading ? "loading" : `${sfAnalysis?.TotalTransactions ?? 0}`,
      icon: dataTransactions,
      wallet: false,
    },
  ];

  const navItems = ["Transactions", "Customers", "Withdrawal"];

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
                      earning={
                        storeFront?.wallet
                          ? `₦${storeFront?.wallet}`
                          : "fetching"
                      }
                      icon={wallIcon}
                    />
                  </Col>

                  <Col sm="6" lg="4">
                    <TopCards
                      bg="bg-light-warning text-warning"
                      title="Customers"
                      subtitle="Total No. Customers"
                      earning={storeFront.customer}
                      icon={customers}
                    />
                  </Col>
                  <Col sm="6" lg="4">
                    <TopCards
                      bg="bg-light-success text-success"
                      title="Products"
                      subtitle="Total No. Products"
                      earning={prices?.length}
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
              <select
                value={filter}
                onChange={(e) => {
                  setFilter(e.target.value);
                }}
              >
                <option selected value="All Time">
                  All Time
                </option>
                <option value="Today">Today</option>
                <option value="Yesterday">Yesterday</option>
                <option value="This Week">This Week</option>
                <option value="This Month">This Month</option>
                <option value="Last 30 Days">Last 30 Days</option>
                <option value="Last Month">Last Month</option>
                <option value="This Year">This Year</option>
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
                      earning={
                        loading ? "loading" : sfAnalysis?.TotalStoreVisits ?? 0
                      }
                      icon={visit}
                    />
                  </Col>
                  <Col sm="6" lg="4">
                    <TopCards
                      bg="bg-light-success text-success"
                      title="New Project"
                      subtitle="Amount Sold"
                      earning={
                        loading
                          ? "loading"
                          : `₦${
                              sfAnalysis?.TotalAmountSold
                                ? sfAnalysis.TotalAmountSold ?? 0
                                : 0
                            }`
                      }
                      icon={sold}
                    />
                  </Col>

                  {/* Glo wallet - Hidden for now */}
                  <Col sm="6" lg="4">
                    <TopCards
                      bg="bg-light-info text-info"
                      title="Profit"
                      subtitle="Revenue"
                      earning={
                        loading
                          ? "loading"
                          : `₦${sfAnalysis?.TotalRevenue ?? 0}`
                      }
                      icon={revenue}
                    />
                  </Col>

                  {/* 9Mobile wallet */}
                  <Col sm="6" lg="4">
                    <TopCards
                      bg="bg-light-info text-info"
                      title="Profit"
                      subtitle="Transactions"
                      earning={
                        loading
                          ? "loading"
                          : `${sfAnalysis?.TotalTransactions ?? 0}`
                      }
                      icon={dataTransactions}
                    />
                  </Col>
                </Row>
              )
            }
          </Media>
        </Col>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <h3>Actions</h3>
          <div className="sf__customer__cards">
            {maintenance ? (
              <Button
                onClick={() => {
                  if (noticeState) {
                    setConfirm(true);
                  } else {
                    setNotice(true);
                  }
                }}
                color="warning"
              >
                Exit Maintenance
              </Button>
            ) : (
              <Button
                onClick={() => {
                  if (noticeState) {
                    setConfirm(true);
                  } else {
                    setNotice(true);
                  }
                }}
                color="success"
              >
                Enter Maintenance
              </Button>
            )}
            <a
              onClick={(e) => {
                if (noticeState) {
                  toast.success("Opening Store Front in a new tab.");
                } else {
                  e.preventDefault(); // Prevent navigation

                  setNotice(true);
                }
              }}
              target="_blank"
              href={storeFront.storeURL}
            >
              <Button color="primary">View Store Front</Button>
            </a>
            <CopyToClipboard
              text={storeFront.storeURL}
              onCopy={() => {
                if (noticeState) {
                  setIsOpen(true);
                } else {
                  setNotice(true);
                }
              }}
            >
              <Button color="primary">Share Link</Button>
            </CopyToClipboard>{" "}
            <Link to="/editStoreFront">
              <Button color="primary">Edit Store Front</Button>
            </Link>
          </div>
        </div>

        <Row className="mt-4">
          {/* <h3>Sub Dealer Table Data</h3> */}

          <div className="settings__nav">
            {navItems.map((item, index) => (
              <p
                onClick={() => {
                  setNavState(index);
                }}
                key={index}
                className={navState == index ? "activeNav__item" : ""}
              >
                {item}
              </p>
            ))}
          </div>
          {navState == 0 && (
            <>
              <SFTransactionsTable
                // transactions={transactionTable}
                transactions={transactionTable ?? []}
                showHeader={true}
                showSubHeader={false}
              />
            </>
          )}
          {navState == 1 && (
            <>
              <SFCustomersTable
                transactions={customerTable ?? []}
                showHeader={true}
                showSubHeader={false}
              />
            </>
          )}

          {navState == 2 && (
            <>
              <SFWithdrawTable
                transactions={withdrawTable ?? []}
                showHeader={true}
                showSubHeader={false}
              />
            </>
          )}
        </Row>

        <div>
          <Form>
            <p>Enter in the number of records you want to fetch</p>
            <div className="d-flex gap-2 flex-column flex-md-row">
              <InputGroup className="mb-2">
                <InputGroupText>Records:</InputGroupText>
                <Input
                  id="limit"
                  name="limit"
                  placeholder="No. of Records to Fetch"
                  type="number"
                  value={pagination}
                  onChange={(e) => {
                    setPagination(e.target.value);
                  }}
                />
              </InputGroup>

              <InputGroup className="mb-2 justify-content-start gap-2">
                <Button
                  onClick={fetchWithPaginate}
                  color="primary"
                  className="px-4 py-1"
                >
                  Fetch
                </Button>
                <Button
                  onClick={clearPagination}
                  color="secondary"
                  className="px-3 py-1"
                >
                  Reset
                </Button>
              </InputGroup>
            </div>
          </Form>
        </div>

        <Modal centered isOpen={confirm} toggle={() => setConfirm(!confirm)}>
          <ModalBody>
            <div className="add__sub__dealer__con">
              <div className="add__sub__dealer__head">
                {maintenance ? (
                  <h4>Taking Store Front out of Maintenance Mode</h4>
                ) : (
                  <h4>Putting Store Front into Maintenance Mode</h4>
                )}
              </div>
              {maintenance ? (
                <p>
                  Are you sure you want to take the store out of maintenance
                  mode and make it accessible to customers again?
                </p>
              ) : (
                <p>
                  Are you sure you want to put the store into maintenance mode?
                  During this time, the store will be temporary unavailable to
                  customers
                </p>
              )}
            </div>
          </ModalBody>
          <ModalFooter className="confirm-footer">
            <Button
              color="primary"
              onClick={handleUpdate}
              // disabled={formIsValid(errors) || loading}
              size="lg"
              type="submit"
              className="submit-btn"
            >
              Confirm
            </Button>{" "}
            <Button onClick={() => setConfirm(false)}>No, Cancel</Button>
          </ModalFooter>
        </Modal>
      </div>
      <Modal centered isOpen={notice}>
        <ModalHeader toggle={() => setNotice(false)}>
          Complete Store Front Setup
        </ModalHeader>
        <ModalBody>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              gap: "0.8rem",
              textAlign: "center",
            }}
          >
            To access this feature, please complete your store front setup. It's
            essential for tailoring our services to your needs and ensuring a
            seamless experience
            <Link to="/editStoreFront">
              <Button color="primary">Edit Store Front</Button>
            </Link>
          </div>
        </ModalBody>
      </Modal>
      <Modal centered isOpen={isOpen} toggle={() => setIsOpen(false)}>
        <ModalHeader toggle={() => setIsOpen(false)}>Share Store</ModalHeader>
        <ModalBody>
          <div className="sf__share__con">
            <div onClick={handleShareClick} style={style}>
              <div className="sf__share__options">
                <span>
                  <FiShare /> Share Options
                </span>
                <BsChevronRight />
              </div>
            </div>
            <div style={style}>
              <div className="sf__share__options">
                <span>
                  <img alt="logo" src={logo} /> {storeFront.storeURL}
                </span>

                {copyState ? (
                  <b
                  // onClick={() => {
                  //   navigator.clipboard.writeText(storeFront.storeURL ?? "");
                  //   setCopyState(!copyState);
                  // }}
                  >
                    Copied{" "}
                  </b>
                ) : (
                  <b
                    onClick={() => {
                      navigator.clipboard.writeText(storeFront.storeURL ?? "");
                      setCopyState(!copyState);
                    }}
                  >
                    Copy
                  </b>
                )}
              </div>
            </div>
          </div>
        </ModalBody>

        {/* <ModalFooter className="confirm-footer">
          <Button type="submit" color="primary" onClick={(e) => {}}>
            Yes, Proceed
          </Button>{" "}
          <Button onClick={() => setIsOpen(false)}>No, Cancel</Button>
        </ModalFooter> */}
      </Modal>
    </FullLayout>
  );
};

export default StoreFront;
