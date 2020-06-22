import axios from 'axios';
import baseUrl from '../config/config';

// types
export const GET_NOTEBOOKS = 'templatenote/notebooks/GET_NOTEBOOKS';
export const UPDATE_NOTEBOOK = 'templatenote/notebooks/UPDATE_NOTEBOOK';
export const GET_NOTEBOOK = 'templatenote/notebooks/GET_NOTEBOOK';
export const CREATE_NOTEBOOK = 'templatenote/notebooks/CREATE_NOTEBOOK';

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

export const createNoteBookActionCreator = (createNotebook) => {
	return {
		type: CREATE_NOTEBOOK,
		createNotebook
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

export const updateNoteBook = (userId, notebookId) => async (dispatch) => {
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

export const createNotebook = (userId, name, token) => async (dispatch) => {
	try {
		const res = await axios({
			method: 'POST',
			url: `${baseUrl.url}/users/${userId}/notebooks`,
			data: {
				name,
				userId
			},
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${token}`
			}
		});
		dispatch(createNoteBookActionCreator(res));
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
		case CREATE_NOTEBOOK:
			return {
				...state,
				createNotebook: action.createNotebook
			};
		default:
			return state;
	}
}
