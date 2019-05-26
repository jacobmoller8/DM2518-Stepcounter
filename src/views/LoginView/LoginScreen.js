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
  SafeAreaView,
  Image
} from "react-native";
import { withNavigation } from "react-navigation";
import { connect } from "react-redux";
import { loadUser } from "../../redux/actions/userAction";
import { initAppleHK } from "../../redux/actions/stepActions";
import { switchScreen } from "../../redux/actions/screenActions";

import { firebaseConfig } from "../../firebaseConfig";
import * as firebase from "firebase";
import "firebase/auth";
import { store } from "../../redux/store/store";

class LoginScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      errorMessage: ""
    };
  }

  componentWillReceiveProps(nextProp) {
    if (nextProp.user.uid !== "") {
      this.props.switchScreen("splash");
      this.props.navigation.navigate("SplashScreen");
    }
  }

  checkIfAuthorized = () => {
    var that = this;
    firebase.auth().onAuthStateChanged(function(user) {
      if (user) {
        console.log(user.email + " is now Authorized");
        if (!store.getState().user.isLoadingUser) {
          console.log("trigger in logIn");
          that.props.loadUser(user.uid);
        }
      } else {
        console.log("No account connected");
      }
    });
  };

  onLoginSubmit = () => {
    console.log(this.state.email);
    console.log(this.state.password);
    var that = this;
    firebase
      .auth()
      .signInWithEmailAndPassword(this.state.email, this.state.password)
      .then(this.checkIfAuthorized())
      .catch(function(error) {
        var errorCode = error.code;
        var errorMessage = error.message;
        console.log(errorCode);
        that.setState({ errorMessage: errorMessage });
        console.log(errorMessage);
      });
  };

  onRegisterClick = () => {
    this.props.switchScreen("register");
    this.props.navigation.navigate("RegisterScreen");
  };

  onForgotPassClick = () => {
    this.props.switchScreen("forgotPass");
    this.props.navigation.navigate("ForgotPassScreen");
  };

  render() {
    return (
      <SafeAreaView style={styles.flexView}>
        <KeyboardAvoidingView style={styles.flexView} behavior="padding">
          <Text style={styles.welcomeText}>Welcome to the StepApp!</Text>

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
                this.secondTextInput.focus();
              }}
              blurOnSubmit={false}
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
                this.secondTextInput = input;
              }}
            />
          </View>

          <Text style={styles.errorText}>{this.state.errorMessage}</Text>

          <View style={styles.cardAndLogin}>
            <TouchableOpacity
              style={styles.loginButton}
              onPress={() => this.onLoginSubmit()}
            >
              <Text style={styles.loginText}>LOG IN</Text>
            </TouchableOpacity>
            <View style={styles.card}>
              <TouchableOpacity
                style={{ zIndex: 105 }}
                onPress={() => this.onForgotPassClick()}
              >
                <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
              </TouchableOpacity>
              <Image
                source={require("../../assets/cardNoice.png")}
                style={styles.cardNoiceOverlay}
              />
              <Image source={require("../../assets/turtle.png")} />

              <TouchableOpacity
                style={styles.registerButton}
                onPress={() => this.onRegisterClick()}
              >
                <Text style={styles.registerText}>SIGN UP</Text>
              </TouchableOpacity>
            </View>
          </View>
        </KeyboardAvoidingView>
      </SafeAreaView>
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
    initAppleHK: dispatch(initAppleHK()),
    loadUser: ownProps => dispatch(loadUser(ownProps)),
    switchScreen: ownProps => dispatch(switchScreen(ownProps))
  };
};

export default withNavigation(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(LoginScreen)
);

const screenHeight = Dimensions.get("window").height;
const screenWidth = Dimensions.get("window").width;

const styles = StyleSheet.create({
  flexView: {
    flex: 1,
    alignItems: "center"
  },
  welcomeText: {
    fontSize: 25,
    color: "#455C97",
    marginTop: 30,
    marginBottom: screenHeight * 0.1
  },
  inputLabel: {
    fontSize: 15,
    color: "#455C97",
    marginTop: 15
  },
  textBox: {
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
    marginTop: 5,
    fontSize: 15,
    color: "red"
  },
  cardAndLogin: {
    alignItems: "center",
    position: "absolute",
    bottom: 10
  },
  loginButton: {
    backgroundColor: "white",
    width: screenWidth * 0.88,
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
    zIndex: 103
  },
  loginText: {
    fontSize: 20,
    color: "#455C97"
  },
  card: {
    backgroundColor: "#455C97",
    width: screenWidth - 10,
    height: 230,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    marginTop: -27.5
  },
  cardNoiceOverlay: {
    borderRadius: 10,
    width: screenWidth - 10,
    height: 230,
    position: "absolute"
  },
  forgotPasswordText: {
    marginTop: 15,
    marginBottom: 10,
    fontSize: 15,
    color: "white",
    zIndex: 101
  },
  registerText: {
    marginTop: 30,
    fontSize: 15,
    color: "white",
    fontWeight: "bold",
    textDecorationLine: "underline"
  }
});
