import http from "./httpService";
import { apiUrl } from "../config.js";

const apiEndpoint = apiUrl + "/users";

export async function register(body) {
  return http.post(apiEndpoint, body);
}

export async function update(body) {
  const params = body["username"];
  return http.patch(`${apiEndpoint}/${params}`, body);
}

export async function changePass(body) {
  return http.post(`${apiUrl}/change_password`, body);
}
