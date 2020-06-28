import React from 'react';

import { Typography, Container } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
	root: {
		flexGrow: 1
	}
}));

const Tags = (props) => {
	const classes = useStyles();
	return (
		<Container maxWidth="lg" className={classes.roo}>
			<Typography variant="h2">Tags</Typography>
		</Container>
	);
};

export default Tags;
