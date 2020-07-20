import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import NavigationDrawerStructure from "../../components/navigation.drawstructure";
const Stack = createStackNavigator();

import Dashboard from "./dashboard";

const StackDashboard = ({ navigation }) => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="dashboard"
        component={Dashboard}
        options={{
          title: "Home",
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

export default StackDashboard;
