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

function MonifyReceipt({ receiptData, show, toggleShow }) {
  const { user } = useUser();

  return (
    <div>
      <Modal centered isOpen={show} toggle={toggleShow}>
        <ModalHeader toggle={toggleShow}>Transaction Receipt</ModalHeader>
        <ModalBody>
          Business ID :<strong> {receiptData.business_id} </strong> <br />
          Trans. Ref :<strong> {receiptData.payment_ref} </strong> <br />
          Amount :<strong> ₦{receiptData.amount} </strong> <br />
          Purpose :<strong> {receiptData.purpose} </strong> <br />
          Old Wallet Balance :<strong> ₦{receiptData.old_bal} </strong> <br />
          New Wallet Balance :<strong> ₦{receiptData.new_bal} </strong> <br />
          Type :<strong> {receiptData.pay_type} </strong> <br />
          Descripion :<strong> {receiptData.desc} </strong> <br />
          Date :
          <strong>
            {" "}
            {moment(receiptData.date_of_payment).format(
              "YYYY-MM-DD HH:mm:ss"
            )}{" "}
          </strong>{" "}
          <br />
          Reference Code:
          <strong>
            <Button
              color="info"
              style={{ padding: ".1em .2em", marginLeft: ".4em" }}
              onClick={() => {
                navigator.clipboard.writeText(receiptData.payment_ref);
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

export default MonifyReceipt;
