import React, { useState, useEffect } from "react";
import Pagination from "./Pagination";

import {
  Card,
  CardBody,
  CardTitle,
  CardSubtitle,
  Table,
  Col,
  Row,
  Button,
} from "reactstrap";
import { paginate } from "../utils";
import TransactionReceipt from "./TransactionReceipt";
import { useUser } from "../context/userContext";
import PurchaseHistoryReceipt from "./PurchaseHistoryReceipt";
import moment from "moment";
import MonifyReceipt from "./MonifyReceipt";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import AdminWalletTransactionReceipt from "./AdminWalletTransactionsReceipt";
import CopyToClipboard from "react-copy-to-clipboard";
import { MdOutlineContentCopy } from "react-icons/md";
import { toast } from "react-toastify";

const AdminWalletTransactionsTable = ({
  transactions,
  showHeader,
  showPageSettings = false,
}) => {
  const [transactionsData, setTransactionsData] = useState([...transactions]);

  const { user } = useUser();

  const [isOpen, setIsOpen] = useState(false);
  const [activeFilter, setActiveFilter] = useState("all");
  const [searchValue, setSearchValue] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [isReversed, setIsReversed] = useState(false);

  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = "20";

  const [show, setShow] = useState(false);
  const [receiptdata, setReceiptData] = useState({
    ...transactionsData[0],
  });

  const toggleShow = () => {
    setShow(!show);
  };

  const showReceipt = (receiptdata) => {
    setReceiptData(receiptdata);
    toggleShow();
  };

  useEffect(() => {
    const paginatedData = paginate(transactions, currentPage, pageSize);
    setTransactionsData(paginatedData);
  }, [currentPage, transactions]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  function shortenValue(value) {
    const prefix = value.substring(0, 4);
    const suffix = value.substring(value.length - 4);
    return `${prefix}...${suffix}`;
  }

  return (
    <div>
      <Row>
        <Col lg="12">
          <div>
            <Card>
              <CardBody>
                {showHeader && (
                  <CardTitle tag="h5">All Wallet History</CardTitle>
                )}

                <Table
                  className="no-wrap mt-3 align-middle"
                  responsive
                  borderless
                >
                  <thead>
                    <tr>
                      <th>Username</th>
                      <th>BusinessId</th>
                      <th>Trans_ref</th>
                      <th>Amount</th>
                      <th>Purpose</th>
                      <th>Type</th>
                      <th>Date and time</th>
                      <th>Receipt</th>
                    </tr>
                  </thead>
                  <tbody>
                    {transactionsData.map((tx, idx) => {
                      const dateObject = moment(tx.date_of_payment);

                      // Get the date in the format "YYYY-MM-DD"
                      const formattedDate = dateObject.format("YYYY-MM-DD");

                      // Get the time in the format "HH:MM:SS"
                      const formattedTime = dateObject.format("HH:mm:ss");

                      return (
                        <tr key={idx} className="border-top">
                          <td>
                            <Link
                              to={`/admin/business/${tx.business_id}`}
                              className="text-decoration-none"
                            >
                              {tx.business_name}
                            </Link>
                          </td>

                          <td>
                            {" "}
                            <CopyToClipboard
                              text={tx.business_id}
                              onCopy={() => {
                                toast.success("Copied!");
                              }}
                            >
                              <MdOutlineContentCopy
                                color="black"
                                cursor={"pointer"}
                              />
                            </CopyToClipboard>
                            {shortenValue(tx.business_id)}
                          </td>
                          <td>{shortenValue(tx.payment_ref)}</td>
                          <td>₦{tx.amount}</td>
                          <td>{tx.purpose}</td>
                          <td>{tx.pay_type}</td>
                          <td>{`${formattedDate} ${formattedTime}`}</td>
                          <td>
                            <Button
                              className="receipt-button"
                              onClick={() => showReceipt(tx)}
                            >
                              View
                            </Button>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </Table>

                <AdminWalletTransactionReceipt
                  show={show}
                  receiptData={receiptdata}
                  toggleShow={toggleShow}
                />
                <Pagination
                  itemsCount={transactions.length}
                  pageSize={pageSize}
                  currentPage={currentPage}
                  onPageChange={handlePageChange}
                />
              </CardBody>
            </Card>
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default AdminWalletTransactionsTable;
