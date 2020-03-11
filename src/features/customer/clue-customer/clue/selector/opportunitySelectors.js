import {createSelector} from 'reselect';

const _tabOpportunitySelectedId = state =>
	state.opportunityReducers.headerOpportunityActiveId;
export const tabOpportunitySelectedId = createSelector(
	_tabOpportunitySelectedId,
	id => id,
);

const _reloadClueDataSelectedId = state =>
	state.opportunityReducers.reloadClueData;
export const reloadClueDataSelectedId = createSelector(
	_reloadClueDataSelectedId,
	reloadClue => reloadClue,
);

const _getTempInfoCustomer = state => {
	return state.opportunityReducers.tempCustomerInfo;
};
export const getTempInfoCustomer = createSelector(
	_getTempInfoCustomer,
	tempInfo => tempInfo,
);
