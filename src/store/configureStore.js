import { createStore, applyMiddleware, combineReducers, compose } from 'redux';
import thunk from 'redux-thunk';
import { createLogger } from 'redux-logger';
import authentication from './authentication';
import toggleDarkMode from './darkMode';
import { notebooksReducer, currentNotebookReducer, singleNotebookReducer } from './notebooks';
import note from './notes';
import tags from './tags';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const logger = createLogger();

const reducer = combineReducers({
	authentication,
	toggleDarkMode,
	notebooks: notebooksReducer,
	currentNotebook: currentNotebookReducer,
	notebook: singleNotebookReducer,
	note,
	tags
});

const configureStore = (initialState) => {
	return createStore(reducer, initialState, composeEnhancers(applyMiddleware(thunk, logger)));
};

export default configureStore;
