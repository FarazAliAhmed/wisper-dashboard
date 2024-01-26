import { useEffect, useState } from "react";

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
import {
  getMegaPriceAdmin,
  updateAllMegaPrice,
} from "../../services/Admin.Services/businessService";
import toast from "react-hot-toast";
import { handleFailedRequest } from "../../utils";

function MegaPriceSettings() {
  const [serverResponse, setServerResponse] = useState({
    status: true,
    message: "",
  });
  const [loading, setLoading] = useState(false);
  const [megaData, setMegaData] = useState(null);

  const [megaChange, setMegaChange] = useState({
    mtn_sme: null,
    mtn_gifting: null,
    airtel: null,
    "9mobile": null,
    glo: null,
  });

  const handleOnChange = ({ currentTarget: input }) => {
    const { name, value } = input;
    setMegaChange({ ...megaChange, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const body = {
        mtn_sme: megaChange.mtn_sme || megaData?.mtn_sme,
        mtn_gifting: megaChange.mtn_gifting || megaData?.mtn_gifting,
        airtel: megaChange.airtel || megaData?.airtel,
        "9mobile": megaChange["9mobile"] || megaData?.["9mobile"],
        glo: megaChange.glo || megaData?.glo,
      };

      toast.success("Updating Mega Price for all users....");
      await updateAllMegaPrice(body);
      setLoading(false);
      toast.success("Mega Price Updated!");
      setServerResponse({ status: true, message: "Updated successfully." });

      setMegaData(null);
      setMegaChange({});
      // setErrors({});
    } catch (error) {
      setLoading(false);
      const { status, message } = handleFailedRequest(error);
      toast.error("error setting megaprice");
      setServerResponse({ status, message });
    }
  };

  const getMegaData = async () => {
    try {
      const res = await getMegaPriceAdmin();
      // console.log({ res });
      setMegaData(res.data);
    } catch (error) {
      console.log({ error });
    }
  };

  useEffect(() => {
    getMegaData();
  }, [megaData]);

  return (
    <div>
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
                <Label for="glo">GLO</Label>
                <Input
                  placeholder={megaData?.glo}
                  onChange={handleOnChange}
                  id="glo"
                  name="glo"
                  type="text"
                />
              </FormGroup>
            </Col>
            <Col md={6}>
              <FormGroup>
                <Label for="mtn_sme">MTN SME</Label>
                <Input
                  placeholder={megaData?.mtn_sme}
                  onChange={handleOnChange}
                  id="mtn_sme"
                  name="mtn_sme"
                  type="text"
                />
              </FormGroup>
            </Col>
            <Col md={6}>
              <FormGroup>
                <Label for="mtn_gifting">MTN GIFTING</Label>
                <Input
                  placeholder={megaData?.mtn_gifting}
                  onChange={handleOnChange}
                  id="mtn_gifting"
                  name="mtn_gifting"
                  type="text"
                />
              </FormGroup>
            </Col>
            <Col md={6}>
              <FormGroup>
                <Label for="airtel">AIRTEL</Label>
                <Input
                  placeholder={megaData?.airtel}
                  onChange={handleOnChange}
                  id="airtel"
                  name="airtel"
                  type="text"
                />
              </FormGroup>
            </Col>
            <Col md={6}>
              <FormGroup>
                <Label for="9mobile">9MOBILE</Label>
                <Input
                  placeholder={megaData?.["9mobile"]}
                  onChange={handleOnChange}
                  id="9mobile"
                  name="9mobile"
                  type="text"
                />
              </FormGroup>
            </Col>
          </Row>
          <Button
            // ={formIsValid(errors) || loading}
            type="submit"
            color="primary"
          >
            Save
          </Button>
        </Form>
      </Card>
    </div>
  );
}

export default MegaPriceSettings;
