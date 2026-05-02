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
import { toast } from "react-hot-toast";
import axios from "axios";
import { getJwt } from "../../services/authService";

import "./../../assets/scss/custom.scss";

const AllocateDataMA = () => {
  const { user } = useUser();
  const [accountDetails, setAccountDetails] = useState(null);

  useEffect(() => {
    const fetchAccountDetails = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_API_URL}/api/paymentpoint/account-details`,
          { headers: { Authorization: `Bearer ${getJwt()}` } }
        );
        if (response.data.success && response.data.data) {
          setAccountDetails(response.data.data);
        }
      } catch (error) {
        // No account yet
      }
    };
    fetchAccountDetails();
  }, []);

  const bankAccounts = accountDetails?.accounts || [];

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

            {bankAccounts.length > 0 ? (
              bankAccounts.map((item, index) => (
                <Col md={12} key={index}>
                  <Form className="mb-4">
                    <Row className="bank-details">
                      <Col>
                        <div
                          style={{
                            display: "flex",
                            gap: "0.2rem",
                            alignItems: "center",
                          }}
                        >
                          <b>Account Name:</b> &nbsp;{item.accountName}
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
                            onCopy={() => toast.success("Copied!")}
                          >
                            <MdOutlineContentCopy color="black" cursor={"pointer"} />
                          </CopyToClipboard>
                        </div>
                        <div
                          style={{
                            display: "flex",
                            gap: "0.2rem",
                            alignItems: "center",
                          }}
                        >
                          <b>Account Number:</b>&nbsp; {item.accountNumber}
                          <CopyToClipboard
                            text={item.accountNumber}
                            onCopy={() => toast.success("Copied!")}
                          >
                            <MdOutlineContentCopy color="black" cursor={"pointer"} />
                          </CopyToClipboard>
                        </div>
                      </Col>
                    </Row>
                  </Form>
                </Col>
              ))
            ) : (
              <Col md={12}>
                <p className="text-muted">
                  No virtual account found. Please create one from the Wallet page.
                </p>
              </Col>
            )}
          </Row>
          <p style={{ color: "#333333" }}>
            Please Note:
            <ul>
              <li>The account can only receive and send funds in Nigerian Naira (NGN).</li>
              <li>It might take 5 minutes for the funds to reflect.</li>
              <li>No need to contact support; it's automated.</li>
              <li>Your updated balance will be available shortly.</li>
            </ul>
          </p>
        </Card>
      </div>
    </FullLayout>
  );
};

export default AllocateDataMA;
