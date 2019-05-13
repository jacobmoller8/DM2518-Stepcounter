import React, { Component } from "react";
import { View, Text, StyleSheet, Button } from "react-native";
import { withNavigation } from 'react-navigation';

class StepScreen extends Component {

    render() {
        return (
            <View style={styles.flexView}>
                <Text>StepScreen</Text>
            </View>
        )
    }
}

export default withNavigation(StepScreen);


const styles = StyleSheet.create({

    flexView: {
        flex: 1,
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
    }
});