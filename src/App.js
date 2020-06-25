import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import PrivateRoute from './components/PrivateRoute';
import { Router, Route, Switch } from 'react-router-dom';
import history from './utils/history';
import LandingPage from './components/LandingPage';
import Home from './components/Home';
import Notebooks from './components/notebooks/Notebooks';
import Navigation from './components/Navigation';
import SingleNotebook from './components/notebooks/SingleNotebook';
import { useAuth0 } from './react-auth0-spa';
import { setUser, setToken } from './store/authentication';
import Notes from './components/notebooks/Notes';

import { ThemeProvider, createMuiTheme, makeStyles } from '@material-ui/core/styles';
import { green, lightBlue, amber, blueGrey } from '@material-ui/core/colors';
import CssBaseline from '@material-ui/core/CssBaseline';

const useStyles = makeStyles((theme) => ({
	root: {
		flexGrow: 1,
		display: 'flex',
		// backgroundColor: '#31373f',
		height: '100vh',
		width: '100%'
	}
}));

const App = () => {
	const { user, getTokenSilently } = useAuth0();
	const currentUser = useSelector((state) => state.authentication.currentUser);
	const darkState = useSelector((state) => state.toggleDarkMode.darkThemeEnabled);
	const dispatch = useDispatch();

	// this useEffect handles the dispatch of setting the user and token
	useEffect(
		() => {
			if (user) {
				dispatch(setUser(user));
				(async () => {
					const silentToken = await getTokenSilently();
					dispatch(setToken(silentToken));
				})();
			}
		},
		// eslint-disable-next-line
		[ user ]
	);

	const paletteType = darkState ? 'dark' : 'light';

	const mainPrimaryColor = darkState ? green[700] : lightBlue[500];
	const mainSecondaryColor = darkState ? lightBlue[900] : green[900];
	const successColor = darkState ? blueGrey[800] : amber[50];

	const darkTheme = createMuiTheme({
		palette: {
			type: paletteType,
			primary: {
				main: mainPrimaryColor
			},
			secondary: {
				main: mainSecondaryColor
			},
			success: {
				main: successColor
			}
		}
	});
	console.log(darkTheme);

	const AuthenticatedRoutes = () => {
		return (
			<React.Fragment>
				<Navigation />
				<Switch>
					<PrivateRoute path="/home" exact component={Home} />
					<PrivateRoute path="/notebooks" exact component={Notebooks} />
					{currentUser && (
						<React.Fragment>
							<PrivateRoute
								path={`/users/${currentUser.userId}/notebooks/:notebooksId/notes`}
								exact
								component={SingleNotebook}
							/>
							<PrivateRoute
								path={`/users/${currentUser.userId}/notebooks/:notebooksId/notes/:noteId`}
								exact
								component={Notes}
							/>
						</React.Fragment>
					)}
				</Switch>
			</React.Fragment>
		);
	};

	const classes = useStyles();

	return (
		<ThemeProvider theme={darkTheme}>
			<CssBaseline />
			<div className={classes.root}>
				{/* Don't forget to include the history module */}
				<Router history={history}>
					<Switch>
						<Route path="/" exact component={LandingPage} />
						<Route component={AuthenticatedRoutes} />
					</Switch>
				</Router>
			</div>
		</ThemeProvider>
	);
};

export default App;
