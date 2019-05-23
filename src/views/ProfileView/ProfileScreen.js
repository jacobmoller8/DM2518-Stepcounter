import React, { Component } from "react";
import { View, Text, StyleSheet, Button, Dimensions, TextInput, TouchableOpacity, KeyboardAvoidingView, Image } from "react-native";
import { withNavigation } from 'react-navigation';
import { connect } from "react-redux";
import Icon from "react-native-vector-icons/MaterialIcons";

import { logoutUser } from "../../redux/actions/userAction";

import * as firebase from 'firebase';
import "firebase/auth";

class ProfileScreen extends Component {

    constructor(props) {
        super(props);
        this.state = {
            name: "",
            mail: "",
            profilePic: ""
        };
    }

    signOutPressed = () => {

        firebase.auth().signOut().then(() => {
            this.props.logoutUser()
            this.props.navigation.navigate("LoginScreen");
        }).catch((err) => {
            console.log("error " + err)
        })

    }


    render() {
        return (
            <View style={styles.flexView}>

                <Image style={styles.image} source={{ uri: this.props.profilePic }}>
                </Image>

                <TouchableOpacity style={styles.editIcon} onPress={() => this.props.navigation.navigate("PicturePickerScreen")}>
                    <Icon name="edit" color={"#455C97"} size={35}></Icon>
                </TouchableOpacity>

                <Text style={styles.nameLabel}>
                    FirstName LastName
                </Text>
                <Text style={styles.emailLabel}>
                    hello@gmail.com
                </Text>

                <TouchableOpacity style={styles.backButton} onPress={() => this.props.navigation.navigate("StepScreen")}>
                    <Text style={styles.backText}>
                        Back
                    </Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => this.signOutPressed()}>
                    <Text style={styles.signOutButton}>
                        Log out
                    </Text>
                </TouchableOpacity>

                <Text style={styles.sponsoredText}>
                    SPONSORED BY
                </Text>


            </View >
        )
    }
}

const mapStateToProps = state => {
    return {
        profilePic: state.user.profilePic
    }
};

const mapDispatchToProps = dispatch => {
    return {
        logoutUser: () => {
            dispatch(logoutUser())
        },
    }
};

export default withNavigation(connect(mapStateToProps, mapDispatchToProps)(ProfileScreen));

const screenHeight = Dimensions.get('window').height;
const screenWidth = Dimensions.get('window').width;

const styles = StyleSheet.create({

    flexView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    image: {
        height: 200,
        width: 200,
        borderRadius: 100
    },
    editIcon: {
        height: 60,
        width: 60,
        borderRadius: 30,
        borderWidth: 1,
        borderColor: "#455C97",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "white",
        marginTop: -50,
        marginLeft: 130
    },
    nameLabel: {
        fontSize: 30,
        color: "#455C97"
    },
    emailLabel: {
        marginTop: 10,
        fontSize: 20,
        color: "#455C97"
    },
    backButton: {
        marginTop: 30,
        backgroundColor: "white",
        height: 45,
        width: screenWidth * 0.7,
        borderRadius: 40,
        alignItems: "center",
        justifyContent: "center",
        shadowColor: "#000000",
        shadowOffset: {
            width: 2,
            height: 4,
        },
        shadowOpacity: 0.50,
        shadowRadius: 4,
        elevation: 12,
    },
    backText: {
        fontSize: 25,
        color: "#455C97"
    },
    signOutButton: {
        marginTop: 60,
        fontSize: 25,
        color: "#455C97",
        textDecorationLine: "underline"
    },
    sponsoredText: {
        marginTop: 20,
        fontSize: 10,
        color: "#455C97"
    }

});