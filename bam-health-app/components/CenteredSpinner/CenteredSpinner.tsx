import React, { FC } from "react";
import { Center, Spinner } from "@gluestack-ui/themed-native-base";
import { ViewStyle } from "react-native/Libraries/StyleSheet/StyleSheetTypes";

interface CenteredSpinnerProps extends ViewStyle {
  isPending: unknown;
  wrapperProps?: ViewStyle;
}

const CenteredSpinner: FC<CenteredSpinnerProps> = ({
  isPending,
  wrapperProps,
  ...props
}) => {
  if (isPending) {
    return (
      <Center h="full" {...wrapperProps}>
        <Spinner {...props} />
      </Center>
    );
  }

  return null;
};

export default CenteredSpinner;
