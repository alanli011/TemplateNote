import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toggleDarkMode } from '../store/darkMode';

import { Switch, ListItemText, ListItemIcon, Typography } from '@material-ui/core';

const Mode = (props) => {
	const dispatch = useDispatch();
	const darkState = useSelector((state) => state.toggleDarkMode.darkThemeEnabled);

	// on change function to handle the toggle of darkmode/lightmode
	const handleThemeChange = () => {
		dispatch(toggleDarkMode());
	};
	return (
		<React.Fragment>
			<ListItemIcon>
				<Switch checked={darkState} onChange={handleThemeChange} />
			</ListItemIcon>
			<ListItemText>
				<Typography variant="subtitle1">{darkState ? 'Toggle Light Mode' : 'Toggle Dark Mode'}</Typography>
			</ListItemText>
		</React.Fragment>
	);
};

export default Mode;
