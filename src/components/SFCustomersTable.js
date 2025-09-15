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
import SFReceipt from "./SFReceipt";
import moment from "moment";

const SFCustomersTable = ({
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
                {showHeader && <CardTitle tag="h5">Customers</CardTitle>}

                {showSubHeader && (
                  <CardSubtitle className="mb-2 text-muted" tag="h6">
                    Customers
                  </CardSubtitle>
                )}

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
                      <th>Customer Name</th>
                      <th>Phone Number</th>
                      <th>Email Address</th>
                      <th>Date Joined</th>
                      <th>Number of Purchases</th>

                      {/* <th>Price</th> */}
                      {/* <th>Reference</th> */}
                      {/* <th>Price</th> */}
                    </tr>
                  </thead>
                  <tbody>
                    {transactionsData.map((tx, idx) => (
                      <tr key={idx} className="border-top">
                        <td>
                          <h6 className="mb-0">{tx.name}</h6>
                          {/* <span className="text-muted">{tdata.email}</span> */}
                        </td>
                        <td>
                          <div className="d-flex align-items-center p-2">
                            <h6 className="mb-0">{tx.phone}</h6>
                            {/* <span className="text-muted">{tdata.email}</span> */}
                          </div>
                        </td>
                        <td> {tx.email} </td>
                        <td>
                          {" "}
                          {moment(tx.dateJoined).format(
                            "YYYY-MM-DD HH:mm:ss"
                          )}{" "}
                        </td>

                        <td>{tx.numberOfPurchases}</td>
                      </tr>
                    ))}
                  </tbody>
                </Table>

                <SFReceipt
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

export default SFCustomersTable;
