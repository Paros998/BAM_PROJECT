import React, { FC } from "react";
import CenteredSpinner from "../CenteredSpinner/CenteredSpinner";
import { View } from "@gluestack-ui/themed-native-base";
import { ViewStyle } from "react-native/Libraries/StyleSheet/StyleSheetTypes";

interface ScreenPendingProps extends ViewStyle {
  isPending: boolean;
}

const ScreenPending: FC<ScreenPendingProps> = ({ isPending, ...props }) => {
  return (
    <View h="full" backgroundColor={"dark.700"}>
      <CenteredSpinner
        isPending={isPending}
        backgroundColor="primary.300"
        {...props}
      />
    </View>
  );
};

export default ScreenPending;
