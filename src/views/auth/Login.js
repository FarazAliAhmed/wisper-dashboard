import { useState } from "react";
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
import authService from "../../services/authService";
import {
  formIsValid,
  validateProperty,
  // validateForm,
  handleFailedRequest,
} from "../../utils";

import "./auth.scss";

const Login = () => {
  const [account, setAccount] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({});
  const [serverResponse, setServerResponse] = useState({
    status: true,
    message: "",
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      await authService.login(account.email, account.password);
      setLoading(false);
      window.location = "/dashboard";
    } catch (error) {
      setLoading(false);
      const { status, message } = handleFailedRequest(error);

      setServerResponse({ status, message });
      // console.log(error);
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
    <AuthLayout headTitle="Login" tagline="Login to continue.">
      {!serverResponse.status && (
        <Alert color="danger">{serverResponse.message}</Alert>
      )}
      <Form onSubmit={handleSubmit}>
        <FormGroup className="mb-3">
          <Label>Email address</Label>
          <Input
            type="email"
            name="email"
            value={account.email}
            onChange={handleChange}
            invalid={errors.email}
          />
          <FormFeedback>{errors.email}</FormFeedback>
        </FormGroup>
        <FormGroup className="mb-3">
          <Label>Password</Label>
          <Input
            type="password"
            name="password"
            value={account.password}
            onChange={handleChange}
            invalid={errors.password}
          />
          <FormFeedback>{errors.password}</FormFeedback>
        </FormGroup>
        <div className="d-grid gap-2 mt-4">
          <Button
            disabled={formIsValid(errors) || loading}
            size="lg"
            type="submit"
            className="submit-btn"
          >
            SUBMIT
          </Button>

          <small className="text-center text-muted mt-3">
            Don't have an account?{" "}
            <Link to="/register" className="text-decoration-none">
              Signup
            </Link>
          </small>
        </div>
      </Form>
    </AuthLayout>
  );
};

export default Login;
