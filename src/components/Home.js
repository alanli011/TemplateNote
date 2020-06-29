import React from 'react';
import { Link } from 'react-router-dom';
import noteImage from '../assets/lightbuild-unsplash.jpg';

import { Typography, Container, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
	content: {
		padding: theme.spacing(3),
		backgroundColor: 'rgba(176,190,197, 1)'
	},
	root: {
		flexGrow: 1,
		background: `url(${noteImage}) no-repeat center center fixed`,
		backgroundSize: 'cover',
		display: 'flex',
		justifyContent: 'center',
		flexDirection: 'column',
		alignItems: 'center',
		textAlign: 'center'
	},
	marginTop: {
		marginTop: theme.spacing(2)
	},
	linkStyle: {
		textDecoration: 'none',
		color: 'inherit'
	}
}));

const Home = (props) => {
	// const { isAuthenticated } = useAuth0();
	const classes = useStyles();

	return (
		<main className={classes.root}>
			<Container maxWidth="lg" className={classes.content}>
				<Typography variant="h1">Welcome to TemplateNote</Typography>
				<Typography variant="body1">Let's start by creating a notebook</Typography>
				<Link to="/notebooks" className={classes.linkStyle}>
					<Button variant="contained" color="primary" className={classes.marginTop}>
						create notebook
					</Button>
				</Link>
			</Container>
		</main>
	);
};

export default Home;
