import React, {useEffect} from "react";
import {View} from "@gluestack-ui/themed-native-base";
import Logo from "@/components/Logo/Logo";
import {useCurrentUser} from "@/contexts/UserContext";
import {noop} from "@babel/types";
import * as ScreenCapture from 'expo-screen-capture';
import {Platform} from "react-native";

const AuthRequired = () => {
  useEffect(() => {
    if (
        process.env.EXPO_PUBLIC_ANTI_TAPJACKING_ENABLED === "true" &&
        Platform.OS === "android"
    ) {
      ScreenCapture.preventScreenCaptureAsync();
    }

    return () => {
      if (
          process.env.EXPO_PUBLIC_ANTI_TAPJACKING_ENABLED === "true" &&
          Platform.OS === "android"
      ) {
        ScreenCapture.allowScreenCaptureAsync();
      }
    };
  }, []);

  const {tryToReauthenticate} = useCurrentUser();

  useEffect(() => {
    tryToReauthenticate().then(noop).catch(noop);
  });

  return (
      <View
          height={"full"}
          pt={2}
          w="full"
          backgroundColor="light.800"
          alignItems="center"
          justifyContent="flex-start"
      >
        <Logo marginBottom={10}/>
      </View>
  );
};

export default AuthRequired;
