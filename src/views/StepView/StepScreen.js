import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  Button,
  Platform,
  NativeAppEventEmitter,
  TouchableOpacity,
  Dimensions,
  Image,
  SafeAreaView,
  Animated,
  StatusBar,
  AppState,
  Vibration
} from "react-native";
import { withNavigation } from "react-navigation";
import { connect } from "react-redux";
import { store } from "../../redux/store/store";
import {
  initAppleHK,
  syncStepsToFirebase,
  updateStepState,
  loadConvertedSteps,
  fetchStepsFromPeriod
} from "../../redux/actions/stepActions";
import { switchScreen } from "../../redux/actions/screenActions";
import BackgroundTask from "react-native-background-task";
import Cards from "./CardsScroll";
import ProgressBar from "../../components/ProgressBar";
import Header from "../../components/Header";
import StepsToUse from "../../components/StepsToUse";
import LoadingSpinner from "../../components/loadingSpinner";

import Icon from "react-native-vector-icons/MaterialIcons";
import Icon2 from "react-native-vector-icons/MaterialCommunityIcons";
import AnimatedBar from "react-native-animated-bar";

BackgroundTask.define(async () => {
  let steps = store.getState().stepInfo.steps;
  let convertedSteps = store.getState().stepInfo.convertedSteps;
  let uid = store.getState().user.uid;
  let inputObj = {
    uid: uid,
    steps: steps,
    convertedSteps: convertedSteps,
    mode: "background"
  };

  const response = await store.dispatch(syncStepsToFirebase(inputObj));
});

class StepScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      error: "working",
      stepObserver: null,
      date: "",
      month: "",
      goal: 10000,
      isFetchingSteps: false,
      initialStepFetch: false,
      outdatedHistory: false,
      diff: null,
      appState: AppState.currentState
    };
  }

  stepsToUseTickerValue = new Animated.Value(0);

  animateStepsToUseTickerValue = () => {
    Animated.timing(this.stepsToUseTickerValue, {
      toValue: this.props.stepInfo.stepsToAnimate,
      duration: 2000
    });
  };

  componentWillMount() {
    if (this.props.screen === "steps") {
      this.fetchStepCountData();
    }
    this.getCurrentDate();
    StatusBar.setHidden(true);
  }

  componentDidMount() {
    //AppState.addEventListener("change", this.handleAppStateChange);

    if (this.state.stepObserver === null) {
      store.getState().stepInfo.HK.initStepCountObserver({}, () => {});
      let sub = NativeAppEventEmitter.addListener("change:steps", evt => {
        this.fetchStepCountData();
      });

      this.setState({ stepObserver: sub });
    }
    BackgroundTask.schedule();
    this.animateStepsToUseTickerValue();
  }

  handleAppStateChange = nextAppState => {
    if (this.props.screen === "steps") {
      if (
        this.state.appState.match("/inactive||background/") &&
        nextAppState === "active"
      ) {
        this.onMinimize(this.navigateToSplash());
      }

      this.setState({ appState: nextAppState });
    }
  };

  onMinimize = callback => {
    this.props.switchScreen("splash");
    callback;
  };

  navigateToSplash = () => {
    this.props.navigation.navigate("SplashScreen");
  };

  componentWillReceiveProps(nextProp) {
    if (nextProp.screen === "steps") {
      if (this.state.outdatedHistory) {
        this.props.fetchStepsFromPeriod(this.props.user.uid);
        this.setState({ outdatedHistory: false });
      }

      // Performs initial fetch of steps if user logs out and reloads app
      if (!this.state.initialStepFetch && this.props.stepInfo.steps === 0) {
        console.log("Reach!");
        this.fetchStepCountData();
        this.setState({ initialStepFetch: true });
      }
    }
  }

  componentWillUnmount() {
    this.state.stepObserver.remove();
    AppState.removeEventListener("change", this.handleAppStateChange);
  }

  convertSteps = () => {
    /* DO SOMETHING WITH THE STEPS */
    Vibration.vibrate();
    console.log("CONVERTED: ", this.props.stepInfo.stepsToConvert, " STEPS");

    // Uppdaterar Redux state
    this.props.updateStepState(
      this.props.stepInfo.steps,
      this.props.stepInfo.steps,
      0,
      this.props.stepInfo.stepsToAnimate
    );

    // Uppdaterar Firebase
    let inputObj = {
      uid: this.props.user.uid,
      steps: this.props.stepInfo.steps,
      convertedSteps: this.props.stepInfo.steps,
      mode: "active"
    };
    this.props.syncStepsToFirebase(inputObj);

    this.setState({ outdatedHistory: true });
  };

  fetchStepCountData = () => {
    this.setState({ isFetchingSteps: true });

    store.getState().stepInfo.HK.getStepCount({}, (err, results) => {
      if (err) {
        this.setState({ error: err.message });
      } else {
        let steps = Math.round(results.value);

        if (this.props.stepInfo.steps === steps) {
          this.props.updateStepState(
            steps,
            this.props.stepInfo.convertedSteps,
            this.props.stepInfo.stepsToConvert,
            steps
          );
        }

        // Jämför redux med nuvarande
        if (this.props.stepInfo.steps !== steps) {
          let stepsToAnimate = this.props.stepInfo.steps;
          let stepsToConvert = steps - this.props.stepInfo.convertedSteps;

          // Uppdaterar Redux
          this.props.updateStepState(
            steps,
            this.props.stepInfo.convertedSteps,
            stepsToConvert,
            stepsToAnimate
          );
        }
        if (steps !== this.props.stepInfo.steps) {
          // If steps is less than the value stored in redux, a new day is started and converted steps is set to 0
          // TODO: Better check or reset in case of new day
          if (steps < this.props.stepInfo.steps) {
            this.props.updateStepState(steps, 0, steps, steps);
          } else if (steps > this.props.stepInfo.steps) {
            let stepsToAnimate = steps - this.props.stepInfo.steps;
            let stepsToConvert = steps - this.props.stepInfo.convertedSteps;

            // Uppdaterar Redux
            this.props.updateStepState(
              steps,
              this.props.stepInfo.convertedSteps,
              stepsToConvert,
              stepsToAnimate
            );
          }
          // Uppdaterar Firebase
          let inputObj = {
            uid: this.props.user.uid,
            steps: steps,
            convertedSteps: this.props.stepInfo.convertedSteps,
            mode: "active"
          };
          this.props.syncStepsToFirebase(inputObj);
        }

        if (this.props.stepInfo.stepsToConvert === undefined) {
          let stepsToAnimate = this.props.stepInfo.steps;
          let stepsToConvert = steps - this.props.stepInfo.convertedSteps;

          this.props.updateStepState(
            steps,
            this.props.stepInfo.convertedSteps,
            stepsToConvert,
            stepsToAnimate
          );
        }

        this.setState({ isFetchingSteps: false });
      }
    });
  };

  getCurrentDate = () => {
    this.date = new Date().getDate();
    this.month = new Date().getMonth();
    this.months = [
      "JAN",
      "FEB",
      "MAR",
      "APR",
      "MAY",
      "JUN",
      "JUL",
      "AUG",
      "SEP",
      "OCT",
      "NOV",
      "DEC"
    ];
    this.setState({ date: this.date, month: this.months[this.month] });
  };

  onProfileClick = () => {
    this.props.switchScreen("profile");
    this.props.navigation.navigate("ProfileScreen");
  };

  render() {
    if (this.state.isFetchingSteps) {
      // Show spinner
    } else {
      // Dont show spinner
    }

    let curStyle = styles.workingFont;
    if (this.state.error !== "working") {
      curStyle = styles.errorFont;
    }

    return (
      <SafeAreaView style={styles.flexView}>
        <View style={{ height: 115 }}>
          <Header
            currentSteps={this.props.stepInfo.steps}
            lastStepValue={this.props.stepInfo.stepsToAnimate}
            lastConvertedSteps={200}
            date={this.state.date}
            month={this.state.month}
          />
        </View>

        <View style={styles.profilePicRow}>
          <TouchableOpacity
            style={styles.profilePic}
            onPress={() => this.onProfileClick()}
          >
            <Image
              style={styles.picture}
              source={{ uri: this.props.profilePic }}
            />
          </TouchableOpacity>
        </View>

        <StepsToUse stepsToConvert={this.props.stepInfo.stepsToConvert} />

        <TouchableOpacity
          style={styles.compensateButton}
          onPress={() => this.convertSteps()}
        >
          <Text style={styles.compensateText}>CLIMATE COMPENSATE</Text>
          <Icon2
            name="leaf"
            style={styles.compensateIcon}
            color={"#89B037"}
            size={30}
          />
        </TouchableOpacity>

        <View style={{ position: "absolute", bottom: 0 }}>
          <Cards
            steps={this.props.stepInfo.convertedSteps}
            allTimeConverted={this.props.stepInfo.allTimeConverted}
            weeklyConverted={this.props.stepInfo.weeklyConverted}
          />
        </View>
      </SafeAreaView>
    );
  }
}

const mapStateToProps = state => {
  return {
    user: state.user,
    stepInfo: state.stepInfo,
    profilePic: state.user.profilePic,
    screen: state.screen
  };
};

const mapDispatchToProps = dispatch => {
  return {
    initAppleHK: dispatch(initAppleHK),
    updateStepState: (steps, converted, toConvert, toAnimate) =>
      dispatch(updateStepState(steps, converted, toConvert, toAnimate)),
    syncStepsToFirebase: ownProps => dispatch(syncStepsToFirebase(ownProps)),
    loadConvertedSteps: ownProps => dispatch(loadConvertedSteps(ownProps)),
    fetchStepsFromPeriod: uid => dispatch(fetchStepsFromPeriod(uid)),
    switchScreen: ownProps => dispatch(switchScreen(ownProps))
  };
};

export default withNavigation(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(StepScreen)
);

const screenHeight = Dimensions.get("window").height;
const screenWidth = Dimensions.get("window").width;

const styles = StyleSheet.create({
  flexView: {
    flex: 1,
    flexDirection: "column",
    alignItems: "center"
  },
  date: {
    marginTop: 0,
    fontSize: 30,
    color: "#525252"
  },
  profilePicRow: {
    width: screenWidth,
    flexDirection: "row",
    marginTop: -33,
    marginLeft: 20
  },
  profilePic: {
    height: 66,
    width: 66,
    backgroundColor: "#7DA1F5",
    borderRadius: 33,
    borderWidth: 1,
    borderColor: "#FFF",
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.16,
    shadowRadius: 1
  },
  picture: {
    height: 64,
    width: 64,
    borderRadius: 32
  },
  line1: {
    width: 10,
    height: 1,
    backgroundColor: "#525252"
  },
  line2: {
    width: screenWidth - 90,
    height: 1,
    backgroundColor: "#525252"
  },
  stepFont: {
    marginTop: 30,
    fontSize: 100,
    color: "#425891"
  },
  stepsToUseLabel: {
    marginTop: -20,
    fontSize: 20,
    color: "#525252"
  },
  avgFont: {
    fontSize: 16,
    color: "#525252",
    fontWeight: "bold"
  },
  workingFont: {
    fontSize: 14,
    color: "#7CC0F1"
  },
  errorFont: {
    fontSize: 14,
    color: "red"
  },
  compensateButton: {
    backgroundColor: "white",
    width: screenWidth * 0.88,
    //marginTop: 30,
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
    zIndex: 10,
    position: "absolute",
    bottom: 240
  },
  compensateText: {
    marginLeft: 10,
    fontSize: 20,
    color: "#89B037"
  },
  compensateIcon: {
    marginLeft: 10,
    marginRight: 10
  }
});

/*
<Text style={styles.stepFont}>
          {this.props.stepInfo.stepsToConvert}
        </Text>
        <Text style={styles.stepsToUseLabel}>steps to use</Text>

        <Text style={styles.avgFont}>
          Daily Average: {this.props.stepInfo.stepAvg}
        </Text>
        <Text style={curStyle}>Status: {this.state.error}</Text>
*/
