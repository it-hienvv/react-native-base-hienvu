import {createSelector} from 'reselect';

const _leftTabAppItem = state => state.leftAppTabReducers.leftAppTabItem;

export const leftTabAppItem = createSelector(_leftTabAppItem, item => item);
