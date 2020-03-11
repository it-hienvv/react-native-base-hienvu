import {LEFT_TAB_KEY} from 'contants/contants';
import {LEFT_TAB_APP_TYPE} from 'actions/types';

const initState = {
	leftAppTabItem: LEFT_TAB_KEY.home,
};

export const leftAppTabReducers = (state = initState, action) => {
	switch (action.type) {
		case LEFT_TAB_APP_TYPE.RESET_LEFT_APP_TAB_ITEM: {
			return {
				...state,
				leftAppTabItem: LEFT_TAB_KEY.home,
			};
		}
		case LEFT_TAB_APP_TYPE.LEFT_TAB_ITEM_PRESS: {
			return {
				...state,
				leftAppTabItem: action.payload,
			};
		}
		default:
			return {
				...state,
			};
	}
};
