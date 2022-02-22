import { useEffect, useState } from "react";
import {
  Card,
  CardText,
  CardTitle,
  Form,
  FormGroup,
  Label,
  Input,
  Button,
  Row,
  Col,
} from "reactstrap";
import { useUser } from "../../context/userContext";

import FullLayout from "../../layouts/FullLayout";

const Account = () => {
  const [user, setUser] = useState({});
  const context = useUser();

  useEffect(() => {
    setUser({ ...context.user });
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({ [name]: value });
  };
  return (
    <FullLayout>
      <div>
        <h5 className="mb-4 mt-3">User Account</h5>
        <Card body>
          <Form>
            <Row form>
              <Col md={6}>
                <FormGroup>
                  <Label for="fullName">Full Name</Label>
                  <Input
                    value={user.name}
                    id="fullName"
                    name="fullName"
                    onChange={handleChange}
                    type="text"
                  />
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
                    onChange={handleChange}
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
                    onChange={handleChange}
                    type="email"
                  />
                </FormGroup>
              </Col>
              <Col md={6}>
                <FormGroup>
                  <Label for="phone">Phone Number</Label>
                  <Input
                    value={user.mobile_number}
                    id="phone"
                    name="phone"
                    onChange={handleChange}
                    type="number"
                  />
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
            <Button color="primary">Update</Button>
          </Form>
        </Card>
      </div>
    </FullLayout>
  );
};

export default Account;
