import React from 'react';
import { useAuth0 } from '../../react-auth0-spa';
import Footer from './Footer';

import { Typography, Button, Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import CenterFocusStrongIcon from '@material-ui/icons/CenterFocusStrong';

const useStyles = makeStyles((theme) => ({
	root: {
		flexGrow: 1,
		width: '100%',
		height: '100vh',
		display: 'flex',
		justifyContent: 'space-between',
		flexDirection: 'column'
	},
	content: {
		flexGrow: 1,
		width: '100%',
		height: '100vh',
		overflowX: 'hidden',
		overflowY: 'scroll',
		backgroundColor: '#31373f',
		color: 'white',
		paddingBottom: theme.spacing(3)
	},
	home__navbar: {
		width: '100%',
		// height: '8.5vh',
		display: 'flex',
		justifyContent: 'space-between',
		alignItems: 'center',
		padding: theme.spacing(3, 3)
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
	home__section__1__left: {
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
		justifyContent: 'space-around',
		paddingLeft: theme.spacing(3),
		marginBottom: theme.spacing(2)
	},
	maxWidth: {
		width: '100%'
	},
	home__section__2: {
		display: 'flex',
		flexDirection: 'column',
		justifyContent: 'center',
		alignItems: 'center',
		margin: theme.spacing(3, 0)
	},
	alignCenter: {
		textAlign: 'center',
		marginTop: theme.spacing(2)
	}
}));

function LandingPage(props) {
	const { isAuthenticated, loginWithRedirect } = useAuth0();
	const classes = useStyles();

	if (isAuthenticated) {
		props.history.push('/home');
	}

	return (
		<div className={classes.root}>
			<main className={classes.content}>
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
					<Grid item xs={12} sm={12} md={6} lg={6} className={classes.home__section__1__left}>
						<Typography variant="h3">
							A new way to take notes. Create templates. Reuse templates so you don't need to think about
							how to style your notes.
						</Typography>
						{!isAuthenticated && (
							<Button
								size="large"
								variant="contained"
								color="secondary"
								onClick={() => loginWithRedirect()}
							>
								Login / Sign Up
							</Button>
						)}
					</Grid>
					<Grid item xs={12} sm={12} md={6} lg={6}>
						<img
							src={require('../../assets/TemplateNote-Home.png')}
							alt="Welcome to TemplateNote"
							className={classes.maxWidth}
						/>
					</Grid>
					<Grid item xs={12} sm={12} md={12} lg={12} className={classes.home__section__2}>
						<CenterFocusStrongIcon style={{ fontSize: '25em' }} />
						<Typography variant="h3">Focus on what matters most</Typography>
					</Grid>
					<Grid item xs={12} sm={12} md={4} lg={4} className={classes.alignCenter}>
						<Typography variant="h4">Manage everything from big projects to personal moments.</Typography>
					</Grid>
					<Grid item xs={12} sm={12} md={4} lg={4} className={classes.alignCenter}>
						<Typography variant="h4">
							Capture ideas and inspiration in notes, voice, and pictures.
						</Typography>
					</Grid>
					<Grid item xs={12} sm={12} md={4} lg={4} className={classes.alignCenter}>
						<Typography variant="h4">Never lose track of your tasks and deadlines.</Typography>
					</Grid>
				</Grid>
			</main>
			<Footer />
		</div>
	);
}

export default LandingPage;
