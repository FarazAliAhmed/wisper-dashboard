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
  FormFeedback,
  UncontrolledAlert,
} from "reactstrap";
import { useUser } from "../../context/userContext";

import FullLayout from "../../layouts/FullLayout";
import { update } from "../../services/userService";
import { handleFailedRequest, validateProperty } from "../../utils";

const Account = () => {
  const context = useUser();
  const [user, setUser] = useState({
    name: "",
    mobile_number: "",
    address: "",
  });
  const [errors, setErrors] = useState({});
  const [serverResponse, setServerResponse] = useState({
    status: true,
    message: "",
  });
  const [loading, setLoading] = useState(false);
  const { name, mobile_number, address, email, username, password } =
    context.user;
  const reqObj = { name, mobile_number, address, email, username, password };

  useEffect(() => {
    setUser(reqObj);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      const body = { ...reqObj, ...user };
      await update(body);
      setLoading(false);
      setUser({ ...user });
      setServerResponse({ status: true, message: "Updated successfully." });
      setErrors({});
    } catch (error) {
      setLoading(false);
      const { status, message } = handleFailedRequest(error);
      setUser(reqObj);
      setServerResponse({ status, message });
    }
  };

  const handleChange = ({ currentTarget: input }) => {
    const validationErrors = { ...errors };
    const errorMessage = validateProperty(input);
    if (errorMessage) validationErrors[input.name] = errorMessage;
    else delete validationErrors[input.name];

    const { name, value } = input;
    setUser({ ...user, [name]: value });
    setErrors(validationErrors);
  };
  return (
    <FullLayout>
      <div>
        <h5 className="mb-4 mt-3">User Account</h5>
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
                  <Label for="fullName">Business Name</Label>
                  <Input
                    id="fullName"
                    name="name"
                    value={user.name}
                    onChange={handleChange}
                    invalid={errors.name}
                    type="text"
                  />
                  <FormFeedback>{errors.name}</FormFeedback>
                </FormGroup>
              </Col>
              <Col md={6}>
                <FormGroup>
                  <Label for="username">Username</Label>
                  <Input
                    value={user.username}
                    id="username"
                    disabled
                    name="username"
                    type="username"
                  />
                </FormGroup>
              </Col>
              <Col md={6}>
                <FormGroup>
                  <Label for="email">Email</Label>
                  <Input
                    value={user.email}
                    disabled
                    id="email"
                    name="email"
                    placeholder="example@mail.com"
                    type="email"
                  />
                </FormGroup>
              </Col>
              <Col md={6}>
                <FormGroup>
                  <Label for="mobile_number">Phone Number</Label>
                  <Input
                    value={user.mobile_number}
                    invalid={errors.mobile_number}
                    id="mobile_number"
                    name="mobile_number"
                    onChange={handleChange}
                    type="number"
                  />
                  <FormFeedback>{errors.mobile_number}</FormFeedback>
                </FormGroup>
              </Col>
              <Col md={6}>
                <FormGroup>
                  <Label for="address">Address</Label>
                  <Input
                    value={user.address}
                    id="address"
                    name="address"
                    onChange={handleChange}
                    type="text"
                  />
                </FormGroup>
              </Col>
            </Row>
            <Button disabled={loading} type="submit" color="primary">
              Update
            </Button>
          </Form>
        </Card>
      </div>
    </FullLayout>
  );
};

export default Account;
