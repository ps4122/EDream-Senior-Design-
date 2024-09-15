import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import UserProfile from "../pages/UserProfile";
import LoginForm from "../pages/LoginForm";
import Friends from "../pages/FriendsDemo";

const Stack = createStackNavigator();

export default function ProfileStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="UserProfile" component={UserProfile} />
      <Stack.Screen name="LoginForm" component={LoginForm} />
      <Stack.Screen name="Friends" component={Friends} />
    </Stack.Navigator>
  );
}
