import React from "react";
import { useFetchData } from "@/hooks/useFetchData";
import { DoctorModel } from "@/interfaces/Api";
import Logo from "@/components/Logo/Logo";
import {
  Box,
  Button,
  ScrollView,
  Text,
  VStack,
} from "@gluestack-ui/themed-native-base";
import { useCurrentUser } from "@/contexts/UserContext";
import CenteredSpinner from "@/components/CenteredSpinner/CenteredSpinner";
import { useNavigation } from "@react-navigation/native";
import DoctorToAssign from "@/components/DoctorToAssign/DoctorToAssign";

const DoctorsForAssignment = () => {
  const navigation = useNavigation();
  const { currentUser, isPending, onClearUser } = useCurrentUser();

  const [doctors, , areDoctorsFetching] = useFetchData<DoctorModel[]>(
    `/doctors/for-assignment`,
  );

  if (!currentUser && isPending) {
    return <CenteredSpinner isPending={isPending} />;
  }

  if (!currentUser) {
    onClearUser();
    return;
  }

  if (areDoctorsFetching) {
    return (
      <ScrollView
        height={"full"}
        width="full"
        pt={2}
        backgroundColor="dark.800"
        alignItems="center"
      >
        <Logo marginBottom={10} />

        <CenteredSpinner isPending={areDoctorsFetching} />
      </ScrollView>
    );
  }

  if (!doctors || doctors.length === 0) {
    return (
      <ScrollView
        height={"full"}
        pt={2}
        w="full"
        backgroundColor="dark.800"
        alignItems="center"
      >
        <Logo marginBottom={10} />

        <Text>There are no free doctors currently available</Text>

        <Button
          mt={3}
          colorScheme={"light"}
          onPress={() => {
            navigation.navigate("Home" as never);
          }}
        >
          Go Back
        </Button>
      </ScrollView>
    );
  }

  return (
    <>
      <ScrollView
        height={"full"}
        pt={2}
        w="full"
        backgroundColor="dark.800"
        alignItems="center"
        justifyContent="flex-start"
      >
        <Logo marginBottom={10} />

        <Text mx={"auto"} fontSize={"2xl"}>
          Available doctors
        </Text>

        <Box mt={5}>
          <VStack>
            {doctors.map((doctor, key) => (
              <DoctorToAssign key={key} doctor={doctor} />
            ))}
          </VStack>
        </Box>
      </ScrollView>
      <Button
        position={"sticky"}
        w={"100%"}
        bottom={0}
        colorScheme={"info"}
        onPress={() => {
          navigation.navigate("Home" as never);
        }}
      >
        Go Back
      </Button>
    </>
  );
};

export default DoctorsForAssignment;
