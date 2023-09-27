import AdminLayout from "../../layouts/AdminLayout";
import { useAdmin } from "../../context/adminContext";
import TransactionsTable from "../../components/TransactionsTable";

import "../../assets/scss/custom.scss";
import GloDataResolutionTable from "../../components/GloDataResolutionTable";
import WalletResolutionTable from "../../components/WalletResolutionTable";

const WalletResolution = () => {
  const { transaction: transactions } = useAdmin();
  return (
    <AdminLayout>
      <WalletResolutionTable
        transactions={[]}
        showHeader={true}
        showPageSettings={true}
      />
    </AdminLayout>
  );
};

export default WalletResolution;
