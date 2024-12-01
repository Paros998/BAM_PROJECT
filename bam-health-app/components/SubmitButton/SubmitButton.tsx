import React, { FC } from "react";
import { useFormikContext } from "formik";
import { Button } from "@gluestack-ui/themed-native-base";
import { StyleProps } from "react-native-reanimated/src/reanimated2/commonTypes";

type SubmitButtonProps = StyleProps & { title: string; isFormValid: boolean };

const SubmitButton: FC<SubmitButtonProps> = ({
  title,
  isFormValid,
  ...props
}) => {
  const { isSubmitting, handleSubmit } = useFormikContext();

  return (
    <Button
      loading={isSubmitting}
      disabled={!isFormValid}
      onPress={handleSubmit}
      {...props}
    >
      {title}
      {/*{isSubmitting && <Spinner size="sm" mr={2} />}*/}
    </Button>
  );
};

export default SubmitButton;
