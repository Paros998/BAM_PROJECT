import React from "react";

import { UserModel } from "./Api";

export interface UserContextInterface {
  currentUser?: UserModel;
  fetchUser: <UserModel>() => Promise<void>;

  isPending: boolean;
  setIsPending: React.Dispatch<React.SetStateAction<boolean>>;

  onLogOut: () => Promise<void>;
  onClearUser: () => void;
}
