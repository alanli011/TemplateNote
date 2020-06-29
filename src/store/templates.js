import axios from 'axios';
import baseUrl from '../config/config';

// types
export const GET_TEMPLATES = 'templatenote/notebooks/notes/GET_TEMPLATES';
export const CREATE_TEMPLATE = 'templatenote/notebooks/notes/CREATE_TEMPLATE';
export const DELETE_TEMPLATE = 'templatenote/notebooks/notes/DELETE_TEMPLATE';

// action creator
export const getTemplatesActionCreator = (templates) => {
	return {
		type: GET_TEMPLATES,
		templates
	};
};

export const createTemplateActionCreator = (createTemplate) => {
	return {
		type: CREATE_TEMPLATE,
		createTemplate
	};
};

export const deleteTemplateActionCreator = (deleteTemplate) => {
	return {
		type: DELETE_TEMPLATE,
		deleteTemplate
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

export const createTemplate = (name, content, userId, token) => async (dispatch) => {
	try {
		const res = await axios({
			method: 'POST',
			url: `${baseUrl.url}/templates`,
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${token}`
			},
			data: {
				name,
				content,
				user_id: userId
			}
		});
		dispatch(createTemplateActionCreator(res.data));
	} catch (error) {
		console.error(error);
	}
};

export const deleteTemplate = (templateId, token) => async (dispatch) => {
	try {
		const res = await axios({
			method: 'DELETE',
			url: `${baseUrl.url}/templates/${templateId}`,
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${token}`
			}
		});
		dispatch(deleteTemplateActionCreator(res.data));
	} catch (error) {
		console.error(error);
	}
};

// reducers
export default function reducer(state = [], action) {
	switch (action.type) {
		case GET_TEMPLATES:
			return [ ...action.templates ];
		case CREATE_TEMPLATE:
			return [ ...state, action.createTemplate ];
		case DELETE_TEMPLATE:
			return state.filter((template) => template.id !== action.deleteTemplate.id);
		default:
			return state;
	}
}
