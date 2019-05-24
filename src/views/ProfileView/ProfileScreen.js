import React, { Component } from "react";
import { View, Text, StyleSheet, Button, Dimensions, TextInput, TouchableOpacity, KeyboardAvoidingView, Image } from "react-native";
import { withNavigation } from 'react-navigation';
import { connect } from "react-redux";
import Icon from "react-native-vector-icons/MaterialIcons";

import { logoutUser } from "../../redux/actions/userAction";
import { resetSteps } from "../../redux/actions/stepActions"

import * as firebase from 'firebase';
import "firebase/auth";

class ProfileScreen extends Component {

    constructor(props) {
        super(props);
        this.state = {
        };
    }

    signOutPressed = () => {

        firebase.auth().signOut().then(() => {
            this.props.logoutUser()
            this.props.resetSteps()
            this.props.navigation.navigate("LoginScreen");
        }).catch((err) => {
            console.log("error " + err)
        })

    }


    render() {
        return (
            <View style={styles.flexView}>

                <Image style={styles.image} source={{ uri: this.props.user.profilePic }}>
                </Image>

                <TouchableOpacity style={styles.editIcon} onPress={() => this.props.navigation.navigate("PicturePickerScreen")}>
                    <Icon name="edit" color={"#455C97"} size={35}></Icon>
                </TouchableOpacity>

                <Text style={styles.nameLabel}>
                    {this.props.user.name}
                </Text>
                <Text style={styles.emailLabel}>
                    {this.props.user.email}
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


                <View style={styles.sponsorView}>
                    <Text style={styles.sponsoredText}>
                        SPONSORED BY
                    </Text>
                    <TouchableOpacity style={styles.sponsorBackground}>
                        <Image
                            source={require("../../assets/cardNoice.png")}
                            style={styles.cardNoiceOverlay}
                        />
                        <View style={{ flexDirection: "row", justifyContent: "center", alignItems: "center" }}>
                            <Image
                                style={styles.kthImage}
                                source={{ uri: "https://pbs.twimg.com/profile_images/972080657542406144/F-zbVzrm.jpg" }}
                            />
                            <View style={{ flexDirection: "column", justifyContent: "center", marginLeft: 10 }}>
                                <Text style={styles.kthText}>Kungliga Tekniska Högskolan</Text>
                                <Text style={styles.studyText}>STEGSTUDIE#23</Text>
                            </View>



                        </View>


                    </TouchableOpacity>
                </View>


            </View >
        )
    }
}

const mapStateToProps = state => {
    return {
        user: state.user
    }
};

const mapDispatchToProps = dispatch => {
    return {
        logoutUser: () => { dispatch(logoutUser()) },
        resetSteps: () => { dispatch(resetSteps()) }

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
        marginTop: -40,
        height: 200,
        width: 200,
        borderRadius: 100,
        borderWidth: 2,
        borderColor: '#455C97'

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
        fontWeight: 'bold',
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
        marginTop: 30,
        fontSize: 25,
        color: "#455C97",
        textDecorationLine: "underline"
    },
    sponsorView: {
        position: "absolute",
        bottom: 10,
        alignItems: "center"
    },
    sponsoredText: {
        marginTop: 20,
        fontSize: 10,
        color: "#455C97"
    },
    sponsorBackground: {
        height: 100,
        borderRadius: 10,
        width: screenWidth - 10,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#455C97"
    },
    cardNoiceOverlay: {
        borderRadius: 10,
        width: screenWidth - 10,
        height: 100,
        position: "absolute"
    },
    kthImage: {
        height: 70,
        width: 70,
        borderRadius: 35,
        borderWidth: 2,
        borderColor: "white"
    },
    kthText: {
        color: "white",
        fontSize: 20
    },
    studyText: {
        color: "white",
        fontSize: 24
    }

});