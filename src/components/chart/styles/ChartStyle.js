import CommonStyle from './CommonStyle';
import {StyleSheet} from 'react-native';

const PieChart = {
	activeCustomerColor: '#07B841',
	inactiveCustomerColor: '#FFA713',
	dormantCustomerColor: '#BDBDBD',
	defaultHeight: 300,
};

const BarChart = {
	toiBarColor: '#3A77AF',
	ageBarColor: '#077D2E',
	timeRelationshipColor: '#FFA713',
	defaultHeight: 250,
};

const LineChart = {};

const commonStyle = StyleSheet.create({
	titleStyle: {
		fontSize: CommonStyle.titleCardSize,
		color: CommonStyle.textColorBlack,
		fontWeight: 'bold',
	},
	viewChartContainer: {
		flex: 1,
		padding: 16,
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
});

export default {
	PieChart,
	BarChart,
	LineChart,
	commonStyle,
};
