import { Platform } from "react-native";
import * as SecureStore from "expo-secure-store";

export const putToken = async (token: string) => {
  if (Platform.OS === "web") {
    while (typeof window === "undefined") {
      await new Promise((resolve) => setTimeout(resolve, 100));
    }

    localStorage.setItem("JWT_USER_TOKEN", token);
  } else {
    try {
      await SecureStore.setItemAsync("JWT_USER_TOKEN", token);
    } catch (e) {
      console.error(e);
    }
  }
};
