import axios from '@helpers/axios';
import { showNotification } from '@helpers/index';

const makeRequest = async ({
	type,
	url = '',
	data = {},
	setLoading = null,
}) => {
	let res = {};
	try {
		setLoading ? setLoading(true) : '';

		if (type === 'get') {
			res = await axios.get(url);
		}

		if (type === 'post') {
			res = await axios.post(url, data);
		}

		if (type === 'put') {
			res = await axios.put(url, data);
		}

		if (type === 'delete') {
			res = await axios.delete(url);
		}

		setLoading ? setLoading(false) : '';
		if (res && res.message) {
			showNotification(res.message);
		}
		return res;
	} catch (e) {
		setLoading ? setLoading(false) : '';
		throw e;
	}
};

export { makeRequest };
