import React from 'react';
import { useSelector } from 'react-redux';
import PrivateRoute from './components/PrivateRoute';
import { Router, Route, Switch } from 'react-router-dom';
import history from './utils/history';
import LandingPage from './components/LandingPage';
import Home from './components/Home';
import Notebooks from './components/Notebooks';
import Navigation from './components/Navigation';
// import Notes from './components/Notes';
// import NavBar from './components/NavBar';

import { ThemeProvider, createMuiTheme, makeStyles } from '@material-ui/core/styles';
import { green, lightBlue } from '@material-ui/core/colors';
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
	const darkState = useSelector((state) => state.toggleDarkMode.darkThemeEnabled);
	// const notebooks = useSelector((state) => state.notebooks.notebooks);

	const paletteType = darkState ? 'dark' : 'light';

	const mainPrimaryColor = darkState ? green[700] : lightBlue[500];
	const mainSecondaryColor = darkState ? lightBlue[900] : green[900];

	const darkTheme = createMuiTheme({
		palette: {
			type: paletteType,
			primary: {
				main: mainPrimaryColor
			},
			secondary: {
				main: mainSecondaryColor
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
					{/* <PrivateRoute path={`/notebooks/${notebooks.id}/notes/:notes_id`} exact component={Notes} /> */}
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
						<Route component={AuthenticatedRoutes} />
						<Route path="/" exact component={LandingPage} />
					</Switch>
				</Router>
			</div>
		</ThemeProvider>
	);
};

export default App;
