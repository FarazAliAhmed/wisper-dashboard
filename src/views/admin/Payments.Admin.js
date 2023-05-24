import React, { useState, useEffect } from "react";
import {
  Card,
  CardBody,
  CardTitle,
  CardSubtitle,
  Table,
  Col,
  Row,
  Button,
  FormGroup,
  Input,
  CardText,
} from "reactstrap";
import AdminLayout from "../../layouts/AdminLayout";
import PaymentReceipt from "../../components/PaymentReceipt";
import { useAdmin } from "../../context/adminContext";

import "../../assets/scss/custom.scss";

const Payments = () => {
  const { payment: payments } = useAdmin();

  // console.log(payments)
  
  const [searchValue, setSearchValue] = useState("");
  const [paymentData, setPaymentData] = useState([]);
  const [showWithVolume, setShowWithVolume] = useState(true);

  

  const handleToggle = () => {
    setShowWithVolume(prevState => !prevState);
  };

  useEffect(() => {
    const filteredData = showWithVolume ? payments.filter(item => item.hasOwnProperty('volume')) : payments.filter(item => !item.hasOwnProperty("volume"));
    setPaymentData(filteredData);
  }, [showWithVolume, payments]);

  const [show, setShow] = useState(false)
  const [receiptdata, setReceiptData] = useState({
    ...paymentData[0]
  })

  const toggleShow = () => {
    setShow(!show)
  }

  const showReceipt = (receiptdata) => {
    setReceiptData(receiptdata)
    toggleShow()
  }

  const handleChange = (e) => {
    const val = e.target.value;
    setSearchValue(val);

    if (e.target.value === "") return setPaymentData(payments);

    const results = payments.filter(
      (payment) =>
        payment._id.includes(val) || payment.payment_ref.includes(val) || payment.username.includes(val)
    );

    setPaymentData(results);
  };

  return (
    <AdminLayout>
      <div>
        <Row className="justify-content-center mt-4">
          <Col lg="4" sm="6">
            <FormGroup>
              <Input
                onChange={handleChange}
                value={searchValue}
                name="search"
                placeholder="Search"
                type="text"
              />
            </FormGroup>
          </Col>
        </Row>

        {searchValue.length > 0 && (
          <Card className="mb-3">
            <CardBody>
              <Row className="justify-content-center align-items-center">
                <Col>
                  <CardText className="text-muted" tag="h6">
                    {paymentData.length} Search Result(s)
                  </CardText>
                </Col>
              </Row>
            </CardBody>
          </Card>
        )}

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
                        <th>Business ID</th>
                       {showWithVolume &&  <th>Username</th>}
                        <th>Date of Payment</th>
                        <th>Amount</th>
                        {showWithVolume &&   <th>Data Volume</th>}
                        <th>Payment Reference</th>
                        <th>More</th>
                      </tr>
                    </thead>
                    <tbody>
                      {paymentData &&
                        paymentData.map((pm, index) => (
                          <tr key={index} className="border-top">
                            <td>{index}</td>
                            <td>{pm.business_id}</td>
                            {showWithVolume &&  <td>{pm.username}</td>}
                            <td>{pm.date_of_payment.split(" GMT")[0]}</td>
                            <td>{pm.amount}</td>
                            {showWithVolume &&  <td>{pm.volume}</td>}
                            <td>{pm.payment_ref}</td>                          
                            
                            <td>
                          <Button className="receipt-button" onClick={() => showReceipt(pm)}>View</Button>
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
      <PaymentReceipt show={show} receiptData={receiptdata} toggleShow={toggleShow} />
    </AdminLayout>
  );
};

export default Payments;
