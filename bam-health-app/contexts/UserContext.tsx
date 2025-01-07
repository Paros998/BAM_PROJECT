import {
  Context,
  createContext,
  FC,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { useToast } from "@gluestack-ui/themed-native-base";
import { jwtDecode } from "jwt-decode";
import Axios from "axios";

import { UserContextInterface } from "@/interfaces/UserContextInterface";
import { UserModel } from "@/interfaces/Api";
import { JwtUser } from "@/interfaces/JwtUser";
import {
  createNavigationContainerRef,
  useNavigation,
} from "@react-navigation/native";
import { getRawToken } from "@/utils/getRawToken";
import * as LocalAuthentication from "expo-local-authentication";

import { deleteToken } from "@/utils/deleteToken";
import { AppState } from "react-native";

const UserContext = createContext<any>(undefined);

export const useCurrentUser = () =>
  useContext(UserContext as Context<UserContextInterface>);

interface ProviderProps {
  children: ReactNode;
}

const navigationRef = createNavigationContainerRef();

const CurrentUserProvider: FC<ProviderProps> = ({ children }) => {
  const appState = useRef(AppState.currentState);
  const navigation = useNavigation();
  const toast = useToast();

  const [currentUser, setCurrentUser] = useState<UserModel>();
  const [isPending, setIsPending] = useState(false);
  const [needsReAuthentication, setNeedsReAuthentication] = useState(false);
  const [isAuthenticationSupported, setIsAuthenticationSupported] =
    useState(false);

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
      const { data } = await Axios.get<UserModel>(`/users/${userId}`);
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
    const state = AppState.addEventListener("change", (nextState) => {
      if (
        appState.current.match(/inactive|background|unknown/) &&
        nextState === "active"
      ) {
        setNeedsReAuthentication(true);
      }
      appState.current = nextState;
    });

    LocalAuthentication.isEnrolledAsync().then((data) => {
      setIsAuthenticationSupported(data);
    });

    fetchUser().catch();

    return () => {
      state.remove();
    };
  }, [fetchUser, needsReAuthentication]);

  useEffect(() => {
    if (needsReAuthentication) {
      if (navigationRef.isReady()) {
        navigation.navigate("/" as never);
      }
    }
  }, [needsReAuthentication]);

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

  const tryToReauthenticate = async () => {
    if (!isAuthenticationSupported) {
      setNeedsReAuthentication(false);
      return;
    }

    LocalAuthentication.authenticateAsync().then(
      (r) => {
        setNeedsReAuthentication(!r.success);
      },
      () => {
        onLogOut();
      },
    );
  };

  const contextData = useMemo(() => {
    return {
      currentUser,
      fetchUser,
      needsReAuthentication,
      tryToReauthenticate,
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
