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

function PurchaseHistoryReceipt({ receiptData, show, toggleShow }) {
  const { user } = useUser();

  return (
    <div>
      <Modal centered isOpen={show} toggle={toggleShow}>
        <ModalHeader toggle={toggleShow}>Transaction Receipt</ModalHeader>
        <ModalBody>
          <Alert
            className="receipt-font"
            color={receiptData.status == "success" ? "success" : "danger"}
          >
            <TransactionMessage
              bucket={receiptData.network}
              volume={receiptData.volume}
              cost={receiptData.amount}
              status={receiptData.status}
            />
          </Alert>
          Business ID :<strong> {receiptData.business_id} </strong> <br />
          Data Volume :<strong> {receiptData.volume} GB </strong> <br />
          Bucket :<strong> {receiptData.network} </strong> <br />
          Cost :<strong> ₦{receiptData.amount} </strong> <br />
          Old Balance :<strong>
            {" "}
            {Number(receiptData.old_bal) / 1000}GB{" "}
          </strong>{" "}
          <br />
          New Balance :<strong>
            {" "}
            {Number(receiptData.new_bal) / 1000}GB{" "}
          </strong>{" "}
          <br />
          Status :<strong> {receiptData.status} </strong> <br />
          Date :
          <strong>
            {" "}
            {moment(receiptData.createdAt).format("YYYY-MM-DD HH:mm:ss")}{" "}
          </strong>{" "}
          <br />
          Reference Code:
          <strong>
            <Button
              color="info"
              style={{ padding: ".1em .2em", marginLeft: ".4em" }}
              onClick={() => {
                navigator.clipboard.writeText(receiptData._id);
                toast.success("copied");
              }}
            >
              Click to Copy
            </Button>
          </strong>{" "}
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
        You have successfully credited{" "}
        <strong>
          {volume}GB {""}
        </strong>
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

export default PurchaseHistoryReceipt;
