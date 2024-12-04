import React from "react";
import { useCurrentUser } from "@/contexts/UserContext";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Doctor from "@/views/Authorized/Doctor";
import Patient from "@/views/Authorized/Patient";
import Admin from "@/views/Authorized/Admin";

const Stack = createNativeStackNavigator();

const AuthorizedViews = () => {
  const { currentUser } = useCurrentUser();

  if (!currentUser) {
    return;
  }

  const role = currentUser.role;

  if (role === "PATIENT") {
    return (
      <NavigationContainer independent={true}>
        <Stack.Navigator
          initialRouteName="Home"
          screenOptions={{ headerShown: false }}
        >
          <Stack.Screen name="Home" component={Patient} />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }

  if (role === "DOCTOR") {
    return (
      <NavigationContainer independent={true}>
        <Stack.Navigator
          initialRouteName="Home"
          screenOptions={{ headerShown: false }}
        >
          <Stack.Screen name="Home" component={Doctor} />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }

  return (
    <NavigationContainer independent={true}>
      <Stack.Navigator
        initialRouteName="Home"
        screenOptions={{ headerShown: false }}
      >
        <Stack.Screen name="Home" component={Admin} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AuthorizedViews;
