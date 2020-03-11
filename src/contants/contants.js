import {isIos} from 'utils/util';
import RNFS from 'react-native-fs';
import Config from 'react-native-config';
export const LEFT_TAB_KEY = {
	saleKit: {
		key: 1,
		name: 'sale-kit',
	},
	home: {
		key: 0,
		name: 'home',
	},
	currentCustomer: {
		key: 2,
		name: 'current-customer',
	},
	kpi: {
		key: 3,
		name: 'kpi',
	},
	opportunity: {
		key: 4,
		name: 'opportunity',
	},
	clue: {
		key: 5,
		name: 'clue-customer',
	},
	questionCustomer: {
		key: 6,
		name: 'question-customer',
	},
	warningCustomer: {
		key: 7,
		name: 'warning',
	},
};

export const NAVIGATOR = {
	MAIN_NAVIGATOR: 1,
	MAIN_MENU_NAVIGATOR: 2,
};

// APP REALM VERSION
const VERSION = 1.0;
const REALM_DB_NAME = `realmSmartAtiDb_${VERSION.toFixed(1)}.realm`;
export const REALM_CONFIG = {
	VERSION,
	REALM_DB_NAME,
};

// APP VERSION
export const APP_CONFIG = {
	VERSION: '0.0.1',
};

// API
const BUFFER_TIME = 5;
const TIME_OUT = 10 * 1000;
const RACE_TIME_OUT = 60 * 1000;
const TIMEOUT_MESSAGE = 'TIMEOUT';
const API_VERSION = 'v1.0';
const RESPONSE_ERROR_CODE = {
	1000: {
		message: 'Refresh token hết hạn',
	},
	1001: {
		message: 'Refresh token không tồn tại',
	},
	1002: {
		message: 'Refresh token là bắt buộc',
	},
	1003: {
		message: 'Grant type không được hỗ trợ',
	},
	1004: {
		message: 'Token không hợp lệ',
	},
	1005: {
		message: 'Token hết hạn',
	},
};
const CATCH_ERROR_CODE = {
	400: {
		message: 'Bad request, chắc sai đường dẫn rồi, check lại xem',
	},
	401: {
		message: 'Unauthorized, sai tài khoản hoặc mật khẩu bạn ơi',
	},
	402: {
		message: 'Payment Required',
	},
	403: {
		message: 'Forbidden, check lại header request đi bạn',
	},
	404: {
		message: 'Not Found',
	},
	408: {
		message: 'Request Timeout',
	},
	500: {
		message: 'Lỗi của bọn server đó, chửi nó đi',
	},
};
const API_CODE = {
	RESPONSE_ERROR_CODE,
	CATCH_ERROR_CODE,
	SUCCESS_CODE: 0,
};
export const API_CONFIG = {
	TIME_OUT,
	API_CODE,
	API_VERSION,
	BUFFER_TIME,
	RACE_TIME_OUT,
	TIMEOUT_MESSAGE,
};

export const grantType = {
	PASSWORD_GRANT: 'PASSWORD_GRANT',
	REFRESH_TOKEN: 'REFRESH_TOKEN',
};

export const ATTACH_FILE_URL = {
	ATTACHMENT: 'https://crm.mbbank.com.vn/CRMWS/rest/attachment/file',
};

const IOS_LOCATION_PATH = RNFS.DocumentDirectoryPath;
const ANDROID_LOCATION_PATH = RNFS.ExternalDirectoryPath;
const LOCATION_PATH = isIos ? IOS_LOCATION_PATH : ANDROID_LOCATION_PATH;
export const STORAGE = {
	LOCATION_PATH,
};

const REALM_DB_SECRET_KEY = {
	MESSAGE: Config.MESSAGE ? Config.MESSAGE : 'ATIDB@REACTNATIVE-TEAM',
};
const PRIVATE_KEY = Config.PRIVATE_KEY ? Config.PRIVATE_KEY : 'ATI-SECRET-KEY';
export const SECRET_KEY = {
	REALM_DB_SECRET_KEY,
	PRIVATE_KEY,
};

const HOUR_NUMBER_SYS = 2;
export const SYS_CONFIG = {
	timeSys: HOUR_NUMBER_SYS * 60 * 60,
	// timeSys: 60,
};

export const LENGTH_PHONE_NUMBER = 14;

export const LENGTH_COMPANY_WEBSITE = 50;

export const MAX_LENGTH_COMMON = 100;

export const LENGTH_NUMBER_OF_DAY = 10;

export const LENGTH_QUANTITY = 3;

export const LENGTH_EMPLOYEE_NUMBER = 6;

export const LENGTH_NAME = 200;

export const LENGTH_TAX_CODE = 20;

export const LENGTH_NOTE = 1000;

export const ACTIVITY_TYPE = {
	CALL: 1,
	SMS: 2,
	EMAIL: 3,
	MEETING: 4,
};

export const ACTIVITY_EXPIRE_PERIOD = 3 * 86400; // 3 days in ms
