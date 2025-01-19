import React, {FC, useEffect} from "react";
import * as ScreenCapture from "expo-screen-capture";
import {Platform} from "react-native";

const Admin: FC = () => {
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
  return <div></div>;
};

export default Admin;
