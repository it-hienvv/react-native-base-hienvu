import CommonStyle from './CommonStyle';
import customerStyle from './CustomerStyle';
import cardStyle from './CardStyle';

let buttonHeight = 58;
let normalInputTextHeight = buttonHeight - 2;
let smallInputTextHeight = normalInputTextHeight - 10;

let positiveButtonContainer = {
	justifyContent: 'center',
	alignItems: 'center',
	borderRadius: CommonStyle.cornerRadius4,
	height: buttonHeight,
	backgroundColor: CommonStyle.buttonColor,
	paddingHorizontal: CommonStyle.margin16,
	paddingVertical: CommonStyle.margin12,
	flexDirection: 'row',
	// borderColor: CommonStyle.textColor3,
	// borderWidth: 1,
	// flex: 1,
};
let negativeButtonContainer = {
	justifyContent: 'center',
	alignItems: 'center',
	borderRadius: CommonStyle.cornerRadius4,
	height: buttonHeight,
	backgroundColor: '#F5F5F6',
	borderColor: CommonStyle.textColor3,
	borderWidth: 1,
	paddingHorizontal: CommonStyle.margin16,
	paddingVertical: CommonStyle.margin12,
	// flex: 1,
};

export default {
	containerMainColumn: {
		flex: 1,
		flexDirection: 'column',
		marginTop: CommonStyle.headerHeight,
	},
	searchContainer: {
		padding: CommonStyle.margin16,
		backgroundColor: CommonStyle.bgCardColor,
		borderRadius: CommonStyle.cornerRadius8,
		elevation: 2,
		// marginHorizontal: 24,
		flexDirection: 'row',
		alignItems: 'flex-end',
	},
	normalTextInput: {
		height: normalInputTextHeight,
		// flex: 1,
	},
	smallTextInput: {
		height: smallInputTextHeight,
		// flex: 1,
	},
	searchTextInput: {
		// height: 40, //CommonStyle.buttonHeaderHeight - 2,
		width: 350,
	},
	textInputTheme: {
		colors: {
			primary: '#8291AB',
			placeholder: '#8291AB',
			background: '#FFFFFF',
		},
	},
	positiveButtonContainer: {...positiveButtonContainer},
	negativeButtonContainer: {...negativeButtonContainer},
	searchButtonContainer: [
		positiveButtonContainer,
		{
			borderTopLeftRadius: 0,
			borderBottomLeftRadius: 0,
			marginStart: -3,
			width: 112,
		},
	],
	addNewLCButton: {
		flexDirection: 'row',
		marginStart: CommonStyle.margin8,
		width: 180,
		justifyContent: 'center',
		alignItems: 'center',
		borderRadius: CommonStyle.cornerRadius4,
		backgroundColor: CommonStyle.buttonColor,
		height: CommonStyle.buttonHeaderHeight,
	},
	iconAddStyle: {
		width: 16,
		height: 16,
		marginEnd: CommonStyle.margin8,
	},
	normalButtonText: {
		fontSize: CommonStyle.mainTitleButtonSize,
		color: CommonStyle.textColorWhite,
	},
	searchButtonText: [
		customerStyle.textButtonWhite,
		customerStyle.containerButtonSearch,
		{
			borderBottomLeftRadius: 0,
			borderTopLeftRadius: 0,
			marginStart: -4,
		},
	],
	addNewButtonText: {
		fontSize: CommonStyle.mainTitleButtonSize,
		color: CommonStyle.textColorWhite,
		textAlign: 'center',
	},
	loanConsultingListStyleContainer: {
		marginTop: CommonStyle.margin20,
		flex: 1,
		// paddingEnd: 24,
	},
	centerLoaderView: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
	},
	itemContainer: {
		width: '32%',
		padding: CommonStyle.margin12,
		backgroundColor: CommonStyle.bgCardColor,
		borderRadius: CommonStyle.cornerRadius8,
		elevation: 2,
		flexDirection: 'row',
		marginVertical: CommonStyle.margin8,
		overflow: 'hidden',
	},
	avatarOverlayContainerStyle: {
		backgroundColor: '#FBFCFE',
		borderColor: '#CCD6DE',
		borderWidth: 1,
	},
	avatarTitleStyle: {
		color: '#535A66',
	},
	columnInfoStyle: {
		flex: 1,
		marginHorizontal: CommonStyle.margin16,
		justifyContent: 'space-between',
	},
	itemNameText: {
		color: '#171B20',
		fontSize: CommonStyle.mainTitleButtonSize,
		marginBottom: CommonStyle.margin4,
	},
	itemLoanTypeText: {
		fontSize: CommonStyle.textSize,
		color: '#7B7B7B',
		marginBottom: CommonStyle.margin4,
	},
	itemUpdatedDateText: {
		fontSize: CommonStyle.textSize,
		color: '#555555',
		alignSelf: 'flex-end',
	},
	itemEmailText: {
		fontSize: CommonStyle.textSize,
		color: '#7B7B7B',
		flex: 1,
	},
	menuItemDeleteTheme: {
		colors: {
			text: '#D81221',
		},
	},
	stepViewSelected: {
		width: 24,
		height: 24,
		marginHorizontal: 5,
		backgroundColor: CommonStyle.buttonColor,
		borderRadius: 12,
		alignItems: 'center',
		justifyContent: 'center',
	},
	stepViewUnSelected: {
		width: 24,
		height: 24,
		marginHorizontal: 5,
		backgroundColor: '#cdcdcd',
		borderRadius: 12,
		alignItems: 'center',
		justifyContent: 'center',
	},
	stepViewText: {
		fontSize: 16,
		color: '#FFF',
	},
	selectedStepNote: {
		color: '#474E57',
	},
	notSelectedStepNote: {
		color: '#7B7B7B',
	},
	stepDivider: {
		height: 1,
		width: 10,
		alignSelf: 'center',
		marginHorizontal: CommonStyle.margin8,
	},
	customerInfoContainer: {
		// padding: CommonStyle.margin16,
		paddingVertical: CommonStyle.margin16,
		backgroundColor: CommonStyle.bgCardColor,
		borderRadius: CommonStyle.cornerRadius8,
		elevation: 2,
		// marginHorizontal: 16,
		// flexDirection: 'row',
		// alignItems: 'flex-end',
		marginBottom: CommonStyle.margin16,
	},
	componentCardTitle: {
		fontSize: CommonStyle.titleCardSize,
		color: '#0A263D',
		fontWeight: 'bold',
		paddingStart: CommonStyle.margin16,
		marginBottom: CommonStyle.margin12,
	},
	componentCardSubTitle: {
		fontSize: CommonStyle.secondTitleButtonSize,
		color: '#7B7B7B',
		fontWeight: 'bold',
	},
	componentCardDivider: {
		height: 1,
		color: 'grey',
		width: '100%',
		marginBottom: CommonStyle.margin12,
	},
	resultHeaderRowContainer: {
		flexDirection: 'row',
		paddingHorizontal: CommonStyle.margin16,
		paddingVertical: CommonStyle.margin4,
	},
	resultRowContainer: {
		flexDirection: 'row',
		paddingHorizontal: CommonStyle.margin16,
		paddingVertical: CommonStyle.margin12,
	},
	resultCol1Container: {
		width: 80,
	},
	resultCol2Container: {
		flex: 3,
		alignItems: 'flex-end',
		justifyContent: 'center',
		paddingLeft: CommonStyle.margin16,
	},
	resultHeaderText: {
		color: '#7B7B7B',
		fontSize: CommonStyle.mainTitleButtonSize,
	},
	resultText: {
		color: '#262626',
		fontSize: CommonStyle.mainTitleButtonSize,
	},
	snackBarErrorStyle: {
		marginBottom: CommonStyle.margin16,
		width: '50%',
		alignSelf: 'center',
		backgroundColor: '#D0021B',
	},
	snackBarSuccessStyle: {
		marginBottom: CommonStyle.margin16,
		width: '50%',
		alignSelf: 'center',
		backgroundColor: CommonStyle.buttonColor,
	},
	snackBarErrorTheme: {
		colors: {accent: '#FFEAED', surface: '#FAFAFA'},
	},
	iconWarningStyle: {
		width: 16,
		height: 16,
		marginEnd: CommonStyle.margin8,
	},
	iconTick: {
		width: 8,
		height: 8,
	},
	collapseIcon: {
		width: 16,
		height: 16,
		marginEnd: CommonStyle.margin16,
	},
	checkboxContainer: {
		flexDirection: 'row',
		alignItems: 'center',
		marginStart: -CommonStyle.margin8,
		marginEnd: CommonStyle.margin8,
	},
	infoIcon: {
		width: CommonStyle.headerHeight,
		height: CommonStyle.headerHeight,
	},
	emailConfirmContainer: {
		borderRadius: CommonStyle.cornerRadius4,
		padding: CommonStyle.margin20,
		alignItems: 'center',
		justifyContent: 'center',
		width: 360,
	},
	emailConfirmText: {
		fontSize: CommonStyle.titlePagelSize,
		color: '#262626',
		textAlign: 'center',
		marginVertical: CommonStyle.margin20,
	},

	selectingDocsContainer: {
		height: 200,
		borderWidth: 1,
		borderColor: '#CCD6DE',
		borderTopWidth: 0,
		borderBottomLeftRadius: CommonStyle.cornerRadius4,
		borderBottomRightRadius: CommonStyle.cornerRadius4,
		marginTop: 0,
	},
	commonEmailTextStyle: {
		fontSize: CommonStyle.mainTitleButtonSize,
		color: '#222222', // CommonStyle.defaultTextColor,
		paddingVertical: CommonStyle.margin4,
	},
	iconAttachment: {
		width: CommonStyle.buttonHeaderHeight,
		height: CommonStyle.buttonHeaderHeight,
		marginEnd: CommonStyle.margin20,
	},
	labelText: {
		color: '#0A263D',
		fontSize: CommonStyle.mainTitleButtonSize,
		fontWeight: '700',
	},
	commonIconStyle: {
		width: 24,
		height: 24,
		padding: CommonStyle.margin8,
	},
	pickerContainer: {
		height: buttonHeight,
		borderColor: '#8291AB',
		borderWidth: 1,
		borderRadius: CommonStyle.cornerRadius4,
	},
};
