import axios from 'axios';
import baseUrl from '../config/config';

// types
export const GET_NOTE = 'templatenote/notebooks/notes/GET_NOTE';

// action creator
export const getNoteActionCreator = (note) => {
	return {
		type: GET_NOTE,
		note
	};
};

// dispatch action
export const getNote = (userId, notebooksId, noteId) => async (dispatch) => {
	try {
		const res = await axios(`${baseUrl.url}/users/${userId}/notebooks/${notebooksId}/notes/${noteId}`);
		console.log(res);
		dispatch(getNoteActionCreator(res.data));
	} catch (error) {
		console.error(error);
	}
};

// reducer

export default function reducer(state = {}, action) {
	switch (action.type) {
		case GET_NOTE:
			return {
				...state,
				note: action.note
			};
		default:
			return state;
	}
}
