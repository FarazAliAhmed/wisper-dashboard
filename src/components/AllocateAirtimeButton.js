import React, { useState } from "react";
import { Button, Modal, ModalBody, ModalFooter } from "reactstrap";
import { getPlanFromId } from "../utils";

import warning from "../assets/images/logos/warning.png";
import cancel from "../assets/images/logos/cancel.png";
import checked from "../assets/images/logos/checked.png";
import loadingGIF from "../assets/images/logos/loading2.gif";

import { useAppState } from "../context/appContext";

const AllocateAirtimeButton = ({
  loading,
  setLoading,
  volume,
  phone_number,
  handleSubmit,
  valid,
  network,
}) => {
  const [success, setSuccess] = useState(false);
  const [confirm, setConfirm] = useState(false);
  const [failed, setFailed] = useState(false);
  const [message, setMessage] = useState("");
  const [prevent, setPrevent] = useState(false);
  const [plan, setPlan] = useState({});

  const handleSend = () => {
    if (phone_number) {
      setConfirm(true);
    } else {
      setPrevent(true);
    }
  };

  const handleAllocate = async () => {
    // setConfirm(false)
    const status = await handleSubmit();
    if (!status.error) {
      setMessage(status?.data);
      setSuccess(true);
      setTimeout(() => {
        setSuccess(false);
      }, 5000);
      setLoading(false);
    } else {
      setMessage(status?.message);
      setFailed(true);
      setLoading(false);
    }
  };

  return (
    <>
      {/* <Button className="fund-button">Fund Account</Button> */}
      <Button disabled={valid || loading} color="primary" onClick={handleSend}>
        Purchase
      </Button>

      {/* Confirm Transfer of data to phone number */}
      <Modal centered isOpen={confirm} toggle={() => setConfirm(!confirm)}>
        <ModalBody>
          <div className="confirm text-center">
            <img src={warning} width={50} className="confirm-warn" alt="warn" />
            <p className="text-center">
              Are you sure you want to send <strong>₦{volume}</strong> worth of{" "}
              <strong>{network}</strong>
              &nbsp;airtime
              {/* worth{" "} <strong>{plan?.amount}</strong>  */} to{" "}
              <strong>{phone_number}</strong>
            </p>
          </div>
        </ModalBody>
        <ModalFooter className="confirm-footer">
          <Button
            color="primary"
            onClick={() => {
              setConfirm(false);
              handleAllocate();
            }}
          >
            Yes, Proceed
          </Button>{" "}
          <Button onClick={() => setConfirm(false)}>No, Cancel</Button>
        </ModalFooter>
      </Modal>

      {/* Processing On Data sent*/}
      <Modal
        centered
        isOpen={loading}
        // toggle={() => setLoading(!loading)}
      >
        <ModalBody>
          <div className="confirm text-center">
            <img src={loadingGIF} className="allocate-loading" alt="loading" />
            <p>Please wait, transaction is processing.</p>
          </div>
        </ModalBody>
        {/* <ModalFooter className='confirm-footer'>
                <Button color="secondary" onClick={() => setLoading(false)}>
                    Close
                </Button>
                </ModalFooter> */}
      </Modal>

      {/* Error On empty phone number and plan id */}
      <Modal centered isOpen={prevent} toggle={() => setPrevent(!prevent)}>
        <ModalBody>
          <div className="confirm text-center">
            <img
              src={cancel}
              width={50}
              className="confirm-cancel"
              alt="confirm"
            />
            <p>You must enter a valid phone number </p>
          </div>
        </ModalBody>
        <ModalFooter className="confirm-footer">
          <Button color="secondary" onClick={() => setPrevent(false)}>
            Close
          </Button>
        </ModalFooter>
      </Modal>

      {/* Success On Data sent*/}
      <Modal centered isOpen={success} toggle={() => setSuccess(!success)}>
        <ModalBody>
          <div className="confirm text-center">
            <img src={checked} className="confirm-checked" alt="success" />
            <p>{message}</p>
          </div>
        </ModalBody>
        <ModalFooter className="confirm-footer">
          <Button color="secondary" onClick={() => setSuccess(false)}>
            Close
          </Button>
        </ModalFooter>
      </Modal>

      {/* Failure On Data sent*/}
      <Modal centered isOpen={failed} toggle={() => setFailed(!failed)}>
        <ModalBody>
          <div className="confirm text-center">
            <img
              src={cancel}
              width={50}
              className="confirm-cancel"
              alt="confirm"
            />
            <p>{message}</p>
          </div>
        </ModalBody>
        <ModalFooter className="confirm-footer">
          <Button color="secondary" onClick={() => setFailed(false)}>
            Close
          </Button>
        </ModalFooter>
      </Modal>
    </>
  );
};

export default AllocateAirtimeButton;
