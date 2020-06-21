import axios from 'axios';
import baseUrl from '../config/config';

// types
export const GET_NOTEBOOKS = 'templatenote/notebooks/GET_NOTEBOOK';

// action creators
export const getNoteBooksActionCreator = (notebooks) => {
	return {
		type: GET_NOTEBOOKS,
		notebooks
	};
};

export const getNoteBooks = (userId) => async (dispatch) => {
	const res = await axios({
		url: `${baseUrl.url}/users/${userId}/notebooks`
	});
	dispatch(getNoteBooksActionCreator(res));
};

// reducer
export default function reducer(state = { notebooks: {} }, action) {
	switch (action.type) {
		case GET_NOTEBOOKS:
			return {
				...state,
				notebooks: action.notebooks
			};
		default:
			return state;
	}
}
