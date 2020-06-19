import React, { useState } from 'react';
import axios from 'axios';
import { useAuth0 } from '../react-auth0-spa';
import baseUrl from '../config/config';

const ExternalApi = () => {
	const [ showResult, setShowResult ] = useState(false);
	const [ apiMessage, setApiMessage ] = useState('');
	const { getTokenSilently } = useAuth0();

	const callApi = async () => {
		try {
			const token = await getTokenSilently();

			const res = await axios({
				url: `${baseUrl.url}/api/public`,
				headers: {
					Authorization: `Bearer ${token}`
				}
			});

			const responseData = await res.data;

			setShowResult(true);
			setApiMessage(responseData);
		} catch (error) {
			console.error(error);
		}
	};

	return (
		<React.Fragment>
			<h1>External API</h1>
			<button onClick={callApi}>Ping API</button>
			{showResult && <code>{JSON.stringify(apiMessage, null, 2)}</code>}
		</React.Fragment>
	);
};

export default ExternalApi;
