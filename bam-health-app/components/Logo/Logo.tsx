import React, { FC } from "react";
import { Box, HStack, Image, Text } from "@gluestack-ui/themed-native-base";
import { ViewStyle } from "react-native/Libraries/StyleSheet/StyleSheetTypes";

const img = require("@/assets/images/favicon.png");

const Logo: FC<ViewStyle> = (props) => {
  return (
    <Box {...props}>
      <HStack alignItems={"center"}>
        <Image source={img} alt="logo" w="12" h="12" />

        <Text color="dark.50" ml={2} fontSize={"2xl"}>
          Platinum Health
        </Text>
      </HStack>
    </Box>
  );
};

export default Logo;
