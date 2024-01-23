import AdminLayout from "../../layouts/AdminLayout";
import { useAdmin } from "../../context/adminContext";
import TransactionsTable from "../../components/TransactionsTable";
import { useEffect, useState } from "react";

import "../../assets/scss/custom.scss";
import GloDataResolutionTable from "../../components/GloDataResolutionTable";
import WalletResolutionTable from "../../components/WalletResolutionTable";
import {
  getGloResolution,
  getWalletResolution,
} from "../../services/Admin.Services/businessService";
import Loader from "../../layouts/loader/Loader";

const WalletResolution = () => {
  const [loading, setLoading] = useState();
  const [transactions, setTransactions] = useState();
  useEffect(() => {
    const fetchGloResolution = async () => {
      setLoading(true);
      const res = await getWalletResolution();
      setTransactions(res?.data);
      setLoading(false);
    };

    fetchGloResolution();
  }, []);
  return (
    <>
      {loading ? (
        <Loader isLoading={loading} />
      ) : (
        <AdminLayout>
          <WalletResolutionTable
            transactions={transactions ?? []}
            showHeader={true}
            showPageSettings={true}
          />
        </AdminLayout>
      )}
    </>
  );
};

export default WalletResolution;
