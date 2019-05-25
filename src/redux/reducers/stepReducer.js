import { INIT_APPLE_HK, INITIALIZED_APPLE_HK, ERROR_INIT_APPLE_HK, START_SYNC_TO_FIREBASE, COMPLETE_SYNC_TO_FIREBASE, ERROR_SYNC_TO_FIREBASE, UPDATE_STEPS_STATE, REQUEST_CONVERTED_STEPS, RECIEVE_CONVERTED_STEPS, ERROR_CONVERTED_STEPS, RESET_STEPS, REQUEST_STEPS_FROM_PERIOD, RECIEVE_STEPS_FROM_PERIOD, ERROR_STEPS_FROM_PERIOD, SET_STEP_AVG, STEP_AVG_SET, ERROR_STEP_AVG, LOAD_STEP_AVG, STEP_AVG_LOADED, ERROR_LOADING_STEP_AVG, RESET_STEP_REDUCER } from '../actions/stepActions'

const initialState = {
    status: 'not initialized',
    HK: null,
    steps: 0,
    convertedSteps: 0,
    conStepStatus: 'not fetched',
    stepsFromPeriodStatus: 'not fetched',
    stepAvgStatus: 'not set',
    loadingStepAvgSatus: 'not loaded'
}

const logOutState = {
    steps: 0,
    convertedSteps: 0,
    conStepStatus: 'not fetched',
    stepsFromPeriodStatus: 'not fetched',
    stepAvgStatus: 'not set',
    loadingStepAvgSatus: 'not loaded'
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
            return {
                ...state,
                steps: payload.steps,
                convertedSteps: payload.convertedSteps,
                lastSync: payload.lastSync,
                stepsToConvert: payload.stepsToConvert,
                stepsToAnimate: payload.stepsToAnimate
            };
        case REQUEST_CONVERTED_STEPS:
            return { ...state, conStepStatus: payload.conStepStatus };
        case RECIEVE_CONVERTED_STEPS:
            return { ...state, conStepStatus: payload.conStepStatus, convertedSteps: payload.convertedSteps };
        case ERROR_CONVERTED_STEPS:
            return { ...state, conStepStatus: payload.conStepStatus };
        case REQUEST_STEPS_FROM_PERIOD:
            return { ...state, stepsFromPeriodStatus: payload.stepsFromPeriodStatus };
        case RECIEVE_STEPS_FROM_PERIOD:
            return {
                ...state,
                stepsFromPeriodStatus: payload.stepsFromPeriodStatus,
                allTimeSteps: payload.allTimeSteps,
                allTimeConverted: payload.allTimeConverted,
                weeklySteps: payload.weeklySteps,
                weeklyConverted: payload.weeklyConverted
            };
        case ERROR_STEPS_FROM_PERIOD:
            return { ...state, stepsFromPeriodStatus: payload.stepsFromPeriodStatus };
        case SET_STEP_AVG:
            return { ...state, stepAvgStatus: payload.stepAvgStatus };
        case STEP_AVG_SET:
            return { ...state, stepAvgStatus: payload.stepAvgStatus, stepAvg: payload.stepAvg };
        case ERROR_STEP_AVG:
            return { ...state, stepAvgStatus: payload.stepAvgStatus };
        case LOAD_STEP_AVG:
            return { ...state, loadingStepAvgSatus: payload.loadingStepAvgSatus };
        case STEP_AVG_LOADED:
            return { ...state, loadingStepAvgSatus: payload.loadingStepAvgSatus, stepAvg: payload.stepAvg };
        case ERROR_LOADING_STEP_AVG:
            return { ...state, loadingStepAvgSatus: payload.loadingStepAvgSatus };
        case RESET_STEPS:
            return { HK: state.HK, ...logOutState };


        default:
            return state;
    }
}