import { useState, useEffect } from "react";
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
  UncontrolledAlert,
  ModalHeader,
} from "reactstrap";

import AdminLayout from "../../layouts/AdminLayout";
import {
  creditBusiness,
  debitBusiness,
  generateCreditPayment,
} from "../../services/Admin.Services/businessService";
import { handleFailedRequest } from "../../utils";

import warning from "../../assets/images/logos/warning.png";
import cancel from "../../assets/images/logos/cancel.png";
import checked from "../../assets/images/logos/checked.png";
import loadingGIF from "../../assets/images/logos/loading2.gif";

import "./../../assets/scss/custom.scss";

const AllocateData = () => {
  const [values, setValues] = useState({
    action_type: "",
    business_id: "",
    amount: "",
    amount_cash: "",
    unit: "money",
    wallet: "",
  });

  const [serverResponse, setServerResponse] = useState({
    status: false,
    message: "",
  });

  const [isSuccess, setIsSuccess] = useState(false);

  const [loading, setLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

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
      let response;
      setLoading(true);
      if (values.action_type === "credit") {
        const res = await creditBusiness({
          business_id: values.business_id,
          credit_amount: values.amount,
          unit: values.unit,
          wallet: values.wallet,
        });
        response = res.data.message;

        generateCreditPayment({
          business_id: values.business_id,
          amount:
            values.action_type === "credit" && values.unit === "data"
              ? values.amount_cash
              : values.amount,
          payment_ref: "trx-" + Math.floor(Math.random() * 10000000000000000),
        });
      }
      if (values.action_type === "debit") {
        const res = await debitBusiness({
          business_id: values.business_id,
          debit_amount: values.amount,
          unit: values.unit,
          wallet: values.wallet,
        });
        if (res.status === 401) {
          response = res.data.message;
        } else {
          response = "Data balance updated";
        }
      }

      setIsSuccess(true);

      setServerResponse({
        status: true,
        message: response,
      });

      setLoading(false);

      console.log(serverResponse);
    } catch (error) {
      setLoading(false);
      const { status, message } = handleFailedRequest(error);
      setServerResponse({ status, message });
    } finally {
      const timeoutId = setTimeout(() => {
        alert("yes na");
        setIsSuccess(false);
      }, 3000);

      clearTimeout(timeoutId);
    }
  };

  const handleChange = ({ currentTarget: input }) => {
    const { name, value } = input;

    setValues({ ...values, [name]: value });
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
                  <p className="text-center">
                    Are you sure you want to continue?
                  </p>
                )}
              </div>
            </ModalBody>
            {!isSuccess && (
              <ModalFooter className="confirm-footer">
                <Button type="submit" color="primary" onClick={handleSubmit}>
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
                      <Label for="unit">Business Type</Label>
                      <Input
                        onChange={handleChange}
                        required
                        name="unit"
                        className="mb-3"
                        type="select"
                      >
                        <option selected>--- Select type ---</option>
                        <option value="money">Lite</option>
                        <option value="data">Mega</option>
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
                        Amount
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
                  {values.action_type === "credit" && values.unit === "data" && (
                    <Col md={12}>
                      <FormGroup>
                        <Label for="amount_payed">Amount Payed (Cash)</Label>
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
