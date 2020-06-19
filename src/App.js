import React from 'react';
import { useSelector } from 'react-redux';
import PrivateRoute from './components/PrivateRoute';

import { Router, Route, Switch } from 'react-router-dom';
import Profile from './components/Profile';
import history from './utils/history';
import ExternalApi from './views/ExternalApi';
import LandingPage from './components/LandingPage';
import { ThemeProvider, createMuiTheme, makeStyles } from '@material-ui/core/styles';
import { green, lightBlue } from '@material-ui/core/colors';
import CssBaseline from '@material-ui/core/CssBaseline';

const useStyles = makeStyles((theme) => ({
	root: {
		flexGrow: 1,
		backgroundColor: '#31373f',
		height: '100vh',
		width: '100%'
	}
}));

const App = () => {
	const darkState = useSelector((state) => state.toggleDarkMode.darkThemeEnabled);

	const paletteType = darkState ? 'dark' : 'light';

	const mainPrimaryColor = darkState ? green[700] : lightBlue[500];
	const mainSecondaryColor = darkState ? green[900] : lightBlue[900];

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

	const classes = useStyles();

	return (
		<ThemeProvider theme={darkTheme}>
			<CssBaseline />
			<div className={classes.root}>
				{/* Don't forget to include the history module */}
				<Router history={history}>
					<Switch>
						<Route path="/" exact component={LandingPage} />
						<PrivateRoute path="/profile" component={Profile} />
						<PrivateRoute path="/external-api" component={ExternalApi} />
					</Switch>
				</Router>
			</div>
		</ThemeProvider>
	);
};

export default App;
