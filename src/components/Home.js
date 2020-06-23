import React from 'react';
import Navigation from './Navigation';

import { useAuth0 } from '../react-auth0-spa';

const Home = (props) => {
	const { isAuthenticated } = useAuth0();

	return <div>{isAuthenticated && <Navigation />}</div>;
};

export default Home;
