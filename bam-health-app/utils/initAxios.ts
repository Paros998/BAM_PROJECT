import axios from "axios";
import { getRawToken } from "./getRawToken";
import { Platform } from "react-native";

const webServerUrl = "http://localhost:8080/api/v1/";
const androidExpoServerUrl = "http://192.168.0.201:8080/api/v1/";

axios.defaults.baseURL =
  Platform.OS === "web" ? webServerUrl : androidExpoServerUrl;

export const initAxios = async () => {
  const token = await getRawToken();
  if (token) axios.defaults.headers.common["Authorization"] = token;
};
