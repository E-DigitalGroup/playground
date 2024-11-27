'use client';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';

function ButtonStandard({
	link = '',
	label = '',
	icon = faArrowRight,
	className = 'btn btn-primary',
}) {
	return (
		<Link href={link} className={className}>
			{label}
			<FontAwesomeIcon icon={icon} />
		</Link>
	);
}

export default ButtonStandard;
