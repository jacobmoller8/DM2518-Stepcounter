export const REQUEST_REG_USER = "REQUEST_REG_USER";
export const REGISTERED_USER = "REGISTERED_USER";
export const ERROR_REG_USER = "ERROR_REG_USER";
export const UPDATE_PROFILE_PIC = "UPDATE_PROFILE_PIC";

import firebase from 'firebase';
import 'firebase/firestore'


export function regUser(inputObj) {

    let db = firebase.firestore()
    let curDate = new Date().toLocaleDateString()

    return dispatch => {
        dispatch({
            type: REQUEST_REG_USER,
            payload: { registered: false }
        })

        db.collection("users").doc(inputObj.uid).set({
            registered: curDate,
            group: inputObj.pin,
            name: inputObj.name
        })
            .then(function () {
                dispatch({
                    type: REGISTERED_USER,
                    payload: { registered: true }
                })
            })
            .catch(function (error) {
                console.log("error writing user to database: ", error)
                dispatch({
                    type: ERROR_REG_USER,
                    payload: { registered: false }
                })
            });
    }
}

export function updateProfilePic(picture) {
    return dispatch => {
        dispatch({
            type: UPDATE_PROFILE_PIC,
            payload: { profilePic: picture }
        })
    }
}
