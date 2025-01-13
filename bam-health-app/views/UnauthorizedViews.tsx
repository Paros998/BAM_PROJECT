import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Login from "@/views/Unauthorized/Login";

const Stack = createNativeStackNavigator();

const UnauthorizedViews = () => {
  return (
    <Stack.Navigator
      initialRouteName="Login"
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name="Login" component={Login} />
    </Stack.Navigator>
  );
};

export default UnauthorizedViews;
