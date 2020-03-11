import {WIDTH_SCREEN} from 'utils/util';
import {PADDING_COMMON} from 'contants/themes/size';
import themes from 'assets/themes';

export default {
	container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
	},
	wrapper: {
		width: WIDTH_SCREEN - 50,
		height: 'auto',
		backgroundColor: themes.getColor('white'),
		borderRadius: 10,
	},
	viewCheckBox: {
		marginTop: PADDING_COMMON,
		flexDirection: 'row',
		justifyContent: 'center',
	},
	rowButton: {
		flexDirection: 'row',
		width: WIDTH_SCREEN / 2 - 50,
		justifyContent: 'flex-start',
		marginTop: PADDING_COMMON,
		marginBottom: PADDING_COMMON,
	},
	textButtonBlue: {
		color: themes.getColor('white'),
		// fontWeight: 'bold',
	},
	textButtonWhite: {
		// fontWeight: 'bold',
	},
	buttonDone: {
		height: 40,
		borderRadius: 5,
		backgroundColor: themes.getColor('mainColor'),
	},
	buttonWhite: {
		marginLeft: 25,
		height: 40,
		borderRadius: 5,
	},
	textInputStyle: {
		flex: 1,
		justifyContent: 'flex-start',
		width: '100%',
		borderWidth: 0,
	},
	triggerElementHideShow: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		height: 30,
	},
	iconDropDown: {
		width: 15,
		height: 15,
		marginLeft: 10,
		tintColor: themes.getColor('blackLight'),
	},
	viewHeader: {
		width: '100%',
		height: 60,
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between',
		borderColor: themes.getColor('grayLight'),
		borderBottomWidth: 1,
		paddingLeft: 30,
		paddingRight: 15,
	},
	viewBody: {
		flex: 1,
		alignItems: 'flex-start',
		justifyContent: 'flex-start',
		paddingHorizontal: PADDING_COMMON,
	},
	cancelImage: {
		width: 25,
		height: 25,
	},
	row: {
		flexDirection: 'row',
		alignItems: 'center',
	},
	rowStart: {
		flexDirection: 'row',
		alignItems: 'center',
		backgroundColor: 'yellow',
	},
	space: {
		width: '100%',
		height: 20,
	},
	multilineInput: {
		textAlignVertical: 'top',
		height: 100,
	},
	fullWidth: {
		width: '100%',
	},
};
