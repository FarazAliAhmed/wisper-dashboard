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

const TransactionsTable = ({
  transactions,
  showHeader,
  showPageSettings = false,
}) => {
  const [transactionsData, setTransactionsData] = useState([...transactions]);
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
        transaction.transaction_ref === searchValue
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
                  <CardTitle tag="h5">Transactions History</CardTitle>
                )}
                <CardSubtitle className="mb-2 text-muted" tag="h6">
                  List of Data volume transfer
                </CardSubtitle>

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

                {showPageSettings && (
                  <>
                    <Row className="justify-content-center mt-4">
                      <Col lg="4" sm="6">
                        <FormGroup>
                          <Input
                            onChange={handleChange}
                            value={searchValue}
                            name="search"
                            placeholder="Search"
                            type="text"
                          />
                        </FormGroup>
                      </Col>
                      <Col xs="2">
                        <Button onClick={handleSearch} color="primary">
                          Search
                        </Button>
                      </Col>
                    </Row>

                    <Card className="mb-3">
                      <CardBody>
                        <Row className="justify-content-center align-items-center">
                          <Col>
                            <CardText className="text-muted" tag="h6">
                              {transactionsData.length} Results
                            </CardText>
                          </Col>
                          <Col></Col>
                          <Col></Col>
                          <Col>
                            <CardText className="text-muted" tag="h6">
                              <Dropdown isOpen={isOpen} toggle={handleToggle}>
                                <DropdownToggle color="light" caret>
                                  Sort by: &nbsp;{activeFilter}
                                </DropdownToggle>
                                <DropdownMenu container="body">
                                  <DropdownItem
                                    onClick={() => handleFilter("all")}
                                  >
                                    All
                                  </DropdownItem>
                                  <DropdownItem
                                    onClick={() => handleFilter("success")}
                                  >
                                    Success
                                  </DropdownItem>
                                  {/*    <DropdownItem
                                    onClick={() => handleFilter("processing")}
                                  >
                                    Processing
                                  </DropdownItem> */}
                                  <DropdownItem
                                    onClick={() => handleFilter("failed")}
                                  >
                                    Failed
                                  </DropdownItem>
                                  <DropdownItem
                                    onClick={() => handleSortByDate("newest")}
                                  >
                                    Date: Old - New
                                  </DropdownItem>
                                  <DropdownItem
                                    onClick={() => handleSortByDate()}
                                  >
                                    Date: New - Old
                                  </DropdownItem>
                                </DropdownMenu>
                              </Dropdown>
                            </CardText>
                          </Col>
                        </Row>
                      </CardBody>
                    </Card>
                  </>
                )}

                <Table
                  className="no-wrap mt-3 align-middle"
                  responsive
                  borderless
                >
                  <thead>
                    <tr>
                      <th>Phone Number</th>
                      <th>Volume</th>
                      <th>Status</th>
                      <th>Network</th>
                      <th>Date</th>
                      <th>Receipt</th>
                      {/* <th>Price</th> */}
                      {/* <th>Reference</th> */}
                      {/* <th>Price</th> */}
                    </tr>
                  </thead>
                  <tbody>
                    {transactionsData.map((tx, idx) => (
                      <tr key={idx} className="border-top">
                        <td>
                          <div className="d-flex align-items-center p-2">
                            <div className="ms-3">
                              <h6 className="mb-0">{tx.phone_number}</h6>
                              {/* <span className="text-muted">{tdata.email}</span> */}
                            </div>
                          </div>
                        </td>
                        <td>{tx.data_volume}</td>
                        {/* <td>{tx.price || "-"}</td> */}
                        <td>
                          {tx.status === "processing" ? (
                            <span className="p-2 bg-warning rounded-circle d-inline-block ms-3"></span>
                          ) : tx.status === "failed" ? (
                            <span className="p-2 bg-danger rounded-circle d-inline-block ms-3"></span>
                          ) : (
                            <span className="p-2 bg-success rounded-circle d-inline-block ms-3"></span>
                          )}
                        </td>
                        <td>{tx.network_provider}</td>
                        <td>{tx.created_at}</td>
                        <td>
                          <Button
                            className="receipt-button"
                            onClick={() => showReceipt(tx)}
                          >
                            View
                          </Button>
                        </td>
                        {/* <td>₦ {tx.data_price}</td> */}
                        {/* <td>{tx.transaction_ref}</td> */}
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

export default TransactionsTable;
