import React, { Component } from "react";
import { View, Text, StyleSheet, Button } from "react-native";
import { withNavigation } from 'react-navigation';

class ProfileScreen extends Component {

    render() {
        return (
            <View style={styles.flexView}>
                <Text>ProfileScreen</Text>
            </View>
        )
    }
}

export default withNavigation(ProfileScreen);


const styles = StyleSheet.create({

    flexView: {
        flex: 1,
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
    }
});