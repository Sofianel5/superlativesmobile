/**
 * @format
 */

import { AppRegistry } from "react-native";
import App from "./App";
import { name as appName } from "./app.json";
import { store } from "./src/app/store";
import { Provider } from "react-redux";
import { NavigationContainer } from '@react-navigation/native';
import React from "react";

AppRegistry.registerComponent(appName, () => () => (
  <Provider store={store}>
    <NavigationContainer>
     <App />
    </NavigationContainer>
  </Provider>
));
