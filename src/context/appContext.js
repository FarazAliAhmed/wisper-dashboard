import React, { createContext, useContext, useEffect, useState } from "react";
import { getAllTransactions, getBalance, getAllPayments } from "../services/dataService";

export const AppStateContext = createContext();

const AppStateProvider = ({ children }) => {
  const [currentBalance, setCurrentBalance] = useState({
    volume: "",
    unit: "",
  });
  const [transactions, setTransactions] = useState([]);
  const [payments, setPayments] = useState([])

  useEffect(() => {
    async function fetchBalance() {
      const balanceRes = await getBalance();
      const transactionRes = await getAllTransactions();
      const paymentRes = await getAllPayments()
      const { data_volume, data_unit } = balanceRes.data;
      setCurrentBalance({ volume: data_volume, unit: data_unit });
      setTransactions(transactionRes.data);
      setPayments(paymentRes.data)
    }
    fetchBalance();
  }, []);

  return (
    <AppStateContext.Provider value={{ currentBalance, transactions, payments }}>
      {children}
    </AppStateContext.Provider>
  );
};

export const useAppState = () => {
  return useContext(AppStateContext);
};

export default AppStateProvider;
