import { Platform } from "react-native";
import * as SecureStore from "expo-secure-store";

export const getRawToken = async () => {
  let token;
  if (Platform.OS === 'web') {
    token = localStorage.getItem("JWT_USER_TOKEN");
  } else {
    try {
      token = await SecureStore.getItemAsync("JWT_USER_TOKEN");
    } catch (e) {
      console.error(e);
    }
  }

  return await token;
}
