import { toast } from 'react-toastify';

const showNotification = (message = '', type = 'success') => {
	toast(message, {
		hideProgressBar: true,
		autoClose: 2000,
		type,
	});
};

const decodeHtml = (html) => {
	const txt = document.createElement('textarea');
	txt.innerHTML = html;
	return txt.value;
};

export { showNotification, decodeHtml };
