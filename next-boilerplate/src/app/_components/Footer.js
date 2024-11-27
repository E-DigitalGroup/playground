import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
	faMapMarker,
	faPhone,
	faPaperPlane,
	faChevronRight,
	faCertificate,
} from '@fortawesome/free-solid-svg-icons';
import { getAllPosts } from '@lib/utils/markdown';

export default function Footer() {
	//const posts = getAllPosts(3);

	const linkGenerator = (text, slug, follow = true) => {
		return (
			<a href={slug} title={text} rel={follow ? '' : 'nofollow'}>
				<FontAwesomeIcon icon={faChevronRight} className="me-2" />
				{text}
			</a>
		);
	};

	return (
		<footer className="ftco-footer bg-black">
			<div className="container-xl">
				<div className="row justify-content-between">
					<div className="col-12 col-md-6 col-lg-3">
						<div className="ftco-footer-widget">
							<p className="logo">
								<a href="/">
									<img src="/logo-simple.svg" className="img-fluid"></img>
								</a>
							</p>

							<p className="mb-0 text-light">
								Design. Development. Marketing. AI.
							</p>
							<p className="mb-0 ">
								Simplifying the complexities of modern web applications.
							</p>
						</div>
					</div>
					<div className="col-6 col-md-3 col-lg-2">
						<div className="ftco-footer-widget">
							<h2>Categories</h2>
							<ul className="list-unstyled">
								<li>
									{linkGenerator('AI Solutions', '/resources?cat=ai', false)}
								</li>
								<li>
									{linkGenerator(
										'Cloud Services',
										'/work/?cat=cloud-services',
										false,
									)}
								</li>
								<li>
									{linkGenerator('Data Analytics', '/resources/data-analytics')}
								</li>
								<li>
									{linkGenerator('Design / UX', '/work?cat=design', false)}
								</li>
								<li>{linkGenerator('Web Apps', '/work?cat=web-app', false)}</li>
								<li>{linkGenerator('Websites', '/work?cat=website', false)}</li>
							</ul>
						</div>
					</div>
					<div className="col-6 col-md-3 col-lg-2">
						<div className="ftco-footer-widget ">
							<h2>Explore</h2>
							<ul className="list-unstyled">
								<li>{linkGenerator('About', '/about')}</li>
								<li>{linkGenerator('Blog', '/blog')}</li>
								<li>{linkGenerator('Work', '/work')}</li>
								<li>{linkGenerator('Resources', '/resources')}</li>
								<li>{linkGenerator('Solutions', '/solutions')}</li>
							</ul>
						</div>
					</div>

					<div className="col-12 col-lg-4">
						<div className="ftco-footer-widget contacts mb-4">
							<h2>Have a Question?</h2>
							<ul className="list-unstyled">
								<li>
									<a href="tel:16462901967" title="Call E-Digital Group">
										<FontAwesomeIcon
											icon={faPhone}
											style={{ fontSize: '16px' }}
										/>
										+1 646 290 1967
									</a>
								</li>
								<li>
									<a
										href="mailto:info@e-digitalgroup.com"
										title="Email E-Digital Grouo"
									>
										<FontAwesomeIcon icon={faPaperPlane} />
										info@e-digitalgroup.com
									</a>
								</li>
								<li>
									<FontAwesomeIcon icon={faCertificate} />
									CA Business #3371856
								</li>
								<li>
									<FontAwesomeIcon icon={faMapMarker} />
									<address>
										400 Clanton Rd, Suite K, Charlotte, NC 28217
									</address>
								</li>
							</ul>
						</div>
					</div>
				</div>
			</div>
			<section className="ftco-legal">
				<div className="container-xl">
					<div className="row">
						<div className="col-md-12">
							<div className="ftco-footer-widget">
								<div className="order-2 order-md-1">
									<p>&copy; E-Digital Group, Inc. All Rights Reserved.</p>
								</div>
								<div className="d-flex order-1 order-md-2">
									<p>
										<a href="/terms-and-conditions" title="Terms & Conditions">
											Terms & Conditions
										</a>
									</p>
									<p>|</p>
									<p className="mb-0 ">
										<a href="/privacy-policy" title="Privacy Policy">
											Privacy Policy
										</a>
									</p>
								</div>
							</div>
						</div>
					</div>
				</div>
			</section>
		</footer>
	);
}
