import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  Button,
  Dimensions,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  SafeAreaView,
  Image
} from "react-native";
import { withNavigation } from "react-navigation";
import { connect } from "react-redux";
import { regUser, loadUser } from "../../redux/actions/userAction";
import { saveStepAvg } from "../../redux/actions/stepActions";
import { switchScreen } from "../../redux/actions/screenActions";

import * as firebase from "firebase";
import "firebase/auth";
import { store } from "../../redux/store/store";

class RegisterScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      pin: "",
      email: "",
      password: "",
      errorMessage: "",
      userRegistrated: false
    };
  }

  componentDidMount = () => {
    firebase
      .auth()
      .signOut()
      .then(function() {
        console.log("signed out user");
      })
      .catch(function(error) {
        console.log("ERROR:" + error);
      });
  };

  componentWillReceiveProps(nextProps) {
    if (
      nextProps.user.uid !== "" &&
      nextProps.stepInfo.stepAvgStatus === "not set"
    ) {
      console.log("REACH!");
      console.log(nextProps);
      this.props.saveStepAvg(nextProps.user.uid);
    }
    if (nextProps.stepInfo.stepAvgStatus === "done") {
      this.props.switchScreen("steps");
      this.props.navigation.navigate("StepScreen");
    }
  }

  checkIfAuthorized = () => {
    var that = this;
    firebase.auth().onAuthStateChanged(function(user) {
      if (user) {
        console.log(user.email + " is now Authorized");
        let inputObj = {
          pin: that.state.pin,
          name: that.state.name,
          uid: user.uid,
          email: that.state.email
        };
        if (user.uid !== "" && that.state.userRegistrated === false) {
          that.setState({ userRegistrated: true, uid: user.uid });
          that.props.regUser(inputObj);
        }
      } else {
        console.log("Register failed");
      }
    });
  };

  onRegisterSubmit = () => {
    console.log(this.state.email);
    console.log(this.state.password);
    var that = this;
    firebase
      .auth()
      .createUserWithEmailAndPassword(this.state.email, this.state.password)
      .catch(function(error) {
        var errorCode = error.code;
        var errorMessage = error.message;
        console.log(errorCode);
        that.setState({ errorMessage: errorMessage });
        console.log(errorMessage);
      })
      .then(this.checkIfAuthorized);
  };

  onBackClick = () => {
    this.props.switchScreen("login");
    this.props.navigation.navigate("LoginScreen");
  };

  render() {
    return (
      <KeyboardAvoidingView style={styles.flexView} behavior="padding">
        <View style={styles.topBackground}>
          <Image
            source={require("../../assets/cardNoice.png")}
            style={styles.cardNoiceOverlay}
          />
          <Image
            source={require("../../assets/turtle.png")}
            style={styles.image}
          />

          <Text style={styles.inputLabel}>Sponsor Code</Text>
          <View style={styles.textBox}>
            <TextInput
              onChangeText={pin => this.setState({ pin })}
              value={this.state.pin}
              style={styles.textInput}
              placeholder="1234"
              placeholderTextColor="#757575"
              keyboardType="numbers-and-punctuation"
              returnKeyType="next"
              onSubmitEditing={() => {
                this.secondTextInput.focus();
              }}
              blurOnSubmit={false}
            />
          </View>

          <Text style={styles.inputLabel}>Name</Text>
          <View style={styles.textBox}>
            <TextInput
              onChangeText={name => this.setState({ name })}
              value={this.state.name}
              style={styles.textInput}
              placeholder="John Doe"
              placeholderTextColor="#757575"
              keyboardType="default"
              returnKeyType="next"
              onSubmitEditing={() => {
                this.thirdTextInput.focus();
              }}
              blurOnSubmit={false}
              ref={input => {
                this.secondTextInput = input;
              }}
            />
          </View>

          <Text style={styles.inputLabel}>Email</Text>
          <View style={styles.textBox}>
            <TextInput
              onChangeText={email => this.setState({ email })}
              value={this.state.email}
              style={styles.textInput}
              placeholder="john@doe.com"
              placeholderTextColor="#757575"
              keyboardType="email-address"
              returnKeyType="next"
              onSubmitEditing={() => {
                this.forthTextInput.focus();
              }}
              blurOnSubmit={false}
              ref={input => {
                this.thirdTextInput = input;
              }}
            />
          </View>

          <Text style={styles.inputLabel}>Password</Text>
          <View style={styles.textBox}>
            <TextInput
              onChangeText={password => this.setState({ password })}
              value={this.state.password}
              style={styles.textInput}
              placeholder="********"
              placeholderTextColor="#757575"
              keyboardType="default"
              returnKeyType="done"
              secureTextEntry={true}
              blurOnSubmit={true}
              ref={input => {
                this.forthTextInput = input;
              }}
            />
          </View>
        </View>

        <TouchableOpacity
          style={styles.registerButton}
          onPress={this.onRegisterSubmit}
        >
          <Text style={styles.registerText}>SIGN IN</Text>
        </TouchableOpacity>

        <Text style={styles.errorText}>{this.state.errorMessage}</Text>

        <TouchableOpacity
          style={styles.backButton}
          onPress={() => this.onBackClick()}
        >
          <Text style={styles.registerText}>BACK</Text>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    );
  }
}

const mapStateToProps = state => {
  return {
    user: state.user,
    stepInfo: state.stepInfo
  };
};

const mapDispatchToProps = dispatch => {
  return {
    regUser: ownProps => dispatch(regUser(ownProps)),
    saveStepAvg: ownProps => dispatch(saveStepAvg(ownProps)),
    loadUser: ownProps => dispatch(loadUser(ownProps)),
    switchScreen: ownProps => dispatch(switchScreen(ownProps))
  };
};

export default withNavigation(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(RegisterScreen)
);
const screenHeight = Dimensions.get("window").height;
const screenWidth = Dimensions.get("window").width;

const styles = StyleSheet.create({
  flexView: {
    justifyContent: "center",
    alignItems: "center"
  },
  topBackground: {
    height: screenHeight * 0.8,
    width: screenWidth,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#455C97"
  },
  cardNoiceOverlay: {
    height: screenHeight * 0.8,
    width: screenWidth,
    position: "absolute"
  },
  image: {
    marginTop: 20
  },
  inputLabel: {
    fontSize: 15,
    color: "white",
    marginTop: 15
  },
  textBox: {
    backgroundColor: "white",
    flexDirection: "row",
    alignItems: "center",
    height: 50,
    width: screenWidth * 0.8,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "#455C97"
  },
  textInput: {
    left: 10,
    fontSize: 20,
    color: "#455C97",
    width: screenWidth * 0.6
  },
  errorText: {
    textAlign: "center",
    marginTop: -10,
    fontSize: 15,
    color: "red"
  },
  registerButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    height: 50,
    width: screenWidth * 0.6,
    backgroundColor: "white",
    borderRadius: 40,
    marginTop: -25,
    marginBottom: 30,
    shadowColor: "#000000",
    shadowOffset: {
      width: 1,
      height: 2
    },
    shadowOpacity: 0.5,
    shadowRadius: 2,
    elevation: 1
  },
  registerText: {
    fontSize: 20,
    color: "#455C97"
  },
  backButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    height: 50,
    width: screenWidth * 0.6,
    backgroundColor: "white",
    borderRadius: 40,
    marginTop: 5,
    shadowColor: "#000000",
    shadowOffset: {
      width: 1,
      height: 2
    },
    shadowOpacity: 0.5,
    shadowRadius: 2,
    elevation: 1
  }
});
