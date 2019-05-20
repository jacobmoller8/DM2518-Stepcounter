import React, { Component } from 'react';
import { createStackNavigator, createAppContainer } from 'react-navigation';

import LoginScreen from "./src/views/LoginView/LoginScreen";
import RegisterScreen from "./src/views/RegisterView/RegisterScreen";
import StepScreen from "./src/views/StepView/StepScreen";
import ProfileScreen from "./src/views/ProfileView/ProfileScreen";

class App extends Component {
  render() {
    return (
      <AppStackNavigator />
    );
  }
}

const AppStackNavigator = createStackNavigator({
  LoginScreen: { screen: LoginScreen, navigationOptions: { header: null } },
  RegisterScreen: { screen: RegisterScreen, navigationOptions: { header: null } },
  StepScreen: { screen: StepScreen, navigationOptions: { header: null, gesturesEnabled: false } },
  ProfileScreen: { screen: ProfileScreen, navigationOptions: { header: null } },
});

const AppContainer = createAppContainer(AppStackNavigator);
export default AppContainer;
