import CommonStyle from './CommonStyle';
import customerStyle from './CustomerStyle';

export default {
	containerSearch: {
		flexDirection: 'column',
		padding: CommonStyle.margin16,
	},
	containerSearchStyle: {},
	textInputSearchStyle: {
		height: CommonStyle.buttonHeaderHeight - 2,
		width: 350,
	},
	textButtonSearchStyle: [
		customerStyle.textButtonWhite,
		customerStyle.containerButtonSearch,
		{
			borderBottomLeftRadius: 0,
			borderTopLeftRadius: 0,
			marginStart: -4,
		},
	],
	searchButton: {
		height: CommonStyle.buttonHeaderHeight,
		width: 112,
	},
	textGiaoDichGanDay: {
		fontSize: CommonStyle.mainTitleButtonSize,
		fontWeight: 'bold',
	},
	containerSaleSearchItem: {
		width: CommonStyle.searchItemCustomerHorizontalWidth,
		height: CommonStyle.searchItemCustomerHorizontalHeight,
		borderRadius: CommonStyle.cornerRadius4,
		overflow: 'hidden',
		borderWidth: CommonStyle.borderWidth,
		borderColor: CommonStyle.borderColor,
		padding: CommonStyle.margin8,
		alignItems: 'center',
	},
	containerSaleSearchItemCreateNew: {
		width: CommonStyle.searchItemCustomerHorizontalWidth,
		height: CommonStyle.searchItemCustomerHorizontalHeight,
		backgroundColor: CommonStyle.buttonColor,
		borderRadius: CommonStyle.cornerRadius4,
		borderWidth: CommonStyle.borderWidth,
		borderColor: CommonStyle.borderColor,
		padding: CommonStyle.margin8,
		alignItems: 'center',
		overflow: 'hidden',
	},
	dividerResultSearchHorizontalStyle: {
		width: CommonStyle.margin16,
	},
	containerSaleSearchItemText: {
		flex: 1,
		flexDirection: 'column',
		marginLeft: CommonStyle.margin8,
	},
	containerAvartar: {
		width: 50,
		height: 50,
		borderRadius: 25,
		backgroundColor: CommonStyle.bgCardColor,
		alignItems: 'center',
		justifyContent: 'center',
	},
	imageAvatar: {
		width: 24,
		height: 24,
	},
	containerSaleSearchItemTextTitle: {
		flex: 1,
		flexDirection: 'row',
		alignItems: 'center',
	},
	textTitleSearchItem: {
		fontSize: CommonStyle.textSize,
	},
	textSubTitleSearchItem: {
		fontSize: CommonStyle.labelTextSize,
	},
	containerAuthenMessage: {
		alignItems: 'center',
		justifyContent: 'center',
	},
	containerDetailAuthenMessage: {
		width: '50%',
		flexDirection: 'column',
		alignItems: 'center',
	},
	imageAuthenMessage: {
		width: 70,
		height: 70,
	},
	textAuthenMessage: {
		fontSize: CommonStyle.mainTitleButtonSize,
		color: CommonStyle.defaultTextColor,
		textAlign: 'center',
	},
	buttonAuthenMessage: {
		width: 200,
		height: 40,
		fontSize: CommonStyle.mainTitleButtonSize,
		color: CommonStyle.textColorWhite,
		textAlign: 'center',
		textAlignVertical: 'center',
		borderRadius: CommonStyle.cornerRadius4,
		backgroundColor: CommonStyle.buttonColor,
	},
};
