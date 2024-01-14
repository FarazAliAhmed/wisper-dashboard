import React, { useContext, useEffect, useState } from "react";

import {
  Button,
  Card,
  CardBody,
  Col,
  Form,
  FormFeedback,
  FormGroup,
  Input,
  Label,
  Modal,
  ModalBody,
  ModalFooter,
} from "reactstrap";
import "./dashboard.css";
import { Link, Redirect } from "react-router-dom/cjs/react-router-dom";
import toast from "react-hot-toast";
import { useAppState } from "../../context/appContext";
import { formIsValid, validateProperty } from "../../utils";
import cancel from "../../assets/images/logos/cancel.png";
import checked from "../../assets/images/logos/checked.png";
import {
  updateStoreFront,
  withdrawStoreFront,
} from "../../services/dataService";
import { useUser } from "../../context/userContext";
import { SettingsNav } from "../../App";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { getSFMaintenance } from "../../services/Admin.Services/controlService";

const WithdrawCards = (props) => {
  const { user } = useUser();
  const { storeFront } = useAppState();
  const { setNavStateFunc } = useContext(SettingsNav);
  const [withdraw, setWithdraw] = useState(false);
  const [withdrawFee, setWithdrawFee] = useState("");
  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState(false);
  const [failed, setFailed] = useState(false);
  const [notice, setNotice] = useState(false);
  const [message, setMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [maintenance, setMaintenance] = useState({});

  const [costError, setCostError] = useState(null);

  const { withdrawAccount, bankCode, bankName, acctName, storePin } =
    storeFront;

  const bankObj = {
    withdrawAccount,
    bankCode,
    bankName,
    acctName,
    storePin,
  };

  const [withdrawDetails, setWithdrawDetails] = useState({
    amount: "",
    withType: "bank",
    password: "",
  });
  const [loading, setLoading] = useState(false);

  function calculateFee(value) {
    if (value <= 5000) {
      setWithdrawFee("10");
    } else if (value > 5000 && value < 50001) {
      setWithdrawFee("25");
    } else if (value > 50000) {
      setWithdrawFee("50");
    } else {
      setWithdrawFee("");
    }
  }
  const handleChange = ({ currentTarget: input }) => {
    const validationErrors = { ...errors };
    const errorMessage = validateProperty(input);
    if (errorMessage) validationErrors[input.name] = errorMessage;
    else delete validationErrors[input.name];

    const { name, value } = input;
    if (name == "amount") {
      calculateFee(value);
    }
    setWithdrawDetails({ ...withdrawDetails, [name]: value });

    setErrors(validationErrors);
  };

  const storedModalState = JSON.parse(localStorage.getItem("modal") || "{}");
  const storedModalItem = JSON.parse(localStorage.getItem("modalItem") || "{}");
  const [modalState, setModalState] = useState("state0");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (withdrawDetails.withType == "bank") {
      if (
        bankObj.bankCode &&
        bankObj.bankCode !== "" &&
        bankObj.bankName &&
        bankObj.bankName !== "" &&
        bankObj.withdrawAccount &&
        bankObj.withdrawAccount !== "" &&
        bankObj.acctName &&
        bankObj.acctName !== "" &&
        bankObj.bankCode &&
        bankObj.bankCode !== ""
      ) {
        try {
          setLoading(true);
          await withdrawStoreFront(
            {
              id: user?._id,
              ...withdrawDetails,
            },
            user?.access_token
          );
          setLoading(false);
          setMessage("Withdrawal Successful");
          setWithdraw(false);
          setErrors({});
          setWithdrawDetails({
            amount: "",
            withType: "bank",
            password: "",
          });
          setSuccess(true);
        } catch (error) {
          setLoading(false);

          setMessage("Error Withdrawing");
          setWithdraw(false);

          setFailed(true);

          console.log(error);
        }
      } else {
        setNavStateFunc(4);
        setNotice(true);
      }
    } else {
      try {
        setLoading(true);
        await withdrawStoreFront(
          {
            id: user?._id,
            ...withdrawDetails,
          },
          user?.access_token
        );
        setLoading(false);
        setMessage("Withdrawal Successful");
        setWithdraw(false);
        setErrors({});
        setWithdrawDetails({
          amount: "",
          withType: "bank",
          password: "",
        });
        setSuccess(true);
      } catch (error) {
        setLoading(false);
        setMessage("Error Adding Account");
        setWithdraw(false);

        setFailed(true);

        console.log(error);
      }
    }
  };

  useEffect(() => {
    // console.log(cash, "lsls");
    if (withdrawDetails.amount > storeFront?.wallet) {
      setCostError("Insufficient funds to withdraw");
    } else {
      setCostError(null);
    }
  }, [withdrawDetails.amount]);

  useEffect(() => {
    const getSFMaintenanceFunc = async () => {
      // setLoading(true);
      const resp = await getSFMaintenance();
      setMaintenance(resp?.data?.maintenance);
      console.log(resp, "air8");

      // setLoading(false);
    };

    getSFMaintenanceFunc();
  }, []);

  console.log(withdrawDetails, "kk");
  console.log(user, "ooijj");

  return (
    <Card>
      <CardBody>
        <div className="fund__div">
          <div className="d-flex">
            <div
              className={`circle-box lg-box d-inline-block ${props.bg}`}
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              {/* <i className={props.icon}></i> */}
              <img src={props.icon} style={{ width: "2rem", height: "2rem" }} />
            </div>
            <div className="ms-3">
              <h6 className="mb-0 font-weight-bold">{props.earning}</h6>
              <small className="text-muted">{props.subtitle}</small>
            </div>
          </div>

          {user?.type !== "agent" && (
            <button
              onClick={() => {
                if (
                  maintenance["withdrawal"] &&
                  maintenance["withdrawal"] == true
                ) {
                  toast.error(
                    "The Store front withdrawal feature is on maintenance, check in later!"
                  );
                } else {
                  setWithdraw(true);
                }
              }}
              className="fund__wallet__btn"
            >
              Withdraw
            </button>
          )}
        </div>
      </CardBody>
      <Modal centered isOpen={withdraw} toggle={() => setWithdraw(!withdraw)}>
        <ModalBody>
          <div className="add__sub__dealer__con">
            <div className="add__sub__dealer__head">
              <h4>Withdraw</h4>
            </div>
            <Form>
              {" "}
              <Col md={12}>
                <FormGroup className="mb-3">
                  <Label>Withdrawal Channel</Label>{" "}
                  <span className="text-danger">*</span>
                  <Input
                    onChange={handleChange}
                    name="withType"
                    // invalid={errors.bankCode}
                    value={withdrawDetails.withType}
                    className="mb-3"
                    type="select"
                    // disabled={account.network == ""}
                    required
                  >
                    <>
                      <option value="bank">Withdraw to Bank</option>
                      <option value="wallet">Withdraw to Wallet</option>
                    </>
                  </Input>
                  {/* <FormFeedback>{errors.bankCode}</FormFeedback> */}
                </FormGroup>
              </Col>{" "}
              <Col md={12}>
                <FormGroup
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "flex-start",
                    width: "100%",
                  }}
                >
                  <Label for="withdrawAmount">
                    Amount to Withdraw <span className="text-danger">*</span>
                  </Label>
                  <Input
                    value={withdrawDetails.amount}
                    id="amount"
                    name="amount"
                    type="number"
                    onChange={handleChange}
                    required
                    invalid={errors.amount || costError}
                  />
                  <FormFeedback>{errors.amount}</FormFeedback>
                  <FormFeedback>{costError}</FormFeedback>
                </FormGroup>
              </Col>
              {withdrawDetails.withType == "bank" && (
                <Col md={12}>
                  <FormGroup
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "flex-start",
                      width: "100%",
                    }}
                  >
                    <Label for="withdrawAmount">
                      Withdrawal Fee <span className="text-danger">*</span>
                    </Label>
                    <Input
                      value={withdrawFee}
                      id="amount"
                      name="withdrawFee"
                      type="number"
                      onChange={handleChange}
                      required
                      disabled
                      // invalid={errors.amount}
                    />
                    {/* <FormFeedback>{errors.amount}</FormFeedback> */}
                  </FormGroup>
                </Col>
              )}
              <Col md={12}>
                <FormGroup
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "flex-start",
                    width: "100%",
                  }}
                >
                  <Label for="password">
                    Wisper Account Password{" "}
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
                    <span className="text-danger">*</span>
                  </Label>

                  <Input
                    value={withdrawDetails.password}
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    onChange={handleChange}
                    invalid={errors.password}
                    required
                  />

                  <FormFeedback>{errors.password}</FormFeedback>
                </FormGroup>
              </Col>
              <ModalFooter className="confirm-footer">
                <Button
                  color="primary"
                  disabled={formIsValid(errors) || loading}
                  onClick={handleSubmit}
                  size="lg"
                  type="submit"
                  className="submit-btn"
                >
                  Confirm
                </Button>{" "}
                <Button onClick={() => setWithdraw(false)}>No, Cancel</Button>
              </ModalFooter>
            </Form>
          </div>
        </ModalBody>
      </Modal>

      <Modal
        centered
        isOpen={success}
        toggle={() => {
          setSuccess(!success);
          window.location.reload();
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
              window.location.reload();
            }}
          >
            Close
          </Button>
        </ModalFooter>
      </Modal>

      <Modal
        centered
        isOpen={notice}
        toggle={() => {
          setNotice(!notice);
        }}
      >
        <ModalBody>
          <div className="confirm text-center">
            <p>Set a withdrawal account in the settings page to proceed </p>
          </div>
        </ModalBody>
        <ModalFooter className="confirm-footer">
          <Link to={`/settings`}>
            <Button color="primary">Set up</Button>
          </Link>
          <Button
            color="secondary"
            onClick={() => {
              setNotice(false);
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
    </Card>
  );
};

export default WithdrawCards;
