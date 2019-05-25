import React, { Component } from "react";
import { View, Text, StyleSheet, Button, Dimensions, TextInput, TouchableOpacity, KeyboardAvoidingView, SafeAreaView, Image } from "react-native";
import { withNavigation } from 'react-navigation';
import { connect } from "react-redux";
import { switchScreen } from "../../redux/actions/screenActions"


import * as firebase from 'firebase';
import "firebase/auth";


class ForgotPassScreen extends Component {

    constructor(props) {
        super(props);
        this.state = {
            email: "",
            message: "",
            messageColor: "white"
        };
    }

    onSendNewPass = () => {
        this.setState({ message: "" })
        var emailAddress = this.state.email
        console.log(emailAddress)

        var that = this
        firebase.auth().sendPasswordResetEmail(emailAddress).then(function () {
            console.log("password sent to email: ")
            that.setState({ message: "Password Reset sent to Email", messageColor: "green" })
        }).catch(function (error) {
            console.log(error)
            var errorCode = error.code;
            var errorMessage = error.message;
            console.log(errorCode)
            console.log(errorMessage)
            that.setState({ message: errorMessage, messageColor: "red" })
        });

    }

    onBackClick = () => {
        this.props.switchScreen('login')
        this.props.navigation.navigate("LoginScreen")
    }

    render() {
        return (
            <KeyboardAvoidingView style={styles.flexView} behavior="padding">
                <View style={styles.topBackground}>

                    <Image
                        source={require("../../assets/cardNoice.png")}
                        style={styles.cardNoiceOverlay}
                    />
                    <Image
                        source={require("../../assets/turtle.png")}
                        style={styles.image}
                    />

                    <Text style={styles.inputLabel}>Email</Text>
                    <View style={styles.textBox}>
                        <TextInput
                            onChangeText={(email) => this.setState({ email })}
                            value={this.state.email}
                            style={styles.textInput}
                            placeholder="john@doe.com"
                            placeholderTextColor="#757575"
                            keyboardType="email-address"
                            returnKeyType="next"
                            blurOnSubmit={true}
                        >
                        </TextInput>
                    </View>

                </View>

                <TouchableOpacity style={styles.registerButton} onPress={() => this.onSendNewPass()}>
                    <Text style={styles.registerText}>SEND PASSWORD</Text>
                </TouchableOpacity>

                <Text style={[styles.message, { color: this.state.messageColor }]}>{this.state.message}</Text>

                <TouchableOpacity style={styles.backButton} onPress={() => this.onBackClick()}>
                    <Text style={styles.registerText}>BACK</Text>
                </TouchableOpacity>

            </KeyboardAvoidingView >
        )
    }
}



const mapStateToProps = state => {
    return {
    }
};

const mapDispatchToProps = dispatch => {
    return {
        switchScreen: ownProps => dispatch(switchScreen(ownProps))
    }
};

export default withNavigation(connect(mapStateToProps, mapDispatchToProps)(ForgotPassScreen));

const screenHeight = Dimensions.get('window').height;
const screenWidth = Dimensions.get('window').width;

const styles = StyleSheet.create({

    flexView: {
        justifyContent: "center",
        alignItems: "center",
    },
    topBackground: {
        height: screenHeight * 0.8,
        width: screenWidth,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#455C97"
    },
    cardNoiceOverlay: {
        height: screenHeight * 0.8,
        width: screenWidth,
        position: "absolute"
    },
    image: {
        marginTop: 20,
    },
    inputLabel: {
        fontSize: 15,
        color: "white",
        marginTop: 15
    },
    textBox: {
        backgroundColor: "white",
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
    message: {
        textAlign: "center",
        marginTop: -10,
        fontSize: 15,
    },
    registerButton: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        height: 50,
        width: screenWidth * 0.6,
        backgroundColor: "white",
        borderRadius: 40,
        marginTop: -25,
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
        color: "#455C97"
    },
    backButton: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        height: 50,
        width: screenWidth * 0.6,
        backgroundColor: "white",
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

});