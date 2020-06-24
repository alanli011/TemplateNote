import axios from 'axios';
import baseUrl from '../config/config';

// types
export const GET_NOTEBOOKS = 'templatenote/notebooks/GET_NOTEBOOKS';
export const GET_ONE_NOTEBOOK = 'templatenote/notebooks/GET_ONE_NOTEBOOK';
export const UPDATE_NOTEBOOK = 'templatenote/notebooks/UPDATE_NOTEBOOK';
export const GET_ONE_NOTEBOOK_DATA = 'templatenote/notebooks/GET_ONE_NOTEBOOK_DATA';
export const CREATE_NOTEBOOK = 'templatenote/notebooks/CREATE_NOTEBOOK';
export const DELETE_NOTEBOOK = 'templatenote/notebooks/DELETE_NOTEBOOK';

// action creators
export const getNoteBooksActionCreator = (notebooks) => {
	return {
		type: GET_NOTEBOOKS,
		notebooks
	};
};

export const getOneNoteBookActionCreator = (notebook) => {
	return {
		type: GET_ONE_NOTEBOOK,
		notebook
	};
};

export const getOneNoteBookDataActionCreator = (notebookData) => {
	return {
		type: GET_ONE_NOTEBOOK_DATA,
		notebookData
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

export const deleteNoteBookActionCreator = (deleteNotebook) => {
	return {
		type: DELETE_NOTEBOOK,
		deleteNotebook
	};
};

// Dispatch functions
export const getNoteBooks = (userId) => async (dispatch) => {
	try {
		const res = await axios(`${baseUrl.url}/users/${userId}/notebooks`);
		dispatch(getNoteBooksActionCreator(res.data));
	} catch (error) {
		console.error(error);
	}
};

export const getOneNoteBook = (userId, notebookId) => async (dispatch) => {
	try {
		const res = await axios(`${baseUrl.url}/users/${userId}/notebooks/${notebookId}`);
		dispatch(getOneNoteBookActionCreator(res.data));
	} catch (error) {
		console.error(error);
	}
};

export const getNoteBookData = (userId, notebookId) => async (dispatch) => {
	try {
		const res = await axios(`${baseUrl.url}/users/${userId}/notebooks/${notebookId}/notes`);
		console.log('one notebook: ', res);
		dispatch(getOneNoteBookDataActionCreator(res.data));
	} catch (error) {
		console.error(error);
	}
};

export const updateNoteBook = (userId, notebookId, name, token) => async (dispatch) => {
	try {
		const res = await axios({
			method: 'PUT',
			url: `${baseUrl.url}/users/${userId}/notebooks/${notebookId}`,
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${token}`
			},
			data: {
				name
			}
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
		dispatch(createNoteBookActionCreator(res.data));
	} catch (error) {
		console.error(error);
	}
};

export const deleteNotebook = (notebookId, token) => async (dispatch) => {
	const res = await axios({
		method: 'DELETE',
		url: `${baseUrl.url}/notebooks/${notebookId}`,
		headers: {
			'Content-Type': 'application/json',
			Authorization: `Bearer ${token}`
		}
	});
	dispatch(deleteNoteBookActionCreator(res.data));
};

// reducer
export default function reducer(state = [], action) {
	switch (action.type) {
		case GET_NOTEBOOKS:
			return [ ...action.notebooks ];
		case GET_ONE_NOTEBOOK:
			return {
				...state,
				notebook: action.notebook
			};
		case GET_ONE_NOTEBOOK_DATA:
			return {
				...state,
				notebookNotes: action.notebookData
			};
		case UPDATE_NOTEBOOK:
			return {
				...state,
				updateNotebook: action.updateNoteBook
			};
		case CREATE_NOTEBOOK:
			return [ ...state, action.createNotebook ];
		case DELETE_NOTEBOOK:
			return state.filter((notebook) => notebook.id !== action.deleteNotebook.id);
		default:
			return state;
	}
}
