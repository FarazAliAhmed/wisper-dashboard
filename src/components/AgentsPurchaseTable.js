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
  CardText,
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Input,
  FormGroup,
} from "reactstrap";
import { paginate } from "../utils";
import TransactionReceipt from "./TransactionReceipt";
import { useUser } from "../context/userContext";
import PurchaseHistoryReceipt from "./PurchaseHistoryReceipt";
import moment from "moment";
import MonifyReceipt from "./MonifyReceipt";
import AgentsPurchaseHistoryReceipt from "./AgentsPurchaseHistoryReceipt";

const AgentsPurchaseHistoryTable = ({
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
                  <CardTitle tag="h5">Allocation History</CardTitle>
                )}

                <Table
                  className="no-wrap mt-3 align-middle"
                  responsive
                  borderless
                >
                  <thead>
                    <tr>
                      <th>Agents</th>
                      <th>Bucket</th>
                      <th>Amount</th>
                      <th>Bal. Before</th>
                      <th>Bal. After</th>
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
                          <td>{tx.username}</td>
                          <td>{tx.network}</td>
                          <td>{tx.volume}GB</td>
                          <td>{tx.old_bal / 1000}GB</td>
                          <td>{tx.new_bal / 1000}GB</td>

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

                <AgentsPurchaseHistoryReceipt
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

export default AgentsPurchaseHistoryTable;
