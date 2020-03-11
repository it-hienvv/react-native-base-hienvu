import CommonStyle from './CommonStyle';
import React from 'react';
import cardStyle from './CardStyle';

export default {
	containerMainColumn: {
		flex: 1,
		flexDirection: 'column',
		marginTop: CommonStyle.headerHeight,
	},
	insuranceListStyleContainer: {
		// marginTop: CommonStyle.margin20,
		flex: 1,
	},
	centerLoaderView: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
	},
	itemContainer: [
		cardStyle.containerCard,
		{
			marginHorizontal: CommonStyle.margin16,
			flexDirection: 'row',
			marginVertical: CommonStyle.margin8,
			paddingRight: 0,
			paddingVertical: 0,
			overflow: 'hidden',
		},
	],
	leftContainer: {
		flex: 12,
		alignItems: 'center',
		// paddingRight: CommonStyle.margin16,
		paddingTop: CommonStyle.margin16,
		paddingEnd: CommonStyle.margin16,
	},
	rightContainer: {
		flex: 100,
		borderBottomRightRadius: CommonStyle.cornerRadius8,
	},
	rightContainerView1: {
		paddingStart: CommonStyle.margin12,
		padding: CommonStyle.margin16,
	},
	contractNumberLabel: {
		color: '#0A263D',
		fontSize: CommonStyle.textSize,
		fontWeight: 'bold',
	},
	contractNumberText: {
		color: '#1E578B',
		fontSize: CommonStyle.textSize,
		fontWeight: 'bold',
	},
	customerNameLabel: {
		color: '#7B7B7B',
		fontSize: CommonStyle.textSize,
	},
	customerNameText: {
		color: '#262626',
		fontSize: CommonStyle.textSize,
		width: 300,
	},
	searchContainer: {
		padding: CommonStyle.margin16,
		backgroundColor: CommonStyle.bgCardColor,
		borderRadius: CommonStyle.cornerRadius8,
		elevation: 2,
		marginHorizontal: CommonStyle.margin16,
		marginBottom: CommonStyle.margin16,
	},
	listFooterStyle: {
		color: '#7B7B7B',
		marginHorizontal: 24,
		marginTop: CommonStyle.margin16,
	},
	rowInItemContainer: {
		flex: 1,
	},
	iconContractType: {
		width: 37,
		height: 45,
	},
	insuranceContractTypeText: {
		fontSize: CommonStyle.textSize,
		color: '#262626',
		alignSelf: 'center',
		textAlign: 'center',
	},
	itemDividerStyle: {
		width: 1,
		height: '100%',
		backgroundColor: '#D9D9D9',
	},
	iconExpandIcon: {
		width: CommonStyle.textSize,
		height: CommonStyle.textSize,
	},
	multipleInfoRowContainer: {
		flexDirection: 'row',
		marginBottom: 25,
		justifyContent: 'space-between',
	},
	rightContainerView2: {
		paddingStart: 6,
		borderBottomRightRadius: CommonStyle.cornerRadius8,
	},
	detailHeaderContainer: {
		flexDirection: 'row',
		backgroundColor: '#FAFAFA',
	},
	detailHeaderTextStyle: {
		color: '#7B7B7B',
		fontSize: CommonStyle.textSize,
		padding: CommonStyle.margin8,
	},
	detailRowTextStyle: {
		color: '#3B3B3B',
		fontSize: CommonStyle.textSize,
		padding: CommonStyle.margin8,
		fontWeight: 'bold',
	},
	detailHeaderNum: {
		width: 64,
		borderColor: '#E9E9E9',
		alignItems: 'center',
		borderTopWidth: 1,
		borderEndWidth: 1,
	},
	detailHeaderProduct: {
		flex: 5,
		borderColor: '#E9E9E9',
		borderTopWidth: 1,
		borderEndWidth: 1,
	},
	detailHeaderPaymentFrequencyFee: {
		flex: 5,
		borderColor: '#E9E9E9',
		alignItems: 'flex-end',
		borderTopWidth: 1,
	},
	searchRow1Container: {
		marginBottom: CommonStyle.margin20,
		flexDirection: 'row',
		justifyContent: 'space-between',
		height: 42,
	},
	searchRow2Container: {
		marginBottom: CommonStyle.margin12,
		flexDirection: 'row',
	},
	searchRow3Container: {
		flexDirection: 'row',
		alignItems: 'center',
	},
	searchFromDateContainer: {
		flex: 1,
		marginRight: CommonStyle.margin16,
		height: 42,
	},
	searchStatusContainer: {
		flex: 1,
		flexDirection: 'row',
		marginEnd: CommonStyle.margin16,
		alignItems: 'center',
	},
	searchSaleChanelContainer: {
		flex: 1,
		flexDirection: 'row',
		marginStart: CommonStyle.margin16,
		alignItems: 'center',
		justifyContent: 'flex-end',
	},
	searchFromDateTextInput: {
		// height: 42,
	},
	icon_calendarContainer: {
		position: 'absolute',
		right: 0,
		top: 0,
		width: 40,
		height: 40,
		alignItems: 'center',
		justifyContent: 'center',
	},
	iconCalendar: {
		position: 'absolute',
		right: 7,
		top: 15,
		width: 24,
		height: 24,
	},
	textInputTheme: {
		colors: {
			primary: '#8291AB',
		},
	},
	advancedSearchButton: {
		height: 42,
		width: 170,
	},
	basicSearchButton: {
		height: 42,
		width: 112,
	},
	iconCollapseSearch: {
		height: CommonStyle.textSize,
		width: CommonStyle.textSize,
		marginStart: CommonStyle.margin4,
	},
	collapseSearchContainer: {
		flexDirection: 'row',
		alignItems: 'center',
		paddingHorizontal: CommonStyle.margin20,
		paddingVertical: CommonStyle.margin4,
	},
	basicSearchRow1: {
		flexDirection: 'row',
		alignItems: 'flex-end',
	},
	basicSearchTextInput: {
		// height: CommonStyle.buttonHeaderHeight-2,
		width: 460,
	},
	expandSearchContainer: {
		flexDirection: 'row',
		marginTop: CommonStyle.margin20,
		alignItems: 'center',
	},
	basicListHeader: {
		color: '#282D32',
		fontWeight: '500',
		fontSize: CommonStyle.titlePagelSize,
	},
	listHeaderContainer: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		marginHorizontal: 24,
		marginBottom: CommonStyle.margin16,
	},
	emailButtonContainer: {
		flexDirection: 'row',
		alignItems: 'center',
		backgroundColor: CommonStyle.bgCardColor,
		borderRadius: CommonStyle.cornerRadius4,
		elevation: 1,
		paddingHorizontal: CommonStyle.margin16,
		paddingVertical: CommonStyle.margin4,
		borderWidth: 0.5,
		borderColor: '#D9D9D9',
	},
	iconEmailStyle: {
		height: CommonStyle.textSize,
		width: CommonStyle.textSize,
		marginEnd: CommonStyle.margin4,
	},
	emailTextStyle: {
		color: '#262626',
		fontSize: CommonStyle.textSize,
	},
	snackBarStyle: {
		marginBottom: CommonStyle.margin16,
		width: '50%',
		alignSelf: 'center',
		backgroundColor: '#434343',
	},
	snackBarTheme: {
		colors: {accent: '#FFEAED', surface: '#FAFAFA'},
	},
	listEmptyText: {
		fontSize: CommonStyle.mainTitleButtonSize,
		// alignSelf: 'center',
		textAlign: 'center',
		color: CommonStyle.textColor4,
	},
};
