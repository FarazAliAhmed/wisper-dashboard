import React, { useEffect, useState } from "react";
import { Card, CardBody, CardTitle, Table, Spinner, Alert } from "reactstrap";
import axios from "axios";
import { useUser } from "../context/userContext";
import moment from "moment";

const PaymentPointHistory = () => {
  const { user } = useUser();
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [accountDetails, setAccountDetails] = useState(null);

  useEffect(() => {
    fetchAccountDetails();
    fetchTransactionHistory();
  }, []);

  const fetchAccountDetails = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/api/paymentpoint/account-details`,
        {
          headers: {
            Authorization: `Bearer ${user?.access_token}`,
          },
        }
      );

      if (response.data.success) {
        setAccountDetails(response.data.data);
      }
    } catch (error) {
      console.error("Error fetching PaymentPoint account details:", error);
      // Don't set error here, account might not exist yet
    }
  };

  const fetchTransactionHistory = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/api/paymentpoint/history?limit=50`,
        {
          headers: {
            Authorization: `Bearer ${user?.access_token}`,
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

  const createVirtualAccount = async () => {
    try {
      setLoading(true);
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/api/paymentpoint/create-account`,
        {
          accountName: user?.name || user?.username,
          // Add BVN or NIN if available
          // bvn: user?.bvn,
          // nin: user?.nin,
        },
        {
          headers: {
            Authorization: `Bearer ${user?.access_token}`,
          },
        }
      );

      if (response.data.success) {
        setAccountDetails(response.data.data);
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
                onClick={createVirtualAccount}
                disabled={loading}
              >
                {loading ? "Creating..." : "Create Virtual Account"}
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
