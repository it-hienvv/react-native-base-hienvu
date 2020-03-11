import {NOTIFICATION_TYPE, LEFT_TAB_APP_TYPE, SYS_TYPE} from './types';

export const NOTIFICATION_ACTION = {
	onOpenDrawer: function() {
		return {
			type: NOTIFICATION_TYPE.OPEN_DRAWER,
		};
	},
	onClose: function() {
		return {
			type: NOTIFICATION_TYPE.CLOSE_DRAWER,
		};
	},
	onOpenNotificationDescription: function() {
		return {
			type: NOTIFICATION_TYPE.OPEN_NOTIFICATION_DESCRIPTION,
		};
	},
	onCloseNotificationDescription: function() {
		return {
			type: NOTIFICATION_TYPE.CLOSE_NOTIFICATION_DESCRIPTION,
		};
	},
};

export const LEFT_APP_TAB_ACTION = {
	onLeftTabItemPress: function(item) {
		return {
			type: LEFT_TAB_APP_TYPE.LEFT_TAB_ITEM_PRESS,
			payload: item,
		};
	},
	onResetRouter: function() {
		return {
			type: LEFT_TAB_APP_TYPE.RESET_LEFT_APP_TAB_ITEM,
		};
	},
};

export const SYS_ACTION = {
	onSetProgress: function(item) {
		return {
			type: SYS_TYPE.ON_SET_PROGRESS,
			payload: item,
		};
	},
	onResetProgress: function() {
		return {
			type: SYS_TYPE.ON_RESET_PROGRESS,
		};
	},
	onDoneSys: function() {
		return {
			type: SYS_TYPE.ON_DONE_SYS,
		};
	},
};
