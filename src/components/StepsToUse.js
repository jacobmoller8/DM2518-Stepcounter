import React, { Component } from "react";
import { View, Text, Animated, StyleSheet } from "react-native";

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
    this.animateStepsToConvert();
  }

  componentWillReceiveProps(newProps) {
    const oldProps = this.props;
    if (newProps.stepsToConvert !== oldProps.stepsToConvert) {
      this.animateStepsToConvert();
    }
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
      <View style={styles.container}>
        <View
          style={{
            backgroundColor: "#FFF",
            flexDirection: "column",
            alignItems: "center"
          }}
        >
          <Text style={{ fontSize: 90, color: "#4563A8" }}>
            {this.props.stepsToConvert}
          </Text>
          <Text style={{ fontSize: 20, color: "#707070" }}>steps to use</Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    alignItems: "center",
    backgroundColor: "#FFF",
    marginTop: 50
  }
});
