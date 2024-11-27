import React, { useState, useEffect, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faQuestionCircle } from '@fortawesome/free-solid-svg-icons';
import Tooltip from '@components/_common/forms/Tooltip';

const RangeSlider = ({ setScore }) => {
	const [value, setValue] = useState(3); // Initial value
	const rangeRef = useRef(null);
	const rangeValueRef = useRef(null);

	useEffect(() => {
		updatePosition(value);
	}, [value]);

	const updatePosition = (value) => {
		const range = rangeRef.current;
		const rangeValue = rangeValueRef.current;

		if (range && rangeValue) {
			const rangeWidth = range.offsetWidth;
			const thumbWidth = rangeValue.offsetWidth; // Width of the value element
			const offset = (value - range.min) / (range.max - range.min);
			const position = offset * (rangeWidth - thumbWidth) + thumbWidth / 2;

			rangeValue.style.left = `${position}px`;
		}
	};

	const handleRangeChange = (e) => {
		const scoreMap = {
			5: 0.9,
			4: 0.85,
			3: 0.8,
			2: 0.75,
			1: 0.72,
		};
		setValue(e.target.value);
		setScore(scoreMap[parseInt(e.target.value)]);
	};

	return (
		<>
			<div className="range-container">
				<input
					type="range"
					min="1"
					max="5"
					value={value}
					onChange={handleRangeChange}
					ref={rangeRef}
				/>
				<span className="range-value" ref={rangeValueRef}>
					{value}
				</span>
			</div>
			<div className="range-labels">
				<span>Low</span>
				<span>
					Accuracy Score
					<Tooltip title="The accuracy score determines how accurate the AI model is at identifying the correct answer." />
				</span>
				<span>High</span>
			</div>
		</>
	);
};

export default RangeSlider;
