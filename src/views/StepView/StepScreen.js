import React, { Component } from "react";
import { View, Text, StyleSheet, Button, Platform, NativeAppEventEmitter, TouchableOpacity, Dimensions } from "react-native";
import { withNavigation } from 'react-navigation';
import { connect } from "react-redux";
import { store } from '../../redux/store/store'
import { initAppleHK } from '../../redux/actions/stepActions'

import Icon from "react-native-vector-icons/MaterialIcons";
import Icon2 from "react-native-vector-icons/MaterialCommunityIcons";

class StepScreen extends Component {
	constructor(props) {
		super(props)
		this.state = {
			steps: 0,
			error: "working",
			avg: 0,
			stepObserver: null,
			date: "",
			month: ""

		}
	}
	componentWillMount() {
		if (Platform.OS === "ios") {
			this.props.initAppleHK;
		}
		this.getCurrentDate()
	}

	componentWillReceiveProps(nextProp) {
		if (nextProp.stepInfo.status === "initialized") {
			this.fetchStepCountData();
			this.fetchStepCountAvg();
			if (this.state.stepObserver === null) {
				let sub = NativeAppEventEmitter.addListener(
					'change:steps',
					(evt) => {
						this.fetchStepCountData();
					}
				);

				this.setState({ stepObserver: sub })
			}
		}

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
			startDate: lastMonth.toISOString()
		};

		let sum = 0
		let counter = 0

		store.getState().stepInfo.HK.getDailyStepCountSamples(options, (err, results) => {
			if (err) {
				this.setState({ error: err.message })
				return;
			} else {
				results.forEach(function (item) {
					sum += item.value
					counter += 1
				})
			}
			this.setState({ avg: Math.round((sum / counter)) })
		});
	}

	fetchStepCountData = () => {
		console.log("reach this")
		store.getState().stepInfo.HK.getStepCount({}, (err, results) => {
			if (err) {
				this.setState({ error: err.message }); return err
			}
			else {
				this.setState({ steps: results.value })

			}
		})
	}

	getCurrentDate = () => {
		this.date = new Date().getDate();
		this.month = new Date().getMonth();
		this.months = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"]
		this.setState({ date: this.date, month: this.months[this.month] })
	}



	render() {
		console.log(this.state)
		let curStyle = styles.workingFont

		if (this.state.error !== 'working') {
			curStyle = styles.errorFont
		}

		return (
			<View style={styles.flexView}>

				<Text style={styles.date}>{this.state.date} {this.state.month}</Text>


				<View style={styles.stepProgressBar}>
					<Text>Todo Component</Text>
				</View>
				<View style={styles.profilePicRow}>
					<View style={styles.line1}></View>
					<TouchableOpacity style={styles.profilePic} onPress={() => this.props.navigation.navigate("ProfileScreen")}>
						<Icon name="person" color={"#525252"} size={60}></Icon>
					</TouchableOpacity>
					<View style={styles.line2}></View>
				</View>

				<Text style={styles.stepFont}>{this.state.steps}</Text>
				<Text style={styles.stepsToUseLabel}>steps to use</Text>

				<Text style={styles.avgFont}>Daily Average: {this.state.avg}</Text>
				<Text style={curStyle}>Status: {this.state.error}</Text>

				<TouchableOpacity style={styles.compensateButton}>
					<Text style={styles.compensateText}>CLIMATE COMPENSATE</Text>
					<Icon2 name="leaf" style={styles.compensateIcon} color={"#89B037"} size={30}></Icon2>
				</TouchableOpacity>
			</View>
		)
	}
}

const mapStateToProps = state => {
	return {
		user: state.user,
		stepInfo: state.stepInfo
	}
};

const mapDispatchToProps = dispatch => {
	return {
		initAppleHK: dispatch(initAppleHK())

	}
};

export default withNavigation(connect(mapStateToProps, mapDispatchToProps)(StepScreen));

const screenHeight = Dimensions.get('window').height;
const screenWidth = Dimensions.get('window').width;

const styles = StyleSheet.create({
	flexView: {
		flex: 1,
		flexDirection: "column",
		alignItems: "center",
	},
	date: {
		marginTop: 40,
		fontSize: 35,
		color: "#525252"
	},
	stepProgressBar: {
		marginTop: 10,
		width: screenWidth * 0.9,
		height: 70,
		backgroundColor: "#425891"
	},
	profilePicRow: {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: 'flex-start',
		marginTop: -7
	},
	profilePic: {
		height: 80,
		width: 80,
		backgroundColor: "white",
		borderRadius: 50,
		borderWidth: 1,
		borderColor: "#525252",
		alignItems: "center",
		justifyContent: "center"
	},
	line1: {
		width: 10,
		height: 1,
		backgroundColor: "#525252"
	},
	line2: {
		width: screenWidth - 90,
		height: 1,
		backgroundColor: "#525252"
	},
	stepFont: {
		marginTop: 30,
		fontSize: 100,
		color: "#425891",
	},
	stepsToUseLabel: {
		marginTop: -20,
		fontSize: 20,
		color: "#525252",
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
	},
	compensateButton: {
		backgroundColor: "white",
		width: screenWidth * 0.8,
		marginTop: 30,
		height: 60,
		borderRadius: 50,
		flexDirection: "row",
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
	compensateText: {
		marginLeft: 10,
		fontSize: 20,
		color: "#89B037"
	},
	compensateIcon: {
		marginLeft: 10,
		marginRight: 10
	}
});

