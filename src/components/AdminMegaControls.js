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
} from "../services/Admin.Services/controlService";
import AdminNotifier from "./AdminNotifier";
import { getMegaMaintenance } from "../services/dataService";
import { toast } from "react-toastify";

const AdminMegaControls = () => {
  const [maintenance, setMaintenance] = useState("");
  //   const { maintenance, setMaintenance } = useAppState();

  const [noticeType, setNoticeType] = useState("warning");
  const [message, setMessage] = useState("");
  const [serverResp, setResp] = useState("none");

  useEffect(() => {
    const getMegaMaintenanceFunc = async () => {
      // setLoading(true);
      const resp = await getMegaMaintenance();
      setMaintenance(resp?.data?.maintenance);

      // setLoading(false);
    };

    getMegaMaintenanceFunc();
  }, []);

  const setNetworkMaintenance = (network, status) => {
    setMaintenance({ ...maintenance, [network]: status });
    if (status) {
      enterMegaNetworkMaintenance(network);
    } else {
      exitMegaNetworkMaintenance(network);
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
            <h5>Bulk Data Purchase Maintenance Mode</h5>
          </div>
          <div>
            <Table className="no-wrap mt-3 align-middle" responsive borderless>
              <thead>
                <tr>
                  <th>S/N</th>
                  <th>Network</th>
                  <th>Status</th>
                  <th>Maintenance</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-top">
                  <td>1</td>
                  <td>
                    <h6 className="mb-0">MTN SME</h6>
                  </td>
                  <td>
                    {maintenance["mtn_sme"] ? (
                      <span className="p-2 bg-danger rounded-circle d-inline-block ms-3"></span>
                    ) : (
                      <span className="p-2 bg-success rounded-circle d-inline-block ms-3"></span>
                    )}
                  </td>
                  <td>
                    {maintenance["mtn_sme"] ? (
                      <Button
                        onClick={() => setNetworkMaintenance("mtn_sme", false)}
                        color="success"
                      >
                        <strong>Exit</strong>
                      </Button>
                    ) : (
                      <Button
                        onClick={() => setNetworkMaintenance("mtn_sme", true)}
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
                    <h6 className="mb-0">MTN GIFTING</h6>
                  </td>
                  <td>
                    {maintenance["mtn_gifting"] ? (
                      <span className="p-2 bg-danger rounded-circle d-inline-block ms-3"></span>
                    ) : (
                      <span className="p-2 bg-success rounded-circle d-inline-block ms-3"></span>
                    )}
                  </td>
                  <td>
                    {maintenance["mtn_gifting"] ? (
                      <Button
                        onClick={() =>
                          setNetworkMaintenance("mtn_gifting", false)
                        }
                        color="success"
                      >
                        <strong>Exit</strong>
                      </Button>
                    ) : (
                      <Button
                        onClick={() =>
                          setNetworkMaintenance("mtn_gifting", true)
                        }
                        color="warning"
                      >
                        <strong>Enter</strong>
                      </Button>
                    )}
                  </td>
                </tr>
                <tr className="border-top">
                  <td>3</td>
                  <td>
                    <h6 className="mb-0">AIRTEL</h6>
                  </td>
                  <td>
                    {maintenance["airtel"] ? (
                      <span className="p-2 bg-danger rounded-circle d-inline-block ms-3"></span>
                    ) : (
                      <span className="p-2 bg-success rounded-circle d-inline-block ms-3"></span>
                    )}
                  </td>
                  <td>
                    {maintenance["airtel"] ? (
                      <Button
                        onClick={() => setNetworkMaintenance("airtel", false)}
                        color="success"
                      >
                        <strong>Exit</strong>
                      </Button>
                    ) : (
                      <Button
                        onClick={() => setNetworkMaintenance("airtel", true)}
                        color="warning"
                      >
                        <strong>Enter</strong>
                      </Button>
                    )}
                  </td>
                </tr>
                <tr className="border-top">
                  <td>4</td>
                  <td>
                    <h6 className="mb-0">GLO</h6>
                  </td>
                  <td>
                    {maintenance["glo"] ? (
                      <span className="p-2 bg-danger rounded-circle d-inline-block ms-3"></span>
                    ) : (
                      <span className="p-2 bg-success rounded-circle d-inline-block ms-3"></span>
                    )}
                  </td>
                  <td>
                    {maintenance["glo"] ? (
                      <Button
                        onClick={() => setNetworkMaintenance("glo", false)}
                        color="success"
                      >
                        <strong>Exit</strong>
                      </Button>
                    ) : (
                      <Button
                        onClick={() => setNetworkMaintenance("glo", true)}
                        color="warning"
                      >
                        <strong>Enter</strong>
                      </Button>
                    )}
                  </td>
                </tr>
                <tr className="border-top">
                  <td>5</td>
                  <td>
                    <h6 className="mb-0">9MOBILE</h6>
                  </td>
                  <td>
                    {maintenance["9mobile"] ? (
                      <span className="p-2 bg-danger rounded-circle d-inline-block ms-3"></span>
                    ) : (
                      <span className="p-2 bg-success rounded-circle d-inline-block ms-3"></span>
                    )}
                  </td>
                  <td>
                    {maintenance["9mobile"] ? (
                      <Button
                        onClick={() => setNetworkMaintenance("9mobile", false)}
                        color="success"
                      >
                        <strong>Exit</strong>
                      </Button>
                    ) : (
                      <Button
                        onClick={() => setNetworkMaintenance("9mobile", true)}
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

export default AdminMegaControls;
