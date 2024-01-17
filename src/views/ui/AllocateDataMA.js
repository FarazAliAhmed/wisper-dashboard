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

import FullLayout from "../../layouts/FullLayout";
import { allocateData } from "../../services/dataService";
import {
  formIsValid,
  handleFailedRequest,
  parseDataPlans,
  validateProperty,
} from "../../utils";
// import dataPlans from "../../utils/plansTable";

import "./../../assets/scss/custom.scss";

const initialState = {
  network: "airtel",
  plan_id: "",
  phone_number: "",
};

const AllocateDataMA = () => {
  const [plan, setPlan] = useState(initialState);
  const [errors, setErrors] = useState({});

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
      console.log("res", res);
      setLoading(false);
      setPlan(initialState);
      // setServerResponse({status: true, message: "Data allocated successfully."});
      setErrors({});
      return { status: true, message: res.data.gateway_response };
    } catch (error) {
      console.log("error.response.data.message:", error.response.data.message);
      setLoading(false);
      const { status, message } = handleFailedRequest(error);
      return { status, message };
      // setServerResponse({ status, message });
    }
  };

  const handleChange = ({ currentTarget: input }) => {
    const validationErrors = { ...errors };
    const errorMessage = validateProperty(input);
    if (errorMessage) validationErrors[input.name] = errorMessage;
    else delete validationErrors[input.name];

    const { name, value } = input;
    setPlan({ ...plan, [name]: value });
    setErrors(validationErrors);
  };

  console.log(errors, "errors");
  return (
    <FullLayout>
      <div>
        <h5 className="mb-4 mt-3">Allocate Data Mega</h5>
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
                      <Label for="plan_id">Data Plan</Label>
                      <Input
                        onChange={handleChange}
                        name="plan_id"
                        value={plan.plan_id}
                        className="mb-3"
                        type="select"
                      >
                        <option>---Select plan ---</option>
                        {dataPlans
                          .filter(
                            (singlePlan) => singlePlan.network === plan.network
                          )
                          .map((plan) => (
                            <option
                              key={`${plan.network}-${plan.dataId}`}
                              value={plan.dataId}
                            >
                              {plan.size} ({plan.duration})
                            </option>
                          ))}
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
                        required
                        type="number"
                      />
                      <FormFeedback>{errors.phone_number}</FormFeedback>
                    </FormGroup>
                  </Col>
                </Row>

                <AllocateButton
                  setLoading={setLoading}
                  loading={loading}
                  handleSubmit={handleSubmit}
                  plan_id={plan.plan_id}
                  phone_number={plan.phone_number}
                  plans={plans}
                  valid={formIsValid(errors)}
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
                    <div className="py-2 border-bottom">
                      MTN *321*3*3# or *312*5#
                    </div>
                    <div className="py-2 border-bottom">Airtel CG *140#</div>
                    <div className="py-2 border-bottom">GLO *127*0#</div>
                    <div className="py-2 border-bottom">9Mobile *228#</div>
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

export default AllocateDataMA;
