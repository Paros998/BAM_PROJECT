import React from "react";
import ScreenPending from "../components/ScreenPending/ScreenPending";
import { useCurrentUser } from "@/contexts/UserContext";
import AuthorizedViews from "@/views/AuthorizedViews";
import UnauthorizedViews from "@/views/UnauthorizedViews";
import { useInitAxios } from "@/utils/useInitAxios";
import AuthRequired from "@/views/Authorized/AuthRequired";

const Views = () => {
  useInitAxios();
  const { currentUser, isPending, needsReAuthentication } = useCurrentUser();

  if (isPending) {
    return <ScreenPending isPending={isPending} />;
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
