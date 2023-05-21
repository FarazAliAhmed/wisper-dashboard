import http from "../httpService";
import { adminUrl, adminUrlV2 } from "../../config";

export const getBusinesses = async () => {
  try {
    return http.get(`${adminUrl}/business`);
  } catch (e) {
    return null;
  }
};

export const getSingleBusiness = async (id) => {
  try {
    return http.get(`${adminUrl}/business/get/${id}`);
  } catch (e) {
    return null;
  }
};

export const getWallets = async () => {
  try {
    return http.get(`${adminUrl}/balances`);
  } catch (e) {
    return null;
  }
};

export const getPayments = async () => {
  try {
    return http.get(`${adminUrl}/payments`);
  } catch (e) {
    return null;
  }
};

export const getTransactions = async () => {
  try {
    return http.get(`${adminUrl}/transactions`);
  } catch (e) {
    return null;
  }
};

export const getAllTrx = async () => {
  try {
    return http.get(`${adminUrl}/trxAll`);
  } catch (e) {
    return null;
  }
};

export const getAllSold = async () => {
  try {
    return http.get(`${adminUrl}/totalDataAll`);
  } catch (e) {
    return null;
  }
};

export const getAdmins = async () => {
  try {
    return http.get(`${adminUrl}/admins`);
  } catch (e) {
    return null;
  }
};

export const getMainBalance = async () => {
  try {
    return http.get(`${adminUrl}/api/balance`);
  } catch (e) {
    return null;
  }
};

export const creditBusiness = async (body) => {
  try {
    return http.post(`${adminUrl}/credit`, body);
  } catch (e) {
    return null;
  }
};

export const debitBusiness = async (body) => {
  try {
    return http.post(`${adminUrl}/debit`, body);
  } catch (e) {
    return null;
  }
};

export const generateCreditPayment = async (body) => {
  try {
    return http.post(`${adminUrl}/payments`, body);
  } catch (e) {
    return null;
  }
};

export const removeAdmin = async (email) => {
  try {
    return http.delete(`${adminUrl}/admin/remove/${email}`);
  } catch (e) {
    return null;
  }
};

export const makeAdmin = async (email) => {
  try {
    return http.post(`${adminUrl}/admin/create`, { email });
  } catch (e) {
    return null;
  }
};

export const makeActive = async (account_id) => {
  try{
    return http.get(`${adminUrl}/account/enable/${account_id}`)
  }catch(e){
    return null
  }
}

export const disableAccount = async (account_id) => {
  try{
    return http.get(`${adminUrl}/account/disable/${account_id}`)
  }catch(e){
    return null
  }
}

export const setAccountType = (type, account_id) => {
  try{
    return http.post(`${adminUrl}/account/type`, { type, account_id })
  }catch(e){
    return null
  }
}

export async function getAllTransactionsV2({limit, offset} = {limit: 50, offset: 0}) {
  try {
    const transactions = await http.get(`${adminUrlV2}/transactions?limit=${limit}&offset=${offset}`);
    return transactions.data;
  } catch (error) {
    return { data: [] };
  }
}

export async function FilterTransactionsV2(filter, {limit, offset} = {limit: 50, offset: 0}) {
  try {
    const transactions = await http.post(`${adminUrlV2}/transactions/filter?limit=${limit}&offset=${offset}`, filter);
    return transactions.data;
  } catch (error) {
    return { data: [] };
  }
}
