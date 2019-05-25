export const REQUEST_REG_USER = "REQUEST_REG_USER";
export const REGISTERED_USER = "REGISTERED_USER";
export const ERROR_REG_USER = "ERROR_REG_USER";
export const UPDATE_PROFILE_PIC = "UPDATE_PROFILE_PIC";
export const LOAD_USER = "LOAD_USER";
export const USER_LOADED = "USER_LOADED";
export const ERROR_LOADING_USER = "ERROR_LOADING_USER";
export const LOGOUT_USER = "LOGOUT_USER";

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
            name: inputObj.name,
            email: inputObj.email

        }).then(function () {
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

    if (picture === "") {
        var picture = "https://upload.wikimedia.org/wikipedia/commons/7/7e/Circle-icons-profile.svg"
    }

    return dispatch => {
        dispatch({
            type: UPDATE_PROFILE_PIC,
            payload: { profilePic: picture }
        })
    }
}

export function loadUser(uid) {
    let db = firebase.firestore()
    var docRef = db.collection("users/").doc(uid);

    return dispatch => {

        dispatch({
            type: LOAD_USER,
            payload: { isLoadingUser: true }
        })

        docRef.get().then(function (doc) {
            if (doc.exists) {
                dispatch({
                    type: USER_LOADED,
                    payload: {
                        isLoadingUser: false,
                        uid: uid,
                        group: doc.data().group,
                        name: doc.data().name,
                        email: doc.data().email,
                        registered: doc.data().registered
                    }
                })
            } else {
                // doc.data() will be undefined in this case
                console.log("No such document!");
                dispatch({
                    type: ERROR_LOADING_USER,
                    payload: { isLoadingUser: 'error'}
                })
            }
        }).catch(function (error) {
            console.log("Error getting document:", error);
            dispatch({
                type: ERROR_LOADING_USER,
                payload: { isLoadingUser: 'error'}
            })
        });
    }

}

export function logoutUser() {
    return {
        type: LOGOUT_USER
    }
}