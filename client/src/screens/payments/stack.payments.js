import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import NavigationDrawerStructure from "../../components/navigation.drawstructure";
const Stack = createStackNavigator();

import Payments from "./payments";

const StackSettings = ({ navigation }) => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="payments"
        component={Payments}
        options={{
          title: "Make a Payments", //Set Header Title
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
