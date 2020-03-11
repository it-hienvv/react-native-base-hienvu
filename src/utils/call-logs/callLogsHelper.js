import {PermissionsAndroid} from 'react-native';
import CallLogs from 'react-native-call-log';
import {AppAlertOnlyOkay, isIos} from 'utils/util';

const requestPermissionCallLogs = async ({limit, getAll = false}) => {
	try {
		if (isIos) {
			AppAlertOnlyOkay({title: 'ios_not_support_call_logs'});
			return [];
		} else {
			const granted = await PermissionsAndroid.request(
				PermissionsAndroid.PERMISSIONS.READ_CALL_LOG,
				{
					title: 'Call Log RMSmart',
					message: 'Access your call logs',
					buttonNeutral: 'Ask Me Later',
					buttonNegative: 'Cancel',
					buttonPositive: 'OK',
				},
			);
			if (granted === PermissionsAndroid.RESULTS.GRANTED) {
				if (getAll) {
					return CallLogs.loadAll().then(logs => logs);
				}
				return CallLogs.load(limit).then(logs => logs);
			} else {
				AppAlertOnlyOkay({
					title: 'call_logs_permission_denied',
				});
				return [];
			}
		}
	} catch (e) {
		AppAlertOnlyOkay({
			title: 'exception_error',
		});
	}
};

export {requestPermissionCallLogs};
