import { useState } from "react";
import {
  Card,
  Form,
  FormGroup,
  Label,
  Input,
  Button,
  Row,
  Col,
  UncontrolledAlert,
} from "reactstrap";

import AdminLayout from "../../layouts/AdminLayout";
import {
  creditBusiness,
  debitBusiness,
  generateCreditPayment,
} from "../../services/Admin.Services/businessService";
import { handleFailedRequest } from "../../utils";

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
    status: true,
    message: "",
  });

  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
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

      setLoading(false);

      setServerResponse({
        status: true,
        message: response,
      });
    } catch (error) {
      setLoading(false);
      const { status, message } = handleFailedRequest(error);
      setServerResponse({ status, message });
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
          {serverResponse.message.length > 0 && (
            <>
              {serverResponse.status ? (
                <UncontrolledAlert dismissible color="success">
                  {serverResponse.message}
                </UncontrolledAlert>
              ) : (
                <UncontrolledAlert dismissible color="danger">
                  {serverResponse.message}
                </UncontrolledAlert>
              )}
            </>
          )}
          <Row>
            <Col md={7}>
              <Form className="mb-4" onSubmit={handleSubmit}>
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

                <Button disabled={loading} type="submit" color="primary">
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
