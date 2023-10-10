import { useEffect, useState } from "react";

import {
  Card,
  Form,
  FormGroup,
  Label,
  Input,
  Button,
  Row,
  Col,
  FormFeedback,
  UncontrolledAlert,
  Modal,
  ModalBody,
  ModalFooter,
  Toast,
} from "reactstrap";
import { useUser } from "../../context/userContext";
import "../../assets/scss/custom.scss";
import FullLayout from "../../layouts/FullLayout";
import { changePass, update } from "../../services/userService";
import {
  formIsValid,
  handleFailedRequest,
  validateProperty,
} from "../../utils";
import { toast } from "react-hot-toast";
import { BeatLoader } from "react-spinners";

import _Documentation from "../../components/pages/Documentation";
import { getAgentsInfo } from "../../services/dataService";

const Settings = () => {
  const context = useUser();
  const [confirm, setConfirm] = useState(false);

  const { user: userObj } = useUser();
  const [dealer, setDealer] = useState({});

  const [user, setUser] = useState({
    name: "",
    business_name: "",
    mobile_number: "",
    address: "",
  });
  const handleGetAgentsInfo = async () => {
    setLoading(true);
    const resp = await getAgentsInfo({
      userId: userObj?.dealer,
    });
    setDealer(resp?.subdealers);

    setLoading(false);
  };

  const [passwordChange, setPasswordChange] = useState({
    currentPass: "",
    newPass: "",
  });

  const [errors, setErrors] = useState({});
  const [errorsPass, setErrorsPass] = useState({});
  const [navState, setNavState] = useState(0);
  const [serverResponse, setServerResponse] = useState({
    status: true,
    message: "",
  });
  const [loading, setLoading] = useState(false);
  const { name, mobile_number, address, email, username, password } =
    context.user;
  const reqObj = { name, mobile_number, address, email, username, password };

  useEffect(() => {
    setUser(reqObj);
    handleGetAgentsInfo();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      const body = { ...reqObj, ...user };
      await update(body);
      setLoading(false);
      setUser({ ...user });
      setServerResponse({ status: true, message: "Updated successfully." });
      setErrors({});
    } catch (error) {
      setLoading(false);
      const { status, message } = handleFailedRequest(error);
      setUser(reqObj);
      setServerResponse({ status, message });
    }
  };

  const handleSubmitPassChange = async () => {
    try {
      setLoading(true);
      const body = {
        oldPassword: passwordChange.currentPass,
        newPassword: passwordChange.newPass,
      };

      await changePass(body);
      setLoading(false);
      toast.success("Password changed");
      setServerResponse({ status: true, message: "Updated successfully." });
      setErrors({});
      setPasswordChange({});
    } catch (error) {
      setLoading(false);
      const { status, message } = handleFailedRequest(error);
      toast.error("error changing password");
      setServerResponse({ status, message });
    }
  };

  const handleChange = ({ currentTarget: input }) => {
    const validationErrors = { ...errors };
    const errorMessage = validateProperty(input);
    if (errorMessage) validationErrors[input.name] = errorMessage;
    else delete validationErrors[input.name];

    const { name, value } = input;
    setUser({ ...user, [name]: value });
    setErrors(validationErrors);
  };

  const handlePassChange = ({ currentTarget: input }) => {
    const validationErrors = { ...errorsPass };
    const errorMessage = validateProperty(input);
    if (errorMessage) validationErrors[input.name] = errorMessage;
    else delete validationErrors[input.name];

    const { name, value } = input;
    setPasswordChange({ ...passwordChange, [name]: value });
    setErrors(validationErrors);
  };

  console.log(dealer, "dealer");
  const navItems = ["Profile", "Security", "Developer", "Dealer"];
  return (
    <FullLayout>
      <div>
        <h4 className="mb-4 mt-3">Settings</h4>
        <div className="settings__nav">
          {navItems.map((item, index) =>
            index !== 3 ? (
              <p
                onClick={() => {
                  setNavState(index);
                }}
                key={index}
                className={navState === index ? "activeNav__item" : ""}
              >
                {item}
              </p>
            ) : (
              <>
                {userObj.type == "subdealer" && (
                  <p
                    onClick={() => {
                      setNavState(index);
                    }}
                    key={index}
                    className={navState === index ? "activeNav__item" : ""}
                  >
                    {item}
                  </p>
                )}
              </>
            )
          )}
        </div>
        {navState == 0 && (
          <Card body>
            {serverResponse.message.length > 0 && (
              <>
                {serverResponse.status ? (
                  <UncontrolledAlert dismissible color="success">
                    {serverResponse.message}
                  </UncontrolledAlert>
                ) : (
                  <UncontrolledAlert dismissible color="danger">
                    {serverResponse.message}
                  </UncontrolledAlert>
                )}
              </>
            )}
            <Form onSubmit={handleSubmit}>
              <Row form>
                <Col md={6}>
                  <FormGroup>
                    <Label for="fullName">Full Name</Label>
                    <Input
                      id="fullName"
                      name="name"
                      value={user.name}
                      onChange={handleChange}
                      invalid={errors.name}
                      type="text"
                    />
                    <FormFeedback>{errors.name}</FormFeedback>
                  </FormGroup>
                </Col>
                <Col md={6}>
                  <FormGroup>
                    <Label for="businessName">Business Name</Label>
                    <Input
                      id="businessName"
                      name="business_name"
                      value={user.business_name}
                      onChange={handleChange}
                      invalid={errors.business_name}
                      type="text"
                    />
                    <FormFeedback>{errors.business_name}</FormFeedback>
                  </FormGroup>
                </Col>
                <Col md={6}>
                  <FormGroup>
                    <Label for="username">Username</Label>
                    <Input
                      value={user.username}
                      id="username"
                      disabled
                      name="username"
                      type="username"
                    />
                  </FormGroup>
                </Col>
                <Col md={6}>
                  <FormGroup>
                    <Label for="email">Email</Label>
                    <Input
                      value={user.email}
                      disabled
                      id="email"
                      name="email"
                      placeholder="example@mail.com"
                      type="email"
                    />
                  </FormGroup>
                </Col>
                <Col md={6}>
                  <FormGroup>
                    <Label for="mobile_number">Phone Number</Label>
                    <Input
                      value={user.mobile_number}
                      invalid={errors.mobile_number}
                      id="mobile_number"
                      name="mobile_number"
                      onChange={handleChange}
                      type="number"
                    />
                    <FormFeedback>{errors.mobile_number}</FormFeedback>
                  </FormGroup>
                </Col>
                <Col md={6}>
                  <FormGroup>
                    <Label for="address">Address</Label>
                    <Input
                      value={user.address}
                      id="address"
                      name="address"
                      onChange={handleChange}
                      type="text"
                    />
                  </FormGroup>
                </Col>
              </Row>
              <Button disabled={loading} type="submit" color="primary">
                Save
              </Button>
            </Form>
          </Card>
        )}
        {navState == 1 && (
          <>
            <Modal
              centered
              isOpen={confirm}
              toggle={() => setConfirm(!confirm)}
            >
              <ModalBody>
                <div className="confirm ">
                  <h5>Reset Password</h5>
                  <Form>
                    <Row form>
                      <Col md={12}>
                        <FormGroup
                          style={{
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "flex-start",
                            width: "100%",
                          }}
                        >
                          <Label for="currentPass">
                            Current Password{" "}
                            <span className="text-danger">*</span>
                          </Label>{" "}
                          <Input
                            id="currentPass"
                            name="currentPass"
                            value={passwordChange.currentPass}
                            onChange={handlePassChange}
                            type="password"
                            invalid={errors.currentPass}
                          />
                          <FormFeedback>{errors.currentPass}</FormFeedback>
                        </FormGroup>
                      </Col>
                      <Col md={12}>
                        <FormGroup
                          style={{
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "flex-start",
                            width: "100%",
                          }}
                        >
                          <Label for="newPass">
                            New Password <span className="text-danger">*</span>
                          </Label>
                          <Input
                            value={passwordChange.newPass}
                            id="newPass"
                            name="newPass"
                            type="password"
                            onChange={handlePassChange}
                            invalid={errors.newPass}
                          />
                          <FormFeedback>{errors.newPass}</FormFeedback>
                        </FormGroup>
                      </Col>
                    </Row>
                  </Form>
                </div>
              </ModalBody>
              <ModalFooter className="confirm-footer">
                <Button
                  disabled={formIsValid(errors) || loading}
                  color="primary"
                  onClick={() => {
                    setConfirm(false);
                    handleSubmitPassChange();
                  }}
                >
                  Reset password
                </Button>{" "}
                <Button onClick={() => setConfirm(false)}>No, Cancel</Button>
              </ModalFooter>
            </Modal>

            <Card body>
              <Form
                onSubmit={(e) => {
                  e.preventDefault();
                  setConfirm(true);
                }}
              >
                <h4>Password</h4>
                <Row form>
                  <p>
                    When changing your password, we strongly recommend using a
                    secure password you don't use anywhere else
                  </p>
                </Row>
                <Button disabled={loading} type="submit" color="primary">
                  {loading ? (
                    <BeatLoader size={10} color="white" loading />
                  ) : (
                    <>Change password</>
                  )}
                </Button>
              </Form>
            </Card>
          </>
        )}

        {navState == 2 && (
          <>
            <_Documentation />
          </>
        )}

        {navState == 3 && (
          <>
            {userObj?.type == "subdealer" ? (
              <Card body>
                <Form onSubmit={handleSubmit}>
                  <Row form>
                    <Col md={6}>
                      <FormGroup>
                        <Label for="fullName">Business Name</Label>
                        <Input
                          id="fullName"
                          name="name"
                          value={dealer?.name}
                          disabled
                          type="text"
                        />
                        <FormFeedback>{errors.name}</FormFeedback>
                      </FormGroup>
                    </Col>
                    <Col md={6}>
                      <FormGroup>
                        <Label for="username">Username</Label>
                        <Input
                          value={dealer?.username}
                          id="username"
                          disabled
                          name="username"
                          type="username"
                        />
                      </FormGroup>
                    </Col>
                    <Col md={6}>
                      <FormGroup>
                        <Label for="email">Email</Label>
                        <Input
                          value={dealer?.email}
                          disabled
                          id="email"
                          name="email"
                          placeholder="example@mail.com"
                          type="email"
                        />
                      </FormGroup>
                    </Col>
                    <Col md={6}>
                      <FormGroup>
                        <Label for="mobile_number">Phone Number</Label>
                        <Input
                          value={dealer?.mobile_number}
                          id="mobile_number"
                          name="mobile_number"
                          disabled
                          type="number"
                        />
                      </FormGroup>
                    </Col>
                  </Row>
                </Form>
              </Card>
            ) : (
              ""
            )}
          </>
        )}
      </div>
    </FullLayout>
  );
};

export default Settings;
