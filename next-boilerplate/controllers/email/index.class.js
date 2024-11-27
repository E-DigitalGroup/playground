const fs = require('fs');
const path = require('path');
const EmailTemplate = require('email-templates');
const sgMail = require('@sendgrid/mail');

class ClassEmailSender {
	constructor(env, params) {
		const { SENDGRID_API_KEY, FROM_EMAIL, NODE_ENV, EMAIL_ALERT } = env;
		const {
			email,
			subject,
			templateName,
			model,
			cc,
			bcc,
			attachments_name = '',
			attachments_path = '',
			attachments_type = '',
			attachments_arr = [],
		} = params;

		sgMail.setApiKey(SENDGRID_API_KEY);

		Object.assign(this, {
			SENDGRID_API_KEY,
			FROM_EMAIL,
			NODE_ENV,
			EMAIL_ALERT,
			email,
			subject,
			templateName,
			model,
			cc,
			bcc,
			attachments_name,
			attachments_path,
			attachments_type,
			attachments_arr,
		});
		this.controller();
	}

	controller() {
		this.setTemplate();
	}

	setTemplate() {
		this.templateModel = this.model || {};
	}

	async setEmailBody() {
		const newsletter = new EmailTemplate({
			views: {
				root: path.join(process.cwd(), 'controllers', 'email', 'templates'),
				options: {
					extension: 'ejs',
				},
			},
		});
		this.htmlContent = await newsletter.render(
			this.templateName,
			this.templateModel,
		);
	}

	setToEmails(emails, type) {
		if (emails) {
			const emailList = emails.split(',');
			for (let i = 0; i < emailList.length; i += 1) {
				const obj = {
					email: emailList[i].trim(),
					type,
				};
				this.emailOptions.to.push(obj);
			}
		}
	}

	setAttachment() {
		if (this.attachments_name && this.attachments_path) {
			const attachmentContent = fs
				.readFileSync(this.attachments_path)
				.toString('base64');
			const obj = {
				content: attachmentContent,
				filename: this.attachments_name,
				type: this.attachments_type,
				disposition: 'attachment',
			};
			this.emailOptions.attachments.push(obj);
		}
	}

	setMultipleAttachment() {
		if (this.attachments_arr && this.attachments_arr.length) {
			for (let i = 0; i < this.attachments_arr.length; i += 1) {
				const attachment = this.attachments_arr[i];
				const attachmentContent = fs
					.readFileSync(attachment.attachments_path)
					.toString('base64');
				const obj = {
					content: attachmentContent,
					filename: attachment.attachments_name,
					type: attachment.attachments_type,
					disposition: 'attachment',
				};
				this.emailOptions.attachments.push(obj);
			}
		}
	}

	createEmailOptions() {
		const fromEmailData = this.FROM_EMAIL.split('<');
		const fromName = fromEmailData[0].trim();
		const fromEmail = fromEmailData[1].replace(/>/g, '').trim();

		this.emailOptions = {
			to: [],
			from: {
				email: fromEmail,
				name: fromName,
			},
			subject: this.subject,
			html: this.htmlContent,
			attachments: [],
		};

		if (this.cc) {
			this.emailOptions.cc = this.cc.split(',').map((email) => email.trim());
		}

		if (this.bcc) {
			this.emailOptions.bcc = this.bcc.split(',').map((email) => email.trim());
		}

		this.setToEmails(this.email, 'to');
		this.setAttachment();
		this.setMultipleAttachment();
	}

	async sendEmail() {
		try {
			await this.setEmailBody();
			console.log(`${this.subject} send to ${this.email}.`);
			this.createEmailOptions();

			const msg = {
				to: this.email.split(',').map((email) => email.trim()),
				from: this.emailOptions.from,
				subject: this.emailOptions.subject,
				html: this.emailOptions.html,
				cc: this.emailOptions.cc,
				bcc: this.emailOptions.bcc,
				attachments: this.emailOptions.attachments.length
					? this.emailOptions.attachments.map((att) => ({
							content: att.content,
							filename: att.filename,
							type: att.type,
							disposition: att.disposition,
						}))
					: undefined,
			};

			const data = await sgMail.sendMultiple(msg);

			return { status: true, data };
		} catch (e) {
			console.error('Mailer Script Error:', e.response ? e.response.body : e);
			return { status: false, error: e.toString() };
		}
	}
}

module.exports = { ClassEmailSender };
