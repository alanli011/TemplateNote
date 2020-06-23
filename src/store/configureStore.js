import { createStore, applyMiddleware, combineReducers, compose } from 'redux';
import thunk from 'redux-thunk';
import { createLogger } from 'redux-logger';
import authentication from './authentication';
import toggleDarkMode from './darkMode';
import notebooks from './notebooks';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const logger = createLogger();

const reducer = combineReducers({
	authentication,
	toggleDarkMode,
	notebooks
});

const configureStore = (initialState) => {
	return createStore(reducer, initialState, composeEnhancers(applyMiddleware(thunk, logger)));
};

export default configureStore;
