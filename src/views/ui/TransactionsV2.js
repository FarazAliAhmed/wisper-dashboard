import { useEffect, useState } from "react";
import FullLayout from "../../layouts/FullLayout";
import TransactionsTable from "../../components/TransactionsTable";
import { getAllTransactionsV2, FilterTransactionsV2 } from '../../services/dataService'

import {
  Form,
  FormGroup,
  Label,
  Input,
  Row,
  Col,
  Button,
  Card,
  CardBody,
  Collapse,
  InputGroup,
  InputGroupText
} from 'reactstrap'

import "../../assets/scss/custom.scss";
import Loader from "../../layouts/loader/Loader";

const TransactionsV2 = () => {
  const [loading, setLoading] = useState(false);
  const [transactions, setTransactions] = useState([]);
  
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);

  const [filter, setFilter] = useState({});
  const [pagination, setPagination] = useState({limit: 50, offset: 0});

  const [date, setDate] = useState({
    start_date: undefined,
    end_date: undefined,
    start_time: undefined,
    end_time: undefined
  });

  useEffect(() => {
    const fetchT = async () => {
      await fetchWithPaginate()
    }
    fetchT()
  }, [])

  useEffect(() => {
    const date_str = new Date(`${date.start_date} ${date.start_time}`).toLocaleString()
    const date_end = new Date(`${date.end_date} ${date.end_time}`).toLocaleString()
    setFilter({...filter, date: [date_str || undefined, date_end || undefined]})
  }, [date])

  // Below section has to do with filtering through the data

  const handleChange = (event) => {
    setFilter({...filter, [event.target.name]: event.target.value});
  }

  const handleDate = (event) => {
    setDate({...date, [event.target.name]: event.target.value})
  }

  const clearFilter = () => {
    setFilter({})
    setDate({
      start_date: undefined,
      end_date: undefined,
      start_time: undefined,
      end_time: undefined
    })
  }

  const cleanFilter = (filter) => {
    let newFilter = Object.keys(filter).reduce((prev, next) => {
      const val = filter[next];
      if(val !== "" || val !== undefined){
        return {...prev, [next]: filter[next]}
      }else{
        return prev
      }
    }, {});
    return newFilter;
  }

  const queryDatabase = () => {
    const fetchT = async () => {
      if(!loading){
        setLoading(true);
        const cFilter = cleanFilter(filter);
        const resp = await FilterTransactionsV2(cFilter, pagination);
        setTransactions(resp.data);
        setLoading(false);
      }
    }
    fetchT()
  }

  // Below section has to do with paginating data

  const handlePagination = (event) => {
    setPagination({...pagination, [event.target.name]: event.target.value})
  }

  const clearPagination = async () => {
    setPagination({limit: 50, offset: 0})
  }

  const fetchWithPaginate = async () => {
    const cleanFil = cleanFilter(filter)
    if(Object.keys(cleanFil).length > 0){
      await queryDatabase()
    }else {
      if(!loading){
        setLoading(true)
        const resp = await getAllTransactionsV2(pagination);
        setTransactions(resp.data); 
        setLoading(false)
      }
    }
  }

  return (
    <FullLayout>
      <Button
        color="primary"
        onClick={toggle}
        style={{ marginBottom: '1rem' }}
        className="px-3 py-1"
      >
      {isOpen ?
        <i class="bi bi-chevron-up"></i>
          :
        <i class="bi bi-chevron-down"></i>
      }
        {" "}
        Filter
      </Button>
      <Collapse
        isOpen={isOpen}
        onEntered={()=>{}}
        onExited={()=>{}}
        className="mb-4"
      >
        <Form>
          <Row>
            <Col>
              <Row>
                <Col>
                  <FormGroup>
                    <Label for="reference">
                      Reference
                    </Label>
                    <Input
                      id="reference"
                      name="reference"
                      placeholder="Transaction Reference"
                      type="search"
                      value={filter['reference'] ?? ""}
                      onChange={handleChange}
                    />
                  </FormGroup>
                </Col>
              </Row>
              <Row>
                <Col>
                  <FormGroup>
                    <Label for="start_date">
                      Start Time
                    </Label>
                      <Row>
                        <Col>
                          <Input
                            id="start_date"
                            name="start_date"
                            placeholder="start date"
                            type="date"
                            className="mb-2"
                            value={date['start_date'] ?? ""}
                            onChange={handleDate}
                          />
                        </Col>
                        <Col>
                          <Input
                            id="start_time"
                            name="start_time"
                            placeholder="start time"
                            type="time"
                            value={date['start_time'] ?? ""}
                            onChange={handleDate}
                          />
                        </Col>
                      </Row>
                  </FormGroup>
                </Col>
                <Col>
                  <FormGroup>
                    <Label for="end_date">
                      End Time
                    </Label>
                    <Row>
                      <Col>
                        <Input
                          id="end_date"
                          name="end_date"
                          placeholder="end date"
                          type="date"
                          className="mb-2"
                          onChange={handleDate}
                          value={date['end_date'] ?? ""}
                        />
                      </Col>
                      <Col>
                        <Input
                          id="end_time"
                          name="end_time"
                          placeholder="end time"
                          type="time"
                          onChange={handleDate}
                          value={date['end_time'] ?? ""}
                        />
                      </Col>
                    </Row>
                  </FormGroup>
                </Col>
              </Row>
              <Row>
                <Col>
                  <FormGroup>
                    <Label for="phone">
                      Phone Number
                    </Label>
                    <Input
                      id="phone"
                      name="phone"
                      placeholder="Phone Number"
                      type="text"
                      onChange={handleChange}
                      value={filter['phone'] ?? ""}
                    />
                  </FormGroup>
                </Col>
                <Col>
                  <FormGroup>
                    <Label for="volume">
                      Volume Amount
                    </Label>
                    <Input
                      id="volume"
                      name="volume"
                      placeholder="Data Volume"
                      type="number"
                      onChange={handleChange}
                      value={filter['volume'] ?? ""}
                    />
                  </FormGroup>
                </Col>
              </Row>
              <Row>
                <Col>
                  <FormGroup>
                    <Label for="provider">
                      Network Provider
                    </Label>
                    <Input
                      id="provider"
                      name="provider"
                      type="select"
                      onChange={handleChange}
                      value={filter["provider"] ?? ""}
                    >
                      <option value={undefined}>
                        select provider
                      </option>
                      <option value="airtel">
                        Airtel
                      </option>
                      <option value="mtn">
                        MTN
                      </option>
                    </Input>
                  </FormGroup>
                </Col>
                <Col>
                  <FormGroup>
                    <Label for="status">
                      Status
                    </Label>
                    <Input
                      id="status"
                      name="status"
                      type="select"
                      onChange={handleChange}
                      value={filter["status"] ?? ""}
                    >
                      <option value={undefined}>
                        select status
                      </option>
                      <option value="success">
                        Successful
                      </option>
                      <option value="failed">
                        Failed
                      </option>
                    </Input>
                  </FormGroup>
                </Col>
                
              </Row>
              <Row>
                <FormGroup>
                  <Button
                    onClick={clearFilter}
                    color="danger"
                    className="px-3 py-2 mt-2 me-2"
                  >
                    Clear
                  </Button>
                  <Button
                    onClick={queryDatabase}
                    color="primary"
                    className="px-3 py-2 mt-2"
                  >
                    Search
                  </Button>
                </FormGroup>
              </Row> 
              <Row>
              </Row>
            </Col>
            <Col>
              <div>
                <p>Instructions on Filtering Transactions</p>
                <Card className="shadow-none code-balance">
                  <CardBody>
                    <div className="py-2 border-bottom">
                      <i className="bi bi-chevron-double-right"></i>
                      {" "}Entering a Transacions Reference will ignore all other fields
                    </div>
                    <div className="py-2 border-bottom">
                      <i className="bi bi-chevron-double-right"></i>
                      {" "}Please note that the format in the date picker field is <strong>month</strong>/date/year
                    </div>
                    <div className="py-2 border-bottom">
                      <i className="bi bi-chevron-double-right"></i>
                      {" "}Enter phone number in the exact format they appear in the Transaction History
                    </div>
                    <div className="py-2 border-bottom">
                      <i className="bi bi-chevron-double-right"></i>
                      {" "}Do not select a network provider if not filtering for a particular provider
                    </div>
                    <div className="py-2 border-bottom">
                      <i className="bi bi-chevron-double-right"></i>
                      {" "}If no result is returned when filtering by volume, try switching from multiples of 1000 or 1024 per MB
                    </div>
                    <div className="py-2 border-bottom">
                      <i className="bi bi-chevron-double-right"></i>
                      {" "}Check below this page for controls to paginating your data 
                    </div>
                  </CardBody>
                </Card>
              </div>
            </Col>
          </Row>
        </Form>
      </Collapse>

      {loading ?
        <Loader isLoading={loading}/>
        :
        <TransactionsTable
          transactions={transactions}
          showHeader={true}
          showPageSettings={false}
        />
      }

      <div>
        <Form>
          <InputGroup>
            <InputGroupText>
              Records:
            </InputGroupText>
            <Input
              id="limit"
              name="limit"
              placeholder="No. of Records to Fetch"
              type="number"
              value={pagination['limit'] ?? ""}
              onChange={handlePagination}
            />
            <InputGroupText>
              Skip:
            </InputGroupText>
            <Input
              id="offset"
              name="offset"
              placeholder="No. of Records to Skip"
              type="number"
              className="d-inline-block"
              value={pagination['offset'] ?? ""}
              onChange={handlePagination}
            />
            <Button
              onClick={fetchWithPaginate}
              color="primary"
              className="px-4 py-2 ms-4"
            >
              Fetch
            </Button>
            <Button
              onClick={clearPagination}
              color="secondary"
              className="px-3 py-2 ms-2"
            >
              Reset
            </Button>
          </InputGroup>
        </Form>
      </div>
    </FullLayout>
  );
};

export default TransactionsV2;
