import React, { FC } from "react";
import { Center, Spinner } from "@gluestack-ui/themed-native-base";

interface CenteredSpinnerProps extends Spinner {
  isPending: unknown;
  wrapperProps?: ICenterProps;
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
