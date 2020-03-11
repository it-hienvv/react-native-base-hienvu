import {StyleSheet} from 'react-native';
import themes from 'assets/themes';
const HEADER_HEIGHT = 50;
const CALENDAR_HEIGHT = 100;
const HEIGHT_ROW = 80;

export default styles = StyleSheet.create({
	textHour: {
		color: themes.getColor('grayBold'),
		textAlign: 'center',
	},
	viewLineHour: {
		height: HEIGHT_ROW,
		alignItems: 'center',
		justifyContent: 'center',
		borderColor: themes.getColor('grayLight'),
		flexDirection: 'row',
	},
	cellLine: {
		borderBottomWidth: 1,
		borderLeftWidth: 1,
		borderColor: themes.getColor('grayLight'),
	},
	wrapDataItem: {
		borderRadius: 10,
		borderLeftWidth: 1,
		borderColor: themes.getColor('grayLight'),
		position: 'absolute',
	},
	cellLeftCalendar: {
		height: CALENDAR_HEIGHT,
		borderTopWidth: 1,
		borderBottomWidth: 1,
		borderRightWidth: 1,
		borderColor: themes.getColor('grayLight'),
	},
	flexRow: {
		flexDirection: 'row',
	},
	textMonthDay: {marginTop: 8},
	viewMonthDay: {
		backgroundColor: themes.getColor('mainColor'),
		height: 36,
		width: 36,
		borderRadius: 18,
		alignItems: 'center',
		justifyContent: 'center',
	},
	textMonthDayToday: {
		color: themes.getColor('white'),
	},
	textWeekDay: {
		marginTop: 8,
		color: themes.getColor('mainColor'),
	},
	viewDayComponent: {
		alignItems: 'center',
		justifyContent: 'center',
	},
	weekEnd: {
		color: 'red',
	},
	weekDay: {
		color: themes.getColor('grayBold'),
	},
	flexOne: {
		flex: 1,
	},
	gesture: {
		height: CALENDAR_HEIGHT,
		borderColor: themes.getColor('grayLight'),
		borderTopWidth: 1,
		borderBottomWidth: 1,
	},
	viewItemBig: {
		flex: 1,
		marginLeft: 3,
		borderTopRightRadius: 10,
		borderBottomRightRadius: 10,
		flexDirection: 'row',
	},
	viewItemSmall: {
		flex: 1,
		padding: 4,
		paddingLeft: 10,
		borderWidth: 1,
		borderLeftWidth: 0,
		borderColor: themes.getColor('grayLight'),
		borderTopRightRadius: 10,
		borderBottomRightRadius: 10,
		flexDirection: 'row',
	},
	itemDescription: {lineHeight: 20},
	textButton: {
		color: themes.getColor('white'),
	},
	viewButton: {
		width: '100%',
		height: 40,
		backgroundColor: themes.getColor('mainColor'),
		borderRadius: 5,
		marginTop: 10,
		alignItems: 'center',
		justifyContent: 'center',
	},
	textOption: {
		marginLeft: 15,
	},
	iconOption: {
		width: 30,
		height: 30,
		resizeMode: 'contain',
		tintColor: themes.getColor('blackBold'),
	},
	viewOptionSmall: {
		flexDirection: 'row',
		alignItems: 'center',
	},
	viewOptionBig: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		marginTop: 10,
		alignItems: 'center',
	},
	viewAllOptions: {
		width: 300,
		backgroundColor: 'white',
		borderRadius: 10,
		borderColor: themes.getColor('grayBold'),
		borderWidth: 1,
		paddingVertical: 15,
		paddingHorizontal: 20,
	},
	calendar: {
		borderRadius: 10,
		backgroundColor: 'white',
		overflow: 'hidden',
		borderLeftWidth: 1,
		borderRightWidth: 1,
		borderBottomWidth: 1,
		borderColor: themes.getColor('grayLight'),
	},
	iconPlus: {
		marginLeft: 10,
		height: 20,
		width: 20,
		resizeMode: 'contain',
		tintColor: themes.getColor('mainColor'),
	},
	iconFilter: {
		height: 24,
		width: 24,
		resizeMode: 'contain',
	},
	viewWrapIcon: {flexDirection: 'row'},
	textNote: {
		marginLeft: 5,
		marginRight: 15,
	},
	viewNoteRed: {
		height: 15,
		width: 20,
		borderRadius: 2,
		backgroundColor: themes.getColor('red'),
	},
	viewNoteBlue: {
		height: 15,
		width: 20,
		borderRadius: 2,
		backgroundColor: themes.getColor('mainColor'),
	},
	viewNoteYellow: {
		height: 15,
		width: 20,
		borderRadius: 2,
		backgroundColor: themes.getColor('yellow'),
	},
	viewWrapNote: {
		flexDirection: 'row',
		alignItems: 'center',
	},
	wrapHeader: {
		height: HEADER_HEIGHT,
		paddingHorizontal: 10,
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
	},
});
