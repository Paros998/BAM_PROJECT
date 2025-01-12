import axios from "axios";
import { getRawToken } from "./getRawToken";
import { Platform } from "react-native";
import { useEffect } from "react";
import { useCurrentUser } from "@/contexts/UserContext";

const base = process.env.EXPO_PUBLIC_SSL_ENABLED ? "https" : "http";

const webServerUrl = `${base}://localhost:8080/api/v1/`;
const androidExpoServerUrl = `${base}://192.168.0.201:8080/api/v1/`;

axios.defaults.baseURL =
  Platform.OS === "web" ? webServerUrl : androidExpoServerUrl;

export const useInitAxios = () => {
  const { onClearUser } = useCurrentUser();

  getRawToken().then((value) => {
    if (value) axios.defaults.headers.common["Authorization"] = value;
  });

  useEffect(() => {
    axios.interceptors.response.use(
      (response) => response,
      async (error) => {
        const status = error?.response?.status;
        if (status === 403) {
          onClearUser();
        }
        return Promise.reject(error);
      },
    );
  }, [onClearUser]);
};
