import React, { Component } from "react";
import { View, Text, StyleSheet } from "react-native";
import { withNavigation } from 'react-navigation';

class MainScreen extends Component {

    render() {
        return (
            <View style={styles.flexView}>
                <Text>MainScreen</Text>
            </View>
        )
    }
}

export default withNavigation(MainScreen);


const styles = StyleSheet.create({

    flexView: {
        flex: 1,
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
    }
});