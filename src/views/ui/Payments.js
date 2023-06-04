import { Card, CardBody, CardTitle, CardSubtitle, Table, Col, Row, Button  } from "reactstrap";
import FullLayout from "../../layouts/FullLayout";
import { useAppState } from "../../context/appContext";

import "../../assets/scss/custom.scss";
import { useEffect, useState } from "react";
import PaymentReceipt from "../../components/PaymentReceipt";

const Payments = () => {
  const { payments:payments } = useAppState();

  // console.log(payments)

  
  const [paymentData, setPaymentData] = useState([]);
  const [showWithVolume, setShowWithVolume] = useState(true);
  const [show, setShow] = useState(false)
  const [filteredData, setFilteredData] = useState([])

  const [receiptdata, setReceiptData] = useState({
    ...paymentData[0]
  })


  const handleToggle = () => {
    setShowWithVolume(prevState => !prevState);
  };

  const toggleShow = () => {
    setShow(!show)
  }

  const showReceipt = (receiptdata) => {
    setReceiptData(receiptdata)
    toggleShow()
  }

  useEffect(() => {
    // const filteredData = showWithVolume ? payments.filter(item => item.hasOwnProperty('volume')) : payments.filter(item => !item.hasOwnProperty("volume"));
    // setPaymentData(filteredData);

    
    const getFilteredTransactions = () => {
      const cutoffDate = new Date("2023-05-31");
      
      return payments.filter(transaction => {
        const paymentDate = new Date(transaction.date_of_payment);
        return paymentDate > cutoffDate;
      });
    };
    
    const getOldTransactions = () => {
      const cutoffDate = new Date("2023-05-31");
      
      return payments.filter(transaction => {
        const paymentDate = new Date(transaction.date_of_payment);
        return paymentDate < cutoffDate;
      });
    };
    
    const transactionsToDisplay = showWithVolume ? getFilteredTransactions() : getOldTransactions;


    setFilteredData(transactionsToDisplay);
    

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
                    <h5>Payment and Data Allocation History</h5>
                    <Button className="receipt-button" style={{background:`${showWithVolume ? "red":"green"}`}} onClick={handleToggle}>
                      {showWithVolume ? "Old Trx" :"New Trx"}
                       </Button>
                  </CardTitle>
                <CardSubtitle className="mb-2 text-muted" tag="h6">
                    List of all payments and data allocation made to Wisper acccount
                </CardSubtitle>

                <Table
                    className="no-wrap mt-3 align-middle"
                    responsive
                    borderless
                  >
                    <thead>
                      <tr>
                        <th>S/N</th>
                        {showWithVolume ? <th>Amount (₦)</th> : <th>Amount (MB)</th> }
                        <th>Date of Payment</th>
                        {showWithVolume &&   <th>Data Volume</th>}
                        {showWithVolume &&   <th>Payment Status</th>}
                        {showWithVolume &&   <th>Data Wallet</th>}
                        <th>Payment Reference</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredData &&
                        filteredData.map((pm, index) => (
                          <tr key={index} className="border-top">
                            <td>{index}</td>
                            {showWithVolume ? <td>₦{pm.amount}</td> :  <td>{pm.amount/1000}GB</td>}
                            <td>{pm.date_of_payment.split(" GMT")[0]}</td>

                            {showWithVolume &&  <td>{pm.volume/1000}GB</td>}

                            {showWithVolume &&  
                            
                                  <td>
                                   {pm.pay_type == "credit"  ? 
                                        <p style={{color:"red"}}>On Credit</p> 
                                              :
                                       <p style={{color:"green"}}>Paid</p>
                                    }
                                  </td>
                             }     

                            {showWithVolume &&  <td>{pm.wallet != "mtn_gifting" ? <>{pm.wallet}</> : "MTN"}</td>}

                            <td>{pm.payment_ref}</td>                          
                            
                            <td>
                            {showWithVolume &&  <Button className="receipt-button" onClick={() => showReceipt(pm)}>View</Button> }
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
    </FullLayout>
  );
};

export default Payments;
