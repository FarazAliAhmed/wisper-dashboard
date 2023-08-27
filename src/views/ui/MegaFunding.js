import { useState, useEffect } from "react";
import {
  Card,
  Form,
  FormGroup,
  Label,
  Input,
  Row,
  Col,
  CardBody,
  // UncontrolledAlert,
  // Button,
} from "reactstrap";
import AllocateButton from "../../components/AllocateButton";
import { useUser } from "../../context/userContext";
import { useAppState } from "../../context/appContext";

import FullLayout from "../../layouts/FullLayout";
import CopyToClipboard from "react-copy-to-clipboard";
import { MdOutlineContentCopy } from "react-icons/md";
import { allocateData } from "../../services/dataService";
import { handleFailedRequest, parseDataPlans } from "../../utils";
import sterling_logo from "../../assets/images/logos/Sterling_Bank_Logo_Straight.png";
import wema_logo from "../../assets/images/logos/Wema-Bank.png";
import moniepoint_logo from "../../assets/images/logos/Moniepoint-Logo.png";
import { toast } from "react-hot-toast";

// import dataPlans from "../../utils/plansTable";

import "./../../assets/scss/custom.scss";

const initialState = {
  network: "airtel",
  plan_id: "",
  phone_number: "",
};

const AllocateDataMA = () => {
  const [plan, setPlan] = useState(initialState);

  // const [serverResponse, setServerResponse] = useState({
  //   status: true,
  //   message: "",
  // });

  const [loading, setLoading] = useState(false);
  const { user } = useUser();

  const { plans } = useAppState();
  const dataPlans = parseDataPlans(plans);

  // useEffect(() => {
  //   parseDataPlans(plans)
  // }, [])

  const handleSubmit = async (e) => {
    // e.preventDefault();
    try {
      setLoading(true);
      const res = await allocateData(plan, user?.access_token);
      // console.log("res", res);
      setLoading(false);
      setPlan(initialState);
      return { status: true, message: "Data allocated successfully." };
      // setServerResponse({status: true, message: "Data allocated successfully."});
    } catch (error) {
      console.log("error.response.data.message:", error.response.data.message);
      setLoading(false);
      const { status, message } = handleFailedRequest(error);
      return { status, message };
      // setServerResponse({ status, message });
    }
  };

  const handleChange = ({ currentTarget: input }) => {
    const { name, value } = input;
    setPlan({ ...plan, [name]: value });
  };
  return (
    <FullLayout>
      <div>
        <h5 className="mb-4 mt-3">Wallet Funding</h5>
        <Card body>
          <Row>
            <Row form>
              <Col md={12}>
                <FormGroup>
                  <Label for="network">Select Payment Option</Label>
                  <Input
                    onChange={handleChange}
                    name="network"
                    value={plan.network}
                    className="mb-3"
                    type="select"
                  >
                    <option>Bank Transfer</option>
                  </Input>
                </FormGroup>
              </Col>
            </Row>
            <h4>Fund your wallet via bank transfer</h4>
            <p>
              To add funds, make a payment to this dedicated account. Your
              wallet will be automatically credited.
            </p>
            <Col md={6}>
              <Form className="mb-4">
                <Row className="bank-details">
                  <Col>
                    <div>
                      <img className="wema__logo" src={wema_logo} alt="" />
                    </div>

                    <div
                      style={{
                        display: "flex",
                        gap: "0.2rem",
                        alignItems: "center",
                      }}
                    >
                      <b>Account Name:</b> &nbsp; Wema Bank Osa
                    </div>
                    <div
                      style={{
                        display: "flex",
                        gap: "0.2rem",
                        alignItems: "center",
                      }}
                    >
                      <b>Bank Name:</b> &nbsp; Wema Bank
                      <CopyToClipboard
                        text={"Wema Bank"}
                        onCopy={() => {
                          toast.success("Copied!");
                        }}
                      >
                        <MdOutlineContentCopy
                          color="white"
                          cursor={"pointer"}
                        />
                      </CopyToClipboard>
                    </div>
                    <div
                      style={{
                        display: "flex",
                        gap: "0.2rem",
                        alignItems: "center",
                      }}
                    >
                      {" "}
                      <b>Account Number:</b>&nbsp; 9274074636
                      <CopyToClipboard
                        text={"9274074636"}
                        onCopy={() => {
                          toast.success("Copied!");
                        }}
                      >
                        <MdOutlineContentCopy
                          color="white"
                          cursor={"pointer"}
                        />
                      </CopyToClipboard>
                    </div>
                  </Col>

                  <p
                    style={{
                      color: "#FFC107",
                      fontWeight: 800,
                    }}
                  >
                    Please Note The account can only receive and send funds in
                    Nigerian Naira (NGN) It might take 5 minutes for the funds
                    to reflect. No need to contact support; it's automated. Your
                    updated balance will be available shortly.
                  </p>
                </Row>
              </Form>
            </Col>
            <Col md={6}>
              <Form className="mb-4">
                <Row className="bank-details">
                  <Col>
                    <div>
                      <img
                        className="sterling__logo"
                        src={sterling_logo}
                        alt=""
                      />
                    </div>

                    <div>
                      <b>Account Name:</b> &nbsp; Sterling Bank Osa
                    </div>
                    <div
                      style={{
                        display: "flex",
                        gap: "0.2rem",
                        alignItems: "center",
                      }}
                    >
                      {" "}
                      <b>Bank Name:</b> &nbsp; Sterling Bank
                      <CopyToClipboard
                        text={"Sterling Bank"}
                        onCopy={() => {
                          toast.success("Copied!");
                        }}
                      >
                        <MdOutlineContentCopy
                          color="white"
                          cursor={"pointer"}
                        />
                      </CopyToClipboard>
                    </div>
                    <div
                      style={{
                        display: "flex",
                        gap: "0.2rem",
                        alignItems: "center",
                      }}
                    >
                      {" "}
                      <b>Account Number:</b>&nbsp; 9031416250
                      <CopyToClipboard
                        text={"9031416250"}
                        onCopy={() => {
                          toast.success("Copied!");
                        }}
                      >
                        <MdOutlineContentCopy
                          color="white"
                          cursor={"pointer"}
                        />
                      </CopyToClipboard>
                    </div>
                  </Col>

                  <p
                    style={{
                      color: "#FFC107",
                      fontWeight: 800,
                    }}
                  >
                    Please Note The account can only receive and send funds in
                    Nigerian Naira (NGN) It might take 5 minutes for the funds
                    to reflect. No need to contact support; it's automated. Your
                    updated balance will be available shortly.
                  </p>
                </Row>
              </Form>
            </Col>
            <Col md={6}>
              <Form className="mb-4">
                <Row className="bank-details">
                  <Col>
                    <div>
                      <img
                        className="moniepoint__logo"
                        src={moniepoint_logo}
                        alt=""
                      />
                    </div>

                    <div>
                      <b>Account Name:</b> &nbsp; Moniepoint Microfinance Bank
                      Osa
                    </div>
                    <div
                      style={{
                        display: "flex",
                        gap: "0.2rem",
                        alignItems: "center",
                      }}
                    >
                      {" "}
                      <b>Bank Name:</b> &nbsp; Moniepoint Microfinance Bank
                      <CopyToClipboard
                        text={"Moniepoint Microfinance Bank"}
                        onCopy={() => {
                          toast.success("Copied!");
                        }}
                      >
                        <MdOutlineContentCopy
                          color="white"
                          cursor={"pointer"}
                        />
                      </CopyToClipboard>
                    </div>
                    <div
                      style={{
                        display: "flex",
                        gap: "0.2rem",
                        alignItems: "center",
                      }}
                    >
                      {" "}
                      <b>Account Number:</b>&nbsp; 635342514
                      <CopyToClipboard
                        text={"635342514"}
                        onCopy={() => {
                          toast.success("Copied!");
                        }}
                      >
                        <MdOutlineContentCopy
                          color="white"
                          cursor={"pointer"}
                        />
                      </CopyToClipboard>
                    </div>
                  </Col>

                  <p
                    style={{
                      color: "#FFC107",
                      fontWeight: 800,
                    }}
                  >
                    Please Note The account can only receive and send funds in
                    Nigerian Naira (NGN) It might take 5 minutes for the funds
                    to reflect. No need to contact support; it's automated. Your
                    updated balance will be available shortly.
                  </p>
                </Row>
              </Form>
            </Col>
          </Row>
        </Card>
      </div>
    </FullLayout>
  );
};

export default AllocateDataMA;
