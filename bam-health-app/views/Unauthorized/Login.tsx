import {UserCredentials} from "@/interfaces/Api";
import {FC, useEffect} from "react";
import {Box, Heading, ScrollView, useToast,} from "@gluestack-ui/themed-native-base";
import {useCurrentUser} from "@/contexts/UserContext";
import axios from "axios";
import {putToken} from "@/utils/putToken";
import {Formik} from "formik";
import Logo from "@/components/Logo/Logo";
import * as Yup from "yup";
import LoginForm from "@/forms/LoginForm/LoginForm";
import * as ScreenCapture from "expo-screen-capture";
import {Platform} from "react-native";

const formikValues: UserCredentials = {
  username: "",
  password: "",
};

const validationSchema = Yup.object().shape({
  username: Yup.string()
      .required("Login is required")
      .min(8, "Login has to contain at least 8 characters"),
  password: Yup.string()
      .required("Password is required")
      .min(8, "Password has to contain at least 8 characters"),
});

const Login: FC = () => {
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
        if (
            process.env.EXPO_PUBLIC_ANTI_TAPJACKING_ENABLED === "true" &&
            Platform.OS === "android"
        ) {
          ScreenCapture.allowScreenCaptureAsync();
        }
      }
    };
  }, []);

  const toast = useToast();
  const currentUser = useCurrentUser();

  const handleLogin = async (values: UserCredentials) => {
    try {
      const response = await axios.post(`/auth/login`, values);

      if (response.status === 200) {
        const token = response.headers["authorization"];

        toast.show({
          title: "👍 Login successful.",
        });

        axios.defaults.headers.common["Authorization"] = token;
        await putToken(token);
        await currentUser?.fetchUser();
      }
    } catch (e: any) {
      toast.show({
        title: "👎 Couldn't log in.",
      });
    }
  };

  return (
      <ScrollView
          contentContainerStyle={{
            justifyContent: "flex-center",
          }}
          backgroundColor="dark.800"
          display="flex"
          flexDirection={"column"}
          height={"100%"}
          width={"100%"}
      >
        <Box>
          <Logo marginBottom={10}/>

          <Heading w={"5/6"} mx={"auto"} mb={1} color="light.50" fontSize={"2xl"}>
            LogIn
          </Heading>

          <Formik<UserCredentials>
              initialValues={formikValues}
              onSubmit={handleLogin}
              validationSchema={validationSchema}
          >
            <LoginForm/>
          </Formik>
        </Box>
      </ScrollView>
  );
};

export default Login;
