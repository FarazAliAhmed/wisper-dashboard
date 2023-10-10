import React, { useEffect, useState } from "react";

import "../../assets/scss/SF.scss";
import { Link, useParams } from "react-router-dom";
import { BsWhatsapp, BsInstagram, BsFacebook } from "react-icons/bs";
import { BiSolidPhoneCall } from "react-icons/bi";
import { RiTwitterXFill } from "react-icons/ri";
import { FiShare } from "react-icons/fi";
import { BsChevronRight } from "react-icons/bs";
import { IoMdCall } from "react-icons/io";
import toast from "react-hot-toast";
import logo from "../../assets/images/logos/wisperN.png";
import {
  Card,
  CardBody,
  CardTitle,
  Table,
  Row,
  Col,
  Button,
  FormGroup,
  Input,
  CardText,
  Modal,
  ModalBody,
  ModalFooter,
  FormFeedback,
  Alert,
  Label,
  Form,
  UncontrolledAlert,
  ModalHeader,
} from "reactstrap";
import { validateProperty } from "../../utils";
import {
  allocateData,
  allocateSFData,
  getAllPlansUser,
  getCustomerName,
  getUsernameStoreFront,
} from "../../services/dataService";
import Loader from "../../layouts/loader/Loader";
import timer from "../../assets/images/users/packages.svg";
import empty from "../../assets/images/users/cart.png";
import { ShareSocial } from "react-share-social";
import { closePaymentModal, useFlutterwave } from "flutterwave-react-v3";
import { numbers } from "../../networkCheckout";
import CopyToClipboard from "react-copy-to-clipboard";
import cancel from "../../assets/images/logos/cancel.png";
import checked from "../../assets/images/logos/checked.png";
const { REACT_APP_FLUTTERWAVE_TEST_PUBLIC_KEY } = process.env;

const SFCustomer = () => {
  const { storeUserName } = useParams();

  const [success, setSuccess] = useState(false);
  const [confirm, setConfirm] = useState(false);
  const [prices, setPrices] = useState(false);
  const [failed, setFailed] = useState(false);
  const [copyState, setCopyState] = useState(false);
  const [customerName, setCustomerName] = useState({
    name: "",
    state: false,
  });

  const [customerEmail, setCustomerEmail] = useState({
    email: "",
    state: false,
  });

  const [storeFront, setStoreFront] = useState({});
  const [activePlan, setActivePlan] = useState({});
  const [isOpen, setIsOpen] = useState(false);
  const [account, setAccount] = useState({
    phone: "",
    name: "",
    storeBusiness: "",
    email: "",
    price: "", // or null if not applicable
    volume: "", // or null if not applicable
    // status: "", // or null if not applicable
    network: "", // or null if not applicable
    transaction_ref: "", // Unique reference identifier
  });
  const [errors, setErrors] = useState({});
  const [serverResponse, setServerResponse] = useState({
    status: true,
    message: "",
  });
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const fetchStoreFront = async () => {
      try {
        setLoading(true);
        const resp = await getUsernameStoreFront(storeUserName);
        setStoreFront(resp.data);
        setLoading(false);

        // Set the page title using resp.data.storeName
        document.title = resp.data.storeName;
      } catch (error) {
        setErrors("error");
        setLoading(false);
      }
    };

    fetchStoreFront();
  }, []);

  useEffect(() => {
    const fetchAllPlansUser = async () => {
      await getAllPlansUser(storeFront.business_id).then((res) => {
        setPrices(res?.data);
        console.log("res", res);
      });
    };

    fetchAllPlansUser();
  }, [storeFront.business_id]);

  useEffect(() => {
    const fetchCustomerName = async () => {
      await getCustomerName(account.phone).then((res) => {
        // setAccount({ ...account, name: res?.data });
        if (res?.data) {
          setCustomerName({
            name: res?.data?.name,
            state: true,
          });

          setCustomerEmail({
            email: res?.data?.email,
            state: true,
          });
        } else {
          setCustomerName({
            name: "",
            state: false,
          });

          setCustomerEmail({
            email: "",
            state: false,
          });
        }

        console.log("resrr", res);
      });
    };

    fetchCustomerName();
  }, [account.phone]);

  const style = {
    background: "primary",
    borderRadius: 3,
    border: 0,
    width: "100%",
    boxShadow: "0 3px 5px 2px rgba(255, 105, 135, .3)",
    color: "black",
    padding: "1rem",
    cursor: "pointer",
  };

  const paymentConfig = {
    public_key: REACT_APP_FLUTTERWAVE_TEST_PUBLIC_KEY,
    tx_ref: "trx-" + Math.floor(Math.random() * 10000000000000000),
    amount: activePlan.selling_price,
    currency: "NGN",
    payment_options: "card, mobilemoney, banktransfer, ussd",
    customer: {
      name: customerName.name,
      phone_number: account.phone,
      email: customerEmail.email,
    },
    customizations: {
      title: "Buy Data",
      description: `Buy Data from ${storeFront.storeUserName}'store `,
    },
  };
  console.log(paymentConfig);
  const initiatePayment = useFlutterwave(paymentConfig);

  const makePayment = () => {
    initiatePayment({ callback: onSuccess, onClose });
  };

  const handleSubmit = async (response) => {
    setLoading(true);

    await allocateSFData({
      network: account.network,
      plan_id: activePlan.plan_id,
      phone_number: account.phone,
      business_id: storeFront.business_id,
      price: activePlan.selling_price,
      volume: activePlan.volume,
      trx_ref: String(response),
      custName: customerName.name,
      custEmail: customerEmail.email,
    });
    setLoading(false);

    setErrors({});
  };

  const onSuccess = async (response) => {
    closePaymentModal();
    try {
      await handleSubmit(response.transaction_id);
      setConfirm(false);
      setSuccess(true);
    } catch (error) {
      setErrors(true);
    }
  };

  const onClose = () => {
    setConfirm(false);
  };

  const handleChange = ({ currentTarget: input }) => {
    const validationErrors = { ...errors };
    const errorMessage = validateProperty(input);
    if (errorMessage) validationErrors[input.name] = errorMessage;
    else delete validationErrors[input.name];

    const { name, value } = input;

    let phoneNumberPrefix;
    let network = "";
    // Determine the network based on the phone number's prefix
    if (name == "phone") {
      phoneNumberPrefix = value.substring(0, 4);
      if (numbers.mtn.includes(phoneNumberPrefix)) {
        network = "mtn";
      } else if (numbers.glo.includes(phoneNumberPrefix)) {
        network = "glo";
      } else if (numbers["9mobile"].includes(phoneNumberPrefix)) {
        network = "9mobile";
      } else if (numbers.airtel.includes(phoneNumberPrefix)) {
        network = "airtel";
      }
    }

    setAccount({ ...account, [name]: value, network: network });
    setErrors(validationErrors);
  };

  const handlePlanChange = ({ currentTarget: input }) => {
    const { name, value } = input;
    if (value == "select") {
      setActivePlan(value);
    } else {
      const selectedPlan = JSON.parse(value);
      setActivePlan(selectedPlan);
    }
  };

  const handleShareClick = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: "Wisper Store",
          text: `Check out this Wisper Store - ${storeFront.storeURL}`,
          url: storeFront.storeURL, // Replace with your desired URL
        });
        console.log("Share successful");
      } catch (error) {
        console.error("Share failed:", error);
      }
    } else {
      // Fallback for browsers that do not support the Web Share API
      alert("Native sharing is not supported on this browser.");
    }
  };

  console.log(activePlan, "hhh");

  return (
    <>
      {loading ? (
        <Loader isLoading={loading} />
      ) : (
        <>
          {errors == "error" ? (
            <div className="sf__customer__container">
              <div className="sf__customer__content">
                <div className="sf__customer__maintenance">
                  <img src={empty} />
                  <h3>This Store Front Account does not Exist</h3>
                </div>

                <div className="sf__customer__footer">
                  <img src={logo} />
                  <p>Powered by Wisper</p>
                </div>
              </div>
            </div>
          ) : (
            <>
              {storeFront.storeMaintenance ? (
                <div className="sf__customer__container">
                  <div className="sf__customer__content">
                    <div className="sf__customer__maintenance">
                      <img src={timer} />
                      <h3>This Store Front Account is on Maintenance Mode</h3>
                      <h5>Please Check in Later</h5>
                    </div>

                    <div className="sf__customer__footer">
                      <img src={logo} />
                      <p>Powered by Wisper</p>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="sf__customer__container">
                  <div className="sf__customer__content">
                    <div className="sf__customer__top">
                      <div className="sf__share">
                        {" "}
                        <Button
                          style={{
                            border: "none",
                            background: `${storeFront.storeColor}`,
                          }}
                          onClick={() => {
                            setIsOpen(true);
                            // handleShareClick();
                          }}
                        >
                          Share Store
                        </Button>
                      </div>
                      <div className="sf__customer__logo">
                        <span>
                          <img
                            style={{
                              border: `3px solid ${storeFront?.storeColor}`,
                            }}
                            src={storeFront?.storeImg}
                          />
                        </span>

                        <div className="sf__customer__head">
                          <h3>{storeFront?.storeName}</h3>
                          <p>{storeFront?.storeDesc}</p>
                        </div>
                        <div className="sf__customer__socials">
                          <a
                            target="_blank"
                            href={storeFront?.socialLinks?.whatsapp}
                          >
                            <BsWhatsapp
                              cursor={"pointer"}
                              color={storeFront.storeColor}
                            />
                          </a>
                          <a
                            target="_blank"
                            href={storeFront?.socialLinks?.instagram}
                          >
                            <BsInstagram
                              cursor={"pointer"}
                              color={storeFront.storeColor}
                            />
                          </a>
                          <a
                            target="_blank"
                            href={storeFront?.socialLinks?.twitter}
                          >
                            <RiTwitterXFill
                              cursor={"pointer"}
                              color={storeFront.storeColor}
                            />
                          </a>
                          <a
                            target="_blank"
                            href={storeFront?.socialLinks?.facebook}
                          >
                            <BsFacebook
                              cursor={"pointer"}
                              color={storeFront.storeColor}
                            />
                          </a>

                          <a
                            target="_blank"
                            href={`tel:${storeFront?.socialLinks?.phoneNumber}`}
                          >
                            <IoMdCall
                              cursor={"pointer"}
                              color={storeFront.storeColor}
                            />
                          </a>
                        </div>
                      </div>

                      <div className="sf__customer__buttons">
                        <h4>Services</h4>

                        <button
                          style={{
                            background: `${storeFront.storeColor}`,
                          }}
                          onClick={() => {
                            setConfirm(true);
                          }}
                        >
                          Buy Data
                        </button>

                        <button
                          style={{
                            background: `${storeFront.storeColor}`,
                          }}
                          onClick={() => {
                            toast.success("Comming Soon");
                          }}
                        >
                          Buy Airtime
                        </button>
                      </div>
                    </div>

                    <div className="sf__customer__footer">
                      <img src={logo} />
                      <p>Powered by Wisper</p>
                    </div>
                  </div>

                  <Modal
                    centered
                    isOpen={confirm}
                    toggle={() => setConfirm(!confirm)}
                  >
                    <ModalBody>
                      <div className="add__sub__dealer__con">
                        <div className="add__sub__dealer__head">
                          <h4>Buy Data</h4>
                          {/* <h5>Empower Sub-Dealers to Grow Together</h5> */}
                        </div>

                        <Form>
                          <FormGroup className="mb-3">
                            <Label>
                              Phone number{" "}
                              <span className="text-danger">*</span>
                            </Label>
                            <Input
                              value={account.phone}
                              invalid={errors.phone}
                              onChange={handleChange}
                              name="phone"
                              required
                              type="number"
                            />
                            <FormFeedback>{errors.phone}</FormFeedback>
                          </FormGroup>
                          <FormGroup className="mb-3">
                            <Label>Customer Name</Label>{" "}
                            <span className="text-danger">*</span>
                            <Input
                              onChange={(e) => {
                                setCustomerName({
                                  ...customerName,
                                  name: e.target.value,
                                });
                              }}
                              value={customerName.name}
                              disabled={customerName.state == true}
                              type="text"
                              required
                              name="name"
                            />
                          </FormGroup>

                          <FormGroup className="mb-3">
                            <Label>Email</Label>{" "}
                            <span className="text-danger">*</span>
                            <Input
                              onChange={(e) => {
                                setCustomerName({
                                  ...customerEmail,
                                  email: e.target.value,
                                });
                              }}
                              value={customerEmail.email}
                              disabled={customerEmail.state == true}
                              type="text"
                              required
                              name="email"
                            />
                          </FormGroup>

                          <FormGroup className="mb-3">
                            <Label>Network</Label>{" "}
                            <span className="text-danger">*</span>
                            <Input
                              onChange={handleChange}
                              value={account.network}
                              type="text"
                              required
                              name="network"
                              disabled
                            />
                          </FormGroup>

                          <FormGroup className="mb-3">
                            <Label>Data Plans</Label>{" "}
                            <span className="text-danger">*</span>
                            <Input
                              onChange={handlePlanChange}
                              name="activePlan"
                              value={
                                activePlan == "select"
                                  ? activePlan
                                  : JSON.stringify(activePlan)
                              }
                              className="mb-3"
                              type="select"
                              disabled={account.network == ""}
                            >
                              {account.network == "" ? (
                                <option value="select">
                                  Select a valid number
                                </option>
                              ) : (
                                <>
                                  <option value="select">Select a plan</option>
                                  {prices
                                    .filter(
                                      (plan) => plan.network === account.network
                                    )
                                    .map((plan) => (
                                      <option
                                        key={plan.id}
                                        value={JSON.stringify(plan)}
                                      >
                                        {plan.size} - {plan.validity}
                                      </option>
                                    ))}
                                </>
                              )}
                            </Input>
                          </FormGroup>
                          <FormGroup className="mb-3">
                            <Label>Price</Label>{" "}
                            <span className="text-danger">*</span>
                            <Input
                              disabled
                              value={`₦${
                                activePlan.selling_price
                                  ? activePlan.selling_price
                                  : ""
                              }`}
                              type="text"
                              required
                              name="price"
                            />
                          </FormGroup>
                        </Form>
                      </div>
                    </ModalBody>
                    <ModalFooter className="confirm-footer">
                      <Button
                        color="primary"
                        onClick={() => {
                          if (
                            account.phone == "" ||
                            customerName.name == "" ||
                            customerEmail.email == "" ||
                            account.network == "" ||
                            activePlan == "select" ||
                            activePlan == "" ||
                            activePlan.selling_price == ""
                          ) {
                            toast.error("incomplete information");
                          } else {
                            makePayment();
                          }
                        }}
                        // disabled={formIsValid(errors) || loading}
                        size="lg"
                        type="submit"
                        className="submit-btn"
                      >
                        Pay Now
                      </Button>{" "}
                      <Button onClick={() => setConfirm(false)}>
                        No, Cancel
                      </Button>
                    </ModalFooter>
                  </Modal>
                </div>
              )}
            </>
          )}
        </>
      )}
      <Modal centered isOpen={isOpen}>
        <ModalHeader toggle={() => setIsOpen(false)}>Share Store</ModalHeader>
        <ModalBody>
          <div className="sf__share__con">
            <div onClick={handleShareClick} style={style}>
              <div className="sf__share__options">
                <span>
                  <FiShare /> Share Options
                </span>
                <BsChevronRight />
              </div>
            </div>
            <div style={style}>
              <div className="sf__share__options">
                <span>
                  <img alt="logo" src={logo} /> {storeFront.storeURL}
                </span>

                {copyState ? (
                  <b
                  // onClick={() => {
                  //   navigator.clipboard.writeText(storeFront.storeURL ?? "");
                  //   setCopyState(!copyState);
                  // }}
                  >
                    Copied{" "}
                  </b>
                ) : (
                  <b
                    onClick={() => {
                      navigator.clipboard.writeText(storeFront.storeURL ?? "");
                      setCopyState(!copyState);
                    }}
                  >
                    Copy
                  </b>
                )}
              </div>
            </div>
          </div>
        </ModalBody>

        {/* <ModalFooter className="confirm-footer">
          <Button type="submit" color="primary" onClick={(e) => {}}>
            Yes, Proceed
          </Button>{" "}
          <Button onClick={() => setIsOpen(false)}>No, Cancel</Button>
        </ModalFooter> */}
      </Modal>

      <Modal centered isOpen={success} toggle={() => setSuccess(!success)}>
        <ModalBody>
          <div className="confirm text-center">
            <img src={checked} className="confirm-checked" alt="success" />
            <p>Data Purchase Successful</p>
          </div>
        </ModalBody>
        <ModalFooter className="confirm-footer">
          <Button color="secondary" onClick={() => setSuccess(false)}>
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
            <p>Data Purchase Failed</p>
          </div>
        </ModalBody>
        <ModalFooter className="confirm-footer">
          <Button color="secondary" onClick={() => setFailed(false)}>
            Close
          </Button>
        </ModalFooter>
      </Modal>
    </>
  );
};

export default SFCustomer;
