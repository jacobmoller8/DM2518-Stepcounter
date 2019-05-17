import { INIT_APPLE_HK, INITIALIZED_APPLE_HK, ERROR_INIT_APPLE_HK } from '../actions/stepActions'

const initialState = {
    status: 'not initialized',
    HK: null
}

export default function stepReducer(state = initialState, { type, payload }) {
    switch (type) {
        case INIT_APPLE_HK:
            return { ...state, status: payload.status, HK: payload.HK };
        case INITIALIZED_APPLE_HK:
            return { ...state, status: payload.status, HK: payload.HK };
        case ERROR_INIT_APPLE_HK:
            return { ...state, status: payload.status, HK: payload.HK };
        default:
            return state;
    }
}