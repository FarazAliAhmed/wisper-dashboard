import { useEffect, useState } from "react";
import { Button, Card, CardBody, Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";
import "./dashboard.css";
import glo from "../../assets/dashboard/glo.svg";
import { getGloCredit, repayGloCredit } from "../../services/dataService";

const gb = (n) => `${Number(n || 0).toLocaleString(undefined, { maximumFractionDigits: 3 })} GB`;
const naira = (n) => `₦${Number(n || 0).toLocaleString(undefined, { maximumFractionDigits: 2 })}`;

// GLO credit wallet: GB given on credit, repaid in naira for the GB actually used
const GloWalletCard = () => {
  const [credit, setCredit] = useState(null);
  const [show, setShow] = useState(false);
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState("");

  const load = async () => {
    const res = await getGloCredit();
    if (res?.data) setCredit(res.data);
  };

  useEffect(() => {
    load();
  }, []);

  if (!credit?.enabled) return null;

  const repay = async () => {
    setBusy(true);
    setMessage("");
    const res = await repayGloCredit();
    setBusy(false);
    if (res?.status === 200) {
      const extra = res.data.auto_credited_gb ? ` ${gb(res.data.auto_credited_gb)} added to your GLO wallet.` : "";
      setMessage(`Repayment of ${naira(res.data.paid)} successful.${extra}`);
      setCredit(res.data);
      setTimeout(() => window.location.reload(), 2500); // refresh the naira wallet balance
    } else {
      setMessage(res?.data?.message || "Repayment failed. Please try again.");
    }
  };

  return (
    <Card>
      <CardBody>
        <div className="fund__div">
          <div className="d-flex">
            <div
              className="circle-box lg-box d-inline-block bg-light-success text-success"
              style={{ display: "flex", justifyContent: "center", alignItems: "center" }}
            >
              <img src={glo} alt="GLO" style={{ width: "2rem", height: "2rem" }} />
            </div>
            <div className="ms-3">
              <h6 className="mb-0 font-weight-bold">{gb(credit.remaining_gb)}</h6>
              <small className="text-muted">GLO Wallet</small>
            </div>
          </div>
          <button className="fund__wallet__btn" style={{ backgroundColor: "#28a745" }} onClick={() => setShow(true)}>
            Repay
          </button>
        </div>
        <div className="mt-3 small">
          <div className="d-flex justify-content-between"><span className="text-muted">Allocated</span><span>{gb(credit.allocated_gb)}</span></div>
          <div className="d-flex justify-content-between"><span className="text-muted">Used</span><span>{gb(credit.used_gb)}</span></div>
          <div className="d-flex justify-content-between"><span className="text-muted">Remaining</span><span>{gb(credit.remaining_gb)}</span></div>
          <div className="d-flex justify-content-between"><span className="text-muted">Amount owed</span><strong>{naira(credit.owed)}</strong></div>
        </div>
      </CardBody>

      <Modal isOpen={show} toggle={() => setShow(false)} centered>
        <ModalHeader toggle={() => setShow(false)}>Repay GLO Data</ModalHeader>
        <ModalBody>
          <p className="mb-1">GB used: <strong>{gb(credit.used_gb)}</strong> at {naira(credit.rate)} per GB</p>
          <p className="mb-1">Amount owed: <strong>{naira(credit.owed)}</strong></p>
          <p className="mb-3">Naira wallet: {naira(credit.wallet_balance)}</p>
          <small className="text-muted">
            The amount owed will be deducted from your naira wallet, and the GB you repay is added back to
            your GLO wallet instantly (credit limit {gb(credit.block_gb)}).
          </small>
          {message && <p className="mt-3 mb-0"><strong>{message}</strong></p>}
        </ModalBody>
        <ModalFooter>
          <Button color="secondary" onClick={() => setShow(false)}>Close</Button>
          <Button color="success" disabled={busy || !(credit.owed > 0)} onClick={repay}>
            {busy ? "Processing..." : `Repay ${naira(credit.owed)}`}
          </Button>
        </ModalFooter>
      </Modal>
    </Card>
  );
};

export default GloWalletCard;
