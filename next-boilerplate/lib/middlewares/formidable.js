const formidable = require('formidable');
const path = require('path');
const fs = require('fs');

// Middleware to handle file uploads
const uploadMiddleware = (req, res, next) => {
	const form = new formidable.IncomingForm({
		keepExtensions: true,
		uploadDir: '/tmp',
		multiples: true,
	});

	form.parse(req, (err, fields, files) => {
		if (err) {
			return res.status(500).json({ error: 'Error uploading file' });
		}

		const file = files.file[0];

		if (!file || file.mimetype !== 'application/pdf') {
			fs.unlinkSync(file.filepath);
			return res.status(422).json({ error: 'Only PDF files are allowed.' });
		}

		if (file.size > 1024 * 1024) {
			fs.unlinkSync(file.filepath);
			return res
				.status(422)
				.json({ error: 'File size must be less than 1 MB.' });
		}

		const flattenedFields = {};
		for (const key in fields) {
			if (Array.isArray(fields[key])) {
				flattenedFields[key] = fields[key].join(', ');
			} else {
				flattenedFields[key] = fields[key];
			}
		}

		req.body = flattenedFields;
		req.body.file = {
			path: file.filepath,
			name: file.originalFilename,
			mimetype: file.mimetype,
		};
		next();
	});
};

module.exports = uploadMiddleware;
