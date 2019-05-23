import React, { Component } from "react";
import { View, Text, StyleSheet, Button, Dimensions, TextInput, TouchableOpacity, KeyboardAvoidingView, Image } from "react-native";
import { withNavigation } from 'react-navigation';
import { connect } from "react-redux";

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
    checkIfAuthorized = () => {
        var that = this
        firebase.auth().onAuthStateChanged(function (user) {
            if (user) {
                console.log(user.email + " is now Authorized")
                if (!store.getState().user.isLoadingUser) {
                    that.props.loadUser(user.uid)
                    that.props.navigation.navigate("StepScreen")
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
    }
};

const mapDispatchToProps = dispatch => {
    return {
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