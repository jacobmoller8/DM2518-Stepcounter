import React, { Component } from "react";
import { View, Text, StyleSheet, Button, Platform, NativeAppEventEmitter, TouchableOpacity } from "react-native";
import { withNavigation } from 'react-navigation';
import AppleHealthKit from 'rn-apple-healthkit';


let options = {
	permissions: {
		read: ["Height", "Weight", "StepCount", "DateOfBirth", "BodyMassIndex", "ActiveEnergyBurned"],
		write: ["Height", "Weight", "StepCount", "BodyMassIndex"]
	}
};



class StepScreen extends Component {
	constructor(props) {
		super(props)
		this.state = {
			steps: 0,
			error: "working",
			avg: 0
		}
	}
	componentWillMount() {
		if (Platform.OS === "ios") {
			AppleHealthKit.initHealthKit(options, (err, res) => {
				if (err) { this.setState({ error: err }); return } else {
					AppleHealthKit.initStepCountObserver({}, () => { })
					this.fetchStepCountAvg();
				}
			})


		}
	}
	componentDidMount() {
		let sub = NativeAppEventEmitter.addListener(
			'change:steps',
			(evt) => {
				this.fetchStepCountData();
			}
		);

		this.setState({ stepObserver: sub })
	}

	componentWillUnmount() {
		this.state.stepObserver.remove()
	}


	fetchStepCountAvg = () => {
		let curDate = new Date();
		var lastMonth = new Date();

		var prevDate = lastMonth.getDate() - 30;
		lastMonth.setDate(prevDate);

		console.log("last month:", lastMonth, " curDate: ", curDate)

		let options = {
			startDate: lastMonth.toISOString(), // required
			endDate: (new Date).toISOString() // optional; default now
		};



		AppleHealthKit.getDailyStepCountSamples(options, (err, results) => {
			if (err) {
				this.setState({ error: err })
				return;
			} else {
				this.setState({ avg: results[0].value })
			}
		});
	}

	fetchStepCountData = () => {
		AppleHealthKit.getStepCount({}, (err, results) => {
			if (err) { this.setState({ error: err }); return err }
			else {
				this.setState({ steps: results.value })

			}
		})

	}


	render() {
		let curStyle = styles.workingFont

		if (this.state.error !== 'working') {
			curStyle = styles.errorFont
		}

		return (
			<View style={styles.flexView}>
				<Text style={styles.stepFont}>Number of steps: {this.state.steps}</Text>
				<Text style={styles.avgFont}>Daily Average: {this.state.avg}</Text>
				<Text style={curStyle}>Status: {this.state.error}</Text>
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
	},
	stepFont: {
		fontSize: 20,
		color: "#525252",
		fontWeight: 'bold'
	},
	avgFont: {
		fontSize: 16,
		color: "#525252",
		fontWeight: 'bold'
	},
	workingFont: {
		fontSize: 14,
		color: "#7CC0F1"
	},
	errorFont: {
		fontSize: 14,
		color: "red"
	}
});

