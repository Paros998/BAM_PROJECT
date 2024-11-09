import axios from "axios";
import { getRawToken } from "./getRawToken";

axios.defaults.baseURL = "/api/v1/";

export const initAxios = async () => {
  const token = await getRawToken();
  if (token) axios.defaults.headers.common["Authorization"] = token;
};
