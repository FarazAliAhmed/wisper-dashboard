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
import { useUser } from "../../context/userContext";

import FullLayout from "../../layouts/FullLayout";
import { allocateData } from "../../services/dataService";
import { handleFailedRequest } from "../../utils";
import dataPlans from "../../utils/plansTable"

const AllocateData = () => {  
  
  const [plan, setPlan] = useState({
    network: "airtel",
    plan_id: "",
    phone_number: "",
  });

  const [serverResponse, setServerResponse] = useState({
    status: true,
    message: "",
  });

  const [loading, setLoading] = useState(false);
  const { user } = useUser();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      await allocateData(plan, user?.access_token);
      setLoading(false);
      setServerResponse({
        status: true,
        message: "Data allocated successfully.",
      });
    } catch (error) {
      setLoading(false);
      const { status, message } = handleFailedRequest(error);
      setServerResponse({ status, message });
      console.log(error);
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
          <Form onSubmit={handleSubmit}>
            <Row form>
              <Col md={6}>
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
                    <option value="mtn">
                      MTN
                    </option>
                  </Input>
                </FormGroup>
              </Col>
              <Col md={6}>
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
                    {dataPlans.filter((singlePlan) => singlePlan.network === plan.network).map((plan) => (
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
              <Col md={6}>
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
            <Button disabled={loading} type="submit" color="primary">
              Allocate
            </Button>
          </Form>
        </Card>
      </div>
    </FullLayout>
  );
};

export default AllocateData;
