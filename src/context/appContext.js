import React, { createContext, useContext, useEffect, useState } from "react";
import {
  getAllTransactions,
  getBalance,
  getAllPayments,
  getAllPlans,
  getMaintenance,
  getSingleTrx,
  getSingleSold
} from "../services/dataService";
import { useUser } from "./userContext";
// import { getMainBalance } from "../services/Admin.Services/businessService";
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
      "9mobile": 0,
      unit: "",
    },
    // mtn_balance: "",
    // airtel_balance: "",
  });
  const [transactions, setTransactions] = useState([]);
  const [singleTrx, setSingleTrx] = useState(0)
  const [singleSold, setSingleSold] = useState(0)
  const [payments, setPayments] = useState([]);
  const [plans, setPlans] = useState([]);
  const [maintenance, setMaintenance] = useState({
    "mtn_sme": false,
    "mtn_gifting": false,
    "airtel": false,
    "glo": false,
    "9mobile": false,
    "notice": null,
  })

  const { user } = useUser();

  useEffect(() => {
    async function fetchBalance() {
      const results = await Promise.all([
        getBalance(),
        getAllTransactions(),
        getAllPayments(),
        getAllPlans(),
        getMaintenance(),
        getSingleTrx(user?._id),
        getSingleSold(user?._id)
      ])
      const balanceRes = results[0] 
      const transactionRes = results[1] 
      const paymentRes = results[2] 
      const planRes = results[3]
      const maintenanceRes = results[4]

      // setSingleTrx(results[5]?.data.transactionCount)
      // setSingleSold(results[6]?.data.totalDataSold)
      
// console.log(user?._id)
// console.log(results[5])
// console.log(results[6])

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
          "9mobile": balanceRes.data.mega_wallet["9mobile"],
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
      setMaintenance(maintenanceRes.data.maintenance)
    }
    fetchBalance();
  }, [user]);

  return (
    <AppStateContext.Provider
      value={{ currentBalance, transactions, payments, plans, maintenance, setMaintenance, singleTrx, singleSold }}
    >
      {children}
    </AppStateContext.Provider>
  );
};

export const useAppState = () => {
  return useContext(AppStateContext);
};

export default AppStateProvider;
