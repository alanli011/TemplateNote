import axios from 'axious';
import baseUrl from '../config/config';

// types
export const GET_TAGS = 'templatenote/notebooks/notes/GET_TAGS';

// action creator
export const getTagsActionCreator = (tags) => {
	return {
		type: GET_TAGS,
		tags
	};
};

// dispatch actions
export const getTags = () => async (dispatch) => {
	try {
		const res = await axios(`${baseUrl.url}/tags`);
		dispatch(getTagsActionCreator(res.data));
	} catch (error) {
		console.error(error);
	}
};

// reducers
export default function reducer(state = [], action) {
	switch (action.type) {
		case GET_TAGS:
			return [ ...action.getTags ];
		default:
			return state;
	}
}
