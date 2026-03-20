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
import checked from "../../assets/images/logos/checked.png";
import VerificationInput from "react-verification-input";
import "./Modal.css";
import { BeatLoader } from "react-spinners";

const Login = () => {
  const [account, setAccount] = useState({ email: "", password: "" });
  const [msgError, setMsgError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [modalState, setModalState] = useState(false);

  const [pin, setPin] = useState("");
  const [codeState, setCodeState] = useState("default");
  const [codeMessage, setCodeMessage] = useState("");

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
      
      // Since email confirmation is disabled, just show the error
      setMsgError(error.response.data);
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

  const handleConfirmCode = async (pinCode) => {
    try {
      const res = await authService.confirmEmail({
        email: account.email,
        token: pinCode,
      });
      setCodeMessage(res.data?.message);

      setCodeState("success");
    } catch (error) {
      console.log(error, "ert");
      setCodeMessage(error.response?.data);
      setCodeState("error");
      toast.error(`Error Confirm Code! ${error.response?.data}`);
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
            {loading ? (
              <BeatLoader size={10} color="white" loading />
            ) : (
              <span>Login</span>
            )}
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
          window.location = "/login";
        }}
      >
        <ModalBody>
          <div className="confirm text-center">
            <img
              src={checked}
              width={50}
              className="confirm-checked"
              alt="warn"
            />

            <h6>
              Congratulations on your successful registration! 🎉 Check your
              email (including the spam folder) or phone number for a
              verification code and verify your email and phone number. We are
              excited to have you onboard!
            </h6>

            <div className="verify__container">
              <VerificationInput
                length={5}
                validChars="0-9"
                onComplete={(e) => {
                  handleConfirmCode(e);
                }}
                onChange={(e) => {
                  console.log(e, "ec");
                  setPin(e);
                }}
                placeholder="_"
                classNames={{
                  container: "verification__container",
                  character: "verification__character",
                  characterInactive: "verification__character--inactive",
                  characterSelected: "verification__character--selected",
                }}
              />
              <p>
                Didn't get a code?
                <span
                  className="resend__code"
                  onClick={() => {
                    resendLinkFunc();
                  }}
                >
                  Click to resend
                </span>
              </p>
            </div>
          </div>
        </ModalBody>
        <ModalFooter className="confirm-footer">
          <Button
            color="secondary"
            onClick={() => {
              setModalState(!modalState);
              window.location = "/login";
            }}
          >
            Close
          </Button>

          {codeState == "default" && (
            <Button color="primary">
              {5 - Number(pin.length)} digits left
            </Button>
          )}
          {codeState == "error" && (
            <Button color="danger">{codeMessage ?? "error"}</Button>
          )}
          {codeState == "success" && (
            <Button
              color="success"
              onClick={() => {
                window.location = "/login";
              }}
            >
              Continue
            </Button>
          )}
        </ModalFooter>
      </Modal>
    </AuthLayout>
  );
};

export default Login;
