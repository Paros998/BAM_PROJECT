import { UserCredentials } from "@/interfaces/Api";
import { FC } from "react";
import { Heading, useToast, View } from "@gluestack-ui/themed-native-base";
import { useCurrentUser } from "@/contexts/UserContext";
import axios from "axios";
import { putToken } from "@/utils/putToken";
import { Formik } from "formik";
import Logo from "@/components/Logo/Logo";
import * as Yup from "yup";
import LoginForm from "@/forms/LoginForm/LoginForm";

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
    <View
      height={"full"}
      w="full"
      backgroundColor="dark.800"
      alignItems="center"
      justifyContent="center"
    >
      <Logo top="5%" position={"absolute"} />

      <Heading mt={"1/6"} mb={1} color="light.50" fontSize={"2xl"}>
        LogIn
      </Heading>

      <Formik<UserCredentials>
        initialValues={formikValues}
        onSubmit={handleLogin}
        validationSchema={validationSchema}
      >
        <LoginForm />
      </Formik>
    </View>
  );
};

export default Login;
