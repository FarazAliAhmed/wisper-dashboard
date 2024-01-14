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
  // UncontrolledAlert,
  // Button,
} from "reactstrap";
import AllocateButton from "../../components/AllocateButton";
import { useUser } from "../../context/userContext";
import { useAppState } from "../../context/appContext";

import FullLayout from "../../layouts/FullLayout";
import AdminLayout from "../../layouts/AdminLayout";
import {
  allocateData,
  getUserMegaPrice,
  updateMegaPrice,
} from "../../services/dataService";
import { handleFailedRequest, parseDataPlans } from "../../utils";
// import dataPlans from "../../utils/plansTable";

import "./../../assets/scss/custom.scss";
import { useParams } from "react-router-dom";
import UpdateMegaPrice from "../../components/pages/UpdateMegaPriceAdmin";
import toast from "react-hot-toast";

const initialState = {
  id: "airtel",
  plan_id: "",
  phone_number: "",
};

const Pricing = () => {
  const { id } = useParams();
  const initialState = {
    business_id: id,
    mtn_sme: "",
    mtn_gifting: "",
    airtel: "",
    glo: "",
    "9mobile": "",
  };

  const [planState, setPlanState] = useState(initialState);
  const [plan, setPlan] = useState(initialState);

  // const [serverResponse, setServerResponse] = useState({
  //   status: true,
  //   message: "",
  // });

  const [loading, setLoading] = useState(false);
  const { user } = useUser();

  const { plans } = useAppState();
  const dataPlans = parseDataPlans(plans);

  useEffect(() => {
    const getUserMegaPriceFunc = async () => {
      await getUserMegaPrice(id).then((res) => {
        if (res) {
          const data = res.data;
          setPlan({
            business_id: data.business_id,
            mtn_sme: data.mtn_sme,
            mtn_gifting: data.mtn_gifting,
            airtel: data.airtel,
            "9mobile": data["9mobile"],
            glo: data.glo,
          });
        }
      });
    };

    getUserMegaPriceFunc();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      await updateMegaPrice(plan, user?.access_token);
      setLoading(false);
      console.log("success");
      toast.success("successfully updated");

      return { status: true, message: "Mega Price updated successfully." };
      // setServerResponse({status: true, message: "Data allocated successfully."});
    } catch (error) {
      setLoading(false);
      const { status, message } = handleFailedRequest(error);
      console.log("error", error);
      toast.error("error updating");
      return { status, message };

      // setServerResponse({ status, message });
    }
  };

  const handleChange = ({ currentTarget: input }) => {
    const { name, value } = input;
    setPlan({ ...plan, [name]: value });
  };

  return (
    // <AdminLayout>
    //   <UpdateMegaPrice userId={id} />
    // </AdminLayout>
    <AdminLayout>
      <div>
        <h5 className="mb-4 mt-3">Edit User Mega Price</h5>
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
            <Col md={12}>
              <Form className="mb-4">
                <Row form>
                  <Col md={12}>
                    <FormGroup>
                      <Label for="mtn_sme">MTN SME (per 1GB)</Label>
                      <Input
                        id="mtn_sme"
                        name="mtn_sme"
                        onChange={handleChange}
                        type="number"
                        value={plan?.mtn_sme}
                      />
                    </FormGroup>
                  </Col>
                  <Col md={12}>
                    <FormGroup>
                      <Label for="mtn_gifting">MTN GIFTING (per 1GB)</Label>
                      <Input
                        value={plan.mtn_gifting}
                        id="mtn_gifting"
                        name="mtn_gifting"
                        onChange={handleChange}
                        type="number"
                      />
                    </FormGroup>
                  </Col>
                  <Col md={12}>
                    <FormGroup>
                      <Label for="airtel">AIRTEL (per 1GB)</Label>
                      <Input
                        value={plan.airtel}
                        id="airtel"
                        name="airtel"
                        onChange={handleChange}
                        type="number"
                      />
                    </FormGroup>
                  </Col>
                  <Col md={12}>
                    <FormGroup>
                      <Label for="glo">GLO (per 1GB)</Label>
                      <Input
                        value={plan.glo}
                        id="glo"
                        name="glo"
                        onChange={handleChange}
                        type="number"
                      />
                    </FormGroup>
                  </Col>
                  <Col md={12}>
                    <FormGroup>
                      <Label for="9mobilr">9MOBILE (per 1GB)</Label>
                      <Input
                        value={plan["9mobile"]}
                        id="9mobile"
                        name="9mobile"
                        onChange={handleChange}
                        type="number"
                      />
                    </FormGroup>
                  </Col>
                </Row>
                {/* 
                <AllocateButton
                  setLoading={setLoading}
                  loading={loading}
                  handleSubmit={handleSubmit}
                  plan_id={plan.plan_id}
                  phone_number={plan.phone_number}
                  plans={plans}
                /> */}
                <Button
                  onClick={handleSubmit}
                  disabled={loading}
                  type="submit"
                  color="primary"
                >
                  Save
                </Button>
              </Form>
            </Col>
          </Row>
        </Card>
      </div>
    </AdminLayout>
  );
};

export default Pricing;
