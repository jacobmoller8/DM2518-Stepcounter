import { INIT_APPLE_HK, INITIALIZED_APPLE_HK, ERROR_INIT_APPLE_HK, START_SYNC_TO_FIREBASE, COMPLETE_SYNC_TO_FIREBASE, ERROR_SYNC_TO_FIREBASE, UPDATE_STEPS_STATE, REQUEST_CONVERTED_STEPS, RECIEVE_CONVERTED_STEPS, ERROR_CONVERTED_STEPS, RESET_STEPS } from '../actions/stepActions'

const initialState = {
    status: 'not initialized',
    HK: null,
    steps: 0,
    convertedSteps: 0
}

export default function stepReducer(state = initialState, { type, payload }) {
    switch (type) {
        case INIT_APPLE_HK:
            return { ...state, status: payload.status, HK: payload.HK };
        case INITIALIZED_APPLE_HK:
            return { ...state, status: payload.status, HK: payload.HK };
        case ERROR_INIT_APPLE_HK:
            return { ...state, status: payload.status, HK: payload.HK };
        case START_SYNC_TO_FIREBASE:
            return { ...state, isSyncing: payload.isSyncing };
        case COMPLETE_SYNC_TO_FIREBASE:
            return { ...state, isSyncing: payload.isSyncing, lastSync: payload.lastSync };
        case ERROR_SYNC_TO_FIREBASE:
            return { ...state, isSyncing: payload.isSyncing };
        case UPDATE_STEPS_STATE:
            return { ...state, steps: payload.steps, convertedSteps: payload.convertedSteps, lastSync: payload.lastSync };
        case REQUEST_CONVERTED_STEPS:
            return { ...state, conStepStatus: payload.conStepStatus };
        case RECIEVE_CONVERTED_STEPS:
            return { ...state, conStepStatus: payload.conStepStatus, convertedSteps: payload.convertedSteps };
        case ERROR_CONVERTED_STEPS:
            return { ...state, conStepStatus: payload.conStepStatus };
        case RESET_STEPS:
            return initialState;
        default:
            return state;
    }
}