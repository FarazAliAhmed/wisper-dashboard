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
  enterMegaNetworkMaintenance,
  exitMegaNetworkMaintenance,
  getAirtimeMaintenance,
  enterAirtimeNetworkMaintenance,
  exitAirtimeNetworkMaintenance,
  getSFMaintenance,
  enterSFNetworkMaintenance,
  exitSFNetworkMaintenance,
} from "../services/Admin.Services/controlService";
import AdminNotifier from "./AdminNotifier";
import { getMegaMaintenance } from "../services/dataService";
import { toast } from "react-hot-toast";

const AdminSFControls = () => {
  const [maintenance, setMaintenance] = useState("");
  //   const { maintenance, setMaintenance } = useAppState();

  const [noticeType, setNoticeType] = useState("warning");
  const [message, setMessage] = useState("");
  const [serverResp, setResp] = useState("none");

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

  const setNetworkMaintenance = async (feature, status) => {
    setMaintenance({ ...maintenance, [feature]: status });
    if (status) {
      const res = await enterSFNetworkMaintenance(feature);
      console.log(res);
      toast.success(res?.message);
    } else {
      const res = await exitSFNetworkMaintenance(feature);
      console.log(res);
      toast.success(res?.message);
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
            <h5>StoreFront Maintenance Mode</h5>
          </div>
          <div>
            <Table className="no-wrap mt-3 align-middle" responsive borderless>
              <thead>
                <tr>
                  <th>S/N</th>
                  <th>Feature</th>
                  <th>Status</th>
                  <th>Maintenance</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-top">
                  <td>1</td>
                  <td>
                    <h6 className="mb-0">Bank Withdrawal</h6>
                  </td>
                  <td>
                    {maintenance["withdrawal"] ? (
                      <span className="p-2 bg-danger rounded-circle d-inline-block ms-3"></span>
                    ) : (
                      <span className="p-2 bg-success rounded-circle d-inline-block ms-3"></span>
                    )}
                  </td>
                  <td>
                    {maintenance["withdrawal"] ? (
                      <Button
                        onClick={() =>
                          setNetworkMaintenance("withdrawal", false)
                        }
                        color="success"
                      >
                        <strong>Exit</strong>
                      </Button>
                    ) : (
                      <Button
                        onClick={() =>
                          setNetworkMaintenance("withdrawal", true)
                        }
                        color="warning"
                      >
                        <strong>Enter</strong>
                      </Button>
                    )}
                  </td>
                </tr>

                <tr className="border-top">
                  <td>2</td>
                  <td>
                    <h6 className="mb-0">StoreFront Purchases</h6>
                  </td>
                  <td>
                    {maintenance["purchase"] ? (
                      <span className="p-2 bg-danger rounded-circle d-inline-block ms-3"></span>
                    ) : (
                      <span className="p-2 bg-success rounded-circle d-inline-block ms-3"></span>
                    )}
                  </td>
                  <td>
                    {maintenance["purchase"] ? (
                      <Button
                        onClick={() => setNetworkMaintenance("purchase", false)}
                        color="success"
                      >
                        <strong>Exit</strong>
                      </Button>
                    ) : (
                      <Button
                        onClick={() => setNetworkMaintenance("purchase", true)}
                        color="warning"
                      >
                        <strong>Enter</strong>
                      </Button>
                    )}
                  </td>
                </tr>
              </tbody>
            </Table>
          </div>
        </Col>
      </Row>
    </Card>
  );
};

export default AdminSFControls;
