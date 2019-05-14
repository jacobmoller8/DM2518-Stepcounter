import React, { Component } from "react";
import { View, Text, StyleSheet, Button, Platform, NativeAppEventEmitter } from "react-native";
import { withNavigation } from 'react-navigation';
import AppleHealthKit from 'rn-apple-healthkit';


let options = {
    permissions: {
        read: ["Height", "Weight", "StepCount", "DateOfBirth", "BodyMassIndex", "ActiveEnergyBurned"],
        write: ["Height", "Weight", "StepCount", "BodyMassIndex"]
    }
};


let steps = 0;

class StepScreen extends Component {

    componentWillMount() {
        if (Platform.OS === "ios") {
            (
                AppleHealthKit.initHealthKit(options, (err) => { console.log(err) }), AppleHealthKit.initStepCountObserver({}, () => { }))
            console.log("done 1")

        }
    }
    componentDidMount() {
        this.fetchStepCountData()
        NativeAppEventEmitter.addListener(
            'change:steps',
            (evt) => {
                this.fetchStepCountData();
            }
        );
    }

    componentWillUnmount() {
        NativeAppEventEmitter.removeListener('change:steps')
    }

    fetchStepCountData = () => {
        let curDate = new Date(this.curday("-"))

        let options = {
            date: curDate
        };
        
        let test = AppleHealthKit.getStepCount(options, (err, result) => {
            console.log("err: ", err)
            steps = result
        })
        console.log(test)
    }

    curday = (sp) => {
        today = new Date();
        var dd = today.getDate();
        var mm = today.getMonth()+1; //As January is 0.
        var yyyy = today.getFullYear();
        
        if(dd<10) dd='0'+dd;
        if(mm<10) mm='0'+mm;
        return (yyyy+sp+mm+sp+dd);
        };


    render() {
        return (
            <View style={styles.flexView}>
                <Text>StepScreen</Text>
                <Text>Number of steps: {steps}</Text>
            </View>
        )
    }
}

export default withNavigation(StepScreen);




const styles = StyleSheet.create({

    flexView: {
        flex: 1,
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
    }
});
