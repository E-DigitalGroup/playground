import axios from 'axios';
import { showNotification } from '@helpers/index';
let originalEndpoint = '';

const axiosInstance = axios.create({
	withCredentials: true,
	baseURL: '/',
});

axiosInstance.interceptors.request.use(
	function (config) {
		originalEndpoint = config.url;
		return config;
	},
	function (error) {
		return Promise.reject(error);
	},
);

axiosInstance.interceptors.response.use(
	(response) => {
		return response.data;
	},
	(error) => {
		let err = '';
		if (
			error.response &&
			error.response.data &&
			error.response.data.error &&
			typeof error.response.data.error === 'string'
		) {
			err = error.response.data.error;
		}

		if (
			error.response &&
			error.response.data &&
			typeof error.response.data === 'string'
		) {
			err = error.response.data;
		}

		err = err || 'Something went wrong!';
		showNotification(err, 'error');
		if (error.response.status === 401) {
			// logout();
		}

		if (error.response.status === 402) {
			// location.reload()
		}

		if (error.response.status >= 500) {
			// Sentry.captureException(new Error(originalEndpoint));
		}

		return Promise.reject(err);
	},
);

export default axiosInstance;
