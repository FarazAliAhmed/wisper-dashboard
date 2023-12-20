import jwtDecode from "jwt-decode";
import http from "./httpService";
import { apiUrl } from "../config.js";
import axios from "axios";

const apiEndpoint = apiUrl + "/auth/";
const tokenKey = "token";

http.setJwt(getJwt());

export async function login(email, password) {
  const { data: jwt } = await http.post(apiEndpoint, { email, password });
  localStorage.setItem(tokenKey, jwt);
}

export async function resendLink(email) {
  const res = await http.post(`${apiEndpoint}resendConfirmEmail`, { email });
  console.log("res", res);
  return res;
}

export async function resetLink(email) {
  const res = await http.post(`${apiEndpoint}resetActivationEmail`, { email });
  return res;
}

export async function confirmEmail(token) {
  const res = await http.post(`${apiEndpoint}confirmEmail`, { token });
  return res;
}

const forgotPassword = async (email, url) => {
  try {
    const res = await axios.post(`${apiUrl}/forgot_password`, { email, url });

    if (res.data.status == "User Does Not Exists!!!") {
      return false;
    }
    return true;
    // Handle the response data
  } catch (error) {
    console.error(error);
    return false;
    // Handle the error
  }
};

const resetPassword = async (password, email, token) => {
  try {
    const res = await axios.post(`${apiUrl}/reset_password/${email}/${token}`, {
      password,
    });

    if (res.data.status == "User Not Exists!!") {
      return false;
    }
    return true;
  } catch (error) {
    console.error(error);
    return false;
    // Handle the error
  }
};

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
  forgotPassword,
  resetPassword,
  resendLink,
  resetLink,
  confirmEmail,
};
