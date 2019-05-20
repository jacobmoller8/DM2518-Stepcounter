export const REQUEST_REG_USER = "REQUEST_REG_USER";
export const REGISTERED_USER = "REGISTERED_USER";
export const ERROR_REG_USER = "ERROR_REG_USER";

import firebase from 'firebase';
import 'firebase/firestore'


export function regUser() {
    let uid = firebase.auth().currentUser.uid
    
    let db = firebase.firestore()
    let curDate = new Date()
    let dateString = curDate.toDateString()

    return dispatch => {
        dispatch({
            type: REQUEST_REG_USER,
            payload: {registered: false}
        })

        db.collection("users").doc(uid).set({
            registered: dateString
        })
            .then(function () {
                dispatch({
                    type: REGISTERED_USER,
                    payload: {registered: true}
                })
            })
            .catch(function (error) {
                console.log("error writing user to database: ", error)
                dispatch({
                    type: ERROR_REG_USER,
                    payload: {registered: false}
                })
            });
    }
}