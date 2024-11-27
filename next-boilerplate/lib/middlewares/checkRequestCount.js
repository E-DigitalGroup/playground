const { parse, serialize } = require('cookie');

const MAX_REQUESTS = 50;

const checkRequestCount = (handler) => async (req, res) => {
	const cookies = parse(req.headers.cookie || '');
	const reqCount = parseInt(cookies.reqCount, 10) || 0;

	if (reqCount >= MAX_REQUESTS) {
		return res.status(429).json({ message: 'Request limit exceeded' });
	}

	const newReqCount = reqCount + 1;

	const cookie = serialize('reqCount', newReqCount, {
		httpOnly: true,
		secure: true,
		maxAge: 60 * 60,
		path: '/',
	});

	res.setHeader('Set-Cookie', cookie);

	return handler(req, res);
};

module.exports = checkRequestCount;
