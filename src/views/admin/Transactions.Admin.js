import AdminLayout from "../../layouts/AdminLayout";
import { useAppState } from "../../context/appContext";
import { useAdmin } from '../../context/adminContext'
import TransactionsTable from "../../components/TransactionsTable";

import "../../assets/scss/custom.scss";

const Transactions = () => {
  const { transaction: transactions } = useAdmin()

  return (
    <AdminLayout>
      <TransactionsTable
        transactions={transactions.reverse()}
        showHeader={true}
        showPageSettings={true}
      />
    </AdminLayout>
  );
};

export default Transactions;
