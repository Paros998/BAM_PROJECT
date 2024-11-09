import React from "react";
import ScreenPending from "../components/ScreenPending/ScreenPending";
import { useCurrentUser } from "@/contexts/UserContext";
import AuthorizedViews from "@/app/AuthorizedViews";
import UnauthorizedViews from "@/app/UnauthorizedViews";

const Views = () => {
  const { currentUser, isPending } = useCurrentUser();

  if (isPending) {
    return <ScreenPending isPending={isPending} />;
  }

  if (currentUser) {
    return <AuthorizedViews />;
  }

  return <UnauthorizedViews />;
};

export default Views;
