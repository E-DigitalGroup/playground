'use client';
import Image from 'next/image';
export default function CarouselInline(props) {
	const { slides, counter } = props;
	const carouselId = `carousel-${counter}`;

	return (
		<div
			id={carouselId}
			data-bs-ride="carousel"
			className="carousel slide aos-init aos-animate carousel-inline"
			data-aos="fade-up"
			data-aos-delay="200"
			data-aos-duration="1000"
		>
			<div className="carousel-inner">
				{slides.map((slide, index) => (
					<div
						key={index}
						className={`carousel-item ${index === 0 ? `active` : ''} `}
					>
						<Image
							src={slide}
							alt="Facilities"
							width="0"
							height="0"
							sizes="100vw"
							className="img-fluid rounded-1"
						/>
					</div>
				))}
			</div>
			<button
				className="carousel-control-prev"
				type="button"
				data-bs-target={`#${carouselId}`}
				data-bs-slide="prev"
			>
				<span className="carousel-control-prev-icon" aria-hidden="true"></span>
				<span className="visually-hidden">Previous</span>
			</button>
			<button
				className="carousel-control-next"
				type="button"
				data-bs-target={`#${carouselId}`}
				data-bs-slide="next"
			>
				<span className="carousel-control-next-icon" aria-hidden="true"></span>
				<span className="visually-hidden">Next</span>
			</button>
		</div>
	);
}
