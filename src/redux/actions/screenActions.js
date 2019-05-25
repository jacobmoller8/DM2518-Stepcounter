export const SET_SPLASH_SCREEN = "SET_SPLASH_SCREEN"
export const SET_LOGIN_SCREEN = "SET_LOGIN_SCREEN"
export const SET_REGISTER_SCREEN = "SET_REGISTER_SCREEN"
export const SET_STEPS_SCREEN = "SET_STEPS_SCREEN"
export const SET_FORGOT_PASS_SCREEN = "SET_FORGOT_PASS_SCREEN"
export const SET_PROFILE_VIEW = "SET_PROFILE_VIEW"

export function switchScreen(screen){
    if (screen === "splash"){
        return {
            type: SET_SPLASH_SCREEN,
            payload: 'splash'
        }
    }else if(screen === "login"){
        return {
            type: SET_LOGIN_SCREEN,
            payload: 'login'
        }
    }else if(screen === "register"){
        return {
            type: SET_REGISTER_SCREEN,
            payload: 'register'
        }
    }else if(screen === "steps"){
        return {
            type: SET_STEPS_SCREEN,
            payload: 'steps'
        }
    }else if(screen === "forgotPass"){
        return {
            type: SET_FORGOT_PASS_SCREEN,
            payload: 'forgotPass'
        }
    }else if(screen === "profile"){
        return {
            type: SET_PROFILE_VIEW,
            payload: 'profile'
        }
    }
}
