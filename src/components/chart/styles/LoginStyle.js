import CommonStyle from './CommonStyle';

export default {
	containerViewForm2: {
		width: 400,
		height: 350,
		alignItems: 'center',
		justifyContent: 'center',
		borderWidth: 1,
		borderColor: 'black',
		backgroundColor: 'white',
		borderRadius: 5,
		marginBottom: 100,
	},
	button: {
		width: 304,
		height: 48,
		padding: 10,
		borderWidth: 1,
		backgroundColor: '#3A77AF',
		alignItems: 'center',
		borderRadius: 4,
		marginBottom: 15,
		marginTop: 15,
	},
	buttonX: {
		height: 20,
		backgroundColor: '#2d5986',
		borderRadius: 20,
		marginRight: 10,
		width: 20,
	},
	input: {
		width: 304,
		height: 42,
		padding: 10,
		borderWidth: 1,
		borderColor: 'black',
		marginBottom: 10,
		marginTop: 15,
		borderRadius: 4,
		backgroundColor: '#FFFFFF',
	},
	viewModal: {
		flex: 1,
		backgroundColor: 'white',
		opacity: 0.5,
	},

	support: {
		flex: 1,
		flexDirection: 'row',
	},
	displayUsername: {
		flexDirection: 'row',
		position: 'absolute',
		top: 80,
		backgroundColor: 'white',
		borderColor: 'black',
		borderRadius: 10,
		borderWidth: 1,
		padding: 5,
		paddingLeft: 20,
		paddingRight: 20,
	},
	textTitle1: {
		color: CommonStyle.defaultTextColor,
		paddingLeft: CommonStyle.margin8,
		paddingRight: CommonStyle.margin8,
		fontWeight: 'bold',
		fontSize: CommonStyle.titlePagelSize,
	},
	textHoTro: {
		color: '#2d5986',
	},
	textVersion: {
		alignItems: 'center',
		color: CommonStyle.textColor3,
		fontSize: CommonStyle.textSize,
	},
	textHeader: {
		color: '#FFFFFF',
		fontSize: 80,
		fontWeight: 'bold',
	},
	textHeader1: {
		color: '#FFFFFF',
		fontSize: 24,
		fontWeight: 'bold',
	},
	buttonNext: {
		color: '#FFFFFF',
		fontSize: 16,
		alignSelf: 'center',
		justifyContent: 'center',
		marginLeft: 5,
	},
	closeUser: {
		color: 'white',
		fontSize: 16,
		width: 20,
		borderRadius: 15,
		alignSelf: 'center',
		justifyContent: 'center',
		paddingLeft: 2,
	},
	WebView: {
		backgroundColor: '#ffffff',
		alignSelf: 'flex-end',
		flex: 2,
	},
	viewButtonX: {
		alignSelf: 'flex-end',
		width: 50,
	},
	supportRow: {
		paddingTop: CommonStyle.margin16,
		flexDirection: 'row',
	},
	viewRender: {
		flex: 1,
		backgroundColor: 'transparent',
		alignItems: 'center',
		flexDirection: 'row',
		paddingLeft: 50,
		paddingRight: 50,
	},
	imageBackground: {
		flex: 1,
		backgroundColor: '#2d5986',
	},
	containerViewLogo: {
		flex: 1,
		flexDirection: 'column',
	},
	containerViewLogin: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'flex-end',
	},
	containerViewBgLogin: {
		position: 'absolute',
		top: 35,
		bottom: 0,
		left: 0,
		right: 0,
		borderWidth: CommonStyle.borderWidth,
		borderColor: CommonStyle.borderColor,
		backgroundColor: CommonStyle.bgCardColor,
		borderRadius: CommonStyle.cornerRadius8,
	},
	backgroundColor: 'blue',
	containerViewVersion: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
	},
	containerViewTextSoTayBanHang: {
		height: 60,
		width: '100%',
		// justifyContent: 'center',
		// alignItems: 'center',
		// flexDirection: 'row',
	},
	iconMB: {
		width: 155,
		height: 87,
		marginBottom: 30,
		resizeMode: 'contain',
	},
	iconLogo: {
		width: 40,
		height: 40,
		marginRight: CommonStyle.margin8,
		marginLeft: CommonStyle.margin8,
	},
	viewLine: {
		height: 0.5,
		width: '50%',
		backgroundColor: CommonStyle.bgColor,
		borderWidth: 0.3,
		borderColor: '#FFFFFF',
	},
	viewLine1: {
		flex: 1,
		height: 0.5,
		width: '35%',
		backgroundColor: CommonStyle.borderColor,
		borderWidth: 0.3,
		borderColor: 'black',
	},
	viewLine2: {
		flex: 1,
		height: 0.5,
		backgroundColor: CommonStyle.borderColor,
	},
	viewLine3: {
		flex: 1,
		height: 0.5,
		width: '20%',
		backgroundColor: CommonStyle.bgColor,
		borderWidth: 0.3,
		borderColor: 'black',
		marginTop: 25,
	},
	containerViewForm: {
		width: 350,
		height: 480,
	},
	textTitle: {
		marginBottom: 55,
	},
	isLoading: {
		flex: 1,
		justifyContent: 'space-evenly',
		padding: 10,
	},
	containerLisNotify: {
		flexDirection: 'row',
		flex: 1,
	},
	containerAvatar: {
		flex: 2,
		height: 100,
		borderColor: 'black',
	},
	avatar: {
		marginLeft: 20,
	},
	containerData: {
		flex: 8,
		height: 100,
		borderColor: 'black',
		borderRightColor: 'black',
	},
	data: {
		height: 50,
	},
	headerNotifyDetail: {
		flex: 1,
		backgroundColor: 'white',
		opacity: 1,
		borderColor: '#c3cad6',
		borderWidth: 0.5,
	},
	opacity: {
		flex: 1,
		backgroundColor: 'black',
		opacity: 0.5,
	},
	containerNotification: {
		flex: 1,
		flexDirection: 'row',
	},
	sidebarLeft: {
		flex: 1,
		backgroundColor: 'black',
		opacity: 0.5,
		borderWidth: 0.5,
	},
	sidebarRight: {
		backgroundColor: '#ffffff',
		alignSelf: 'flex-end',
		flex: 1,
		height: '100%',
		borderColor: '#c3cad6',
	},
	containerViewNotify: {
		flexDirection: 'row',
		height: 60,
	},
	notify: {
		alignSelf: 'center',
	},
	notifyText: {
		alignSelf: 'center',
		marginLeft: 20,
	},
	containerButton: {
		alignSelf: 'center',
		width: 50,
		marginLeft: 295,
	},
	newNotification: {
		height: 25,
		backgroundColor: '#f2f2f2',
	},
	streamLeft: {
		marginLeft: 20,
	},
	allNotification: {
		height: 25,
		backgroundColor: '#f2f2f2',
	},
	smartRMVersion: {
		alignSelf: 'center',
		color: '#555555',
		fontSize: 14,
		marginTop: 15,
	},
	byMBBank: {
		alignSelf: 'center',
		color: '#555555',
		fontSize: 14,
		marginBottom: 20,
	},
	bottomLine: {
		flexDirection: 'row',
		paddingTop: 58,
	},
	iconContinue: {
		height: 20,
		width: 20,
		resizeMode: 'contain',
		alignItems: 'center',
	},
	viewUsername: {
		borderRadius: 26.5,
		backgroundColor: '#F1F9FF',
		borderWidth: 0.3,
		flexDirection: 'row',
		alignItems: 'center',
		padding: CommonStyle.margin4,
	},
	flexDirection: {
		flexDirection: 'row',
	},
	logoLogin: {
		width: 100,
		height: 100,
	},
	flexOne: {
		flex: 1,
	},
	logoLine: {
		flexDirection: 'row',
		paddingTop: 70,
	},
	iconLeft: {
		width: 24,
		height: 24,
		resizeMode: 'contain',
		marginRight: 8,
	},
	iconUser: {
		height: 30,
		width: 30,
		resizeMode: 'contain',
		marginLeft: 8,
	},
	textInput: {
		flex: 1,
		fontSize: CommonStyle.textSize,
	},
	containerRow: {
		width: '100%',
		height: 60,
	},
	containerViewLoading: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
	},
};
