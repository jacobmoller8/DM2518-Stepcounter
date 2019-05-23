import React, { Component } from "react";
import { StyleSheet, Text, View, Dimensions } from "react-native";

import AnimatedBar from "react-native-animated-bar";

export default class ProgressBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      progress: 0,
      steps: this.props.steps
    };
  }

  componentWillReceiveProps = nextProps => {
    if (this.props.steps !== nextProps.steps) {
      this.calculateProgress(nextProps.steps);
      this.setState({
        steps: nextProps.steps
      });
    }
  };
  calculateProgress = steps => {
    if (steps === 0) {
      this.setState({ progress: 0 });
    } else {
      this.progressResult = steps / this.props.goal;
      this.setState({ progress: this.progressResult });
    }
  };

  render() {
    return (
      <View style={styles.container}>
        <AnimatedBar
          progress={this.state.progress}
          height={56}
          borderWidth={0}
          barColor="#455C97"
          fillColor="#8EADF8"
          duration={1000}
        >
          <View style={styles.row}>
            <Text style={styles.barText}>
              {this.state.steps} / {this.props.goal}
            </Text>
            <Text style={styles.stepsText}>steps</Text>
          </View>
        </AnimatedBar>
      </View>
    );
  }
}

const screenHeight = Dimensions.get("window").height;
const screenWidth = Dimensions.get("window").width;

const styles = StyleSheet.create({
  container: {
    marginTop: 5,
    justifyContent: "center",
    alignItems: "center",
    width: screenWidth * 0.9
  },
  row: {
    justifyContent: "center",
    alignItems: "center"
  },
  barText: {
    marginTop: 10,
    color: "white",
    fontSize: 30
  },
  stepsText: {
    color: "white",
    fontSize: 15,
    justifyContent: "flex-end",
    marginTop: -7
  }
});
