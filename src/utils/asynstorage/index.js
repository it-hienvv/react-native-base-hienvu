import AsyncStorage from '@react-native-community/async-storage';

export const ASYNC_STORAGE_KEY = {
	USERNAME: 'USERNAME',
	AUTHENTICATE: 'AUTHENTICATE',
	LOGIN_TIME: 'LOGIN_TIME',
	SYS_USER_ID: 'SYS_USER_ID', //Kiểm tra xem sysUserID lưu lại với sysUserID đăng nhập. Nếu khác nhau thì xóa data đi đồng bộ lại
	ACCESS_TOKEN: 'ACCESS_TOKEN',
	REFRESH_TOKEN: 'REFRESH_TOKEN',
};

export const AppGetStorage = async ({
	key,
	isObject = false,
	defaultValue = {},
}) => {
	try {
		let value = await AsyncStorage.getItem(key);
		if (!value) {
			return defaultValue;
		} else if (isObject) {
			return JSON.parse(value);
		} else {
			return value;
		}
	} catch (error) {
		console.log(error);
	}
};

export const AppSetStorage = async ({key, value, isObject = false}) => {
	try {
		if (isObject) {
			return await AsyncStorage.setItem(key, JSON.stringify(value));
		} else {
			return await AsyncStorage.setItem(key, value);
		}
	} catch (error) {
		console.log(error);
	}
};

export const AppClearStorage = async () => {
	try {
		await AsyncStorage.clear();
	} catch (error) {
		console.log(error);
	}
};
