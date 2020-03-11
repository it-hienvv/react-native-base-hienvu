import CommonStyle from './CommonStyle';

export default {
	containerCard: {
		flex: 1,
		// padding: CommonStyle.margin16,
		paddingTop: CommonStyle.margin12,
		// paddingBottom: CommonStyle.margin12,
		backgroundColor: CommonStyle.bgCardColor,
		borderRadius: CommonStyle.cornerRadius8,
		elevation: CommonStyle.elevation,
		overflow: 'hidden',
	},
	containerCardWithNoFlex: {
		// flex: 1,
		padding: CommonStyle.margin16,
		// paddingTop: CommonStyle.margin12,
		// paddingBottom: CommonStyle.margin12,
		backgroundColor: CommonStyle.bgCardColor,
		borderRadius: CommonStyle.cornerRadius8,
		elevation: CommonStyle.elevation,
		overflow: 'hidden',
	},
	containerCardWithNoFlexAndPadding: {
		// flex: 1,
		// padding: CommonStyle.margin16,
		// paddingTop: CommonStyle.margin12,
		// paddingBottom: CommonStyle.margin12,
		backgroundColor: CommonStyle.bgCardColor,
		borderRadius: CommonStyle.cornerRadius8,
		elevation: CommonStyle.elevation,
		overflow: 'hidden',
	},
	containerRow: {
		flex: 1,
		flexDirection: 'row',
		alignItems: 'center',
		paddingLeft: CommonStyle.margin8,
		paddingRight: CommonStyle.margin16,
		marginTop: CommonStyle.margin16,
	},
	containerRowWithRadioButton: {
		flex: 1,
		flexDirection: 'row',
		alignItems: 'center',
		paddingLeft: CommonStyle.margin8,
		paddingRight: CommonStyle.margin16,
	},
	containerRowWithHelperText: {
		flex: 1,
		flexDirection: 'column',
		marginTop: CommonStyle.margin8,
	},
	containerTextHeader: {
		alignItems: 'center',
		paddingLeft: CommonStyle.margin8,
		flexDirection: 'row',
		marginBottom: CommonStyle.margin8,
	},
	containerTextHeaderWithPadding: {
		alignItems: 'center',
		flexDirection: 'row',
		padding: CommonStyle.margin16,
	},
	containerContentCardWithPadding: {
		flexDirection: 'column',
		padding: CommonStyle.margin16,
	},
	titleCard: {
		fontSize: CommonStyle.titleCardSize,
		fontWeight: 'bold',
	},
	labelTitleCard: {
		fontSize: CommonStyle.labelTextSize,
	},
	textHeaderBold: {
		color: CommonStyle.defaultTextColor,
		fontSize: CommonStyle.mainTitleButtonSize,
		fontWeight: 'bold',
	},
	textHeaderNormal: {
		color: CommonStyle.buttonColor,
		fontSize: CommonStyle.mainTitleButtonSize,
	},
	textInput: {
		flex: 1,
		fontSize: CommonStyle.textSize,
	},
	textInputDouble: {
		flex: 2,
		fontSize: CommonStyle.textSize,
	},
	textInputTriple: {
		flex: 3,
		fontSize: CommonStyle.textSize,
	},
	textInfoSelected: {
		color: CommonStyle.defaultTextColor,
		fontSize: CommonStyle.mainTitleButtonSize,
	},
	textInfoUnSelected: {
		color: CommonStyle.textColor2,
		fontSize: CommonStyle.mainTitleButtonSize,
	},
	viewLine: {
		backgroundColor: CommonStyle.borderColor,
		height: CommonStyle.borderWidth,
		width: '100%',
	},
	viewLineVertical: {
		backgroundColor: CommonStyle.borderColor,
		width: CommonStyle.borderWidth,
		height: '100%',
	},
};
