import {applyMiddleware, createStore} from 'redux';
import rootReducer from '../reducers';

export default function configureStore(sagaMiddleware) {
	const store = createStore(rootReducer, applyMiddleware(sagaMiddleware));
	return store;
}
