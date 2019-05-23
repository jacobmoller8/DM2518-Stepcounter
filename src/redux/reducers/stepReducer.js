import { INIT_APPLE_HK, INITIALIZED_APPLE_HK, ERROR_INIT_APPLE_HK, START_SYNC_TO_FIREBASE, COMPLETE_SYNC_TO_FIREBASE, ERROR_SYNC_TO_FIREBASE, UPDATE_STEPS_STATE } from '../actions/stepActions'

const initialState = {
    status: 'not initialized',
    HK: null,
    steps: 0
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
        case ERROR_SYNC_TO_FIREBASE:
            return { ...state, isSyncing: payload.isSyncing };
        case UPDATE_STEPS_STATE:
            return { ...state, steps: payload.steps, convertedSteps: payload.convertedSteps, lastSync: payload.lastSync };
        default:
            return state;
    }
}