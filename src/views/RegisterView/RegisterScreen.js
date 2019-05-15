import React, { Component } from "react";
import { View, Text, StyleSheet, Button, Dimensions, TextInput, TouchableOpacity, KeyboardAvoidingView } from "react-native";
import { withNavigation } from 'react-navigation';

import Icon from "react-native-vector-icons/FontAwesome";
import * as firebase from 'firebase';
import "firebase/auth";


class RegisterScreen extends Component {

    constructor(props) {
        super(props);
        this.state = {
            email: "",
            password: ""
        };
    }

    componentDidMount = () => {
        firebase.auth().signOut().then(function () {
            console.log("signed out user")
        }).catch(function (error) {
            console.log("ERROR:" + error)
        });
    }

    checkIfAuthorized = () => {
        var that = this
        firebase.auth().onAuthStateChanged(function (user) {
            if (user) {
                console.log(user.email + " is now Authorized")
                that.props.navigation.navigate("MainTabNavigation")
            } else {
                console.log("Register failed")
            }
        });
    }

    onRegisterSubmit = () => {
        console.log(this.state.email)
        console.log(this.state.password)
        firebase.auth().createUserWithEmailAndPassword(this.state.email, this.state.password).catch(function (error) {
            var errorCode = error.code;
            var errorMessage = error.message;
            console.log(errorCode)
            console.log(errorMessage)
        }).then(this.checkIfAuthorized)

    }

    render() {
        return (
            <KeyboardAvoidingView style={styles.flexView} behavior="padding">
                <View style={styles.topBackground}>
                    <View style={styles.circle}>
                        <Icon name="home" color={"#7CC0F1"} size={60}></Icon>
                    </View>
                </View>

                <View style={styles.bottomBackground}>
                    <View style={styles.registerBackground}>
                        <Text style={styles.titleText}>REGISTER</Text>

                        <View style={styles.textBox}>
                            <Icon name="user" style={styles.icon} color={"#525252"} size={30}></Icon>
                            <TextInput
                                onChangeText={(email) => this.setState({ email })}
                                value={this.state.email}
                                style={styles.textInput}
                                placeholder="Email"
                                placeholderTextColor="#757575"
                                keyboardType="default"
                                returnKeyType="next">
                            </TextInput>
                        </View>

                        <View style={styles.textBox}>
                            <Icon name="lock" style={styles.icon} color={"#525252"} size={30}></Icon>
                            <TextInput
                                onChangeText={(password) => this.setState({ password })}
                                value={this.state.password}
                                style={styles.textInput}
                                placeholder="Password"
                                placeholderTextColor="#757575"
                                keyboardType="default"
                                returnKeyType="done"
                                secureTextEntry={true}
                                blurOnSubmit={true}>
                            </TextInput>
                        </View>
                        <TouchableOpacity style={styles.registerButton} onPress={this.onRegisterSubmit}>
                            <Text style={styles.registerText}>REGISTER</Text>
                        </TouchableOpacity>

                    </View>

                </View>

            </KeyboardAvoidingView >
        )
    }
}

export default withNavigation(RegisterScreen);

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
        alignItems: "center",
        backgroundColor: "white"
    },
    circle: {
        height: 120,
        width: 120,
        backgroundColor: "white",
        borderRadius: 120,
        justifyContent: "center",
        alignItems: "center",
    },
    registerBackground: {
        alignItems: "center",
        width: screenWidth * 0.85,
        backgroundColor: "white",
        borderRadius: 10,
        marginTop: -20,
        shadowColor: "#000000",
        shadowOffset: {
            width: 2,
            height: 4,
        },
        shadowOpacity: 0.50,
        shadowRadius: 4,
        elevation: 12,
    },
    titleText: {
        marginTop: 20,
        color: "#525252",
        fontSize: 20,
        fontWeight: "bold"
    },
    textBox: {
        flexDirection: "row",
        alignItems: "center",
        height: 50,
        width: screenWidth * 0.8,
        borderRadius: 10,
        marginTop: 15,
        borderWidth: 2,
        borderColor: "#7CC0F1"
    },
    icon: {
        marginLeft: 20
    },
    textInput: {
        left: 20,
        fontSize: 20,
        color: "#525252",
        width: screenWidth * 0.6
    },
    registerButton: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        height: 50,
        width: screenWidth * 0.6,
        backgroundColor: "#7CC0F1",
        borderRadius: 40,
        marginTop: 20,
        marginBottom: 30,
        shadowColor: "#000000",
        shadowOffset: {
            width: 2,
            height: 4,
        },
        shadowOpacity: 0.50,
        shadowRadius: 4,
        elevation: 12,
    },
    registerText: {
        fontSize: 20,
        color: "white",
        fontWeight: "bold"
    },

});