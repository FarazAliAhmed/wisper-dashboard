import React, { useEffect, useState } from "react";
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
import "../../assets/scss/custom.scss";
import { Link } from "react-router-dom";

import TopCards from "../../components/dashboard/TopCards";
import FundCards from "../../components/dashboard/FundCards";
import SupportCard from "../../components/dashboard/SupportCard";
import FullLayout from "../../layouts/FullLayout";
import sterling_logo from "../../assets/images/logos/Sterling_Bank_Logo_Straight.png";
import {
  formIsValid,
  handleFailedRequest,
  validateProperty,
} from "../../utils";
import { totalDataSold, displayBalance } from "../../utils";
import { toast } from "react-hot-toast";
import { BeatLoader } from "react-spinners";

import { useAppState } from "../../context/appContext";
import { useUser } from "../../context/userContext";
import SFPricesTable from "../../components/SFPricesTable";
import {
  checkUsername,
  getAllPlansUser,
  updateStoreFront,
} from "../../services/dataService";
import CopyToClipboard from "react-copy-to-clipboard";
import { MdOutlineContentCopy } from "react-icons/md";
import { set } from "lodash";

const EditStoreFront = () => {
  const { user } = useUser();
  const { storeFront } = useAppState();
  const [prices, setPrices] = useState([]);
  const [usernameCheck, setUsernameCheck] = useState([]);

  const [storeInfo, setStoreInfo] = useState({
    storeName: "",
    storeDesc: "",
    storeURL: "",
    phoneNumber: "",
    whatsapp: "",
    instagram: "",
    twitter: "",
    facebook: "",
    storeImg: "",
    storeColor: "",
  });
  const {
    socialLinks,
    storeName,
    storeDesc,
    phoneNumber,
    storeImg,
    storeURL,
    storeColor,
  } = storeFront;

  const reqObj = {
    ...socialLinks,
    storeName,
    storeDesc,
    phoneNumber,
    storeImg,
    storeURL,
    storeColor,
  };
  useEffect(() => {
    const fetchAllPlansUser = async () => {
      await getAllPlansUser(user._id).then((res) => {
        setPrices(res?.data);
        console.log("res", res);
      });
    };

    fetchAllPlansUser();
  }, []);

  useEffect(() => {
    setStoreInfo(reqObj);
  }, [storeFront]);

  useEffect(() => {
    const fetchUsernameChecker = async () => {
      await checkUsername(storeInfo?.storeName).then((res) => {
        setUsernameCheck(res?.data);
      });
    };

    fetchUsernameChecker();
  }, [storeInfo.storeName]);

  const [errors, setErrors] = useState({});
  const [errorsPass, setErrorsPass] = useState({});
  const [navState, setNavState] = useState(0);
  const [serverResponse, setServerResponse] = useState({
    status: true,
    message: "",
  });
  const [loading, setLoading] = useState(false);

  const [balanceDisplay, setBalanceDisplay] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (usernameCheck == false && storeInfo.storeName != storeFront.storeName) {
      try {
        setLoading(true);
        await updateStoreFront(
          {
            id: user?._id,
            storeName: storeInfo.storeName,
            storeDesc: storeInfo.storeDesc,
            storeURL: "",
            phoneNumber: storeInfo.phoneNumber,
            storeImg: storeInfo.storeImg,
            storeColor: storeInfo.storeColor,
            socialLinks: {
              whatsapp: storeInfo.whatsapp,
              instagram: storeInfo.instagram,
              twitter: storeInfo.twitter,
              facebook: storeInfo.facebook,
            },
          },
          user?.access_token
        );
        setLoading(false);
        toast.success("Store Information Updated");
        window.location.reload();
      } catch (error) {
        setLoading(false);
        toast.error("Error Updating Store Information");
      }
    } else {
      toast.error("Store Name already exist");
    }
  };

  const handleChange = async ({ currentTarget: input }) => {
    const { name, value } = input;

    // Check for spaces in the input value
    if (name === "storeName" && value.includes(" ")) {
      // If spaces are found, replace them with underscores or handle it as desired
      const sanitizedValue = value.replace(/ /g, "_"); // Replace spaces with underscores

      // Update the state with the sanitized value
      setStoreInfo({ ...storeInfo, [name]: sanitizedValue });
    } else {
      // If no spaces, update the state normally
      setStoreInfo({ ...storeInfo, [name]: value });
    }
  };

  // const handleBrandSubmit = async (e) => {
  //   e.preventDefault();

  //   try {
  //     setLoading(true);
  //     // const body = { ...reqObj, ...user };
  //     // await update(body);
  //     setLoading(false);
  //     setStoreInfo({ ...user });
  //     setServerResponse({ status: true, message: "Updated successfully." });
  //     setErrors({});
  //   } catch (error) {
  //     setLoading(false);
  //     const { status, message } = handleFailedRequest(error);
  //     setStoreInfo("");
  //     setServerResponse({ status, message });
  //   }
  // };

  // const handleBrandChange = ({ currentTarget: input }) => {
  //   const { name, value } = input;
  //   setStoreInfo({ ...storeInfo, [name]: value });
  // };

  console.log(prices, "oo");

  const navItems = ["Information", "Branding", "Prices"];

  return (
    <FullLayout>
      <div>
        <div className="sf__head">
          <h4>Edit Store Front </h4>
        </div>
        <div className="settings__nav">
          {navItems.map((item, index) => (
            <p
              onClick={() => {
                setNavState(index);
              }}
              key={index}
              className={navState === index ? "activeNav__item" : ""}
            >
              {item}
            </p>
          ))}
        </div>
        {navState == 0 && (
          <Card body>
            <Form onSubmit={handleSubmit}>
              <Row form>
                <Col md={6}>
                  <FormGroup>
                    <Label for="storeName">Store Name</Label>
                    <Input
                      id="storeName"
                      name="storeName"
                      value={storeInfo.storeName}
                      onChange={handleChange}
                      // invalid={errors.name}
                      type="text"
                    />
                    <p style={{ color: "red" }}>
                      {usernameCheck &&
                      storeInfo.storeName != storeFront.storeName
                        ? `${storeInfo.storeName} already exist`
                        : ""}
                    </p>
                  </FormGroup>
                </Col>
                <Col md={6}>
                  <FormGroup>
                    <Label for="storeDescription">
                      Store Description/Tagline
                    </Label>
                    <Input
                      id="storeDescription"
                      name="storeDesc"
                      value={storeInfo.storeDesc}
                      onChange={handleChange}
                      // invalid={errors.business_name}
                      type="text"
                    />
                  </FormGroup>
                </Col>
                <Col md={6}>
                  <FormGroup>
                    <Label for="Store Url">
                      Store Url{" "}
                      <CopyToClipboard
                        text={storeInfo.storeURL}
                        onCopy={() => {
                          toast.success("Copied!");
                        }}
                      >
                        <MdOutlineContentCopy
                          color="black"
                          cursor={"pointer"}
                        />
                      </CopyToClipboard>{" "}
                    </Label>
                    <Input
                      disabled
                      value={storeInfo.storeURL}
                      id="storeUrl"
                      onChange={handleChange}
                      name="storeURL"
                      type="text"
                    />
                  </FormGroup>
                </Col>

                <Col md={6}>
                  <FormGroup>
                    <Label for="mobile_number">Phone Number</Label>
                    <Input
                      value={storeInfo.phoneNumber}
                      id="mobile_number"
                      name="phoneNumber"
                      onChange={handleChange}
                      type="number"
                    />
                  </FormGroup>
                </Col>
                <Col md={6}>
                  <FormGroup>
                    <Label for="whatsapp">Whatsapp</Label>
                    <Input
                      value={storeInfo.whatsapp}
                      id="whatsapp"
                      name="whatsapp"
                      onChange={handleChange}
                      type="text"
                    />
                  </FormGroup>
                </Col>
                <Col md={6}>
                  <FormGroup>
                    <Label for="instagram">Instagram</Label>
                    <Input
                      value={storeInfo.instagram}
                      id="instagram"
                      name="instagram"
                      onChange={handleChange}
                      type="text"
                    />
                  </FormGroup>
                </Col>
                <Col md={6}>
                  <FormGroup>
                    <Label for="twitter">X</Label>
                    <Input
                      value={storeInfo.twitter}
                      id="twitter"
                      name="twitter"
                      onChange={handleChange}
                      type="text"
                    />
                  </FormGroup>
                </Col>
                <Col md={6}>
                  <FormGroup>
                    <Label for="facebook">Facebook</Label>
                    <Input
                      value={storeInfo.facebook}
                      id="facebook"
                      name="facebook"
                      onChange={handleChange}
                      type="text"
                    />
                  </FormGroup>
                </Col>
              </Row>
              <Button disabled={loading} type="submit" color="primary">
                {loading ? (
                  <BeatLoader size={10} color="white" loading />
                ) : (
                  <>Save</>
                )}
              </Button>
            </Form>
          </Card>
        )}
        {navState == 1 && (
          <Card body>
            <Form onSubmit={handleSubmit}>
              <Row form>
                <Col md={12}>
                  <FormGroup>
                    <Label for="storeName">Store Logo</Label>
                    <Input
                      id="storeLogo"
                      name="storeImg"
                      value={storeInfo.storeImg}
                      onChange={handleChange}
                      // invalid={errors.name}
                      type="text"
                    />
                  </FormGroup>
                </Col>
                <Col md={6}>
                  <FormGroup>
                    <Label for="colorTheme">Color Theme</Label>
                    <Input
                      id="colorTheme"
                      name="storeColor"
                      value={storeInfo.storeColor}
                      onChange={handleChange}
                      // invalid={errors.business_name}
                      type="color"
                    />
                  </FormGroup>
                </Col>
              </Row>
              <Button disabled={loading} type="submit" color="primary">
                {loading ? (
                  <BeatLoader size={10} color="white" loading />
                ) : (
                  <>Save</>
                )}
              </Button>
            </Form>
          </Card>
        )}
        {navState == 2 && (
          <Row className="mt-1">
            <SFPricesTable
              transactions={prices}
              showHeader={true}
              showSubHeader={false}
            />
          </Row>
        )}
      </div>
    </FullLayout>
  );
};

export default EditStoreFront;
