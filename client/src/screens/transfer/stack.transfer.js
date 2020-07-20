import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import NavigationDrawerStructure from '../../components/navigation.drawstructure'
const Stack = createStackNavigator();

import Transfer from "./transfer";
import TransferToSavings from '../transfertosavings'
import TransferAsFixedDeposit from '../transfertofd'
import OffersCreation from '../offerscreation'

const StackTransfer = ({ navigation }) => {
    return (
      <Stack.Navigator>
        <Stack.Screen
         name="transfer"
         component={Transfer}
          options={{
            title: 'Transfer Page',
            headerLeft: ()=> <NavigationDrawerStructure navigationProps={navigation} />,
            headerStyle: {
              backgroundColor: '#f4511e', //Set Header color
            },
            headerTintColor: '#fff', //Set Header text color
            headerTitleStyle: {
              fontWeight: 'bold', //Set Header text style
            },
          }}
        />
        <Stack.Screen
          name="transfer-to-savings"
          component={TransferToSavings}
          options={{
            title: 'Transfer to Savings Account',
            headerStyle: {
              backgroundColor: '#f4511e', //Set Header color
            },
            headerTintColor: '#fff', //Set Header text color
            headerTitleStyle: {
              fontWeight: 'bold', //Set Header text style
            },
          }}
        />
        <Stack.Screen
          name="create-fd"
          component={TransferAsFixedDeposit}
          options={{
            title: 'Create Fixed Deposit',
            headerStyle: {
              backgroundColor: '#f4511e', //Set Header color
            },
            headerTintColor: '#fff', //Set Header text color
            headerTitleStyle: {
              fontWeight: 'bold', //Set Header text style
            },
          }}
        />
        <Stack.Screen
          name="offer-creation"
          component={OffersCreation}
          options={{
            title: 'Selected Offer',
            headerStyle: {
              backgroundColor: '#f4511e', //Set Header color
            },
            headerTintColor: '#fff', //Set Header text color
            headerTitleStyle: {
              fontWeight: 'bold', //Set Header text style
            },
          }}
        />
      </Stack.Navigator>
    );
}

export default StackTransfer