import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import NavBar from './components/NavBar';
import PrivateRoute from './components/PrivateRoute';

import { Router, Route, Switch } from 'react-router-dom';
import Profile from './components/Profile';
import history from './utils/history';
import ExternalApi from './views/ExternalApi';
import LandingPage from './components/LandingPage';
import { toggleDarkMode } from './store/darkMode';
import { ThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import { orange, lightBlue, deepOrange, deepPurple } from '@material-ui/core/colors';
import CssBaseline from '@material-ui/core/CssBaseline';

const App = () => {
	const dispatch = useDispatch();
	const darkState = useSelector((state) => state.toggleDarkMode.darkThemeEnabled);

	const paletteType = darkState ? 'dark' : 'light';

	const mainPrimaryColor = darkState ? orange[500] : lightBlue[500];
	const mainSecondaryColor = darkState ? deepOrange[500] : deepPurple[500];

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

	// on change function to handle the toggle of darkmode/lightmode
	const handleThemeChange = () => {
		dispatch(toggleDarkMode());
	};

	return (
		<ThemeProvider theme={darkTheme}>
			<CssBaseline />
			<div className="App">
				{/* Don't forget to include the history module */}
				<Router history={history}>
					<header>
						<NavBar />
						<button onClick={handleThemeChange}>Click me</button>
					</header>
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
