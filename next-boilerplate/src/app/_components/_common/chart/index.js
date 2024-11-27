// import theme from './theme';
import ReactEcharts from 'echarts-for-react';
import theme from './theme.shine.json';

export default function Echart({ options, style = {} }) {
	style = {
		height: '500px',
		// backgroundColor: 'rgb(33, 37, 41)',
		textColorShow: true,
		textColor: '#f0f4f7',
		legend: {
			textStyle: {
				color: '#ffffff',
			},
		},
		...style,
	};

	return (
		<>
			<div className="container-fluid">
				<div className="row">
					<div className="col">
						<ReactEcharts
							style={{ ...style }}
							option={{ ...options }}
							theme={theme}
						/>
					</div>
				</div>
			</div>
		</>
	);
}
