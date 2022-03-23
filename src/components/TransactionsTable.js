import React from "react";
import {
  Card,
  CardBody,
  CardTitle,
  CardSubtitle,
  Table,
  Col,
  Row,
} from "reactstrap";

const TransactionsTable = ({ transactions, showHeader }) => {
  return (
    <div>
      <Row>
        <Col lg="12">
          <div>
            <Card>
              <CardBody>
                {showHeader && (
                  <CardTitle tag="h5">Transactions History</CardTitle>
                )}
                <CardSubtitle className="mb-2 text-muted" tag="h6">
                  List of Data volume transfer
                </CardSubtitle>

                <div className="legend-container">
                  <p className="legend">
                    <span className=" bg-success rounded-circle d-inline-block"></span>{" "}
                    Successful
                  </p>
                  <p className="legend">
                    <span className=" bg-warning rounded-circle d-inline-block"></span>{" "}
                    Processing
                  </p>
                  <p className="legend">
                    <span className=" bg-danger rounded-circle d-inline-block"></span>{" "}
                    Failed
                  </p>
                </div>
                <Table
                  className="no-wrap mt-3 align-middle"
                  responsive
                  borderless
                >
                  <thead>
                    <tr>
                      <th>Phone Number</th>
                      <th>Volume</th>
                      <th>Status</th>
                      <th>Network</th>
                      <th>Date</th>
                      <th>Reference</th>
                    </tr>
                  </thead>
                  <tbody>
                    {transactions.map((tx, idx) => (
                      <tr key={idx} className="border-top">
                        <td>
                          <div className="d-flex align-items-center p-2">
                            <div className="ms-3">
                              <h6 className="mb-0">{tx.phone_number}</h6>
                              {/* <span className="text-muted">{tdata.email}</span> */}
                            </div>
                          </div>
                        </td>
                        <td>{tx.data_volume}</td>
                        <td>
                          {tx.status === "processing" ? (
                            <span className="p-2 bg-warning rounded-circle d-inline-block ms-3"></span>
                          ) : tx.status === "failed" ? (
                            <span className="p-2 bg-danger rounded-circle d-inline-block ms-3"></span>
                          ) : (
                            <span className="p-2 bg-success rounded-circle d-inline-block ms-3"></span>
                          )}
                        </td>
                        <td>{tx.network_provider}</td>
                        <td>
                          {tx.created_at.split("T")[0].replaceAll("-", "/")}{" "}
                          {tx.created_at.split("T")[1].substring(0, 5)}
                        </td>
                        <td>{tx.transaction_ref}</td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </CardBody>
            </Card>
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default TransactionsTable;
