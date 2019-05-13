import React, { Component } from "react";
import { View, StyleSheet } from "react-native";
import { createBottomTabNavigator, createStackNavigator } from "react-navigation";
import { createAppContainer } from 'react-navigation';

import Icon from "react-native-vector-icons/FontAwesome";

// SCREENS
import StepScreen from "../views/StepView/StepScreen";
import StatisticScreen from "../views/StatisticView/StatisticScreen";
import ProfileScreen from "../views/ProfileView/ProfileScreen";



class MainTabNavigation extends Component {

    render() {
        return (
            <View style={styles.container}>
                <AppBottomNavigator />
            </View>
        )
    }
}


const AppBottomNavigator = createBottomTabNavigator({
    StatisticScreen: {
        screen: StatisticScreen,
        navigationOptions: {
            header: null,
            tabBarLabel: "Statistics",
            tabBarIcon: ({ tintColor }) => (
                <Icon name="bar-chart" color={tintColor} size={24} />
            )
        },
    },
    StepScreen: {
        screen: StepScreen,
        navigationOptions: {
            header: null,
            tabBarLabel: "Step Counter",
            tabBarIcon: ({ tintColor }) => (
                <Icon name="envira" color={tintColor} size={24} />
            )
        }
    },
    ProfileScreen: {
        screen: ProfileScreen,
        navigationOptions: {
            header: null,
            tabBarLabel: "Profile",
            tabBarIcon: ({ tintColor }) => (
                <Icon name="user" color={tintColor} size={24} />
            )
        }
    }
},
    {
        initialRouteName: "StepScreen",
        navigationOptions: {
            tabBarVisible: true
        },
        tabBarOptions: {
            activeTintColor: "#7CC0F1",
            inactiveTintColor: "#525252"
        }
    }
);


const AppContainer = createAppContainer(AppBottomNavigator);
export default AppContainer;


const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center"
    }
});