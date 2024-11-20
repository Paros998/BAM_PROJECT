import {
  Context,
  createContext,
  FC,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { useToast } from "native-base";
import { jwtDecode } from "jwt-decode";
import Axios from "axios";

import { UserContextInterface } from "@/interfaces/UserContextInterface";
import { UserModel } from "@/interfaces/Api";
import { JwtUser } from "@/interfaces/JwtUser";
import { useNavigation } from "@react-navigation/native";
import { getRawToken } from "@/utils/getRawToken";
import { deleteToken } from "@/utils/deleteToken";

const UserContext = createContext<any>(undefined);

export const useCurrentUser = () =>
  useContext(UserContext as Context<UserContextInterface>);

interface ProviderProps {
  children: ReactNode;
}

const CurrentUserProvider: FC<ProviderProps> = ({ children }) => {
  const navigation = useNavigation();
  const [currentUser, setCurrentUser] = useState<UserModel>();
  const [isPending, setIsPending] = useState(false);
  const toast = useToast();

  const onClearUser = async () => {
    setCurrentUser(undefined);

    await onLogOut();
  };

  const fetchUser = useCallback(async () => {
    setIsPending(true);

    const token = await getRawToken();

    if (!token) {
      setIsPending(false);
      setCurrentUser(undefined);
      return;
    }

    if (Axios.defaults.headers.common.Authorization === undefined) {
      Axios.defaults.headers.common.Authorization = token;
    }

    const { userId }: JwtUser = jwtDecode(token);

    if (!userId) {
      setIsPending(false);
      return;
    }

    try {
      const { data } = await Axios.get<UserModel>(`/users/find/${userId}`);
      setCurrentUser(data);
    } catch (e: any) {
      toast.show({
        title: e.message,
        variant: "error",
      });

      if (e.status === 404) {
        await deleteToken();
      }
    } finally {
      setIsPending(false);
    }
  }, []);

  useEffect(() => {
    fetchUser().catch();
  }, [fetchUser]);

  const onLogOut = async () => {
    await deleteToken();

    if (currentUser) {
      toast.show({
        title: "We hope to see you again soon",
        variant: "info",
      });
    }

    setCurrentUser(undefined);

    delete Axios.defaults.headers.common["Authorization"];

    navigation.navigate("/" as never);

    await fetchUser();
  };

  const contextData = useMemo(() => {
    return {
      currentUser,
      fetchUser,
      isPending,
      setIsPending,
      onLogOut,
      onClearUser,
    };
  }, [currentUser, isPending]);

  // eslint-disable-next-line react/react-in-jsx-scope
  return (
    <UserContext.Provider value={contextData}>{children}</UserContext.Provider>
  );
};

export default CurrentUserProvider;
