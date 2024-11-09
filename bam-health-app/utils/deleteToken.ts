import { Platform } from "react-native";
import * as SecureStore from "expo-secure-store";

export const deleteToken = async () => {
  if (Platform.OS === "web") {
    while (typeof window === "undefined") {
      await new Promise((resolve) => setTimeout(resolve, 100));
    }

    localStorage.removeItem("JWT_USER_TOKEN");
  } else {
    try {
      await SecureStore.deleteItemAsync("JWT_USER_TOKEN");
    } catch (e) {
      console.error(e);
    }
  }
};
