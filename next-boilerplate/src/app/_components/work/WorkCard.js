import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
export default function Portfolio({ items, colSize }) {
	return items.map((item, index) => (
		<div key={index} className={`col-md-${colSize} work-wrap-col`}>
			<div
				className="work-wrap"
				data-aos="flip-left"
				data-aos-duration="1000"
				data-aos-delay={index * 100}
			>
				<a
					href={`/work/${item.client.toLowerCase().replace(/\s+/g, '-')}`}
					alt={item.client}
				>
					<div
						className="img"
						style={{
							backgroundImage: `url(${item.image})`,
						}}
					></div>
				</a>
				<div className="text">
					<h3 className="mt-3 mb-0">
						<a
							href={`/work/${item.client.toLowerCase().replace(/\s+/g, '-')}`}
							alt={item.client}
						>
							{item.client}
						</a>
					</h3>
					<p>{item.title}</p>
					{item.categories.map((category, idx) => (
						<span
							key={idx}
							className={`category category-${category
								.toLowerCase()
								.replace(/\s+/g, '-')}`}
						>
							{category}
						</span>
					))}
				</div>
			</div>
		</div>
	));
}
