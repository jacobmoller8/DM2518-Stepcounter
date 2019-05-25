import React, { Component } from "react";
import { View, Text, Animated } from "react-native";

export default class StepsToUse extends Component {
  constructor(props) {
    super(props);

    this.state = {
      value: 0
    };
  }

  componentDidMount() {
    this.stepsToConvert.addListener(newvalue => {
      this.setState({ value: Math.floor(newvalue.value) });
    });
  }

  componentWillReceiveProps() {
    this.animateStepsToConvert();
  }

  componentWillUnmount() {
    this.stepsToConvert.removeAllListeners();
  }

  stepsToConvert = new Animated.Value(this.props.stepsToConvert);

  animateStepsToConvert = () => {
    if (this.props.stepsToConvert !== undefined) {
      Animated.timing(this.stepsToConvert, {
        toValue: this.props.stepsToConvert,
        duration: 2000
      });
    }
  };

  render() {
    return (
      <View>
        <Text>{this.props.stepsToConvert}</Text>
        <Text>steps to use</Text>
      </View>
    );
  }
}
