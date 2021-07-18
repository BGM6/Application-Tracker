import {applyMiddleware, compose, createStore} from 'redux';
import reducers from './reducers';
import thunk from 'redux-thunk';

const initialState = {};

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
	reducers,
	initialState,
	composeEnhancers(applyMiddleware(thunk))
);

export default store;