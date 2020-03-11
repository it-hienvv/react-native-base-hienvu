import React from 'react';
import {AppRegistry, StyleSheet, Text, View, processColor} from 'react-native';
import ChartStyle from './styles/TempStyle';
import {BarChart} from 'react-native-charts-wrapper';
import ChartLegend from './ChartLegend';

import {AppNormalText} from 'components/text';
import {BOTTOM_WIDTH_SIZE, PADDING_COMMON} from 'contants/themes/size';
import EmptyComp from 'components/empty-comp';

let listColorGroupBar = ['#FFBC78', '#AEC6E8', '#1F78B4'];

class StackedBarChartScreen extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			legend: {
				enabled: false,
			},
			data: {
				dataSets: [
					{
						values: [-500, 4000, 7700, 8100],
						label: 'Company A',
						config: {
							drawValues: true,
							colors: [processColor('#FFBC78')],
						},
					},
					{
						values: [400, 500, 5000, 230],
						label: 'Company B',
						config: {
							drawValues: true,
							colors: [processColor('#AEC6E8')],
						},
					},
					{
						values: [1000, 5500, 350, 900],
						label: 'Company C',
						config: {
							drawValues: true,
							colors: [processColor('#1F78B4')],
						},
					},
				],
				config: {
					barWidth: 0.2,
					group: {
						fromX: 0,
						groupSpace: 0.1,
						barSpace: 0.1,
					},
				},
			},
			xAxis: {
				valueFormatter: [
					'fjdhsaljfk',
					'sadfads',
					'gifdugio',
					'kfkgjlkf',
				],
				// granularityEnabled: true,
				granularity: 1,
				axisMaximum: 4,
				axisMinimum: 0,
				centerAxisLabels: true,
				drawLabels: true,
				drawAxisLine: true,
				position: 'BOTTOM',
			},
			yAxis: {
				left: {
					drawLabels: true,
					drawAxisLine: true,
					drawGridLines: false,
				},
				right: {
					enabled: false,
				},
			},

			// marker: {
			// 	enabled: true,
			// 	markerColor: processColor('#F0C0FF8C'),
			// 	textColor: processColor('white'),
			// 	markerFontSize: 14,
			// },
		};
	}

	componentDidMount() {
		// in this example, there are line, bar, candle, scatter, bubble in this combined chart.
		// according to MpAndroidChart, the default data sequence is line, bar, scatter, candle, bubble.
		// so 4 should be used as dataIndex to highlight bubble data.
		// if there is only bar, bubble in this combined chart.
		// 1 should be used as dataIndex to highlight bubble data.
		// this.setState({ ...this.state, highlights: [{ x: 1, y: 40 }, { x: 2, y: 50 }] })
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

	_renderDataNotice = () => {
		const {values} = this.props;
		return (
			<View style={{width: '100%', flexDirection: 'row', marginTop: 20}}>
				{this.state.data.dataSets.map((value, index) => {
					const data = {...value, title: value.label};
					return (
						<View
							key={index}
							style={{
								flexDirection: 'row',
								justifyContent: 'center',
								alignItems: 'center',
								marginRight: 10,
								marginBottom: 10,
							}}>
							<View
								style={{
									height: 16,
									width: 30,
									backgroundColor: listColorGroupBar[index],
									marginRight: 5,
									borderRadius: 4,
								}}
							/>
							<Text>sdfjhaslf</Text>
						</View>
					);
				})}
			</View>
		);
	};

	render() {
		const {
			values,
			chartTitle,
			chartHeight,
			chartWidth,
			hasLine,
		} = this.props;

		return (
			<View style={[styles.chartViewStyle]}>
				<View
					style={{
						width: '100%',
						borderBottomWidth: hasLine ? 1 : 0,
						borderBottomColor: '#ccc',
						paddingBottom: 16,
						marginBottom: 16,
					}}>
					<Text style={ChartStyle.commonStyle.titleStyle}>
						{chartTitle}
					</Text>
				</View>
				<View
					style={{
						height: 300 || ChartStyle.PieChart.defaultSize.height,
						width: '100%',
					}}>
					{values && values.length !== 0 ? (
						<BarChart
							style={styles.chart}
							xAxis={this.state.xAxis}
							yAxis={this.state.yAxis}
							data={this.state.data}
							legend={this.state.legend}
							drawValueAboveBar={true}
							// onSelect={this.handleSelect.bind(this)}
							// onChange={(event) => console.log(event.nativeEvent)}
							// highlights={this.state.highlights}
							// marker={this.state.marker}
							zoomEnabled={false}
							zoomControlEnabled={false}
							doubleTapToZoomEnabled={false} //hide doubleTap
							scaleEnabled={false}
							touchEnabled={false}
						/>
					) : (
						<EmptyComp />
					)}
				</View>
				{this._renderDataNotice()}
			</View>
		);
	}
}

const styles = StyleSheet.create({
	chartViewStyle: {
		flex: 1,
	},
	chart: {
		flex: 1,
	},
});

export default StackedBarChartScreen;
