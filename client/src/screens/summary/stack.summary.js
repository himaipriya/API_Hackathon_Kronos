import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import NavigationDrawerStructure from "../../components/navigation.drawstructure";
const Stack = createStackNavigator();

import Summary from "./summary";

const StackSummary = ({ navigation }) => {
  return (
    <Stack.Navigator initialRouteName="FirstPage">
      <Stack.Screen
        name="summary"
        component={Summary}
        options={{
          title: "Virtual Account Summary", //Set Header Title
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

export default StackSummary;
