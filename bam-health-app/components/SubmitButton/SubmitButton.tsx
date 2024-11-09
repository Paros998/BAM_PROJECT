import React, { FC } from "react";
import { useFormikContext } from "formik";
import { Button, IButtonProps, Spinner } from "native-base";

type SubmitButtonProps = IButtonProps & { title: string };

const SubmitButton: FC<SubmitButtonProps> = ({ title, ...props }) => {
  const { isSubmitting, handleSubmit } = useFormikContext();
  return (
    <Button {...props} disabled={isSubmitting} onPress={() => handleSubmit()}>
      {title}
      {isSubmitting && <Spinner size="sm" mr={2} />}
    </Button>
  );
};

export default SubmitButton;
