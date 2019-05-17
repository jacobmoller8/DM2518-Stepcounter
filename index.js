import { AppRegistry } from 'react-native';
import AppContainer from './App';
import { name as appName } from './app.json';
import React from 'react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from './src/redux/store/store';


const App = () => (
    <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
            <AppContainer />
        </PersistGate>
    </Provider>
)

AppRegistry.registerComponent(appName, () => App);
