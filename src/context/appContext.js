import React, { createContext, useContext, useEffect, useState } from "react";
import { getAllTransactions, getBalance, getAllPayments } from "../services/dataService";

export const AppStateContext = createContext();

const AppStateProvider = ({ children }) => {
  const [currentBalance, setCurrentBalance] = useState({
    volume: 0,
    unit: "",
    cash: 0,
  });
  const [transactions, setTransactions] = useState([]);
  const [payments, setPayments] = useState([])

  useEffect(() => {
    async function fetchBalance() {
      const balanceRes = await getBalance();
      const transactionRes = await getAllTransactions();
      const paymentRes = await getAllPayments()
      console.log(balanceRes)
      setCurrentBalance({ 
        volume: balanceRes.data.data_volume,
        unit: balanceRes.data.data_unit,
        cash: balanceRes.data.wallet_balance
      });
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
