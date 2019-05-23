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
  SafeAreaView
} from "react-native";
import { withNavigation } from "react-navigation";
import { connect } from "react-redux";
import { store } from "../../redux/store/store";
import {
  initAppleHK,
  syncStepsToFirebase,
  updateStepState,
  loadConvertedSteps
} from "../../redux/actions/stepActions";
import BackgroundTask from "react-native-background-task";
import Cards from "./CardsScroll";
import ProgressBar from "../../components/ProgressBar";
import Header from "../../components/Header";

import Icon from "react-native-vector-icons/MaterialIcons";
import Icon2 from "react-native-vector-icons/MaterialCommunityIcons";

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
      steps: 0,
      convertedSteps: 0,
      error: "working",
      avg: 0,
      stepObserver: null,
      date: "",
      month: "",
      goal: 10000,
      isFetchingSteps: false
    };
  }
  componentWillMount() {
    if (Platform.OS === "ios") {
      this.props.initAppleHK;
    }
    this.getCurrentDate();
  }

  componentWillReceiveProps(nextProp) {
    console.log("NEXT PROP: ", nextProp);
    if (nextProp.stepInfo.status === "initialized") {
      if (this.state.steps === 0) {
        // Kallas bara om appen startar för första gången, annars tar eventListnern hand om detta
        this.fetchStepCountData();
      }
      if (!nextProp.stepInfo.conStepStatus) {
        this.props.loadConvertedSteps(this.props.user.uid);
      }

      if (nextProp.stepInfo.conStepStatus === "fetched") {
        if (nextProp.stepInfo.convertedSteps > this.state.convertedSteps) {
          this.setState({ convertedSteps: nextProp.stepInfo.convertedSteps });
        }
      }

      if (this.state.avg === 0) {
        this.fetchStepCountAvg();
      }
      if (this.state.stepObserver === null) {
        store.getState().stepInfo.HK.initStepCountObserver({}, () => {});
        let sub = NativeAppEventEmitter.addListener("change:steps", evt => {
          this.fetchStepCountData();
        });

        this.setState({ stepObserver: sub });
      }
    }
  }

  componentDidMount() {
    BackgroundTask.schedule();
  }

  componentWillUnmount() {
    this.state.stepObserver.remove();
  }

  fetchStepCountAvg = () => {
    let curDate = new Date();
    var lastMonth = new Date();

    var prevDate = lastMonth.getDate() - 30;
    lastMonth.setDate(prevDate);

    console.log("last month:", lastMonth, " curDate: ", curDate);

    let options = {
      startDate: lastMonth.toISOString()
    };

    let sum = 0;
    let counter = 0;

    store
      .getState()
      .stepInfo.HK.getDailyStepCountSamples(options, (err, results) => {
        if (err) {
          this.setState({ error: err.message });
          return;
        } else {
          results.forEach(function(item) {
            sum += item.value;
            counter += 1;
          });
        }
        this.setState({ avg: Math.round(sum / counter) });
      });
  };

  convertSteps = () => {
    let stepsToConvert = this.state.steps - this.state.convertedSteps;

    /* DO SOMETHING WITH THE STEPS */
    console.log("CONVERTED: ", stepsToConvert, " STEPS");

    // Uppdaterar lokala state
    this.setState({ convertedSteps: this.state.steps });

    // Uppdaterar Redux state
    this.props.updateStepState(this.state.steps, this.state.steps);

    // Uppdaterar Firebase
    let inputObj = {
      uid: this.props.user.uid,
      steps: this.state.steps,
      convertedSteps: this.state.steps,
      mode: "active"
    };
    this.props.syncStepsToFirebase(inputObj);
  };

  fetchStepCountData = () => {
    this.setState({ isFetchingSteps: true });
    store.getState().stepInfo.HK.getStepCount({}, (err, results) => {
      if (err) {
        this.setState({ error: err.message });
      } else {
        let steps = Math.round(results.value);

        // Uppdaterar State i komponenten
        this.setState({ steps: steps, isFetchingSteps: false });

        // Jämför redux med nuvarande
        if (this.props.stepInfo.steps !== steps) {
          // ----------------------------------------------------------
          // HÄR KAN EN ANIMATION GÖRAS MED SKILLNADEN PÅ STEPS I LOKALA STATE OCH REDUX INNAN DE SYNKAS
          let diff = steps - this.props.stepInfo.steps;
          console.log("Difference to animate: ", diff);
          // ----------------------------------------------------------

          // Om det är en ny dag och användaren kommer in på appen kanske gårdagens steps finns i redux, då körs denna "if"
          if (steps < this.props.stepInfo.steps) {
            this.setState({ convertedSteps: 0 });
          }

          // Uppdaterar Redux
          this.props.updateStepState(
            this.state.steps,
            this.state.convertedSteps
          );

          // Uppdaterar Firebase
          let inputObj = {
            uid: this.props.user,
            steps: steps,
            convertedSteps: this.state.convertedSteps,
            mode: "active"
          };
          this.props.syncStepsToFirebase(inputObj);
        }
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

  render() {
    console.log(this.state);

    if (this.state.isFetchingSteps) {
      console.log("SHOW SPINNER");
    } else {
      console.log("DONT SHOW SPINNER");
    }

    let curStyle = styles.workingFont;
    if (this.state.error !== "working") {
      curStyle = styles.errorFont;
    }

    return (
      <SafeAreaView style={styles.flexView}>
        <View style={{ height: 135 }}>
          <Header
            currentSteps={this.state.steps}
            lastStepValue={0}
            lastConvertedSteps={200}
            date={this.state.date}
            month={this.state.month}
          />
        </View>

        <View style={styles.profilePicRow}>
          <TouchableOpacity
            style={styles.profilePic}
            onPress={() => this.props.navigation.navigate("ProfileScreen")}
          >
            <Image
              style={styles.picture}
              source={{ uri: this.props.profilePic }}
            />
          </TouchableOpacity>
        </View>

        <Text style={styles.stepFont}>
          {this.state.steps - this.state.convertedSteps}
        </Text>
        <Text style={styles.stepsToUseLabel}>steps to use</Text>

        <Text style={styles.avgFont}>Daily Average: {this.state.avg}</Text>
        <Text style={curStyle}>Status: {this.state.error}</Text>

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
          <Cards steps={this.state.steps} />
        </View>
      </SafeAreaView>
    );
  }
}

const mapStateToProps = state => {
  return {
    user: state.user,
    stepInfo: state.stepInfo,
    profilePic: state.user.profilePic
  };
};

const mapDispatchToProps = dispatch => {
  return {
    initAppleHK: dispatch(initAppleHK()),
    updateStepState: (steps, converted) =>
      dispatch(updateStepState(steps, converted)),
    syncStepsToFirebase: ownProps => dispatch(syncStepsToFirebase(ownProps)),
    loadConvertedSteps: ownProps => dispatch(loadConvertedSteps(ownProps))
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
    height: 70,
    width: 70,
    borderRadius: 35
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
