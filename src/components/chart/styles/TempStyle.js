// import CommonStyle from "./CommonStyle"
import {StyleSheet} from 'react-native';
import {BOTTOM_WIDTH_SIZE, PADDING_COMMON} from 'contants/themes/size';
import {WIDTH_SCREEN} from 'utils/util';
import fonts from 'assets/fonts';

const WIDTH_1_3 = (WIDTH_SCREEN - BOTTOM_WIDTH_SIZE - PADDING_COMMON * 3) / 3;

const PieChart = {
	greenColor: '#07B841',
	orangeColor: '#FFA713',
	grayColor: '#BDBDBD',
	redColor: '#EC4453',
	blueColor: '#43A1F8',
	defaultSize: {
		height: 300,
		width: WIDTH_1_3,
	},
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
		...fonts['BLOCK-HEADER'],
		color: '#000000',
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
	commonStyle,
};
