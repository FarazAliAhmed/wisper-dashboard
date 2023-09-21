import { useState } from "react";
import {
  Form,
  FormGroup,
  Label,
  Button,
  Input,
  FormFeedback,
  Alert,
} from "reactstrap";
import { Link } from "react-router-dom";
import AuthLayout from "../../layouts/AuthLayout";
import authService, { getCurrentUser } from "../../services/authService";
import {
  formIsValid,
  validateProperty,
  // validateForm,
  handleFailedRequest,
} from "../../utils";
// import { withRouter } from 'react-router-dom';
import "./auth.scss";
import confirmed from "../../assets/dashboard/confirmed.svg";
import { ToastContainer, toast } from "react-toastify";
import { useHistory } from "react-router-dom";

const ConfirmEmail = ({ match }) => {
  const history = useHistory();

  const [account, setAccount] = useState({ password: "", cpassword: "" });
  const [msgError, setMsgError] = useState("");
  const [errors, setErrors] = useState({});
  const [serverResponse, setServerResponse] = useState({
    status: true,
    message: "",
  });
  const [loading, setLoading] = useState(false);

  const { email, token } = match.params;

  console.log(email, token);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (account.password === account.cpassword) {
      try {
        setLoading(true);
        const res = await authService.resetPassword(
          account.password,
          email,
          token
        );
        setLoading(false);

        if (res) {
          toast.success("Password Changed", {
            position: toast.POSITION.TOP_RIGHT,
          });
          history.push("/login");
          // window.location = "/login";
        } else {
          toast.error("Link Expired", {
            position: toast.POSITION.TOP_RIGHT,
          });
          setMsgError("Link Expired");
          throw new Error("Link Expired");
        }
      } catch (error) {
        toast.error("An error occured", {
          position: toast.POSITION.TOP_RIGHT,
        });
        console.log(error);
        setMsgError("Email or password incorrect");
        console.log(error);
        setLoading(false);
        const { status, message } = handleFailedRequest(error);

        setServerResponse({ status, message });
        // console.log(error);
      }
    } else {
      setMsgError("Password does not match");
      return;
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

  return (
    <AuthLayout>
      <ToastContainer />
      {msgError && <Alert color="danger">{msgError}</Alert>}
      {/* {!serverResponse.status && (
        <Alert color="danger">{serverResponse.message}</Alert>
      )} */}
      <div
        className="gap-2 -pb-4 mt-4"
        style={{
          display: "flex",
          justifyContent: "flex-start",
          alignItems: "center",
          flexDirection: "column",
        }}
      >
        <img src={confirmed} style={{ width: "5rem" }} />
        <h1 style={{ fontSize: "1.3rem" }} className="text-center">
          Email verified
        </h1>
        <p
          style={{
            fontSize: "0.8rem",
            textAlign: "center",
            color: "#434343",
            width: "90%",
          }}
        >
          Your email has been verified, you are now registered with Wisper, you
          can login with your details , we will redirect you automatically in
          few minutes.
        </p>

        <div className="d-grid gap-2 mt-2" style={{ width: "60%" }}>
          <Button className="submit-btn" style={{ width: "100%" }}>
            Continue
          </Button>
        </div>
      </div>
    </AuthLayout>
  );
};

export default ConfirmEmail;
