import React from 'react';
import { Link } from 'react-router-dom';

import { Typography, Container, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
	content: {
		flexGrow: 1,
		padding: theme.spacing(3),
		display: 'flex',
		justifyContent: 'center',
		flexDirection: 'column',
		alignItems: 'center',
		textAlign: 'center'
	},
	marginTop: {
		marginTop: theme.spacing(2)
	}
}));

const Home = (props) => {
	// const { isAuthenticated } = useAuth0();
	const classes = useStyles();

	return (
		<Container maxWidth="lg" className={classes.content}>
			<Typography variant="h1">Welcome to TemplateNote</Typography>
			<Typography variant="body1">Let's start by creating a notebook</Typography>
			<Link to="/notebooks">
				<Button variant="contained" color="primary" className={classes.marginTop}>
					create notebook
				</Button>
			</Link>
		</Container>
	);
};

export default Home;
