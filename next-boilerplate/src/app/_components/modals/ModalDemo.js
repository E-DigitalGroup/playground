'use client';

import Modal from 'react-modal';
import React, { useState, useEffect } from 'react';
import { customStyles } from './styles';
import Button from 'react-bootstrap/Button';
import ContactForm from '@components/_common/forms/Contact';

const ModalDemo = ({
	buttonText = 'Request a full demo',
	modalTitle = 'Schedule your demo',
	type,
	variant = 'primary',
}) => {
	const [openModal, setOpenModal] = useState(false);

	function openModalHandler() {
		setOpenModal(true);
	}

	function closeModal() {
		setOpenModal(false);
	}

	useEffect(() => {
		Modal.setAppElement('body');
	}, []);

	return (
		<>
			{!openModal && (
				<Button variant={variant} size="" onClick={openModalHandler}>
					{buttonText}
				</Button>
			)}

			{openModal && (
				<div className="bg-dark">
					<Modal
						isOpen={openModal}
						onRequestClose={closeModal}
						style={customStyles}
						ariaHideApp={false}
						contentLabel="Example Modal"
					>
						<div className="react-modal-body">
							<div className="d-flex justify-content-between align-items-center mb-5">
								<h5 className="text-light mb-0 lh-base">{modalTitle}</h5>
								<button className="btn btn-dark" onClick={closeModal}>
									X
								</button>
							</div>

							<ContactForm type={type} />
						</div>
					</Modal>
				</div>
			)}
		</>
	);
};

export default ModalDemo;
