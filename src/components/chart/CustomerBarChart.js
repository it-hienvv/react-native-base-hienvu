import React from 'react';
import {StyleSheet, Text, View, processColor} from 'react-native';

import {BarChart} from 'react-native-charts-wrapper';
import ChartStyle from './styles/ChartStyle';

class CustomerBarChart extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			legend: {
				enabled: false,
			},
			data: {
				dataSets: [
					{
						values: this.props.barChartData.map(e => ({
							y: e.value,
						})),
						label: '',
						config: {
							color: processColor(this.props.barColor),
						},
					},
				],

				config: {
					barWidth: 0.5,
				},
			},

			xAxis: {
				enabled: true,
				valueFormatter: this.props.barChartData.map(e => e.title),
				drawGridLines: false,
				drawLabels: true,
				axisMaximum: this.props.barChartData.length,
				labelCount: this.props.barChartData.length,
				avoidFirstLastClipping: true,
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
		};
	}

	handleSelect(event) {
		let entry = event.nativeEvent;
		if (entry == null) {
			this.setState({...this.state, selectedEntry: null});
		} else {
			this.setState({
				...this.state,
				selectedEntry: JSON.stringify(entry),
			});
		}
	}

	render() {
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
					<BarChart
						style={styles.chart}
						data={this.state.data}
						xAxis={this.state.xAxis}
						yAxis={this.state.yAxis}
						animation={{durationX: 800}}
						legend={this.state.legend}
						// visibleRange={{ x: { min: 5, max: 5 } }}
						drawValueAboveBar={true}
						// onSelect={this.handleSelect.bind(this)}
						onChange={event => console.log(event.nativeEvent)}
						zoomEnabled={false}
						zoomControlEnabled={false}
						doubleTapToZoomEnabled={false} //hide doubleTap
						scaleEnabled={false}
						chartBackgroundColor={processColor('#ffffff')}
						chartDescription={{
							text: '',
							// textColor: processColor('#000000'),
							// textSize: 10,
							// positionX: 1500,
							// positionY: 15,
						}}
					/>
				</View>
			</View>
		);
	}

	// componentDidMount() {
	//     getTransactionByCuscode('3724297')
	//     .then(res => {
	//         console.log(res, 'XDXD')
	//     })
	//     .catch(err => {
	//         console.log(res, 'ADADADa')
	//     })
	// }
}

const styles = StyleSheet.create({
	chartContainer: {
		width: '100%',
		backgroundColor: '#F5FCFF',
		marginTop: 8,
	},
	chart: {
		flex: 1,
	},
});

export default CustomerBarChart;
