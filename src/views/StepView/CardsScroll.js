import React, { Component } from "react";
import {
  ScrollView,
  Text,
  View,
  Dimensions,
  StyleSheet,
  Image,
  Animated
} from "react-native";

let screenWidth = Dimensions.get("window").width;

export default class Cards extends Component {
  constructor(props) {
    super(props);

    this.state = {
      scrollX: new Animated.Value(0)
    };
  }

  render() {
    let screenHeight = Dimensions.get("window").height;

    const dotOneBackgroundColor = this.state.scrollX.interpolate({
      inputRange: [0, 414],
      outputRange: ["#98C24F", "#FFF"],
      extrapolate: "clamp"
    });

    const dotTwoBackgroundColor = this.state.scrollX.interpolate({
      inputRange: [0, 414, 828],
      outputRange: ["#FFF", "#98C24F", "#FFF"],
      extrapolate: "clamp"
    });

    const dotThreeBackgroundColor = this.state.scrollX.interpolate({
      inputRange: [414, 828, 1035],
      outputRange: ["#FFF", "#98C24F", "#FFF"],
      extrapolate: "clamp"
    });

    return (
      <View
        style={{
          height: 270
        }}
      >
        <ScrollView
          scrollEventThrottle={16}
          horizontal={true}
          pagingEnabled={true}
          showsHorizontalScrollIndicator={false}
          onScroll={Animated.event([
            { nativeEvent: { contentOffset: { x: this.state.scrollX } } }
          ])}
        >
          <View style={styles.card}>
            <Image
              source={require("./cardNoice.png")}
              style={styles.cardNoiceOverlay}
            />
            <Text style={{ color: "white", fontSize: 80 }}>52,6</Text>
            <Text style={{ color: "white", fontSize: 20 }}>
              km of car emisson
            </Text>
            <Text
              style={{
                color: "white",
                fontSize: 15
              }}
            >
              Today
            </Text>
          </View>
          <View style={styles.card}>
            <Image
              source={require("./cardNoice.png")}
              style={styles.cardNoiceOverlay}
            />
            <Text style={{ color: "white", fontSize: 80 }}>89,9</Text>
            <Text style={{ color: "white", fontSize: 20 }}>
              km of car emisson
            </Text>
            <Text
              style={{
                color: "white",
                fontSize: 15
              }}
            >
              This Week
            </Text>
          </View>
          <View style={styles.card}>
            <Image
              source={require("./cardNoice.png")}
              style={styles.cardNoiceOverlay}
            />
            <Text style={{ color: "white", fontSize: 80 }}>162,8</Text>
            <Text style={{ color: "white", fontSize: 20 }}>
              km of car emisson
            </Text>
            <Text
              style={{
                color: "white",
                fontSize: 15
              }}
            >
              All time
            </Text>
          </View>
        </ScrollView>
        <View
          style={{ flex: 1, flexDirection: "row", justifyContent: "center" }}
        >
          <Animated.View
            style={[styles.dots, { backgroundColor: dotOneBackgroundColor }]}
          />
          <Animated.View
            style={[styles.dots, { backgroundColor: dotTwoBackgroundColor }]}
          />
          <Animated.View
            style={[styles.dots, { backgroundColor: dotThreeBackgroundColor }]}
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#7CA92E",
    marginLeft: 5,
    marginRight: 5,
    width: screenWidth - 10,
    height: 250,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10
  },

  cardNoiceOverlay: {
    borderRadius: 10,
    width: screenWidth - 10,
    height: 250,
    position: "absolute"
  },

  dots: {
    height: 10,
    width: 10,
    borderRadius: 5,
    backgroundColor: "#FFF",
    borderColor: "#7CA92E",
    marginTop: 3,
    marginLeft: 5,
    marginRight: 5,
    borderWidth: 1
  }
});
