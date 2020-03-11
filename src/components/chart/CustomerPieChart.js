import React from 'react';
import {StyleSheet, Text, View, processColor} from 'react-native';

import {PieChart} from 'react-native-charts-wrapper';
import ChartLegend from './ChartLegend';
import ChartLegendNoValue from './ChartLegendNoValue';
import ChartStyle from './styles/TempStyle';
import {AppNormalText} from 'components/text';

import {BOTTOM_WIDTH_SIZE, PADDING_COMMON} from 'contants/themes/size';
import EmptyComp from 'components/empty-comp';

class CustomerPieChart extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			legend: {
				enabled: false,
				// textSize: 12,
				// form: 'CIRCLE',
				// maxSizePercent: 100,
				// horizontalAlignment: 'RIGHT',
				// verticalAlignment: 'CENTER',
				// orientation: 'VERTICAL',
				// wordWrapEnabled: true,
			},
			data: {
				dataSets: [
					{
						values: [{label: 'Default', value: 100}],
						label: 'Note',
						config: {
							colors: [processColor('blue')],
							valueTextSize: 16,
							valueTextColor: processColor('#fff'),
							sliceSpace: 0,
							selectionShift: 0,
							// xValuePosition: "OUTSIDE_SLICE",
							// yValuePosition: "OUTSIDE_SLICE",
							valueFormatter: "#.#'%'",
							valueLineColor: processColor('green'),
							valueLinePart1Length: 0.5,
						},
					},
				],
			},
			highlights: [{x: 2}],
			description: {
				text: '',
				textSize: 10,
				textColor: processColor('darkgray'),
			},
		};
	}

	// handleSelect(event) {
	//     let entry = event.nativeEvent;
	//     if (entry == null) {
	//         this.setState({ ...this.state, selectedEntry: null });
	//     } else {
	//         this.setState({ ...this.state, selectedEntry: JSON.stringify(entry) });
	//     }

	//     console.log(event.nativeEvent);
	// }
	static getDerivedStateFromProps(props, state) {
		if (props.values.length !== 0) {
			// state.data.dataSets[0].values = props.values
			// state.data.dataSets[0].config.colors = props.colorList.map(color => processColor(color))
			return {
				// ...state
				data: {
					dataSets: [
						{
							values: props.values,
							label: 'Note',
							config: {
								colors: props.colorList.map(color =>
									processColor(color),
								),
								valueTextSize: 16,
								valueTextColor: processColor('black'),
								sliceSpace: 0,
								selectionShift: 0,
								// xValuePosition: "OUTSIDE_SLICE",
								// yValuePosition: "OUTSIDE_SLICE",
								valueFormatter: "#.#'%'",
								valueLineColor: processColor('green'),
								valueLinePart1Length: 0.5,
							},
						},
					],
				},
			};
		}
		return null;
	}

	_renderDataNotice = () => {
		const {values, colorList, hasValueLegend, typeLegend} = this.props;
		return typeLegend === 1 ? (
			<View style={{width: '100%'}}>
				{values.map((value, index) => {
					const data = {...value, title: value.label};
					return (
						<ChartLegend
							key={index}
							data={data}
							color={colorList[index]}
							type="full"
						/>
					);
				})}
			</View>
		) : (
			<View style={{flex: 1, flexDirection: 'row', flexWrap: 'wrap'}}>
				{values.map((value, index) => {
					return (
						<ChartLegendNoValue
							key={index}
							data={value}
							color={colorList[index]}
							type="full"
						/>
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
						height:
							chartHeight ||
							ChartStyle.PieChart.defaultSize.height,
						width: '100%',
					}}>
					{values && values.length !== 0 ? (
						<PieChart
							style={styles.chart}
							logEnabled={true}
							// chartBackgroundColor={processColor('pink')}
							chartDescription={this.state.description}
							data={this.state.data}
							legend={this.state.legend}
							highlights={this.state.highlights}
							// entryLabelColor={processColor('green')}
							entryLabelTextSize={12}
							drawEntryLabels={false}
							rotationEnabled={false}
							rotationAngle={45}
							usePercentValues={true}
							// styledCenterText={{
							//     text: 'Pie center text!',
							//     color: processColor('pink'),
							//     size: 20,
							// }}
							centerTextRadiusPercent={100}
							holeRadius={0}
							// holeColor={processColor('#f0f0f0')}
							transparentCircleRadius={0}
							// transparentCircleColor={processColor('#f0f0f088')}
							maxAngle={360}
							// onSelect={this.handleSelect.bind(this)}
							onChange={event => console.log(event.nativeEvent)}
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

export default CustomerPieChart;
