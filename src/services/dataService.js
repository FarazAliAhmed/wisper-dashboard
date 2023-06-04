import http from "./httpService";
import { apiUrl, apiUrlV2 } from "../config.js";



export async function getAllPlans() {
  try {
    const res = await http.get(`${apiUrl}/plans`);
    // console.log(res)
    return res
  } catch (error) {
    return null;
  }
}

export async function getAllPlansUser(userId) {
  try {
    const res = await http.get(`${apiUrl}/plans_user/${userId}`);
    // console.log("plans user", res)
    return res
  } catch (error) {
    return null;
  }
}

export async function getBalance() {
  try {
    const res = await http.get(`${apiUrl}/balance`);
    return res
  } catch (error) {
    return null;
  }
}

export async function allocateData(body, apiKey) {
  const headers = { "x-api-key": apiKey };

  console.log("body", body)
  const payload = {
    network: body.network,
    plan_id: body.plan_id,
    phone_number: body.phone_number,
    allocate_for_business: body.allocate_for_business,
    business_id: body.business_id,
    price: body.price,
    volume: body.volume
  };

  

  const res = await http.post(`${apiUrl}/buy`, payload, { headers });
  return res
}

export async function getAllTransactions() {
  try {
    const res = await http.get(`${apiUrl}/transactions`);
    return res
  } catch (error) {
    return null;
  }
}

export async function getSingleTrx(id) {
  try {
    const res = await http.get(`${apiUrl}/trxSingle/${id}`);
    return res
  } catch (error) {
    return null;
  }
}

export async function getSingleSold(id) {
  try {
    const res = await http.get(`${apiUrl}/totalDataSingle/${id}`);
    return res
  } catch (error) {
    return null;
  }
}



export async function getAllTransactionsV2({limit, offset} = {limit: 50, offset: 0}) {
  try {
    const transactions = await http.get(`${apiUrlV2}/transactions?limit=${limit}&offset=${offset}`);
    console.log({transactions})
    return transactions.data;
  } catch (error) {
    return { data: [] };
  }
}

export async function FilterTransactionsV2(filter, {limit, offset} = {limit: 50, offset: 0}) {
  try {
    const transactions = await http.post(`${apiUrlV2}/transactions/filter?limit=${limit}&offset=${offset}`, filter);
    return transactions.data;
  } catch (error) {
    return { data: [] };
  }
}

export async function getAllPayments() {
  try {
    const res = await http.get(`${apiUrl}/payments`);
    return res
  } catch (error) {
    return null;
  }
}

export async function addPayment(payment) {
  try {
    const res = await http.post(`${apiUrl}/payments`, payment);
    return res
  } catch (error) {
    return null;
  }
}

export async function getMaintenance(){
  try{
    const res = await http.get(`${apiUrl}/maintenance`)
    return res
  }catch(e){
    return null
  }
}

export async function saveWebhook(webhook=" "){
  try{
    const res = await http.post(`${apiUrl}/url/webhook`, {url: webhook})
    return res
  }catch(e){
    return null
  }
}

export async function saveCallback(callback=" "){
  try{
    const res = await http.post(`${apiUrl}/url/callback`, {url: callback})
    return res
  }catch(e){
    return null
  }
}