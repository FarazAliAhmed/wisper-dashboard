import http from "./httpService";
import { apiUrl } from "../config.js";

const apiEndpoint = apiUrl + "/users";

export async function register(body) {
  return http.post(apiEndpoint, body);
}
