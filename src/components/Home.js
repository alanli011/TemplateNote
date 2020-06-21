import React, { useEffect } from 'react';
import Notebooks from './Notebooks';
import { useSelector, useDispatch } from 'react-redux';
import { useAuth0 } from '../react-auth0-spa';
import { getUser } from '../store/authentication';

function Home(props) {
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

	return (
		<div>
			<h1>Welcome home</h1>
			{isAuthenticated && <Notebooks />}
		</div>
	);
}

export default Home;
