import React, { useEffect, useState } from "react";
import warning from "../../assets/images/logos/warning.png";
import cancel from "../../assets/images/logos/cancel.png";
import checked from "../../assets/images/logos/checked.png";
import loadingGIF from "../../assets/images/logos/loading2.gif";
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
} from "reactstrap";

import {
  formIsValid,
  validateProperty,
  // validateForm,
  handleFailedRequest,
} from "../../utils";

import { createAgents, register } from "../../services/userService";

import { Link } from "react-router-dom";
import AdminLayout from "../../layouts/AdminLayout";
import { useAdmin } from "../../context/adminContext";
import { AiOutlinePlus } from "react-icons/ai";
import { useUser } from "../../context/userContext";
import { getAgents } from "../../services/dataService";
import Loader from "../../layouts/loader/Loader";
import moment from "moment";
import FullLayout from "../../layouts/FullLayout";

const Agents = () => {
  const { user } = useUser();

  const [searchValue, setSearchValue] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [success, setSuccess] = useState(false);
  const [confirm, setConfirm] = useState(false);
  const [failed, setFailed] = useState(false);
  const [agents, setAgents] = useState([]);
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

  const handleSubmit = async (e) => {
    // e.preventDefault();

    try {
      setLoading(true);
      const response = await createAgents({
        business: user?._id,
        fullName: account.name,
        email: account.email,
        username: account?.username,
        phoneNumber: account?.mobile_number,
      });
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
      const { status, message } = handleFailedRequest(error);
      setFailed(true);
      setServerResponse({ status, message });
      setAccount({
        name: "",
        email: "",
        mobile_number: "",
        address: "...",
        username: "",
        password: "",
      });
      // console.log(error.response);
      // console.log(status);
      // console.log(message);
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

  useEffect(() => {
    const fetchAgents = async () => {
      setLoading(true);
      const resp = await getAgents({
        userId: user?._id,
      });
      setAgents(resp?.subdealers);
      setLoading(false);
    };

    fetchAgents();
  }, []);

  const handleSearchChange = (e) => {
    const val = e.target.value;
    setSearchValue(val);

    if (e.target.value === "") return setSearchResults([]);

    const results = agents.filter(
      (business) =>
        business.email.includes(val) ||
        business.username.includes(val) ||
        business._id.includes(val)
    );

    setSearchResults(results);
  };

  return (
    <FullLayout>
      <div className="sub__dealers__container">
        <h4>Agents</h4>
        <div className="sub__dealers__head">
          <input
            onChange={handleSearchChange}
            value={searchValue}
            name="search"
            placeholder="Search"
            type="text"
          />

          <button
            onClick={() => {
              setConfirm(true);
            }}
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <AiOutlinePlus /> Add Agents
          </button>
        </div>

        {searchResults.length > 0 && (
          <Card className="mb-3">
            <CardBody>
              <Row className="justify-content-center align-items-center">
                <Col>
                  <CardText className="text-muted" tag="h6">
                    {searchResults.length} Search Result(s)
                  </CardText>
                </Col>
              </Row>
            </CardBody>
          </Card>
        )}

        {searchResults.length > 0 && (
          <Card>
            <CardBody>
              <CardTitle className="text-center" tag="h5">
                Manage Agents
              </CardTitle>
              {/*      <CardSubtitle
              className="mb-2 d-block text-danger text-center"
              tag="small"
            >
              MTN Gifting Data Plans are unavailable for now!
            </CardSubtitle> */}

              {loading ? (
                <Loader isLoading={loading} />
              ) : (
                <Table
                  striped
                  className="no-wrap mt-3 align-middle"
                  responsive
                  borderless
                >
                  <thead>
                    <tr>
                      <th>S/N</th>
                      <th>Name</th>
                      <th>Username</th>
                      <th>Email</th>
                      {/* <th>Phone</th> */}

                      <th>Created At</th>
                    </tr>
                  </thead>
                  <tbody>
                    {searchResults.map((tdata, index) => (
                      <tr key={index} className="border-top">
                        <td>{index}</td>
                        <td>
                          <div className="d-flex align-items-center py-2">
                            <Link
                              to={`/agents/business/${tdata?._id}`}
                              className="text-decoration-none"
                            >
                              <h6 className="mb-0">{tdata?.name}</h6>
                            </Link>
                          </div>
                        </td>
                        <td>{tdata?.username}</td>
                        <td>{tdata?.email}</td>
                        {/* <td>{tdata?.}</td> */}
                        {/* <td>{tdata.type}</td> */}
                        <td>
                          {" "}
                          {moment(tdata.createdAt).format("YYYY-MM-DD ")}{" "}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              )}
            </CardBody>
          </Card>
        )}

        {searchResults.length === 0 && (
          <Card>
            <CardBody>
              <CardTitle className="text-center" tag="h5">
                Manage Agents
              </CardTitle>
              {/*      <CardSubtitle
              className="mb-2 d-block text-danger text-center"
              tag="small"
            >
              MTN Gifting Data Plans are unavailable for now!
            </CardSubtitle> */}

              {loading ? (
                <Loader isLoading={loading} />
              ) : (
                <Table
                  striped
                  className="no-wrap mt-3 align-middle"
                  responsive
                  borderless
                >
                  <thead>
                    <tr>
                      <th>S/N</th>
                      <th>Name</th>
                      <th>Username</th>
                      <th>Email</th>
                      <th>Phone</th>
                      <th>Created At</th>
                    </tr>
                  </thead>
                  <tbody>
                    {agents.map((tdata, index) => (
                      <tr key={index} className="border-top">
                        <td>{index}</td>
                        <td>
                          <div className="d-flex align-items-center py-2">
                            <Link
                              to={`/agents/business/${tdata?._id}`}
                              className="text-decoration-none"
                            >
                              <h6 className="mb-0">{tdata?.name}</h6>
                            </Link>
                          </div>
                        </td>
                        <td>{tdata?.username}</td>
                        <td>{tdata?.email}</td>
                        <td>{tdata?.mobile_number}</td>
                        {/* <td>{tdata.type}</td> */}
                        <td>
                          {" "}
                          {moment(tdata.createdAt).format("YYYY-MM-DD ")}{" "}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              )}
            </CardBody>
          </Card>
        )}
      </div>

      {/* Success On Data sent*/}
      <Modal centered isOpen={success} toggle={() => setSuccess(!success)}>
        <ModalBody>
          <div className="confirm text-center">
            <img src={checked} className="confirm-checked" alt="success" />
            <p>
              Thank you for adding an agent to your account. We've sent the
              login information via email. If you have any questions or need
              further assistance, please don't hesitate to contact our support
              team.
            </p>
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
            <p>{serverResponse.message}</p>
          </div>
        </ModalBody>
        <ModalFooter className="confirm-footer">
          <Button color="secondary" onClick={() => setFailed(false)}>
            Close
          </Button>
        </ModalFooter>
      </Modal>

      <Modal centered isOpen={confirm} toggle={() => setConfirm(!confirm)}>
        <ModalBody>
          <div className="add__sub__dealer__con">
            <div className="add__sub__dealer__head">
              <h4>Create Agent</h4>
              <h5>Empower Agents to Grow Together</h5>
            </div>

            {/* {!serverResponse.status && (
              <Alert color="danger">{serverResponse.message}</Alert>
            )} */}
            <Form onSubmit={handleSubmit}>
              <FormGroup className="mb-3">
                <Label>Full name</Label> <span className="text-danger">*</span>
                <Input
                  onChange={handleChange}
                  value={account.name}
                  invalid={errors.name}
                  type="text"
                  required
                  name="name"
                />
                <FormFeedback>{errors.name}</FormFeedback>
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
                <Label>Username</Label> <span className="text-danger">*</span>
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
                  Phone number <span className="text-danger">*</span>
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
            disabled={formIsValid(errors) || loading}
            size="lg"
            type="submit"
            className="submit-btn"
          >
            Create
          </Button>{" "}
          <Button onClick={() => setConfirm(false)}>No, Cancel</Button>
        </ModalFooter>
      </Modal>
    </FullLayout>
  );
};

export default Agents;
