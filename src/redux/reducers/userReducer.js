import { REQUEST_REG_USER, REGISTERED_USER, ERROR_REG_USER } from '../actions/userAction'


const initialState = {
    name: "",
    email: "",
    age: "",
    sex: "",
}

export default function userReducer(state = initialState, { type, payload }) {
    switch (type) {
        case REQUEST_REG_USER:
            return { ...state, isRegistering: payload.isRegistering }
        case REGISTERED_USER:
            return { ...state, isRegistering: payload.isRegistering }
        case ERROR_REG_USER:
            return { ...state, isRegistering: payload.isRegistering }
        default:
            return state;
    }
}