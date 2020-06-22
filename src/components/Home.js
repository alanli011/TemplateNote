import React from 'react';

import { useAuth0 } from '../react-auth0-spa';

const Home = (props) => {
	const { isAuthenticated, logout } = useAuth0();

	return (
		<div>
			{isAuthenticated && (
				<div>
					<h1>Welcome home</h1>
				</div>
			)}
		</div>
	);
};

export default Home;
