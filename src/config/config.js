const baseUrl = {
	url:
		process.env.NODE_ENV === 'development'
			? process.env.REACT_APP_DEV_API || 'http://localhost:5000'
			: process.env.REACT_APP_PROD_API || 'https://templatenote-backend.herokuapp.com'
};

export default baseUrl;
