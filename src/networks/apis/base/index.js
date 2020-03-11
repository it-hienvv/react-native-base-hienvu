import axios from 'axios';
import Config from 'react-native-config';
import {
	API_CONFIG,
	grantType,
	SECRET_KEY,
	REALM_CONFIG,
} from 'contants/contants';
import I18nTran from 'assets/language';
import {AppAlertOnlyOkayWithOutTranslate} from 'utils/util';
import {getCurrentTimeMilliseconds} from 'utils/date-times';
import realmCollectionName from 'utils/realm/realmCollectionName';
import realmHelper from 'utils/realm/realmHelper';
import hashHelper from 'utils/hash/hashHelper';
import {AUTH_URL} from '../url';
import {mainNavigationService} from 'routers/managerNavigator';
import {AUTHENTICATION_STACK} from 'routers/screenNames';
import {AppModalManager} from 'components/app-modal/Manager';

const axiosInit = axios.create({
	baseURL: Config.API_URL,
	timeout: API_CONFIG.TIME_OUT,
});

let initialHeader = {
	Authorization: 'Bearer ',
};

class ApiClient {
	static instance = null;
	headers = initialHeader;
	limitTimeExpire = 0;
	userName = '';
	constructor(_instance) {
		if (ApiClient.instance) {
			return ApiClient.instance;
		} else {
			ApiClient.instance = _instance;
		}
	}

	setHeaderAndExpireTime({token, expireTime, userName}) {
		const currentTime = getCurrentTimeMilliseconds();
		this.limitTimeExpire =
			currentTime +
			expireTime -
			API_CONFIG.TIME_OUT -
			API_CONFIG.BUFFER_TIME;
		this.headers = {
			Authorization: `Bearer ${token}`,
		};
		this.userName = userName;
	}

	_handleResponse = (response, handleError, shouldExtractData = true) => {
		if (response != API_CONFIG.TIMEOUT_MESSAGE) {
			if (handleError) {
				AppModalManager.hideLoading();
				const message = this.handleError(response.data);
				if (message) {
					setTimeout(() => {
						AppAlertOnlyOkayWithOutTranslate({
							title: message,
							onPressOK: () => {},
						});
					}, 500);
				}
			}
			if (!shouldExtractData) return response.data;
			return response.data.data;
		}
		const message = I18nTran.t('time-out');
		if (handleError) {
			AppModalManager.hideLoading();
			setTimeout(() => {
				AppAlertOnlyOkayWithOutTranslate({
					title: message,
					onPressOK: () => {},
				});
			}, 500);
		}
		return {
			message,
		};
	};

	_catchError = (error, handleError, isThrowError = false) => {
		console.log('_catchError', error);
		if (handleError) {
			AppModalManager.hideLoading();
			const message = this.handCatchError({
				error,
			});
			if (message) {
				setTimeout(() => {
					AppAlertOnlyOkayWithOutTranslate({
						title: message,
						onPressOK: () => {},
					});
				}, 500);
			}
		}
		if (isThrowError) {
			throw error;
		} else {
			return error;
		}
	};

	async fetch(
		url,
		data,
		handleError = true,
		timeout = API_CONFIG.RACE_TIME_OUT,
	) {
		await this.handleTokenExpire();
		return Promise.race([
			ApiClient.instance.get(url, {
				params: {
					...data,
				},
				headers: this.headers,
			}),
			new Promise((resolve, reject) => {
				setTimeout(() => {
					resolve(API_CONFIG.TIMEOUT_MESSAGE);
				}, timeout);
			}),
		])
			.then(response => {
				return this._handleResponse(response, handleError);
			})
			.catch(error => {
				return this._catchError(error, handleError);
			});
	}

	async post(url, data, handleError = true) {
		console.log('Post data', data);
		await this.handleTokenExpire();
		return Promise.race([
			ApiClient.instance.post(url, data, {
				headers: this.headers,
			}),
			new Promise((resolve, reject) => {
				setTimeout(() => {
					resolve(API_CONFIG.TIMEOUT_MESSAGE);
				}, API_CONFIG.RACE_TIME_OUT);
			}),
		])
			.then(response => {
				return this._handleResponse(response, handleError, false);
			})
			.catch(error => {
				return this._catchError(error, handleError);
			});
	}

	async fetchHeaderCustom(
		url,
		headerCustomize,
		data = {grantType: grantType.PASSWORD_GRANT},
		isThrowError = false,
		handleError = true,
		isLogin = false,
	) {
		await this.handleTokenExpire();
		return Promise.race([
			ApiClient.instance.get(url, {
				params: {
					...data,
				},
				headers: headerCustomize,
			}),
			new Promise((resolve, reject) => {
				setTimeout(() => {
					resolve(API_CONFIG.TIMEOUT_MESSAGE);
				}, API_CONFIG.RACE_TIME_OUT);
			}),
		])
			.then(response => {
				return this._handleResponse(response, handleError);
			})
			.catch(error => {
				return this._catchError(error, handleError, true);
			});
	}
	async postFormData(url, body, handleError = true) {
		await this.handleTokenExpire();
		let data = new FormData();
		Object.keys(body).forEach(key => {
			if (data[key] instanceof Array) {
				data[key].forEach(value => {
					data.append(`${key}[]`, value);
				});
			} else {
				data.append(key, data[key]);
			}
		});

		return Promise.race([
			ApiClient.instance.post(url, data, {
				...this.headers,
			}),
			new Promise((resolve, reject) => {
				setTimeout(() => {
					resolve(API_CONFIG.TIMEOUT_MESSAGE);
				}, API_CONFIG.RACE_TIME_OUT);
			}),
		])
			.then(response => {
				return this._handleResponse(response, handleError);
			})
			.catch(error => {
				return this._catchError(error, handleError);
			});
	}

	async handleTokenExpire() {
		const currentTime = getCurrentTimeMilliseconds();
		if (currentTime < this.limitTimeExpire) {
			return false;
		} else {
			try {
				const queryString = `accountName = '${this.userName}'`;
				const collection =
					realmCollectionName[REALM_CONFIG.VERSION].USER_SCHEMA_NAME
						.account;
				const getUserFromRealm = await realmHelper.queryAllByFiltering({
					collection,
					condition: queryString,
				});
				const cipherText = getUserFromRealm[0].refreshToken;
				const privateKey = SECRET_KEY.PRIVATE_KEY;
				const refreshToken = hashHelper.decryptMessage({
					cipherText,
					privateKey,
				});
				const headers = {};

				const url = AUTH_URL.authenticate;
				const data = {
					grantType: grantType.REFRESH_TOKEN,
					token: refreshToken,
				};
				const response = await this.fetchHeaderCustom(
					url,
					headers,
					data,
					true,
				);
				const token = response.accessToken;
				const userName = this.userName;
				const expireTime = response.timeExpiration;
				this.setHeaderAndExpireTime({userName, token, expireTime});
				return true;
			} catch (error) {
				mainNavigationService.navigate(AUTHENTICATION_STACK);
				return;
			}
		}
	}

	handleError(errorObj) {
		if (API_CONFIG.API_CODE.SUCCESS_CODE === errorObj.code) {
			return '';
		} else {
			return errorObj.message;
		}
	}

	handCatchError({isLogin = false, error}) {
		const {response: errorObj, message} = error;
		const defaultError = {
			message: I18nTran.t('default-message-error'),
		};
		const AUTH_INVALID = 401;
		const TOKEN_EXPIRE = 1005;
		const DENY_ACCESS = 1008;
		const SERVER_ERROR = 500;
		const ACCOUNT_LOCKED = 1010;
		const PASSWORD_INCORRECT = 400;
		const TIME_OUT_CODE = 'ECONNABORTED';
		if (errorObj) {
			if (errorObj.status === AUTH_INVALID) {
				if (errorObj.data.code === TOKEN_EXPIRE) {
					mainNavigationService.navigate(AUTHENTICATION_STACK);
					return '';
				} else if (
					errorObj.data.code === DENY_ACCESS ||
					errorObj.data.code === ACCOUNT_LOCKED
				) {
					return errorObj.data.message;
				} else {
					return defaultError.message;
				}
			} else if (errorObj.status === SERVER_ERROR) {
				return defaultError.message;
			} else if (errorObj.status === PASSWORD_INCORRECT && isLogin) {
				return '';
			} else {
				if (errorObj.data && errorObj.data.message) {
					return errorObj.data.message;
				} else {
					return defaultError.message;
				}
			}
		} else {
			if (error.code === TIME_OUT_CODE) {
				return I18nTran.t('time-out');
			}
			return message;
		}
	}
}

const Api = new ApiClient(axiosInit);
export default Api;
