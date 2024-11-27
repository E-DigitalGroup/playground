import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
import ModalDemo from '@components/modals/ModalDemo';

export default function List({ data }) {
	return data.map((item, index) => (
		<section
			className="ftco-section ftco-section-solutions"
			key={index}
			id={item.id}
		>
			<div
				className="container-xl"
				style={{
					background: `transparent url(${item.image}) 50% 50% no-repeat`,
					backgroundSize: 'cover',
				}}
			>
				<div className="row">
					<div
						className={
							(index % 2 == 0 ? 'order-md-first' : 'order-md-last') +
							` col-md-8 col-lg-6 heading-section aos-init aos-animate bg-darken`
						}
						data-aos="fade-up"
						data-aos-delay="200"
						data-aos-duration="1000"
					>
						<div className="solutions-wrap">
							<h2 className="mb-0 text-light">{item.title}</h2>
							<span className="subheading mb-3">{item.subtitle}</span>
							<p className="text-white-50">{item.copy}</p>
							<ul className="list-unstyled">
								{item.list.map((li, i) => (
									<li className="text-light" key={i}>
										<FontAwesomeIcon
											icon={faArrowRight}
											style={{
												width: '10px',
												height: '10px',
												marginRight: '10px',
											}}
										/>
										{li}
									</li>
								))}
							</ul>
							<p className="mt-4"></p>
							<div className="mt-4">
								{item?.cta ? (
									<Link className="btn btn-primary" href={item.cta.link}>
										{item.cta.text}
									</Link>
								) : (
									<ModalDemo
										buttonText="Get In Touch"
										modalTitle="Get In Touch"
										type="solutions"
										variant="secondary"
									/>
								)}
							</div>
						</div>
					</div>
					<div className="col-md-4 col-lg-6 d-flex align-items-center"></div>
				</div>
			</div>
		</section>
	));
}
