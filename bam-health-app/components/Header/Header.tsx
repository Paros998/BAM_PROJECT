import React, { FC, useMemo } from "react";
import { ViewStyle } from "react-native/Libraries/StyleSheet/StyleSheetTypes";
import { Box } from "@gluestack-ui/themed-native-base";
import { UserRole } from "@/interfaces/Api";

type HeaderProps = ViewStyle & {
  username: string;
  role: UserRole;
};

const Header: FC<HeaderProps> = ({ username, role, ...props }) => {
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
      top={"15%"}
      backgroundColor="indigo.500"
      color={"dark"}
      p={2}
      rounded="lg"
      borderColor={"white"}
      borderWidth={1}
      position={"absolute"}
      justifyContent={"start"}
      w={"90%"}
      {...props}
    >
      {welcomeMsg}
    </Box>
  );
};

export default Header;
