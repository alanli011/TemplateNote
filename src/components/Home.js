import React from 'react';
// import Navigation from './Navigation';

import { useAuth0 } from '../react-auth0-spa';

const Home = (props) => {
	const { isAuthenticated } = useAuth0();

	return <div>{isAuthenticated && <h1>Welcome Home</h1>}</div>;
};

export default Home;
