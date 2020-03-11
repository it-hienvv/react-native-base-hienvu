import React, {Component} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import CommonStyle from './styles/CommonStyle';
import ChartStyle from './styles/ChartStyle';
import {customerCareerChart} from './FakeData/chartData';
import ChartLegend from './ChartLegend';

class CustomerCareerChart extends Component {
	constructor(props) {
		super(props);
		this.state = {
			listColorChart: [],
			listCareerPercent: [],
		};
	}

	render() {
		return (
			<View style={styles.viewChartStyle}>
				<View style={styles.headerChartView}>
					<Text style={ChartStyle.commonStyle.titleStyle}>
						{'Nghề nghiệp'}
					</Text>
				</View>
				<View style={{width: '100%', padding: 16}}>
					<View style={styles.careerBarView}>
						{this._renderCareerChart()}
					</View>
					<View
						style={{
							width: '100%',
							flexWrap: 'wrap',
							flexDirection: 'row',
							alignItems: 'center',
						}}>
						{this._renderCareerChartLegend()}
					</View>
				</View>
			</View>
		);
	}

	componentDidMount() {
		let listColorChart = [];
		let totalCustomer = 0;
		customerCareerChart.forEach(e => {
			const randomColor = (
				'#' +
				((Math.random() * 0xffffff) << 0).toString(16) +
				'000000'
			).slice(0, 7);
			listColorChart.push(randomColor);
			totalCustomer += e.value;
		});
		this.setState({
			listColorChart,
			listCareerPercent: customerCareerChart.map(e => {
				return `${(e.value / totalCustomer).toFixed(2) * 100}%`;
			}),
		});
	}
	_renderCareerChart = () => {
		const {listCareerPercent, listColorChart} = this.state;
		return customerCareerChart.map((e, index) => (
			<View
				style={[
					styles.careerViewStyle,
					{
						width: listCareerPercent[index],
						backgroundColor: listColorChart[index],
					},
					index == 0 && styles.borderLeftStyle,
					index == customerCareerChart.length - 1 &&
						styles.borderRightStyle,
				]}
				key={index}>
				<Text
					style={{
						color: CommonStyle.textColorWhite,
						textAlign: 'center',
					}}>
					{listCareerPercent[index]}
				</Text>
			</View>
		));
	};

	_renderCareerChartLegend = () => {
		const {listColorChart} = this.state;
		return customerCareerChart.map((data, index) => (
			<ChartLegend
				key={index}
				data={data}
				color={listColorChart[index]}
				type="half"
			/>
		));
	};
}

export default CustomerCareerChart;

const styles = StyleSheet.create({
	careerBarView: {width: '100%', flexDirection: 'row', alignItems: 'center'},
	viewChartStyle: {
		flex: 1,
		margin: 8,
		borderRadius: 10,
		backgroundColor: '#FFFFFF',
		shadowColor: '#000',
		shadowOffset: {
			width: 0,
			height: 1,
		},
		shadowOpacity: 0.22,
		shadowRadius: 2.22,

		elevation: 3,
	},
	headerChartView: {
		width: '100%',
		padding: 16,
		borderBottomColor: CommonStyle.borderColor,
		borderBottomWidth: CommonStyle.borderWidth,
	},
	careerViewStyle: {
		alignItems: 'center',
		height: 60,
		justifyContent: 'center',
	},
	borderRightStyle: {
		borderTopRightRadius: 8,
		borderBottomRightRadius: 8,
	},
	borderLeftStyle: {
		borderTopLeftRadius: 8,
		borderBottomLeftRadius: 8,
	},
});
