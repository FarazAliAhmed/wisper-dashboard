import React from "react";
import {
  Alert,
  Button,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
} from "reactstrap";
import { useUser } from "../context/userContext";
import { toast } from "react-hot-toast";
import moment from "moment";

function AgentsPurchaseHistoryReceipt({ receiptData, show, toggleShow }) {
  const { user } = useUser();

  return (
    <div>
      <Modal centered isOpen={show} toggle={toggleShow}>
        <ModalHeader toggle={toggleShow}>Allocation Receipt</ModalHeader>
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
          Network : <strong> {receiptData.network} </strong> <br />
          Date :
          <strong>
            {" "}
            {moment(receiptData.date_of_payment).format(
              "YYYY-MM-DD HH:mm:ss"
            )}{" "}
          </strong>{" "}
          <br />
          Amount :<strong> {receiptData.volume}GB </strong> <br />
          Old Balance :<strong> {receiptData.old_bal / 1000} GB </strong> <br />
          New Balance :<strong> {receiptData.new_bal / 1000} GB </strong> <br />
          <br />
        </ModalBody>
        <ModalFooter>
          {" "}
          <Button color="danger" onClick={toggleShow}>
            Close
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  );
}

const TransactionMessage = ({ bucket, volume, status, cost }) => {
  const { user } = useUser();

  if (status == "success") {
    return (
      <p>
        OK <br />
        You have successfully credited <strong>{volume}GB</strong>
        worth of data to your <strong>{bucket} bucket</strong>, for{" "}
        <strong>₦{cost}</strong>
      </p>
    );
  } else {
    return (
      <p>
        Failed <br />
        Dear customer, crediting of your <strong>
          {bucket} bucket
        </strong> with <strong>{volume} GB</strong> for <strong>₦{cost}</strong>
        {""} was not successful. Please try again.
      </p>
    );
  }
};

export default AgentsPurchaseHistoryReceipt;
