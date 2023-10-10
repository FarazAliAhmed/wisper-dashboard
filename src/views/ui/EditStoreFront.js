import React, { useEffect, useRef, useState } from "react";
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
import "../../assets/scss/SF.scss";
import "../../assets/scss/custom.scss";
import { Link } from "react-router-dom";
import AvatarEditor from "react-avatar-editor";

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
import defaultImg from "../../assets/images/users/user4.jpg";
import { useAppState } from "../../context/appContext";
import { useUser } from "../../context/userContext";
import SFPricesTable from "../../components/SFPricesTable";
import {
  checkUsername,
  getAllPlansUser,
  updateStoreFront,
  uploadImage,
} from "../../services/dataService";
import CopyToClipboard from "react-copy-to-clipboard";
import { MdOutlineContentCopy } from "react-icons/md";
import { set } from "lodash";
import { IoMdClose } from "react-icons/io";
import { AiFillEye } from "react-icons/ai";

const ImageModal = ({ imgUrl, closeModal, avatarFunc }) => {
  console.log(imgUrl);
  const editorRef = useRef(null);
  const [loading, setLoading] = useState();
  const onClickSave = async () => {
    try {
      if (editorRef.current) {
        const canvas = editorRef.current.getImage();

        const canvasScaled = editorRef.current.getImageScaledToCanvas();
        // Do something with the canvas or canvasScaled

        canvas.toBlob((blob) => {
          // Do something with the Blob
          if (blob) {
            const image = new File([blob], "image.jpg", { type: blob.type });
            // Use the image File object as needed
            const formData = new FormData();
            formData.append("profileImg", image);

            setLoading(true);

            uploadImage(formData).then((res) => {
              avatarFunc(res?.data);
              closeModal();
              setLoading(false);
              toast.success(`Successfully uploaded! Please save changes `);
            });
            // console.log(formData);

            // console.log(formData);
          }
        }, "image/jpeg");
      }
    } catch (error) {
      setLoading(false);
      toast.error("error uploading");
    }
  };

  const formdata = new FormData();
  formdata.append("image", "sksk");
  console.log(formdata);

  return (
    <div className="avatar__modal-overlay">
      <div className="avatar__modal">
        <span className="avatar__close" onClick={closeModal}>
          <IoMdClose size={15} cursor="pointer" color="#000" />
        </span>
        <div className="avatar__modal-content">
          <AvatarEditor
            ref={editorRef}
            image={imgUrl}
            width={180}
            height={180}
            border={50}
            borderRadius={200}
            color={[255, 255, 255, 0.9]} // RGBA
            scale={1.2}
            rotate={0}
          />

          <Button color="primary" onClick={onClickSave}>
            {loading ? (
              <BeatLoader size={10} color="white" loading />
            ) : (
              <span>Continue</span>
            )}
          </Button>
          {/* <button color onClick={onClickSave}>
         
            {uploadImageLoading ? (
              <BeatLoader size={10} color="white" loading />
            ) : (
              <span>Continue</span>
            )}
            <span>Continue</span>
          </button> */}
        </div>
      </div>
    </div>
  );
};

const EditStoreFront = () => {
  const { user } = useUser();
  const { storeFront } = useAppState();
  const [prices, setPrices] = useState([]);
  const [fetchPrice, setFetchPrice] = useState(false);
  const [usernameCheck, setUsernameCheck] = useState([]);

  const [openModal, setOpenModal] = useState(false);
  const [imgUrl, setImgUrl] = useState("");
  const [modalKey, setModalKey] = useState(0);
  const [avatar, setAvatar] = useState("");
  const fileInputRef = useRef(null);

  const handleFileUpload = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileSelected = async (event) => {
    const file = event.target.files && event.target.files[0];

    if (file) {
      // Get the file extension
      const extension = file.name.split(".").pop()?.toLowerCase();

      // Check if the file extension indicates an image
      if (
        extension &&
        (extension === "jpg" ||
          extension === "jpeg" ||
          extension === "png" ||
          extension === "webp")
      ) {
        // Check the file size
        const fileSize = file.size / 1024; // Convert to KB
        const maxSizeKB = 500; // Maximum size in KB

        if (fileSize <= maxSizeKB) {
          const imageUrl = URL.createObjectURL(file);
          setImgUrl(imageUrl);
          setOpenModal(true);
          setModalKey((prevKey) => prevKey + 1);
        } else {
          // Display an error message or perform any other appropriate action
          console.error("Selected file size exceeds the limit (500KB).");
          toast.error("Selected file size exceeds the limit (500KB).");
        }
      } else {
        // Display an error message or perform any other appropriate action
        console.error(
          "Selected file is not a supported image format (JPEG, JPG, PNG, or WebP)."
        );
        toast.error(
          "Selected file is not a supported image format (JPEG, JPG, PNG, or WebP)."
        );
      }
    }

    // Reset the file input value
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const closeModal = () => {
    setOpenModal(false);
    setImgUrl("");
  };

  const setAvatarFunc = (image) => {
    setStoreInfo({ ...storeInfo, storeImg: image });
  };

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
    storeUserName: "",
  });
  const {
    socialLinks,
    storeName,
    storeDesc,
    phoneNumber,
    storeImg,
    storeURL,
    storeColor,
    storeUserName,
  } = storeFront;

  const reqObj = {
    ...socialLinks,
    storeName,
    storeUserName,
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
  }, [fetchPrice]);

  useEffect(() => {
    setStoreInfo(reqObj);
  }, [storeFront]);

  useEffect(() => {
    const fetchUsernameChecker = async () => {
      await checkUsername(storeInfo?.storeUserName).then((res) => {
        setUsernameCheck(res?.data);
      });
    };

    fetchUsernameChecker();
  }, [storeInfo.storeUserName]);

  const [errors, setErrors] = useState({});
  const [errorsPass, setErrorsPass] = useState({});
  const [navState, setNavState] = useState(0);
  const [serverResponse, setServerResponse] = useState({
    status: true,
    message: "",
  });
  const [loading, setLoading] = useState(false);

  const [balanceDisplay, setBalanceDisplay] = useState("");

  const handleBrandSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      await updateStoreFront(
        {
          id: user?._id,
          storeImg: storeInfo.storeImg,
          storeColor: storeInfo.storeColor,
        },
        user?.access_token
      );
      setLoading(false);
      toast.success("Store Information Updated");
      // window.location.reload();
    } catch (error) {
      setLoading(false);
      toast.error("Error Updating Store Information");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      await updateStoreFront(
        {
          id: user?._id,
          storeName: storeInfo.storeName,
          storeDesc: storeInfo.storeDesc,
          storeURL: `${window.location.protocol}//${window.location.host}/sf/${storeInfo.storeUserName}`,
          phoneNumber: storeInfo.phoneNumber,
          // storeImg: storeInfo.storeImg,
          // storeColor: storeInfo.storeColor,
          storeUserName: storeInfo.storeUserName,
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
      setErrors({});

      // window.location.reload();
    } catch (error) {
      setLoading(false);
      toast.error("Error Updating Store Information");
    }
  };

  const handleChange = async ({ currentTarget: input }) => {
    const validationErrors = { ...errors };
    const errorMessage = validateProperty(input);
    if (errorMessage) validationErrors[input.name] = errorMessage;
    else delete validationErrors[input.name];
    const { name, value } = input;

    // Check for spaces in the input value
    if (name === "storeUserName" && value.includes(" ")) {
      // If spaces are found, replace them with underscores or handle it as desired
      const sanitizedValue = value.replace(/ /g, "_"); // Replace spaces with underscores

      // Update the state with the sanitized value
      setStoreInfo({ ...storeInfo, [name]: sanitizedValue });
      setErrors(validationErrors);
    } else {
      // If no spaces, update the state normally
      setStoreInfo({ ...storeInfo, [name]: value });
      setErrors(validationErrors);
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
          <a target="_blank" href={storeFront.storeURL}>
            <Button color="primary">Preview</Button>
          </a>
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
                  </FormGroup>
                </Col>
                <Col md={6}>
                  <FormGroup>
                    <Label for="storeName">Store User Name</Label>
                    <Input
                      id="storeUserName"
                      name="storeUserName"
                      value={storeInfo.storeUserName}
                      onChange={handleChange}
                      // invalid={errors.name}
                      type="text"
                    />
                    <p style={{ color: "red" }}>
                      {usernameCheck &&
                      storeInfo.storeUserName != storeFront.storeUserName
                        ? `${storeInfo.storeUserName} already exist`
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
                      invalid={errors.phoneNumber}
                      id="mobile_number"
                      name="phoneNumber"
                      onChange={handleChange}
                      type="number"
                    />
                    <FormFeedback>{errors.phoneNumber}</FormFeedback>
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
              <Button
                disabled={formIsValid(errors) || loading}
                type="submit"
                color="primary"
              >
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
            <Form onSubmit={handleBrandSubmit}>
              <Row form>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  <Col md={3}>
                    <FormGroup>
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "column",
                        }}
                      >
                        {storeFront.storeImg == "" || !storeFront.storeImg ? (
                          ""
                        ) : (
                          <img
                            className="sf__avatar"
                            alt="avatar"
                            src={storeInfo.storeImg}
                          />
                        )}

                        <input
                          type="file"
                          style={{ display: "none" }}
                          ref={fileInputRef}
                          onChange={handleFileSelected}
                          accept=".jpg, .jpeg, .png, .webp" // Specify the allowed file extensions here
                        />
                        <Label for="storeName">Store Logo </Label>

                        <Button
                          style={{
                            width: "80%",
                          }}
                          onClick={handleFileUpload}
                          color="primary"
                        >
                          {storeFront.storeImg == "" || !storeFront.storeImg
                            ? "Upload"
                            : "Replace"}
                        </Button>
                      </div>
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
                </div>
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
              fetchPrice={setFetchPrice}
            />
          </Row>
        )}
      </div>
      {openModal && (
        <ImageModal
          key={modalKey} // Add key prop here
          imgUrl={imgUrl}
          closeModal={closeModal}
          avatarFunc={setAvatarFunc}
        />
      )}
    </FullLayout>
  );
};

export default EditStoreFront;
