'use client';
import { Button, Spinner } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

function LoadingButton({
	variant = 'primary',
	type = 'submit',
	size = '',
	tabIndex = 0,
	label = '',
	loading = false,
	submitFn = null,
	icon = null,
	className = '',
}) {
	return (
		<Button
			className={className}
			variant={variant}
			type={type}
			size={size}
			tabIndex={tabIndex}
			disabled={loading}
			onClick={submitFn}
		>
			{icon ? <FontAwesomeIcon className="me-2" icon={icon} /> : null}
			{loading ? (
				<>
					<Spinner
						animation="border"
						size="sm"
						role="status"
						aria-hidden="true"
					/>
					<span className="visually-hidden">Loading...</span>
				</>
			) : (
				`${label}`
			)}
		</Button>
	);
}

export default LoadingButton;
