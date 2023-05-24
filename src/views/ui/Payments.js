import { Card, CardBody, CardTitle, CardSubtitle, Table, Col, Row, Button  } from "reactstrap";
import FullLayout from "../../layouts/FullLayout";
import { useAppState } from "../../context/appContext";

import "../../assets/scss/custom.scss";
import { useEffect, useState } from "react";

const Payments = () => {
  const { payments:payments } = useAppState();

  // console.log(payments)

  
  const [paymentData, setPaymentData] = useState([]);
  const [showWithVolume, setShowWithVolume] = useState(true);

  

  const handleToggle = () => {
    setShowWithVolume(prevState => !prevState);
  };

  useEffect(() => {
    const filteredData = showWithVolume ? payments.filter(item => item.hasOwnProperty('volume')) : payments.filter(item => !item.hasOwnProperty("volume"));
    setPaymentData(filteredData);
  }, [showWithVolume, payments]);


  return (
    <FullLayout>
      <div>
        <Row>
          <Col lg="12">
          <div>
            <Card>
                <CardBody>
                <CardTitle tag="h5" style={{width:"100%", display:"flex", justifyContent:"space-between"}}>
                    <h5>Payments History</h5>
                    <Button className="receipt-button" style={{background:`${showWithVolume ? "red":"green"}`}} onClick={handleToggle}>
                      {showWithVolume ? "Old Trx" :"New Trx"}
                       </Button>
                  </CardTitle>
                <CardSubtitle className="mb-2 text-muted" tag="h6">
                    List of all payments made to Wisper
                </CardSubtitle>

                <Table
                    className="no-wrap mt-3 align-middle"
                    responsive
                    borderless
                  >
                    <thead>
                      <tr>
                        <th>S/N</th>
                        <th>Amount (₦)</th>
                        <th>Date of Payment</th>
                        {showWithVolume &&   <th>Data Volume</th>}
                        {showWithVolume &&   <th>Data Wallet</th>}
                        <th>Payment Reference</th>
                      </tr>
                    </thead>
                    <tbody>
                      {paymentData &&
                        paymentData.map((pm, index) => (
                          <tr key={index} className="border-top">
                            <td>{index}</td>
                            {showWithVolume ? <td>{pm.amount}</td> :  <td>₦{pm.amount}</td>}
                            <td>{pm.date_of_payment.split(" GMT")[0]}</td>

                            {showWithVolume &&  <td>{pm.volume}MB</td>}
                            {showWithVolume &&  <td>{pm.wallet}</td>}

                            <td>{pm.payment_ref}</td>                          
                            
                            <td>
                         
                        </td>
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
