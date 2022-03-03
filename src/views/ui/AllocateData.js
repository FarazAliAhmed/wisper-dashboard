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

const AllocateData = () => {
  const dataPlans = [
    {
      "dataId": 221,
      "network": "airtel",
      "size": "500.0 mb",
      "duration": "monthly"
    },
    {
      "dataId": 222,
      "network": "airtel",
      "size": "1.0 gb",
      "duration": "monthly"
    },
    {
      "dataId": 223,
      "network": "airtel",
      "size": "2.0 gb",
      "duration": "monthly"
    },
    {
      "dataId": 224,
      "network": "airtel",
      "size": "5.0 gb",
      "duration": "monthly"
    },
    {
      "dataId": 225,
      "network": "airtel",
      "size": "100.0 mb",
      "duration": "7 days"
    },
    {
      "dataId": 226,
      "network": "airtel",
      "size": "300.0 mb",
      "duration": "7 days"
    }
   ]

   
  // const dataPlans_old = [
  //   {
  //     dataId: "257",
  //     network: "Airtel",
  //     size: "100.0 MB",
  //     duration: "7 days",
  //   },
  //   {
  //     dataId: "258",
  //     network: "Airtel",
  //     size: "300.0 MB",
  //     duration: "7 days",
  //   },
  //   {
  //     dataId: "253",
  //     network: "Airtel",
  //     size: "500.0 MB",
  //     duration: "30 days",
  //   },
  //   // {
  //   //   dataId: "256",
  //   //   network: "Airtel",
  //   //   size: "100.0 MB",
  //   //   duration: "7 days",
  //   // },
  //   {
  //     dataId: "254",
  //     network: "Airtel",
  //     size: "1.0 GB",
  //     duration: "30 days",
  //   },
  //   {
  //     dataId: "255",
  //     network: "Airtel",
  //     size: "2.0 GB",
  //     duration: "30 days",
  //   },
  //   {
  //     dataId: "256",
  //     network: "Airtel",
  //     size: "5.0 GB",
  //     duration: "30 days",
  //   },
  //   // {
  //   //   dataId: "300",
  //   //   network: "Airtel",
  //   //   size: "10.0 GB",
  //   //   duration: "30 days",
  //   // },
  //   // {
  //   //   dataId: "301",
  //   //   network: "Airtel",
  //   //   size: "15.0 GB",
  //   //   duration: "30 days",
  //   // },
  //   // {
  //   //   dataId: "302",
  //   //   network: "Airtel",
  //   //   size: "20.0 GB",
  //   //   duration: "30 days",
  //   // },
  // ];
  
  
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
                    {dataPlans.map((plan) => (
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
