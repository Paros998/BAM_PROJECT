import { UserCredentials } from "@/interfaces/Api";
import { FC } from "react";
import { Heading, useToast, View } from "native-base";
import { useCurrentUser } from "@/contexts/UserContext";
import axios from "axios";
import { appendUrlSearchParams } from "@/utils/appendUrlSearchParams";
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
    .required("Login jest wymagany")
    .min(6, "Login musi zawierać co najmniej 6 znaków"),
  password: Yup.string()
    .required("Hasło jest wymagane")
    .min(6, "Hasło musi zawierać co najmniej 6 znaków"),
});

const Login: FC = () => {
  const toast = useToast();
  const currentUser = useCurrentUser();

  const handleLogin = async (values: UserCredentials) => {
    console.log(values);

    const loginParams = appendUrlSearchParams(values);

    try {
      const response = await axios.post(`/auth/login`, loginParams);

      if (response.status === 200) {
        const token = response.headers["authorization"];

        toast.show({
          title: "👍 Sukces logowania",
          variant: "success",
        });

        axios.defaults.headers.common["Authorization"] = token;
        await putToken(token);
        await currentUser?.fetchUser();
      }
    } catch (e: any) {
      toast.show({
        title: "👎 Nie udało się zalogować",
        variant: "error",
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
      <Logo top="10" position={"absolute"} />

      <Heading mt={"1/6"} mb={1} color="light.50" fontSize={"2xl"}>
        Logowanie
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
