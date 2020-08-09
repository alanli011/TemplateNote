import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toggleDarkMode } from '../store/darkMode';

import { Switch, ListItemText, ListItemIcon, Typography } from '@material-ui/core';
import EmojiObjectsIcon from '@material-ui/icons/EmojiObjects';
import Brightness2Icon from '@material-ui/icons/Brightness2';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
	yellow: {
		color: 'yellow'
	},
	darkBlue: {
		color: 'darkblue'
	}
}));

const Mode = (props) => {
	const dispatch = useDispatch();
	const darkState = useSelector((state) => state.toggleDarkMode.darkThemeEnabled);

	// on change function to handle the toggle of darkmode/lightmode
	const handleThemeChange = () => {
		dispatch(toggleDarkMode());
	};

	const classes = useStyles();

	return (
		<React.Fragment>
			<ListItemIcon>
				{darkState ? (
					<EmojiObjectsIcon className={classes.yellow} />
				) : (
					<Brightness2Icon className={classes.darkBlue} />
				)}
			</ListItemIcon>
			<ListItemText>
				{/* if darkState is true, then show Toggle Light Mode text */}
				<Typography variant="subtitle1">{darkState ? 'Toggle Light Mode' : 'Toggle Dark Mode'}</Typography>
			</ListItemText>
			{/* Switch component from material ui */}
			<Switch checked={darkState} onChange={handleThemeChange} />
		</React.Fragment>
	);
};

export default Mode;
