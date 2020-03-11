import {
	OPPORTUNITY_ACTIVE_ID,
	RELOAD_CLUE,
	SAVE_TEMP_CUSTOMER_INFO,
	CLEAR_TEMP_CUSTOMER_INFO,
} from '../actions/types';
import {HEADER_OPPORTUNITY_TAB_ACTIVE_ID} from '../contants';

const initState = {
	headerOpportunityActiveId: HEADER_OPPORTUNITY_TAB_ACTIVE_ID.clue,
	reloadClueData: true,
	tempCustomerInfo: {
		leadDto: {},
		lstContactInfo: [],
		lstLeadRevenueDto: [],
	},
};

export const opportunityReducers = (state = initState, action) => {
	switch (action.type) {
		case OPPORTUNITY_ACTIVE_ID: {
			return {
				...state,
				headerOpportunityActiveId: action.payload,
			};
		}
		case SAVE_TEMP_CUSTOMER_INFO: {
			return {
				...state,
				tempCustomerInfo: {
					leadDto: action.payload?.leadDto || {},
					lstContactInfo: action.payload?.lstContactInfo || [],
					lstLeadRevenueDto: action.payload?.lstLeadRevenueDto || [],
				},
			};
		}
		case CLEAR_TEMP_CUSTOMER_INFO: {
			return {
				...state,
				tempCustomerInfo: {
					leadDto: {},
					lstContactInfo: [],
					lstLeadRevenueDto: [],
				},
			};
		}
		case RELOAD_CLUE: {
			return {
				...state,
				reloadClueData: action.payload,
			};
		}

		// case
		default:
			return {
				...state,
			};
	}
};
