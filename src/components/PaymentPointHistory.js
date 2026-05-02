import React, { useEffect, useState } from "react";
import { Card, CardBody, CardTitle, Table, Spinner, Alert, Modal, ModalHeader, ModalBody, ModalFooter, Button, Form, FormGroup, Label, Input, FormFeedback } from "reactstrap";
import axios from "axios";
import { useUser } from "../context/userContext";
import moment from "moment";
import { getJwt } from "../services/authService";

const PaymentPointHistory = () => {
  const { user } = useUser();
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [accountDetails, setAccountDetails] = useState(null);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [kycData, setKycData] = useState({
    kycType: "bvn",
    kycNumber: "",
  });
  const [kycError, setKycError] = useState("");

  useEffect(() => {
    fetchAccountDetails();
    fetchTransactionHistory();
  }, []);

  const fetchAccountDetails = async () => {
    try {
      console.log('Fetching PaymentPoint account details...');
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/api/paymentpoint/account-details`,
        {
          headers: {
            Authorization: `Bearer ${getJwt()}`,
          },
        }
      );

      console.log('Account details response:', response.data);

      if (response.data.success && response.data.data) {
        console.log('Setting account details:', response.data.data);
        setAccountDetails(response.data.data);
      } else {
        console.log('No account details in response');
        setAccountDetails(null);
      }
    } catch (error) {
      console.error("Error fetching PaymentPoint account details:", error);
      console.error("Error response:", error.response?.data);
      // Don't set error here, account might not exist yet
      setAccountDetails(null);
    }
  };

  const fetchTransactionHistory = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/api/paymentpoint/history?limit=50`,
        {
          headers: {
            Authorization: `Bearer ${getJwt()}`,
          },
        }
      );

      if (response.data.success) {
        setTransactions(response.data.transactions);
      }
      setLoading(false);
    } catch (error) {
      console.error("Error fetching PaymentPoint history:", error);
      setError("Failed to load transaction history");
      setLoading(false);
    }
  };

  const handleKycChange = (e) => {
    const { name, value } = e.target;
    setKycData({ ...kycData, [name]: value });
    
    // Validate KYC number
    if (name === "kycNumber" && value.trim() !== "") {
      const cleanValue = value.replace(/\D/g, '');
      if (cleanValue.length !== 11) {
        setKycError("Must be 11 digits");
      } else {
        setKycError("");
      }
    }
  };

  const openCreateAccountModal = () => {
    setShowCreateModal(true);
    setKycData({ kycType: "bvn", kycNumber: "" });
    setKycError("");
  };

  const createVirtualAccount = async () => {
    try {
      setLoading(true);
      
      // Prepare payload
      const payload = {
        accountName: user?.name || user?.username,
      };

      // Add BVN or NIN if provided
      if (kycData.kycNumber && kycData.kycNumber.trim()) {
        const cleanKyc = kycData.kycNumber.replace(/\D/g, '');
        if (cleanKyc.length === 11) {
          if (kycData.kycType === "nin") {
            payload.nin = cleanKyc;
          } else {
            payload.bvn = cleanKyc;
          }
        }
      }

      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/api/paymentpoint/create-account`,
        payload,
        {
          headers: {
            Authorization: `Bearer ${getJwt()}`,
          },
        }
      );

      if (response.data.success) {
        setAccountDetails(response.data.data);
        setShowCreateModal(false);
        // Refetch from DB to get consistent data
        await fetchAccountDetails();
        alert("PaymentPoint virtual account created successfully!");
      }
      setLoading(false);
    } catch (error) {
      console.error("Error creating PaymentPoint account:", error);
      alert(error.response?.data?.message || "Failed to create virtual account");
      setLoading(false);
    }
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("en-NG", {
      style: "currency",
      currency: "NGN",
    }).format(amount);
  };

  return (
    <div>
      {/* Create Account Modal */}
      <Modal isOpen={showCreateModal} toggle={() => setShowCreateModal(false)} centered>
        <ModalHeader toggle={() => setShowCreateModal(false)}>
          Create PaymentPoint Virtual Account
        </ModalHeader>
        <ModalBody>
          <Form>
            <FormGroup>
              <Label>BVN or NIN (Optional)</Label>
              <div className="mb-2">
                <FormGroup check inline>
                  <Input
                    type="radio"
                    name="kycType"
                    value="bvn"
                    checked={kycData.kycType === "bvn"}
                    onChange={handleKycChange}
                  />
                  <Label check>BVN</Label>
                </FormGroup>
                <FormGroup check inline>
                  <Input
                    type="radio"
                    name="kycType"
                    value="nin"
                    checked={kycData.kycType === "nin"}
                    onChange={handleKycChange}
                  />
                  <Label check>NIN</Label>
                </FormGroup>
              </div>
              <Input
                type="text"
                name="kycNumber"
                value={kycData.kycNumber}
                onChange={handleKycChange}
                maxLength="11"
                placeholder={`Enter your ${kycData.kycType.toUpperCase()} (optional)`}
                invalid={!!kycError}
              />
              <FormFeedback>{kycError}</FormFeedback>
              <small className="text-muted d-block mt-2">
                Enter 11-digit {kycData.kycType.toUpperCase()}. Optional but recommended for higher transaction limits.
              </small>
            </FormGroup>
          </Form>
        </ModalBody>
        <ModalFooter>
          <Button color="secondary" onClick={() => setShowCreateModal(false)}>
            Cancel
          </Button>
          <Button 
            color="primary" 
            onClick={createVirtualAccount}
            disabled={loading || (kycData.kycNumber.trim() !== "" && kycError !== "")}
          >
            {loading ? "Creating..." : "Create Account"}
          </Button>
        </ModalFooter>
      </Modal>

      {/* Account Details Card */}
      <Card className="mb-4">
        <CardBody>
          <CardTitle tag="h5">PaymentPoint Virtual Account</CardTitle>
          
          {!accountDetails ? (
            <div className="text-center py-4">
              <p className="text-muted mb-3">
                You don't have a PaymentPoint virtual account yet.
              </p>
              <button
                className="btn btn-primary"
                onClick={openCreateAccountModal}
                disabled={loading}
              >
                Create Virtual Account
              </button>
            </div>
          ) : (
            <div>
              <p className="text-muted mb-3">
                Fund your wallet by transferring to any of these accounts:
              </p>
              
              {accountDetails.accounts && accountDetails.accounts.length > 0 ? (
                <div className="row">
                  {accountDetails.accounts.map((account, index) => (
                    <div key={index} className="col-md-6 mb-3">
                      <div className="border rounded p-3">
                        <div className="d-flex align-items-center mb-2">
                          <strong>{account.bankName}</strong>
                        </div>
                        <div className="mb-1">
                          <small className="text-muted">Account Number</small>
                          <div className="h5 mb-0">{account.accountNumber}</div>
                        </div>
                        <div>
                          <small className="text-muted">Account Name</small>
                          <div>{account.accountName}</div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <Alert color="info">
                  Account details will appear here once created.
                </Alert>
              )}
              
              <Alert color="warning" className="mt-3">
                <small>
                  <strong>Note:</strong> A processing fee of ₦50 will be deducted from each deposit.
                </small>
              </Alert>
            </div>
          )}
        </CardBody>
      </Card>

      {/* Transaction History Card */}
      <Card>
        <CardBody>
          <CardTitle tag="h5">PaymentPoint Transaction History</CardTitle>
          
          {loading ? (
            <div className="text-center py-4">
              <Spinner color="primary" />
              <p className="mt-2 text-muted">Loading transactions...</p>
            </div>
          ) : error ? (
            <Alert color="danger">{error}</Alert>
          ) : transactions.length === 0 ? (
            <Alert color="info">No transactions yet</Alert>
          ) : (
            <div className="table-responsive">
              <Table striped>
                <thead>
                  <tr>
                    <th>Date</th>
                    <th>Description</th>
                    <th>Amount</th>
                    <th>Balance</th>
                    <th>Reference</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {transactions.map((transaction) => (
                    <tr key={transaction._id}>
                      <td>
                        {moment(transaction.date_of_payment).format("MMM DD, YYYY HH:mm")}
                      </td>
                      <td>
                        <small>{transaction.desc}</small>
                        {transaction.bank && (
                          <div className="text-muted" style={{ fontSize: "0.75rem" }}>
                            {transaction.bank}
                          </div>
                        )}
                      </td>
                      <td>
                        <span
                          className={
                            transaction.pay_type === "credit"
                              ? "text-success"
                              : "text-danger"
                          }
                        >
                          {transaction.pay_type === "credit" ? "+" : "-"}
                          {formatCurrency(transaction.amount)}
                        </span>
                      </td>
                      <td>{formatCurrency(transaction.new_bal)}</td>
                      <td>
                        <small className="text-muted">
                          {transaction.payment_ref}
                        </small>
                      </td>
                      <td>
                        <span
                          className={`badge ${
                            transaction.payment_status === "successful"
                              ? "bg-success"
                              : transaction.payment_status === "pending"
                              ? "bg-warning"
                              : "bg-danger"
                          }`}
                        >
                          {transaction.payment_status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </div>
          )}
        </CardBody>
      </Card>
    </div>
  );
};

export default PaymentPointHistory;
