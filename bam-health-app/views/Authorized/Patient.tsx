import React, { FC } from "react";
import Logo from "@/components/Logo/Logo";
import { useCurrentUser } from "@/contexts/UserContext";
import CenteredSpinner from "@/components/CenteredSpinner/CenteredSpinner";
import AssignedDoctor from "@/components/AssignedDoctor/AssignedDoctor";
import Header from "@/components/Header/Header";
import RecentTests from "@/components/RecentTests/RecentTests";
import { View } from "@gluestack-ui/themed-native-base";

const Patient: FC = () => {
  const { currentUser, isPending, onClearUser } = useCurrentUser();

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

      <AssignedDoctor
        patientId={currentUser.userId}
        marginTop={5}
        marginBottom={10}
      />

      <RecentTests patientId={currentUser.userId} />
    </View>
  );
};

export default Patient;
