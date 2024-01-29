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
import moment from "moment";

function SFReceipt({ receiptData, show, toggleShow }) {
  const { user } = useUser();

  return (
    <div>
      <Modal centered isOpen={show} toggle={toggleShow}>
        <ModalHeader toggle={toggleShow}>Transaction Receipt</ModalHeader>
        <ModalBody>
          Customer Name :<strong> {receiptData.name} </strong> <br />
          Customer Email:<strong> {receiptData.email} </strong> <br />
          Data Volume :<strong> {receiptData.volume / 1000} GB</strong> <br />
          Data Cost :<strong> ₦{receiptData.price}</strong> <br />
          Profit :<strong> ₦{receiptData.profit}</strong> <br />
          Recipient :<strong> {receiptData.phone} </strong> <br />
          Status :<strong> {receiptData.status} </strong> <br />
          Date :
          <strong>
            {" "}
            {moment(receiptData.date).format("YYYY-MM-DD HH:mm:ss")}{" "}
          </strong>{" "}
          <br />
          Network :<strong> {receiptData.network} </strong> <br />
          {/* Reference Code:
          <strong>
            <Button
              color="info"
              style={{ padding: ".1em .2em", marginLeft: ".4em" }}
              onClick={() => {
                navigator.clipboard.writeText(receiptData.transaction_ref);
              }}
            >
              Click to Copy
            </Button>
          </strong>{" "} */}
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

const validityDate = ({ created_at, volume }) => {
  const created = new Date(created_at);

  if (volume < 500) {
    // validity period is 1 week, add 7 days
    created.setDate(created.getDate() + 7);
  } else {
    // validity period is 1 month, add 1 month
    created.setMonth(created.getMonth() + 1);
  }

  return created.toLocaleString("en-GB");
};

const TransactionMessage = ({ status, volume, phone_number, created_at }) => {
  const valid_until = validityDate({ created_at, volume });
  const { user } = useUser();

  if (status == "success") {
    return (
      <p>
        OK <br />
        You have successfully credited{" "}
        <strong>
          {user?.type == "lite" ? <>{volume} </> : <>{volume / 1000} GB</>}
        </strong>
        worth of data to <strong>{phone_number}</strong>, valid till{" "}
        {valid_until}
      </p>
    );
  } else {
    return (
      <p>
        Failed <br />
        Dear customer, transfer of <strong>{volume / 1000} GB</strong> to{" "}
        <strong>{phone_number}</strong> was not successful. Please try again.
      </p>
    );
  }
};

export default SFReceipt;
