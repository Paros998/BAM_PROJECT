import React, { FC } from "react";
import { Center, ICenterProps, ISpinnerProps, Spinner } from 'native-base';

interface CenteredSpinnerProps extends ISpinnerProps {
  isPending: unknown;
  wrapperProps?: ICenterProps;
}

const CenteredSpinner: FC<CenteredSpinnerProps> = ({ isPending, wrapperProps, ...props }) => {
  if (isPending) {
    return (
      <Center h='full' {...wrapperProps}>
        <Spinner {...props} />
      </Center>
    );
  }

  return null;
};

export default CenteredSpinner;
