import React, { useState } from 'react';

import SingleNoteBook from './SingleNotebook';

import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
	root: {
		flexGrow: 1
	},
	maxWidth: {
		width: '100%'
	}
}));

const Notes = (props) => {
	const classes = useStyles();

	return (
		<React.Fragment>
			<div>
				<SingleNoteBook />
			</div>
			<h1>Single Note</h1>
		</React.Fragment>
	);
};

export default Notes;
