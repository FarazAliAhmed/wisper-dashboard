import React from "react";
import {
    Alert,
    Button,
    Modal,
    ModalBody,
    ModalFooter,
    ModalHeader,
} from 'reactstrap'

function PaymentReceipt({receiptData, show, toggleShow}){

    return (
        <div>
            <Modal
                centered
                isOpen={show}
                toggle={toggleShow}
            >
                <ModalHeader
                    toggle={toggleShow}
                >
                    Payment Receipt
                </ModalHeader>
                <ModalBody>
                    {/* <Alert
                        className="receipt-font"
                        color= "success"
                    >
                        <PaymentMessage
                            status={receiptData.status}
                            volume={receiptData.amount}
                            business_id={receiptData.business_id}
                            paid_on={receiptData.date_of_payment}
                        />
                    </Alert> */}
                        {/* Data Volume :<strong> {receiptData.data_volume} MB </strong> <br /> */}
                        {/* Recipient :<strong> {receiptData.phone_number} </strong> <br /> */}
                        Business ID : <strong> {receiptData.business_id} </strong> <br />
                       Username : <strong> {receiptData.username} </strong> <br />
                        Date :<strong> {receiptData.date_of_payment} </strong> <br />
                        Amount :<strong> {receiptData.amount} </strong> <br />
                        Data Volume :<strong> {receiptData.volume} </strong> <br />
                        Reference Code:<strong>
                            <Button
                                color="info"
                                style={{padding: ".1em .2em", marginLeft: ".4em"}}
                                onClick={() => {navigator.clipboard.writeText(receiptData.payment_ref)}}
                            >
                                Click to Copy
                            </Button> 
                        </strong> <br />
                </ModalBody>
                <ModalFooter>
                {' '}
                <Button
                    color="danger"
                    onClick={toggleShow}
                >
                    Close
                </Button>
                </ModalFooter>
            </Modal>
        </div>
    )
}


const validityDate = ({created_at, volume}) => {
    const created = new Date(created_at)
    
    if(volume < 500){
        // validity period is 1 week, add 7 days
        created.setDate(created.getDate() + 7);
    }else{
        // validity period is 1 month, add 1 month
        created.setMonth(created.getMonth() + 1);
    }

    return created.toLocaleString('en-GB');
}

const PaymentMessage = ({status, volume, business_id, paid_on}) => {
    const valid_until = validityDate({paid_on, volume})

        return (
            <p>
                <strong>PAID</strong>  <br />
                Business ID of <strong>{business_id}</strong> made payment of <strong>N{volume}</strong> on {paid_on}
            </p>
        )
}

export default PaymentReceipt