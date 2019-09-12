import { createStore, applyMiddleware, compose } from 'redux'
import {getRootReducer, rootSaga} from 'modules'
import createSagaMiddleware from 'redux-saga';

const sagaMiddleware = createSagaMiddleware()

const initialState = {}
const middleware = [
  sagaMiddleware,
]

let composeEnhancers = compose;
if (process.env.NODE_ENV === 'development' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) {
  composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__;
}

const composedEnhancers = composeEnhancers(
  applyMiddleware(...middleware),
)

const store = createStore(
  getRootReducer(),
  initialState,
  composedEnhancers
)

sagaMiddleware.run(rootSaga);

export default store
