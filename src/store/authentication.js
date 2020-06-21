export const SET_USER = 'templatenote/authentication/SET_USER';

export const setUser = (currentUser) => {
	return {
		type: SET_USER,
		currentUser
	};
};

export const getUser = (user) => (dispatch) => {
	dispatch(setUser(user));
};

export default function reducer(state = {}, action) {
	switch (action.type) {
		case SET_USER:
			return {
				...state,
				currentUser: action.currentUser
			};
		default:
			return state;
	}
}
