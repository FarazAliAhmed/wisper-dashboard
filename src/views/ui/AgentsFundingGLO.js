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
  Button,
  Modal,
  ModalBody,
  ModalFooter,
  // UncontrolledAlert,
  // Button,
} from "reactstrap";
import { Link } from "react-router-dom";

import AllocateButton from "../../components/AllocateButton";
import { useUser } from "../../context/userContext";
import { useAppState } from "../../context/appContext";

import FullLayout from "../../layouts/FullLayout";
import {
  allocateData,
  allocateAgentsPrice,
  getAgentsInfo,
  purchaseMegaPrice,
} from "../../services/dataService";
import {
  handleFailedRequest,
  parseDataAllocatePlans,
  parseDataPlans,
} from "../../utils";
// import dataPlans from "../../utils/plansTable";
import airtel from "../../assets/images/icons/airtel.png";
import mtn from "../../assets/images/icons/mtn.png";
import glo from "../../assets/images/icons/glo.png";
import etisalat from "../../assets/images/icons/etisalat.png";
import wallIcon from "../../assets/dashboard/walle.svg";

import "./../../assets/scss/custom.scss";
import { toast } from "react-hot-toast";
import PurchaseButton from "../../components/PurchaseButton";
import { set } from "lodash";
import PurchaseHistory from "../../components/PurchaseHistory";
import { useParams } from "react-router-dom";
import AgentsPurchaseButton from "../../components/AgentsPurchaseButton";
import AllAgentsPurchaseHistory from "../../components/AllAgentsPurchaseHistory";

const initialState = {
  network: "airtel",
  plan_id: "",
  phone_number: "",
};

const AgentsFundingGLO = () => {
  const { businessId } = useParams();

  const [plan, setPlan] = useState(initialState);
  const [confirmState, setConfirmState] = useState(false);
  const [agents, setAgents] = useState({});

  const {
    megaPriceUser,
    currentBalance: { volume, unit, cash, mega_wallet },
  } = useAppState();

  // const [serverResponse, setServerResponse] = useState({
  //   status: true,
  //   message: "",
  // });

  const [loading, setLoading] = useState(false);
  const [bucketValue, setBucketValue] = useState("glo");
  const [costValue, setCostValue] = useState("");
  const [amountValue, setAmountValue] = useState("");
  const { user } = useUser();

  const { plansUser } = useAppState();
  const dataPlans = parseDataAllocatePlans(plansUser);

  // console.log("dataPlans", dataPlans)

  // useEffect(() => {
  //   parseDataPlans(plans)
  // }, [])
  const handleGetAgentsInfo = async () => {
    const resp = await getAgentsInfo({
      userId: businessId,
    });
    setAgents(resp?.subdealers);
  };

  useEffect(() => {
    handleGetAgentsInfo();
  }, []);

  const handleSubmit = async (e) => {
    // e.preventDefault();
    try {
      setLoading(true);

      await allocateAgentsPrice(
        {
          dealer: user._id,
          business_id: businessId,
          network: bucketValue,
          amountInGB: amountValue,
        },
        user?.access_token
      );
      setLoading(false);
      // setPlan(initialState);
      toast.success("data successfully allocated");
      window.location.reload();

      return { status: true, message: "Data allocated successfully." };
    } catch (error) {
      setLoading(false);
      toast.error("error allocating");
      const { status, message } = handleFailedRequest(error);
      return { status, message };
      // setServerResponse({ status, message });
    }
  };

  const handleChange = (e) => {
    const value = e.target.value;
    setBucketValue(value);
    setAmountValue("");
    setCostValue("");
  };

  const handleAmountChange = (e) => {
    const value = e.target.value;
    setAmountValue(value);
    if (bucketValue == "glo") {
      setCostValue(megaPriceUser.glo * value);
    } else if (bucketValue == "mtn_sme") {
      setCostValue(megaPriceUser.mtn_sme * value);
    } else if (bucketValue == "mtn_gifting") {
      setCostValue(megaPriceUser.mtn_gifting * value);
    } else if (bucketValue == "airtel") {
      setCostValue(megaPriceUser.airtel * value);
    } else if (bucketValue == "9mobile") {
      setCostValue(megaPriceUser["9mobile"] * value);
    }
  };

  return (
    <FullLayout>
      <div>
        <div className="data__heading">
          {" "}
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              gap: "0.5rem",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Link to={`/agents/business/${businessId}`}>
              <Button color="primary">Back</Button>
            </Link>{" "}
            <h5 className="mb-4 mt-3">Fund Data Bucket</h5>
          </div>
          {/* <h5
            // style={{
            //   fontSize: "17px",
            // }}
            className="mb-4 mt-3"
          >
            <img src={wallIcon} /> ₦{cash}
          </h5> */}
        </div>

        <Card body>
          {/* {serverResponse.message.length > 0 && (
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
          )} */}
          <Row>
            <Col md={7}>
              <Form className="mb-4">
                <Row form>
                  <Col md={12}>
                    <FormGroup>
                      <Label for="amount">Name of Agent</Label>
                      <Input
                        value={agents?.name}
                        id="name"
                        name="name"
                        readOnly
                        // onChange={handleAmountChange}
                        type="text"
                      />
                    </FormGroup>
                  </Col>
                  <Col md={12}>
                    <FormGroup>
                      <Label for="network">Select Bucket</Label>
                      <Input
                        onChange={handleChange}
                        name="network"
                        value={bucketValue}
                        className="mb-3"
                        type="select"
                      >
                        <option selected disabled>
                          ---Select Bucket---
                        </option>
                        <option value="glo">GLO</option>
                      </Input>
                    </FormGroup>
                  </Col>

                  <Col md={12}>
                    <FormGroup>
                      <Label for="amount">Amount in GB</Label>
                      <Input
                        value={amountValue}
                        id="amount"
                        name="amount"
                        onChange={handleAmountChange}
                        type="number"
                      />
                    </FormGroup>
                  </Col>
                  {/* <Col md={12}>
                    <FormGroup>
                      <Label for="cost">Cost of Data</Label>
                      <Input
                        value={costValue}
                        id="cost"
                        name="cost"
                        onChange={handleAmountChange}
                        type="number"
                        readOnly
                      />
                    </FormGroup>
                  </Col> */}
                </Row>
                {Number(mega_wallet[bucketValue]) / 1000 >=
                Number(amountValue) ? (
                  <AgentsPurchaseButton
                    setLoading={setLoading}
                    loading={loading}
                    handleSubmit={handleSubmit}
                    bucket={bucketValue}
                    balances={mega_wallet}
                    data={{
                      dealer: user._id,
                      name: agents?.name,
                      business_id: businessId,
                      network: bucketValue,
                      amountInGB: amountValue,
                    }}
                  />
                ) : (
                  <p
                    style={{
                      color: "red",
                    }}
                  >
                    insufficient {bucketValue} data
                  </p>
                )}
                {/* toast.error(`insufficient ${bucket} data `); */}

                {/* <Button
                  onClick={(e) => {
                    e.preventDefault();
                    setConfirmState(true);
                  }}
                  disabled={loading}
                  type="submit"
                  color="primary"
                >
                  Purchase
                </Button> */}
              </Form>
            </Col>
            <Col md={5}>
              <div>
                <p>Bucket Balances</p>
                <Card className="shadow-none code-balance">
                  <CardBody>
                    <div className="py-2 border-bottom">
                      GLO: {Number(mega_wallet.glo) / 1000}GB{" "}
                    </div>
                  </CardBody>
                </Card>
              </div>
            </Col>
          </Row>
        </Card>
        <AllAgentsPurchaseHistory />
      </div>
    </FullLayout>
  );
};

export default AgentsFundingGLO;
