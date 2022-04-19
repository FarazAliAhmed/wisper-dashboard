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
  FormFeedback,
  UncontrolledAlert,
} from "reactstrap";
import TopCards from "../../components/dashboard/TopCards";

import AdminLayout from "../../layouts/AdminLayout";
import { getSingleBusiness } from "../../services/Admin.Services/businessService";

import {
  displayBalance,
  handleFailedRequest,
  totalDataSold,
  validateProperty,
} from "../../utils";

const Account = (props) => {
  const [business, setBusiness] = useState({});
  const [balanceDisplay, setBalanceDisplay] = useState("");

  const businessId = props.match.params.businessId;

  const mega_wallet = business?.balance?.mega_wallet;

  useEffect(() => {
    async function fetchBusinessDetails() {
      const res = await getSingleBusiness(businessId);
      setBusiness({ ...res.data.business, balance: { ...res.data.balance } });

      const { data_volume, data_unit, wallet_balance } = res.data.balance;
      setBalanceDisplay(
        displayBalance(
          data_volume,
          data_unit,
          wallet_balance,
          res.data.business
        )
      );
    }
    fetchBusinessDetails();
  }, []);

  return (
    <AdminLayout>
      <Link to="/admin/business">
        <Button color="primary">Back</Button>
      </Link>

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
                  icon="bi bi-wallet"
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
                  <Col sm="6" lg="9">
                    <TopCards
                      bg="bg-light-info text-info"
                      title="Profit"
                      subtitle="MTN SME"
                      earning={`${mega_wallet.mtn_sme} ${mega_wallet.unit}`}
                      icon="bi bi-wallet-fill"
                    />
                  </Col>
                  <Col sm="6" lg="9">
                    <TopCards
                      bg="bg-light-warning text-warning"
                      title="Refunds"
                      subtitle="MTN Gifting"
                      earning={`${mega_wallet.mtn_gifting} ${mega_wallet.unit}`}
                      icon="bi bi-wallet"
                    />
                  </Col>
                  <Col sm="6" lg="9">
                    <TopCards
                      bg="bg-light-success text-success"
                      title="New Project"
                      subtitle="Airtel"
                      earning={`${mega_wallet.airtel} ${mega_wallet.unit}`}
                      icon="bi bi-wallet2"
                    />
                  </Col>

                  {/* Glo wallet - Hidden for now */}
                  {/* <Col sm="6" lg="9">
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
          </Col>
        </Row>
      </div>
    </AdminLayout>
  );
};

export default Account;
