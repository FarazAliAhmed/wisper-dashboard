import http from "./httpService";
import { apiUrl } from "../config.js";

const apiEndpoint = apiUrl + "/users";

export async function register(body) {
  return http.post(apiEndpoint, body);
}

export async function update(body) {
  const params = body["username"];
  delete body["_id"];
  delete body["access_token"];
  delete body["isAdmin"];
  return http.patch(`${apiEndpoint}/${params}`, body);
}
