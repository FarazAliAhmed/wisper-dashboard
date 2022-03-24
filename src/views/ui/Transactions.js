import FullLayout from "../../layouts/FullLayout";
import { useAppState } from "../../context/appContext";
import TransactionsTable from "../../components/TransactionsTable";

import "../../assets/scss/custom.scss";

const Transactions = () => {
  const { transactions } = useAppState();

  return (
    <FullLayout>
      <TransactionsTable
        transactions={transactions}
        showHeader={true}
        showPageSettings={true}
      />
    </FullLayout>
  );
};

export default Transactions;
