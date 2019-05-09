import React, { Component } from "react";
import { View, Text, StyleSheet, Button, Dimensions, TextInput, TouchableOpacity, KeyboardAvoidingView } from "react-native";
import { withNavigation } from 'react-navigation';

import Icon from "react-native-vector-icons/FontAwesome";


class LoginScreen extends Component {

    render() {
        return (
            <KeyboardAvoidingView style={styles.flexView} behavior="padding">
                <View style={styles.topBackground}>
                    <View style={styles.circle}>
                        <Icon name="home" color={"#7CC0F1"} size={60}></Icon>
                    </View>
                </View>

                <View style={styles.bootomBackground}>
                    <View style={styles.loginBackground}>
                        <Text style={styles.titleText}>LOGIN</Text>




                        <View style={styles.textBox}>
                            <Icon name="user" style={styles.icon} color={"#525252"} size={30}></Icon>
                            <TextInput style={styles.textInput}
                                placeholder="username"
                                placeholderTextColor="#525252"
                                keyboardType="default"
                                returnKeyType="next">
                            </TextInput>
                        </View>

                        <View style={styles.textBox}>
                            <Icon name="lock" style={styles.icon} color={"#525252"} size={30}></Icon>
                            <TextInput style={styles.textInput}
                                placeholder="password"
                                placeholderTextColor="#525252"
                                keyboardType="default"
                                returnKeyType="done"
                                secureTextEntry={true}
                                blurOnSubmit={true}>
                            </TextInput>
                        </View>
                        <TouchableOpacity style={styles.loginButton} onPress={() => this.props.navigation.navigate("MainScreen")}>
                            <Text style={styles.loginText}>LOGIN</Text>
                        </TouchableOpacity>

                        <TouchableOpacity>
                            <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.registerButton}>
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
        justifyContent: "center",
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
        marginTop: -40,
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
    loginButton: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        height: 50,
        width: screenWidth * 0.6,
        backgroundColor: "#7CC0F1",
        borderRadius: 40,
        marginTop: 20,
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
        marginTop: 20,
        borderWidth: 2,
        borderColor: "#7CC0F1",
        marginBottom: 30
    },
});