import React, { useEffect, useMemo, useState } from "react";
import {
  Button,
  Text,
  useToast,
  View,
  VStack,
} from "@gluestack-ui/themed-native-base";
import Logo from "@/components/Logo/Logo";
import { useCurrentUser } from "@/contexts/UserContext";
import CenteredSpinner from "@/components/CenteredSpinner/CenteredSpinner";
import { useNavigation } from "@react-navigation/native";
import {
  AddBloodPressureTestRequest,
  AddDiabetesTestRequest,
  AddPulseTestRequest,
  TestType,
} from "@/interfaces/Api";
import { Modal } from "react-native";
import { mapTestType } from "@/components/RecentTests/RecentTests";
import Axios from "axios";
import { Formik } from "formik";
import PulseTestForm from "@/forms/NewTest/PulseTestForm";
import DiabetesTestForm from "@/forms/NewTest/DiabetesTestForm";
import BloodPressureTestForm from "@/forms/NewTest/BloodPressureTestForm";
import * as Yup from "yup";

const addPulseTestRequestInitialValues: AddPulseTestRequest = {
  beatsPerMinute: [1, 1, 1],
  patientId: "",
};

const addPulseTestRequestValidationSchema = Yup.object().shape({
  beatsPerMinute: Yup.array().of(
    Yup.number()
      .min(0, "Heartbeat cannot be lower than 0")
      .max(250, "Heartbeat cannot be higher than 250")
      .required("Heartbeat level is required"),
  ),
});

const addDiabetesTestRequestInitialValues: AddDiabetesTestRequest = {
  diabetesLevelCases: [1, 1, 1],
  patientId: "",
};

const addDiabetesTestRequestValidationSchema = Yup.object().shape({
  diabetesLevelCases: Yup.array().of(
    Yup.number()
      .min(0, "Sugar level cannot be lower than 0")
      .max(250, "Sugar level cannot be higher than 250")
      .required("Sugar level is required"),
  ),
});

const addBloodPressureTestRequestInitialValues: AddBloodPressureTestRequest = {
  bloodPressuresCases: [
    { bloodPressureTo: 0, bloodPressureOn: 0, testOrder: 1 },
    { bloodPressureTo: 0, bloodPressureOn: 0, testOrder: 2 },
    { bloodPressureTo: 0, bloodPressureOn: 0, testOrder: 3 },
  ],
  patientId: "",
};

const addBloodPressureTestValidationSchema = Yup.object().shape({
  bloodPressuresCases: Yup.array().of(
    Yup.object().shape({
      bloodPressureTo: Yup.number()
        .min(0, "Pressure level cannot be lower than 0")
        .max(250, "Pressure level cannot be higher than 250")
        .required("Pressure level is required"),
      bloodPressureOn: Yup.number()
        .min(0, "Pressure level cannot be lower than 0")
        .max(250, "Pressure level cannot be higher than 250")
        .required("Pressure level is required"),
    }),
  ),
});

const TestManagement = () => {
  const { currentUser, isPending, onClearUser } = useCurrentUser();
  const toast = useToast();
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const [testType, setTestType] = useState<TestType | null>(null);
  const navigation = useNavigation();

  useEffect(() => {
    if (testType === null) {
      setIsModalVisible(false);
    } else {
      setIsModalVisible(true);
    }
  }, [testType]);

  const endpoint = useMemo(() => {
    if (testType === "PULSE") {
      return "pulse";
    } else if (testType === "DIABETES") {
      return "diabetes";
    } else return "blood-pressure";
  }, [testType]);

  const onSubmit = async (
    testData:
      | AddPulseTestRequest
      | AddDiabetesTestRequest
      | AddBloodPressureTestRequest,
  ) => {
    setIsSubmitting(true);
    testData.patientId = currentUser?.userId as string;
    try {
      await Axios.post(`/patient-tests/${endpoint}`, testData);

      toast.show({
        title: "Test added successfully.",
      });

      setTestType(null);
    } catch (e: any) {
      toast.show({
        title: "Test addition failure, try again later.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!currentUser && isPending) {
    return <CenteredSpinner isPending={isPending} />;
  }

  if (!currentUser) {
    onClearUser();
    return;
  }

  return (
    <>
      <View
        height={"full"}
        pt={2}
        w="full"
        backgroundColor="dark.800"
        alignItems="center"
        justifyContent={"space-around"}
      >
        <Logo marginBottom={10} />

        <VStack
          padding={10}
          borderColor={"white"}
          borderWidth={1}
          borderRadius={5}
          backgroundColor="indigo.500"
          alignItems="center"
          justifyContent={"center"}
          gap={5}
        >
          <Button
            borderColor={"white"}
            borderWidth={1}
            colorScheme={"primary"}
            fontSize={"2xl"}
            onPress={() => setTestType("DIABETES")}
          >
            New diabetes (blood sugar) test
          </Button>

          <Button
            borderColor={"white"}
            borderWidth={1}
            colorScheme={"emerald"}
            fontSize={"2xl"}
            onPress={() => setTestType("PULSE")}
          >
            New pulse (heartbeat) test
          </Button>

          <Button
            borderColor={"white"}
            borderWidth={1}
            colorScheme={"dark"}
            fontSize={"2xl"}
            onPress={() => setTestType("BLOOD_PRESSURE")}
          >
            New blood pressure test
          </Button>
        </VStack>

        <Button
          colorScheme={"light"}
          onPress={() => {
            navigation.navigate("Home" as never);
          }}
        >
          Go Back
        </Button>
      </View>

      <Modal
        animationType="slide"
        transparent={false}
        visible={isModalVisible}
        onRequestClose={() => {
          setIsModalVisible(!isModalVisible);
        }}
      >
        <VStack
          alignItems="center"
          justifyContent={"space-around"}
          gap={5}
          height={"100%"}
          width={"100%"}
          backgroundColor="dark.800"
        >
          <Logo />

          <VStack
            alignItems="center"
            justifyContent={"center"}
            gap={5}
            padding={2}
            borderRadius={10}
            backgroundColor="indigo.500"
            w={"90%"}
          >
            <Text color="light.50" fontSize={"2xl"}>
              {mapTestType(testType as TestType)}
            </Text>

            {testType === "PULSE" && (
              <Formik
                initialValues={addPulseTestRequestInitialValues}
                validationSchema={addPulseTestRequestValidationSchema}
                onSubmit={onSubmit}
              >
                <PulseTestForm />
              </Formik>
            )}

            {testType === "DIABETES" && (
              <Formik
                initialValues={addDiabetesTestRequestInitialValues}
                validationSchema={addDiabetesTestRequestValidationSchema}
                onSubmit={onSubmit}
              >
                <DiabetesTestForm />
              </Formik>
            )}

            {testType === "BLOOD_PRESSURE" && (
              <Formik
                initialValues={addBloodPressureTestRequestInitialValues}
                validationSchema={addBloodPressureTestValidationSchema}
                onSubmit={onSubmit}
              >
                <BloodPressureTestForm />
              </Formik>
            )}
          </VStack>

          <Button disabled={isSubmitting} onPress={() => setTestType(null)}>
            Discard
          </Button>
        </VStack>
      </Modal>
    </>
  );
};

export default TestManagement;
