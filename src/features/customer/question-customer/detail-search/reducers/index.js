import {
	CUSTOMER_DETAIL_SEARCH_CHANGE_BASIC_DATA,
	CUSTOMER_DETAIL_SEARCH_CHANGE_EXPERIENCE_STATUS,
	CUSTOMER_DETAIL_SEARCH_TABLE_POSITION_ADD_ROW,
	CUSTOMER_DETAIL_SEARCH_TABLE_POSITION_MINUS_ROWS,
	CUSTOMER_DETAIL_SEARCH_TABLE_POSITION_EDIT_ROWS,
	CUSTOMER_DETAIL_SEARCH_STORE_DATA,
	CUSTOMER_DETAIL_SEARCH_SET_DATA,
} from '../actions/types';
import {OPTION_KEY} from '../contants';
import {appRandomKey} from 'utils/util';

const initPositionItem = salt => {
	return {
		key: appRandomKey(salt),
		year: {
			from: '',
			to: '',
		},
		position: {
			key: '',
			text: '',
			other: false
		},
		company: {
			key: '',
			text: ''
		},
		businessField: {
			key: '',
			text: '',
		},
		type: {
			key: '',
			text: '',
		},
	};
};

const initManagementItem = salt => {
	return {
		key: appRandomKey(salt),
		code: {
			key: '',
			text: '',
		},
		name: {
			key: '',
			text: '',
		},
		active: {
			key: '',
			text: '',
		},
	};
};

const initPartnerItem = salt => {
	return {
		key: appRandomKey(salt),
		partnerName: {key: '', text: ''},
		goods: {key: '', text: ''},
		revenueNearly: {key: '', text: ''},
		relationshipYear: {key: '', text: ''},
		yearRefund: {key: '', text: ''},
	};
};

const initFactory = {
	listPosition: initPositionItem,
	listManagement: initManagementItem,
	listPartner: initPartnerItem,
	listPartnerOutput: initPartnerItem,
};

const map = new Map();
const initState = {
	basic: {
		name: '',
		position: {key: '', text: ''},
		year: {key: '', text: ''},
		other: false,
	},
	experienceStatus: {
		status: OPTION_KEY.have,
	},
	listPosition: [initPositionItem(0)],
	listManagement: [initManagementItem(0)],
	listPartner: [initPartnerItem(0)],
	listPartnerOutput: [initPartnerItem(0)],
};

const addRows = (item, target) => {
	return [...target, item];
};

const minusRows = (item, target, condition, propKeys) => {
	const result = target.filter(ii => item[condition] !== ii[condition]);
	return result.length <= 0 ? [initFactory[propKeys](0)] : result;
};

const editRows = (item, target, condition) => {
	return target.map(ii => {
		if (ii[condition] === item[condition]) {
			return {...item};
		} else {
			return {...ii};
		}
	});
};

export const customerDetailSearch = (state = initState, action) => {
	switch (action.type) {
		case CUSTOMER_DETAIL_SEARCH_CHANGE_BASIC_DATA: {
			return {
				...state,
				basic: action.payload,
			};
		}
		case CUSTOMER_DETAIL_SEARCH_CHANGE_EXPERIENCE_STATUS: {
			return {
				...state,
				experienceStatus: action.payload,
			};
		}

		case CUSTOMER_DETAIL_SEARCH_TABLE_POSITION_ADD_ROW: {
			const item = initFactory[action.propsKey](
				state[action.propsKey].length,
			);
			return {
				...state,
				[action.propsKey]: addRows(item, state[action.propsKey]),
			};
		}

		case CUSTOMER_DETAIL_SEARCH_TABLE_POSITION_MINUS_ROWS: {
			return {
				...state,
				[action.propsKey]: minusRows(
					action.payload,
					state[action.propsKey],
					'key',
					action.propsKey,
				),
			};
		}

		case CUSTOMER_DETAIL_SEARCH_TABLE_POSITION_EDIT_ROWS: {
			return {
				...state,
				[action.propsKey]: editRows(
					action.payload,
					state[action.propsKey],
					'key',
				),
			};
		}

		case CUSTOMER_DETAIL_SEARCH_STORE_DATA: {
			map.set(action.payload, state);
			return {
				...state,
			};
		}
		case CUSTOMER_DETAIL_SEARCH_SET_DATA: {
			const item = map.get(action.payload);
			return item
				? {
					...item,
				  }
				: {
					...initState,
				  };
		}
		default:
			return {
				...state,
			};
	}
};
