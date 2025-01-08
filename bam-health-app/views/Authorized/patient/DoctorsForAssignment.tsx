import React from "react";
import { useFetchData } from "@/hooks/useFetchData";
import { DoctorModel } from "@/interfaces/Api";
import Logo from "@/components/Logo/Logo";
import Header from "@/components/Header/Header";
import { View } from "@gluestack-ui/themed-native-base";
import { useCurrentUser } from "@/contexts/UserContext";
import CenteredSpinner from "@/components/CenteredSpinner/CenteredSpinner";

const DoctorsForAssignment = () => {
  const { currentUser, isPending, onClearUser } = useCurrentUser();

  const [doctors, , areDoctorsFetching] = useFetchData<DoctorModel>(
    `/doctors/for-assignments`,
  );

  if (!currentUser && isPending) {
    return <CenteredSpinner isPending={isPending} />;
  }

  if (!currentUser) {
    onClearUser();
    return;
  }

  return (
    <View
      height={"full"}
      pt={2}
      w="full"
      backgroundColor="dark.800"
      alignItems="center"
      justifyContent="flex-start"
    >
      <Logo marginBottom={10} />

      <Header username={currentUser.username} role={currentUser.role} />

      <>
      </>
    </View>
  );
};

export default DoctorsForAssignment;
