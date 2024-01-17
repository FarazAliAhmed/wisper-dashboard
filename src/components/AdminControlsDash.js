import React, { useState, useEffect } from "react";
import { useAppState } from "../context/appContext";
import {
  Card,
  Form,
  FormGroup,
  Label,
  Input,
  Row,
  Col,
  CardBody,
  Button,
  UncontrolledAlert,
  Table,
} from "reactstrap";

import {
  setMaintenanceNotice,
  clearMaintenanceNotice,
  enterNetworkMaintenance,
  exitNetworkMaintenance,
} from "../services/Admin.Services/controlService";
import AdminNotifier from "./AdminNotifier";

const AdminControls = () => {
  const { maintenance, setMaintenance } = useAppState();

  const [noticeType, setNoticeType] = useState("warning");
  const [message, setMessage] = useState("");
  const [serverResp, setResp] = useState("none");

  useEffect(() => {
    if (maintenance) {
      setNoticeType(
        maintenance["notice"]
          ? maintenance["notice"].split(":::")[0]
          : "warning"
      );
      setMessage(
        maintenance["notice"] ? maintenance["notice"].split(":::")[1] : ""
      );
    }
  }, [maintenance]);

  const handleChange = (e) => {
    setMessage(e.target.value);
  };

  const handleNoticeType = (e) => {
    setNoticeType(e.target.value);
  };

  const saveNotice = () => {
    const resp = setMaintenanceNotice(`${noticeType}:::${message}`);
    setMaintenance({ ...maintenance, notice: `${noticeType}:::${message}` });
    if (!!resp) setResp(true);
  };

  const clearNotice = () => {
    const resp = clearMaintenanceNotice();
    setMaintenance({ ...maintenance, notice: null });
    if (!!resp) setResp(true);
    setMessage("");
    setNoticeType("warning");
  };

  const setNetworkMaintenance = (network, status) => {
    setMaintenance({ ...maintenance, [network]: status });
    if (status) {
      enterNetworkMaintenance(network);
    } else {
      exitNetworkMaintenance(network);
    }
  };

  return (
    <Card>
      <Row>
        {serverResp !== "none" && (
          <>
            {serverResp ? (
              <UncontrolledAlert dismissible color="success">
                Updated Successfully
              </UncontrolledAlert>
            ) : (
              <UncontrolledAlert dismissible color="danger">
                Failed to make Update
              </UncontrolledAlert>
            )}
          </>
        )}
        <Col md={12}>
          <div className="mt-3">
            <h5>Notification Message</h5>
            <AdminNotifier maintenance={maintenance} />
          </div>
          <div>
            <Form className="mb-4">
              <Row form>
                <Col md={7}>
                  <FormGroup>
                    <Input
                      value={message}
                      id="message"
                      name="message"
                      onChange={handleChange}
                      type="text"
                    />
                  </FormGroup>
                </Col>
                <Col md={2}>
                  <FormGroup>
                    <Input
                      onChange={handleNoticeType}
                      name="notice-type"
                      value={noticeType}
                      className="mb-3"
                      type="select"
                    >
                      <option selected value="success">
                        Success
                      </option>
                      <option value="warning">Warning</option>
                      <option value="error">Error</option>
                    </Input>
                  </FormGroup>
                </Col>
                <Col md={3}>
                  <Button onClick={saveNotice} className="mx-2" color="primary">
                    Save
                  </Button>
                  <Button onClick={clearNotice} className="mx-2" color="danger">
                    Clear
                  </Button>
                </Col>
              </Row>
            </Form>
          </div>
        </Col>
      </Row>
    </Card>
  );
};

export default AdminControls;
