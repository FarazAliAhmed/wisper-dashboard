import AdminLayout from "../../layouts/AdminLayout";
import { useAdmin } from "../../context/adminContext";
import TransactionsTable from "../../components/TransactionsTable";

import "../../assets/scss/custom.scss";
import GloDataResolutionTable from "../../components/GloDataResolutionTable";
import { useEffect, useState } from "react";
import {
  getAllPlansUser,
  getGloResolution,
} from "../../services/Admin.Services/businessService";
import Loader from "../../layouts/loader/Loader";

const GloDataResolution = () => {
  const [loading, setLoading] = useState();
  const [transactions, setTransactions] = useState();
  useEffect(() => {
    const fetchGloResolution = async () => {
      setLoading(true);
      const res = await getGloResolution();
      setTransactions(res?.data);
      setLoading(false);
      // console.log("res", res);
    };

    fetchGloResolution();
  }, []);
  return (
    <>
      {loading ? (
        <Loader isLoading={loading} />
      ) : (
        <AdminLayout>
          <GloDataResolutionTable
            transactions={transactions ?? []}
            showHeader={true}
            showPageSettings={true}
          />
        </AdminLayout>
      )}
    </>
  );
};

export default GloDataResolution;
