import { Card, CardBody, CardTitle, CardSubtitle, Table, Col, Row  } from "reactstrap";
import FullLayout from "../../layouts/FullLayout";
import { useAppState } from "../../context/appContext";

import "../../assets/scss/custom.scss";

const Payments = () => {
  const { payments } = useAppState();
  console.log(payments)

  return (
    <FullLayout>
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
                    {payments && payments.map((pm, index) => (
                        <tr key={index} className="border-top">
                        <td>
                            <div className="d-flex align-items-center p-2">
                            <div className="ms-3">
                                <h6 className="mb-0">{pm.amount}</h6>
                            </div>
                            </div>
                        </td>
                        <td>{pm.date_of_payment.split("T")[0].replaceAll("-", "/")}  {pm.date_of_payment.split("T")[1].substring(0,5)}</td>
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
    </FullLayout>
  );
};

export default Payments;
