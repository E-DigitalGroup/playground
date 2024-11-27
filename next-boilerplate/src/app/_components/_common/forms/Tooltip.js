import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faQuestionCircle } from '@fortawesome/free-solid-svg-icons';

function TooltipInCopyExample() {
	const Link = ({ id, children, title }) => (
		<OverlayTrigger
			placement="bottom"
			overlay={<Tooltip id={id}>{title}</Tooltip>}
		>
			<a href="#">{children}</a>
		</OverlayTrigger>
	);

	return (
		<Link
			title="The higher the number the more accurate the responses are."
			id="t-1"
		>
			<FontAwesomeIcon className="ms-2" icon={faQuestionCircle} />
		</Link>
	);
}

export default TooltipInCopyExample;
