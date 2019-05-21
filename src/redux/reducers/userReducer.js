import { REQUEST_REG_USER, REGISTERED_USER, ERROR_REG_USER, UPDATE_PROFILE_PIC } from '../actions/userAction'


const initialState = {
    name: "",
    email: "",
    age: "",
    profilePic: "https://upload.wikimedia.org/wikipedia/commons/7/7e/Circle-icons-profile.svg"
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
        default:
            return state;
    }
}