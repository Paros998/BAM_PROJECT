import React, { useMemo } from "react";
import { FormikErrors, useFormikContext } from "formik";
import { AddBloodPressureTestRequest, BloodPressure } from "@/interfaces/Api";
import { FormControl, Input, VStack } from "@gluestack-ui/themed-native-base";
import SubmitButton from "@/components/SubmitButton/SubmitButton";

const BloodPressureTestForm = () => {
  const { values, handleChange, errors } =
    useFormikContext<AddBloodPressureTestRequest>();

  const isFormValid = useMemo<boolean>(() => {
    return !errors.bloodPressuresCases;
  }, [errors]);

  return (
    <>
      <FormControl isRequired isInvalid={errors?.bloodPressuresCases?.[0]}>
        <VStack gap={1}>
          <FormControl.Label _text={{ fontSize: "xl" }}>
            Blood pressure On: 1
          </FormControl.Label>
          <Input
            name="Blood pressure On: 1"
            onChangeText={handleChange(
              "bloodPressuresCases[0].bloodPressureOn",
            )}
            value={values.bloodPressuresCases?.[0].bloodPressureOn}
            color="dark.800"
            backgroundColor="light.50"
            size="xl"
            placeholder="118... "
          />
          <FormControl.ErrorMessage>
            {
              (
                errors?.bloodPressuresCases as FormikErrors<BloodPressure>[]
              )?.[0]?.bloodPressureOn
            }
          </FormControl.ErrorMessage>

          <FormControl.Label _text={{ fontSize: "xl" }}>
            Blood pressure To: 1
          </FormControl.Label>
          <Input
            name="Blood pressure To: 1"
            onChangeText={handleChange(
              "bloodPressuresCases[0].bloodPressureTo",
            )}
            value={values.bloodPressuresCases?.[0].bloodPressureTo}
            color="dark.800"
            backgroundColor="light.50"
            size="xl"
            placeholder="118... "
          />
        </VStack>
        <FormControl.ErrorMessage>
          {
            (errors?.bloodPressuresCases as FormikErrors<BloodPressure>[])?.[0]
              ?.bloodPressureTo
          }
        </FormControl.ErrorMessage>
      </FormControl>

      <FormControl isRequired isInvalid={errors?.bloodPressuresCases?.[1]}>
        <VStack gap={1}>
          <FormControl.Label _text={{ fontSize: "xl" }}>
            Blood pressure On: 2
          </FormControl.Label>
          <Input
            name="Blood pressure On: 2"
            onChangeText={handleChange(
              "bloodPressuresCases[1].bloodPressureOn",
            )}
            value={values.bloodPressuresCases?.[1].bloodPressureOn}
            color="dark.800"
            backgroundColor="light.50"
            size="xl"
            placeholder="118... "
          />
          <FormControl.ErrorMessage>
            {
              (
                errors?.bloodPressuresCases as FormikErrors<BloodPressure>[]
              )?.[1]?.bloodPressureOn
            }
          </FormControl.ErrorMessage>

          <FormControl.Label _text={{ fontSize: "xl" }}>
            Blood pressure To: 2
          </FormControl.Label>
          <Input
            name="Blood pressure To: 2"
            onChangeText={handleChange(
              "bloodPressuresCases[1].bloodPressureTo",
            )}
            value={values.bloodPressuresCases?.[1].bloodPressureTo}
            color="dark.800"
            backgroundColor="light.50"
            size="xl"
            placeholder="118... "
          />
        </VStack>
        <FormControl.ErrorMessage>
          {
            (errors?.bloodPressuresCases as FormikErrors<BloodPressure>[])?.[1]
              ?.bloodPressureTo
          }
        </FormControl.ErrorMessage>
      </FormControl>

      <FormControl isRequired isInvalid={errors?.bloodPressuresCases?.[2]}>
        <VStack gap={1}>
          <FormControl.Label _text={{ fontSize: "xl" }}>
            Blood pressure On: 3
          </FormControl.Label>
          <Input
            name="Blood pressure On: 3"
            onChangeText={handleChange(
              "bloodPressuresCases[2].bloodPressureOn",
            )}
            value={values.bloodPressuresCases?.[2].bloodPressureOn}
            color="dark.800"
            backgroundColor="light.50"
            size="xl"
            placeholder="118... "
          />
          <FormControl.ErrorMessage>
            {
              (
                errors?.bloodPressuresCases as FormikErrors<BloodPressure>[]
              )?.[2]?.bloodPressureOn
            }
          </FormControl.ErrorMessage>

          <FormControl.Label _text={{ fontSize: "xl" }}>
            Blood pressure To: 3
          </FormControl.Label>
          <Input
            name="Blood pressure To: 3"
            onChangeText={handleChange(
              "bloodPressuresCases[2].bloodPressureTo",
            )}
            value={values.bloodPressuresCases?.[2].bloodPressureTo}
            color="dark.800"
            backgroundColor="light.50"
            size="xl"
            placeholder="118... "
          />
        </VStack>
        <FormControl.ErrorMessage>
          {
            (errors?.bloodPressuresCases as FormikErrors<BloodPressure>[])?.[2]
              ?.bloodPressureTo
          }
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

export default BloodPressureTestForm;
