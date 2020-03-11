import {Dimensions, Platform, Alert, Linking} from 'react-native';
import {getStatusBarHeight} from 'react-native-iphone-x-helper';
import I18nTran from 'assets/language';
import qs from 'qs';
import numeral from 'numeral';

export const WIDTH_SCREEN = Dimensions.get('screen').width;
export const HEIGHT_SCREEN = Dimensions.get('screen').height;
export const keyExtractor = (item, index) => (item.id || index).toString();
export const isIos = Platform.OS === 'ios';
export const STATUS_BAR_HEIGHT = getStatusBarHeight();
export const getLeftColor = (level, color1, color2, color3) => {
	switch (level) {
		case 1:
			return color1;
		case 2:
			return color2;
		default:
			return color3;
	}
};

export const getLeftColor2 = (level, color1, color2, color3, color4) => {
	switch (level) {
		case 1:
			return color1;
		case 2:
			return color2;
		case 3:
			return color3;
		default:
			return color4;
	}
};

export function RANDOM_COLOR() {
	return (
		'rgb(' +
		Math.floor(Math.random() * 256) +
		',' +
		Math.floor(Math.random() * 256) +
		',' +
		Math.floor(Math.random() * 256) +
		')'
	);
}

export function AppAlert({title, onPressOK, onPressCancel}) {
	Alert.alert(
		I18nTran.t('notification'),
		I18nTran.t(title),
		[
			{
				text: 'Cancel',
				onPress: onPressCancel,
				style: 'cancel',
			},
			{text: 'OK', onPress: onPressOK},
		],
		{cancelable: false},
	);
}

export function AppAlertOnlyOkay({title, onPressOK = () => {}}) {
	Alert.alert(
		I18nTran.t('notification'),
		I18nTran.t(title),
		[{text: 'OK', onPress: onPressOK}],
		{cancelable: false},
	);
}

export function AppAlertOnlyOkayWithOutTranslate({
	title,
	onPressOK = () => {},
}) {
	Alert.alert(
		I18nTran.t('notification'),
		`${title}`,
		[{text: 'OK', onPress: onPressOK}],
		{cancelable: false},
	);
}

export function appFormatMoney(str, decimal) {
	let strFormat = '0,0';
	const decimalFormat = '.0000';
	if (decimal) {
		strFormat += decimalFormat;
		return numeral(str).format(strFormat);
	}
	return numeral(str).format(strFormat);
}

export function appFormatPhone(str) {
	return str
		.toString()
		.replace(/[^\w\s]/gi, '')
		.replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1-');
}

export const formatMoney = str => {
	// let str = value.toString()
	if (str === null || typeof str === 'undefined' || str.length === 0)
		return '';

	if (str.length === 2 && str[1] === 0 && str[0] === 0) {
		return '0';
	}

	let temp = str;

	for (let i = 0; i < temp.length; i++) {
		if (temp[i] !== '0') {
			temp = temp.substr(i);
			if (temp.length > 1 && temp[0] === '.') {
				temp = temp.substr(1);
			}
			if (temp < 0) {
				return (
					'-' +
					temp
						.toString()
						.replace(/\D/g, '')
						.replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.')
				);
				// console.log("temp ==", temp.toString().replace(/\D/g, '').replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1\."))
			} else {
				return temp
					.toString()
					.replace(/\D/g, '')
					.replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.');
			}
			break;
		}
	}
	if (str < 0) {
		return (
			'-' +
			str
				.toString()
				.replace(/\D/g, '')
				.replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.')
		);
	} else {
		return str
			.toString()
			.replace(/\D/g, '')
			.replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.');
	}
};

export const renameKeys = (keysMap, obj) => {
	const newObj = Object.keys(obj).reduce(
		(acc, key) => ({
			...acc,
			...{[keysMap[key] || key]: obj[key]},
		}),
		{},
	);
	return newObj;
};

export const makePhoneCall = async phoneNumber => {
	try {
		const url = `tel:${phoneNumber}`;
		const supported = await Linking.canOpenURL(url);
		if (supported) {
			const opened = await Linking.openURL(url);
			return opened;
		} else {
			AppAlertOnlyOkay({
				title: 'device_not_support',
				onPressOK: () => {},
			});
			return false;
		}
	} catch (error) {
		AppAlertOnlyOkay({
			title: 'exception_error',
			onPressOK: () => {},
		});
	}
};

export const makePhoneSMS = async ({phone, message = 'message'}) => {
	try {
		const url = `sms:${phone}${
			Platform.OS === 'ios' ? '&' : '?'
		}body=${message}`;
		const supported = await Linking.canOpenURL(url);
		if (supported) {
			const opened = await Linking.openURL(url);
			return opened;
		} else {
			AppAlertOnlyOkay({
				title: 'device_not_support',
				onPressOK: () => {},
			});
			return false;
		}
	} catch (error) {
		AppAlertOnlyOkay({
			title: 'exception_error',
			onPressOK: () => {},
		});
	}
};

export const makePhoneEmail = async ({to, subject, body, options = {}}) => {
	try {
		const {cc, bcc} = options;
		let url = `mailto:${to}`;
		const query = qs.stringify({
			subject: subject,
			body: body,
			cc: cc,
			bcc: bcc,
		});

		if (query.length) {
			url += `?${query}`;
		}
		const supported = await Linking.canOpenURL(url);
		if (supported) {
			const opened = await Linking.openURL(url);
			return opened;
		} else {
			AppAlertOnlyOkay({
				title: 'device_not_support',
				onPressOK: () => {},
			});
		}
	} catch (error) {
		AppAlertOnlyOkay({
			title: 'exception_error',
			onPressOK: () => {},
		});
	}
};

const insertString = (string, index, stringInsert) => {
	return (
		string.slice(0, index) +
		stringInsert +
		string.slice(index, string.length)
	);
};

const insertSpace = (string, index) => {
	return insertString(string, index, ' ');
};

export const formatPhoneNumberWithoutAddZero = phoneNumber => {
	if (!phoneNumber) return '';
	const isStartWithPlus = phoneNumber.toString().startsWith('+');
	let newPhoneNumber = phoneNumber.toString().replace(/[^0-9]/g, '');

	if (newPhoneNumber.length === 10) {
		newPhoneNumber = insertSpace(newPhoneNumber, 6);
		newPhoneNumber = insertSpace(newPhoneNumber, 3);
		return isStartWithPlus ? `+${newPhoneNumber}` : newPhoneNumber + '';
	} else if (newPhoneNumber.length === 11) {
		newPhoneNumber = insertSpace(newPhoneNumber, 7);
		newPhoneNumber = insertSpace(newPhoneNumber, 3);
		return isStartWithPlus ? `+${newPhoneNumber}` : newPhoneNumber + '';
	} else if (newPhoneNumber.length < 10 || newPhoneNumber.length > 11) {
		if (newPhoneNumber.length >= 10) {
			newPhoneNumber = insertSpace(newPhoneNumber, 9);
		}
		if (newPhoneNumber.length >= 7) {
			newPhoneNumber = insertSpace(newPhoneNumber, 6);
		}
		if (newPhoneNumber.length >= 4) {
			newPhoneNumber = insertSpace(newPhoneNumber, 3);
		}
		return isStartWithPlus ? `+${newPhoneNumber}` : newPhoneNumber + '';
	}
	return isStartWithPlus ? `+${newPhoneNumber}` : newPhoneNumber + '';
};

export const removeAccent = str => {
	str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, 'a');
	str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, 'e');
	str = str.replace(/ì|í|ị|ỉ|ĩ/g, 'i');
	str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, 'o');
	str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, 'u');
	str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, 'y');
	str = str.replace(/đ/g, 'd');
	str = str.replace(/À|Á|Ạ|Ả|Ã|Â|Ầ|Ấ|Ậ|Ẩ|Ẫ|Ă|Ằ|Ắ|Ặ|Ẳ|Ẵ/g, 'A');
	str = str.replace(/È|É|Ẹ|Ẻ|Ẽ|Ê|Ề|Ế|Ệ|Ể|Ễ/g, 'E');
	str = str.replace(/Ì|Í|Ị|Ỉ|Ĩ/g, 'I');
	str = str.replace(/Ò|Ó|Ọ|Ỏ|Õ|Ô|Ồ|Ố|Ộ|Ổ|Ỗ|Ơ|Ờ|Ớ|Ợ|Ở|Ỡ/g, 'O');
	str = str.replace(/Ù|Ú|Ụ|Ủ|Ũ|Ư|Ừ|Ứ|Ự|Ử|Ữ/g, 'U');
	str = str.replace(/Ỳ|Ý|Ỵ|Ỷ|Ỹ/g, 'Y');
	str = str.replace(/Đ/g, 'D');
	return str;
};

export function appRandomKey(salt) {
	return `${new Date().getTime()}_${Math.random() *
		new Date().getTime()}_${salt}`;
}
