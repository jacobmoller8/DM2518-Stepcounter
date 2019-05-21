import React, { Component } from 'react';
import { StyleSheet, Text, View, Dimensions } from 'react-native';

import CameraRollPicker from 'react-native-camera-roll-picker';

export default class PicturePicker extends Component {

    constructor(props) {
        super(props);
        this.state = {
            progress: 0,
            steps: this.props.steps
        };
    }

    getSelectedImages = () => {
        console.log("hi")
    }

    render() {
        return (
            <View style={styles.container}>
                <CameraRollPicker
                    callback={this.getSelectedImages} />

            </View>
        );
    }
}

const screenHeight = Dimensions.get('window').height;
const screenWidth = Dimensions.get('window').width;

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
    }
});