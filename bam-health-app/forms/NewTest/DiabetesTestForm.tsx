import React, { useMemo } from "react";
import { useFormikContext } from "formik";
import { AddDiabetesTestRequest } from "@/interfaces/Api";
import SubmitButton from "@/components/SubmitButton/SubmitButton";
import { FormControl, Input } from "@gluestack-ui/themed-native-base";

const DiabetesTestForm = () => {
  const { values, handleChange, errors } =
    useFormikContext<AddDiabetesTestRequest>();

  const isFormValid = useMemo<boolean>(() => {
    return !errors.diabetesLevelCases;
  }, [errors, values]);

  return (
    <>
      <FormControl isRequired isInvalid={errors?.diabetesLevelCases?.[0]}>
        <FormControl.Label _text={{ fontSize: "xl" }}>
          Sugar level test: 1
        </FormControl.Label>
        <Input
          name="Sugar level test:1"
          onChangeText={handleChange("diabetesLevelCases[0]")}
          value={values.diabetesLevelCases?.[0]}
          color="dark.800"
          backgroundColor="light.50"
          size="xl"
          placeholder="118... "
        />
        <FormControl.ErrorMessage>
          {errors?.diabetesLevelCases?.[0]}
        </FormControl.ErrorMessage>
      </FormControl>

      <FormControl isRequired isInvalid={errors?.diabetesLevelCases?.[1]}>
        <FormControl.Label _text={{ fontSize: "xl" }}>
          Sugar level test: 2
        </FormControl.Label>
        <Input
          name="Sugar level test:2"
          onChangeText={handleChange("diabetesLevelCases[1]")}
          value={values.diabetesLevelCases?.[1]}
          color="dark.800"
          backgroundColor="light.50"
          size="xl"
          placeholder="118... "
        />
        <FormControl.ErrorMessage>
          {errors?.diabetesLevelCases?.[1]}
        </FormControl.ErrorMessage>
      </FormControl>

      <FormControl isRequired isInvalid={errors?.diabetesLevelCases?.[2]}>
        <FormControl.Label _text={{ fontSize: "xl" }}>
          Sugar level test: 3
        </FormControl.Label>
        <Input
          name="Sugar level test:3"
          onChangeText={handleChange("diabetesLevelCases[2]")}
          value={values.diabetesLevelCases?.[2]}
          color="dark.800"
          backgroundColor="light.50"
          size="xl"
          placeholder="118... "
        />
        <FormControl.ErrorMessage>
          {errors?.diabetesLevelCases?.[2]}
        </FormControl.ErrorMessage>
      </FormControl>

      <SubmitButton
        title={"Add"}
        marginTop={5}
        borderCurve="circular"
        colorScheme={!isFormValid ? "light" : "success"}
        isFormValid={isFormValid}
        width="50%"
      ></SubmitButton>
    </>
  );
};

export default DiabetesTestForm;
