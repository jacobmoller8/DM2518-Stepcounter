import { SET_SPLASH_SCREEN, SET_LOGIN_SCREEN, SET_STEPS_SCREEN, SET_REGISTER_SCREEN, SET_FORGOT_PASS_SCREEN, SET_PROFILE_VIEW } from "../actions/screenActions"

initialState = "splash"

export default function screenReducer(state = initialState, { type, payload }) {
    switch (type) {
        case SET_SPLASH_SCREEN:
            return payload
        case SET_LOGIN_SCREEN:
            return payload
        case SET_STEPS_SCREEN:
            return payload
        case SET_REGISTER_SCREEN:
            return payload
        case SET_FORGOT_PASS_SCREEN:
            return payload
        case SET_PROFILE_VIEW:
            return payload
        default:
            return state;
    }
}