import React, { Component } from "react";
import { View, Text, StyleSheet, Button, Dimensions, TextInput, TouchableOpacity, KeyboardAvoidingView, Image } from "react-native";
import { withNavigation } from 'react-navigation';
import { connect } from "react-redux";

class ProfileScreen extends Component {

    constructor(props) {
        super(props);
        this.state = {
            name: "",
            mail: "",
            profilePic: ""
        };
    }


    render() {
        return (
            <View style={styles.flexView}>

                <Image style={styles.image} source={{ uri: this.props.profilePic }}>

                </Image>

                <TouchableOpacity onPress={() => this.props.navigation.navigate("PicturePickerScreen")}>
                    <Text>
                        Pick Picture
                    </Text>
                </TouchableOpacity>


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
    }

});