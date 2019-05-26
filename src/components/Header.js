import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  Animated,
  Vibration
} from "react-native";

const screenWidth = Dimensions.get("window").width;

export default class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: 0,
      handelingNewSteps: false,
      oldProps: null
    };
  }

  componentDidMount() {
    this.newStepsTicking.addListener(newvalue =>
      this.setState({ value: Math.floor(newvalue.value) })
    );

    this.animateNewStepsTicking();
    this.animateValue();
  }

  componentWillUnmount() {
    this.newStepsTicking.removeAllListeners();
  }

  shouldComponentUpdate() {
    if (this.handelingNewSteps === true) {
      return false;
    } else {
      return true;
    }
  }

  componentWillReceiveProps(newProps) {
    const oldProps = this.props;
    if (newProps.currentSteps !== oldProps.currentSteps) {
      this.setState({ handelingNewSteps: true, oldProps });
      alert(
        "new steps: " + (this.props.currentSteps - this.props.lastStepValue)
      );
      alert(
        "Oldprops:" + (newProps.currentSteps - this.state.oldProps.currentSteps)
      );

      this.animateNewStepsTicking();
      this.animateValue();
    } else {
    }
  }

  newStepsToUse = new Animated.Value(0);

  newStepsTicking = new Animated.Value(
    this.props.lastStepValue !== undefined ? this.props.lastStepValue : 0
  );

  progressWidth = new Animated.Value(
    Math.floor(
      ((this.props.lastStepValue !== undefined ? this.props.lastStepValue : 0) /
        10000) *
        (screenWidth * 0.92)
    )
  );

  animateValue = () => {
    Animated.timing(this.progressWidth, {
      toValue: Math.floor(
        (this.props.currentSteps / 10000) * (screenWidth * 0.92)
      ),
      duration: 2000
    }).start();
  };

  animateNewStepsTicking = () => {
    Animated.sequence([
      Animated.timing(this.newStepsTicking, {
        toValue: this.props.currentSteps,
        duration: 2000
      }),
      Animated.sequence([
        Animated.timing(this.newStepsToUse, {
          toValue: 1,
          duration: 1000
        }),
        Animated.timing(this.newStepsToUse, {
          toValue: 0,
          duration: 3000
        })
      ])
    ]).start(() => {
      this.setState({ handelingNewSteps: false });
    });
  };

  render() {
    return (
      <View style={styles.container}>
        <Text style={{ color: "#505050", fontSize: 25 }}>
          {this.props.date} {this.props.month}
        </Text>
        <View style={styles.progressBar}>
          <Animated.View
            style={[
              styles.progressContainer,
              {
                width: this.progressWidth !== undefined ? this.progressWidth : 0
              }
            ]}
          />
        </View>
        <View style={styles.barStepText}>
          <Animated.Text
            style={{ fontSize: 30, fontWeight: "bold", color: "white" }}
          >
            {this.state.value}
          </Animated.Text>
          <Text style={{ fontSize: 20, color: "white", marginTop: 8 }}>
            /10 000
          </Text>
        </View>
        <Text
          style={{
            fontSize: 10,
            color: "white",
            position: "absolute",
            marginTop: 70
          }}
        >
          steps today
        </Text>
        <Animated.Text
          style={{
            flex: 1,
            color: "#4563A8",
            fontSize: 30,
            fontWeight: "bold",
            position: "absolute",
            marginTop: 100,
            opacity: this.newStepsToUse
          }}
        >
          +{this.props.currentSteps - this.props.lastStepValue}
        </Animated.Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#FFF",
    width: screenWidth,
    shadowColor: "#000000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.16,
    shadowRadius: 1,
    zIndex: 2
  },

  progressBar: {
    flexDirection: "column",
    backgroundColor: "#7DA1F5",
    width: screenWidth * 0.92,
    height: 56,
    justifyContent: "flex-start"
  },

  progressContainer: {
    height: 56,
    backgroundColor: "#4563A8",
    width: 10,
    marginLeft: 0
  },

  barStepText: {
    flex: 1,
    flexDirection: "row",
    position: "absolute",
    marginTop: 40
  }
});
