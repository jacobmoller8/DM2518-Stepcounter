import React, { Component } from "react";
import { View, Text, StyleSheet, Button } from "react-native";
import { withNavigation } from 'react-navigation';

class MainScreen extends Component {

    render() {
        return (
            <View style={styles.flexView}>
                <Text>MainScreen</Text>
                <Button title="Go to LoginScreen"
                    onPress={() => this.props.navigation.navigate("LoginScreen")} />
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