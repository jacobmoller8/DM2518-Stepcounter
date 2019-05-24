import React, { Component } from "react";
import { View, Text, StyleSheet, Button,Platform, Dimensions, TextInput, TouchableOpacity, KeyboardAvoidingView, Image } from "react-native";
import { withNavigation } from 'react-navigation';
import { connect } from "react-redux";
import {initAppleHK} from "../../redux/actions/stepActions"
import { loadUser } from "../../redux/actions/userAction";
import { store } from "../../redux/store/store";

import { firebaseConfig } from "../../firebaseConfig";
import * as firebase from 'firebase';
import "firebase/auth";


class SplashScreen extends Component {

    constructor(props) {
        super(props);
        this.state = {
        };
    }
    componentWillMount = () => {
        firebase.initializeApp(firebaseConfig)
    }
    componentDidMount = () => {
        this.checkIfAuthorized()
    }

    componentWillReceiveProps(nextProp) {
        if (nextProp.user.uid !== "") {
            this.props.navigation.navigate("StepScreen")
        }
    }

    checkIfAuthorized = () => {
        var that = this
        firebase.auth().onAuthStateChanged(function (user) {
            if (user) {
                console.log(user.email + " is now Authorized")
                if (!store.getState().user.isLoadingUser) {
                    console.log("trigger in splash screen")
                    that.props.loadUser(user.uid)
                }
            } else {
                that.props.navigation.navigate("LoginScreen")
                console.log("No account connected")
            }
        });
    }

    render() {
        return (
            <View style={styles.flexView}>
                <Image
                    source={require("../../assets/cardNoice.png")}
                    style={styles.cardNoiceOverlay}
                />
                <Image
                    source={require("../../assets/turtle.png")}
                />

            </View >
        )
    }
}

const mapStateToProps = state => {
    return {
        user: state.user
    }
};

const mapDispatchToProps = dispatch => {
    return {
        initAppleHK: dispatch(initAppleHK()),
        loadUser: (ownProps) => dispatch(loadUser(ownProps))
    }
};

export default withNavigation(connect(mapStateToProps, mapDispatchToProps)(SplashScreen));

const screenHeight = Dimensions.get('window').height;
const screenWidth = Dimensions.get('window').width;

const styles = StyleSheet.create({

    flexView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#455C97"
    },
    cardNoiceOverlay: {
        width: screenWidth,
        height: screenHeight,
        position: "absolute"
    },
});