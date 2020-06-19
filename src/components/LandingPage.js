import React from 'react';
// import { useSelector } from 'react-redux';

import { Paper, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
	root: {
		flexGrow: 1
	}
}));

function LandingPage(props) {
	const classes = useStyles();

	return (
		<React.Fragment>
			<Paper className={classes.root}>
				<Typography variant="h1">Landing Page</Typography>
			</Paper>
		</React.Fragment>
	);
}

export default LandingPage;
