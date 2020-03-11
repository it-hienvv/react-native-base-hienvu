import {
	OPPORTUNITY_ACTIVE_ID,
	RELOAD_CLUE,
	SAVE_TEMP_CUSTOMER_INFO,
	CLEAR_TEMP_CUSTOMER_INFO,
} from './types';
export function changeIdActiveOpportunity(id) {
	return {
		type: OPPORTUNITY_ACTIVE_ID,
		payload: id,
	};
}

export function reloadClue(reloadClueData) {
	return {
		type: RELOAD_CLUE,
		payload: reloadClueData,
	};
}

export function saveTempCustomerInfo(info) {
	return {
		type: SAVE_TEMP_CUSTOMER_INFO,
		payload: info,
	};
}

export function clearTempCustomerInfo() {
	return {
		type: CLEAR_TEMP_CUSTOMER_INFO,
	};
}
