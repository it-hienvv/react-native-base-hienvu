import {StyleSheet} from 'react-native';
import {BOTTOM_WIDTH_SIZE, PADDING_COMMON} from 'contants/themes/size';

const styles = StyleSheet.create({
	container: {
		flex: 1,
		// width: '100%',
		// marginTop: PADDING_COMMON,
		marginHorizontal: PADDING_COMMON,
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

	header: {
		width: '100%',
		padding: PADDING_COMMON,
		flexDirection: 'row',
		justifyContent: 'space-between',
	},

	textHeader: {
		color: '#0A263D',
	},
});

export default styles;
