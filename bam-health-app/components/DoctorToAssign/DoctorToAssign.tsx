import React, { FC, useMemo, useState } from "react";
import { DoctorModel } from "@/interfaces/Api";
import {
  Box,
  Button,
  Heading,
  useToast,
  VStack,
} from "@gluestack-ui/themed-native-base";
import CenteredSpinner from "@/components/CenteredSpinner/CenteredSpinner";
import { useCurrentUser } from "@/contexts/UserContext";
import Axios from "axios";
import { useNavigation } from "@react-navigation/native";

type DoctorToAssignProps = {
  doctor: DoctorModel;
};

const DoctorToAssign: FC<DoctorToAssignProps> = ({ doctor }) => {
  const {
    age,
    doctorId,
    yearsOfExperience,
    specialization,
    fullName,
    assignedPatientIds,
  } = doctor;

  const { currentUser } = useCurrentUser();
  const toast = useToast();
  const navigate = useNavigation();

  const [isPending, setIsPending] = useState<boolean>(false);
  const isAlreadyAssigned = useMemo<boolean>(() => {
    if (!currentUser) {
      return true;
    }

    return assignedPatientIds.includes(currentUser.userId);
  }, [currentUser, assignedPatientIds]);

  const assignDoctor = async (doctorId: string) => {
    try {
      setIsPending(true);

      await Axios.post(
        `/patients/assign-doctor/${doctorId}/${currentUser?.userId}`,
      );

      toast.show({
        title: "Assigning doctor completed",
      });

      navigate.navigate("Home" as never);
    } catch (e: any) {
      toast.show({
        title: "Assigning doctor failed",
      });
    } finally {
      setIsPending(false);
    }
  };

  return (
    <Box
      mb={10}
      mx={2}
      backgroundColor="indigo.500"
      p={2}
      rounded="lg"
      borderColor={"light.50"}
      borderWidth={1}
    >
      <VStack alignItems={"center"} justifyContent={"space-around"}>
        <Heading mb={1} color="light.50">
          Doctor is {fullName} who specializes in {specialization}, {age} years
          old.
        </Heading>

        <Heading mb={1} color="light.50">
          Total experience: {yearsOfExperience}
        </Heading>

        <Button
          mt={3}
          disabled={isAlreadyAssigned || isPending}
          colorScheme={isAlreadyAssigned || isPending ? "dark" : "primary"}
          onPress={() => assignDoctor(doctorId)}
        >
          Assign Doctor
        </Button>

        <CenteredSpinner marginTop={2} isPending={isPending} />
      </VStack>
    </Box>
  );
};

export default DoctorToAssign;
