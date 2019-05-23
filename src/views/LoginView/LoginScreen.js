import React, { Component } from "react";
import { View, Text, StyleSheet, Button, Dimensions, TextInput, TouchableOpacity, KeyboardAvoidingView, SafeAreaView, Image } from "react-native";
import { withNavigation } from 'react-navigation';
import { connect } from "react-redux";
import { loadUser } from "../../redux/actions/userAction";

import { firebaseConfig } from "../../firebaseConfig";
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

    componentWillMount = () => {
        firebase.initializeApp(firebaseConfig)
    }
    componentDidMount = () => {

        this.checkIfAuthorized()
        //this.signOutUser()

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
                let inputObj = { email: user.email, uid: user.uid }
                console.log(user.email + " is now Authorized")
                that.props.loadUser(inputObj)
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
            <SafeAreaView style={styles.flexView}>
                <KeyboardAvoidingView style={styles.flexView} behavior="padding">

                    <Text style={styles.welcomeText}>Welcome to the StepApp!</Text>


                    <Text style={styles.inputLabel}>Email</Text>
                    <View style={styles.textBox}>
                        <TextInput
                            onChangeText={(email) => this.setState({ email })}
                            value={this.state.email}
                            style={styles.textInput}
                            placeholder="john@doe.com"
                            placeholderTextColor="#757575"
                            keyboardType="default"
                            returnKeyType="next">
                        </TextInput>
                    </View>

                    <Text style={styles.inputLabel}>Password</Text>
                    <View style={styles.textBox}>
                        <TextInput
                            onChangeText={(password) => this.setState({ password })}
                            value={this.state.password}
                            style={styles.textInput}
                            placeholder="********"
                            placeholderTextColor="#757575"
                            keyboardType="default"
                            returnKeyType="done"
                            secureTextEntry={true}
                            blurOnSubmit={true}>
                        </TextInput>
                    </View>

                    <Text style={styles.errorText}>{this.state.errorMessage}</Text>

                    <View style={styles.cardAndLogin}>
                        <TouchableOpacity style={styles.loginButton} onPress={() => this.onLoginSubmit()}>
                            <Text style={styles.loginText}>LOG IN</Text>
                        </TouchableOpacity>
                        <View style={styles.card}>
                            <TouchableOpacity>
                                <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
                            </TouchableOpacity>
                            <Image
                                source={require("../../assets/cardNoice.png")}
                                style={styles.cardNoiceOverlay}
                            />
                            <Image
                                source={require("../../assets/turtle.png")}
                            />

                            <TouchableOpacity style={styles.registerButton} onPress={() => this.props.navigation.navigate("RegisterScreen")}>
                                <Text style={styles.registerText}>SIGN UP</Text>
                            </TouchableOpacity>
                        </View>


                    </View>

                </KeyboardAvoidingView >
            </SafeAreaView>

        )
    }
}


const mapStateToProps = state => {
    return {
        user: state.user,
        stepInfo: state.stepInfo
    }
};

const mapDispatchToProps = dispatch => {
    return {
        loadUser: (ownProps) => dispatch(loadUser(ownProps))
    }
};

export default withNavigation(connect(mapStateToProps, mapDispatchToProps)(LoginScreen));

const screenHeight = Dimensions.get('window').height;
const screenWidth = Dimensions.get('window').width;

const styles = StyleSheet.create({

    flexView: {
        flex: 1,
        alignItems: "center",
    },
    welcomeText: {
        fontSize: 25,
        color: "#455C97",
        marginTop: 30,
        marginBottom: screenHeight * 0.1

    },
    inputLabel: {
        fontSize: 15,
        color: "#455C97",
        marginTop: 15
    },
    textBox: {
        flexDirection: "row",
        alignItems: "center",
        height: 50,
        width: screenWidth * 0.8,
        borderRadius: 5,
        borderWidth: 1,
        borderColor: "#455C97"
    },
    textInput: {
        left: 10,
        fontSize: 20,
        color: "#455C97",
        width: screenWidth * 0.6
    },
    errorText: {
        textAlign: "center",
        marginTop: 5,
        fontSize: 15,
        color: "red",
    },
    cardAndLogin: {
        alignItems: "center",
        position: "absolute",
        bottom: 10,
    },
    loginButton: {
        backgroundColor: "white",
        width: screenWidth * 0.88,
        height: 55,
        borderRadius: 50,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        shadowColor: "#000000",
        shadowOffset: {
            width: 1,
            height: 2
        },
        shadowOpacity: 0.5,
        shadowRadius: 2,
        elevation: 1,
        zIndex: 103,
    },
    loginText: {
        fontSize: 20,
        color: "#455C97",
    },
    card: {
        backgroundColor: "#455C97",
        width: screenWidth - 10,
        height: 230,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 10,
        marginTop: -27.5
    },
    cardNoiceOverlay: {
        borderRadius: 10,
        width: screenWidth - 10,
        height: 230,
        position: "absolute"
    },
    forgotPasswordText: {
        marginTop: 15,
        marginBottom: 10,
        fontSize: 15,
        color: "white",
        zIndex: 101
    },
    registerText: {
        marginTop: 30,
        fontSize: 15,
        color: "white",
        fontWeight: "bold",
        textDecorationLine: "underline"
    },

});