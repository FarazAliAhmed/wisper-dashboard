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
  FormFeedback,
  // UncontrolledAlert,
  // Button,
} from "reactstrap";
import AllocateButton from "../../components/AllocateButton";
import { useUser } from "../../context/userContext";
import { useAppState } from "../../context/appContext";
import wallIcon from "../../assets/dashboard/walle.svg";

import "./../../assets/scss/custom.scss";
import FullLayout from "../../layouts/FullLayout";
import { allocateAirtime, allocateData } from "../../services/dataService";
import {
  formIsValid,
  handleFailedRequest,
  parseDataAllocatePlans,
  parseDataPlans,
  validateProperty,
} from "../../utils";
// import dataPlans from "../../utils/plansTable";

import "./../../assets/scss/custom.scss";
import { ToastContainer, toast } from "react-toastify";
import AllocateAirtimeButton from "../../components/AllocateAirtimeButton";

const initialState = {
  network: "airtel",
  airtime_volume: "",
  phone_number: "",
};

const AllocateData = () => {
  const [plan, setPlan] = useState(initialState);
  const [costError, setCostError] = useState(null);

  const [errors, setErrors] = useState({});
  const [serverResponse, setServerResponse] = useState({
    status: true,
    message: "",
  });
  const {
    megaPriceUser,
    currentBalance: { volume, unit, cash, mega_wallet },
  } = useAppState();

  const [loading, setLoading] = useState(false);
  const { user } = useUser();

  const { plansUser } = useAppState();
  const dataPlans = parseDataAllocatePlans(plansUser);

  // console.log("dataPlans", dataPlans)

  // useEffect(() => {
  //   parseDataPlans(plans)
  // }, [])

  const handleSubmit = async (e) => {
    // e.preventDefault();
    try {
      setLoading(true);

      // console.log("plan", plan)
      const { airtime_volume, ...rest } = plan;

      const res = await allocateAirtime(
        {
          ...rest,
          volume: airtime_volume,
          price: airtime_volume,
          email: user?.email,
          name: user?.name,
        },
        user?.access_token
      );
      setLoading(false);
      setPlan(initialState);
      return res.data;
    } catch (error) {
      const message = error.response.data;
      console.log(error.response.data);
      return message;
      // setServerResponse({ status, message });
    }
  };

  const handleChange = ({ currentTarget: input }) => {
    const validationErrors = { ...errors };
    const errorMessage = validateProperty(input);
    if (errorMessage) validationErrors[input.name] = errorMessage;
    else delete validationErrors[input.name];

    const { name, value } = input;

    const updatedPlan = { ...plan, [name]: value };
    setPlan(updatedPlan);
    setErrors(validationErrors);
  };

  useEffect(() => {
    // console.log(cash, "lsls");
    if (plan.airtime_volume > cash) {
      setCostError("Insufficient funds. Fund your wallet to proceed");
    } else {
      setCostError(null);
    }
  }, [plan.airtime_volume]);

  return (
    <FullLayout>
      <div>
        <ToastContainer />
        <div className="data__heading">
          <h5 className="mb-4 mt-3">Purchase Airtime</h5>
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
                      <Label for="network">Network Provider</Label>
                      <Input
                        onChange={handleChange}
                        name="network"
                        value={plan.network}
                        className="mb-3"
                        type="select"
                      >
                        <option disabled>---Select network ---</option>
                        <option selected value="airtel">
                          Airtel
                        </option>
                        <option value="glo">GLO</option>
                        <option value="mtn">MTN</option>
                        <option value="9mobile">9MOBILE</option>
                      </Input>
                    </FormGroup>
                  </Col>
                  <Col md={12}>
                    <FormGroup>
                      <Label for="phone_number">Phone Number</Label>
                      <Input
                        value={plan.phone_number}
                        invalid={errors.phone_number}
                        id="phone_number"
                        name="phone_number"
                        onChange={handleChange}
                        type="number"
                      />
                      <FormFeedback>{errors.phone_number}</FormFeedback>
                    </FormGroup>
                  </Col>
                  <Col md={12}>
                    <FormGroup>
                      <Label for="airtime_volume">Amount</Label>
                      <Input
                        value={plan.airtime_volume}
                        invalid={errors.airtime_volume}
                        id="airtime_volume"
                        name="airtime_volume"
                        onChange={handleChange}
                        type="number"
                      />{" "}
                      <FormFeedback>{errors.airtime_volume}</FormFeedback>
                    </FormGroup>
                  </Col>

                  <Col md={12}>
                    <FormGroup>
                      <Label for="airtime_volume">
                        Cost{" "}
                        {user?.type == "mega"
                          ? "(Enjoy 2% Cashback)"
                          : "(Enjoy 1.5% Cashback)"}
                      </Label>
                      <Input
                        value={`₦${
                          user?.type == "mega"
                            ? plan.airtime_volume - 0.025 * plan.airtime_volume
                            : plan.airtime_volume - 0.015 * plan.airtime_volume
                        }`}
                        id="airtime_volume"
                        name="airtime_volume"
                        disabled
                        invalid={costError}
                        type="text"
                      />{" "}
                      <FormFeedback>{costError}</FormFeedback>
                    </FormGroup>
                  </Col>
                </Row>

                <AllocateAirtimeButton
                  setLoading={setLoading}
                  loading={loading}
                  handleSubmit={handleSubmit}
                  volume={plan.airtime_volume}
                  phone_number={plan.phone_number}
                  valid={formIsValid(errors) || costError}
                  network={plan.network}
                />

                {/* <Button disabled={loading} type="submit" color="primary">
              Allocate
            </Button> */}
              </Form>
            </Col>
            <Col md={5}>
              <div>
                <p>Code For Data Balance</p>
                <Card className="shadow-none code-balance">
                  <CardBody>
                    <div className="py-2 border-bottom">MTN *310#</div>
                    <div className="py-2 border-bottom">Airtel *310#</div>
                    <div className="py-2 border-bottom">GLO *310#</div>
                    <div className="py-2 border-bottom">9Mobile *310#</div>
                  </CardBody>
                </Card>
              </div>
            </Col>
          </Row>
        </Card>
      </div>
    </FullLayout>
  );
};

export default AllocateData;
