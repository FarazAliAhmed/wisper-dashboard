import React, {useState} from "react";
import {
    Alert,
    Button,
    Modal,
    ModalBody,
    ModalFooter,
    ModalHeader,
} from 'reactstrap'

function TransactionReceipt({receiptData, show, toggleShow}){

    console.log({receiptData})
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
                    Transaction Receipt
                </ModalHeader>
                <ModalBody>
                    <Alert
                        className="receipt-font"
                        color={receiptData.status == "success" ? "success" : "danger"}
                    >
                        Status :<strong> {receiptData.status} </strong> <br />
                        Date :<strong> {receiptData.created_at} </strong> <br />
                        Data Volume :<strong> {receiptData.data_volume} MB </strong> <br />
                        Recipient :<strong> {receiptData.phone_number} </strong> <br />
                        Network :<strong> {receiptData.network_provider} </strong> <br />
                        Reference Code:<strong>
                            <Button
                                color="info"
                                style={{padding: ".1em .2em", marginLeft: ".4em"}}
                                onClick={() => {navigator.clipboard.writeText(receiptData.transaction_ref)}}
                            >
                                Click to Copy
                            </Button> 
                        </strong> <br />
                    </Alert>
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

export default TransactionReceipt