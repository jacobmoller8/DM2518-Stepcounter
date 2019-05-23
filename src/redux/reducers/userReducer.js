import { REQUEST_REG_USER, REGISTERED_USER, ERROR_REG_USER, UPDATE_PROFILE_PIC, LOAD_USER, LOGOUT_USER } from '../actions/userAction'


const initialState = {
    uid: "",
    name: "",
    email: "",
    profilePic: "https://freepngimg.com/thumb/mario/20698-7-mario-transparent-background.png"
}

export default function userReducer(state = initialState, { type, payload }) {
    switch (type) {
        case REQUEST_REG_USER:
            return { ...state, isRegistering: payload.isRegistering }
        case REGISTERED_USER:
            return { ...state, isRegistering: payload.isRegistering }
        case ERROR_REG_USER:
            return { ...state, isRegistering: payload.isRegistering }
        case UPDATE_PROFILE_PIC:
            return { ...state, profilePic: payload.profilePic }
        case LOAD_USER:
            return { ...state, name: payload.name, uid: payload.uid, email: payload.email, age: payload.age }
        case LOGOUT_USER:
            return initialState
        default:
            return state;
    }
}