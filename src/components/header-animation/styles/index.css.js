import {StyleSheet} from 'react-native';
import themes from 'assets/themes';
import {PADDING_COMMON} from 'contants/themes/size';

const styles = StyleSheet.create({
	titleHeader: {
		alignItems: 'center',
		marginTop: PADDING_COMMON - 12,
	},

	lineRanker: {
		height: 1,
		width: 350,
		backgroundColor: themes.getColor('mainColor'),
	},

	ranker: {
		width: 65,
		height: 20,
		borderRadius: 20,
		borderWidth: 1,
		borderColor: themes.getColor('mainColor'),
		backgroundColor: themes.getColor('white'),
		justifyContent: 'center',
		alignItems: 'center',
		marginHorizontal: 20,
		position: 'absolute',
		alignSelf: 'center',
		top: -10,
	},

	nameCompany: {
		marginBottom: PADDING_COMMON,
		color: themes.getColor('mainColor'),
		fontSize: 18,
		lineHeight: 22,
	},

	txtRanker: {
		color: themes.getColor('mainColor'),
		fontSize: 8,
		lineHeight: 12,
	},

	wrapperRanked: {
		marginBottom: PADDING_COMMON,
	},

	space: {
		width: PADDING_COMMON * 2,
		height: PADDING_COMMON * 2,
	},
});

export default styles;
