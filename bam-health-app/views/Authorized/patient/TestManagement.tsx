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

          <VStack alignItems="center" justifyContent={"center"} gap={5}>
            <Text color="light.50" fontSize={"2xl"}>
              {mapTestType(testType as TestType)}
            </Text>

            {/*TODO forms*/}
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
