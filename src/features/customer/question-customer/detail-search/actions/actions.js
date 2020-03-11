import {
	CUSTOMER_DETAIL_SEARCH_CHANGE_BASIC_DATA,
	CUSTOMER_DETAIL_SEARCH_CHANGE_EXPERIENCE_STATUS,
	CUSTOMER_DETAIL_SEARCH_TABLE_POSITION_ADD_ROW,
	CUSTOMER_DETAIL_SEARCH_TABLE_POSITION_MINUS_ROWS,
	CUSTOMER_DETAIL_SEARCH_TABLE_POSITION_EDIT_ROWS,
	CUSTOMER_DETAIL_SEARCH_STORE_DATA,
	CUSTOMER_DETAIL_SEARCH_SET_DATA,
} from './types';

export function onChangeCustomerDetailSearchBasicData(data) {
	return {
		payload: data,
		type: CUSTOMER_DETAIL_SEARCH_CHANGE_BASIC_DATA,
	};
}

export function onChangeCustomerDetailSearchExperienceStatus(data) {
	return {
		payload: data,
		type: CUSTOMER_DETAIL_SEARCH_CHANGE_EXPERIENCE_STATUS,
	};
}

export function onChangeCustomerDetailSearchTablePositionAddRow(propsKey) {
	return {
		type: CUSTOMER_DETAIL_SEARCH_TABLE_POSITION_ADD_ROW,
		propsKey,
	};
}

export function onChangeCustomerDetailSearchTablePositionMinusRow(
	data,
	propsKey,
) {
	return {
		payload: data,
		type: CUSTOMER_DETAIL_SEARCH_TABLE_POSITION_MINUS_ROWS,
		propsKey,
	};
}

export function onChangeCustomerDetailSearchTablePositionEditRow(
	data,
	propsKey,
) {
	return {
		payload: data,
		type: CUSTOMER_DETAIL_SEARCH_TABLE_POSITION_EDIT_ROWS,
		propsKey,
	};
}

export function onCustomerDetailSearchSetData(data) {
	return {
		payload: data,
		type: CUSTOMER_DETAIL_SEARCH_SET_DATA,
	};
}

export function onCustomerDetailSearchStoreData(data) {
	return {
		payload: data,
		type: CUSTOMER_DETAIL_SEARCH_STORE_DATA,
	};
}
