import React, { Component } from 'react';
import { createStackNavigator, createAppContainer } from 'react-navigation';

import LoginScreen from "./src/views/LoginView/LoginScreen";
import MainScreen from "./src/views/MainView/MainScreen";

class App extends Component {
  render() {
    return (
      <AppStackNavigator />
    );
  }
}

const AppStackNavigator = createStackNavigator({
  LoginScreen: { screen: LoginScreen, navigationOptions: { header: null } },
  MainScreen: { screen: MainScreen, navigationOptions: { header: null } },
});

const AppContainer = createAppContainer(AppStackNavigator);
export default AppContainer;
