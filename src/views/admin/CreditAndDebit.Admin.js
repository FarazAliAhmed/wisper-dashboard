import { useState } from "react";
import {
  Card,
  Form,
  FormGroup,
  Label,
  Input,
  Modal,
  ModalBody,
  ModalFooter,
  Button,
  Row,
  Col,
  ModalHeader,
} from "reactstrap";

import AdminLayout from "../../layouts/AdminLayout";
import {
  adminMonifyCreditPurchase,
  adminMonifyDebitPurchase,
  adminMonifyPurchase,
  creditBusiness,
  debitBusiness,
  generateCreditPayment,
  getSingleBusiness,
} from "../../services/Admin.Services/businessService";
import { handleFailedRequest } from "../../utils";

import warning from "../../assets/images/logos/warning.png";
import checked from "../../assets/images/logos/checked.png";
import loadingGIF from "../../assets/images/logos/loading2.gif";

import "./../../assets/scss/custom.scss";
import axios from "axios";

const AllocateData = () => {
  const { REACT_APP_DB_URL } = process.env;

  const [values, setValues] = useState({
    action_type: "",
    business_id: "",
    amount: "",
    amount_cash: "",
    unit: "money",
    wallet: "",
    pay_type: "",
  });

  const [serverResponse, setServerResponse] = useState({
    status: false,
    message: "",
  });

  const [isSuccess, setIsSuccess] = useState(false);

  const [loading, setLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [business, setBusiness] = useState({});
  const [businessName, setBusinessName] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (
      values.action_type === "" ||
      values.business_id === "" ||
      values.amount === ""
    ) {
      return setServerResponse({
        status: false,
        message: "Fill the form correctly",
      });
    }
    try {
      // start of getting user details
      const businessId = values.business_id;

      const mega_user = await getSingleBusiness(businessId);
      setBusiness({
        ...mega_user.data.business,
        balance: { ...mega_user.data.balance },
      });

      const mega_wallet = mega_user.data.balance?.mega_wallet;

      // console.log((values.amount * 1000) + (mega_wallet[values.wallet]), "ajhu")

      // end of getting user details

      if (mega_user) {
        // console.log(values)

        let response;
        setLoading(true);

        setIsSuccess(true);
        if (values.action_type === "credit") {
          const genCred = await adminMonifyCreditPurchase({
            business_id: values.business_id,
            amount: values.amount,
          });

          setIsSuccess(true);
          window.location.reload();
        } else if (values.action_type === "debit") {
          // const res = await debitBusiness({
          //   business_id: values.business_id,
          //   debit_amount:
          //     values.unit == "data" ? values.amount * 1000 : values.amount,
          //   unit: values.unit,
          //   wallet: values.wallet,
          // });

          // response = res.data.message;

          // const val_MB = values.amount * 1000;

          const debCred = await adminMonifyDebitPurchase({
            business_id: values.business_id,
            amount: values.amount,
          });

          setIsSuccess(true);
          window.location.reload();

          // console.log("sjjs", res);
        }
        setIsSuccess(true);

        setServerResponse({
          status: true,
          message: response,
        });

        setLoading(false);
      }
    } catch (error) {
      setLoading(false);
      const { status, message } = handleFailedRequest(error);
      setServerResponse({ status, message });
      setIsSuccess(false);
    }
  };
  // console.log(values);

  const handleChange = async ({ currentTarget: input }) => {
    const { name, value } = input;

    setValues({ ...values, [name]: value });

    if (name == "business_id" && value.length == 24) {
      const businessId = value;

      const mega_user = await getSingleBusiness(businessId);

      if (mega_user) {
        // console.log("mega user", mega_user?.data.balance.business.name)
        setBusinessName(mega_user?.data.balance.business.name);
      }
    }
  };

  return (
    <AdminLayout>
      <div>
        <h5 className="mb-4 mt-3">Credit / Debit Business Account</h5>
        <Card body>
          <Modal centered isOpen={isOpen}>
            <ModalHeader toggle={() => setIsOpen(false)}>Confirm</ModalHeader>
            <ModalBody>
              <div className="confirm text-center">
                {loading ? (
                  <img
                    src={loadingGIF}
                    width={50}
                    className="confirm-warn"
                    alt="warn"
                  />
                ) : isSuccess ? (
                  <>
                    <img
                      src={checked}
                      width={50}
                      className="confirm-success"
                      alt="success"
                    />
                    <p className="text-center">{serverResponse.message}</p>
                  </>
                ) : (
                  <>
                    <img
                      src={warning}
                      width={50}
                      className="confirm-warn"
                      alt="warn"
                    />
                    <p className="text-center">{serverResponse.message}</p>
                  </>
                )}
                {!loading && !isSuccess && (
                  <>
                    <p className="text-center">
                      {values.unit == "data" ? (
                        <>
                          You are about to {values.action_type}{" "}
                          <span style={{ fontWeight: "bold" }}>
                            {businessName}{" "}
                          </span>
                          with
                          {values.amount > 999 ? (
                            <span style={{ fontWeight: "bold" }}>
                              {" "}
                              {values.amount / 1000} TB
                            </span>
                          ) : (
                            <span style={{ fontWeight: "bold" }}>
                              {" "}
                              {values.amount} GB
                            </span>
                          )}
                        </>
                      ) : (
                        <>
                          You are about to fund{" "}
                          <span style={{ fontWeight: "bold" }}>
                            {businessName}{" "}
                          </span>
                          with ₦{values.amount}
                        </>
                      )}
                    </p>
                    <p className="text-center">
                      Are you sure you want to continue?
                    </p>
                  </>
                )}
              </div>
            </ModalBody>
            {!isSuccess && (
              <ModalFooter className="confirm-footer">
                <Button
                  type="submit"
                  color="primary"
                  onClick={(e) => {
                    setIsSuccess(true);
                    handleSubmit(e);
                  }}
                >
                  Yes, Proceed
                </Button>{" "}
                <Button onClick={() => setIsOpen(false)}>No, Cancel</Button>
              </ModalFooter>
            )}
          </Modal>
          <Row>
            <Col md={7}>
              <Form className="mb-4">
                <Row form>
                  <Col md={12}>
                    <FormGroup>
                      <Label for="unit">Action Type</Label>
                      <Input
                        onChange={handleChange}
                        name="action_type"
                        className="mb-3"
                        type="select"
                        required
                      >
                        <option selected>--- Select Action type ---</option>
                        <option value="credit">Credit</option>
                        <option value="debit">Debit</option>
                      </Input>
                    </FormGroup>
                  </Col>
                  <Col md={12}>
                    <FormGroup>
                      <Label for="businessId">Business Id</Label>
                      <Input
                        onChange={handleChange}
                        required
                        name="business_id"
                        value={values.business_id}
                        className="mb-3"
                        type="text"
                        placeholder="Enter business Id"
                      ></Input>
                    </FormGroup>
                  </Col>
                  <Col md={12}>
                    <FormGroup>
                      <Label for="businessId">Business Name</Label>
                      <Input
                        disabled
                        required
                        value={businessName}
                        className="mb-3"
                        type="text"
                        placeholder="Business Name"
                      ></Input>
                    </FormGroup>
                  </Col>
                  <Col md={12}>
                    <FormGroup>
                      <Label for="unit">Funding Type</Label>
                      <Input
                        onChange={handleChange}
                        required
                        name="unit"
                        className="mb-3"
                        type="select"
                      >
                        {/* <option selected>--- Select type ---</option> */}
                        <option value="money">
                          Wallet Funding (Lite and Mega Users)
                        </option>
                        {/* <option value="data">
                          Bucket Funding (Mega Users Only)
                        </option> */}
                      </Input>
                    </FormGroup>
                  </Col>
                  {values.unit === "data" && (
                    <Col md={12}>
                      <FormGroup>
                        <Label for="wallet">Wallet</Label>
                        <Input
                          onChange={handleChange}
                          required
                          name="wallet"
                          className="mb-3"
                          type="select"
                        >
                          <option selected>---Select wallet ---</option>
                          <option value="mtn_sme">MTN (SME)</option>
                          <option value="mtn_gifting">MTN (GIFTING)</option>
                          <option value="airtel">AIRTEL</option>
                          <option value="glo">GLO</option>
                          <option value="9mobile">9MOBILE</option>
                        </Input>
                      </FormGroup>
                    </Col>
                  )}
                  <Col md={12}>
                    <FormGroup>
                      <Label for="credit_amount">
                        {values.action_type === "credit"
                          ? "Credit"
                          : values.action_type === "debit"
                          ? "Debit"
                          : ""}{" "}
                        {values.unit == "data"
                          ? "Data Volume Being Added (GB)"
                          : "Credit Amount Being added in Naira"}
                      </Label>
                      <Input
                        required
                        value={values.amount}
                        id="amount"
                        name="amount"
                        onChange={handleChange}
                        type="number"
                      />
                    </FormGroup>
                  </Col>
                  {values.action_type === "credit" &&
                    values.unit === "data" && (
                      <>
                        <Col md={12}>
                          <FormGroup>
                            <Label for="unit">Payment Type</Label>
                            <Input
                              onChange={handleChange}
                              name="pay_type"
                              className="mb-3"
                              type="select"
                              required
                            >
                              <option selected>
                                --- Select Payment type ---
                              </option>
                              <option value="paid">Paid</option>
                              <option value="credit">Credit</option>
                            </Input>
                          </FormGroup>
                        </Col>

                        <Col md={12}>
                          <FormGroup>
                            <Label for="amount_payed">
                              Amount Paid by User (Naira)
                            </Label>
                            <Input
                              required
                              value={values.amount_cash}
                              id="amount_cash"
                              name="amount_cash"
                              onChange={handleChange}
                              type="number"
                            />
                          </FormGroup>
                        </Col>
                      </>
                    )}
                </Row>

                <Button
                  disabled={loading}
                  onClick={() => setIsOpen(true)}
                  color="primary"
                >
                  {values.action_type === "credit"
                    ? "Credit"
                    : values.action_type === "debit"
                    ? "Debit"
                    : "Modify"}
                </Button>
              </Form>
            </Col>
          </Row>
        </Card>
      </div>
    </AdminLayout>
  );
};

export default AllocateData;
