import React, { useState, useEffect } from "react";
import { Route, Redirect } from "react-router-dom";
import auth from "../services/authService";
import toast from "react-hot-toast";

import {
  Button,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  Form,
  FormGroup,
  Label,
  Input,
  FormFeedback,
  Alert,
} from "reactstrap";
import {
  formIsValid,
  validateProperty,
  // validateForm,
  handleFailedRequest,
} from "../utils";
import authService, { getCurrentUser } from "../services/authService";

const ProtectedRoute = ({ path, component: Component, render, ...rest }) => {
  const [account, setAccount] = useState({
    email: auth.getCurrentUser().email,
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [modalState, setModalState] = useState(false);
  const [modalValueState, setModalValueState] = useState(1);

  useEffect(() => {
    if (!auth.getCurrentUser().confirmed) {
      setModalState(true);
    }
  }, []);

  const handleChange = ({ currentTarget: input }) => {
    const validationErrors = { ...errors };
    const errorMessage = validateProperty(input);
    if (errorMessage) validationErrors[input.name] = errorMessage;
    else delete validationErrors[input.name];

    const { name, value } = input;
    setAccount({ ...account, [name]: value });
    setErrors(validationErrors);
  };

  const resetLinkFunc = async () => {
    try {
      setLoading(true);
      const res = await authService.resetLink(account.email);
      setLoading(false);
      toast.success(res.data?.message);
      setModalValueState(4);
    } catch (error) {
      console.log(error.response, "res");
      setLoading(false);
      toast.error(error.response?.data?.message);
    }
  };
  return (
    <>
      <Route
        {...rest}
        render={(props) => {
          if (!auth.getCurrentUser())
            return (
              <Redirect
                to={{
                  pathname: "/login",
                  state: { from: props.location },
                }}
              />
            );
          if (auth.getCurrentUser().isAdmin) {
            return <Redirect to="/admin" />;
          }
          return Component ? <Component {...props} /> : render(props);
        }}
      />
      <Modal
        centered
        isOpen={modalState}
        // toggle={() => {
        //   setModalState(!modalState);
        // }}
      >
        {modalValueState === 1 && (
          <>
            <ModalHeader>Verify Your Email Address</ModalHeader>

            <ModalBody>
              <div className="confirm text-center">
                Welcome back! To continue enjoying all the features of the
                Wisper Platform, please verify your email address.
              </div>
            </ModalBody>
            <ModalFooter className="confirm-footer">
              <Button
                color="primary"
                onClick={() => {
                  setModalValueState(2);
                }}
              >
                Verify
              </Button>{" "}
              {/* <Button onClick={() => {}}>Close</Button> */}
            </ModalFooter>
          </>
        )}

        {modalValueState === 2 && (
          <>
            <ModalHeader>Verify Your Email Address</ModalHeader>

            <ModalBody>
              <div className="confirm ">
                Click the 'Send Link' button to receive a confirmation link at
                your registered email address. Please follow this link to verify
                your email and continue
              </div>

              <Form
                style={{
                  marginTop: "1rem",
                }}
              >
                <FormGroup className="">
                  <Label>Email address</Label>
                  <Input
                    type="email"
                    name="email"
                    value={account.email}
                    onChange={handleChange}
                    invalid={errors.email}
                    disabled
                  />
                  <FormFeedback>{errors.email}</FormFeedback>
                </FormGroup>
                <p
                  style={{
                    color: "blue",
                    cursor: "pointer",
                    fontSize: 15,
                    marginTop: 0,
                  }}
                  onClick={() => {
                    setModalValueState(3);
                  }}
                >
                  Update Email Address
                </p>
                <div className="d-grid gap-2 mt-4">
                  <ModalFooter className="confirm-footer">
                    <Button
                      color="primary"
                      disabled={formIsValid(errors) || loading}
                      size="lg"
                      // type="submit"
                      className="submit-btn"
                      onClick={() => {
                        resetLinkFunc();
                      }}
                    >
                      Send Link
                    </Button>
                    <Button
                      onClick={() => {
                        setModalValueState(1);
                      }}
                    >
                      Back
                    </Button>
                  </ModalFooter>
                </div>
              </Form>
            </ModalBody>
          </>
        )}

        {modalValueState === 3 && (
          <>
            <ModalHeader>Update Your Email Address</ModalHeader>

            <ModalBody>
              <div className="confirm ">
                To ensure you always receive important notifications, please
                update your email address below. We'll send a confirmation link
                to your new email for verification
              </div>

              <Form
                style={{
                  marginTop: "1rem",
                }}
              >
                <FormGroup className="">
                  <Label>New Email address</Label>
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
                  <ModalFooter className="confirm-footer">
                    <Button
                      color="primary"
                      disabled={formIsValid(errors) || loading}
                      size="lg"
                      // type="submit"
                      className="submit-btn"
                      onClick={() => {
                        resetLinkFunc();
                      }}
                    >
                      Update Email
                    </Button>
                    <Button
                      onClick={() => {
                        setModalValueState(2);
                      }}
                    >
                      Back
                    </Button>
                  </ModalFooter>
                </div>
              </Form>
            </ModalBody>
          </>
        )}

        {modalValueState === 4 && (
          <>
            <ModalHeader>Confirmation Link Sent</ModalHeader>

            <ModalBody>
              <div className="confirm ">
                A confirmation link has been sent to your email address. Please
                check your inbox (and spam folder) to verify your email.
              </div>

              <div className="d-grid gap-2 mt-4">
                <ModalFooter className="confirm-footer">
                  <Button
                    color="primary"
                    disabled={formIsValid(errors) || loading}
                    size="lg"
                    // type="submit"
                    className="submit-btn"
                    onClick={() => {
                      resetLinkFunc();
                    }}
                  >
                    Resend Link
                  </Button>
                  <Button
                    onClick={() => {
                      setModalValueState(3);
                    }}
                  >
                    Update Email
                  </Button>
                  <a
                    className="cursor-pointer"
                    href="mailto:support@wisper.ng?subject=Support Inquiry&body=Hello%20Wisper%20Support%2C%0D%0A%0D%0AI%20need%20assistance%20with%3A%0D%0A%0D%0A%0D%0AThank%20you%21"
                    target="_blank"
                  >
                    <Button color="primary " className="btn-block">
                      Contact Support
                    </Button>
                  </a>
                </ModalFooter>
              </div>
            </ModalBody>
          </>
        )}
      </Modal>
    </>
  );
};

export default ProtectedRoute;
