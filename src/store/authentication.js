// types
export const SET_USER = 'templatenote/authentication/SET_USER';
export const SET_TOKEN = 'templatenote/authentication/SET_TOKEN';

// action creators
export const setUserActionCreator = (currentUser) => {
	return {
		type: SET_USER,
		currentUser
	};
};

export const setTokenActionCreator = (token) => {
	return {
		type: SET_TOKEN,
		token
	};
};

// dispatch functions
export const setUser = (user) => (dispatch) => {
	dispatch(setUserActionCreator(user));
};

export const setToken = (token) => (dispatch) => {
	dispatch(setTokenActionCreator(token));
};

// reducers
export default function reducer(state = {}, action) {
	switch (action.type) {
		case SET_USER:
			return {
				...state,
				currentUser: action.currentUser
			};
		case SET_TOKEN:
			return {
				...state,
				token: action.token
			};
		default:
			return state;
	}
}
