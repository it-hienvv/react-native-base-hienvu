import React from 'react';
import {StyleSheet, Text, View, processColor} from 'react-native';

import {LineChart} from 'react-native-charts-wrapper';
import ChartStyle from './styles/ChartStyle';
import CommonStyle from './styles/CommonStyle';

const labels = [
	'Casa thời điểm',
	'HĐV CKH thời điểm',
	'Doanh số giao dịch tài khoản',
];

class CustomerLineChart extends React.Component {
	constructor() {
		super();
		this.state = {
			data: {
				dataSets: [],
			},

			legend: {
				enabled: false,
				// textSize: 12,
				// form: 'SQUARE',
				// maxSizePercent: 100,
				// // horizontalAlignment: 'TOP',
				// // verticalAlignment: 'LEFT',
				// orientation: 'HORIZONTAL',
				// wordWrapEnabled: true,
				// xEntrySpace: 20,
				// position: 100,
				// formToTextSpace: 5,
			},

			xAxis: {
				enabled: true,
				valueFormatter: [],
				drawGridLines: false,
				drawLabels: true,
				axisMaximum: 9,
				labelCount: 9,
				avoidFirstLastClipping: false,
				position: 'BOTTOM',
			},
			yAxis: {
				left: {
					drawLabels: true,
					drawAxisLine: true,
					drawGridLines: true,
				},
				right: {
					enabled: false,
				},
			},
			visibleRange: {x: {min: 0, max: 6}},
		};
	}

	handleSelect(event) {
		let entry = event.nativeEvent;
		if (entry === null) {
			this.setState({...this.state, selectedEntry: null});
		} else {
			this.setState({
				...this.state,
				selectedEntry: JSON.stringify(entry),
			});
		}
	}

	createDataSets = () => {
		const {chartData, lineColor} = this.props;
		const xValueFormatter = chartData[0].map(e => e.title);
		const dataSets = chartData.map((set, index) => {
			const color = processColor(lineColor[index]);
			const values = set.map(e => e.value);
			return {
				values: values,
				label: labels[index],
				config: {
					colors: [color],
					valueTextSize: 12,
					valueTextColor: color,
					sliceSpace: 0,
					selectionShift: 0,
					// xValuePosition: "OUTSIDE_SLICE",
					// yValuePosition: "OUTSIDE_SLICE",
					valueLineColor: processColor('green'),
					valueLinePart1Length: 0.5,
					drawCircleHole: true,
					circleHoleColor: processColor('white'),
					circleColor: color,
				},
			};
		});
		this.setState({
			data: {dataSets},
			xAxis: {...this.state.xAxis, valueFormatter: xValueFormatter},
		});
	};

	render() {
		const {showLegend} = this.props;
		return (
			<View style={ChartStyle.commonStyle.viewChartContainer}>
				<Text style={ChartStyle.commonStyle.titleStyle}>
					{this.props.chartTitle}
				</Text>
				<View
					style={[
						styles.chartContainer,
						{height: this.props.chartHeight},
					]}>
					<LineChart
						style={styles.chart}
						data={this.state.data}
						chartDescription={{text: ''}}
						legend={this.state.legend}
						xAxis={this.state.xAxis}
						drawGridBackground={false}
						chartBackgroundColor={processColor('white')}
						drawBorders={false}
						autoScaleMinMaxEnabled={true}
						touchEnabled={true}
						// dragEnabled
						// scaleEnabled={false}
						// scaleXEnabled
						// scaleYEnabled={false}
						// pinchZoom={false}
						// doubleTapToZoomEnabled={false}
						highlightPerTapEnabled={true}
						highlightPerDragEnabled={false}
						// visibleRange={this.state.visibleRange}
						dragDecelerationEnabled={true}
						dragDecelerationFrictionCoef={0.99}
						ref="chart"
						keepPositionOnRotation={false}
						onSelect={this.handleSelect.bind(this)}
						onChange={event => console.log(event.nativeEvent)}
					/>
				</View>
				{showLegend && this._renderLegendChart()}
			</View>
		);
	}

	componentDidMount() {
		this.createDataSets();
	}

	_renderLegendChart = () => {
		const {lineColor} = this.props;
		return (
			<View style={styles.legendContainer}>
				{lineColor.map((color, index) => {
					return (
						<View style={styles.rowStyle} key={index}>
							<View
								style={[
									styles.legendSubView,
									{backgroundColor: color},
								]}
							/>
							<Text style={styles.legendText}>
								{labels[index]}
							</Text>
						</View>
					);
				})}
			</View>
		);
	};
}

const styles = StyleSheet.create({
	rowStyle: {
		flexDirection: 'row',
		alignItems: 'center',
	},
	legendContainer: {
		width: '100%',
		paddingHorizontal: 8,
		marginTop: 16,
		flexDirection: 'row',
		justifyContent: 'space-between',
	},
	legendText: {fontSize: CommonStyle.labelTextSize, marginLeft: 5},
	legendSubView: {width: 20, height: 12, borderRadius: 3},
	chartContainer: {
		width: '100%',
		backgroundColor: '#F5FCFF',
		marginTop: 8,
	},
	chart: {
		flex: 1,
	},
});

export default CustomerLineChart;
