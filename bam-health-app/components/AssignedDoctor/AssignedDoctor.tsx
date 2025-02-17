import React, { FC, useEffect } from "react";
import { useFetchData } from "@/hooks/useFetchData";
import { AssignedDoctorResponse } from "@/interfaces/Api";
import CenteredSpinner from "@/components/CenteredSpinner/CenteredSpinner";
import { Box, Button, Heading, VStack } from "@gluestack-ui/themed-native-base";
import { ViewStyle } from "react-native/Libraries/StyleSheet/StyleSheetTypes";
import { useNavigation } from "@react-navigation/native";
import { noop } from "@babel/types";

type AssignedDoctorProps = ViewStyle & {
  patientId: string;
};

type AssignedDoctorRouteParams = {
  shouldReFetchDoctor: boolean;
};

const AssignedDoctor: FC<AssignedDoctorProps> = ({ patientId, ...props }) => {
  const navigation = useNavigation();

  const [response, getAssignedDoctor, isPending] =
    useFetchData<AssignedDoctorResponse>(
      `/patients/assigned-doctor/${patientId}`,
    );

  const routeParams = navigation.getState()?.routes[0]
    ?.params as AssignedDoctorRouteParams;

  useEffect(() => {
    if (routeParams?.shouldReFetchDoctor) {
      getAssignedDoctor().then(noop).catch(noop);
    }
  }, [routeParams]);

  if (isPending) {
    return <CenteredSpinner isPending={isPending} />;
  }

  if (!response?.doctor) {
    return (
      <Box
        mb={10}
        backgroundColor="indigo.500"
        p={2}
        rounded="lg"
        borderColor={"indigo"}
        borderWidth={1}
        color="light.50"
        {...props}
      >
        <VStack alignItems={"center"} justifyContent={"space-around"}>
          <Heading>No doctor is currently assigned.</Heading>

          <Button
            mt={3}
            colorScheme={"indigo"}
            onPress={() => {
              navigation.navigate("DoctorToAssign" as never);
            }}
          >
            Find one
          </Button>
        </VStack>
      </Box>
    );
  }

  const { fullName, age, specialization, yearsOfExperience } = response.doctor;
  return (
    <Box
      mb={10}
      backgroundColor="indigo.500"
      p={2}
      rounded="lg"
      borderColor={"light.50"}
      borderWidth={1}
      color="light.50"
      {...props}
    >
      <VStack alignItems={"center"} justifyContent={"space-around"}>
        <Heading mb={1}>
          Assigned doctor is {fullName} who specializes in {specialization},{" "}
          {age} years old.
        </Heading>

        <Heading mb={1}>
          Total experience: {yearsOfExperience}
          {yearsOfExperience === 1 ? "yr" : "yrs"}
        </Heading>

        <Button
          mt={3}
          colorScheme={"rose"}
          onPress={() => {
            navigation.navigate("DoctorToAssign" as never);
          }}
        >
          Change doctor
        </Button>
      </VStack>
    </Box>
  );
};

export default AssignedDoctor;
