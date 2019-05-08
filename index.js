import { AppRegistry } from 'react-native';
import AppContainer from './App';
import { name as appName } from './app.json';
import React from 'react';


const App = () => (
    <AppContainer></AppContainer>
)

AppRegistry.registerComponent(appName, () => App);
