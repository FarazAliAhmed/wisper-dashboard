import React, { useEffect, useState } from "react";

import "../../assets/scss/SF.scss";
import { Link, useParams } from "react-router-dom";
import { BsWhatsapp, BsInstagram, BsFacebook } from "react-icons/bs";
import { BiSolidPhoneCall } from "react-icons/bi";
import { RiTwitterXFill } from "react-icons/ri";
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
} from "reactstrap";
import { validateProperty } from "../../utils";
import { getUsernameStoreFront } from "../../services/dataService";
import Loader from "../../layouts/loader/Loader";
import timer from "../../assets/images/users/packages.svg";
import empty from "../../assets/images/users/cart.png";
const SFCustomer = () => {
  const { storeName } = useParams();
  const [success, setSuccess] = useState(false);
  const [confirm, setConfirm] = useState(false);
  const [failed, setFailed] = useState(false);
  const [storeFront, setStoreFront] = useState({});
  const [account, setAccount] = useState({
    name: "",
    email: "",
    mobile_number: "",
    address: "...",
    username: "",
    password: "",
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
        const resp = await getUsernameStoreFront(storeName);
        setStoreFront(resp.data);
        setLoading(false);
      } catch (error) {
        setErrors("error");
        setLoading(false);
      }
    };

    fetchStoreFront();
  }, []);

  const handleSubmit = async (e) => {
    // e.preventDefault();

    try {
      setLoading(true);
      // const response = await createSubDealers({
      //   business: user?._id,
      //   fullName: account.name,
      //   email: account.email,
      //   username: account?.username,
      //   phoneNumber: account?.mobile_number,
      // });
      setLoading(false);
      setSuccess(true);
      setAccount({
        name: "",
        email: "",
        mobile_number: "",
        address: "...",
        username: "",
        password: "",
      });
      // window.location.reload();
      // authService.loginWithJwt(response.headers["x-auth-token"]);
      setErrors({});
      // window.location = "/dashboard";
    } catch (error) {
      setLoading(false);
      // const { status, message } = handleFailedRequest(error);
      setFailed(true);
      // setServerResponse({ status, message: "User Already Registered" });
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
  console.log(storeFront, "hhh");
  return (
    <>
      {" "}
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

                        <Form onSubmit={handleSubmit}>
                          <FormGroup className="mb-3">
                            <Label>Customer Name</Label>{" "}
                            <span className="text-danger">*</span>
                            <Input
                              onChange={handleChange}
                              value={""}
                              invalid={errors.name}
                              type="text"
                              required
                              name="customer"
                            />
                            <FormFeedback>{errors.customer_name}</FormFeedback>
                          </FormGroup>
                          <FormGroup className="mb-3">
                            <Label>Email address</Label>{" "}
                            <span className="text-danger">*</span>
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
                            <Label>Username</Label>{" "}
                            <span className="text-danger">*</span>
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
                              Phone number{" "}
                              <span className="text-danger">*</span>
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
                        </Form>
                      </div>
                    </ModalBody>
                    <ModalFooter className="confirm-footer">
                      <Button
                        color="primary"
                        onClick={() => {
                          handleSubmit();
                          setConfirm(false);
                        }}
                        // disabled={formIsValid(errors) || loading}
                        size="lg"
                        type="submit"
                        className="submit-btn"
                      >
                        Create
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
    </>
  );
};

export default SFCustomer;
