import React from "react";
import Logo from "@/components/Logo/Logo";
import { Text, View, VStack } from "@gluestack-ui/themed-native-base";
import { ErrorIcon } from "@gluestack-ui/themed-native-base/build/components/FormControl/styled-components";

const AccessDenied = () => {
  return (
    <View
      height={"full"}
      pt={2}
      w="full"
      backgroundColor="dark.800"
      alignItems={"center"}
      justifyContent={"start"}
    >
      <Logo marginBottom={10} />

      <VStack alignItems={"center"} justifyContent={"center"}>
        <ErrorIcon size={"6xl"} color={"danger.500"} />

        <Text fontSize={"2xl"} mx={5} color={"danger.500"}>
          Access to app denied due to security reasons, close other applications
          that might interfere with current one.
        </Text>
      </VStack>
    </View>
  );
};

export default AccessDenied;
