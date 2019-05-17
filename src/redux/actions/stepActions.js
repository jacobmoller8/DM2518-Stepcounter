import { store } from '../store/store'
import AppleHealthKit from 'rn-apple-healthkit';

export const INIT_APPLE_HK = "INIT_APPLE_HK";
export const ERROR_INIT_APPLE_HK = "ERROR_INIT_APPLE_HK";
export const INITIALIZED_APPLE_HK = "INITIALIZED_APPLE_HK";


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
