import axios from 'axios';
import baseUrl from '../config/config';

// types
export const GET_NOTE = 'templatenote/notebooks/notes/GET_NOTE';
export const DELETE_NOTE = 'templatenote/notebooks/notes/DELETE_NOTE';
export const CREATE_NOTE = 'templatenote/notebooks/notes/CREATE_NOTE';
export const UPDATE_NOTE = 'templatenote/notebooks/notes/UPDATE_NOTE';

// action creator
export const getNoteActionCreator = (note) => {
	return {
		type: GET_NOTE,
		note
	};
};

export const deleteNoteActionCreator = (deleteNote) => {
	return {
		type: DELETE_NOTE,
		deleteNote
	};
};

export const createNoteActionCreator = (createNote) => {
	return {
		type: CREATE_NOTE,
		createNote
	};
};

export const updateNoteActionCreator = (updateNote) => {
	return {
		type: UPDATE_NOTE,
		updateNote
	};
};

// dispatch action
export const getNote = (userId, notebooksId, noteId) => async (dispatch) => {
	try {
		const res = await axios(`${baseUrl.url}/users/${userId}/notebooks/${notebooksId}/notes/${noteId}`);
		dispatch(getNoteActionCreator(res.data));
	} catch (error) {
		console.error(error);
	}
};

export const deleteNote = (notebooksId, noteId, token) => async (dispatch) => {
	try {
		const res = await axios({
			method: 'DELETE',
			url: `${baseUrl.url}/notebooks/${notebooksId}/notes/${noteId}`,
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${token}`
			}
		});
		dispatch(deleteNoteActionCreator(res.data));
	} catch (error) {
		console.error(error);
	}
};

export const createNote = (notebookId, title, content, token) => async (dispatch) => {
	try {
		const res = await axios({
			method: 'POST',
			url: `${baseUrl.url}/notebooks/${notebookId}/notes`,
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${token}`
			},
			data: {
				title,
				content,
				notebookId
			}
		});
		dispatch(createNoteActionCreator(res.data));
	} catch (error) {
		console.error(error);
	}
};

export const updateNote = (userId, notebookId, noteId, title, content, token) => async (dispatch) => {
	try {
		const res = await axios({
			method: 'PUT',
			url: `${baseUrl.url}/users/${userId}/notebooks/${notebookId}/notes/${noteId}`,
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${token}`
			},
			data: {
				title,
				content,
				notebookId
			}
		});
		dispatch(updateNoteActionCreator(res.data));
	} catch (error) {
		console.error(error);
	}
};

// reducer
export default function reducer(state = { deleteNote: [], updateNote: {} }, action) {
	switch (action.type) {
		case GET_NOTE:
			return {
				...state,
				note: action.note
			};
		case DELETE_NOTE:
			return { deleteNote: [ ...state.deleteNote.filter((note) => note !== action.deleteNote) ] };
		case CREATE_NOTE:
			return [ ...state, action.createNote ];
		case UPDATE_NOTE:
			return {
				...state,
				updateNote: action.updateNote
			};
		default:
			return state;
	}
}
