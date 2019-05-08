import React, { Component } from "react";
import { View, Text, StyleSheet, Button } from "react-native";
import { withNavigation } from 'react-navigation';

class LoginScreen extends Component {

    render() {
        return (
            <View style={styles.flexView}>
                <Text>LoginScreen</Text>
                <Button title="Go to MainScreen"
                    onPress={() => this.props.navigation.navigate("MainScreen")} />
            </View>
        )
    }
}

export default withNavigation(LoginScreen);

const styles = StyleSheet.create({

    flexView: {
        flex: 1,
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center"
    }
});