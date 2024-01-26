import { useContext, useState } from "react";
import {
  Form,
  FormGroup,
  Label,
  Button,
  Input,
  FormFeedback,
  Alert,
  Modal,
  ModalBody,
  ModalFooter,
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
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import warning from "../../assets/images/logos/warning.png";

import "./auth.scss";
import { toast } from "react-hot-toast";
import { SettingsNav } from "../../App";

const Login = () => {
  const [account, setAccount] = useState({ email: "", password: "" });
  const [msgError, setMsgError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [modalState, setModalState] = useState(false);

  const { verificationMessage } = useContext(SettingsNav);

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
      const user = getCurrentUser();

      if (user.isAdmin) {
        window.location = "/admin";
      } else {
        window.location = "/dashboard";
      }
    } catch (error) {
      console.log(error.response, "res");
      setLoading(false);
      const errorMessage = error.response?.data;
      if (errorMessage == "Email not confirmed") {
        setModalState(true);
      } else {
        setMsgError(error.response.data);
        const { status, message } = handleFailedRequest(error);

        setServerResponse({ status, message });
      }

      // console.log(error);
    }
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
      {msgError && <Alert color="danger">{msgError}</Alert>}
      {/* {!serverResponse.status && (
        <Alert color="danger">{serverResponse.message}</Alert>
      )} */}

      {verificationMessage && (
        <Alert color="success">{verificationMessage}</Alert>
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
        <div className="d-grid gap-2 mt-4">
          <Button
            disabled={formIsValid(errors) || loading}
            size="lg"
            type="submit"
            className="submit-btn"
          >
            Login
          </Button>

          <small className="text-center text-muted mt-3">
            Don't have an account?{" "}
            <Link to="/register" className="text-decoration-none">
              Signup
            </Link>
          </small>
          <small className="text-center text-muted mt-1">
            Can't remember your password?{" "}
            <Link
              to="/forgot-password"
              className="text-center text-decoration-none d-block"
            >
              Forgot Password
            </Link>
          </small>
        </div>
      </Form>

      <Modal
        centered
        isOpen={modalState}
        toggle={() => {
          setModalState(!modalState);
        }}
      >
        <ModalBody>
          <div className="confirm text-center">
            <img src={warning} width={50} className="confirm-warn" alt="warn" />

            <h6>
              Congratulations on your successful registration! 🎉 Check your
              email (including the spam folder) for a verification link. Simply
              click on it to verify your email. We are excited to
              have you onboard!
            </h6>
          </div>
        </ModalBody>
        <ModalFooter className="confirm-footer">
          <Button
            color="primary"
            disabled={loading}
            onClick={() => {
              setModalState(false);
              resendLinkFunc();
            }}
          >
            Resend Link
          </Button>{" "}
          <Button
            onClick={() => {
              setModalState(!modalState);
            }}
          >
            Close
          </Button>
        </ModalFooter>
      </Modal>
    </AuthLayout>
  );
};

export default Login;
