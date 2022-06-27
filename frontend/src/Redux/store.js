
import { createStore, applyMiddleware, combineReducers } from 'redux';
import postReducer from './postReducer';
import userReducer from './userReducer';
import inputReducer from './inputReducer';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';

const rootReducer = combineReducers({
    postReducer,
    userReducer,
    inputReducer,
});

const store = createStore(
    rootReducer,
    composeWithDevTools(applyMiddleware(thunk))
);

export default store;