import React, { Component } from "react";
import {
    View,
    Text,
    StyleSheet,
    Button,
    Platform,
    Dimensions,
    TextInput,
    TouchableOpacity,
    KeyboardAvoidingView,
    Image
} from "react-native";
import { withNavigation } from "react-navigation";
import { connect } from "react-redux";
import {
    initAppleHK,
    loadConvertedSteps,
    fetchStepsFromPeriod,
    loadStepAvg,
    resetStepReducer
} from "../../redux/actions/stepActions";
import { loadUser, resetUserReducer } from "../../redux/actions/userAction";
import { switchScreen } from "../../redux/actions/screenActions";
import { store } from "../../redux/store/store";
import LoadingSpinner from "../../components/loadingSpinner";

import { firebaseConfig } from "../../firebaseConfig";
import * as firebase from "firebase";
import "firebase/auth";

class SplashScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userLoaded: false
        };
    }
    componentWillMount = () => {
        // RESET ALL REDUCERS
        // this.resetReducers()
        // RESET ALL REDUCERS

        firebase.initializeApp(firebaseConfig);
        if (Platform.OS === "ios") {
            this.props.initAppleHK;
            this.props.switchScreen("splash");
        }
    };
    componentDidMount = () => {
        this.checkIfAuthorized();
    };
    resetReducers = () => {
        this.props.resetStepReducer()
        this.props.resetUserReducer()
    }

    componentWillReceiveProps(nextProp) {
        if (nextProp.user.isLoadingUser === "error") {
            this.props.switchScreen("login");
            this.props.navigation.navigate("LoginScreen");
        }
        // Check that user has been loaded
        if (nextProp.user.uid !== "" && nextProp.screen === "splash") {
            if (nextProp.stepInfo.loadingStepAvgSatus === "not loaded") {
                this.props.loadStepAvg(nextProp.user.uid);
            }

            // Loads converted steps
            if (nextProp.stepInfo.conStepStatus === "not fetched") {
                this.props.loadConvertedSteps(nextProp.user.uid);
            }
            // Loads historical data
            if (
                (nextProp.stepInfo.conStepStatus === "no saved converted steps" &&
                    nextProp.stepInfo.stepsFromPeriodStatus === "not fetched") ||
                (nextProp.stepInfo.conStepStatus === "fetched" &&
                    nextProp.stepInfo.stepsFromPeriodStatus === "not fetched")
            ) {
                this.props.fetchStepsFromPeriod(nextProp.user.uid);
            }

            if (
                nextProp.stepInfo.stepsFromPeriodStatus === "fetched" &&
                nextProp.stepInfo.status === "initialized"
            ) {
                this.props.navigation.navigate("StepScreen");
                this.props.switchScreen("steps");
            }
        }else if (nextProp.user.uid === "" && nextProp.screen === "splash"){
            this.setState({userLoaded: false})}
    }

    checkIfAuthorized = () => {
        var that = this;
        firebase.auth().onAuthStateChanged(function (user) {
            if (user) {
                console.log(user.email + " is now Authorized");
                if (!that.state.userLoaded) {
                    that.setState({ userLoaded: true });
                    that.props.loadUser(user.uid);
                }
            } else {
                that.props.switchScreen("login")
                that.props.navigation.navigate("LoginScreen");
                console.log("No account connected");
            }
        });
    };

    render() {
        return (
            <View style={styles.flexView}>
                <LoadingSpinner />
            </View>
        );
    }
}

const mapStateToProps = state => {
    return {
        user: state.user,
        stepInfo: state.stepInfo,
        screen: state.screen
    };
};

const mapDispatchToProps = dispatch => {
    return {
        initAppleHK: dispatch(initAppleHK()),
        loadUser: ownProps => dispatch(loadUser(ownProps)),
        loadConvertedSteps: ownProps => dispatch(loadConvertedSteps(ownProps)),
        fetchStepsFromPeriod: ownProps => dispatch(fetchStepsFromPeriod(ownProps)),
        loadStepAvg: ownProps => dispatch(loadStepAvg(ownProps)),
        switchScreen: ownProps => dispatch(switchScreen(ownProps)),
        resetStepReducer: () => dispatch(resetStepReducer()),
        resetUserReducer: () => dispatch(resetUserReducer())
    };
};

export default withNavigation(
    connect(
        mapStateToProps,
        mapDispatchToProps
    )(SplashScreen)
);

const screenHeight = Dimensions.get("window").height;
const screenWidth = Dimensions.get("window").width;

const styles = StyleSheet.create({
    flexView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#FFF"
    },
    cardNoiceOverlay: {
        width: screenWidth,
        height: screenHeight,
        position: "absolute"
    }
});
