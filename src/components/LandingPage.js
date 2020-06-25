import React from 'react';
import { useAuth0 } from '../react-auth0-spa';

import { Container, Typography, Button, Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
	root: {
		flexGrow: 1,
		// color: 'white',
		width: '100%',
		height: '100vh'
	},
	home__navbar: {
		width: '100%',
		height: '8.5vh',
		display: 'flex',
		justifyContent: 'space-between',
		alignItems: 'center'
	},
	home__navbar__left: {
		alignContent: 'center'
	},
	home__navbar__right: {
		alignContent: 'center',
		'&:hover': {
			cursor: 'pointer'
		}
	},
	home__section__1: {
		display: 'flex'
	},
	maxWidth: {
		width: '100%'
	}
}));

function LandingPage(props) {
	const { isAuthenticated, loginWithRedirect } = useAuth0();
	const classes = useStyles();

	if (isAuthenticated) {
		props.history.push('/home');
	}

	return (
		<Container className={classes.root}>
			<nav className={classes.home__navbar}>
				<div className={classes.home__navbar__left}>
					<Typography variant="h6">TemplateNote</Typography>
				</div>
				<div className={classes.home__navbar__right}>
					{!isAuthenticated && (
						<Typography variant="h6" onClick={() => loginWithRedirect()}>
							Login / SignUp
						</Typography>
					)}
				</div>
			</nav>
			<Grid container>
				<Grid item xs={6} sm={6} md={6} lg={6}>
					<Typography variant="h5">
						A new way to take notes. Create templates. Reuse templates so you don't need to think about how
						to style your notes.
					</Typography>
					{!isAuthenticated && (
						<Button variant="contained" color="secondary" onClick={() => loginWithRedirect()}>
							Login / Sign Up
						</Button>
					)}
				</Grid>
				<Grid item xs={6} sm={6} md={6} lg={6}>
					{/* insert an image of what the app looks like */}
				</Grid>
			</Grid>
		</Container>
	);
}

export default LandingPage;
