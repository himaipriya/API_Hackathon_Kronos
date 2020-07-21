import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import NavigationDrawerStructure from "../../components/navigation.drawstructure";
const Stack = createStackNavigator();

import Settings from "./settings";

const StackSettings = ({ navigation }) => {
  return (
    <Stack.Navigator initialRouteName="FirstPage">
      <Stack.Screen
        name="settings"
        component={Settings}
        options={{
          title: "Virtual Account Settings", //Set Header Title
          headerLeft: () => (
            <NavigationDrawerStructure navigationProps={navigation} />
          ),
          headerStyle: {
            backgroundColor: "#f4511e", //Set Header color
          },
          headerTintColor: "#fff", //Set Header text color
          headerTitleStyle: {
            fontWeight: "bold", //Set Header text style
          },
        }}
      />
    </Stack.Navigator>
  );
};

export default StackSettings;
