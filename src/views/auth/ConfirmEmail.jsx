import { useContext, useEffect, useState } from "react";
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
import { ToastContainer } from "react-toastify";
import { useHistory } from "react-router-dom";
import toast from "react-hot-toast";
import { SettingsNav } from "../../App";

const ConfirmEmail = ({ match }) => {
  const history = useHistory();
  const { setVerificationMessage } = useContext(SettingsNav);

  const [account, setAccount] = useState({ password: "", cpassword: "" });
  const [msgError, setMsgError] = useState("");
  const [errors, setErrors] = useState({});
  const [serverResponse, setServerResponse] = useState({
    status: true,
    message: "",
  });
  const [loading, setLoading] = useState(false);

  // const token = match.params;

  const urlParams = new URLSearchParams(window.location.search);
  const token = urlParams.get("token");

  // console.log(token);

  useEffect(() => {
    const handleSubmit = async () => {
      try {
        const res = await authService.confirmEmail(token);
        setVerificationMessage(res.data?.message);
        history.push("/login");
      } catch (error) {
        setVerificationMessage(error.response?.data?.message);
        history.push("/login");
      }
    };

    handleSubmit();
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

  const resendLinkFunc = async () => {
    try {
      setLoading(true);
      const res = await authService.resendLink(account.email);
      setLoading(false);
      toast.success(res.data?.message);
    } catch (error) {
      console.log(error.response, "res");
      setLoading(false);
      toast.error("error sending confirmation link");
    }
  };

  return (
    <AuthLayout>
      <ToastContainer />
      {msgError && <Alert color="danger">{msgError}</Alert>}
      {/* {!serverResponse.status && (
        <Alert color="danger">{serverResponse.message}</Alert>
      )} */}
      {/*  */}
    </AuthLayout>
  );
};

export default ConfirmEmail;
