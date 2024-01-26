import React, { useState, useEffect } from "react";
import {
  Card,
  CardBody,
  CardTitle,
  Table,
  Button,
  Input,
  UncontrolledAlert,
  Modal,
  ModalBody,
  ModalFooter,
} from "reactstrap";
import { useUser } from "../../context/userContext";
import { useAppState } from "../../context/appContext";
import { parseDataPlans } from "../../utils";
import { MdOutlineContentCopy } from "react-icons/md";
import cancel from "../../assets/images/logos/cancel.png";
import checked from "../../assets/images/logos/checked.png";
import {
  allocateSFData,
  getAccessToken,
  saveCallback,
  saveWebhook,
} from "../../services/dataService";
import toast from "react-hot-toast";

// import FullLayout from "../../layouts/FullLayout";
// import tableData from "../../utils/plansTable";

// const docs = "https://documenter.getpostman.com/view/17453703/UVksMZmU";
const docs = "https://documenter.getpostman.com/view/25805035/2s9YeN2UJt";

const Documentation = () => {
  const { user } = useUser();
  const { plans } = useAppState();

  const [success, setSuccess] = useState(false);
  const [confirm, setConfirm] = useState(false);
  const [failed, setFailed] = useState(false);

  const [loading, setLoading] = useState(false);
  const [token, setToken] = useState("");
  const [webhook, setWebhook] = useState();
  const [callback, setCallback] = useState();
  const [tableData, setTableData] = useState([]);
  const [gloTableData, setGloTableData] = useState([]);

  useEffect(() => {
    setWebhook(user?.webhook);
    setCallback(user?.callback);
    setToken(user?.access_token);
  }, [user]);

  useEffect(() => {
    const gloPlans = parseDataPlans(plans).filter(
      (item) => item?.network == "glo"
    );
    setTableData(parseDataPlans(plans));
    setGloTableData(gloPlans);
  }, []);

  const handleSubmit = async () => {
    await getAccessToken(user?._id)
      .then((res) => {
        setToken(res.data.newAccessToken);
        setSuccess(true);
        setConfirm(false);
      })
      .catch((error) => {
        setFailed(true);
        setConfirm(false);
      });
  };
  const handleSaveWebhook = () => {
    saveWebhook(webhook);
    showNotice();
  };

  const handleSaveCallback = () => {
    saveCallback(callback);
    showNotice();
  };

  const showNotice = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 3000);
  };

  return (
    <div>
      <>
        {loading && (
          <UncontrolledAlert dismissible color="success">
            Updated Successfully
          </UncontrolledAlert>
        )}
      </>
      <a href={docs} target="_blank" rel="noreferrer">
        <Button color="primary" className="mb-3 px-3">
          API Documentation
        </Button>
      </a>
      <div
        style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}
        className="mb-2"
      >
        <b>Authorization Token:</b>
        <div className="text-muted ">
          {token}
          <MdOutlineContentCopy
            style={{ cursor: "pointer" }}
            onClick={() => {
              navigator.clipboard.writeText(user?.access_token);
              toast.success("copied");
            }}
          />
        </div>
        <a
          style={{
            textDecoration: "none",
          }}
          onClick={(e) => {
            e.preventDefault();
            setConfirm(true);
          }}
          href=""
        >
          Generate New Token
        </a>
      </div>

      {/* Webhook URL */}
      {/* <div className="mb-2">
          <b>Webhook URL:</b>
          <div className="text-muted p-3 d-flex align-items-center flex-column flex-lg-row">
            <Input
              value={webhook}
              id="webhook"
              name="webhook"
              onChange={(e) => setWebhook(e.target.value)}
              type="text"
              style={{width: "280px", margin: "0 .8rem"}}
            />

            <Button
              color="info"
              style={{padding: ".2em 2.2em", margin: ".8em 0"}}
              onClick={handleSaveWebhook}
            >
              Save
            </Button>{" "}
          </div>
        </div>
          */}

      {/* Callback URL */}
      {/*<div className="mb-2">
        <b>Callback URL:</b>
        <div className="text-muted p-3 d-flex align-items-center flex-column flex-lg-row">
          <Input
            value={callback}
            id="callback"
            name="callback"
            onChange={(e) => setCallback(e.target.value)}
            type="text"
            style={{ width: "280px", margin: "0 .8rem" }}
          />
          <Button
            color="info"
            style={{ padding: ".2em 2.2em", margin: ".8em 0" }}
            onClick={handleSaveCallback}
          >
            Save
          </Button>{" "}
        </div>
      </div>
*/}
      <Card>
        <CardBody>
          <CardTitle className="text-center" tag="h5">
            Data List
          </CardTitle>

          <Table
            striped
            className="no-wrap mt-3 align-middle"
            responsive
            borderless
          >
            <thead>
              <tr>
                <th>Data ID</th>
                <th>Network</th>
                {/* <th>Plan Type</th> */}
                {/* <th>Amount</th> */}
                <th>Size </th>
                <th>Validity</th>
              </tr>
            </thead>
            {user?.type == "glo_dealer" || user?.type == "glo_agent" ? (
              <tbody>
                {gloTableData
                  .sort((a, b) => a["network"].localeCompare(b["network"]))
                  .sort((a, b) => a["plan_type"].localeCompare(b["plan_type"]))
                  .map((tdata, index) => (
                    <tr key={index} className="border-top">
                      <td>
                        <div className="d-flex align-items-center py-2">
                          <h6 className="mb-0">{tdata.dataId}</h6>
                        </div>
                      </td>
                      <td>{tdata.network}</td>
                      {/* <td>{tdata.plan_type.toUpperCase()}</td> */}
                      {/* <td>{tdata.amount}</td> */}
                      <td>{tdata.size}</td>
                      <td>{tdata.duration}</td>
                    </tr>
                  ))}
              </tbody>
            ) : (
              <tbody>
                {tableData
                  .sort((a, b) => a["network"].localeCompare(b["network"]))
                  .sort((a, b) => a["plan_type"].localeCompare(b["plan_type"]))
                  .map((tdata, index) => (
                    <tr key={index} className="border-top">
                      <td>
                        <div className="d-flex align-items-center py-2">
                          <h6 className="mb-0">{tdata.dataId}</h6>
                        </div>
                      </td>
                      <td>{tdata.network}</td>
                      {/* <td>{tdata.plan_type.toUpperCase()}</td> */}
                      {/* <td>{tdata.amount}</td> */}
                      <td>{tdata.size}</td>
                      <td>{tdata.duration}</td>
                    </tr>
                  ))}
              </tbody>
            )}
          </Table>
        </CardBody>
      </Card>

      <Modal centered isOpen={confirm} toggle={() => setConfirm(!confirm)}>
        <ModalBody>
          <div className="add__sub__dealer__con">
            <div className="add__sub__dealer__head">
              <h4>Confirm Reset Api Token</h4>
            </div>
            <p>
              Are you sure you want to reset your API Token? This action will
              revoke your current API Token, and you will need to update it in
              any applications services using it
            </p>
          </div>
        </ModalBody>
        <ModalFooter className="confirm-footer">
          <Button
            color="primary"
            onClick={handleSubmit}
            // disabled={formIsValid(errors) || loading}
            size="lg"
            type="submit"
            className="submit-btn"
          >
            Confirm Reset
          </Button>{" "}
          <Button onClick={() => setConfirm(false)}>No, Cancel</Button>
        </ModalFooter>
      </Modal>
      <Modal centered isOpen={success} toggle={() => setSuccess(!success)}>
        <ModalBody>
          <h3>API Token Reset Successful</h3>
          <div className="confirm text-center">
            <img src={checked} className="confirm-checked" alt="success" />
            <p>
              Your API Token has been successfully reset. Please make sure to
              update your applications or services with the new API Key for
              uninterrupted access to our services
            </p>
            <p>{token}</p>
            <Button
              color="info"
              style={{ padding: ".2em .4em", marginLeft: ".8em" }}
              onClick={() => {
                navigator.clipboard.writeText(token);
                toast.success("copied");
              }}
            >
              Click to Copy
            </Button>
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
          <h3>API Token Reset Successful</h3>
          <div className="confirm text-center">
            <img
              src={cancel}
              width={50}
              className="confirm-cancel"
              alt="confirm"
            />
            <p>Please Try Again</p>
          </div>
        </ModalBody>
        <ModalFooter className="confirm-footer">
          <Button color="secondary" onClick={() => setFailed(false)}>
            Close
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  );
};

export default Documentation;
