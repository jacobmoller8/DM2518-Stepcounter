import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import thunk from "redux-thunk";

// REDUCERS
import userReducer from "../reducers/userReducer";
import stepReducer from "../reducers/stepReducer";

const persistConfig = {
    key: "root",
    storage: storage,
    keyPrefix: ''
}

const allReducers = combineReducers({
    user: userReducer,
    stepInfo: stepReducer
})

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const persistedReducer = persistReducer(persistConfig, allReducers)

export const store = createStore(persistedReducer, composeEnhancers(applyMiddleware(thunk)));
export const persistor = persistStore(store)