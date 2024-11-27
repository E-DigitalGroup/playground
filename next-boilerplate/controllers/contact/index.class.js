const { queryExecutor } = require('@lib/mysql/query-executor');
const { ClassEmailSender } = require('@controllers/email/index.class');

class ContactClass {
	constructor(req) {
		this.req = req;
		this.body = req.body;
	}

	async customerEmail() {
		this.mailOptions = {
			email: this.body.email,
			subject: 'Thanks for inquiry',
			templateName: 'forms/contact/customer',
			model: this.body,
		};
		const emailSender = new ClassEmailSender(process.env, this.mailOptions);
		return await emailSender.sendEmail();
	}

	async adminEmail() {
		this.mailOptions = {
			email: process.env.SUPPORT_EMAIL,
			subject: 'Inquiry email',
			templateName: 'forms/contact/admin',
			model: this.body,
		};
		const emailSender = new ClassEmailSender(process.env, this.mailOptions);
		return await emailSender.sendEmail();
	}

	async insert() {
		const query = `INSERT INTO contact_forms 
		(name, email, subject, nature, type, query)
		VALUES 
		(:name, :email, :subject, :nature, :type, :query)
		`;
		await queryExecutor(query, {
			name: this.body.name,
			email: this.body.email,
			subject: this.body.subject,
			type: this.body.type,
			query: this.body.query,
			nature: this.body.nature,
		});
	}

	async saveAction() {
		await this.insert();
		await this.customerEmail();
		await this.adminEmail();
	}
}

module.exports = { ContactClass };
