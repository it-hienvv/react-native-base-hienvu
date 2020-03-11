import {StyleSheet} from 'react-native';
import colors from 'assets/colors';
import {PADDING_COMMON} from 'contants/themes/size';
import themes from 'assets/themes';

const styles = StyleSheet.create({
	container: {
		marginRight: PADDING_COMMON,
		flex: 1,
		borderWidth: 1,
		borderRadius: 5,
		// width: '100%'
	},

	animView: {
		backgroundColor: themes.getColor('white'),
		marginLeft: 12,
		paddingHorizontal: 5,
		flexDirection: 'row',
		alignItems: 'center',
	},

	textInput: {
		// flex: 1,
		fontSize: 16,
		color: '#000',
		paddingLeft: 17,
		paddingVertical: 14,
		justifyContent: 'center',
	},

	textError: {
		marginLeft: 12,
		color: themes.getColor('red'),
	},
});

export default styles;
