import React, { useMemo } from "react";
import { useFormikContext } from "formik";
import { AddPulseTestRequest } from "@/interfaces/Api";
import { FormControl, Input } from "@gluestack-ui/themed-native-base";
import SubmitButton from "@/components/SubmitButton/SubmitButton";

const PulseTestForm = () => {
  const { values, handleChange, errors } =
    useFormikContext<AddPulseTestRequest>();

  const isFormValid = useMemo<boolean>(() => {
    return !errors.beatsPerMinute;
  }, [errors, values]);

  return (
    <>
      <FormControl isRequired isInvalid={errors?.beatsPerMinute?.[0]}>
        <FormControl.Label _text={{ fontSize: "xl" }}>
          Beats per minute test: 1
        </FormControl.Label>
        <Input
          name="Beats per minute test:1"
          onChangeText={handleChange("beatsPerMinute[0]")}
          value={values.beatsPerMinute?.[0]}
          color="dark.800"
          backgroundColor="light.50"
          size="xl"
          placeholder="118... "
        />
        <FormControl.ErrorMessage>
          {errors?.beatsPerMinute?.[0]}
        </FormControl.ErrorMessage>
      </FormControl>

      <FormControl isRequired isInvalid={errors?.beatsPerMinute?.[1]}>
        <FormControl.Label _text={{ fontSize: "xl" }}>
          Beats per minute test: 2
        </FormControl.Label>
        <Input
          name="Beats per minute test:2"
          onChangeText={handleChange("beatsPerMinute[1]")}
          value={values.beatsPerMinute?.[1]}
          color="dark.800"
          backgroundColor="light.50"
          size="xl"
          placeholder="118... "
        />
        <FormControl.ErrorMessage>
          {errors?.beatsPerMinute?.[1]}
        </FormControl.ErrorMessage>
      </FormControl>

      <FormControl isRequired isInvalid={errors?.beatsPerMinute?.[2]}>
        <FormControl.Label _text={{ fontSize: "xl" }}>
          Beats per minute test: 3
        </FormControl.Label>
        <Input
          name="Beats per minute test:3"
          onChangeText={handleChange("beatsPerMinute[2]")}
          value={values.beatsPerMinute?.[2]}
          color="dark.800"
          backgroundColor="light.50"
          size="xl"
          placeholder="118... "
        />
        <FormControl.ErrorMessage>
          {errors?.beatsPerMinute?.[2]}
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

export default PulseTestForm;
