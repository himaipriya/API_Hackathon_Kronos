import { registerRootComponent } from "expo";
import React from "react";
import { Provider } from "react-redux";
import { Platform } from "react-native";
import { createStore, applyMiddleware } from "redux";
import createSagaMiddleWare from "redux-saga";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createDrawerNavigator } from "@react-navigation/drawer";
import {
  StackSettings,
  StackSummary,
  StackDashboard,
  StackTransfer,
  Payments,
  StackTransferTwoSavings,
} from "./screens";
import reducer from "./domain/reducers";
import rootSaga from "./domain/saga/rootSaga";

const sagaMiddleware = createSagaMiddleWare();
const Drawer = createDrawerNavigator();

let store;
if (Platform.OS === "android" || Platform.OS === "ios") {
  store = createStore(reducer, applyMiddleware(sagaMiddleware));
} else {
  const composeEnhancers =
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  store = createStore(
    reducer,
    composeEnhancers(applyMiddleware(sagaMiddleware))
  );
}
sagaMiddleware.run(rootSaga);

const App = () => {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Drawer.Navigator
          drawerContentOptions={{
            activeTintColor: "#e91e63",
            itemStyle: { marginVertical: 5 },
          }}
        >
          <Drawer.Screen
            name="dashbaord"
            options={{ drawerLabel: "Dashboard" }}
            component={StackDashboard}
          />
          <Drawer.Screen
            name="payments"
            options={{ drawerLabel: "Payments" }}
            component={Payments}
          />
          <Drawer.Screen
            name="settings"
            options={{ drawerLabel: "Virtual Account Settings" }}
            component={StackSettings}
          />
          <Drawer.Screen
            name="summary"
            options={{ drawerLabel: "Virtual Account Summary" }}
            component={StackSummary}
          />
          <Drawer.Screen
            name="transfer"
            options={{ drawerLabel: "Manage Virtual Money" }}
            component={StackTransfer}
          />
        </Drawer.Navigator>
      </NavigationContainer>
    </Provider>
  );
};

export default registerRootComponent(App);
