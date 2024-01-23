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
import { withRouter } from "react-router-dom";
import "./auth.scss";
import { ToastContainer, toast } from "react-toastify";
import { useHistory } from "react-router-dom";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";

const SetPassword = ({ match }) => {
  const history = useHistory();

  const [account, setAccount] = useState({ password: "", cpassword: "" });
  const [msgError, setMsgError] = useState("");
  const [errors, setErrors] = useState({});
  const [serverResponse, setServerResponse] = useState({
    status: true,
    message: "",
  });
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showCPassword, setShowCPassword] = useState(false);

  const { email, token } = match.params;

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (account.password === account.cpassword) {
      try {
        setLoading(true);
        const res = await authService.resetPassword(
          account.password,
          email,
          token
        );
        setLoading(false);

        if (res) {
          toast.success("Password Changed", {
            position: toast.POSITION.TOP_RIGHT,
          });

          setTimeout(() => {
            history.push("/login");
          }, 4000);
          // window.location = "/login";
        } else {
          toast.error("Link Expired", {
            position: toast.POSITION.TOP_RIGHT,
          });
          setMsgError("Link Expired");
          throw new Error("Link Expired");
        }
      } catch (error) {
        toast.error("An error occured", {
          position: toast.POSITION.TOP_RIGHT,
        });
        console.log(error);
        setMsgError("An error occured");
        console.log(error);
        setLoading(false);
        const { status, message } = handleFailedRequest(error);

        setServerResponse({ status, message });
        // console.log(error);
      }
    } else {
      setMsgError("Password does not match");
      return;
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
      headTitle="Set new password"
      tagline="Please  set a new password for your account"
    >
      <ToastContainer />
      {msgError && <Alert color="danger">{msgError}</Alert>}
      {/* {!serverResponse.status && (
        <Alert color="danger">{serverResponse.message}</Alert>
      )} */}
      <Form onSubmit={handleSubmit}>
        <FormGroup className="mb-3">
          <Label>
            Password{" "}
            <i
              className={`password-toggle-icon ${
                showPassword ? "show" : "hide"
              }`}
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? (
                <AiOutlineEye cursor="pointer" />
              ) : (
                <AiOutlineEyeInvisible cursor="pointer" />
              )}{" "}
              {/* Eye and hide icons */}
            </i>
          </Label>
          <Input
            type={showPassword ? "text" : "password"}
            name="password"
            value={account.password}
            onChange={handleChange}
            invalid={errors.password}
          />
          <FormFeedback>{errors.password}</FormFeedback>
        </FormGroup>

        <FormGroup className="mb-3">
          <Label>
            Confirm Password{" "}
            <i
              className={`password-toggle-icon ${
                showCPassword ? "show" : "hide"
              }`}
              onClick={() => setShowCPassword(!showCPassword)}
            >
              {showCPassword ? (
                <AiOutlineEye cursor="pointer" />
              ) : (
                <AiOutlineEyeInvisible cursor="pointer" />
              )}{" "}
              {/* Eye and hide icons */}
            </i>
          </Label>
          <Input
            type={showCPassword ? "text" : "password"}
            name="cpassword"
            value={account.cpassword}
            onChange={handleChange}
            invalid={errors.cpassword}
          />
          <FormFeedback>{errors.cpassword}</FormFeedback>
        </FormGroup>
        <div className="d-grid gap-2 mt-4">
          <Button
            disabled={formIsValid(errors) || loading}
            size="lg"
            type="submit"
            className="submit-btn"
          >
            Set new password
          </Button>
        </div>
      </Form>
    </AuthLayout>
  );
};

export default SetPassword;
