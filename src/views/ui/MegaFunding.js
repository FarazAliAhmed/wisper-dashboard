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
  const [loading, setLoading] = useState(false);
  const { user } = useUser();

  const bankAccounts = user?.bankAccounts;

  return (
    <FullLayout>
      <div>
        <h5 className="mb-4 mt-3">Fund your wallet via bank transfer</h5>
        <Card body>
          <Row>
            <Row form>{/* <Col md={12}></Col> */}</Row>
            <p>
              To add funds, make a payment to this dedicated account. Your
              wallet will be automatically credited.
              <p>
                <b>₦50</b> Fee per Bank Transfer Applies
              </p>
            </p>

            {bankAccounts &&
              bankAccounts.map((item, index) => (
                <Col md={12}>
                  <Form className="mb-4">
                    <Row className="bank-details">
                      <Col>
                        <div></div>
                        {item.bankName == "Wema bank" && (
                          <img className="wema__logo" src={wema_logo} alt="" />
                        )}
                        {item.bankName == "Sterling bank" && (
                          <img
                            className="sterling__logo"
                            src={sterling_logo}
                            alt=""
                          />
                        )}
                        {item.bankName == "Moniepoint Microfinance Bank" && (
                          <img
                            className="moniepoint__logo"
                            src={moniepoint_logo}
                            alt=""
                          />
                        )}

                        <div
                          style={{
                            display: "flex",
                            gap: "0.2rem",
                            alignItems: "center",
                          }}
                        >
                          <b>Account Name:</b> &nbsp;PaymentPoint / Wisper Media Solutions
                          Limited-{item.accountName}
                        </div>
                        <div
                          style={{
                            display: "flex",
                            gap: "0.2rem",
                            alignItems: "center",
                          }}
                        >
                          <b>Bank Name:</b> &nbsp; {item.bankName}
                          <CopyToClipboard
                            text={item.bankName}
                            onCopy={() => {
                              toast.success("Copied!");
                            }}
                          >
                            <MdOutlineContentCopy
                              color="black"
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
                          <b>Account Number:</b>&nbsp; {item.accountNumber}
                          <CopyToClipboard
                            text={item.accountNumber}
                            onCopy={() => {
                              toast.success("Copied!");
                            }}
                          >
                            <MdOutlineContentCopy
                              color="black"
                              cursor={"pointer"}
                            />
                          </CopyToClipboard>
                        </div>
                      </Col>
                    </Row>
                  </Form>
                </Col>
              ))}
          </Row>
          <p
            style={{
              color: "#333333",
            }}
          >
            Please Note:
            <ul>
              <li>
                The account can only receive and send funds in Nigerian Naira
                (NGN).
              </li>
              <li> It might take 5 minutes for the funds to reflect.</li>
              <li> No need to contact support; it's automated.</li>
              <li> Your updated balance will be available shortly.</li>
            </ul>
          </p>
        </Card>
      </div>
    </FullLayout>
  );
};

export default AllocateDataMA;
