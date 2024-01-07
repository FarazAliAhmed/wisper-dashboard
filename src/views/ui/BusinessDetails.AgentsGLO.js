import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  Card,
  Form,
  FormGroup,
  Label,
  Input,
  Button,
  Row,
  Col,
  ModalFooter,
  Modal,
  ModalBody,
} from "reactstrap";
import TopCards from "../../components/dashboard/TopCards";

import AdminLayout from "../../layouts/AdminLayout";
import TransactionsTable from "../../components/TransactionsTable";
import glo from "../../assets/dashboard/glo.svg";
import mtn1 from "../../assets/dashboard/mtn 1.svg";
import mob9 from "../../assets/dashboard/mob9.svg";
import airtel from "../../assets/dashboard/airtel.svg";
import tranIcon from "../../assets/dashboard/transa.svg";
import wallIcon from "../../assets/dashboard/walle.svg";
import "../../assets/scss/custom.scss";
import warning from "../../assets/images/logos/warning.png";

import {
  getSingleBusiness,
  makeAdmin,
  removeAdmin,
  makeActive,
  disableAccount,
  setAccountType,
} from "../../services/Admin.Services/businessService";

import {
  displayBalance,
  getBusinessTransactionFromAllTransactions,
} from "../../utils";
import { useAdmin } from "../../context/adminContext";
import MonifyHistory from "../../components/MonifyHistory";
import { useParams } from "react-router-dom";
import AdminMonifyHistory from "../../components/AdminMonifyHistory";
import AdminPurchaseHistory from "../../components/AdminPurchaseHistory";
import moment from "moment";
import {
  disableAgentAccount,
  enableAgentAccount,
  getAgentsInfo,
  getAgentsTransactions,
} from "../../services/dataService";
import AgentsPurchaseHistory from "../../components/AgentsPurchaseHistory";
import toast from "react-hot-toast";

const BusinessDetailsGLO = (props) => {
  const [confirm, setConfirm] = useState(false);
  const [confirm1, setConfirm1] = useState(false);

  const [business, setBusiness] = useState({});
  const [balanceDisplay, setBalanceDisplay] = useState("");
  const [isAdmin, setIsAdmin] = useState();
  const [active, setActive] = useState(true);
  const [accountStatus, setAccountStatus] = useState(true);
  const [type, setType] = useState();
  const [loading, setLoading] = useState(false);
  const [cashBalance, setCashBalance] = useState(0);
  const [navState, setNavState] = useState(0);
  const [agents, setAgents] = useState({});
  const [agentsTransactions, setAgentsTransactions] = useState([]);

  const [mega_wallet, setMega_Wallet] = useState("");
  const [balances, setBalances] = useState({});

  const { businessId } = useParams();
  // const { transaction } = useAdmin();

  // const mega_wallet = business?.balance?.mega_wallet;

  // console.log(transaction);

  console.log("bal", balances);

  const handleGetAgentsInfo = async () => {
    setLoading(true);
    const resp = await getAgentsInfo({
      userId: businessId,
    });
    setAgents(resp?.subdealers);
    setBalances(resp?.dataBalance);
    setAccountStatus(resp?.subdealers?.active);
    setLoading(false);
  };

  const handleGetAgentsTransactions = async () => {
    setLoading(true);
    const resp = await getAgentsTransactions({
      userId: businessId,
    });
    setAgentsTransactions(resp?.subdealers);
    // setBalances(resp?.dataBalance);
    setLoading(false);
  };

  useEffect(() => {
    handleGetAgentsInfo();
    handleGetAgentsTransactions();
  }, []);

  const handleMakeAdmin = async () => {
    setLoading(true);
    await makeAdmin(business.email);
    setLoading(false);
    setIsAdmin(true);
  };

  const handleEnableActive = async () => {
    setLoading(true);
    try {
      const res = await enableAgentAccount(businessId);
      toast.success(res.data.message);
      setAccountStatus(true);
    } catch (error) {
      console.log(error);
      toast.error("An error occured");
    }

    setLoading(false);
    setActive(false);
  };

  const handleDisableActive = async () => {
    setLoading(true);
    try {
      const res = await disableAgentAccount(businessId);
      toast.success(res.data.message);
      setAccountStatus(false);
    } catch (error) {
      console.log(error);
      toast.error("An error occured");
    }

    setLoading(false);
    setActive(false);
  };

  const handleSetTypeLite = async () => {
    setLoading(true);
    await setAccountType("lite", business._id);
    setLoading(false);
    setType("lite");
  };

  const handleSetTypeMega = async () => {
    setLoading(true);
    await setAccountType("mega", business._id);
    setLoading(false);
    setType("mega");
  };

  console.log(agents, "bb");

  const navItems = ["Transactions", "Allocation"];
  const dateObject = moment(business?.createdAt);

  const formattedDate = dateObject.format("YYYY-MM-DD");

  // Get the time in the format "HH:MM:SS"
  const formattedTime = dateObject.format("HH:mm:ss");
  return (
    <AdminLayout>
      <div className="business__action__cards">
        <Link to="/agents">
          <Button color="primary">Back</Button>
        </Link>{" "}
      </div>
      <div>
        <h5 className="mb-4 mt-3">Agents Account</h5>

        <Row>
          <Col lg="7">
            <Card body>
              <Form>
                <Row form>
                  <Col md={12}>
                    <FormGroup>
                      <Label for="fullName">Business Name</Label>
                      <Input
                        disabled
                        id="fullName"
                        value={agents?.name}
                        name="name"
                        type="text"
                      />
                    </FormGroup>
                  </Col>
                  <Col md={12}>
                    <FormGroup>
                      <Label for="ID">Business ID</Label>
                      <Input
                        disabled
                        id="ID"
                        value={agents?._id}
                        name="id"
                        type="text"
                      />
                    </FormGroup>
                  </Col>
                  <Col md={12}>
                    <FormGroup>
                      <Label for="businessType">Business Type</Label>
                      <Input
                        value={agents?.type}
                        disabled
                        id="businessType"
                        name="businessType"
                        type="text"
                      />
                    </FormGroup>
                  </Col>
                  <Col md={12}>
                    <FormGroup>
                      <Label for="username">Username</Label>
                      <Input
                        disabled
                        value={agents?.username}
                        name="username"
                        type="username"
                      />
                    </FormGroup>
                  </Col>
                  <Col md={12}>
                    <FormGroup>
                      <Label for="email">Email</Label>
                      <Input
                        disabled
                        id="email"
                        value={agents?.email}
                        name="email"
                        placeholder="example@mail.com"
                        type="email"
                      />
                    </FormGroup>
                  </Col>
                  <Col md={12}>
                    <FormGroup>
                      <Label for="mobile_number">Phone Number</Label>
                      <Input
                        disabled
                        value={agents?.mobile_number}
                        name="mobile_number"
                        type="number"
                      />
                    </FormGroup>
                  </Col>

                  <Col md={12}>
                    <FormGroup>
                      <Label for="dateJoined">Date joined</Label>
                      <Input
                        value={`${formattedDate} ${formattedTime}`}
                        disabled
                        id="dateJoined"
                        name="dateJoined"
                        type="text"
                      />
                    </FormGroup>
                  </Col>
                </Row>
              </Form>
            </Card>
          </Col>

          <Col lg="5">
            <Row>
              {/* <Col sm="6" lg="9">
                <TopCards
                  bg="bg-light-info text-info"
                  title="Profit"
                  subtitle="Balance"
                  earning={`₦${cashBalance}`}
                  icon={wallIcon}
                />
              </Col> */}
              {/* <Col sm="6" lg="9">
                <TopCards
                  bg="bg-light-danger text-danger"
                  title="Refunds"
                  subtitle="Total transactions "
                  earning={`${transactions.length}`}
                  icon="bi bi-coin"
                />
              </Col>
              <Col sm="6" lg="9">
                <TopCards
                  bg="bg-light-warning text-warning"
                  title="New Project"
                  subtitle="Total data sold"
                  earning={totalDataSold(transactions)}
                  icon="bi bi-basket3"
                />
              </Col> */}

              {/***Mega Wallets***/}

              {/* Glo wallet - Hidden for now */}
              <Col sm="6" lg="9">
                <TopCards
                  bg="bg-light-info text-info"
                  title="Profit"
                  subtitle="GLO"
                  earning={`${balances?.mega_wallet?.glo / 1000} GB`}
                  icon={glo}
                />
              </Col>
            </Row>
          </Col>
        </Row>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <h3>Actions</h3>
          <div className="sf__customer__cards">
            {/* <Button disabled={loading} onClick={""} color="danger">
              {loading ? "Please wait..." : "Remove agents"}
            </Button> */}
            {/* {!isAdmin && (
        <Button disabled={loading} onClick={handleMakeAdmin} color="success">
          {loading ? "Please wait..." : "Make admin"}
        </Button>
      )} */}
            {accountStatus && (
              <Button
                disabled={loading}
                onClick={() => {
                  setConfirm(true);
                }}
                color="warning"
              >
                {loading ? "Please wait..." : "Disable Account"}
              </Button>
            )}
            {!accountStatus && (
              <Button
                disabled={loading}
                onClick={() => {
                  setConfirm1(true);
                }}
                color="info"
              >
                {loading ? "Please wait..." : "Enable Account"}
              </Button>
            )}
            {/* &nbsp; */}
            {/* {type === "lite" && (
        <Button disabled={loading} onClick={handleSetTypeMega} color="dark">
          {loading ? "Please wait..." : "Make Mega"}
        </Button>
      )} */}
            {/* {type === "lite" && (
        <Button
          className="mx-2"
          disabled={loading}
          onClick={() =>
            (window.location.href = `/admin/user_packages/${businessId}`)
          }
          color="primary"
        >
          {loading ? "Please wait..." : "Pricing"}
        </Button>
      )} */}
            <Button
              disabled={loading}
              onClick={() =>
                (window.location.href = `/agents/fund/${businessId}`)
              }
              color="primary"
            >
              {loading ? "Please wait..." : "Fund"}
            </Button>
            {/* {type === "mega" && (
        <Button disabled={loading} onClick={handleSetTypeLite} color="primary">
          {loading ? "Please wait..." : "Make Lite"}
        </Button>
      )} */}
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
              {/* <h5 className="mb-4 mt-3">Business Transactions</h5> */}
              <TransactionsTable
                transactions={agentsTransactions}
                showHeader={false}
              />
            </>
          )}
          {navState == 1 && (
            <>
              {/* <h5 className="mb-4 mt-3">Business Transactions</h5> */}
              <AgentsPurchaseHistory businessId={businessId} />
            </>
          )}
        </Row>

        <Modal centered isOpen={confirm} toggle={() => setConfirm(!confirm)}>
          <ModalBody>
            <div className="confirm text-center">
              <img
                src={warning}
                width={50}
                className="confirm-warn"
                alt="warn"
              />

              <h5>Are you sure you want to disable this agent's account?</h5>
            </div>
          </ModalBody>
          <ModalFooter className="confirm-footer">
            <Button
              color="primary"
              onClick={() => {
                setConfirm(false);
                handleDisableActive();
              }}
            >
              Confirm
            </Button>{" "}
            <Button onClick={() => setConfirm(false)}>No, Cancel</Button>
          </ModalFooter>
        </Modal>

        <Modal centered isOpen={confirm1} toggle={() => setConfirm1(!confirm1)}>
          <ModalBody>
            <div className="confirm text-center">
              <img
                src={warning}
                width={50}
                className="confirm-warn"
                alt="warn"
              />

              <h5>Are you sure you want to enable this agent's account?</h5>
            </div>
          </ModalBody>
          <ModalFooter className="confirm-footer">
            <Button
              color="primary"
              onClick={() => {
                setConfirm1(false);
                handleEnableActive();
              }}
            >
              Confirm
            </Button>{" "}
            <Button onClick={() => setConfirm1(false)}>No, Cancel</Button>
          </ModalFooter>
        </Modal>
      </div>
    </AdminLayout>
  );
};

export default BusinessDetailsGLO;
