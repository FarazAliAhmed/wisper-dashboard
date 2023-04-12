import { useState } from "react";
import "./../../assets/scss/custom.scss";
import {
  Card,
  Form,
  FormGroup,
  Label,
  Input,
  Row,
  Col,
  CardBody,
} from "reactstrap";
import AllocateButton from "../../components/AllocateButton";
import { useAppState } from "../../context/appContext";
import { useUser } from "../../context/userContext";

import AdminLayout from "../../layouts/AdminLayout";
import { allocateData } from "../../services/dataService";
import { handleFailedRequest, parseDataPlans } from "../../utils";
// import dataPlans from "../../utils/plansTable";


const initialState = {
  network: "airtel",
  plan_id: "",
  phone_number: "",
  allocate_for_business: false,
  business_id: "",
};

const AllocateData = () => {
  const [plan, setPlan] = useState(initialState);

  const { plans } = useAppState()
  const dataPlans = parseDataPlans(plans)

  // const [serverResponse, setServerResponse] = useState({
  //   status: true,
  //   message: "",
  // });

  const [loading, setLoading] = useState(false);
  const { user } = useUser();

  const handleSubmit = async (e) => {
    // e.preventDefault();
    try {
      setLoading(true);
      await allocateData(plan, user?.access_token);
      setLoading(false);
      setPlan(initialState);
      return { status: true, message: "Data allocated successfully." };
      // setServerResponse({status: true, message: "Data allocated successfully."});
    } catch (error) {
      setLoading(false);
      const { status, message } = handleFailedRequest(error);
      return { status, message };
      // setServerResponse({ status, message });
    }
  };

  const handleChange = ({ currentTarget: input }) => {
    const { name, type, value, checked } = input;

    if (type === "checkbox") {
      return setPlan({ ...plan, allocate_for_business: checked });
    }

    setPlan({ ...plan, [name]: value });
  };

  return (
    <AdminLayout>
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
                  <Col md={12}>
                    <FormGroup check>
                      <Label check>Allocating for a business?</Label>
                      <Input
                        name="allocate_for_business"
                        onChange={handleChange}
                        type="checkbox"
                      />
                    </FormGroup>
                  </Col>
                  {plan?.allocate_for_business && (
                    <Col md={12}>
                      <FormGroup>
                        <Label for="businessId">Business Id</Label>
                        <Input
                          onChange={handleChange}
                          required
                          name="business_id"
                          // value={values.business_id}
                          className="mb-3"
                          type="text"
                          placeholder="Enter business Id"
                        ></Input>
                      </FormGroup>
                    </Col>
                  )}
                </Row>

                <AllocateButton
                  setLoading={setLoading}
                  loading={loading}
                  handleSubmit={handleSubmit}
                  plan_id={plan.plan_id}
                  phone_number={plan.phone_number}
                  plans={plans}
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
    </AdminLayout>
  );
};

export default AllocateData;
