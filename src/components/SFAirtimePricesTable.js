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
  Form,
  Label,
  Modal,
  ModalBody,
  ModalFooter,
} from "reactstrap";
import { paginate } from "../utils";
import TransactionReceipt from "./TransactionReceipt";
import { useUser } from "../context/userContext";
import SFReceipt from "./SFReceipt";
import { BeatLoader } from "react-spinners";
import { updateSellingPrice, updateStoreFront } from "../services/dataService";
import toast from "react-hot-toast";

const SFAirtimePricesTable = ({
  transactions,
  showHeader,
  showSubHeader,
  showPageSettings = false,
  fetchPrice,
  setFetchPrice,
}) => {
  const [transactionsData, setTransactionsData] = useState([...transactions]);

  const { user } = useUser();

  const [isOpen, setIsOpen] = useState(false);
  const [confirm, setConfirm] = useState(false);
  const [newPrice, setNewPrice] = useState("");
  const [planId, setPlanId] = useState("");
  const [activeFilter, setActiveFilter] = useState("all");
  const [searchValue, setSearchValue] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [isReversed, setIsReversed] = useState(false);
  const [loading, setLoading] = useState(false);

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

  const handleSubmit = async () => {
    // e.preventDefault();
    try {
      setLoading(true);
      await updateSellingPrice(
        {
          id: user?._id,
          planId: planId,
          selling_price: newPrice,
        },
        user?.access_token
      );
      setFetchPrice(!fetchPrice);
      setLoading(false);
      toast.success("Selling Price Updated");
    } catch (error) {
      setLoading(false);
      toast.error("Error Updating Selling Price");
    }
  };

  const handleInputChange = async ({ currentTarget: input }) => {
    const { name, value } = input;
    setNewPrice({ ...newPrice, [name]: value });
  };

  console.log(planId);
  console.log(newPrice);
  const networks = ["MTN", "GLO", "AIRTEL", "9MOBILE"];

  return (
    <>
      <div>
        <Row>
          <Col lg="12">
            <div>
              <Card>
                <CardBody>
                  {showHeader && <CardTitle tag="h5">Airtime Profit</CardTitle>}

                  {showSubHeader && (
                    <CardSubtitle className="mb-2 text-muted" tag="h6">
                      <p>
                        What You Profit from Each Airtime Purchase on Your Store
                        Front
                      </p>
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
                        <th>Network</th>
                        <th>Airtime Amount</th>
                        <th>Profit</th>
                      </tr>
                    </thead>
                    <tbody>
                      {networks.map((tx, idx) => (
                        <tr key={idx} className="border-top">
                          <td>{tx}</td>
                          <td>{"Any Amount"}</td>
                          <td>
                            {user.type == "lite"
                              ? "1.5% For each airtime amount"
                              : "2% For each airtime amount"}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </Table>
                  {/* 
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
                  /> */}
                  <CardTitle
                    className="mt-2"
                    style={{ fontWeight: 800 }}
                    tag="h6"
                  >
                    Note on Profit Allocation:
                  </CardTitle>
                  <CardSubtitle className="mb-2 " tag="p">
                    <b>Important:</b> All profits from airtime sales are
                    credited directly into your Storefront wallet. This ensures
                    seamless management and accessibility of your earnings.
                  </CardSubtitle>
                </CardBody>
              </Card>
            </div>
          </Col>
        </Row>
      </div>
      <Modal centered isOpen={confirm} toggle={() => setConfirm(!confirm)}>
        <ModalBody>
          <div className="add__sub__dealer__con">
            <div className="add__sub__dealer__head">
              <h4>Edit Selling Price</h4>
              {/* <h5>Empower Sub-Dealers to Grow Together</h5> */}
            </div>
            <Form>
              <Row form>
                <Col md={12}>
                  <FormGroup>
                    <Label for="sellingPrice">Selling Price</Label>{" "}
                    <Input
                      id="sellingPrice"
                      name="newPrice"
                      value={newPrice}
                      onChange={(e) => {
                        setNewPrice(e.target.value);
                      }}
                      type="number"
                    />
                  </FormGroup>
                </Col>
              </Row>
            </Form>
          </div>
        </ModalBody>
        <ModalFooter className="confirm-footer">
          <Button
            color="primary"
            onClick={() => {
              handleSubmit();
              setConfirm(false);
            }}
            // disabled={formIsValid(errors) || loading}
            size="lg"
            type="submit"
            className="submit-btn"
          >
            Save
          </Button>{" "}
          <Button onClick={() => setConfirm(false)}>No, Cancel</Button>
        </ModalFooter>
      </Modal>
    </>
  );
};

export default SFAirtimePricesTable;
