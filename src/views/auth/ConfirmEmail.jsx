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
import authService, { getCurrentUser } from "../../services/authService";
import {
  formIsValid,
  validateProperty,
  // validateForm,
  handleFailedRequest,
} from "../../utils";
// import { withRouter } from 'react-router-dom';
import "./auth.scss";
import confirmed from "../../assets/dashboard/confirmed.svg";
import { ToastContainer } from "react-toastify";
import { useHistory } from "react-router-dom";
import toast from "react-hot-toast";

const ConfirmEmail = ({ match }) => {
  const history = useHistory();

  const [account, setAccount] = useState({ password: "", cpassword: "" });
  const [msgError, setMsgError] = useState("");
  const [errors, setErrors] = useState({});
  const [serverResponse, setServerResponse] = useState({
    status: true,
    message: "",
  });
  const [loading, setLoading] = useState(false);

  // const token = match.params;

  const urlParams = new URLSearchParams(window.location.search);
  const token = urlParams.get("token");

  // console.log(token);

  console.log("res", token);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      const res = await authService.confirmEmail(token);
      console.log(res, "res");
      toast.success(res.data?.message);
      setLoading(false);
      window.location = "/login";
    } catch (error) {
      setLoading(false);
      console.log(error.response, "res");
      toast.error(error.response?.data?.message);
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

  const resendLinkFunc = async () => {
    try {
      setLoading(true);
      const res = await authService.resendLink(account.email);
      setLoading(false);
      toast.success(res.data?.message);
    } catch (error) {
      console.log(error.response, "res");
      setLoading(false);
      toast.error("error sending confirmation link");
    }
  };

  return (
    <AuthLayout>
      <ToastContainer />
      {msgError && <Alert color="danger">{msgError}</Alert>}
      {/* {!serverResponse.status && (
        <Alert color="danger">{serverResponse.message}</Alert>
      )} */}
      <Form onSubmit={handleSubmit}>
        <div
          style={{
            marginBottom: "2rem",
          }}
        >
          <h1>Email Confirmation</h1>
        </div>

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
            Confirm Email
          </Button>
        </div>
      </Form>
    </AuthLayout>
  );
};

export default ConfirmEmail;
