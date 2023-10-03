import React, { createContext, useContext, useEffect, useState } from "react";
import {
  getAllTransactions,
  getBalance,
  getAllPayments,
  getAllPlans,
  getMaintenance,
  getSingleTrx,
  getSingleSold,
  getAllPlansUser,
  getUserMegaPrice,
  getStoreFront,
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
  const [singleTrx, setSingleTrx] = useState(0);
  const [singleSold, setSingleSold] = useState(0);
  const [payments, setPayments] = useState([]);
  const [plans, setPlans] = useState([]);
  const [plansUser, setPlansUser] = useState([]);
  const [megaPriceUser, setMegaPriceUser] = useState([]);
  const [storeFront, setStoreFront] = useState({});
  const [maintenance, setMaintenance] = useState({
    mtn_sme: false,
    mtn_gifting: false,
    airtel: false,
    glo: false,
    "9mobile": false,
    notice: null,
  });

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
        getSingleSold(user?._id),
        getAllPlansUser(user?._id),
        getUserMegaPrice(user?._id),
        getStoreFront(user?._id),
      ]);
      const balanceRes = results[0];
      const transactionRes = results[1];
      const paymentRes = results[2];
      const planRes = results[3];
      const maintenanceRes = results[4];
      const planResUser = results[7];
      const megaPriceUser = results[8];
      const storeFront = results[9];

      // console.log("result 1", results[1])

      // setSingleTrx(results[5]?.data.transactionCount)
      // setSingleSold(results[6]?.data.totalDataSold)
      // djdhhd

      // console.log(user?._id)
      // console.log(results[5])
      // console.log(results[6])

      // const mainBalance = await getMainBalance();
      if (balanceRes) {
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
      }

      if (transactionRes) {
        transactionRes.data.sort(function (a, b) {
          const A = Date.parse(a.created_at);
          const B = Date.parse(b.created_at);
          if (A > B) return -1;
          if (A < B) return 1;
        });
        transactionRes.data.sort(function (a, b) {
          const A = Date.parse(a.created_at);
          const B = Date.parse(b.created_at);
          if (A > B) return -1;
          if (A < B) return 1;
        });

        setTransactions(transactionRes.data);
        // console.log("transactionRes", transactionRes)
      }

      if (paymentRes) {
        setPayments(paymentRes.data);
      }

      if (planRes) {
        setPlans(planRes.data.plan);
      }

      if (planResUser) {
        // console.log("planResUser", planResUser)
        setPlansUser(planResUser.data);
      }

      if (megaPriceUser) {
        // console.log("planResUser", planResUser)
        setMegaPriceUser(megaPriceUser.data);
      }
      if (storeFront) {
        // console.log("planResUser", planResUser)
        setStoreFront(storeFront.data);
      }

      if (maintenanceRes) {
        setMaintenance(maintenanceRes.data.maintenance);
      }
    }
    if (user) {
      fetchBalance();
    }
  }, [user]);

  return (
    <AppStateContext.Provider
      value={{
        currentBalance,
        transactions,
        payments,
        plans,
        plansUser,
        maintenance,
        setMaintenance,
        singleTrx,
        singleSold,
        megaPriceUser,
        storeFront,
      }}
    >
      {children}
    </AppStateContext.Provider>
  );
};

export const useAppState = () => {
  return useContext(AppStateContext);
};

export default AppStateProvider;
