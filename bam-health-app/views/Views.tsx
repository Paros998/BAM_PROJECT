import React, { useEffect, useState } from "react";
import ScreenPending from "../components/ScreenPending/ScreenPending";
import { useCurrentUser } from "@/contexts/UserContext";
import AuthorizedViews from "@/views/AuthorizedViews";
import UnauthorizedViews from "@/views/UnauthorizedViews";
import { useInitAxios } from "@/utils/useInitAxios";
import AuthRequired from "@/views/Authorized/AuthRequired";
import { Alert, PermissionsAndroid, Platform } from "react-native";
import AccessDenied from "@/components/AccessDenied/AccessDenied";

const Views = () => {
  useInitAxios();
  const { currentUser, isPending, needsReAuthentication } = useCurrentUser();

  const [hasPermission, setHasPermission] = useState<boolean | null>(null);

  useEffect(() => {
    const checkOverlayPermission = async () => {
      if (
        process.env.EXPO_PUBLIC_ANTI_TAPJACKING_ENABLED &&
        Platform.OS === "android"
      ) {
        return await PermissionsAndroid.check(
          PermissionsAndroid.PERMISSIONS.SYSTEM_ALERT_WINDOW,
        );
      }
      return true;
    };

    checkOverlayPermission()
      .then(
        (r) => setHasPermission(r),
        () => {
          Alert.alert(
            "Warning",
            "Unauthorized overlay detected. Close other applications.",
          );
          setHasPermission(false);
        },
      )
      .catch(() => {
        Alert.alert("Error", "An unexpected error occurred.");
        setHasPermission(false);
      });
  }, []);

  if (hasPermission === null || isPending) {
    return <ScreenPending isPending={isPending} />;
  }

  if (!hasPermission) {
    return <AccessDenied />;
  }

  if (currentUser) {
    if (needsReAuthentication) {
      return <AuthRequired />;
    }

    return <AuthorizedViews />;
  }

  return <UnauthorizedViews />;
};

export default Views;
