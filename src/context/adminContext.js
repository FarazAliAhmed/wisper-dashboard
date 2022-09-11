import React, { useContext, createContext, useState, useEffect } from "react";
import {
  getBusinesses,
  getPayments,
  getTransactions,
  getWallets,
  getAdmins,
  getMainBalance
} from "../services/Admin.Services/businessService";
const AdminContext = createContext();

const AdminProvider = ({ children }) => {
  const [business, setBusiness] = useState({
    lite: [],
    mega: [],
  });
  const [wallet, setWallet] = useState([]);
  const [transaction, setTransaction] = useState([]);
  const [payment, setPayment] = useState([]);
  const [admins, setAdmins] = useState([]);
  const [mainBalance, setMainBalance] = useState({
    mtn_balance: "",
    airtel_balance: "",
    simserver: "",
  })

  useEffect(() => {
    async function loadAdmin() {
      const result = await Promise.all([
        getBusinesses(),
        getPayments(),
        getTransactions(),
        getWallets(),
        getAdmins(),
        getMainBalance(),
      ]);
      
      setBusiness(result[0].data);
      setPayment(result[1].data);
      setTransaction(result[2].data);
      setWallet(result[3].data);
      setAdmins(result[4].data);

      setMainBalance({
        mtn_balance: result[5].data.balance.account_1,
        airtel_balance: result[5].data.balance.account_2,
        simserver: result[5].data.simserver.account_1,
      });
    }
    loadAdmin();
  }, []);
  return (
    <AdminContext.Provider
      value={{ business, wallet, transaction, payment, admins, mainBalance }}
    >
      {children}
    </AdminContext.Provider>
  );
};
export default AdminProvider;

export const useAdmin = () => {
  return useContext(AdminContext);
};
