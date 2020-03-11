import {NOTIFICATION_TYPE, SYS_TYPE} from 'actions/types';

const initState = {
	openNotificationDescriptionStatus: false,
	openDrawerStatus: false,
	progressSys: '',
	onDoneSys: false,
};

export const notificationReducers = (state = initState, action) => {
	switch (action.type) {
		case NOTIFICATION_TYPE.CLOSE_NOTIFICATION_DESCRIPTION: {
			return {
				...state,
				openNotificationDescriptionStatus: false,
			};
		}

		case NOTIFICATION_TYPE.OPEN_NOTIFICATION_DESCRIPTION: {
			return {
				...state,
				openNotificationDescriptionStatus: true,
			};
		}

		case NOTIFICATION_TYPE.OPEN_DRAWER: {
			return {
				...state,
				openDrawerStatus: true,
			};
		}

		case NOTIFICATION_TYPE.CLOSE_DRAWER: {
			return {
				...state,
				openDrawerStatus: false,
				// openNotificationDescriptionStatus: false,
			};
		}

		case SYS_TYPE.ON_SET_PROGRESS: {
			return {
				...state,
				progressSys: action.payload,
			};
		}

		case SYS_TYPE.ON_RESET_PROGRESS: {
			return {
				...state,
				progressSys: '',
				onDoneSys: false,
			};
		}
		case SYS_TYPE.ON_DONE_SYS: {
			return {
				...state,
				onDoneSys: true,
			};
		}
		default:
			return {
				...state,
			};
	}
};
