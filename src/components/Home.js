import React, { useEffect } from 'react';

import { useSelector, useDispatch } from 'react-redux';
import { useAuth0 } from '../react-auth0-spa';
import { getUser } from '../store/authentication';

const Home = (props) => {
	const { isAuthenticated, logout, user } = useAuth0();
	const dispatch = useDispatch();
	const currentUser = useSelector((state) => state.authentication.currentUser);

	useEffect(
		() => {
			dispatch(getUser(user));
		},
		// eslint-disable-next-line
		[ user ]
	);

	return <div>{isAuthenticated && <h1>Welcome home</h1>}</div>;
};

export default Home;
