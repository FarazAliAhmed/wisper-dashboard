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
import moment from "moment";

const GloDataResolutionTable = ({
  transactions,
  showHeader,
  showSubHeader,
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

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleFilter = (status) => {
    setActiveFilter(status);
    if (status === "all" && searchValue.length === 0)
      return setTransactionsData(transactions);

    if (status === "all" && searchResults.length > 0)
      return setTransactionsData(searchResults);

    const tData = searchValue.length > 0 ? searchResults : transactions;
    const filteredTransactions = tData.filter(
      (transaction) => transaction.status === status
    );
    setTransactionsData(filteredTransactions);
  };

  const handleSortByDate = (sortBy = "") => {
    const tData = activeFilter === "all" ? transactions : transactionsData;
    if (!isReversed && sortBy === "newest") {
      setIsReversed(true);
      return setTransactionsData(tData.reverse());
    }
    if (sortBy === "" && isReversed) {
      setIsReversed(false);
      return setTransactionsData(tData.reverse());
    }
  };

  const handleChange = (e) => {
    setSearchValue(e.target.value);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchValue === "") {
      setActiveFilter("all");
      return setTransactionsData(transactions);
    }
    const results = transactions.filter(
      (transaction) =>
        transaction.phone_number === searchValue ||
        transaction.transaction_ref === searchValue ||
        transaction.business_id === searchValue
    );

    setTransactionsData(results);
    setSearchResults(results);
  };

  return (
    <div>
      <Row>
        <Col lg="12">
          <div>
            <Card>
              <CardBody>
                {showHeader && (
                  <CardTitle tag="h5">Glo Data Resolution</CardTitle>
                )}

                {showSubHeader && (
                  <CardSubtitle className="mb-2 text-muted" tag="h6">
                    Recent Transactions
                  </CardSubtitle>
                )}

                <div className="legend-container">
                  <p className="legend">
                    <span className=" bg-success rounded-circle d-inline-block"></span>{" "}
                    Successful
                  </p>
                  {/*   <p className="legend">
                    <span className=" bg-warning rounded-circle d-inline-block"></span>{" "}
                    Processing
                  </p> */}
                  <p className="legend">
                    <span className=" bg-danger rounded-circle d-inline-block"></span>{" "}
                    Failed
                  </p>
                </div>

                <Table
                  className="no-wrap mt-3 align-middle"
                  responsive
                  borderless
                >
                  <thead>
                    <tr>
                      <th>Date</th>
                      <th>Bucket ID</th>

                      <th>Bucket Bal. Start </th>
                      <th>Bucket Bal. End </th>
                      <th>Data Sold on Glo</th>
                      <th>Data Sold on Wisper</th>
                      <th>No. Trans</th>

                      <th>Raw Bal.</th>
                      <th>Bal.</th>

                      <th>Status</th>

                      {/* <th>Price</th> */}
                      {/* <th>Reference</th> */}
                      {/* <th>Price</th> */}
                    </tr>
                  </thead>
                  <tbody>
                    {transactionsData.map((tx, idx) => (
                      <tr key={idx} className="border-top">
                        <td>
                          {" "}
                          <td> {moment(tx.date).format("YYYY-MM-DD")} </td>
                        </td>
                        <td>{tx.bucketID}</td>
                        <td>{(tx.startOfDayBalance / 1000).toFixed(2)}GB</td>
                        <td>{(tx.endOfDayBalance / 1000).toFixed(2)}GB</td>
                        <td>{(tx.dataSoldOnGlo / 1000).toFixed(2)}GB</td>
                        <td>{(tx.dataSoldOnWisper / 1000).toFixed(2)}GB</td>
                        <td>{tx.numberOfTransactions}</td>
                        <td>{(tx.balance2 / 1000).toFixed(2)}GB</td>
                        <td>{(tx.balance / 1000).toFixed(2)}GB</td>

                        <td>
                          {tx.status.toLowerCase() === "green" ? (
                            <span className="p-2 bg-success rounded-circle d-inline-block ms-3"></span>
                          ) : (
                            <span className="p-2 bg-danger rounded-circle d-inline-block ms-3"></span>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>

                <TransactionReceipt
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

export default GloDataResolutionTable;
