import React, { useContext, createContext, useState, useEffect } from "react";
import {
  getBusinesses,
  getPayments,
  getTransactions,
  getWallets,
  getAdmins,
  getMainBalance,
  getAllTrx,
  getAllSold,
  getAirtimeApis,
} from "../services/Admin.Services/businessService";
const AdminContext = createContext();

const AdminProvider = ({ children }) => {
  const [business, setBusiness] = useState({
    lite: [],
    mega: [],
    agent: [],
  });
  const [wallet, setWallet] = useState([]);
  const [transaction, setTransaction] = useState([]);
  const [payment, setPayment] = useState([]);
  const [admins, setAdmins] = useState([]);
  const [allTrx, setAllTrx] = useState(0);
  const [allSold, setAllSold] = useState(0);
  const [airtimeApis, setAirtimeApis] = useState([]);
  const [mainBalance, setMainBalance] = useState({
    mtn_balance: "",
    airtel_balance: "",
    simserver: "",
  });

  useEffect(() => {
    async function loadAdmin() {
      const result = await Promise.all([
        getBusinesses(),
        getPayments(),
        getTransactions(),
        getWallets(),
        getAdmins(),
        getAllTrx(),
        getAllSold(),
        getMainBalance(),
        getAirtimeApis(),
      ]);

      if (result[0]) {
        setBusiness(result[0]?.data);
      }
      setPayment(result[1]?.data);
      setTransaction(result[2]?.data);
      setWallet(result[3]?.data);
      setAdmins(result[4]?.data);
      setAllTrx(result[5]?.data.totalTransactions);
      setAllSold(result[6]?.data.totalDataSold);
      setAirtimeApis(result[8]?.data);

      if (result[7]) {
        setMainBalance(result[7]?.data);
      }
    }
    loadAdmin();
  }, []);
  return (
    <AdminContext.Provider
      value={{
        business,
        wallet,
        transaction,
        payment,
        admins,
        mainBalance,
        allTrx,
        allSold,
        airtimeApis,
      }}
    >
      {children}
    </AdminContext.Provider>
  );
};
export default AdminProvider;

export const useAdmin = () => {
  return useContext(AdminContext);
};
