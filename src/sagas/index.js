import {all, fork} from 'redux-saga/effects';
// import * as leftTabSagas from './leftAppTabSagas';
export default function* rootSaga() {
	yield all([].map(fork));
}
