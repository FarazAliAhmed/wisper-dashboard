import FullLayout from "../../layouts/FullLayout";
import { useAppState } from "../../context/appContext";
import TransactionsTable from "../../components/TransactionsTable";

import "../../assets/scss/custom.scss";

const Transactions = () => {
  const { transactions } = useAppState();

  const data = [
    {
      phone_number: "07013415237",
      data_volume: "100",
      status: "success",
      data_price: "450",
      network_provider: "airtel",
      created_at: "2022/01/05 09:39",
      transaction_ref: "1287cd03-7e59-4a89-9a50-f29985b88aed",
    },
    {
      phone_number: "07013376837",
      data_volume: "100",
      status: "processing",
      data_price: "450",
      network_provider: "airtel",
      created_at: "2022/02/01 09:39",
      transaction_ref: "1287cd03-7e59-4a89-9a50-f29985b88aed",
    },
    {
      phone_number: "07013475837",
      data_volume: "100",
      status: "processing",
      data_price: "450",
      network_provider: "airtel",
      created_at: "2022/02/26 09:39",
      transaction_ref: "1287cd03-7e59-4a89-9a50-f29985b88aed",
    },
    {
      phone_number: "07013475837",
      data_volume: "100",
      status: "success",
      data_price: "450",
      network_provider: "airtel",
      created_at: "2022/02/26 09:39",
      transaction_ref: "1287cd03-7e59-4a89-9a50-f29985b88aed",
    },
    {
      phone_number: "07013475837",
      data_volume: "100",
      status: "processing",
      data_price: "450",
      network_provider: "airtel",
      created_at: "2022/02/26 09:39",
      transaction_ref: "1287cd03-7e59-4a89-9a50-f29985b88aed",
    },
    {
      phone_number: "07013475837",
      data_volume: "100",
      status: "processing",
      data_price: "450",
      network_provider: "airtel",
      created_at: "2022/02/26 09:39",
      transaction_ref: "1287cd03-7e59-4a89-9a50-f29985b88aed",
    },
    {
      phone_number: "07013475837",
      data_volume: "100",
      status: "processing",
      data_price: "450",
      network_provider: "airtel",
      created_at: "2022/02/26 09:39",
      transaction_ref: "1287cd03-7e59-4a89-9a50-f29985b88aed",
    },
    {
      phone_number: "08013475837",
      data_volume: "100",
      status: "success",
      data_price: "450",
      network_provider: "airtel",
      created_at: "2022/02/26 09:39",
      transaction_ref: "1287cd03-7e59-4a89-9a50-f29985b88aed",
    },
    {
      phone_number: "07016475837",
      data_volume: "100",
      status: "processing",
      data_price: "450",
      network_provider: "airtel",
      created_at: "2022/02/26 09:39",
      transaction_ref: "1287cd03-7e59-4a89-9a50-f29985b88aed",
    },
    {
      phone_number: "07013675837",
      data_volume: "100",
      status: "processing",
      data_price: "450",
      network_provider: "airtel",
      created_at: "2022/02/26 09:39",
      transaction_ref: "1287cd03-7e59-4a89-9a50-f29985b88aed",
    },
    {
      phone_number: "07013475837",
      data_volume: "100",
      status: "processing",
      data_price: "450",
      network_provider: "airtel",
      created_at: "2022/02/26 09:39",
      transaction_ref: "1287cd03-7e59-4a89-9a50-f29985b88aed",
    },
    {
      phone_number: "07013475837",
      data_volume: "100",
      status: "processing",
      data_price: "450",
      network_provider: "airtel",
      created_at: "2022/02/26 09:39",
      transaction_ref: "1287cd03-7e59-4a89-9a50-f29985b88aed",
    },
    {
      phone_number: "07013475837",
      data_volume: "100",
      status: "success",
      data_price: "450",
      network_provider: "airtel",
      created_at: "2022/02/26 09:39",
      transaction_ref: "1287cd03-7e59-4a89-9a50-f29985b88aed",
    },
    {
      phone_number: "07013475837",
      data_volume: "100",
      status: "processing",
      data_price: "450",
      network_provider: "airtel",
      created_at: "2022/02/26 09:39",
      transaction_ref: "1287cd03-7e59-4a89-9a50-f29985b88aed",
    },
    {
      phone_number: "07013475837",
      data_volume: "100",
      status: "processing",
      data_price: "450",
      network_provider: "airtel",
      created_at: "2022/02/26 09:39",
      transaction_ref: "1287cd03-7e59-4a89-9a50-f29985b88aed",
    },
    {
      phone_number: "07013475837",
      data_volume: "100",
      status: "failed",
      data_price: "450",
      network_provider: "airtel",
      created_at: "2022/02/26 09:39",
      transaction_ref: "1287cd03-7e59-4a89-9a50-f29985b88aed",
    },
    {
      phone_number: "07013475837",
      data_volume: "100",
      status: "failed",
      data_price: "450",
      network_provider: "airtel",
      created_at: "2022/02/26 09:39",
      transaction_ref: "1287cd03-7e59-4a89-9a50-f29985b88aed",
    },
    {
      phone_number: "07013475837",
      data_volume: "100",
      status: "processing",
      data_price: "450",
      network_provider: "airtel",
      created_at: "2022/02/26 09:39",
      transaction_ref: "1287cd03-7e59-4a89-9a50-f29985b88aed",
    },
    {
      phone_number: "07013475837",
      data_volume: "100",
      status: "processing",
      data_price: "450",
      network_provider: "airtel",
      created_at: "2022/02/26 09:39",
      transaction_ref: "1287cd03-7e59-4a89-9a50-f29985b88aed",
    },
    {
      phone_number: "07013475837",
      data_volume: "100",
      status: "success",
      data_price: "450",
      network_provider: "airtel",
      created_at: "2022/02/26 09:39",
      transaction_ref: "1287cd03-7e59-4a89-9a50-f29985b88aed",
    },
    {
      phone_number: "07013475837",
      data_volume: "100",
      status: "processing",
      data_price: "450",
      network_provider: "airtel",
      created_at: "2022/02/26 09:39",
      transaction_ref: "1287cd03-7e59-4a89-9a50-f29985b88aed",
    },
    {
      phone_number: "07013475837",
      data_volume: "100",
      status: "processing",
      data_price: "450",
      network_provider: "airtel",
      created_at: "2022/02/26 09:39",
      transaction_ref: "1287cd03-7e59-4a89-9a50-f29985b88aed",
    },
    {
      phone_number: "07013475837",
      data_volume: "100",
      status: "processing",
      data_price: "450",
      network_provider: "airtel",
      created_at: "2022/02/26 09:39",
      transaction_ref: "1287cd03-7e59-4a89-9a50-f29985b88aed",
    },
    {
      phone_number: "07013475837",
      data_volume: "100",
      status: "success",
      data_price: "450",
      network_provider: "airtel",
      created_at: "2022/02/26 09:39",
      transaction_ref: "1287cd03-7e59-4a89-9a50-f29985b88aed",
    },
    {
      phone_number: "07013475837",
      data_volume: "100",
      status: "processing",
      data_price: "450",
      network_provider: "airtel",
      created_at: "2022/02/26 09:39",
      transaction_ref: "1287cd03-7e59-4a89-9a50-f29985b88aed",
    },
  ];

  return (
    <FullLayout>
      <TransactionsTable
        transactions={data}
        showHeader={true}
        showPageSettings={true}
      />
    </FullLayout>
  );
};

export default Transactions;
