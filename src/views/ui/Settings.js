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
import cancel from "../../assets/images/logos/cancel.png";
import checked from "../../assets/images/logos/checked.png";
import { toast } from "react-hot-toast";
import { BeatLoader } from "react-spinners";

import _Documentation from "../../components/pages/Documentation";
import {
  clearBankDetails,
  getAgentsInfo,
  updateStoreFront,
} from "../../services/dataService";
import { useAppState } from "../../context/appContext";

const Settings = () => {
  const { storeFront } = useAppState();
  const context = useUser();
  const [success, setSuccess] = useState(false);
  const [failed, setFailed] = useState(false);
  const [confirm, setConfirm] = useState(false);
  const [bank, setBank] = useState(false);
  const [deleteBank, setDeleteBank] = useState(false);

  const { user: userObj } = useUser();
  const [dealer, setDealer] = useState({});

  const [user, setUser] = useState({
    name: "",
    business_name: "",
    mobile_number: "",
    address: "",
  });

  const [bankDetails, setBankDetails] = useState({
    withdrawAccount: "",
    bankName: "",
    bankCode: "",
    acctName: "",
    storePin: "",
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
  const [message, setMessage] = useState("");
  const [errorsPass, setErrorsPass] = useState({});
  const [currentBank, setCurrentBank] = useState({});
  const [navState, setNavState] = useState(0);
  const [serverResponse, setServerResponse] = useState({
    status: true,
    message: "",
  });
  const [loading, setLoading] = useState(false);
  const {
    name,
    business_name,
    mobile_number,
    address,
    email,
    username,
    password,
  } = context.user;
  const reqObj = {
    name,
    business_name,
    mobile_number,
    address,
    email,
    username,
    password,
  };

  const { withdrawAccount, bankCode, bankName, acctName, storePin } =
    storeFront;

  const bankObj = {
    withdrawAccount,
    bankCode,
    bankName,
    acctName,
    storePin,
  };

  useEffect(() => {
    setUser(reqObj);
    handleGetAgentsInfo();

    setBankDetails(bankObj);
  }, [context]);

  useEffect(() => {
    setBankDetails(bankObj);
  }, [storeFront]);

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

  const handleDeleteBankSubmit = async (e) => {
    // e.preventDefault();

    try {
      setLoading(true);

      await clearBankDetails(
        {
          id: userObj?._id,
        },
        userObj?.access_token
      );
      setLoading(false);
      setMessage("Account Deleted Successfully");
      setDeleteBank(false);
      setBankDetails({});
      setSuccess(true);
    } catch (error) {
      setLoading(false);
      setMessage("Error Deleting Account");
      setDeleteBank(false);
      setFailed(true);
    }
  };

  const handleBankSubmit = async (e) => {
    // e.preventDefault();

    try {
      setLoading(true);
      // const body = { bankDetails };
      console.log(bankDetails, "gg");
      await updateStoreFront(
        {
          id: userObj?._id,
          ...bankDetails,
        },
        userObj?.access_token
      );
      setLoading(false);
      setBankDetails(bankDetails);
      setErrors({});
      setMessage("Withdrawal Account Added Successfully");
      setBank(false);
      setSuccess(true);
    } catch (error) {
      setLoading(false);
      setMessage("Error Adding Account");
      setBank(false);
      setFailed(true);
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

  const bankCodes = [
    { bank: "Access Bank", code: "044" },
    { bank: "Ecobank", code: "050" },
    { bank: "Fidelity Bank", code: "070" },
    { bank: "First Bank of Nigeria", code: "011" },
    { bank: "First City Monument Bank (FCMB)", code: "214" },
    { bank: "Guaranty Trust Bank", code: "058" },
    { bank: "Heritage Bank", code: "030" },
    { bank: "Keystone Bank", code: "082" },
    { bank: "Stanbic IBTC Bank", code: "221" },
    { bank: "Sterling Bank", code: "232" },
    { bank: "Union Bank", code: "032" },
    { bank: "United Bank for Africa (UBA)", code: "033" },
    { bank: "Unity Bank", code: "215" },
    { bank: "VFD Microfinance Bank", code: "090110" },
    { bank: "Wema Bank", code: "035" },
    { bank: "Zenith Bank", code: "057" },
  ];

  function findObjectByField(value) {
    // Use the Array.prototype.find() method to find the object
    return bankCodes.find((obj) => obj["code"] === value).bank;
  }

  const handleChange = ({ currentTarget: input }) => {
    const validationErrors = { ...errors };
    const errorMessage = validateProperty(input);
    if (errorMessage) validationErrors[input.name] = errorMessage;
    else delete validationErrors[input.name];

    const { name, value } = input;
    setUser({ ...user, [name]: value });
    setErrors(validationErrors);
  };

  const handleBankChange = ({ currentTarget: input }) => {
    const validationErrors = { ...errors };
    const errorMessage = validateProperty(input);
    if (errorMessage) validationErrors[input.name] = errorMessage;
    else delete validationErrors[input.name];

    const { name, value } = input;
    setBankDetails({ ...bankDetails, [name]: value });

    // Check if the name is 'bankCode' and set 'bankName' accordingly
    if (name === "bankCode") {
      setBankDetails({
        ...bankDetails,
        bankCode: value,
        bankName: findObjectByField(value),
      });
    }

    // console.log(bankDetails);
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

  console.log(bankDetails, "dealer");
  const navItems = ["Profile", "Security", "Developer", "Dealer", "Withdrawal"];
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
                {userObj.type == "agent" && (
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
            {userObj?.type == "agent" ? (
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

        {navState == 4 && (
          <>
            <Modal centered isOpen={bank} toggle={() => setBank(!bank)}>
              <ModalBody>
                <div className="confirm ">
                  <h5>Add Withdrawal Account</h5>
                  <Form>
                    <Row form>
                      <Col md={12}>
                        <FormGroup className="mb-3">
                          <Label>Select Bank</Label>{" "}
                          <span className="text-danger">*</span>
                          <Input
                            onChange={handleBankChange}
                            name="bankCode"
                            invalid={errors.bankCode}
                            value={bankDetails.bankCode}
                            className="mb-3"
                            type="select"
                            // disabled={account.network == ""}
                            required
                          >
                            <>
                              <option value="select">Select Bank</option>
                              {bankCodes.map((bank) => (
                                <option key={bank.code} value={bank.code}>
                                  {bank.bank}
                                </option>
                              ))}
                            </>
                          </Input>
                          <FormFeedback>{errors.bankCode}</FormFeedback>
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
                          <Label for="accountNumber">
                            Account Number{" "}
                            <span className="text-danger">*</span>
                          </Label>
                          <Input
                            value={bankDetails.withdrawAccount}
                            id="withdrawAccount"
                            name="withdrawAccount"
                            type="number"
                            onChange={handleBankChange}
                            invalid={errors.withdrawAccount}
                          />
                          <FormFeedback>{errors.withdrawAccount}</FormFeedback>
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
                          <Label for="beneficiary">
                            Beneficiary <span className="text-danger">*</span>
                          </Label>
                          <Input
                            value={bankDetails.acctName}
                            id="beneficiary"
                            name="acctName"
                            type="text"
                            onChange={handleBankChange}
                            invalid={errors.acctName}
                          />
                          <FormFeedback>{errors.acctName}</FormFeedback>
                        </FormGroup>
                      </Col>

                      {/* <Col md={12}>
                        <FormGroup
                          style={{
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "flex-start",
                            width: "100%",
                          }}
                        >
                          <Label for="password">
                            Store Password{" "}
                            <span className="text-danger">*</span>
                          </Label>
                          <Input
                            value={bankDetails.storePin}
                            id="storePin"
                            name="storePin"
                            type="password"
                            onChange={handleBankChange}
                            invalid={errors.storePin}
                          />
                          <FormFeedback>{errors.storePin}</FormFeedback>
                        </FormGroup>
                      </Col> */}
                    </Row>
                  </Form>
                </div>
              </ModalBody>
              <ModalFooter className="confirm-footer">
                <Button
                  type="submit"
                  disabled={
                    formIsValid(errors) ||
                    bankDetails.bankCode == "select" ||
                    !bankDetails.bankCode ||
                    bankDetails.bankCode == ""
                  }
                  color="primary"
                  onClick={() => {
                    handleBankSubmit();
                  }}
                >
                  Add Account
                </Button>{" "}
                <Button onClick={() => setBank(false)}>No, Cancel</Button>
              </ModalFooter>
            </Modal>
            <Card body>
              <Form>
                <h4>My Withdrawal Account</h4>
                {bankDetails.bankCode &&
                bankDetails.bankCode !== "" &&
                bankDetails.bankName &&
                bankDetails.bankName !== "" &&
                bankDetails.withdrawAccount &&
                bankDetails.withdrawAccount !== "" &&
                bankDetails.acctName &&
                bankDetails.acctName !== "" &&
                bankDetails.bankCode &&
                bankDetails.bankCode !== "" ? (
                  <>
                    <Row form>
                      <p>Account Name: {bankDetails.acctName}</p>
                      <p>Account Number: {bankDetails.withdrawAccount}</p>
                      <p>Bank Name: {bankDetails.bankName}</p>
                    </Row>
                    <div
                      style={{
                        display: "flex",
                        gap: "1rem",
                      }}
                    >
                      <Button
                        onClick={(e) => {
                          e.preventDefault();
                          setBank(true);
                        }}
                        // type="submit"
                        color="primary"
                      >
                        Replace Account
                      </Button>
                      <Button
                        onClick={(e) => {
                          e.preventDefault();
                          setDeleteBank(true);
                        }}
                        type="submit"
                        color="danger"
                      >
                        Delete Account
                      </Button>
                    </div>
                  </>
                ) : (
                  <>
                    <Row form>
                      <p>
                        When changing your password, we strongly recommend using
                        a secure password you don't use anywhere else
                      </p>
                    </Row>
                    <Button
                      onClick={(e) => {
                        e.preventDefault();
                        setBank(true);
                      }}
                      type="submit"
                      color="primary"
                    >
                      <>Add Account</>
                    </Button>
                  </>
                )}
              </Form>
            </Card>
          </>
        )}
      </div>
      <Modal
        centered
        isOpen={deleteBank}
        toggle={() => setConfirm(!deleteBank)}
      >
        <ModalBody>
          <div className="confirm ">
            <h5>Confirmation</h5>
            <p>Are you sure you want to delete your Withdrawal account</p>
          </div>
        </ModalBody>
        <ModalFooter className="confirm-footer">
          <Button
            // disabled={formIsValid(errors) || loading}
            color="danger"
            onClick={() => {
              handleDeleteBankSubmit();
              setDeleteBank(false);
            }}
          >
            Delete
          </Button>{" "}
          <Button onClick={() => setDeleteBank(false)}>No, Cancel</Button>
        </ModalFooter>
      </Modal>
      <Modal
        centered
        isOpen={success}
        toggle={() => {
          setSuccess(!success);
        }}
      >
        <ModalBody>
          <div className="confirm text-center">
            <img src={checked} className="confirm-checked" alt="success" />
            <p>{message}</p>
          </div>
        </ModalBody>
        <ModalFooter className="confirm-footer">
          <Button
            color="secondary"
            onClick={() => {
              setSuccess(false);
            }}
          >
            Close
          </Button>
        </ModalFooter>
      </Modal>

      {/* Failure On Data sent*/}
      <Modal centered isOpen={failed} toggle={() => setFailed(!failed)}>
        <ModalBody>
          <div className="confirm text-center">
            <img
              src={cancel}
              width={50}
              className="confirm-cancel"
              alt="confirm"
            />
            <p>{message}</p>
          </div>
        </ModalBody>
        <ModalFooter className="confirm-footer">
          <Button color="secondary" onClick={() => setFailed(false)}>
            Close
          </Button>
        </ModalFooter>
      </Modal>
    </FullLayout>
  );
};

export default Settings;
