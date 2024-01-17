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

function TransactionReceipt({ receiptData, show, toggleShow }) {
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
            {user?.type == "lite" ? (
              <TransactionMessage
                status={receiptData.status}
                data_volume={receiptData.lite_volume}
                airtime_volume={receiptData.volume}
                phone_number={receiptData.phone_number}
                created_at={receiptData.created_at}
                type={receiptData.purchase_type}
                airtime_price={receiptData.price}
                data_price={receiptData.data_volume}
              />
            ) : (
              <TransactionMessage
                status={receiptData.status}
                data_volume={receiptData.data_volume}
                airtime_volume={receiptData.volume}
                phone_number={receiptData.phone_number}
                created_at={receiptData.created_at}
                type={receiptData.purchase_type}
                airtime_price={receiptData.price}
                data_price={"bucket"}
              />
            )}
          </Alert>
          {/* Data Volume :<strong> {receiptData.data_volume} MB </strong> <br /> */}
          {/* Recipient :<strong> {receiptData.phone_number} </strong> <br /> */}
          Status :<strong> {receiptData.status} </strong> <br />
          Date :<strong> {receiptData.created_at} </strong> <br />
          Network :
          <strong> {receiptData.network_provider?.toUpperCase()} </strong>{" "}
          <br />
          {receiptData.desc && (
            <>
              {" "}
              Desc:<strong> {receiptData.desc} </strong> <br />
            </>
          )}
          Price :
          <strong>
            {" "}
            ₦
            {receiptData.purchase_type == "data"
              ? receiptData.data_volume
              : receiptData.price}{" "}
          </strong>{" "}
          <br />
          Reference Code:
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

const TransactionMessage = ({
  status,
  volume,
  phone_number,
  created_at,
  type,
  // airtime_price,
  data_volume,
  airtime_volume,
}) => {
  const valid_until = validityDate({ created_at, volume });
  const { user } = useUser();

  if (status == "success") {
    return (
      <p>
        {type === "airtime" ? (
          <>
            <>
              You have successfully credited{" "}
              <strong>
                <>₦{airtime_volume} </>
              </strong>
              worth of airtime to <strong>{phone_number}</strong>
            </>
          </>
        ) : (
          <>
            OK <br />
            You have successfully credited{" "}
            <strong>
              {user?.type == "lite" ? (
                <>{data_volume} </>
              ) : (
                <>{data_volume / 1000} GB&nbsp;</>
              )}
            </strong>
            worth of data to <strong>{phone_number}</strong>, valid till{" "}
            {valid_until}
          </>
        )}
      </p>
    );
  } else {
    return (
      <p>
        {type === "airtime" ? (
          <>
            Failed <br />
            Dear customer, transfer of{" "}
            <strong>
              <>₦{airtime_volume}</>
            </strong>{" "}
            to <strong>{phone_number}</strong> was not successful. Please try
            again.
          </>
        ) : (
          <>
            Failed <br />
            Dear customer, transfer of{" "}
            <strong>
              <>
                {" "}
                {user?.type == "lite" ? (
                  <>{data_volume} </>
                ) : (
                  <>{data_volume / 1000} GB</>
                )}{" "}
              </>
            </strong>{" "}
            to <strong>{phone_number}</strong> was not successful. Please try
            again.
          </>
        )}
      </p>
    );
  }
};

export default TransactionReceipt;
