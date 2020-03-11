import {createSelector} from 'reselect';

const selectData = state => state.customerDetailSearch;

export const customerDetailSearch = createSelector(selectData, item => item);
