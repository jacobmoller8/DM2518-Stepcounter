import React, { Component } from "react";
import { View, Text, StyleSheet, Button, Dimensions, KeyboardAvoidingView, icon } from "react-native";
import { withNavigation } from 'react-navigation';

class ProfileScreen extends Component {

    render() {
        return (
            <KeyboardAvoidingView style={styles.flexView} behavior="padding">
                <View style={styles.topBackground}>
                    <View style={styles.circle}>
                        <Icon name="home" color={"#7CC0F1"} size={60}></Icon>
                    </View>
                </View>

                <View style={styles.bootomBackground}>


                </View>

            </KeyboardAvoidingView >
        )
    }
}

export default withNavigation(ProfileScreen);

const screenHeight = Dimensions.get('window').height;
const screenWidth = Dimensions.get('window').width;

const styles = StyleSheet.create({

    flexView: {
        justifyContent: "center",
        alignItems: "center",
    },
    topBackground: {
        height: screenHeight * 0.5,
        width: screenWidth,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#7CC0F1"
    },
    bottomBackground: {
        height: screenHeight * 0.5,
        width: screenWidth,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "white"
    },
});