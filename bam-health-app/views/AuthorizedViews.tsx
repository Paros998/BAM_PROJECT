import React from "react";
import { useCurrentUser } from "@/contexts/UserContext";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import DoctorsForAssignment from "@/views/Authorized/patient/DoctorsForAssignment";
import Patient from "@/views/Authorized/patient/Patient";
import Doctor from "@/views/Authorized/doctor/Doctor";
import Admin from "@/views/Authorized/admin/Admin";

const Stack = createNativeStackNavigator();

const AuthorizedViews = () => {
  const { currentUser } = useCurrentUser();

  if (!currentUser) {
    return;
  }

  const role = currentUser.role;

  if (role === "PATIENT") {
    return (
      <Stack.Navigator
        initialRouteName="Home"
        screenOptions={{ headerShown: false }}
      >
        <Stack.Screen name="Home" component={Patient} />

        <Stack.Screen name="DoctorToAssign" component={DoctorsForAssignment} />
      </Stack.Navigator>
    );
  }

  if (role === "DOCTOR") {
    return (
      <Stack.Navigator
        initialRouteName="Home"
        screenOptions={{ headerShown: false }}
      >
        <Stack.Screen name="Home" component={Doctor} />
      </Stack.Navigator>
    );
  }

  return (
    <Stack.Navigator
      initialRouteName="Home"
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name="Home" component={Admin} />
    </Stack.Navigator>
  );
};

export default AuthorizedViews;
