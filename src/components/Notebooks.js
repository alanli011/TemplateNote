import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getNoteBooks } from '../store/notebooks';

function Notebooks(props) {
	const dispatch = useDispatch();
	const currentUser = useSelector((state) => state.authentication.currentUser);
	// const notebooks = useSelector((state) => state.notebooks.notebooks);

	useEffect(
		() => {
			if (currentUser) {
				dispatch(getNoteBooks(currentUser.userId));
			}
		},
		// eslint-disable-next-line
		[ currentUser ]
	);

	return <div />;
}

export default Notebooks;
