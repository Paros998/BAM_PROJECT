import React, {FC, useEffect} from "react";
import {useCurrentUser} from "@/contexts/UserContext";
import CenteredSpinner from "@/components/CenteredSpinner/CenteredSpinner";
import {useFetchData} from "@/hooks/useFetchData";
import {AssignedPatient} from "@/interfaces/Api";
import Logo from "@/components/Logo/Logo";
import Header from "@/components/Header/Header";
import {Heading, ScrollView, VStack} from "@gluestack-ui/themed-native-base";
import DoctorAssignedPatient from "@/components/AssignedPatient/DoctorAssignedPatient";
import * as ScreenCapture from "expo-screen-capture";
import {Platform} from "react-native";

const Doctor: FC = () => {
  useEffect(() => {
    if (
        process.env.EXPO_PUBLIC_ANTI_TAPJACKING_ENABLED === "true" &&
        Platform.OS === "android"
    ) {
      ScreenCapture.preventScreenCaptureAsync();
    }

    return () => {
      if (
          process.env.EXPO_PUBLIC_ANTI_TAPJACKING_ENABLED === "true" &&
          Platform.OS === "android"
      ) {
        ScreenCapture.allowScreenCaptureAsync();
      }
    };
  }, []);

  const {currentUser, isPending, onClearUser} = useCurrentUser();

  if (!currentUser && isPending) {
    return <CenteredSpinner isPending={isPending}/>;
  }

  if (!currentUser) {
    onClearUser();
    return;
  }

  const [assignedPatients, , isPendingAssignedPatients] = useFetchData<
      AssignedPatient[]
  >(`/doctors/${currentUser.userId}/assigned-patients`);

  if (isPendingAssignedPatients || !assignedPatients) {
    return (
        <ScrollView
            height={"full"}
            pt={2}
            w="full"
            display="flex"
            backgroundColor="dark.800"
            contentContainerStyle={{
              alignItems: "center",
            }}
        >
          <Logo marginBottom={10}/>

          <Header username={currentUser.username} role={currentUser.role}/>

          <CenteredSpinner isPending={isPending}/>
        </ScrollView>
    );
  }

  return (
      <ScrollView
          height={"full"}
          pt={2}
          w="full"
          display="flex"
          backgroundColor="dark.800"
          contentContainerStyle={{
            alignItems: "center",
          }}
      >
        <Logo marginBottom={10}/>

        <Header username={currentUser.username} role={currentUser.role}/>

        {assignedPatients.length === 0 && (
            <Heading mb={1} color="light.50">
              No patient assigned currently
            </Heading>
        )}

        {assignedPatients.length > 0 && (
            <VStack
                mt={5}
                alignItems={"center"}
                justifyContent={"space-around"}
                gap={1}
                width={"90%"}
                mx={"auto"}
            >
              <Heading mb={1} color="light.50">
                Assigned patients
              </Heading>

              {assignedPatients.map((patient, key) => (
                  <DoctorAssignedPatient key={key} patient={patient}/>
              ))}
            </VStack>
        )}
      </ScrollView>
  );
};

export default Doctor;
