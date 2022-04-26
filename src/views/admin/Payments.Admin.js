import { Card, CardBody, CardTitle, CardSubtitle, Table, Col, Row  } from "reactstrap";
import AdminLayout from "../../layouts/AdminLayout";
import { useAdmin } from "../../context/adminContext";

import "../../assets/scss/custom.scss";

const Payments = () => {
  const { payment } = useAdmin()

  return (
    <AdminLayout>
      <div>
        <Row>
          <Col lg="12">
          <div>
            <Card>
                <CardBody>
                <CardTitle tag="h5">Payments History</CardTitle>
                <CardSubtitle className="mb-2 text-muted" tag="h6">
                    List of all payments made to Wisper
                </CardSubtitle>

                <Table className="no-wrap mt-3 align-middle" responsive borderless>
                    <thead>
                    <tr>
                        <th>Amount</th>
                        <th>Date of Payment</th>

                        <th>Payment Reference</th>
                    </tr>
                    </thead>
                    <tbody>
                    {payment && payment.reverse().map((pm, index) => (
                        <tr key={index} className="border-top">
                        <td>
                            <div className="d-flex align-items-center p-2">
                            <div className="ms-3">
                                <h6 className="mb-0">{pm.amount}</h6>
                            </div>
                            </div>
                        </td>
                        <td>{pm.date_of_payment.split(" GMT")[0]}</td>
                        <td>{pm.payment_ref}</td>
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
    </AdminLayout>
  );
};

export default Payments;
