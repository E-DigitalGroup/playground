'use client';
import Carousel from 'react-bootstrap/Carousel';

export default function Testimonials() {
	const testimonials = [
		{
			message: [
				'Working with Alex and E-Digital Group has always been an easy and pleasurable experience. Over the last 5 years, we have worked closely together on several websites. Regardless of the task at hand I know we can count on Alex to deliver great code and to integrate with our team seamlessly. He asks great questions that make the work stronger and he’s always accessible and available to help ensure we launch a successful project.',
			],
			image: 'images/person_1.jpg',
			name: 'Greg Hedges',
			position: 'Director of Strategy',
			company: 'Rain Media',
		},
		{
			message: [
				'E-Digital Group provided us with an outstanding product that we are now able to offer to our members. The service that we were and still continue to receive is remarkable. We are currently working through additions and upgrades to the site, allowing us to continuously provide a better product. It was an obvious choice to continue to use E‐Digital Group, based upon the high quality of the workmanship and the reliability of the service that is offered. I wouldn’t hesitate to recommend E-Digital Group for your project.',
			],
			image: 'images/person_2.jpg',
			name: 'Rusty Lewis',
			position: 'Director Of Training',
			company: 'International Bodyflight Association',
		},
		{
			message: [
				'Alex was great to work with! He was very professional and quick to answer any questions regarding our website build which was a completely new process to us. We had several things pop up on our end which delayed the website build for quite a while and he was very patient, understanding, and helpful for a year long process.',
			],
			image: 'images/person_2.jpg',
			name: 'Heather Riggins',
			position: 'Marketing Director',
			company: 'Alpha Canvas & Awning',
		},
		{
			message: [
				'We first worked with E-Digital Group in 2014 when they designed and built our main business website. We were so happy with the results that we commissioned them to build us two more websites and additionally recommend them to any of our clients who ask for a referral. Aside from the quality of the work the thing we appreciate the most is how easy they are to work with and the on-going support they offer.',
			],
			image: 'images/person_2.jpg',
			name: 'Randy Madge',
			position: 'CEO',
			company: 'Square Clover',
		},
	];
	return (
		<section className="ftco-section  testimony-section">
			<div className="container-xl">
				<div className="row justify-content-center">
					<div className="col text-center">
						<div
							className="heading-section"
							data-aos="fade-up"
							data-aos-duration="1000"
						>
							<span className="subheading">Testimonials</span>
							<h2 className="mb-5">What our clients say</h2>
						</div>
					</div>
				</div>
				<div className="row justify-content-center">
					<div
						className="col-md-10 col-lg-8 col-xl-6 mx-auto"
						data-aos="fade-up"
						data-aos-duration="1000"
						data-aos-delay="100"
					>
						<Carousel>
							{testimonials.map((testimonial, index) => {
								return (
									<Carousel.Item key={index}>
										<Carousel.Caption>
											<div className="message">
												{testimonial.message.map((m, i) => (
													<p key={i}>{m}</p>
												))}
											</div>
											<p className="name">{testimonial.name}</p>
											<p className="position">{testimonial.position}</p>
											<p className="company">{testimonial.company}</p>
										</Carousel.Caption>
									</Carousel.Item>
								);
							})}
						</Carousel>
					</div>
				</div>
			</div>
		</section>
	);
}
