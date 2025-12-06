import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "../screens/HomeScreen";
import CreateChallengesScreen from "../screens/CreateChallengesScreen";
import DetailsScreen from "../screens/DetailsScreen";

const Stack = createNativeStackNavigator();

export default function StackNavigator() {
  return (
    <Stack.Navigator
      initialRouteName="Home"
      screenOptions={{
        headerStyle: { backgroundColor: "#0f172a" },
        headerTintColor: "#ffffff",
      }}
    >
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={{ title: "Challenges" }}
      />
      <Stack.Screen
        name="Create"
        component={CreateChallengesScreen}
        options={{ title: "Create Challenge" }}
      />
      <Stack.Screen
        name="Details"
        component={DetailsScreen}
        options={{ title: "Challenge" }}
      />
    </Stack.Navigator>
  );
}
