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
      window.location = "/login";
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
                Wisper Platform, please verify your email address. Click on
                'Verify Email' to confirm your email address and ensure
                uninterrupted access to your account."
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
                If the default email is not an active email, change it to an
                active email (make sure the email has not been registered on
                wisper before) and verify the new email, else leave the form
                field as the default email. A confirmation email will be sent to
                the email address you have provided . To ensure the security of
                your account and access all the exciting features, please check
                your email inbox (including spam/junk folders) for the
                confirmation message. Click on the verification link provided in
                the email. If you haven't received the email within a few
                minutes or encounter any issues, please don't hesitate to
                contact our support team at support@wisper.ng.
              </div>

              <Form
                style={{
                  marginTop: "2rem",
                }}
              >
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
                  <ModalFooter className="confirm-footer">
                    <Button
                      color="primary"
                      disabled={formIsValid(errors) || loading}
                      size="lg"
                      // type="submit"
                      className="submit-btn"
                      onClick={() => {
                        setModalValueState(2);
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
      </Modal>
    </>
  );
};

export default ProtectedRoute;
