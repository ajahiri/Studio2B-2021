import { createStore, applyMiddleware, combineReducers } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { composeWithDevTools } from 'redux-devtools-extension';

import authReducer from './reducers/authReducer';
import cameraReducer from './reducers/cameraReducer';

import rootSaga from './sagas/rootSaga';

const sagaMiddleware = createSagaMiddleware();

const middlewares = [sagaMiddleware];

const rootReducer = combineReducers({
  auth: authReducer,
  camera: cameraReducer,
});

const middleware = composeWithDevTools(applyMiddleware(...middlewares));

const store = createStore(rootReducer, middleware);

sagaMiddleware.run(rootSaga);

export default store;
