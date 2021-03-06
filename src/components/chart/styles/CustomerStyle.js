import CommonStyle from './CommonStyle';
import {View} from 'react-native';
import React from 'react';

export default {
	heightSearch: 32,
	container: {
		flex: 1,
		flexDirection: 'column',
	},
	containerHeader: {
		position: 'absolute',
		top: 0,
		left: 0,
		right: 0,
		height: CommonStyle.headerHeight,
		backgroundColor: CommonStyle.bgCardColor,
		elevation: CommonStyle.elevation,
		paddingLeft: CommonStyle.margin16,
		paddingRight: CommonStyle.margin16,
		justifyContent: 'center',
	},
	containerMain: {
		flex: 1,
		flexDirection: 'row',
		marginTop: CommonStyle.headerHeight,
	},
	containerMainColum: {
		flex: 1,
		flexDirection: 'column',
		marginTop: CommonStyle.headerHeight,
	},
	containerCustomerList: {
		flex: 1,
		flexDirection: 'column',
		// padding: CommonStyle.margin16,
		borderRightWidth: CommonStyle.borderWidth,
		borderRightColor: CommonStyle.borderColor,
	},
	containerSearch: {
		height: 40,
		flexDirection: 'row',
		alignItems: 'center',
		margin: CommonStyle.margin16,
		paddingLeft: CommonStyle.margin8,
		borderRadius: CommonStyle.cornerRadius4,
		borderWidth: CommonStyle.borderWidth,
		borderColor: CommonStyle.borderColor,
		marginBottom: CommonStyle.margin16,
	},
	containerCustomerDetail: {
		flex: 2,
		flexDirection: 'column',
		padding: CommonStyle.margin8,
	},
	iconSearch: {
		width: 20,
		height: 20,
	},
	searchInput: {
		flex: 1,
		marginRight: 38,
		fontSize: CommonStyle.textSize,
	},
	containerIconSearchAdvance: {
		position: 'absolute',
		top: 0,
		right: 0,
		bottom: 0,
		width: 40,
		backgroundColor: '#FAFAFA',
		alignItems: 'center',
		justifyContent: 'center',
		borderLeftWidth: 1,
		borderColor: '#D9D9D9',
		borderRadius: CommonStyle.cornerRadius4,
	},
	flatCustomerList: {
		flex: 1,
	},
	itemCustomerList: {
		backgroundColor: CommonStyle.bgCardColor,
		paddingLeft: CommonStyle.margin16,
		paddingRight: CommonStyle.margin16,
		paddingTop: 12,
		paddingBottom: 12,
		height: 62,
		flexDirection: 'row',
		alignItems: 'center',
	},
	iconAvatar: {
		width: 40,
		height: 40,
	},
	iconBack: {
		width: 30,
		height: 30,
	},
	containerButtonHeader: {
		width: 150,
		height: CommonStyle.buttonHeaderHeight,
	},
	iconBigAvatar: {
		borderRadius: 40,
		width: 80,
		height: 80,
	},
	containerBigAvatar: {
		height: 90,
		marginBottom: CommonStyle.margin4,
		alignItems: 'center',
	},
	containerTextVipBigAvatar: {
		bottom: 0,
		position: 'absolute',
	},
	textBigAvatarVip: {
		textAlignVertical: 'center',
		textAlign: 'center',
		backgroundColor: '#FFF9D9',
		borderColor: '#FFDF99',
		borderWidth: 1,
		color: '#D81221',
		borderRadius: CommonStyle.cornerRadius8,
		fontSize: CommonStyle.caption,
		paddingLeft: CommonStyle.margin8,
		paddingRight: CommonStyle.margin8,
	},
	textBigAvatarThanThiet: {
		textAlignVertical: 'center',
		textAlign: 'center',
		backgroundColor: '#F4FFE8',
		borderColor: '#B9D598',
		borderWidth: 1,
		borderRadius: CommonStyle.cornerRadius8,
		fontSize: CommonStyle.caption,
		color: '#417505',
		paddingLeft: CommonStyle.margin8,
		paddingRight: CommonStyle.margin8,
	},
	textBigAvatarKhaGia: {
		textAlignVertical: 'center',
		textAlign: 'center',
		backgroundColor: '#FEF9F5',
		borderColor: '#E79A61',
		borderWidth: 1,
		borderRadius: CommonStyle.cornerRadius8,
		fontSize: CommonStyle.caption,
		color: '#E79A61',
		paddingLeft: CommonStyle.margin8,
		paddingRight: CommonStyle.margin8,
	},
	textBigAvatarPrivate: {
		textAlignVertical: 'center',
		textAlign: 'center',
		backgroundColor: '#F5F5F6',
		borderColor: '#858485',
		borderWidth: 1,
		borderRadius: CommonStyle.cornerRadius8,
		fontSize: CommonStyle.caption,
		color: '#858485',
		paddingLeft: CommonStyle.margin8,
		paddingRight: CommonStyle.margin8,
	},
	textBigAvatarDaiChung: {
		textAlignVertical: 'center',
		textAlign: 'center',
		backgroundColor: '#F2FAFE',
		borderColor: '#51A2E2',
		borderWidth: 1,
		borderRadius: CommonStyle.cornerRadius8,
		fontSize: CommonStyle.caption,
		color: '#51A2E2',
		paddingLeft: CommonStyle.margin8,
		paddingRight: CommonStyle.margin8,
	},
	textBigAvatar: {
		fontSize: CommonStyle.titleCardSize,
		fontWeight: 'bold',
	},
	containerInfoCustomer: {
		flex: 1,
		flexDirection: 'column',
		paddingLeft: CommonStyle.margin8,
		paddingRight: CommonStyle.margin8,
	},
	sectionCustomerList: {
		paddingLeft: CommonStyle.margin16,
		paddingRight: CommonStyle.margin16,
		paddingTop: CommonStyle.margin16,
		paddingBottom: CommonStyle.margin8,
	},
	textTitleCustomer: {
		fontSize: CommonStyle.textSize,
	},
	textSubtitleCustomer: {
		fontSize: CommonStyle.labelTextSize,
	},
	textSection: {
		fontSize: CommonStyle.titleCardSize,
		color: '#1E578B',
		fontWeight: 'bold',
	},
	viewLine: {
		height: 1,
		marginLeft: CommonStyle.margin16,
		marginRight: CommonStyle.margin16,
		backgroundColor: CommonStyle.textColor2,
	},
	containerCustomerAction: {
		height: 200,
		flexDirection: 'column',
	},
	containerAvatarInCustomerAction: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'flex-start',
	},
	containerActionInCustomerAction: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
	},
	textPage: {
		fontSize: CommonStyle.titlePagelSize,
		fontWeight: 'bold',
	},
	textButtonWhite: {
		borderRadius: CommonStyle.cornerRadius4,
		fontSize: CommonStyle.mainTitleButtonSize,
		color: CommonStyle.textColorWhite,
		backgroundColor: CommonStyle.buttonColor,
		textAlign: 'center',
		textAlignVertical: 'center',
	},
	textButtonBlack: {
		borderRadius: CommonStyle.cornerRadius4,
		fontSize: CommonStyle.mainTitleButtonSize,
		color: CommonStyle.textColor4,
		backgroundColor: CommonStyle.bgColor,
		borderColor: CommonStyle.borderColor,
		borderWidth: CommonStyle.borderWidth,
		textAlign: 'center',
		textAlignVertical: 'center',
	},
	containerChangeInfoBlock1: {
		flexDirection: 'row',
		marginBottom: CommonStyle.margin16,
	},
	containerChangeInfoPhone: {
		flex: 1,
		marginRight: CommonStyle.margin16,
	},
	containerChangeInfoEmail: {
		flex: 2,
	},
	containerTextHeader: {
		flex: 1,
		paddingTop: 10,
		alignItems: 'center',
		// paddingLeft: CommonStyle.margin8,
		flexDirection: 'row',
		marginBottom: CommonStyle.margin8,
	},
	textHeaderBoldCardChangeInfo: {
		color: CommonStyle.defaultTextColor,
		fontSize: CommonStyle.mainTitleButtonSize,
		fontWeight: 'bold',
	},
	textHeaderNormalCardChangeInfo: {
		color: CommonStyle.buttonColor,
		fontSize: CommonStyle.mainTitleButtonSize,
	},
	containerRowCardChangeInfo: {
		flexDirection: 'row',
		alignItems: 'center',
		padding: CommonStyle.margin4,
	},
	textInputStyleCardChangeInfo: {
		flex: 1,
		fontSize: CommonStyle.textSize,
	},
	avatarOverlayContainerStyle: {
		backgroundColor: '#FBFCFE',
		borderColor: '#CCD6DE',
		borderWidth: 1,
	},
	avatarTitleStyle: {
		color: '#535A66',
	},
	containerInfoCustomerRow1: {
		flexDirection: 'row',
	},
	containerInfoCustomerRow2: {
		flexDirection: 'row',
	},
	customerCodeStyle: {
		fontSize: CommonStyle.textSize,
		color: '#3A77AF',
	},
	subTextStyle: {
		fontSize: CommonStyle.labelTextSize,
		color: '#535A66',
	},
	sectionDividerStyle: {
		backgroundColor: '#DCECF7',
		height: 8,
	},
	itemDividerStyle: {
		backgroundColor: '#E1E1E1',
		height: 1,
		width: '70%',
		alignSelf: 'center',
	},
	advancedSearchContainer: {
		// width: '100%',
		alignItems: 'stretch',
		margin: CommonStyle.margin16,
		marginBottom: CommonStyle.margin16,
	},
	accountTypeContainer: {
		height: 45,
		borderRadius: CommonStyle.cornerRadius4,
		borderColor: '#8291AB',
		borderWidth: 1,
	},
	accountTypePicker: {
		marginStart: CommonStyle.margin8,
	},
	statusContainer: {
		height: 45,
		borderRadius: CommonStyle.cornerRadius4,
		borderColor: '#8291AB',
		borderWidth: 1,
		marginTop: CommonStyle.margin16,
	},
	statusLabel: {
		position: 'absolute',
		top: -10,
		left: 8,
		right: 0,
		backgroundColor: 'white',
		width: '30%',
		paddingHorizontal: CommonStyle.margin8,
	},
	searchButtonContainer: {
		flexDirection: 'row',
		marginTop: CommonStyle.margin16,
	},
	containerButtonSearch: {
		height: CommonStyle.buttonHeaderHeight,
		flex: 1,
	},
	cardTitleDividerStyle: {
		backgroundColor: '#E1E1E1',
		height: 1,
		width: '100%',
	},
	cardTitleTextTitle: {
		fontSize: CommonStyle.mainTitleButtonSize,
		color: '#0A263D',
		fontWeight: 'bold',
		alignSelf: 'center',
		marginLeft: CommonStyle.margin4,
	},
	customerSelectedInList: CommonStyle.bgItemSelected,
};
