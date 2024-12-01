import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import "react-native-reanimated";
import { initAxios } from "@/utils/initAxios";
import CurrentUserProvider from "@/contexts/UserContext";
import { NativeBaseProvider } from "@gluestack-ui/themed-native-base";
import { LogBox } from "react-native";
import { overriddenTheme } from "@/constants/overriddenTheme";
import Views from "@/views/Views";
import { NavigationContainer } from "@react-navigation/native";

// Prevent the splash screen from auto-hiding before asset loading is  complete.
SplashScreen.preventAutoHideAsync();
initAxios().catch();

export default function RootLayout() {
  const [loaded] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
  });

  useEffect(() => {
    LogBox.ignoreLogs([
      "In React 18, SSRProvider is not necessary and is a noop. You can remove it from your app.",
    ]);
  }, []);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <NavigationContainer>
      <NativeBaseProvider theme={overriddenTheme}>
        <CurrentUserProvider>
          <Views />
        </CurrentUserProvider>
      </NativeBaseProvider>
    </NavigationContainer>
  );
}
