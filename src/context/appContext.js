import React, { createContext, useContext, useEffect, useState } from "react";
import {
  getAllTransactions,
  getBalance,
  getAllPayments,
  getAllPlans,
} from "../services/dataService";
// import { getMainBalance } from "../services/Admin.Services/businessService";

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
      unit: "",
    },
    // mtn_balance: "",
    // airtel_balance: "",
  });
  const [transactions, setTransactions] = useState([]);
  const [payments, setPayments] = useState([]);
  const [plans, setPlans] = useState([]);

  useEffect(() => {
    async function fetchBalance() {
      const results = await Promise.all([
        getBalance(),
        getAllTransactions(),
        getAllPayments(),
        getAllPlans(),
      ])
      const balanceRes = results[0] 
      const transactionRes = results[1] 
      const paymentRes = results[2] 
      const planRes = results[3]
      // const mainBalance = await getMainBalance();
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
        },
        // mtn_balance: mainBalance.data.balance.account_1,
        // airtel_balance: mainBalance.data.balance.account_2,
      });
      transactionRes.data.sort(function (a, b) {
        const A = Date.parse(a.created_at);
        const B = Date.parse(b.created_at);
        if (A > B) return -1;
        if (A < B) return 1;
      });
      setTransactions(transactionRes.data);
      setPayments(paymentRes.data);
      setPlans(planRes.data.plan);
    }
    fetchBalance();
  }, []);

  return (
    <AppStateContext.Provider
      value={{ currentBalance, transactions, payments, plans }}
    >
      {children}
    </AppStateContext.Provider>
  );
};

export const useAppState = () => {
  return useContext(AppStateContext);
};

export default AppStateProvider;
