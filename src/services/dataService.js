import http from "./httpService";
import { apiUrl } from "../config.js";

export async function getAllPlans() {
  try {
    return http.get(`${apiUrl}/plans`);
  } catch (error) {
    return null;
  }
}

export async function getBalance() {
  try {
    return http.get(`${apiUrl}/balance`);
  } catch (error) {
    return null;
  }
}

export async function allocateData(body, apiKey) {
  const headers = { "x-api-key": apiKey };
  const payload = {
    network: body.network,
    plan_id: body.plan_id,
    phone_number: body.phone_number,
    allocate_for_business: body.allocate_for_business,
    business_id: body.business_id,
  };

  return http.post(`${apiUrl}/buy`, payload, { headers });
}

export async function getAllTransactions() {
  try {
    return http.get(`${apiUrl}/transactions`);
  } catch (error) {
    return null;
  }
}

export async function getAllPayments() {
  try {
    return http.get(`${apiUrl}/payments`);
  } catch (error) {
    return null;
  }
}

export async function addPayment(payment) {
  try {
    return http.post(`${apiUrl}/payments`, payment);
  } catch (error) {
    return null;
  }
}

export async function getMaintenance(){
  try{
    return http.get(`${apiUrl}/maintenance`)
  }catch(e){
    return null
  }
}

export async function saveWebhook(webhook){
  try{
    return http.post(`${apiUrl}/url/webhook`, {url: webhook})
  }catch(e){
    return null
  }
}

export async function saveCallback(callback){
  try{
    return http.post(`${apiUrl}/url/callback`, {url: callback})
  }catch(e){
    return null
  }
}