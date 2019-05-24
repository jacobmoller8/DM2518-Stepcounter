import { REQUEST_REG_USER, REGISTERED_USER, ERROR_REG_USER, UPDATE_PROFILE_PIC, LOGOUT_USER, LOAD_USER, USER_LOADED, ERROR_LOADING_USER } from '../actions/userAction'


const initialState = {
    uid: "",
    name: "",
    email: "",
    profilePic: "https://freepngimg.com/thumb/mario/20698-7-mario-transparent-background.png",
    isLoadingUser: false
}

export default function userReducer(state = initialState, { type, payload }) {
    switch (type) {
        case REQUEST_REG_USER:
            return { ...state, registered: payload.registered }
        case REGISTERED_USER:
            return { ...state, registered: payload.registered }
        case ERROR_REG_USER:
            return { ...state, registered: payload.registered }
        case UPDATE_PROFILE_PIC:
            return { ...state, profilePic: payload.profilePic }
        case LOAD_USER:
            return { ...state, isLoadingUser: payload.isLoadingUser }
        case USER_LOADED:
            return { ...state, isLoadingUser: payload.isLoadingUser, name: payload.name, email: payload.email, group: payload.group, uid: payload.uid, registered: payload.registered }
        case ERROR_LOADING_USER:
            return { ...state, isLoadingUser: payload.isLoadingUser }
        case LOGOUT_USER:
            return initialState
        default:
            return state;
    }
}