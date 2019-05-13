import React, { Component } from "react";
import { View, Text, StyleSheet, Button } from "react-native";
import { withNavigation } from 'react-navigation';

class StatisticScreen extends Component {

    render() {
        return (
            <View style={styles.flexView}>
                <Text>Statistics Screen</Text>
            </View>
        )
    }
}

export default withNavigation(StatisticScreen);


const styles = StyleSheet.create({

    flexView: {
        flex: 1,
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
    }
});