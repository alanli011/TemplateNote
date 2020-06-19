import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth0 } from '../react-auth0-spa';

import { Container, Typography, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
	root: {
		flexGrow: 1,
		color: 'white',
		width: '100%',
		height: '100vh'
	},
	home__navbar: {
		width: '100%',
		height: '10vh',
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
	}
}));

function LandingPage(props) {
	const { isAuthenticated, loginWithRedirect } = useAuth0();
	const classes = useStyles();

	return (
		<React.Fragment>
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
			</Container>
		</React.Fragment>
	);
}

export default LandingPage;
