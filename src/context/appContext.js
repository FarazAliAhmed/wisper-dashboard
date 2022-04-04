import React, { createContext, useContext, useEffect, useState } from "react";
import { getAllTransactions, getBalance, getAllPayments } from "../services/dataService";

export const AppStateContext = createContext();

const AppStateProvider = ({ children }) => {
  const [currentBalance, setCurrentBalance] = useState({
    volume: 0,
    unit: "",
    cash: 0,
    mega_wallet: {
      mtn_sme: 0,
      mtn_gifting: 0,
      airtel: 0,
      glo: 0,
      unit: ""
    }
  });
  const [transactions, setTransactions] = useState([]);
  const [payments, setPayments] = useState([])

  useEffect(() => {
    async function fetchBalance() {
      const balanceRes = await getBalance();
      console.log("Balance: ", balanceRes)
      const transactionRes = await getAllTransactions();
      const paymentRes = await getAllPayments()
      setCurrentBalance({ 
        volume: balanceRes.data.data_volume,
        unit: balanceRes.data.data_unit,
        cash: balanceRes.data.wallet_balance,
        mega_wallet: {
          mtn_sme: balanceRes.data.mega_wallet.mtn_sme,
          mtn_gifting: balanceRes.data.mega_wallet.mtn_gifting,
          airtel: balanceRes.data.mega_wallet.airtel,
          glo: balanceRes.data.mega_wallet.glo,
          unit: balanceRes.data.mega_wallet.unit,
        }
      });
      transactionRes.data.sort(function(a, b){
        const A = Date.parse(a.created_at);
        const B = Date.parse(b.created_at);
        if(A > B) return -1;
        if(A < B) return 1;
      })
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
