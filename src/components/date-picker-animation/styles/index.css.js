import {StyleSheet} from 'react-native';
import colors from 'assets/colors';
import {PADDING_COMMON} from 'contants/themes/size';
import themes from 'assets/themes';

const styles = StyleSheet.create({
	container: {
		marginRight: PADDING_COMMON,
		flexDirection: 'row',
		borderWidth: 1,
		borderRadius: 5,
	},

	animView: {
		backgroundColor: themes.getColor('white'),
		marginLeft: 12,
		paddingHorizontal: 5,
		flexDirection: 'row',
		alignItems: 'center',
	},

	txtLabelOutLined: {},

	txtLabel: {},
});

export default styles;
