import ContactForm from '@components/_common/forms/Contact';
import { generateSEO } from '@lib/utils/seo';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPhone, faEnvelope } from '@fortawesome/free-solid-svg-icons';

export const metadata = generateSEO('contact');

export default function Contact() {
	return (
		<>
			<section
				className="ftco-section section-contact" // bg-darken
				id="scroll"
				data-aos="fade-up"
				data-aos-duration="1000"
			>
				<div className="container-fluid">
					<div className="row no-gutters justify-content-center">
						<div
							className="col-lg-8 col-xl-4 contact-wrapper"
							data-aos="zoom-in-down"
							data-aos-duration="1000"
							data-aos-delay="100"
						>
							<h3>Contact Us</h3>

							<div className="contact-info mt-3 mb-4">
								<p className="contact-detail">
									<FontAwesomeIcon icon={faPhone} className="icon" />

									<a href="tel://+16461901967">+1 646-190-1967</a>
								</p>

								<p className="contact-detail">
									<FontAwesomeIcon icon={faEnvelope} className="icon" />

									<a href="mailto:info@e-digitalgroup.com">
										info@e-digitalgroup.com
									</a>
								</p>
							</div>

							<p className="">
								Alternatively use the form below to see how we can help you with
								your next project.
							</p>
							<ContactForm type="contact" />
						</div>
					</div>
				</div>
			</section>
		</>
	);
}
