import React, { FC, useMemo } from "react";
import { ViewStyle } from "react-native/Libraries/StyleSheet/StyleSheetTypes";
import { Box, Button, VStack } from "@gluestack-ui/themed-native-base";
import { UserRole } from "@/interfaces/Api";
import { useCurrentUser } from "@/contexts/UserContext";

type HeaderProps = ViewStyle & {
  username: string;
  role: UserRole;
};

const Header: FC<HeaderProps> = ({ username, role, ...props }) => {
  const { onLogOut } = useCurrentUser();

  const welcomeMsg = useMemo<string>(() => {
    switch (role) {
      case "PATIENT":
        return `Welcome ${username}, we hope you feel well today!`;
      case "DOCTOR":
        return `Hello doctor ${username}, don't forget to check on your patients!`;
      case "ADMIN":
        return `Hello administrator ${username}!`;
    }
  }, [role, username]);

  return (
    <Box
      backgroundColor="indigo.500"
      color="light.50"
      p={2}
      rounded="lg"
      borderColor={"white"}
      borderWidth={1}
      alignItems={"center"}
      justifyContent={"center"}
      w={"90%"}
      margin={"auto"}
      {...props}
    >
      <VStack alignItems={"center"} justifyContent={"space-around"} gap={2}>
        {welcomeMsg}
        <Button variant={"danger"} onPress={() => onLogOut()}>
          Logout
        </Button>
      </VStack>
    </Box>
  );
};

export default Header;
