import React, { FC } from 'react';
import CenteredSpinner from "../CenteredSpinner/CenteredSpinner";
import { ISpinnerProps, View } from "native-base";

interface ScreenPendingProps extends ISpinnerProps {
  isPending: boolean;
}

const ScreenPending: FC<ScreenPendingProps> = ({ isPending, ...props }) => {
  return (
    <View h='full'>
      <CenteredSpinner
        isPending={isPending}
        color='primary.500'
        size='lg'
        {...props}
      />
    </View>
  );
};

export default ScreenPending;
