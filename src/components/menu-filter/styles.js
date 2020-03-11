import themes from 'assets/themes';

export default {
	rowFilter: {
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center',
		marginLeft: 10,
		paddingBottom: 5,
		paddingHorizontal: 5,
		borderBottomColor: themes.getColor('grayLight'),
		borderBottomWidth: 1,
	},
	itemFilterHeader: {
		color: themes.getColor('mainColor'),
		maxWidth: 100,
	},
	iconDropDown: {
		width: 15,
		height: 15,
		marginLeft: 10,
		tintColor: themes.getColor('blackLight'),
	},
};
