import jwtDecode from "jwt-decode";
import http from "./httpService";
import { apiUrl } from "../config.js";

const apiEndpoint = apiUrl + "/auth/";
const tokenKey = "token";

http.setJwt(getJwt());

export async function login(email, password) {
  const { data: jwt } = await http.post(apiEndpoint, { email, password });
  localStorage.setItem(tokenKey, jwt);
}

export function loginWithJwt(jwt) {
  localStorage.setItem(tokenKey, jwt);
}

export function logout() {
  localStorage.removeItem(tokenKey);
}

export function getCurrentUser() {
  try {
    const jwt = localStorage.getItem(tokenKey);
    return jwtDecode(jwt);
  } catch (ex) {
    return null;
  }
}

export const isLoggedIn = getCurrentUser();

export function getJwt() {
  return localStorage.getItem(tokenKey);
}

export const whoami = async () => {
  const result = await http.get(`${apiUrl}/whoami`);
  return result.data;
};

export default {
  login,
  loginWithJwt,
  logout,
  getCurrentUser,
  getJwt,
};
