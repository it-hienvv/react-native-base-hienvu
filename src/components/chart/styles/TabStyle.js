import CommonStyle from './CommonStyle';
import {StyleSheet} from 'react-native';

export default {
	tabContainerButton: {
		width: CommonStyle.tabbarWidth,
		height: CommonStyle.tabbarWidth,
		justifyContent: 'center',
		alignItems: 'center',
		borderTopWidth: 1,
		borderTopColor: 'white',
		flexDirection: 'column',
	},
	tabbarButton: {
		width: CommonStyle.tabbarWidth,
		height: CommonStyle.tabbarWidth,
		justifyContent: 'center',
		alignItems: 'center',
		borderTopWidth: 1,
		borderTopColor: 'white',
		flexDirection: 'column',
	},
	tabBar: {
		// flex:1,
		backgroundColor: '#fff',
		borderRightWidth: StyleSheet.hairlineWidth,
		borderRightColor: 'rgba(0, 0, 0, .3)',
		flexDirection: 'column',
		width: CommonStyle.tabbarWidth,
	},
	tabContainerLogo: {
		width: '100%',
		height: CommonStyle.tabbarWidth,
		justifyContent: 'center',
		alignItems: 'center',
	},
	tabContainerUser: {
		width: '100%',
		height: CommonStyle.tabbarWidth,
		justifyContent: 'center',
		alignItems: 'center',
		bottom: 0,
		backgroundColor: 'grey',
	},
	tabContainerButton: {
		width: '100%',
		height: CommonStyle.tabbarWidth,
		justifyContent: 'center',
		alignItems: 'center',
	},

	tabbarLabel: {
		textAlign: 'center',
		fontSize: CommonStyle.labelTextSize,
		marginTop: 2,
		marginBottom: 1.5,
		backgroundColor: 'transparent',
	},
	tabbarIcon: {
		width: 30,
		height: 30,
		resizeMode: 'contain',
	},
	tabbarLogo: {
		width: 40,
		height: 40,
		resizeMode: 'contain',
	},
	container: {
		left: 0,
		top: 0,
		bottom: 0,
		elevation: 8,
	},
};
