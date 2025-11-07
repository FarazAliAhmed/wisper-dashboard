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
// import { Link } from "react-router-dom";
import AuthLayout from "../../layouts/AuthLayout";
import authService, { getCurrentUser } from "../../services/authService";
import {
  formIsValid,
  validateProperty,
  // validateForm,
  handleFailedRequest,
} from "../../utils";

import "./auth.scss";
import { ToastContainer, toast } from "react-toastify";
import { useHistory } from "react-router-dom";
import { BeatLoader } from "react-spinners";

const ForgotPassword = () => {
  const history = useHistory();

  const [account, setAccount] = useState({ email: "" });
  const [msgError, setMsgError] = useState("");
  const [errors, setErrors] = useState({});
  const [serverResponse, setServerResponse] = useState({
    status: true,
    message: "",
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const baseURL = window.location.protocol + "//" + window.location.host;
    console.log(baseURL);

    try {
      setLoading(true);
      const res = await authService.forgotPassword(account.email, baseURL);
      setLoading(false);

      // console.log("res", res)

      if (res) {
        toast.success("Password Rest Link Sent", {
          position: toast.POSITION.TOP_RIGHT,
        });

        setTimeout(() => {
          history.push(`/check-email/${account.email}`);
        }, 4000);
        // window.location = `/check-email/${account.email}`;
      } else {
        toast.error("Ensure email exists on database", {
          position: toast.POSITION.TOP_RIGHT,
        });
        setMsgError("Ensure email exists on database");
        throw new Error("Link Expired");
      }
      // window.location = "/verfiyEmail";
    } catch (error) {
      toast.error("An error occured check email and try again", {
        position: toast.POSITION.TOP_RIGHT,
      });
      setMsgError("Email does not exist on our database");
      console.log(error);
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
    <AuthLayout
      headTitle="Forgot Password"
      tagline="Provide your information to set a new password for your account"
    >
      <ToastContainer />
      {msgError && <Alert color="danger">{msgError}</Alert>}
      {/* {!serverResponse.status && (
        <Alert color="danger">{serverResponse.message}</Alert>
      )} */}
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

        <div className="d-grid gap-2 mt-4">
          <Button
            disabled={formIsValid(errors) || loading}
            size="lg"
            type="submit"
            className="submit-btn"
          >
            {loading ? (
              <div className="d-flex align-items-center justify-content-center">
                <BeatLoader size={10} color="white" loading />
                <span className="ms-2">Sending Reset Link...</span>
              </div>
            ) : (
              <span>Continue</span>
            )}
          </Button>
        </div>
      </Form>
    </AuthLayout>
  );
};

export default ForgotPassword;
