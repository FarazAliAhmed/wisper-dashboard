import React, { useState } from "react";
import {
  Form,
  FormGroup,
  Label,
  Button,
  Input,
  FormFeedback,
  Alert,
} from "reactstrap";
import { Link } from "react-router-dom";
import AuthLayout from "../../layouts/AuthLayout";

import {
  formIsValid,
  validateProperty,
  // validateForm,
  handleFailedRequest,
} from "../../utils";
import { register } from "../../services/userService";

import "./auth.scss";
import authService from "../../services/authService";

const Register = () => {
  const [account, setAccount] = useState({
    name: "",
    email: "",
    mobile_number: "",
    address: "",
    username: "",
    password: "",
  });
  const [errors, setErrors] = useState({});
  const [serverResponse, setServerResponse] = useState({
    status: true,
    message: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      console.log(account);
      const response = await register(account);
      console.log(response);
      authService.loginWithJwt(response.headers["x-auth-token"]);
      setErrors({});
      window.location = "/dashboard";
    } catch (error) {
      const { status, message } = handleFailedRequest(error);

      setServerResponse({ status, message });
      console.log(error);
    }
  };

  const handleChange = ({ currentTarget: input }) => {
    const validationErrors = { ...errors };
    const errorMessage = validateProperty(input);
    if (errorMessage) validationErrors[input.name] = errorMessage;
    else delete validationErrors[input.name];

    const { name, value } = input;
    setAccount({ ...account, [name]: value });
    setErrors(validationErrors);
  };

  return (
    <AuthLayout
      headTitle="Register"
      tagline="Create an account to get started."
    >
      {!serverResponse.status && (
        <Alert color="danger">{serverResponse.message}</Alert>
      )}
      <Form onSubmit={handleSubmit}>
        <FormGroup className="mb-3">
          <Label>Full name</Label> <span className="text-danger">*</span>
          <Input
            onChange={handleChange}
            value={account.name}
            invalid={errors.name}
            type="text"
            required
            name="name"
          />
          <FormFeedback>{errors.name}</FormFeedback>
        </FormGroup>
        <FormGroup className="mb-3">
          <Label>Email address</Label> <span className="text-danger">*</span>
          <Input
            type="email"
            required
            name="email"
            value={account.email}
            onChange={handleChange}
            invalid={errors.email}
          />
          <FormFeedback>{errors.email}</FormFeedback>
        </FormGroup>
        <FormGroup className="mb-3">
          <Label>Username</Label> <span className="text-danger">*</span>
          <Input
            value={account.username}
            onChange={handleChange}
            invalid={errors.username}
            type="text"
            required
            name="username"
          />
          <FormFeedback>{errors.username}</FormFeedback>
        </FormGroup>
        <FormGroup className="mb-3">
          <Label>
            Phone number <span className="text-danger">*</span>
          </Label>
          <Input
            value={account.mobile_number}
            invalid={errors.mobile_number}
            onChange={handleChange}
            name="mobile_number"
            required
            type="number"
          />
          <FormFeedback>{errors.mobile_number}</FormFeedback>
        </FormGroup>
        <FormGroup className="mb-3">
          <Label>Address</Label>
          <Input
            value={account.address}
            onChange={handleChange}
            type="text"
            name="address"
          />
        </FormGroup>
        <FormGroup className="mb-3">
          <Label>Password</Label> <span className="text-danger">*</span>
          <Input
            value={account.password}
            onChange={handleChange}
            invalid={errors.password}
            name="password"
            type="password"
            required
          />
          <FormFeedback>{errors.password}</FormFeedback>
        </FormGroup>
        <div className="d-grid gap-2 mt-4">
          <Button
            disabled={formIsValid(errors)}
            size="lg"
            type="submit"
            className="submit-btn"
          >
            SUBMIT
          </Button>

          <small className="text-center text-muted mt-3">
            Already have an account?{" "}
            <Link to="/login" className="text-decoration-none">
              Login
            </Link>
          </small>
        </div>
      </Form>
    </AuthLayout>
  );
};

export default Register;
