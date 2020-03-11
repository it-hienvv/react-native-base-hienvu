import {createSelector} from 'reselect';

const _notificationSelector = state =>
	state.notificationReducers.openNotificationDescriptionStatus;

const _drawerOpenStatus = state => state.notificationReducers.openDrawerStatus;
export const notificationSelector = createSelector(
	_notificationSelector,
	items => items,
);

export const drawerOpenStatusSelector = createSelector(
	_drawerOpenStatus,
	items => items,
);
