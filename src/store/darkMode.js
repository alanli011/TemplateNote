export const TOGGLE_DARK_MODE = 'templatenote/theme/TOGGLE_DARK_MODE';

export const toggleDarkMode = () => {
	return {
		type: TOGGLE_DARK_MODE
	};
};

export default function reducer(state = { darkThemeEnabled: false }, action) {
	switch (action.type) {
		case TOGGLE_DARK_MODE:
			return {
				...state,
				darkThemeEnabled: !state.darkThemeEnabled
			};
		default:
			return state;
	}
}
