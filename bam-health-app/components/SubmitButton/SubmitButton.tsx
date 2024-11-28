import React, { FC } from "react";
import { useFormikContext } from "formik";
import { StyleProps } from "react-native-reanimated";
import { IButtonProps } from "@gluestack-ui/button/lib/types";
import { Button } from "@gluestack-ui/themed-native-base";

type SubmitButtonProps = IButtonProps & StyleProps & { title: string };

const SubmitButton: FC<SubmitButtonProps> = ({ title, ...props }) => {
  const { isSubmitting, handleSubmit } = useFormikContext();

  return (
    <Button loading={isSubmitting} onPress={handleSubmit} {...props}>
      {title}
      {/*{isSubmitting && <Spinner size="sm" mr={2} />}*/}
    </Button>
  );
};

export default SubmitButton;
