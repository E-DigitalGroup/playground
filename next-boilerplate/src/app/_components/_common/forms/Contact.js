'use client';
import React, { useState, useRef } from 'react';
import { Form, Col, Row } from 'react-bootstrap';
import LoadingButton from '@components/_common/buttons/LoadingButton';
import { makeRequest } from '@helpers/request';
import { showNotification } from '@helpers/index';

const ContactForm = ({ type }) => {
	const [loading, setLoading] = useState(false);
	const formRef = useRef(null);

	const resetForm = () => {
		if (formRef.current) formRef.current.reset();
	};

	const onSubmit = async (event) => {
		event.preventDefault();
		const formData = new FormData(event.currentTarget);
		const { name, email, query, nature } = Object.fromEntries(
			formData.entries(),
		);

		try {
			setLoading(true);
			await makeRequest({
				type: 'post',
				url: '/api/contact',
				data: { name, email, type, query, nature },
			});
			showNotification(
				'Thank you for your enquiry, we will get back to you shortly.',
			);
			resetForm();
		} catch (error) {
			console.error('Error submitting form:', error);
		} finally {
			setLoading(false);
		}
	};

	// Reusable form input component
	const FormGroup = ({ children, controlId, type = 'text', ...props }) => (
		<Form.Group className="mb-1">
			<Form.Control type={type} id={controlId} {...props} required />
		</Form.Group>
	);

	return (
		<Form onSubmit={onSubmit} ref={formRef}>
			<Row>
				<Col md={12}>
					<FormGroup controlId="name" name="name" placeholder="Name" />
				</Col>
				<Col md={12}>
					<FormGroup
						controlId="email"
						type="email"
						name="email"
						placeholder="Email"
					/>
				</Col>
				<Col md={12}>
					<Form.Group className="mb-1">
						<Form.Select aria-label="Nature of Enquiry" name="nature">
							<option>Nature of enquiry</option>
							<option value="Design">Design</option>
							<option value="Development">Development</option>
							<option value="Demonstration">Demonstration</option>
							<option value="Marketing">Marketing</option>
							<option value="Data Analytics">Data Analytics</option>
							<option value="Other">Other</option>
						</Form.Select>
					</Form.Group>
				</Col>
				<Col md={12}>
					<FormGroup
						controlId="query"
						name="query"
						as="textarea"
						rows={4}
						placeholder="Your message"
					/>
				</Col>
				<Col md={12}>
					<Form.Group className="mt-3 text-end">
						<LoadingButton
							variant="primary"
							type="submit"
							label="Send"
							loading={loading}
							tabIndex={3}
						/>
					</Form.Group>
				</Col>
			</Row>
		</Form>
	);
};

export default ContactForm;
