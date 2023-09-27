import AdminLayout from "../../layouts/AdminLayout";
import { useAdmin } from "../../context/adminContext";
import TransactionsTable from "../../components/TransactionsTable";

import "../../assets/scss/custom.scss";
import GloDataResolutionTable from "../../components/GloDataResolutionTable";

const GloDataResolution = () => {
  const { transaction: transactions } = useAdmin();
  return (
    <AdminLayout>
      <GloDataResolutionTable
        transactions={[]}
        showHeader={true}
        showPageSettings={true}
      />
    </AdminLayout>
  );
};

export default GloDataResolution;
