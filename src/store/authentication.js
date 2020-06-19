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

export default function reducer(state = { currentUser: {} }, action) {
	switch (action.type) {
		case SET_USER:
			return {
				...state,
				currentUser: state.currentUser
			};
		default:
			return state;
	}
}
