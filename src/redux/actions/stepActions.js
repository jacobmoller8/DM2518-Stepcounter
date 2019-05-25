import { store } from '../store/store'
import firebase from 'firebase';
import 'firebase/firestore'
import AppleHealthKit from 'rn-apple-healthkit';
import BackgroundTask from 'react-native-background-task'
import { switchScreen } from '../actions/screenActions'

export const INIT_APPLE_HK = "INIT_APPLE_HK";
export const ERROR_INIT_APPLE_HK = "ERROR_INIT_APPLE_HK";
export const INITIALIZED_APPLE_HK = "INITIALIZED_APPLE_HK";

export const START_SYNC_TO_FIREBASE = "START_SYNC_TO_FIREBASE"
export const COMPLETE_SYNC_TO_FIREBASE = "COMPLETE_SYNC_TO_FIREBASE"
export const ERROR_SYNC_TO_FIREBASE = "ERROR_SYNC_TO_FIREBASE"

export const REQUEST_CONVERTED_STEPS = "REQUEST_CONVERTED_STEPS"
export const RECIEVE_CONVERTED_STEPS = "RECIEVE_CONVERTED_STEPS"
export const ERROR_CONVERTED_STEPS = "ERROR_CONVERTED_STEPS"

export const UPDATE_STEPS_STATE = "UPDATE_STEPS_STATE"

export const RESET_STEPS = "RESET_STEPS"

export const REQUEST_STEPS_FROM_PERIOD = "REQUEST_STEPS_FROM_PERIOD"
export const RECIEVE_STEPS_FROM_PERIOD = "RECIEVE_STEPS_FROM_PERIOD"
export const ERROR_STEPS_FROM_PERIOD = "ERROR_STEPS_FROM_PERIOD"

export const SET_STEP_AVG = "SET_STEP_AVG"
export const STEP_AVG_SET = "STEP_AVG_SET"
export const ERROR_STEP_AVG = "ERROR_STEP_AVG"

export const LOAD_STEP_AVG = "LOAD_STEP_AVG"
export const STEP_AVG_LOADED = "STEP_AVG_LOADED"
export const ERROR_LOADING_STEP_AVG = "ERROR_LOADING_STEP_AVG"

export const RESET_STEP_REDUCER = "RESET_STEP_REDUCER"

export function initAppleHK() {
    let options = {
        permissions: {
            read: ["StepCount"]
        }
    };

    return dispatch => {

        dispatch({
            type: INIT_APPLE_HK,
            payload: { status: 'initializing', HK: null }
        })

        AppleHealthKit.initHealthKit(options, (err, res) => {
            if (err) {
                dispatch({
                    type: ERROR_INIT_APPLE_HK,
                    payload: { status: 'error', HK: err }
                })
            } else {
                dispatch({
                    type: INITIALIZED_APPLE_HK,
                    payload: { status: 'initialized', HK: AppleHealthKit }
                })
            }
        })

    }
}

export function syncStepsToFirebase(inputObj) {
    let db = firebase.firestore()
    let today = new Date()
    var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    let curDate = new Date().toLocaleDateString()
    let mode = inputObj.mode
    let uid = inputObj.uid
    let steps = inputObj.steps
    let convertedSteps = inputObj.convertedSteps

    return dispatch => {
        dispatch({
            type: START_SYNC_TO_FIREBASE,
            payload: { isSyncing: true }
        })

        db.collection("users/" + uid + "/days").doc(curDate).set({
            steps: steps,
            convertedSteps: convertedSteps,
            lastSync: time
        })
            .then(function () {
                dispatch({
                    type: COMPLETE_SYNC_TO_FIREBASE,
                    payload: { isSyncing: false, lastSync: time }
                })
            }).then(() => {
                if (mode === 'background') {
                    BackgroundTask.finish()
                }
            })
            .catch(function (error) {
                console.log("error syncing user steps to database: ", error)
                dispatch({
                    type: ERROR_SYNC_TO_FIREBASE,
                    payload: { isSyncing: false }
                })
            });
    }

}

export function loadConvertedSteps(uid) {
    let db = firebase.firestore()
    let curDate = new Date().toLocaleDateString()
    var docRef = db.collection("users/" + uid + "/days").doc(curDate);
    return dispatch => {

        dispatch({
            type: REQUEST_CONVERTED_STEPS,
            payload: { conStepStatus: 'fetching' }
        })

        docRef.get().then(function (doc) {
            if (doc.exists) {
                console.log("CONV STEPS FROM FIREBASE: ", doc.data().convertedSteps)
                dispatch({
                    type: RECIEVE_CONVERTED_STEPS,
                    payload: { conStepStatus: 'fetched', convertedSteps: doc.data().convertedSteps }
                })
            } else {
                // doc.data() will be undefined in this case
                console.log("No such document!");
                dispatch({
                    type: ERROR_CONVERTED_STEPS,
                    payload: { conStepStatus: 'no saved converted steps' }
                })
            }
        }).catch(function (error) {
            console.log("Error getting document:", error);
            dispatch({
                type: ERROR_CONVERTED_STEPS,
                payload: { conStepStatus: 'error2' }
            })
        });
    }
}

export function updateStepState(steps, converted, toConvert, toAnimate) {
    return {
        type: UPDATE_STEPS_STATE,
        payload: {
            steps: steps,
            convertedSteps: converted,
            stepsToConvert: toConvert,
            stepsToAnimate: toAnimate
        }
    }
}

export function fetchStepsFromPeriod(uid) {
    let db = firebase.firestore()
    let today = new Date()

    let allTimeSteps = 0
    let allTimeConverted = 0
    let weeklySteps = 0
    let weeklyConverted = 0

    let days = []
    let counter = 0

    return dispatch => {

        dispatch({
            type: REQUEST_STEPS_FROM_PERIOD,
            payload: { stepsFromPeriodStatus: 'fetching' }
        })

        db.collection('users/' + uid + '/days').get()
            .then((snapshot) => {
                snapshot.docs.forEach(doc => {
                    days.push(doc.data())
                })
            }).then(() => {
                days.forEach(day => {
                    if (counter < 7) {
                        weeklySteps += day.steps
                        weeklyConverted += day.convertedSteps
                        counter += 1
                    }
                    allTimeSteps += day.steps
                    allTimeConverted += day.convertedSteps
                })
            }).then(() => {
                dispatch({
                    type: RECIEVE_STEPS_FROM_PERIOD,
                    payload: {
                        stepsFromPeriodStatus: "fetched",
                        allTimeSteps: allTimeSteps,
                        allTimeConverted: allTimeConverted,
                        weeklySteps: weeklySteps,
                        weeklyConverted: weeklyConverted
                    }
                })
            }).catch((err) => {
                console.log('error: ', err)
                dispatch({
                    type: ERROR_STEPS_FROM_PERIOD,
                    payload: { stepsFromPeriodStatus: err }
                })
            })



    }
}


export function saveStepAvg(uid) {
    let db = firebase.firestore()

    var calcAVG = new Promise(function (resolve, reject) {
        var lastMonth = new Date();

        var prevDate = lastMonth.getDate() - 30;
        lastMonth.setDate(prevDate);

        let options = {
            startDate: lastMonth.toISOString()
        };

        let sum = 0;
        let counter = 0;

        store.getState().stepInfo.HK.getDailyStepCountSamples(options, (err, results) => {
            if (err) {
                dispatch({
                    type: ERROR_STEP_AVG,
                    payload: { stepAvgStatus: err }
                })
            } else {
                results.forEach(function (item) {
                    sum += item.value;
                    counter += 1;
                });
                resolve(Math.round(sum / counter))

            }

        })
        let curDate = new Date();

    });


    return dispatch => {
        dispatch({
            type: SET_STEP_AVG,
            payload: { stepAvgStatus: 'calculating' }
        })
        calcAVG.then((res) => {
            db.collection("users").doc(uid).set({
                stepAvg: res
            }, { merge: true })
                .then(function () {
                    dispatch({
                        type: STEP_AVG_SET,
                        payload: { stepAvgStatus: 'done', stepAvg: res }
                    })
                })
                .catch(function (error) {
                    console.log("error syncing user steps to database: ", error)
                    dispatch({
                        type: ERROR_STEP_AVG,
                        payload: { stepAvgStatus: error }
                    })
                });
        }).catch((err) => {
            dispatch({
                type: ERROR_STEP_AVG,
                payload: { stepAvgStatus: err }
            })
        })

    }
}

export function loadStepAvg(uid) {
    let db = firebase.firestore()
    var docRef = db.collection("users").doc(uid);
    return dispatch => {

        dispatch({
            type: LOAD_STEP_AVG,
            payload: { loadingStepAvgSatus: 'loading' }
        })

        docRef.get().then(function (doc) {
            if (doc.exists) {
                dispatch({
                    type: STEP_AVG_LOADED,
                    payload: { loadingStepAvgSatus: 'loaded', stepAvg: doc.data().stepAvg }
                })
            } else {
                // doc.data() will be undefined in this case
                console.log("No such document!");
                dispatch({
                    type: ERROR_LOADING_STEP_AVG,
                    payload: { loadingStepAvgSatus: 'error' }
                })
            }
        }).catch(function (error) {
            console.log("Error getting document:", error);
            dispatch({
                type: ERROR_LOADING_STEP_AVG,
                payload: { loadingStepAvgSatus: 'error' }
            })
        });
    }
}

export function resetSteps() {
    store.dispatch(switchScreen('login'))
    return {
        type: RESET_STEPS
    }
}

export function resetStepReducer() {
    return dispatch => {
        dispatch({
            type: RESET_STEP_REDUCER
        })

    }
}