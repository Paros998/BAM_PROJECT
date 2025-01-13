import React, { useMemo } from "react";
import {
  FormControl,
  Input,
  View,
  VStack,
} from "@gluestack-ui/themed-native-base";
import { useFormikContext } from "formik";
import { UserCredentials } from "@/interfaces/Api";
import SubmitButton from "@/components/SubmitButton/SubmitButton";

const LoginForm = () => {
  const { values, handleChange, handleBlur, errors } =
    useFormikContext<UserCredentials>();

  const isFormValid = useMemo<boolean>(() => {
    return !errors.password && !errors.username;
  }, [errors]);

  return (
    <View w={"full"} height={"full"} alignItems={"center"}>
      <VStack
        mt={3}
        backgroundColor="indigo.700"
        w={"5/6"}
        rounded={"xl"}
        p={2}
        pt={5}
        pb={5}
        justifyContent={"center"}
        space={4}
      >
        <FormControl isRequired isInvalid={errors?.username}>
          <FormControl.Label _text={{ fontSize: "xl" }}>
            Username
          </FormControl.Label>
          <Input
            name="username"
            onChangeText={handleChange("username")}
            value={values.username}
            color="dark.800"
            backgroundColor="light.50"
            size="xl"
            placeholder="User... "
          />
          <FormControl.ErrorMessage>
            {errors?.username}
          </FormControl.ErrorMessage>
        </FormControl>

        <FormControl mt={5} isRequired isInvalid={errors?.password}>
          <FormControl.Label _text={{ fontSize: "xl" }}>
            Password
          </FormControl.Label>
          <Input
            name="password"
            onChangeText={handleChange("password")}
            value={values.password}
            onBlur={handleBlur("password")}
            type={"password"}
            color="dark.800"
            backgroundColor="light.50"
            size="xl"
            placeholder="Pass@123_#21..."
          />
          <FormControl.ErrorMessage>
            {errors?.password}
          </FormControl.ErrorMessage>
        </FormControl>
      </VStack>
      <View w={"full"} alignItems={"center"}>
        <SubmitButton
          title={"Log In"}
          marginTop={5}
          borderCurve="circular"
          colorScheme={!isFormValid ? "light" : "indigo"}
          isFormValid={isFormValid}
          width="50%"
        ></SubmitButton>
      </View>
    </View>
  );
};

export default LoginForm;
