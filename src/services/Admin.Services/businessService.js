import http from "../httpService";
import { adminUrl, adminUrlV2 } from "../../config";

export const getBusinesses = async () => {
  try {
    const res =  await http.get(`${adminUrl}/business`);

    return res
  
  } catch (e) {
    return null;
  }
};

export const getSingleBusiness = async (id) => {
  try {
    const res =  await http.get(`${adminUrl}/business/get/${id}`);

    return res
  
  } catch (e) {
    return null;
  }
};

export const getWallets = async () => {
  try {
    const res =  await http.get(`${adminUrl}/balances`);

    return res
  
  } catch (e) {
    return null;
  }
};

export const getPayments = async () => {
  try {
    const res =  await http.get(`${adminUrl}/payments`);

    return res
  
  } catch (e) {
    return null;
  }
};

export const getTransactions = async () => {
  try {
    const res =  await http.get(`${adminUrl}/transactions`);

    return res
  
  } catch (e) {
    return null;
  }
};

export const getAllTrx = async () => {
  try {
    const res =  await http.get(`${adminUrl}/trxAll`);

    return res
  
  } catch (e) {
    return null;
  }
};

export const getAllSold = async () => {
  try {
    const res =  await http.get(`${adminUrl}/totalDataAll`);

    return res
  
  } catch (e) {
    return null;
  }
};

export const getAdmins = async () => {
  try {
    const res =  await http.get(`${adminUrl}/admins`);

    return res
  
  } catch (e) {
    return null;
  }
};

export const getMainBalance = async () => {
  try {
    const res =  await http.get(`${adminUrl}/api/balance`);

    return res
  
  } catch (e) {
    return null;
  }
};

export const creditBusiness = async (body) => {
  try {
    const res =  await http.post(`${adminUrl}/credit`, body);

    return res
  
  } catch (e) {
    return null;
  }
};

export const debitBusiness = async (body) => {
  try {
    const res =  await http.post(`${adminUrl}/debit`, body);

    return res
  
  } catch (e) {
    return null;
  }
};

export const generateCreditPayment = async (body) => {
  try {
    const res =  await http.post(`${adminUrl}/payments`, body);

    return res
  
  } catch (e) {
    return null;
  }
};

export const updatePayType = async (body) => {
  try {
    const res =  await http.post(`${adminUrl}/update_payment_type`, body);

    return res
  
  } catch (e) {
    return null;
  }
};


export const removeAdmin = async (email) => {
  try {
    const res =  await http.delete(`${adminUrl}/admin/remove/${email}`);

    return res
  
  } catch (e) {
    return null;
  }
};

export const makeAdmin = async (email) => {
  try {
    const res =  await http.post(`${adminUrl}/admin/create`, { email });

    return res
  
  } catch (e) {
    return null;
  }
};

export const makeActive = async (account_id) => {
  try{
    const res =  await http.get(`${adminUrl}/account/enable/${account_id}`)

    return res
  
  }catch(e){
    return null
  }
}

export const disableAccount = async (account_id) => {
  try{
    const res =  await http.get(`${adminUrl}/account/disable/${account_id}`)

    return res
  
  }catch(e){
    return null
  }
}

export const setAccountType = async (type, account_id) => {
  try{
    const res =  await http.post(`${adminUrl}/account/type`, { type, account_id })

    return res
  
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
