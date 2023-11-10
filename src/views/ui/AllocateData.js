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
import { allocateData } from "../../services/dataService";
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

const initialState = {
  network: "airtel",
  plan_id: "",
  phone_number: "",
};

const AllocateData = () => {
  const [plan, setPlan] = useState(initialState);

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

      if (plan.price) {
        const res = await allocateData(plan, user?.access_token);
        setLoading(false);
        setPlan(initialState);
        // setServerResponse({status: true, message: "Data allocated successfully."});
        setErrors({});
        return { status: true, message: res.data.gateway_response };
      } else {
        toast.info("Contact Admin To Set Plan Price", {
          position: toast.POSITION.TOP_RIGHT,
        });
        setLoading(false);
        return;
      }
      // setServerResponse({status: true, message: "Data allocated successfully."});
    } catch (error) {
      toast.error("An Error Occured Try Again", {
        position: toast.POSITION.TOP_RIGHT,
      });
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

    // console.log("name", name)
    // console.log("value", value)
    // console.log("value", value)

    // console.log(dataPlans)
    // Assuming the object array is called 'dataPlans'
    const matchedItem = dataPlans.find((item) => item.id == value);

    // console.log("matchedItem", matchedItem)

    if (matchedItem && name === "plan_id") {
      const { size, price } = matchedItem;
      const updatedPlan = { ...plan, [name]: value, volume: size, price };
      setPlan(updatedPlan);
      setErrors(validationErrors);

      console.log("Updated Plan:", updatedPlan);
    } else {
      setPlan({ ...plan, [name]: value });
      setErrors(validationErrors);

      // console.log('Updated Plan:', plan); // Log the original plan object
    }
  };

  console.log(plansUser);

  return (
    <FullLayout>
      <div>
        <ToastContainer />
        <div className="data__heading">
          <h5 className="mb-4 mt-3">Allocate Data</h5>
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
                              key={`${plan.network}-${plan.id}`}
                              value={plan.id}
                            >
                              {plan.size} ({plan.validity})
                            </option>
                          ))}
                      </Input>
                    </FormGroup>
                  </Col>
                  <Col md={12}>
                    <FormGroup>
                      <Label for="cost">Cost</Label>
                      <Input
                        value={plan.price && `₦${plan.price}`}
                        id="phone_number"
                        name="cost"
                        disabled
                        onChange={handleChange}
                        type="text"
                      />
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
                </Row>

                <AllocateButton
                  setLoading={setLoading}
                  loading={loading}
                  handleSubmit={handleSubmit}
                  plan_id={plan.plan_id}
                  phone_number={plan.phone_number}
                  plans={plansUser}
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

export default AllocateData;
