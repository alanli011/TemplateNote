const baseUrl = {
	url:
		process.env.NODE_ENV === 'development'
			? process.env.REACT_APP_DEV_API || 'http://localhost:5000'
			: process.env.REACT_APP_PROD_API || 'https://templatenote-backend.herokuapp.com',
	main:
		process.env.NODE_ENV === 'development'
			? process.env.REACT_APP_DEV_API || 'http://localhost:3000'
			: process.env.REACT_APP_PROD_API || 'https://master.dc5skw8rrjv1s.amplifyapp.com/'
};

export default baseUrl;
