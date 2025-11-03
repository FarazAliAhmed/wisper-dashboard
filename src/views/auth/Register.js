import React, { useState } from "react";
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
import checked from "../../assets/images/logos/checked.png";
import "./Modal.css";

import {
  formIsValid,
  validateProperty,
  // validateForm,
  handleFailedRequest,
} from "../../utils";
import { register } from "../../services/userService";

import "./auth.scss";
import authService from "../../services/authService";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
// import VerificationInput from "react-verification-input";
// import toast from "react-hot-toast";
import { BeatLoader } from "react-spinners";

const Register = () => {
  // const [pin, setPin] = useState("");
  // const [codeState, setCodeState] = useState("default");
  // const [codeMessage, setCodeMessage] = useState("");
  const [account, setAccount] = useState({
    name: "",
    business_name: "",
    email: "",
    mobile_number: "",
    address: "...",
    username: "",
    password: "",
  });
  const [errors, setErrors] = useState({});
  const [modalState, setModalState] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [serverResponse, setServerResponse] = useState({
    status: true,
    message: "",
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      const response = await register(account);
      setLoading(false);
      console.log(response, "res");
      setModalState(true);
      // authService.loginWithJwt(response.headers["x-auth-token"]);
      setErrors({});
    } catch (error) {
      setLoading(false);
      console.log(error.response, "res");
      const { status, message } = handleFailedRequest(error);

      // Handle both string error and object error with message property
      const errorMessage =
        typeof error.response?.data === "string"
          ? error.response.data
          : error.response?.data?.message || message || "An error occurred";

      setServerResponse({ status, message: errorMessage });
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

  // const handleConfirmCode = async (pinCode) => {
  //   try {
  //     const res = await authService.confirmEmail({
  //       email: account.email,
  //       token: pinCode,
  //     });
  //     setCodeMessage(res.data?.message);

  //     setCodeState("success");
  //   } catch (error) {
  //     console.log(error, "ert");
  //     setCodeMessage(error.response?.data);
  //     setCodeState("error");
  //     toast.error(`Error Confirm Code! ${error.response?.data}`);
  //   }
  // };

  // const resendLinkFunc = async () => {
  //   try {
  //     setLoading(true);
  //     const res = await authService.resendLink(account.email);
  //     setLoading(false);
  //     toast.success(res.data?.message);
  //   } catch (error) {
  //     console.log(error.response, "res");
  //     setLoading(false);
  //     toast.error("error sending confirmation link");
  //   }
  // };

  return (
    <AuthLayout
      headTitle="Register"
      tagline="Create an account to get started."
    >
      {!serverResponse.status && (
        <Alert color="danger">
          {serverResponse.message || "An error occurred"}
        </Alert>
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
          <Label>Business name</Label> <span className="text-danger">*</span>
          <Input
            onChange={handleChange}
            value={account.business_name}
            invalid={errors.business_name}
            type="text"
            required
            name="business_name"
          />
          <FormFeedback>{errors.business_name}</FormFeedback>
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
          {/* <Label>Address</Label> */}
          <Input
            hidden
            value={account.address}
            onChange={handleChange}
            type="text"
            name="address"
          />
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
          </Label>{" "}
          <span className="text-danger">*</span>
          <Input
            value={account.password}
            onChange={handleChange}
            invalid={errors.password}
            name="password"
            type={showPassword ? "text" : "password"}
            required
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
              <div className="d-flex align-items-center justify-content-center">
                <BeatLoader size={10} color="white" loading />
                <span className="ms-2">Creating Account...</span>
              </div>
            ) : (
              <span>SUBMIT</span>
            )}
          </Button>

          <small className="text-center text-muted mt-3">
            Already have an account?{" "}
            <Link to="/login" className="text-decoration-none">
              Login
            </Link>
          </small>
        </div>
      </Form>

      {/* Success Modal - Simple version */}
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
              alt="success"
            />

            <h6>Congratulations! Your registration was successful! 🎉</h6>
            <p>
              You can now log in to your account and start using our services.
            </p>
          </div>
        </ModalBody>
        <ModalFooter className="confirm-footer">
          <Button
            color="primary"
            onClick={() => {
              setModalState(!modalState);
              window.location = "/login";
            }}
          >
            Go to Login
          </Button>
        </ModalFooter>
      </Modal>

      {/* Original Verification Modal - Commented Out */}
      {/* <Modal
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
              excited to have you onboard!
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
      </Modal> */}
    </AuthLayout>
  );
};

export default Register;
