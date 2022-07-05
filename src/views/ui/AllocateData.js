import { useState, useEffect } from "react";
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
  CardBody,
} from "reactstrap";
import AllocateButton from "../../components/AllocateButton";
import { useUser } from "../../context/userContext";
import { useAppState } from "../../context/appContext";

import FullLayout from "../../layouts/FullLayout";
import { allocateData } from "../../services/dataService";
import { handleFailedRequest, parseDataPlans } from "../../utils";
// import dataPlans from "../../utils/plansTable";

import "./../../assets/scss/custom.scss";

const initialState = {
  network: "airtel",
  plan_id: "",
  phone_number: "",
};

const AllocateData = () => {
  const [plan, setPlan] = useState(initialState);

  const [serverResponse, setServerResponse] = useState({
    status: true,
    message: "",
  });

  const [loading, setLoading] = useState(false);
  const { user } = useUser();

  const { plans } = useAppState()
  const dataPlans = parseDataPlans(plans)

  // useEffect(() => {
  //   parseDataPlans(plans)
  // }, [])

  const handleSubmit = async (e) => {
    // e.preventDefault();
    try {
      setLoading(true);
      await allocateData(plan, user?.access_token);
      setLoading(false);
      setPlan(initialState);
      return {status: true, message: "Data allocated successfully."};
      // setServerResponse({status: true, message: "Data allocated successfully."});
    }catch (error) {
      setLoading(false);
      const { status, message } = handleFailedRequest(error);
      return {status, message};
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
        <h5 className="mb-4 mt-3">Allocate Data</h5>
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
                        <option value="mtn">MTN</option>
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
                              {plan.size} ({plan.duration}) - {plan.plan_type}
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
                        id="phone_number"
                        name="phone_number"
                        onChange={handleChange}
                        type="number"
                      />
                    </FormGroup>
                  </Col>
                </Row>

                <AllocateButton
                  setLoading={setLoading}
                  loading={loading}
                  handleSubmit={handleSubmit}
                  plan_id={plan.plan_id}
                  phone_number={plan.phone_number}
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
                    <div className="py-2 border-bottom">MTN [SME] *461*4#</div>
                    <div className="py-2 border-bottom">
                      MTN [Gifting] *131*4# or *460*260#
                    </div>
                    <div className="py-2 ">Airtel *140#</div>
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
