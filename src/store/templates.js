import axios from 'axios';
import baseUrl from '../config/config';

// types
export const GET_TEMPLATES = 'templatenote/notebooks/notes/GET_TEMPLATES';

// action creator
export const getTemplatesActionCreator = (templates) => {
	return {
		type: GET_TEMPLATES,
		templates
	};
};

// dispatch actions
export const getTemplates = (userId) => async (dispatch) => {
	try {
		const res = await axios(`${baseUrl.url}/users/${userId}/templates`);
		dispatch(getTemplatesActionCreator(res.data));
	} catch (error) {
		console.error(error);
	}
};

// reducers
export default function reducer(state = [], action) {
	switch (action.type) {
		case GET_TEMPLATES:
			return [ ...action.templates ];
		default:
			return state;
	}
}
