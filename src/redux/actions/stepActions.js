import { store } from '../store/store'
import firebase from 'firebase';
import 'firebase/firestore'
import AppleHealthKit from 'rn-apple-healthkit';

export const INIT_APPLE_HK = "INIT_APPLE_HK";
export const ERROR_INIT_APPLE_HK = "ERROR_INIT_APPLE_HK";
export const INITIALIZED_APPLE_HK = "INITIALIZED_APPLE_HK";

export const START_SYNC_TO_FIREBASE = "START_SYNC_TO_FIREBASE"
export const COMPLETE_SYNC_TO_FIREBASE = "COMPLETE_SYNC_TO_FIREBASE"
export const ERROR_SYNC_TO_FIREBASE = "ERROR_SYNC_TO_FIREBASE"
export const UPDATE_STEPS_STATE = "UPDATE_STEPS_STATE"

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

export function backgroundSync(inputObj) {

    let db = firebase.firestore()
    let today = new Date()
    var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    let curDate = new Date().toLocaleDateString()
    let uid = inputObj.uid
    let steps = inputObj.steps

    return dispatch => {
        dispatch({
            type: START_SYNC_TO_FIREBASE,
            payload: { isSyncing: true }
        })

        db.collection("users/"+ uid+ "/days").doc(curDate).set({
            steps: steps,
            lastSync: time
        })
            .then(function () {
                dispatch({
                    type: COMPLETE_SYNC_TO_FIREBASE,
                    payload: { isSyncing: false, lastSync: time }
                })
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

export function updateStepState(steps) {
    return {
        type: UPDATE_STEPS_STATE,
        payload: {
            steps: steps
        }
    }
}