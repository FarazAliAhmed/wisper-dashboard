import { useEffect, useState } from "react";
import FullLayout from "../layouts/FullLayout";
import TransactionsTable from "./TransactionsTable";
import {
  getAllTransactionsV2,
  FilterTransactionsV2,
  getMegaPurchaseTransactions,
  PurchaseMegaPriceTransactions,
} from "../services/dataService";
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
  InputGroupText,
} from "reactstrap";

import "../assets/scss/custom.scss";
import Loader from "../layouts/loader/Loader";
import PurchaseHistoryTable from "./PuchaseHistoryTable";
import { useUser } from "../context/userContext";
import AdminBulkDataHistoryTable from "./AdminBulkDataHistoryTable";
import { getAllBulkDataPurchaseTransactions } from "../services/Admin.Services/businessService";

const AdminBulkDataHistory = () => {
  const [loading, setLoading] = useState(false);
  const [transactions, setTransactions] = useState([]);
  const { user } = useUser();

  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);

  const [filter, setFilter] = useState({});
  const [pagination, setPagination] = useState({
    limit: 50,
    offset: 0,
    userId: user._id,
  });

  const [date, setDate] = useState({
    start_date: undefined,
    end_date: undefined,
    start_time: undefined,
    end_time: undefined,
  });

  useEffect(() => {
    const fetchT = async () => {
      await fetchWithPaginate();
    };
    fetchT();
  }, []);

  useEffect(() => {
    if (!Object.values(date).includes(undefined)) {
      const date_str = new Date(
        `${date.start_date} ${date.start_time}`
      ).toLocaleString();
      const date_end = new Date(
        `${date.end_date} ${date.end_time}`
      ).toLocaleString();
      setFilter({
        ...filter,
        date: [date_str || undefined, date_end || undefined],
      });
    }
  }, [date]);

  // Below section has to do with filtering through the data

  const handleChange = (event) => {
    setFilter({ ...filter, [event.target.name]: event.target.value });
  };

  const handleDate = (event) => {
    setDate({ ...date, [event.target.name]: event.target.value });
  };

  const clearFilter = () => {
    setFilter({});
    setDate({
      start_date: undefined,
      end_date: undefined,
      start_time: undefined,
      end_time: undefined,
    });
  };

  const cleanFilter = (filter) => {
    let newFilter = Object.keys(filter).reduce((prev, next) => {
      const val = filter[next];
      if (val !== "" || val !== undefined) {
        return { ...prev, [next]: filter[next] };
      } else {
        return prev;
      }
    }, {});
    return newFilter;
  };

  const queryDatabase = () => {
    const fetchT = async () => {
      if (!loading) {
        setLoading(true);
        const cFilter = cleanFilter(filter);
        const resp = await getAllBulkDataPurchaseTransactions(
          cFilter,
          pagination
        );
        setTransactions(resp);
        setLoading(false);
        setIsOpen(false);
      }
    };
    fetchT();
  };

  // Below section has to do with paginating data

  const handlePagination = (event) => {
    setPagination({ ...pagination, [event.target.name]: event.target.value });
  };

  const clearPagination = async () => {
    setPagination({ limit: 50, offset: 0, userId: user._id });
  };

  const fetchWithPaginate = async () => {
    const cleanFil = cleanFilter(filter);
    if (Object.keys(cleanFil).length > 0) {
      queryDatabase();
    } else {
      if (!loading) {
        setLoading(true);
        const resp = await getAllBulkDataPurchaseTransactions(pagination);
        setTransactions(resp);
        setLoading(false);
      }
    }
  };

  console.log("tra", transactions);

  return (
    <div>
      {loading ? (
        <Loader isLoading={loading} />
      ) : (
        <AdminBulkDataHistoryTable
          transactions={transactions}
          showHeader={true}
          showPageSettings={false}
        />
      )}

      <div>
        <Form>
          <p>Enter in the number of records you want to fetch</p>
          <div className="d-flex gap-2 flex-column flex-md-row">
            <InputGroup className="mb-2">
              <InputGroupText>Records:</InputGroupText>
              <Input
                id="limit"
                name="limit"
                placeholder="No. of Records to Fetch"
                type="number"
                value={pagination["limit"] ?? ""}
                onChange={handlePagination}
              />
            </InputGroup>

            <InputGroup className="mb-2 justify-content-start gap-2">
              <Button
                onClick={fetchWithPaginate}
                color="primary"
                className="px-4 py-1"
              >
                Fetch
              </Button>
              <Button
                onClick={clearPagination}
                color="secondary"
                className="px-3 py-1"
              >
                Reset
              </Button>
            </InputGroup>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default AdminBulkDataHistory;
