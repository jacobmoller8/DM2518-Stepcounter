import React, { Component } from "react";
import { View, Text, StyleSheet, Button,Platform, Dimensions, TextInput, TouchableOpacity, KeyboardAvoidingView, Image } from "react-native";
import { withNavigation } from 'react-navigation';
import { connect } from "react-redux";
import {initAppleHK, loadConvertedSteps, fetchStepsFromPeriod, loadStepAvg} from "../../redux/actions/stepActions"
import { loadUser } from "../../redux/actions/userAction";
import { store } from "../../redux/store/store";

import { firebaseConfig } from "../../firebaseConfig";
import * as firebase from 'firebase';
import "firebase/auth";


class SplashScreen extends Component {

    constructor(props) {
        super(props);
        this.state = {
            userLoaded: false
        };
    }
    componentWillMount = () => {
        firebase.initializeApp(firebaseConfig)
        if (Platform.OS === "ios") {
            this.props.initAppleHK;
          }
    }
    componentDidMount = () => {
        this.checkIfAuthorized()
    }

    componentWillReceiveProps(nextProp) {
        console.log("NEXT PROP SPLASH: ", nextProp)
        if (nextProp.user.isLoadingUser === "error"){
            this.props.navigation.navigate("LoginScreen")
        }
        // Check that user has been loaded
        if (nextProp.user.uid !== "") {
            if(nextProp.stepInfo.loadingStepAvgSatus === 'not loaded'){
                this.props.loadStepAvg(nextProp.user.uid)
            }

            // Loads converted steps
            if (nextProp.stepInfo.conStepStatus === 'not fetched'){
                this.props.loadConvertedSteps(nextProp.user.uid)
            }
            // Loads historical data
            if (nextProp.stepInfo.conStepStatus === "no saved converted steps" && nextProp.stepInfo.stepsFromPeriodStatus === "not fetched" || nextProp.stepInfo.conStepStatus === "fetched" && nextProp.stepInfo.stepsFromPeriodStatus === "not fetched"){
                this.props.fetchStepsFromPeriod(nextProp.user.uid)
            }

            if (nextProp.stepInfo.stepsFromPeriodStatus === "fetched" && nextProp.stepInfo.status === "initialized"){
                this.props.navigation.navigate("StepScreen")
            }

            
        }
    }

    checkIfAuthorized = () => {
        var that = this
        firebase.auth().onAuthStateChanged(function (user) {
            if (user) {
                console.log(user.email + " is now Authorized")
                if (!that.state.userLoaded) {
                    that.setState({userLoaded: true})
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
        user: state.user,
        stepInfo: state.stepInfo
    }
};

const mapDispatchToProps = dispatch => {
    return {
        initAppleHK: dispatch(initAppleHK()),
        loadUser: (ownProps) => dispatch(loadUser(ownProps)),
        loadConvertedSteps: ownProps => dispatch(loadConvertedSteps(ownProps)),
        fetchStepsFromPeriod: ownProps => dispatch(fetchStepsFromPeriod(ownProps)),
        loadStepAvg: ownProps => dispatch(loadStepAvg(ownProps))
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