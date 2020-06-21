import axios from 'axios';
import baseUrl from '../config/config';

// types
export const GET_NOTEBOOKS = 'templatenote/notebooks/GET_NOTEBOOKS';
export const UPDATE_NOTEBOOK = 'templatenote/notebooks/UPDATE_NOTEBOOK';
export const GET_NOTEBOOK = 'templatenote/notebooks/GET_NOTEBOOK';

// action creators
export const getNoteBooksActionCreator = (notebooks) => {
	return {
		type: GET_NOTEBOOKS,
		notebooks
	};
};

export const getOneNoteBookActionCreator = (notebook) => {
	return {
		type: GET_NOTEBOOK,
		notebook
	};
};

export const updateNoteBookActionCreator = (updateNotebook) => {
	return {
		type: UPDATE_NOTEBOOK,
		updateNotebook
	};
};

// Dispatch functions
export const getNoteBooks = (userId) => async (dispatch) => {
	try {
		const res = await axios(`${baseUrl.url}/users/${userId}/notebooks`);
		console.log(res);
		dispatch(getNoteBooksActionCreator(res));
	} catch (error) {
		console.error(error);
	}
};

export const getNoteBook = (userId, notebookId) => async (dispatch) => {
	try {
		const res = await axios(`${baseUrl.url}/users/${userId}/notebooks/${notebookId}`);
		console.log('one notebook: ', res);
		dispatch(getOneNoteBookActionCreator(res));
	} catch (error) {
		console.error(error);
	}
};

export const updateNoteBooks = (userId, notebookId) => async (dispatch) => {
	try {
		const res = await axios({
			method: 'PUT',
			url: `${baseUrl.url}/users/${userId}/notebooks/${notebookId}`
			// need to include the data object with the response from a form??
		});
		dispatch(updateNoteBookActionCreator(res));
	} catch (error) {
		console.error(error);
	}
};

// reducer
export default function reducer(state = { notebooks: {} }, action) {
	switch (action.type) {
		case GET_NOTEBOOKS:
			return {
				...state,
				notebooks: action.notebooks
			};
		case GET_NOTEBOOK:
			return {
				...state,
				notebook: action.notebook
			};
		default:
			return state;
	}
}
