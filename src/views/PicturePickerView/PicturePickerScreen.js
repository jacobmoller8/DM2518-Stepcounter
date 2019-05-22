import React, { Component } from "react";
import { View, Text, StyleSheet, Button, Dimensions, TextInput, TouchableOpacity, KeyboardAvoidingView } from "react-native";
import { withNavigation } from 'react-navigation';
import { connect } from "react-redux";

import { updateProfilePic } from "../../redux/actions/userAction";

import CameraRollPicker from 'react-native-camera-roll-picker';

class PicturePickerScreen extends Component {

    constructor(props) {
        super(props);
        this.state = {
        };
    }

    getSelectedImages = (array) => {
        console.log(array[0].uri)
        this.props.updateProfilePic(array[0].uri)
        this.props.navigation.navigate("ProfileScreen")
    }


    render() {
        return (
            <View style={styles.flexView}>
                <CameraRollPicker
                    callback={(array) => this.getSelectedImages(array)}
                    selectSingleItem={true}
                    maximum={1}
                    groupTypes="All"
                    assetType="Photos" />
            </View >
        )
    }
}

const mapStateToProps = state => {
    return {

    }
};

const mapDispatchToProps = dispatch => {
    return {
        updateProfilePic: (picture) => {
            dispatch(updateProfilePic(picture))
        },
    }
};

export default withNavigation(connect(mapStateToProps, mapDispatchToProps)(PicturePickerScreen));

const screenHeight = Dimensions.get('window').height;
const screenWidth = Dimensions.get('window').width;

const styles = StyleSheet.create({

    flexView: {
        justifyContent: "center",
        alignItems: "center",
    },

});