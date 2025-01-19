import React, {FC, useEffect} from "react";
import Logo from "@/components/Logo/Logo";
import {useCurrentUser} from "@/contexts/UserContext";
import CenteredSpinner from "@/components/CenteredSpinner/CenteredSpinner";
import AssignedDoctor from "@/components/AssignedDoctor/AssignedDoctor";
import Header from "@/components/Header/Header";
import RecentTests from "@/components/RecentTests/RecentTests";
import {Button, ScrollView} from "@gluestack-ui/themed-native-base";
import {useNavigation} from "@react-navigation/native";
import * as ScreenCapture from "expo-screen-capture";
import {Platform} from "react-native";

const Patient: FC = () => {
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
  const navigation = useNavigation();

  if (!currentUser && isPending) {
    return <CenteredSpinner isPending={isPending}/>;
  }

  if (!currentUser) {
    onClearUser();
    return;
  }

  return (
      <ScrollView
          contentContainerStyle={{alignItems: "center"}}
          height={"full"}
          pt={2}
          w="full"
          backgroundColor="dark.800"
          display="flex"
      >
        <Logo marginBottom={10}/>

        <Header username={currentUser.username} role={currentUser.role}/>

        <AssignedDoctor
            patientId={currentUser.userId}
            marginTop={10}
            marginHorizontal={5}
        />

        <Button
            marginBottom={10}
            marginHorizontal={5}
            borderColor={"white"}
            borderWidth={1}
            colorScheme={"indigo"}
            fontSize={"2xl"}
            onPress={() => {
              navigation.navigate("TestManagement" as never);
            }}
        >
          Manage Tests
        </Button>

        <RecentTests patientId={currentUser.userId}/>
      </ScrollView>
  );
};

export default Patient;
