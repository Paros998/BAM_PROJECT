import React, { FC } from "react";
import { useFetchData } from "@/hooks/useFetchData";
import { AssignedDoctorResponse } from "@/interfaces/Api";
import CenteredSpinner from "@/components/CenteredSpinner/CenteredSpinner";
import { Box, Button, Heading, VStack } from "@gluestack-ui/themed-native-base";
import { ViewStyle } from "react-native/Libraries/StyleSheet/StyleSheetTypes";

type AssignedDoctorProps = ViewStyle & {
  patientId: string;
};

const AssignedDoctor: FC<AssignedDoctorProps> = ({ patientId, ...props }) => {
  const [response, , isPending] = useFetchData<AssignedDoctorResponse>(
    `/patients/assigned-doctor/${patientId}`,
  );

  if (isPending) {
    return <CenteredSpinner isPending={isPending} />;
  }

  if (!response?.doctor) {
    return (
      <Box
        mb={10}
        backgroundColor="light.50"
        p={2}
        rounded="lg"
        borderColor={"indigo"}
        borderWidth={1}
        {...props}
      >
        <VStack alignItems={"center"} justifyContent={"space-around"}>
          <Heading color="dark.800" fontSize={"1xl"}>
            No doctor is currently assigned.
          </Heading>

          <Button mt={3} colorScheme={"indigo"}>
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
      {...props}
    >
      <VStack alignItems={"center"} justifyContent={"space-around"}>
        <Heading mb={1} color="dark.800" fontSize={"1xl"}>
          Assigned doctor is {fullName} who specializes in {specialization},{" "}
          {age} years old.
        </Heading>

        <Heading mb={1} color="dark.800" fontSize={"1xl"}>
          Total experience: {yearsOfExperience}
        </Heading>

        <Button mt={3} colorScheme={"light.50"}>
          Change doctor
        </Button>
      </VStack>
    </Box>
  );
};

export default AssignedDoctor;
