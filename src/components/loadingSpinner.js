import React, { Component } from "react";
import { View, Text, Animated } from "react-native";

export default class LoadingSpinner extends Component {
  constructor(props) {
    super(props);

    this.state = {
      spinValue: new Animated.Value(0)
    };
  }
  componentDidMount() {
    this.animateSpinnerDeg();
  }
  animateSpinnerDeg = () => {
    Animated.timing(this.state.spinValue, {
      toValue: 1,
      duration: 4000,
      useNativeDriver: true
    }).start(() => {
      this.state.spinValue.setValue(0);
      this.animateSpinnerDeg();
    });
  };

  render() {
    const degSpin = this.state.spinValue.interpolate({
      inputRange: [0, 1],
      outputRange: ["0deg", "360deg"],
      extrapolate: "clamp"
    });
    return (
      <View>
        <Animated.Image
          style={{ transform: [{ rotate: degSpin }] }}
          source={require("../assets/loading.png")}
        />
      </View>
    );
  }
}
