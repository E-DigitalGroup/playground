const { ContactClass } = require('@controllers/contact/index.class');
const { handler } = require('@lib/middlewares/handler');
const { resMiddleware } = require('@lib/middlewares/res-middleware');

const api = async (req, res) => {
	try {
		const contactClass = new ContactClass(req);
		await contactClass.saveAction();
		return req.sendResponse(200, 'ok');
	} catch (e) {
		return req.sendResponse(500, e);
	}
};

export default handler(resMiddleware, api);
