import http from "./httpService";
import { apiUrl } from "../config.js";

const { REACT_APP_BUSINESS_ACCESS_TOKEN } = process.env;

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

export async function allocateData(body) {
  const headers = { "x-api-key": REACT_APP_BUSINESS_ACCESS_TOKEN };
  const payload = {
    network: "airtel",
    plan_id: body.planId,
    phone_number: body.phone_number,
  };

  return http.post(`${apiUrl}/buy`, payload, { headers });
}
