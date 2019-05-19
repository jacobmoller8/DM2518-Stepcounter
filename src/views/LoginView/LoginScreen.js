import React, { Component } from "react";
import { View, Text, StyleSheet, Button, Dimensions, TextInput, TouchableOpacity, KeyboardAvoidingView } from "react-native";
import { withNavigation } from 'react-navigation';

import Icon from "react-native-vector-icons/MaterialIcons";

import * as firebase from 'firebase';
import "firebase/auth";


class LoginScreen extends Component {

    constructor(props) {
        super(props);
        this.state = {
            email: "",
            password: "",
            errorMessage: ""
        };
    }

    componentDidMount = () => {
        var firebaseConfig = {
            apiKey: "AIzaSyCS7vvYOFnnKRn1cTpOq_Lg9mA3Lz9fKGs",
            authDomain: "dm2518-stepcounter.firebaseapp.com",
            databaseURL: "https://dm2518-stepcounter.firebaseio.com",
            projectId: "dm2518-stepcounter",
            storageBucket: "dm2518-stepcounter.appspot.com",
            messagingSenderId: "209322474723",
            appId: "1:209322474723:web:051274ee884a5c71"
        };
        firebase.initializeApp(firebaseConfig);

        //this.checkIfAuthorized()
        this.signOutUser()

    }

    signOutUser = () => {
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
                that.props.navigation.navigate("StepScreen")
            } else {
                console.log("No account connected")
            }
        });
    }

    onLoginSubmit = () => {
        console.log(this.state.email)
        console.log(this.state.password)
        var that = this
        firebase.auth().signInWithEmailAndPassword(this.state.email, this.state.password).catch(function (error) {
            var errorCode = error.code;
            var errorMessage = error.message;
            console.log(errorCode)
            that.setState({ errorMessage: errorMessage })
            console.log(errorMessage)
        }).then(this.checkIfAuthorized())
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
                    <View style={styles.loginBackground}>
                        <Text style={styles.titleText}>LOGIN</Text>

                        <View style={styles.textBox}>
                            <Icon name="mail" style={styles.icon} color={"#525252"} size={30}></Icon>
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

                        <Text style={styles.errorText}>{this.state.errorMessage}</Text>

                        <TouchableOpacity style={styles.loginButton} onPress={this.onLoginSubmit}>
                            <Text style={styles.loginText}>LOGIN</Text>
                        </TouchableOpacity>

                        <TouchableOpacity>
                            <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.registerButton} onPress={() => this.props.navigation.navigate("RegisterScreen")}>
                            <Text style={styles.registerText}>REGISTER</Text>
                        </TouchableOpacity>

                    </View>

                </View>

            </KeyboardAvoidingView >
        )
    }
}

export default withNavigation(LoginScreen);

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
    loginBackground: {
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
        marginLeft: 10
    },
    textInput: {
        left: 10,
        fontSize: 20,
        color: "#525252",
        width: screenWidth * 0.6
    },
    errorText: {
        textAlign: "center",
        marginTop: 5,
        fontSize: 15,
        color: "red",
    },
    loginButton: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        height: 50,
        width: screenWidth * 0.6,
        backgroundColor: "#7CC0F1",
        borderRadius: 40,
        marginTop: 5,
        shadowColor: "#000000",
        shadowOffset: {
            width: 2,
            height: 4,
        },
        shadowOpacity: 0.50,
        shadowRadius: 4,
        elevation: 12,
    },
    loginText: {
        fontSize: 20,
        color: "white",
        fontWeight: "bold"
    },
    forgotPasswordText: {
        marginTop: 15,
        fontSize: 15,
        color: "#525252",
    },
    registerText: {
        fontSize: 15,
        color: "#525252",
        fontWeight: "bold"
    },
    registerButton: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        height: 30,
        width: screenWidth * 0.3,
        borderRadius: 40,
        marginTop: 15,
        borderWidth: 2,
        borderColor: "#7CC0F1",
        marginBottom: 20
    },
});