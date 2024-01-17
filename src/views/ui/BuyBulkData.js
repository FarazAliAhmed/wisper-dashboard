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

import AllocateButton from "../../components/AllocateButton";
import { useUser } from "../../context/userContext";
import { useAppState } from "../../context/appContext";

import FullLayout from "../../layouts/FullLayout";
import {
  allocateData,
  getMegaMaintenance,
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

const initialState = {
  network: "airtel",
  plan_id: "",
  phone_number: "",
};

const BuyBulkData = () => {
  const [plan, setPlan] = useState(initialState);
  const [confirmState, setConfirmState] = useState(false);
  const {
    megaPriceUser,
    currentBalance: { volume, unit, cash, mega_wallet },
  } = useAppState();

  // const [serverResponse, setServerResponse] = useState({
  //   status: true,
  //   message: "",
  // });
  const [maintenance, setMaintenance] = useState("");

  const [loading, setLoading] = useState(false);
  const [bucketValue, setBucketValue] = useState("glo");
  const [costValue, setCostValue] = useState("");
  const [amountValue, setAmountValue] = useState("");
  const { user } = useUser();

  const { plansUser } = useAppState();
  const dataPlans = parseDataAllocatePlans(plansUser);

  // console.log("dataPlans", dataPlans)

  useEffect(async () => {
    const getMegaMaintenanceFunc = async () => {
      // setLoading(true);
      const resp = await getMegaMaintenance();
      setMaintenance(resp?.data?.maintenance);
      // setSubDealers(resp);
      // setLoading(false);
    };

    getMegaMaintenanceFunc();
  }, []);

  const handleSubmit = async (e) => {
    // e.preventDefault();
    if (cash >= costValue) {
      try {
        setLoading(true);

        await purchaseMegaPrice(
          {
            business_id: user?._id,
            network: bucketValue,
            amountInGB: amountValue,
          },
          user?.access_token
        );
        setLoading(false);
        // setPlan(initialState);
        toast.success("data successfully purchased");
        window.location.reload();

        return { status: true, message: "Data allocated successfully." };
      } catch (error) {
        setLoading(false);
        toast.error("error purchasing");
        const { status, message } = handleFailedRequest(error);
        return { status, message };
        // setServerResponse({ status, message });
      }
    } else {
      toast.error("Insufficient Funds");
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
          <h5 className="mb-4 mt-3">Buy Bulk Data</h5>
          <h5
            // style={{
            //   fontSize: "17px",
            // }}
            className="mb-4 mt-3"
          >
            <img src={wallIcon} /> ₦{cash}
          </h5>
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
                        {!maintenance["airtel"] && (
                          <option value="airtel">
                            AIRTEL: {Number(mega_wallet.airtel) / 1000}GB
                          </option>
                        )}
                        {!maintenance["glo"] && (
                          <option value="glo">
                            GLO: {Number(mega_wallet.glo) / 1000}GB{" "}
                          </option>
                        )}
                        {!maintenance["9mobile"] && (
                          <option value="9mobile">
                            9MOBILE: {Number(mega_wallet["9mobile"]) / 1000}GB{" "}
                          </option>
                        )}
                        {!maintenance["mtn_gifting"] && (
                          <option value="mtn_gifting">
                            MTN GIFTING:{" "}
                            {Number(mega_wallet.mtn_gifting) / 1000}
                            GB
                          </option>
                        )}
                        {!maintenance["mtn_sme"] && (
                          <option value="mtn_sme">
                            MTN[SME]: {Number(mega_wallet.mtn_sme) / 1000}GB
                          </option>
                        )}
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
                  <Col md={12}>
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
                  </Col>
                </Row>

                <PurchaseButton
                  setLoading={setLoading}
                  loading={loading}
                  handleSubmit={handleSubmit}
                  amount={amountValue}
                  cost={costValue}
                  megaPrices={megaPriceUser}
                  bucket={bucketValue}
                />
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
                <p>Data Price / GB</p>
                <Card className="shadow-none code-balance">
                  <CardBody>
                    <div className="py-2 border-bottom">
                      MTN [SME]:{" "}
                      {!maintenance["mtn_sme"]
                        ? ` ₦${megaPriceUser.mtn_sme}`
                        : "unavailable"}
                    </div>
                    <div className="py-2 border-bottom">
                      GLO:{" "}
                      {!maintenance["glo"]
                        ? ` ₦${megaPriceUser.glo}`
                        : "unavailable"}
                    </div>
                    <div className="py-2 border-bottom">
                      MTN CG:{" "}
                      {!maintenance["mtn_gifting"]
                        ? ` ₦${megaPriceUser.mtn_gifting}`
                        : "unavailable"}
                    </div>
                    <div className="py-2 border-bottom ">
                      9MOBILE:{" "}
                      {!maintenance["9mobile"]
                        ? ` ₦${megaPriceUser["9mobile"]}`
                        : "unavailable"}
                    </div>
                    <div className="py-2 ">
                      Airtel:{" "}
                      {!maintenance["airtel"]
                        ? ` ₦${megaPriceUser.airtel}`
                        : "unavailable"}
                    </div>
                  </CardBody>
                </Card>
              </div>
            </Col>
          </Row>
        </Card>
        <PurchaseHistory />
      </div>
    </FullLayout>
  );
};

export default BuyBulkData;
