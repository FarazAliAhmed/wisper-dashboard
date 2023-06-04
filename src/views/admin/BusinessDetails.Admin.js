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
} from "reactstrap";
import TopCards from "../../components/dashboard/TopCards";

import AdminLayout from "../../layouts/AdminLayout";
import TransactionsTable from "../../components/TransactionsTable";
import glo from '../../assets/dashboard/glo.svg'
import mtn1 from '../../assets/dashboard/mtn 1.svg'
import mob9 from '../../assets/dashboard/mob9.svg'
import airtel from '../../assets/dashboard/airtel.svg'
import tranIcon from '../../assets/dashboard/transa.svg'
import wallIcon from '../../assets/dashboard/walle.svg'

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

const Account = (props) => {
  const [business, setBusiness] = useState({});
  const [balanceDisplay, setBalanceDisplay] = useState("");
  const [isAdmin, setIsAdmin] = useState();
  const [active, setActive] = useState();
  const [type, setType] = useState();
  const [loading, setLoading] = useState(false);

  const businessId = props.match.params.businessId;

  const mega_wallet = business?.balance?.mega_wallet;

  const { transaction } = useAdmin();

  // console.log(transaction)

  useEffect(() => {
    async function fetchBusinessDetails() {
      const res = await getSingleBusiness(businessId);
      setBusiness({ ...res.data.business, balance: { ...res.data.balance } });
      setActive(res.data.business.active);
      setIsAdmin(res.data.business.isAdmin);
      setType(res.data.business.type)

      const { data_volume, data_unit, wallet_balance, mega_wallet } = res.data.balance;
      setBalanceDisplay(
        displayBalance(
          data_volume,
          data_unit,
          wallet_balance,
          mega_wallet,
          res.data.business
        )
      );
    }
    fetchBusinessDetails();
  }, []);

  const handleRemoveAdmin = async () => {
    setLoading(true);
    await removeAdmin(business.email);
    setLoading(false);
    setIsAdmin(false);
  };

  const handleMakeAdmin = async () => {
    setLoading(true);
    await makeAdmin(business.email);
    setLoading(false);
    setIsAdmin(true);
  };

  const handleSetActive = async () => {
    setLoading(true);
    await makeActive(business._id);
    setLoading(false);
    setActive(true);
  }

  const handleRemoveActive = async () => {
    setLoading(true);
    await disableAccount(business._id);
    setLoading(false);
    setActive(false);
  }

  const handleSetTypeLite = async () => {
    setLoading(true);
    await setAccountType("lite", business._id);
    setLoading(false);
    setType("lite");
  }

  const handleSetTypeMega = async () => {
    setLoading(true);
    await setAccountType("mega", business._id);
    setLoading(false);
    setType("mega");
  }

  return (
    <AdminLayout>
      <Link to="/admin/business">
        <Button color="primary">Back</Button>
      </Link>{" "}
      &nbsp;
      {isAdmin && (
        <Button disabled={loading} onClick={handleRemoveAdmin} color="danger">
          {loading ? "Please wait..." : "Remove from admin"}
        </Button>
      )}
      {!isAdmin && (
        <Button disabled={loading} onClick={handleMakeAdmin} color="success">
          {loading ? "Please wait..." : "Make admin"}
        </Button>
      )}
      &nbsp;
      {active && (
        <Button disabled={loading} onClick={handleRemoveActive} color="warning">
          {loading ? "Please wait..." : "Disable Account"}
        </Button>
      )}
      {!active && (
        <Button disabled={loading} onClick={handleSetActive} color="info">
          {loading ? "Please wait..." : "Enable Account"}
        </Button>
      )}
      &nbsp;
      {type === "lite" && (
        <Button disabled={loading} onClick={handleSetTypeMega} color="dark">
          {loading ? "Please wait..." : "Make Mega"}
        </Button>
      )}
      {type === "lite" && (
        <Button className="mx-2" disabled={loading} onClick={() => window.location.href = `/admin/user_packages/${businessId}`} color="primary">
          {loading ? "Please wait..." : "Pricing"}
        </Button>
      )}
      {type === "mega" && (
        <Button disabled={loading} onClick={handleSetTypeLite} color="primary">
          {loading ? "Please wait..." : "Make Lite"}
        </Button>
      )}
      <div>
        <h5 className="mb-4 mt-3">Business Account</h5>

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
                        value={business?.name}
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
                        value={business?._id}
                        name="id"
                        type="text"
                      />
                    </FormGroup>
                  </Col>
                  <Col md={12}>
                    <FormGroup>
                      <Label for="businessType">Business Type</Label>
                      <Input
                        value={business?.type}
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
                        value={business?.username}
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
                        value={business?.email}
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
                        value={business?.mobile_number}
                        name="mobile_number"
                        type="number"
                      />
                    </FormGroup>
                  </Col>
                  <Col md={12}>
                    <FormGroup>
                      <Label for="address">Address</Label>
                      <Input
                        value={business?.address}
                        disabled
                        id="address"
                        name="address"
                        type="text"
                      />
                    </FormGroup>
                  </Col>
                  <Col md={12}>
                    <FormGroup>
                      <Label for="dateJoined">Date joined</Label>
                      <Input
                        value={business?.createdAt}
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
              <Col sm="6" lg="9">
                <TopCards
                  bg="bg-light-info text-info"
                  title="Profit"
                  subtitle="Balance"
                  earning={balanceDisplay}
                  icon={wallIcon}
                />
              </Col>
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
              {business.type === "mega" && (
                <>
                  {/* MTN and Airtel Wallets */}
                  {/* <Col sm="6" lg="9">
                    <TopCards
                      bg="bg-light-info text-info"
                      title="Profit"
                      subtitle="MTN SME"
                      earning={`${mega_wallet.mtn_sme} ${mega_wallet.unit}`}
                      icon="bi bi-wallet-fill"
                    />
                  </Col> */}
                  <Col sm="6" lg="9">
                    <TopCards
                      bg="bg-light-warning text-warning"
                      title="Refunds"
                      subtitle="MTN Gifting"
                      earning={`${mega_wallet.mtn_gifting/1000} GB`}
                      icon={mtn1}
                    />
                  </Col>
                  <Col sm="6" lg="9">
                    <TopCards
                      bg="bg-light-success text-success"
                      title="New Project"
                      subtitle="Airtel"
                      earning={`${mega_wallet.airtel/1000} GB`}
                      icon={airtel}
                    />
                  </Col>

                  {/* Glo wallet - Hidden for now */}
                  <Col sm="6" lg="9">
                    <TopCards
                      bg="bg-light-info text-info"
                      title="Profit"
                      subtitle="GLO"
                      earning={`${mega_wallet.glo/1000} GB`}
                      icon={glo}
                    />
                  </Col>
                  
                  {/* 9Mobile wallet */}
                  <Col sm="6" lg="9">
                    <TopCards
                      bg="bg-light-info text-info"
                      title="Profit"
                      subtitle="9Mobile"
                      earning={`${mega_wallet["9mobile"]/1000} GB`}
                      icon={mob9}
                    />
                  </Col>
                </>
              )}
            </Row>
          </Col>
        </Row>

        <Row className="mt-4">
          <h5 className="mb-4 mt-3">Business Transactions</h5>
          <TransactionsTable
            transactions={getBusinessTransactionFromAllTransactions(
              transaction,
              businessId
            )}
            showHeader={true}
          />
        </Row>
      </div>
    </AdminLayout>
  );
};

export default Account;
