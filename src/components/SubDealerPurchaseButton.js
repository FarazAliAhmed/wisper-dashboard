import React, { useEffect, useState } from "react";
import { Button, Modal, ModalBody, ModalFooter } from "reactstrap";
import { getPlanFromId } from "../utils";
import { BeatLoader } from "react-spinners";

import warning from "../assets/images/logos/warning.png";
import cancel from "../assets/images/logos/cancel.png";
import checked from "../assets/images/logos/checked.png";
import loadingGIF from "../assets/images/logos/loading2.gif";

import { useAppState } from "../context/appContext";

const SubDealerPurchaseButton = ({
  loading,
  setLoading,
  data,
  handleSubmit,
  balances,
  bucket,
}) => {
  const [success, setSuccess] = useState(false);
  const [failed, setFailed] = useState(false);
  const [message, setMessage] = useState("");
  const [price, setPrice] = useState(false);
  const [confirm, setConfirm] = useState(false);
  const [plan, setPlan] = useState({});

  const handleSend = () => {
    // const selectedPlan = getPlanFromId(plan_id, plans);
    // setPlan(selectedPlan);
    // if (plan_id && phone_number) {
    //   setConfirm(true);
    // } else {
    //   setPrevent(true);
    // }

    if (!loading) {
      setConfirm(true);
    }
  };
  // useEffect(() => {
  //   const handleAllocate = async () => {
  //     if (bucket == "glo") {
  //       setPrice(megaPrices.glo);
  //     } else if (bucket == "mtn_sme") {
  //       setPrice(megaPrices.mtn_sme);
  //     } else if (bucket == "mtn_gifting") {
  //       setPrice(megaPrices.mtn_gifting);
  //     } else if (bucket == "airtel") {
  //       setPrice(megaPrices.airtel);
  //     } else if (bucket == "9mobile") {
  //       setPrice(megaPrices["9mobile"]);
  //     }
  //   };

  //   handleAllocate();
  // }, [megaPrices, bucket]);

  return (
    <>
      {/* <Button className="fund-button">Fund Account</Button> */}
      <Button color="primary" onClick={handleSend}>
        {loading ? (
          <BeatLoader size={10} color="white" loading />
        ) : (
          <>Allocate</>
        )}
      </Button>

      {/* Confirm Transfer of data to phone number */}
      <Modal centered isOpen={confirm} toggle={() => setConfirm(!confirm)}>
        <ModalBody>
          <div className="confirm text-center">
            <h5>
              Confirm Data Allocation for {bucket} (
              {Number(balances[bucket]) / 1000}GB)
            </h5>
            {/* <img src={warning} width={50} className="confirm-warn" alt="warn" /> */}
            <p className="text-center">Sub Dealer: {data.subDealerName}</p>
            <p className="text-center">Amount in GB: {data.amountInGB}GB</p>
          </div>
        </ModalBody>
        <ModalFooter className="confirm-footer">
          <Button
            color="primary"
            onClick={() => {
              setConfirm(false);
              handleSubmit();
            }}
          >
            Confirm
          </Button>{" "}
          <Button onClick={() => setConfirm(false)}>No, Cancel</Button>
        </ModalFooter>
      </Modal>
    </>
  );
};

export default SubDealerPurchaseButton;
