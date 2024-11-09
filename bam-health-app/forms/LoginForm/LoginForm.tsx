import React from "react";
import { FormControl, Input, View, VStack } from "native-base";
import { useFormikContext } from "formik";
import { UserCredentials } from "@/interfaces/Api";
import SubmitButton from "@/components/SubmitButton/SubmitButton";

const LoginForm = () => {
  const { values, handleChange, handleBlur, handleSubmit } =
    useFormikContext<UserCredentials>();

  return (
    <View w={"full"} alignItems={"center"}>
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
        <FormControl isRequired>
          <FormControl.Label _text={{ fontSize: "xl" }}>
            Użytkownik
          </FormControl.Label>
          <Input
            onChangeText={handleChange("username")}
            value={values.username}
            color="dark.800"
            backgroundColor="light.50"
            size="xl"
            placeholder="Jan... "
          />
        </FormControl>

        <FormControl mt={5} isRequired>
          <FormControl.Label _text={{ fontSize: "xl" }}>
            Hasło
          </FormControl.Label>
          <Input
            onChangeText={handleChange("password")}
            value={values.password}
            onBlur={handleBlur("password")}
            type={"password"}
            color="dark.800"
            backgroundColor="light.50"
            size="xl"
            placeholder="Jan@123_#21..."
          />
        </FormControl>
      </VStack>
      <View w={"full"} alignItems={"center"}>
        <SubmitButton
          title={"Zaloguj"}
          mt={5}
          rounded="full"
          colorScheme={"indigo"}
          width="1/2"
        ></SubmitButton>
      </View>
    </View>
  );
};

export default LoginForm;
